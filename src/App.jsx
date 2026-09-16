import { useEffect, useState } from 'react'
import './index.css'

/*
  Bağlantı kartları — url alanına kendi profil adreslerinizi yazın.
  Örn: url:'https://github.com/kullaniciadi'
  url boş bırakılırsa kart tıklanınca "yakında" bildirimi gösterilir.
*/
const LINKS = [
  { id: 'github',    title: 'GitHub',    desc: 'Geliştirdiğim araçlar ve açık kaynak kodlar.', img: '/img/link-github.jpg',    url: '' },
  { id: 'linkedin',  title: 'LinkedIn',  desc: 'Profesyonel özgeçmişim ve deneyimlerim.',     img: '/img/link-linkedin.jpg',  url: '' },
  { id: 'instagram', title: 'Instagram', desc: 'Süreçten kareler ve kısa duyurular.',         img: '/img/link-instagram.jpg', url: '' },
  { id: 'youtube',   title: 'YouTube',   desc: 'Anlatımlar ve proje videoları.',              img: '/img/link-youtube.jpg',   url: '' },
]

/* Logodaki HK monogramının vektörel çizimi */
function Monogram({ size = 34 }){
  return (
    <svg width={size} height={size * 0.92} viewBox="0 0 120 110" fill="none" aria-hidden="true" className="monogram">
      <g stroke="currentColor" strokeLinecap="round">
        {/* H — sol gövde + serifler */}
        <path d="M20 15v80" strokeWidth="7" />
        <path d="M12 15h16M12 95h16" strokeWidth="2.5" />
        {/* H'nin sağ / K'nin sol ortak gövdesi */}
        <path d="M52 15v80" strokeWidth="7" />
        <path d="M44 15h16M44 95h16" strokeWidth="2.5" />
        {/* H'nin orta çubuğundan akıp K'ye bağlanan kıvrım */}
        <path d="M22 53c12 14 24 12 40-2s8-4 13-2" strokeWidth="4.5" />
        {/* K'nin üst kolu */}
        <path d="M54 48c10-10 20-21 28-32" strokeWidth="5" />
        {/* K'nin sağa uzanan zarif alt bacağı */}
        <path d="M56 56c14 12 26 26 36 39 4 5 9 8 15 6" strokeWidth="5.5" />
      </g>
    </svg>
  )
}

function LogoLockup(){
  return (
    <span className="logo-lockup">
      <Monogram size={30} />
      <span className="logo-text">
        <span className="logo-name">Halil Karaduman</span>
        <span className="logo-title">Psikolog</span>
      </span>
    </span>
  )
}

function FooterBrand(){
  return (
    <div className="footer-brand">
      <Monogram size={46} />
      <div className="logo-name logo-name--big">Halil Karaduman</div>
      <div className="logo-title logo-title--lines">Psikolog</div>
    </div>
  )
}

export default function App(){
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const [form, setForm] = useState({ ad: '', email: '', mesaj: '', website: '' })
  const [sending, setSending] = useState(false)

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
  const onLink = (e, l) => {
    if(l.url) return // gerçek adres varsa normal link gibi açılır
    e.preventDefault()
    setToast(`${l.title} profilim çok yakında eklenecek.`)
  }

  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <a href="#" className="logo" onClick={goHome} aria-label="Halil Karaduman — Psikolog">
            <LogoLockup />
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
          </div>
          <div className="hero-photo reveal">
            <img src="https://images.unsplash.com/photo-1556157388-97ed244727b5?auto=format&fit=crop&w=900&q=80" alt="Halil Karaduman" />
          </div>
        </div>

        {/* Bağlantı kartları — fotoğraf + alt açıklama */}
        <div className="container">
          <div className="links reveal">
            <div className="links-head">Bağlantılar</div>
            <div className="links-grid">
              {LINKS.map(l => (
                <a key={l.id} href={l.url || '#'} className="link-card" onClick={e => onLink(e, l)}
                   target={l.url ? '_blank' : undefined} rel={l.url ? 'noreferrer' : undefined}>
                  <img src={l.img} alt={l.title} loading="lazy" />
                  <div className="link-title">{l.title}</div>
                  <div className="link-desc">{l.desc}</div>
                </a>
              ))}
            </div>
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
          <article className="work-card reveal">
            <div className="work-media">
              <img src="/img/work-mmpi.jpg" alt="MMPI değerlendirme aracı ön izlemesi" loading="lazy" />
              <span className="card-badge">Yakında</span>
            </div>
            <div className="work-body">
              <div className="card-icon">◎</div>
              <h3>MMPI Değerlendirme Aracı</h3>
              <p>MMPI formlarını hızlı ve gizlilik odaklı puanlayan bir araç. Sade, hatasız ve klinisyen dostu olması için tasarlanıyor.</p>
              <button onClick={onMmpi} className="btn-full">
                MMPI Sitesine Git
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="white" strokeWidth="1.6" /></svg>
              </button>
              <div className="hint">Henüz aktif değil — çok yakında</div>
            </div>
          </article>
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
          <FooterBrand />
          <div className="footer-meta">Psikolog &amp; Geliştirici · © {new Date().getFullYear()} halilkaraduman.com.tr</div>
        </div>
      </footer>

      {toast && <div className="toast">{toast}</div>}
    </>
  )
}
