import { useEffect, useState } from 'react'
import './index.css'

/*
  Sosyal bağlantılar — url alanlarına kendi profil adreslerinizi yazın.
  Küçük logo butonları yeni sekmede açılır (yönlendirir).
*/
const SOCIALS = [
  {
    id: 'github', label: 'GitHub', url: 'https://github.com/', vb: '0 0 16 16',
    path: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.29.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z'
  },
  {
    id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/', vb: '0 0 24 24',
    path: 'M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z'
  },
  {
    id: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/', vb: '0 0 24 24',
    path: 'M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z'
  },
  {
    id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/', vb: '0 0 24 24',
    path: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84Zm0 10.16a4 4 0 1 1 4-4 4 4 0 0 1-4 4Zm7.85-10.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44Z'
  },
]

export default function App(){
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const [form, setForm] = useState({ ad: '', email: '', mesaj: '', website: '' })
  const [sending, setSending] = useState(false)
  // Kişi fotoğrafı: public/foto.(jpg|png|webp) commit'lenince otomatik devreye girer,
  // yoksa geçici placeholder gösterilir.
  const [photoIdx, setPhotoIdx] = useState(0)
  const PHOTO_SOURCES = [
    '/foto.jpg', '/foto.png', '/foto.webp',
    'https://images.unsplash.com/photo-1556157388-97ed244727b5?auto=format&fit=crop&w=900&q=80',
  ]

  const go = id => {
    const target = document.querySelector(id)
    if(!target) return
    const navHeight = document.querySelector('.nav')?.offsetHeight || 0
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
    window.history.replaceState(null, '', id)
    setOpen(false)
  }

  const goHome = e => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
    setOpen(false)
  }

  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('in')), { threshold: .1 })
    document.querySelectorAll('.reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
  useEffect(() => { if(!toast) return; const t = setTimeout(() => setToast(null), 3200); return () => clearTimeout(t) }, [toast])
  useEffect(() => {
    if(!window.location.hash) return
    const frame = window.requestAnimationFrame(() => go(window.location.hash))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  const onSubmit = async e => {
    e.preventDefault()
    if(!form.ad || !form.email || !form.mesaj){ setToast('Lütfen tüm alanları doldurun.'); return }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)){ setToast('Lütfen geçerli bir e-posta girin.'); return }
    setSending(true)
    try{
      // Cloudflare Worker + Resend üzerinden güvenli gönderim.
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: form.ad,
          email: form.email,
          message: form.mesaj,
          website: form.website
        })
      })
      const data = await res.json().catch(() => null)
      if(!res.ok || !data?.ok) throw new Error(data?.message || 'Gönderim başarısız')
      setToast('Mesajın gönderildi ✓ — en kısa sürede döneceğim.')
      setForm({ ad: '', email: '', mesaj: '', website: '' })
    } catch(err){
      // Sunucu yapılandırılmadıysa veya erişilemiyorsa mail uygulamasını aç.
      const subject = encodeURIComponent(`halilkaraduman.com.tr — ${form.ad}`)
      const body = encodeURIComponent(`Ad: ${form.ad}\nE-posta: ${form.email}\n\nMesaj:\n${form.mesaj}`)
      window.location.href = `mailto:contact@halilkaraduman.com.tr?subject=${subject}&body=${body}`
      setToast('Mail uygulamanız açıldı — oradan gönderebilirsiniz.')
    } finally {
      setSending(false)
    }
  }
  const onMmpi = e => { e.preventDefault(); setToast('MMPI platformu çok yakında — şimdilik aktif değil.') }

  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <a href="#" className="logo" onClick={goHome} aria-label="Halil Karaduman — Psikolog">
            {/* Kullanıcının kendi logosu */}
            <img src="/logo.png" alt="Halil Karaduman — Psikolog" className="logo-img" />
          </a>
          <button className="mobile-toggle" onClick={() => setOpen(v => !v)} aria-label="menü">
            <div className="hamburger"><span style={{ transform: open ? 'translateY(5px) rotate(45deg)' : 'none' }} /><span style={{ opacity: open ? 0 : 1 }} /><span style={{ transform: open ? 'translateY(-5px) rotate(-45deg)' : 'none' }} /></div>
          </button>
          <div className={`nav-links ${open ? 'open' : ''}`}>
            <a href="#hakkimda" className="nav-link" onClick={e => { e.preventDefault(); go('#hakkimda') }}>Hakkımda</a>
            <a href="#calismalar" className="nav-link" onClick={e => { e.preventDefault(); go('#calismalar') }}>Çalışmalar</a>
            <a href="#ozgecmis" className="nav-link" onClick={e => { e.preventDefault(); go('#ozgecmis') }}>Özgeçmiş</a>
            <a href="#iletisim" className="nav-link" onClick={e => { e.preventDefault(); go('#iletisim') }}>İletişim</a>
          </div>
        </div>
      </nav>

      {/* HERO — solda metin, sağda fotoğraf */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy reveal">
            <div className="kicker"><span className="kicker-dot" /> Psikolog &amp; Geliştirici</div>
            <h1>
              Anlamak için<br />
              <em>dinlerim,</em><br />
              kolaylaştırmak için<br />
              <strong>tasarlarım.</strong>
            </h1>
            <p className="hero-sub">
              <strong>Halil Karaduman</strong> — psikoloji bilimini daha sade ve güvenilir kılmak için dijital araçlar üzerine çalışıyorum. Klinik doğruluk ve gizlilik her şeyden önce.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => go('#calismalar')}>
                Çalışmalara göz at
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </button>
              <button className="btn-ghost" onClick={() => go('#hakkimda')}>Beni tanıyın</button>
            </div>
            {/* küçük logo butonları — tıklayınca yönlendirir */}
            <div className="socials">
              {SOCIALS.map(s => (
                <a key={s.id} className="social-btn" href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} title={s.label}>
                  <svg width="16" height="16" viewBox={s.vb} fill="currentColor" aria-hidden="true"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
          </div>
          <div className="hero-photo reveal">
            <img src={PHOTO_SOURCES[photoIdx]} alt="Halil Karaduman" onError={() => setPhotoIdx(i => Math.min(i + 1, PHOTO_SOURCES.length - 1))} />
          </div>
        </div>
      </section>

      {/* 01 — HAKKIMDA */}
      <section id="hakkimda" className="section">
        <div className="container">
          <div className="section-head reveal">
            <div className="section-num">01 — Hakkımda</div>
            <h2 className="section-title">Kendimi <em>tanıtayım</em></h2>
          </div>
          <div className="about-grid reveal">
            <h3 className="about-statement">
              İnsanı anlama <em>merakım</em>, kodun problem çözme gücüyle aynı amaçta buluşuyor: sahiden işe yarayan, sade ve güvenilir araçlar.
            </h3>
            <div className="about-body">
              <p>
                Merhaba, ben Halil. İzmir Bakırçay Üniversitesi'nde psikoloji eğitimi alırken ruh sağlığı hizmetlerinin sahada neye ihtiyaç duyduğunu yakından gözlemledim; Gemlik Devlet Hastanesi ve Gelişim Analiz Danışmanlık stajlarımda değerlendirme, görüşme ve takip süreçlerinin içinde yer aldım.
              </p>
              <p>
                Bu deneyimler bana şunu net gösterdi: klinisyenin zamanını alan, tekrar eden ve hata kaldırmayan işler teknolojiyle güvenle hafifletilebilir. Bugün psikoloji bilimini daha sade, daha erişilebilir ve daha güvenilir kılmak için dijital araçlar tasarlıyorum.
              </p>
              <p>
                İlk projem olan MMPI değerlendirme aracı da bu anlayışın ürünü: klinik doğruluk, gizlilik ve sadelik her kararın merkezinde.
              </p>
              <ul className="facts">
                <li><span>Eğitim</span><b>Psikoloji — İzmir Bakırçay Üniversitesi</b></li>
                <li><span>Konum</span><b>Bursa, Türkiye</b></li>
                <li><span>Odak</span><b>Klinik psikoloji &amp; dijital araçlar</b></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — ÇALIŞMALAR */}
      <section id="calismalar" className="section">
        <div className="container">
          <div className="section-head reveal">
            <div className="section-num">02 — Çalışmalar</div>
            <h2 className="section-title">Üzerinde <em>çalıştığım</em> şeyler</h2>
            <p className="section-desc">Teknoloji ve psikolojiyi birleştiren küçük, sade denemeler. İlk adımım klinisyenler için bir MMPI aracı.</p>
          </div>
          <div className="card reveal">
            <div className="card-top">
              <div className="card-icon">◎</div>
              <span className="card-badge">Yakında</span>
            </div>
            <h3>MMPI Değerlendirme Aracı</h3>
            <p>MMPI formlarını hızlı ve gizlilik odaklı puanlayan bir araç. Sade, hatasız ve klinisyen dostu olması için tasarlanıyor.</p>
            <button onClick={onMmpi} className="btn-full">
              MMPI Sitesine Git
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="white" strokeWidth="1.6" /></svg>
            </button>
            <div className="hint">Henüz aktif değil — çok yakında</div>
          </div>
        </div>
      </section>

      {/* 03 — ÖZGEÇMİŞ */}
      <section id="ozgecmis" className="section">
        <div className="container">
          <div className="section-head reveal">
            <div className="section-num">03 — Özgeçmiş</div>
            <h2 className="section-title">Deneyim &amp; <em>eğitim</em></h2>
            <p className="section-desc">Psikoloji eğitimim ve sahadaki staj deneyimlerim.</p>
          </div>

          <div className="resume-grid reveal">
            <div className="resume-block">
              <div className="resume-label">Eğitim</div>
              <article className="resume-item resume-item--education">
                <div className="resume-mark" aria-hidden="true">↗</div>
                <div className="resume-content">
                  <div className="resume-period">Lisans</div>
                  <h3>Psikoloji</h3>
                  <p className="resume-place">İzmir Bakırçay Üniversitesi</p>
                </div>
              </article>
            </div>

            <div className="resume-block">
              <div className="resume-label">Deneyim</div>
              <div className="resume-list">
                <article className="resume-item">
                  <div className="resume-period">Ekim 2024 — Kasım 2024</div>
                  <div className="resume-content">
                    <h3>Stajyer Psikolog</h3>
                    <p className="resume-place">Gelişim Analiz Danışmanlık</p>
                    <p className="resume-location">Karşıyaka, İzmir</p>
                  </div>
                </article>
                <article className="resume-item">
                  <div className="resume-period">Temmuz — Ağustos 2024</div>
                  <div className="resume-content">
                    <h3>Stajyer Psikolog</h3>
                    <p className="resume-place">Gemlik Devlet Hastanesi</p>
                    <p className="resume-location">Gemlik, Bursa</p>
                  </div>
                </article>
                <article className="resume-item">
                  <div className="resume-period">Temmuz — Ağustos 2023</div>
                  <div className="resume-content">
                    <h3>Stajyer Psikolog</h3>
                    <p className="resume-place">Gemlik Devlet Hastanesi</p>
                    <p className="resume-location">Gemlik, Bursa</p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — İLETİŞİM */}
      <section id="iletisim" className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info reveal">
              <div className="section-num">04 — İletişim</div>
              <h2 className="section-title">Bir <em>merhaba</em> deyin</h2>
              <p className="section-desc">
                Fikir, iş birliği veya danışma için en hızlı yol e-posta. Mesajınız doğrudan gelen kutuma düşer.
              </p>
              <a className="mail-card" href="mailto:contact@halilkaraduman.com.tr">
                <span className="mail-label">E-posta</span>
                <span className="mail-addr">contact@halilkaraduman.com.tr</span>
              </a>
              <div className="contact-note">Mesajınız güvenli sunucu üzerinden iletilir; asla üçüncü kişilerle paylaşılmaz.</div>
            </div>
            <div className="form-wrap reveal">
              <form onSubmit={onSubmit} noValidate>
                <div className="field"><label>Adınız</label><input value={form.ad} onChange={e => setForm({ ...form, ad: e.target.value })} placeholder="Ad Soyad" required autoComplete="name" /></div>
                <div className="field"><label>E-posta</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="ornek@mail.com" required autoComplete="email" /></div>
                <div className="field"><label>Mesajınız</label><textarea value={form.mesaj} onChange={e => setForm({ ...form, mesaj: e.target.value })} placeholder="Merhaba Halil, ..." rows="4" required /></div>
                {/* Basit honeypot: normal ziyaretçiye görünmez, botları filtrelemeye yardımcı olur. */}
                <input type="text" name="website" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                <button type="submit" className="btn-submit" disabled={sending}>{sending ? 'Gönderiliyor…' : 'Gönder'} <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="white" strokeWidth="1.6" /></svg></button>
                <div className="form-note">Mesajınız güvenli sunucu üzerinden <b>contact@halilkaraduman.com.tr</b> adresine iletilir.</div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <img className="footer-logo" src="/logo.png" alt="Halil Karaduman — Psikolog" />
          Psikolog &amp; Geliştirici · © {new Date().getFullYear()} halilkaraduman.com.tr
        </div>
      </footer>

      {toast && <div className="toast">{toast}</div>}
    </>
  )
}
