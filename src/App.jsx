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

  const handleMmpi = (e)=>{
    e.preventDefault()
    setToast({type:'ok', text:'MMPI platformu çok yakında — şimdilik aktif değil.'})
  }

  return (
    <>
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
            <a href="#iletisim" className="nav-cta" onClick={(e)=>{e.preventDefault(); scrollTo('#iletisim')}}>İletişime geç</a>
          </div>
        </div>
      </nav>

      {/* HERO — sade, yaratıcı */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid" style={{minHeight:500, gap:40}}>
            <div className="hero-left reveal">
              <div className="kicker">
                <span className="kicker-dot" />
                Psikolog & Geliştirici
              </div>
              {/* YARATICI BAŞLIK — önceki "aynı masada buluşturuyorum" yerine */}
              <h1>
                İnsanı anlamaya<br/>
                dair <em>merakımı</em><br/>
                koda<br/>
                <strong>dönüştürüyorum.</strong>
              </h1>
              <p className="hero-sub">
                <strong>Halil Karaduman</strong> — Psikoloji bilimini daha erişilir, sade ve güvenilir kılmak için dijital araçlar üzerine çalışıyorum. Klinik doğruluk ve gizlilik, her satırın ön koşulu.
              </p>
              <div className="hero-actions">
                <button className="btn-primary" onClick={()=>scrollTo('#calismalar')}>
                  Çalışmalara göz at
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                </button>
              </div>
            </div>

            <div className="hero-visual reveal" style={{transitionDelay:'90ms'}}>
              {/* sade görsel — overlay, quote ve float kaldırıldı, sadece temiz fotoğraf */}
              <div className="portrait-wrap" style={{aspectRatio:'4/4.6', boxShadow:'0 12px 40px rgba(0,0,0,.06)'}}>
                <img
                  src="https://images.unsplash.com/photo-1556157388-97ed244727b5?auto=format&fit=crop&w=800&q=80"
                  alt="Halil Karaduman"
                  style={{filter:'saturate(.88)'}}
                />
              </div>
            </div>
          </div>

          {/* Hakkımda — tek kolon, sade */}
          <div className="reveal" id="hakkimda" style={{
            marginTop:28, background:'white', border:'1px solid var(--border)', borderRadius:18,
            padding:'22px 24px', textAlign:'center'
          }}>
            <div className="eyebrow" style={{justifyContent:'center'}}>Hakkımda</div>
            <p style={{maxWidth:620, margin:'12px auto 0', color:'var(--text-soft)', fontSize:14.5, lineHeight:1.7}}>
              Psikoloji eğitimimde sahada gerçekten işe yarayan, sade araçlara olan ihtiyacı gördüm. Yazılımı bir amaç değil, <b>insan odaklı bir köprü</b> olarak görüyorum — bilimsel normlara sadık, gizliliği merkeze alan, klinisyenin dilinden konuşan.
            </p>
          </div>
        </div>
      </section>

      <div className="container"><div className="divider" style={{marginTop:22}} /></div>

      {/* 01 CALISMALAR — tek kart, sade */}
      <section className="section" id="calismalar" style={{paddingBottom:42}}>
        <div className="container">
          <div className="reveal" style={{textAlign:'center', maxWidth:560, margin:'0 auto 26px'}}>
            <div className="section-num">01 — Çalışmalar</div>
            <h2 className="section-title" style={{marginBottom:10}}>Üzerinde <em>çalıştığım</em> şeyler</h2>
            <p className="section-desc" style={{margin:'0 auto'}}>Teknoloji ve psikolojiyi birleştiren sade projeler. İlk adım, klinisyenler için pratik bir MMPI çözümü.</p>
          </div>

          <div className="reveal" style={{maxWidth:560, margin:'0 auto'}}>
            <div className="service-card" style={{minHeight:'auto', padding:26, textAlign:'left'}}>
              <div className="service-top" style={{marginBottom:14}}>
                <div className="service-icon">◎</div>
                <span className="service-badge">Yakında</span>
              </div>
              <h4 style={{fontSize:18}}>MMPI Değerlendirme Aracı</h4>
              <p style={{margin:'8px 0 18px'}}>MMPI formlarını hızlı, hatasız ve gizlilik odaklı puanlayan bir araç. Klinisyen dostu, sade ve güvenilir olması için tasarlanıyor.</p>
              <button onClick={handleMmpi} style={{
                width:'100%', justifyContent:'center',
                display:'inline-flex', alignItems:'center', gap:8,
                background:'var(--accent)', color:'white', border:'1px solid var(--accent)',
                padding:'13px 18px', borderRadius:999, fontSize:14, fontWeight:600, cursor:'pointer'
              }}>
                MMPI Sitesine Git
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="white" strokeWidth="1.6"/></svg>
              </button>
              <div style={{textAlign:'center', fontSize:11, letterSpacing:'.07em', color:'var(--text-muted)', marginTop:10}}>HENÜZ AKTİF DEĞİL — ÇOK YAKINDA</div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 OZGECMIS — boş, sade placeholder (yeni mezun ibaresi yok) */}
      <section className="section" id="ozgecmis" style={{background:'white', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)', padding:'44px 0'}}>
        <div className="container">
          <div className="reveal" style={{textAlign:'center', maxWidth:560, margin:'0 auto 22px'}}>
            <div className="section-num">02 — Özgeçmiş</div>
            <h2 className="section-title" style={{fontSize:32}}>Deneyim & <em>eğitim</em></h2>
          </div>
          <div className="reveal" style={{
            maxWidth:560, margin:'0 auto',
            border:'1.2px dashed var(--border-strong)', borderRadius:16, padding:'32px 20px',
            display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:10, background:'var(--bg-soft)'
          }}>
            <div style={{width:38, height:38, borderRadius:'50%', background:'white', border:'1px solid var(--border)', display:'grid', placeItems:'center'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 7a4 4 0 100 8 4 4 0 000-8zM12 7V5M12 19v-2M7 12H5m14 0h-2" stroke="#9A9A9E" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <p style={{margin:0, color:'var(--text-soft)', fontSize:13.5, lineHeight:1.6}}>
              Bu alan yakında güncellenecek.
            </p>
          </div>
        </div>
      </section>

      {/* 03 ILETISIM — sade, koyu panel yok */}
      <section className="section" id="iletisim" style={{paddingTop:44}}>
        <div className="container">
          <div className="reveal" style={{textAlign:'center', maxWidth:560, margin:'0 auto 24px'}}>
            <div className="section-num">03 — İletişim</div>
            <h2 className="section-title" style={{fontSize:32}}>Bir <em>merhaba</em> deyin</h2>
            <p className="section-desc" style={{margin:'0 auto'}}>
              İş birliği ve fikir paylaşımı için en hızlı yol e-posta.
              <br/><a href="mailto:iletisim@halilkaraduman.com.tr" style={{color:'var(--text)', fontWeight:600, textDecoration:'underline', textUnderlineOffset:3}}>iletisim@halilkaraduman.com.tr</a>
            </p>
          </div>

          <div className="reveal" style={{maxWidth:560, margin:'0 auto', background:'white', border:'1px solid var(--border)', borderRadius:18, padding:22}}>
            <form onSubmit={handleSubmit}>
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
                <textarea value={form.mesaj} onChange={e=>setForm({...form, mesaj:e.target.value})} placeholder="Merhaba Halil, ..." rows="4" />
              </div>
              <button type="submit" className="btn-submit" disabled={sending} style={{width:'100%', justifyContent:'center', marginTop:16, padding:'13px'}}>
                {sending ? 'Gönderiliyor…' : 'Gönder'}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6"/></svg>
              </button>
              <p className="form-note" style={{textAlign:'center', marginTop:10}}>Sade ve gizliliğe saygılı.</p>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer" style={{marginTop:8}}>
        <div className="container footer-inner" style={{justifyContent:'center', textAlign:'center', flexDirection:'column', gap:6}}>
          <div className="footer-left" style={{textAlign:'center'}}>
            <b>Halil Karaduman.</b>  Psikolog & Geliştirici<br/>
            <span>© {new Date().getFullYear()} halilkaraduman.com.tr</span>
          </div>
        </div>
      </footer>

      {toast && (
        <div className="toast" role="status">
          <span style={{width:28, height:28, borderRadius:'50%', background:'rgba(255,255,255,.18)', display:'grid', placeItems:'center'}}>{toast.type==='ok' ? '✓' : '!' }</span>
          <span>{toast.text}</span>
          <button onClick={()=>setToast(null)} style={{background:'transparent', border:'none', color:'white', opacity:.7, cursor:'pointer', marginLeft:6}}>✕</button>
        </div>
      )}
    </>
  )
}

export default App
