import { useEffect, useState } from 'react'
import './index.css'

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const [form, setForm] = useState({ ad:'', email:'', mesaj:'' })
  const [sending, setSending] = useState(false)

  useEffect(()=>{
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in') })
    }, {threshold:0.12})
    document.querySelectorAll('.reveal').forEach(el=>obs.observe(el))
    return ()=>obs.disconnect()
  },[])

  useEffect(()=>{
    if(!toast) return
    const t=setTimeout(()=>setToast(null),3600)
    return ()=>clearTimeout(t)
  },[toast])

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!form.ad || !form.email || !form.mesaj){
      setToast({type:'err', text:'Lütfen tüm alanları doldurun.'})
      return
    }
    setSending(true)
    setTimeout(()=>{
      setSending(false)
      setToast({type:'ok', text:'Mesajın alındı! En kısa sürede dönüş yapacağım.'})
      setForm({ad:'', email:'', mesaj:''})
    },900)
  }

  const scrollTo = (id)=>{
    document.querySelector(id)?.scrollIntoView({behavior:'smooth', block:'start'})
    setMobileOpen(false)
  }

  const handleMmpiClick = (e)=>{
    e.preventDefault()
    setToast({type:'ok', text:'MMPI platformu çok yakında açılacak. Şimdilik aktif değil.'})
  }

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <div className="container nav-inner">
          <a href="#" className="logo" onClick={(e)=>{e.preventDefault(); window.scrollTo({top:0, behavior:'smooth'})}}>
            Halil <span>Karaduman</span><i>.</i><span className="logo-dot" />
          </a>

          <button className="mobile-toggle" aria-label="Menü" onClick={()=>setMobileOpen(v=>!v)}>
            <div className="hamburger">
              <span style={{transform: mobileOpen ? 'translateY(6px) rotate(45deg)' : 'none'}} />
              <span style={{opacity: mobileOpen?0:1}} />
              <span style={{transform: mobileOpen ? 'translateY(-6px) rotate(-45deg)' : 'none'}} />
            </div>
          </button>

          <div className={`nav-links ${mobileOpen?'open':''}`}>
            <a href="#hakkimda" className="nav-link" onClick={(e)=>{e.preventDefault(); scrollTo('#hakkimda')}}>Hakkımda</a>
            <a href="#calismalar" className="nav-link" onClick={(e)=>{e.preventDefault(); scrollTo('#calismalar')}}>Çalışmalar</a>
            <a href="#ozgecmis" className="nav-link" onClick={(e)=>{e.preventDefault(); scrollTo('#ozgecmis')}}>Özgeçmiş</a>
            <a href="#iletisim" className="nav-link" onClick={(e)=>{e.preventDefault(); scrollTo('#iletisim')}}>İletişim</a>
            <a href="#iletisim" className="nav-cta" onClick={(e)=>{e.preventDefault(); scrollTo('#iletisim')}}>
              İletişime geç
              <svg viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>
      </nav>

      {/* HERO - sadeleştirildi */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid" style={{minHeight:520}}>
            <div className="hero-left reveal">
              <div className="kicker">
                <span className="kicker-dot" />
                Yeni Mezun • Psikolog & Geliştirici
              </div>
              <h1>
                Psikoloji ile<br/>
                <em>teknolojiyi</em><br/>
                aynı masada<br/>
                <strong>buluşturuyorum.</strong>
              </h1>
              <p className="hero-sub">
                Ben <strong>Halil Karaduman</strong> — yeni mezun bir psikolog olarak insan zihnini anlama merakımı yazılım tutkularımla birleştiriyorum.
                Amacım, klinisyenlerin ve danışanların hayatını kolaylaştıran <u>sade, güvenilir ve bilimsel</u> dijital araçlar geliştirmek.
              </p>
              <div className="hero-actions">
                <button className="btn-primary" onClick={()=>scrollTo('#calismalar')}>
                  Çalışmalarıma göz at
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                </button>
                <button className="btn-secondary" onClick={()=>scrollTo('#iletisim')}>
                  Tanışalım
                </button>
              </div>

              <div style={{marginTop:28, display:'flex', gap:8, flexWrap:'wrap'}}>
                <span className="pill">Psikoloji</span>
                <span className="pill">Yazılım</span>
                <span className="pill">Araştırma</span>
                <span className="pill" style={{background:'var(--accent)', color:'white', borderColor:'var(--accent)'}}>Yeni Mezun</span>
              </div>
            </div>

            <div className="hero-visual reveal" style={{transitionDelay:'100ms'}}>
              <div className="portrait-wrap" style={{aspectRatio:'4/4.7'}}>
                <img
                  src="https://images.unsplash.com/photo-1556157388-97ed244727b5?auto=format&fit=crop&w=800&q=80"
                  alt="Halil Karaduman"
                />
                <div className="portrait-overlay" />
                <div className="portrait-quote">
                  <div className="quote-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6L12 3z" fill="currentColor"/></svg>
                  </div>
                  <div>
                    <strong>Öğrenmeye ve üretmeye hevesliyim.</strong>
                    <p>Teknolojiyi etik ve bilimsel süzgeçten geçirerek kullanıyorum.</p>
                  </div>
                </div>
              </div>
              <div className="hero-bg-text" style={{fontSize:72}}>Halil.</div>
            </div>
          </div>

          {/* sade yaklaşım bandı */}
          <div className="intro-band reveal" id="hakkimda" style={{marginTop:22}}>
            <div>
              <div className="eyebrow">Hakkımda</div>
              <h3>Yeni mezun, <em>meraklı</em> ve üretmeyi seven.</h3>
            </div>
            <div>
              <p>
                Psikoloji eğitimim boyunca en çok şunu fark ettim: sahada gerçekten işe yarayan, sade dijital araçlara ihtiyaç var. Kodlamayı bir amaç değil, <b>psikoloji bilimini daha erişilebilir kılmak</b> için bir araç olarak görüyorum. Şimdilik öğreniyor, deniyor ve küçük adımlarla inşa ediyorum.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container"><div className="divider" style={{marginTop:22}} /></div>

      {/* 01 CALISMALAR - sade */}
      <section className="section" id="calismalar">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <div className="section-num">01 — Çalışmalar</div>
              <h2 className="section-title">Üzerinde <em>çalıştığım</em> şeyler</h2>
              <p className="section-desc">Henüz yolun başında olan, teknoloji ve psikolojiyi birleştiren sade projeler. İlk hedefim MMPI için pratik bir dijital çözüm.</p>
            </div>
          </div>

          <div className="services-grid" style={{gridTemplateColumns:'1.2fr .8fr'}}>
            <div className="service-card featured reveal" style={{minHeight:300}}>
              <div className="service-top">
                <div className="service-icon">◎</div>
                <span className="service-badge" style={{background:'rgba(255,255,255,.16)', borderColor:'rgba(255,255,255,.18)', color:'white'}}>Yakında • MMPI</span>
              </div>
              <h4>MMPI Değerlendirme Aracı</h4>
              <p>MMPI formlarını dijital ortamda puanlayan, sade ve güvenilir bir araç üzerinde çalışıyorum. Gizlilik öncelikli, klinisyen dostu bir deneyim hedefliyorum.</p>

              {/* İstenen buton - henüz aktif değil */}
              <button onClick={handleMmpiClick} className="service-link" style={{
                background:'white', color:'#111', border:'none', padding:'11px 16px', borderRadius:999, fontWeight:600, cursor:'pointer',
                display:'inline-flex', alignItems:'center', gap:8, marginTop:10, alignSelf:'flex-start'
              }}>
                MMPI Sitesine Git
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="#111" strokeWidth="1.7"/></svg>
              </button>
              <span style={{fontSize:11, color:'rgba(255,255,255,.7)', marginTop:8, letterSpacing:'.06em'}}>ŞU AN PASİF • ÇOK YAKINDA AKTİF OLACAK</span>
              <span className="card-num" style={{color:'rgba(255,255,255,.22)'}}>01</span>
            </div>

            <div className="service-card reveal" style={{transitionDelay:'80ms', background:'var(--bg-soft)', borderStyle:'dashed', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center', minHeight:300}}>
              <div className="service-icon" style={{marginBottom:14}}>◐</div>
              <h4 style={{marginBottom:6}}>Yeni fikirler yolda</h4>
              <p style={{flex:'none', textAlign:'center', maxWidth:260}}>Psikoloji + teknoloji kesişiminde sade araçlar tasarlıyorum. Burası yakında yeni projelerle dolacak.</p>
              <span className="pill" style={{marginTop:12}}>Yakında</span>
            </div>
          </div>

          <style>{`@media(max-width:760px){ #calismalar .services-grid{grid-template-columns:1fr !important} }`}</style>
        </div>
      </section>

      {/* 02 OZGECMIS - BOŞ */}
      <section className="section" id="ozgecmis" style={{background:'white', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)'}}>
        <div className="container">
          <div className="section-header reveal">
            <div>
              <div className="section-num">02 — Özgeçmiş</div>
              <h2 className="section-title">Deneyim & <em>eğitim</em></h2>
              <p className="section-desc">Yeni mezunum — bu alanı bilerek boş bırakıyorum. Staj, eğitim ve deneyimlerimi tamamladıkça burada paylaşacağım.</p>
            </div>
          </div>

          <div className="reveal" style={{
            border:'1.5px dashed var(--border-strong)', borderRadius:20, padding:'48px 24px',
            display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:14, background:'var(--bg-soft)'
          }}>
            <div style={{width:52, height:52, borderRadius:'50%', background:'white', border:'1px solid var(--border)', display:'grid', placeItems:'center'}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 6v6l4 2M12 22a10 10 0 110-20 10 10 0 010 20z" stroke="#9A9A9E" strokeWidth="1.6"/></svg>
            </div>
            <h4 style={{margin:0, fontSize:16}}>Henüz içerik yok</h4>
            <p style={{margin:0, color:'var(--text-soft)', fontSize:14, maxWidth:460, lineHeight:1.6}}>
              Yeni mezun olarak yolculuğumun başındayım. Deneyim ve eğitim bilgilerimi <b>yakında</b> bu bölümde şeffaf şekilde paylaşacağım.
            </p>
            <span className="pill">Boş • Yakında güncellenecek</span>
          </div>
        </div>
      </section>

      {/* 03 ILETISIM - sade */}
      <section className="section" id="iletisim" style={{paddingTop:48}}>
        <div className="container">
          <div className="section-header reveal">
            <div>
              <div className="section-num">03 — İletişim</div>
              <h2 className="section-title">Bir <em>merhaba</em> deyin</h2>
              <p className="section-desc">Fikir alışverişi, iş birliği veya sadece tanışmak için yazabilirsiniz. Öğrenci ve yeni mezun dayanışmasına açığım.</p>
            </div>
          </div>

          <div className="contact-wrap reveal" style={{gridTemplateColumns:'.9fr 1.1fr'}}>
            <div className="contact-info" style={{padding:'28px'}}>
              <div className="eyebrow">İletişim</div>
              <h3 style={{fontSize:26}}>Birlikte <em>düşünelim,</em><br/>birlikte üretelim.</h3>
              <p style={{fontSize:14}}>Teknoloji ve psikolojiyi birleştiren projelere hevesliyim. E-posta en hızlı ulaşma yolu.</p>

              <div className="contact-details" style={{marginTop:22}}>
                <div className="contact-row">
                  <div className="contact-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7z" stroke="white" strokeWidth="1.5"/><path d="M5 8l7 6 7-6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                  <div>
                    <b>E-posta</b>
                    <a href="mailto:iletisim@halilkaraduman.com.tr">iletisim@halilkaraduman.com.tr</a>
                  </div>
                </div>
                <div className="contact-row">
                  <div className="contact-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 21s7-5.2 7-11a7 7 0 10-14 0c0 5.8 7 11 7 11z" stroke="white" strokeWidth="1.5"/><circle cx="12" cy="10" r="2.5" stroke="white" strokeWidth="1.5"/></svg>
                  </div>
                  <div>
                    <b>Konum</b>
                    <span>Türkiye • Online</span>
                  </div>
                </div>
              </div>

              <div className="contact-social" style={{marginTop:24}}>
                <a href="#" className="social-btn" aria-label="Instagram" onClick={e=>{e.preventDefault(); setToast({type:'ok', text:'Instagram yakında eklenecek.'})}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="white" strokeWidth="1.5"/><circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.5"/><circle cx="17.5" cy="6.5" r="1" fill="white"/></svg>
                </a>
                <a href="#" className="social-btn" aria-label="LinkedIn" onClick={e=>{e.preventDefault(); setToast({type:'ok', text:'LinkedIn yakında eklenecek.'})}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 9h3v9H6zM7.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM12 9h3v2.2a3 3 0 013 1.6V18h-3v-4.5a1.5 1.5 0 00-3 0V18h-3V9z" fill="white"/></svg>
                </a>
                <span style={{fontSize:11, opacity:.6, marginLeft:8, alignSelf:'center'}}>Sade • Gizliliğe saygılı</span>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="field">
                <label>Adınız</label>
                <input value={form.ad} onChange={e=>setForm({...form, ad:e.target.value})} placeholder="Ad Soyad" />
              </div>
              <div className="field" style={{marginTop:14}}>
                <label>E-posta</label>
                <input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="ornek@mail.com" />
              </div>
              <div className="field" style={{marginTop:14}}>
                <label>Mesajınız</label>
                <textarea value={form.mesaj} onChange={e=>setForm({...form, mesaj:e.target.value})} placeholder="Merhaba Halil, ..." rows="5" />
              </div>
              <div className="form-foot">
                <p className="form-note">Sade bir site, sade bir iletişim. Spam yok.</p>
                <button type="submit" className="btn-submit" disabled={sending}>
                  {sending ? 'Gönderiliyor…' : 'Gönder'}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6"/></svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-left">
            <b>Halil Karaduman.</b><br/>
            Psikolog & Geliştirici • Yeni Mezun<br/>
            <span>© {new Date().getFullYear()} Halil Karaduman. Sade, dürüst ve öğrenmeye açık.</span>
          </div>
          <div className="footer-links">
            <a href="mailto:iletisim@halilkaraduman.com.tr">iletisim@halilkaraduman.com.tr</a>
          </div>
        </div>
      </footer>

      {toast && (
        <div className="toast" role="status">
          <span style={{width:28, height:28, borderRadius:'50%', background:'rgba(255,255,255,.18)', display:'grid', placeItems:'center'}}>
            {toast.type==='ok' ? '✓' : '!' }
          </span>
          <span>{toast.text}</span>
          <button onClick={()=>setToast(null)} style={{background:'transparent', border:'none', color:'white', opacity:.7, cursor:'pointer', marginLeft:6}}>✕</button>
        </div>
      )}
    </>
  )
}

export default App
