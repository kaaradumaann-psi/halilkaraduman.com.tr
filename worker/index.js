const defaultRecipient = 'contact@halilkaraduman.com.tr'
const defaultSender = 'Halil Karaduman <website@halilkaraduman.com.tr>'
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
