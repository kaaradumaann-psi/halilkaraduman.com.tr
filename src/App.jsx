import { useEffect, useState } from 'react'
import './index.css'

export default function App(){
  const [open,setOpen]=useState(false)
  const [toast,setToast]=useState(null)
  const [form,setForm]=useState({ad:'',email:'',mesaj:'',website:''})
  const [sending,setSending]=useState(false)

  const go=id=>{
    const target=document.querySelector(id)
    if(!target) return
    const navHeight=document.querySelector('.nav')?.offsetHeight || 0
    const top=target.getBoundingClientRect().top + window.scrollY - navHeight - 16
    window.scrollTo({top:Math.max(0,top),behavior:'smooth'})
    window.history.replaceState(null,'',id)
    setOpen(false)
  }

  useEffect(()=>{
    const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('in')),{threshold:.1})
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el))
    return()=>io.disconnect()
  },[])
  useEffect(()=>{ if(!toast) return; const t=setTimeout(()=>setToast(null),3200); return()=>clearTimeout(t)},[toast])
  useEffect(()=>{
    if(!window.location.hash) return
    const frame=window.requestAnimationFrame(()=>go(window.location.hash))
    return()=>window.cancelAnimationFrame(frame)
  },[])

  const onSubmit=async e=>{
    e.preventDefault()
    if(!form.ad||!form.email||!form.mesaj){setToast('Lütfen tüm alanları doldurun.');return}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)){setToast('Lütfen geçerli bir e-posta girin.');return}
    setSending(true)
    try{
      // Cloudflare Pages Function + Resend üzerinden güvenli gönderim.
      const res=await fetch('/api/contact',{
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify({
          name:form.ad,
          email:form.email,
          message:form.mesaj,
          website:form.website
        })
      })
      const data=await res.json().catch(()=>null)
      if(!res.ok || !data?.ok) throw new Error(data?.message || 'Gönderim başarısız')
      setToast('Mesajın gönderildi ✓ — en kısa sürede döneceğim.')
      setForm({ad:'',email:'',mesaj:'',website:''})
    } catch(err){
      // Sunucu yapılandırılmadıysa veya erişilemiyorsa mail uygulamasını aç.
      const subject=encodeURIComponent(`halilkaraduman.com.tr — ${form.ad}`)
      const body=encodeURIComponent(`Ad: ${form.ad}\nE-posta: ${form.email}\n\nMesaj:\n${form.mesaj}`)
      window.location.href=`mailto:contact@halilkaraduman.com.tr?subject=${subject}&body=${body}`
      setToast('Mail uygulamanız açıldı — oradan gönderebilirsiniz.')
    } finally {
      setSending(false)
    }
  }
  const onMmpi=e=>{e.preventDefault(); setToast('MMPI platformu çok yakında — şimdilik aktif değil.')}

  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <a href="#" className="logo" onClick={e=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});window.history.replaceState(null,'',window.location.pathname+window.location.search)}}>Halil <span>Karaduman</span></a>
          <button className="mobile-toggle" onClick={()=>setOpen(v=>!v)} aria-label="menü">
            <div className="hamburger"><span style={{transform:open?'translateY(5px) rotate(45deg)':'none'}}/><span style={{opacity:open?0:1}}/><span style={{transform:open?'translateY(-5px) rotate(-45deg)':'none'}}/></div>
          </button>
          <div className={`nav-links ${open?'open':''}`}>
            <a href="#hakkimda" className="nav-link" onClick={e=>{e.preventDefault();go('#hakkimda')}}>Hakkımda</a>
            <a href="#calismalar" className="nav-link" onClick={e=>{e.preventDefault();go('#calismalar')}}>Çalışmalar</a>
            <a href="#ozgecmis" className="nav-link" onClick={e=>{e.preventDefault();go('#ozgecmis')}}>Özgeçmiş</a>
            <a href="#iletisim" className="nav-link" onClick={e=>{e.preventDefault();go('#iletisim')}}>İletişim</a>
            <a href="#iletisim" className="nav-cta" onClick={e=>{e.preventDefault();go('#iletisim')}}>Mesaj Gönder</a>
          </div>
        </div>
      </nav>

      {/* HERO — ortalı, sade */}
      <section className="hero">
        <div className="container">
          <div className="reveal">
            <div className="kicker"><span className="kicker-dot"/> Psikolog & Geliştirici</div>
            <h1>
              Anlamak için<br/>
              <em>dinlerim,</em><br/>
              kolaylaştırmak için<br/>
              <strong>tasarlarım.</strong>
            </h1>
            <p className="hero-sub">
              <strong>Halil Karaduman</strong> — psikoloji bilimini daha sade ve güvenilir kılmak için dijital araçlar üzerine çalışıyorum. Klinik doğruluk ve gizlilik her şeyden önce.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={()=>go('#calismalar')}>
                Çalışmalara göz at
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>
            <div className="avatar-wrap">
              <img className="avatar" src="https://images.unsplash.com/photo-1556157388-97ed244727b5?auto=format&fit=crop&w=300&q=80" alt="Halil Karaduman"/>
            </div>
          </div>

          <div id="hakkimda" className="about reveal">
            İnsanı anlama merakı ile kodun problem çözme gücünü <b>tek bir amaçta</b> buluşturuyorum. Sahada sahiden işe yarayan, sade ve güvenilir dijital araçlara ihtiyaç olduğunu gördüm — yazılımı amaç değil, insan odaklı bir köprü olarak kuruyorum.
          </div>
        </div>
      </section>

      {/* 01 */}
      <section id="calismalar" className="section">
        <div className="container">
          <div className="section-head reveal">
            <div className="section-num">01 — Çalışmalar</div>
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
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="white" strokeWidth="1.6"/></svg>
            </button>
            <div className="hint">Henüz aktif değil — çok yakında</div>
          </div>
        </div>
      </section>

      {/* 02 */}
      <section id="ozgecmis" className="section">
        <div className="container">
          <div className="section-head reveal">
            <div className="section-num">02 — Özgeçmiş</div>
            <h2 className="section-title">Deneyim & <em>eğitim</em></h2>
            <p className="section-desc">Psikoloji eğitimim ve sahadaki staj deneyimlerim.</p>
          </div>

          <div className="resume reveal">
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

      {/* 03 — iletişim sade */}
      <section id="iletisim" className="section">
        <div className="container">
          <div className="section-head reveal">
            <div className="section-num">03 — İletişim</div>
            <h2 className="section-title">Bir <em>merhaba</em> deyin</h2>
            <p className="section-desc">
              Fikir ve iş birliği için en hızlı yol e-posta.<br/>
              <a href="mailto:contact@halilkaraduman.com.tr" style={{fontWeight:600, textDecoration:'underline', textUnderlineOffset:3}}>contact@halilkaraduman.com.tr</a>
            </p>
          </div>
          <div className="form-wrap reveal">
            <form onSubmit={onSubmit} noValidate>
              <div className="field"><label>Adınız</label><input value={form.ad} onChange={e=>setForm({...form,ad:e.target.value})} placeholder="Ad Soyad" required autoComplete="name"/></div>
              <div className="field"><label>E-posta</label><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="ornek@mail.com" required autoComplete="email"/></div>
              <div className="field"><label>Mesajınız</label><textarea value={form.mesaj} onChange={e=>setForm({...form,mesaj:e.target.value})} placeholder="Merhaba Halil, ..." rows="4" required/></div>
              {/* Basit honeypot: normal ziyaretçiye görünmez, botları filtrelemeye yardımcı olur. */}
              <input type="text" name="website" value={form.website} onChange={e=>setForm({...form,website:e.target.value})} style={{display:'none'}} tabIndex={-1} autoComplete="off"/>
              <button type="submit" className="btn-submit" disabled={sending}>{sending?'Gönderiliyor…':'Gönder'} <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="white" strokeWidth="1.6"/></svg></button>
              <div className="form-note">Mesajınız güvenli sunucu üzerinden <b>contact@halilkaraduman.com.tr</b> adresine iletilir.</div>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <b>Halil Karaduman</b>  Psikolog & Geliştirici<br/>
          © {new Date().getFullYear()} halilkaraduman.com.tr
        </div>
      </footer>

      {toast && <div className="toast">{toast}</div>}
    </>
  )
}
