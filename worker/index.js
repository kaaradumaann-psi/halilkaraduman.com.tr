const defaultRecipient = 'contact@halilkaraduman.com.tr'
const defaultSender = 'Halil Karaduman <website@halilkaraduman.com.tr>'
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Güvenlik sınırları
const MAX_BODY_BYTES = 32 * 1024 // Tek istek gövdesi için üst sınır
const RATE_LIMIT_MAX = 5         // IP başına izin verilen istek sayısı
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 dakikalık pencere

// En iyi çaba (best-effort) hız sınırı: Worker izolasyonu ayakta kaldığı sürece geçerlidir;
// kalıcı depolama yerine geçmez. Cloudflare WAF/Rate Limiting kurallarıyla birlikte düşünülür.
const rateBuckets = new Map()

function isRateLimited(ip) {
  const now = Date.now()
  const bucket = rateBuckets.get(ip)

  if (!bucket || now > bucket.resetAt) {
    // Pencere dışında kalan eski kayıtları temizle (Map gereksiz büyümesin).
    if (rateBuckets.size > 5000) {
      for (const [key, value] of rateBuckets) {
        if (now > value.resetAt) rateBuckets.delete(key)
      }
    }
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  bucket.count += 1
  return bucket.count > RATE_LIMIT_MAX
}

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Cache-Control': 'no-store'
  }
})

const text = value => typeof value === 'string' ? value.trim() : ''

const escapeHtml = value => text(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;')

async function handleContact(request, env) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: { Allow: 'POST, OPTIONS' }
    })
  }

  if (request.method !== 'POST') {
    return json({ ok: false, message: 'Bu endpoint yalnızca POST kabul eder.' }, 405)
  }

  // Aşırı büyük istekleri gövdeyi okumadan reddet.
  const contentLength = Number(request.headers.get('Content-Length') || '0')
  if (contentLength > MAX_BODY_BYTES) {
    return json({ ok: false, message: 'İstek çok büyük.' }, 413)
  }

  // Basit spam koruması: IP başına pencere içi istek sayısını sınırla.
  const clientIp = request.headers.get('CF-Connecting-IP') || 'bilinmeyen'
  if (isRateLimited(clientIp)) {
    return json({ ok: false, message: 'Çok fazla deneme. Lütfen biraz sonra tekrar dene.' }, 429)
  }

  let payload
  try {
    payload = await request.json()
  } catch {
    return json({ ok: false, message: 'Geçersiz istek.' }, 400)
  }

  // Görünmez alan doluysa bot olduğunu varsayıp sessizce başarılı dön.
  if (text(payload?.website)) return json({ ok: true })

  const name = text(payload?.name)
  const email = text(payload?.email).toLowerCase()
  const message = text(payload?.message)

  if (!name || !email || !message) {
    return json({ ok: false, message: 'Lütfen tüm alanları doldurun.' }, 400)
  }

  if (name.length > 120 || email.length > 254 || message.length > 5000) {
    return json({ ok: false, message: 'Mesaj çok uzun.' }, 400)
  }

  if (!emailPattern.test(email)) {
    return json({ ok: false, message: 'Geçerli bir e-posta adresi girin.' }, 400)
  }

  const apiKey = text(env?.RESEND_API_KEY)
  const recipient = text(env?.CONTACT_TO) || defaultRecipient
  const sender = text(env?.CONTACT_FROM) || defaultSender

  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured')
    return json({ ok: false, message: 'İletişim servisi henüz yapılandırılmadı.' }, 503)
  }

  const subject = `halilkaraduman.com.tr — ${name} iletişim formu`
  const html = `
    <h2>Web sitesinden yeni iletişim mesajı</h2>
    <p><strong>Ad Soyad:</strong> ${escapeHtml(name)}</p>
    <p><strong>E-posta:</strong> ${escapeHtml(email)}</p>
    <p><strong>Mesaj:</strong></p>
    <p>${escapeHtml(message).replaceAll('\n', '<br>')}</p>
  `

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject,
        html
      })
    })

    if (!response.ok) {
      const details = await response.text()
      console.error('Resend error:', response.status, details.slice(0, 500))
      return json({ ok: false, message: 'Mesaj gönderilemedi.' }, 502)
    }

    return json({ ok: true })
  } catch (error) {
    console.error('Contact Worker error:', error)
    return json({ ok: false, message: 'Mesaj gönderilemedi.' }, 502)
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname === '/api/contact' || url.pathname === '/api/contact/') {
      return handleContact(request, env)
    }

    if (url.pathname.startsWith('/api/')) {
      return json({ ok: false, message: 'Endpoint bulunamadı.' }, 404)
    }

    // Worker dışındaki tüm istekler Vite tarafından üretilen dist dosyalarına gider.
    return env.ASSETS.fetch(request)
  }
}
