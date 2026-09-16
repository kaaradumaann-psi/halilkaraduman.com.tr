import { useEffect, useState, useRef } from 'react'
import './index.css'

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const [form, setForm] = useState({ ad:'', email:'', konu:'Bireysel Terapi', mesaj:'' })
  const [sending, setSending] = useState(false)

  // reveal on scroll
  useEffect(()=>{
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in') })
    }, {threshold:0.12})
    document.querySelectorAll('.reveal').forEach(el=>obs.observe(el))
    return ()=>obs.disconnect()
  },[])

  // toast auto hide
  useEffect(()=>{
    if(!toast) return
    const t=setTimeout(()=>setToast(null),3800)
    return ()=>clearTimeout(t)
  },[toast])

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!form.ad || !form.email || !form.mesaj){
      setToast({type:'err', text:'Lütfen ad, e-posta ve mesaj alanlarını doldurun.'})
      return
    }
    setSending(true)
    setTimeout(()=>{
      setSending(false)
      setToast({type:'ok', text:'Mesajınız alındı. En kısa sürede dönüş yapacağım.'})
      setForm({ad:'', email:'', konu:'Bireysel Terapi', mesaj:''})
    },1100)
  }

  const scrollTo = (id)=>{
    document.querySelector(id)?.scrollIntoView({behavior:'smooth', block:'start'})
    setMobileOpen(false)
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
            <a href="#hizmetler" className="nav-link" onClick={(e)=>{e.preventDefault(); scrollTo('#hizmetler')}}>Hizmetler</a>
            <a href="#ozgecmis" className="nav-link" onClick={(e)=>{e.preventDefault(); scrollTo('#ozgecmis')}}>Özgeçmiş</a>
            <a href="#yayinlar" className="nav-link" onClick={(e)=>{e.preventDefault(); scrollTo('#yayinlar')}}>Yayınlar</a>
            <a href="#iletisim" className="nav-link" onClick={(e)=>{e.preventDefault(); scrollTo('#iletisim')}}>İletişim</a>
            <a href="#iletisim" className="nav-cta" onClick={(e)=>{e.preventDefault(); scrollTo('#iletisim')}}>
              Randevu Al
              <svg viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-left reveal">
              <div className="kicker">
                <span className="kicker-dot" />
                Online & Yüz Yüze Terapi • Hafta içi 09:00 - 20:00
              </div>
              <h1>
                İnsan zihnini<br/>
                <em>anlamak,</em> <strong>iyileşmenin</strong><br/>
                ilk adımıdır.
              </h1>
              <p className="hero-sub">
                <strong>Psikolog Halil Karaduman</strong> — Bilişsel Davranışçı Terapi, EMDR ve Şema Terapi odaklı; bilimsel, etik ve gizliliğe saygılı bir terapi alanı sunuyorum. Kaygı, depresyon, travma ve ilişki döngülerini birlikte ele alıyoruz.
              </p>
              <div className="hero-actions">
                <button className="btn-primary" onClick={()=>scrollTo('#iletisim')}>
                  Ücretsiz Ön Görüşme
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                </button>
                <button className="btn-secondary" onClick={()=>scrollTo('#hizmetler')}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                  Çalışma Alanlarım
                </button>
              </div>

              <div className="trust-row">
                <div className="trust-item">
                  <div className="trust-avatars">
                    <img src="https://i.pravatar.cc/100?img=33" alt="" />
                    <img src="https://i.pravatar.cc/100?img=14" alt="" />
                    <img src="https://i.pravatar.cc/100?img=32" alt="" />
                  </div>
                  <div className="trust-text">
                    <strong>500+ danışan</strong>
                    <span>4.9/5 memnuniyet</span>
                  </div>
                </div>
                <div className="trust-divider" />
                <div className="trust-stats">
                  <div className="stat-mini"><b>7+</b><span>yıl deneyim</span></div>
                  <div className="stat-mini"><b>%98</b><span>gizlilik</span></div>
                  <div className="stat-mini"><b>EMDR</b><span>sertifikalı</span></div>
                </div>
              </div>
            </div>

            <div className="hero-visual reveal" style={{transitionDelay:'120ms'}}>
              <div className="portrait-wrap">
                <img
                  src="https://images.unsplash.com/photo-1556157388-97ed244727b5?auto=format&fit=crop&w=800&q=80"
                  alt="Psikolog Halil Karaduman"
                  loading="eager"
                />
                <div className="portrait-overlay" />
                <div className="portrait-quote">
                  <div className="quote-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M10 8H7a4 4 0 00-4 4v5h6v-7zm9 0h-3a4 4 0 00-4 4v5h6v-7z" fill="currentColor" opacity=".95"/><circle cx="7.5" cy="8" r=".8" fill="currentColor"/></svg>
                  </div>
                  <div>
                    <strong>“Terapi, yargılanmadan duyulduğunuz bir alan.”</strong>
                    <p>Her görüşme size özel yapılandırılır; hızınıza saygı duyarım.</p>
                  </div>
                </div>
              </div>

              <div className="float-card">
                <div className="float-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 7a4 4 0 100 8 4 4 0 000-8zM12 7V5M12 19v-2M7 12H5m14 0h-2M8.5 8.5l-1.4-1.4M16.9 16.9l-1.4-1.4M15.5 8.5l1.4-1.4M7.1 16.9l1.4-1.4" stroke="#111" strokeWidth="1.4" strokeLinecap="round"/></svg>
                </div>
                <div>
                  <b>Bugün uygunluk <em>●</em></b>
                  <span>Online • Yüz yüze</span>
                </div>
              </div>

              <div className="hero-bg-text">Psikolog.</div>
            </div>
          </div>

          {/* intro band similar to Nadir's philosophy paragraph */}
          <div className="intro-band reveal" id="hakkimda">
            <div>
              <div className="eyebrow">Yaklaşımım</div>
              <h3>Bilime yaslanan, <em>insana odaklanan</em> bir terapi anlayışı.</h3>
            </div>
            <div>
              <p>
                Terapiyi tek tip bir reçete olarak görmüyorum. Her danışanın öyküsü, mizacı ve ihtiyacı farklı. Bu yüzden <b>kanıt temelli</b> yöntemleri (BDT, EMDR, Şema) sizin yaşam bağlamınıza uyarlıyor, birlikte ölçülebilir hedefler koyuyoruz. Seanslar arası küçük pratikler ve düzenli geri bildirimle kalıcı değişimi hedefleriz.
              </p>
              <div className="intro-list">
                <span className="pill"><b>Etik</b> • Gizlilik</span>
                <span className="pill"><b>Kanıt temelli</b></span>
                <span className="pill"><b>Şeffaf</b> süreç</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container"><div className="divider" style={{marginTop:22}} /></div>

      {/* 01 HIZMETLER - inspired by Nadir's 01 Klinik Araçlar grid */}
      <section className="section" id="hizmetler">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <div className="section-num">01 — Uzmanlık Alanları</div>
              <h2 className="section-title">Size özel <em>terapi</em> ve destek programları</h2>
              <p className="section-desc">Klinik ilgi alanlarım kaygı ve duygudurum sorunlarından travma ve ilişki döngülerine uzanır. İhtiyaca göre yüz yüze veya güvenli online görüşme.</p>
            </div>
            <a href="#iletisim" onClick={(e)=>{e.preventDefault(); scrollTo('#iletisim')}} className="btn-secondary" style={{alignSelf:'flex-start'}}>
              Hizmetleri keşfet
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5"/></svg>
            </a>
          </div>

          <div className="services-grid">
            {/* Featured card like MMPİ Analiz */}
            <div className="service-card featured reveal">
              <div className="service-top">
                <div className="service-icon">◎</div>
                <span className="service-badge">Öne Çıkan • Bireysel Terapi</span>
              </div>
              <h4>Bireysel Terapi — Kendinizle yeniden bağ kurun</h4>
              <p>Kaygı, depresyon, mükemmeliyetçilik, öz-değer ve yaşam geçişleri. Haftalık 50 dakikalık seanslarda düşünce-duygu-davranış döngünüzü haritalar, somut başa çıkma becerileri geliştiririz.</p>
              <a href="#iletisim" onClick={(e)=>{e.preventDefault(); scrollTo('#iletisim')}} className="service-link">
                Görüşme planla <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7"/></svg>
              </a>
              <span className="card-num">01</span>
            </div>

            <div className="service-card reveal" style={{transitionDelay:'60ms'}}>
              <div className="service-top">
                <div className="service-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M16 17a4 4 0 00-8 0M12 13a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="1.5"/></svg>
                </div>
                <span className="service-badge">Çift</span>
              </div>
              <h4>Çift & İlişki Terapisi</h4>
              <p>İletişim kısır döngüleri, güven ve yakınlık sorunları. Duygu odaklı ve Gottman esintili müdahalelerle sağlıklı bağ kurmayı öğreniyoruz.</p>
              <a href="#iletisim" onClick={(e)=>{e.preventDefault(); scrollTo('#iletisim')}} className="service-link">Detay <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5"/></svg></a>
            </div>

            <div className="service-card reveal" style={{transitionDelay:'100ms'}}>
              <div className="service-top">
                <div className="service-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 6v6l4 2M12 22a10 10 0 110-20 10 10 0 010 20z" stroke="currentColor" strokeWidth="1.5"/></svg>
                </div>
                <span className="service-badge">Kaygı</span>
              </div>
              <h4>Kaygı & Panik</h4>
              <p>Genelleşmiş kaygı, panik, sosyal kaygı ve bedensel belirtiler için BDT ve maruz bırakma temelli, adım adım ilerleyen program.</p>
              <a href="#iletisim" className="service-link">Detay <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5"/></svg></a>
            </div>

            <div className="service-card reveal">
              <div className="service-top">
                <div className="service-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 8a4 4 0 100 8 4 4 0 000-8zM3 12h2M19 12h2M12 3v2M12 19v2" stroke="currentColor" strokeWidth="1.5"/></svg>
                </div>
                <span className="service-badge">Travma • EMDR</span>
              </div>
              <h4>Travma ve EMDR</h4>
              <p>Geçmiş yaşantıların bugüne sızan izlerini güvenli ve kontrollü bir protokol ile işliyor, sinir sistemini regüle etmeyi öğreniyoruz.</p>
              <a href="#iletisim" className="service-link">Detay <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5"/></svg></a>
            </div>

            <div className="service-card reveal" style={{transitionDelay:'60ms'}}>
              <div className="service-top">
                <div className="service-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17 8l-5 5-5-5M12 13V3M5 18h14" stroke="currentColor" strokeWidth="1.5"/></svg>
                </div>
                <span className="service-badge">Duygudurum</span>
              </div>
              <h4>Depresyon & Tükenmişlik</h4>
              <p>Enerji kaybı, isteksizlik ve anlam arayışı. Davranışsal aktivasyon ve şema odaklı çalışmalarla yeniden harekete geçiyoruz.</p>
              <a href="#iletisim" className="service-link">Detay <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5"/></svg></a>
            </div>

            <div className="service-card reveal" style={{transitionDelay:'100ms'}}>
              <div className="service-top">
                <div className="service-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 10a3 3 0 11-6 0 3 3 0 016 0zM19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5"/></svg>
                </div>
                <span className="service-badge">Online</span>
              </div>
              <h4>Online Terapi</h4>
              <p>Şehir dışında ya da yoğun tempoda olanlar için uçtan uca şifreli, etik kurallara tam uyumlu online seans imkânı.</p>
              <a href="#iletisim" className="service-link">Detay <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5"/></svg></a>
            </div>

            <div className="service-card reveal">
              <div className="service-top">
                <div className="service-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 14a3 3 0 100-6 3 3 0 000 6zM12 14v6M9 20h6" stroke="currentColor" strokeWidth="1.5"/></svg>
                </div>
                <span className="service-badge">Ergen</span>
              </div>
              <h4>Ergen Danışmanlığı</h4>
              <p>Sınav kaygısı, akran ilişkileri, kimlik ve aile iletişimi. Ergenle iş birliği + aileye psiko-eğitim dengesi.</p>
              <a href="#iletisim" className="service-link">Detay <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5"/></svg></a>
            </div>
          </div>
        </div>
      </section>

      {/* 02 OZGECMIS - like Nadir's 02 */}
      <section className="section" id="ozgecmis" style={{background:'white', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)'}}>
        <div className="container">
          <div className="section-header reveal">
            <div>
              <div className="section-num">02 — Özgeçmiş</div>
              <h2 className="section-title">Akademik ve <em>klinik</em> geçmiş</h2>
            </div>
            <p className="section-desc">Etik ilkelere ve mesleki sınırlara sadık, süpervizyonla desteklenen bir klinik yolculuk. Detaylı CV ve sertifikalar görüşmede paylaşılır.</p>
          </div>

          <div className="timeline reveal">
            <div className="timeline-item active">
              <div className="timeline-dot" />
              <div className="timeline-meta">
                2022 — Günümüz
                <b>Serbest Psikolog</b>
                <span>● Aktif danışan takibi</span>
              </div>
              <div className="timeline-content">
                <h4>Bireysel Terapi & Süpervizyon</h4>
                <p>Haftalık bireysel seanslar, düzenli süpervizyon ve vaka tartışmaları. BDT ve EMDR protokollerini danışanın ihtiyaç haritasına göre entegre ediyorum. Kriz, yas ve ilişki odaklı kısa süreli protokoller.</p>
                <div className="timeline-tags">
                  <span className="mini-tag">BDT</span><span className="mini-tag">EMDR 1. Düzey</span><span className="mini-tag">Şema Terapi</span><span className="mini-tag">Etik Kurul Onayı</span>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-meta">
                2021 — 2022
                <b>Klinik Staj</b>
                <span>Özel Danışmanlık Merkezi • 9 Ay</span>
              </div>
              <div className="timeline-content">
                <h4>Gözlem, Eşlik ve Psiko-eğitim</h4>
                <p>Yetişkin ve ergen görüşmelerinde gözlem, psikometrik değerlendirme uygulamaları (Beck, STAI, SCL-90) ve psiko-eğitim gruplarında kolaylaştırıcılık. Vaka formülasyonu atölyeleri.</p>
                <div className="timeline-tags">
                  <span className="mini-tag">SCL-90-R</span><span className="mini-tag">Beck Envanterleri</span><span className="mini-tag">Vaka Formülasyonu</span>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-meta">
                2020 — 2021
                <b>Sertifikasyon</b>
                <span>Akredite Eğitimler</span>
              </div>
              <div className="timeline-content">
                <h4>Terapi Eğitimleri</h4>
                <p>Bilişsel Davranışçı Terapi (120 saat), EMDR 1. Düzey, Kısa Süreli Çözüm Odaklı Terapi ve Motivasyonel Görüşme. Eğitimler süpervizyonla tamamlandı.</p>
                <div className="timeline-tags">
                  <span className="mini-tag">BDT 120s</span><span className="mini-tag">EMDR</span><span className="mini-tag">ÇÖT</span>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-meta">
                2016 — 2020
                <b>Psikoloji Lisans</b>
                <span>Üniversite • Onur Derecesi</span>
              </div>
              <div className="timeline-content">
                <h4>Lisans ve Araştırma</h4>
                <p>Klinik psikoloji, gelişim ve sosyal psikoloji odaklı lisans. Bitirme projesi: “Mükemmeliyetçilik ve Kaygı Arasında Ruminasyonun Aracı Rolü”. Gönüllü topluluk çalışmaları.</p>
                <div className="timeline-tags">
                  <span className="mini-tag">Onur</span><span className="mini-tag">Araştırma</span><span className="mini-tag">Topluluk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 YAYINLAR - like Nadir's 03 */}
      <section className="section" id="yayinlar">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <div className="section-num">03 — Anlatı & Kaynaklar</div>
              <h2 className="section-title">Akademik paylaşımlar & <em>psiko-eğitim</em></h2>
              <p className="section-desc">Terapiyi seans odasının dışına taşıyan, sade dille hazırlanmış videolar ve yazılar. Amacım bilgiyi erişilebilir ve doğru kaynakla sunmak.</p>
            </div>
          </div>

          <div className="video-grid reveal">
            <a href="https://www.youtube.com" target="_blank" rel="noreferrer" className="video-card">
              <div className="video-thumb">
                <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80" alt="Kaygı nedir" />
                <div className="play-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 7l8 5-8 5V7z" fill="#111"/></svg>
                </div>
              </div>
              <div className="video-meta">
                <div className="video-kicker"><i/> Kaygı • 12 dk</div>
                <h4>Kaygı bir alarmdır: Tehdit algısı nasıl çalışır?</h4>
                <p>Savaş-kaç tepkisi, bedensel belirtiler ve kaygıyla dostça çalışmanın 3 adımı.</p>
                <div className="video-foot"><span>Youtube • Ücretsiz</span><span style={{display:'inline-flex', gap:6}}>İzle <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6"/></svg></span></div>
              </div>
            </a>

            <a href="https://www.youtube.com" target="_blank" rel="noreferrer" className="video-card">
              <div className="video-thumb">
                <img src="https://images.unsplash.com/photo-1499209974431-9dddce953fd3?auto=format&fit=crop&w=800&q=80" alt="İlişki döngüleri" />
                <div className="play-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 7l8 5-8 5V7z" fill="#111"/></svg>
                </div>
              </div>
              <div className="video-meta">
                <div className="video-kicker"><i style={{background:'#C2B5A3'}}/> İlişkiler • 16 dk</div>
                <h4>İlişkilerde aynı döngü neden tekrar eder?</h4>
                <p>Bağlanma stilleri, tetikleyiciler ve onarıcı diyalog için 4 cümle kalıbı.</p>
                <div className="video-foot"><span>Youtube • Ücretsiz</span><span style={{display:'inline-flex', gap:6}}>İzle <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6"/></svg></span></div>
              </div>
            </a>

            <a href="https://www.youtube.com" target="_blank" rel="noreferrer" className="video-card">
              <div className="video-thumb">
                <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80" alt="EMDR nedir" />
                <div className="play-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 7l8 5-8 5V7z" fill="#111"/></svg>
                </div>
              </div>
              <div className="video-meta">
                <div className="video-kicker"><i style={{background:'#7A8A7A'}}/> Travma • 14 dk</div>
                <h4>EMDR nedir, kimler için uygundur?</h4>
                <p>Göz hareketleriyle duyarsızlaştırma, seansın adımları ve sık sorulan sorular.</p>
                <div className="video-foot"><span>Youtube • Ücretsiz</span><span style={{display:'inline-flex', gap:6}}>İzle <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6"/></svg></span></div>
              </div>
            </a>
          </div>

          <div className="articles-grid reveal" style={{transitionDelay:'80ms'}}>
            <div className="article-main">
              <div className="eyebrow">Popüler Yazı • 6 dk okuma</div>
              <h4>“İyi hissetmek” hedef değil, <em>beceridir</em></h4>
              <p>Duygu düzenleme, pencere aralığı ve sinir sistemini sakinleştiren 5 mikro pratik. Seanslar arasında uygulayabileceğiniz sade egzersizler.</p>
              <div style={{marginTop:'auto', paddingTop:18, display:'flex', alignItems:'center', gap:10, position:'relative'}}>
                <img src="https://i.pravatar.cc/100?img=12" alt="" style={{width:32, height:32, borderRadius:'50%', objectFit:'cover'}} />
                <span style={{fontSize:12, opacity:.8}}>Halil Karaduman • Klinik Psikolog</span>
                <span style={{marginLeft:'auto', fontSize:13, fontWeight:600, display:'inline-flex', gap:6, alignItems:'center'}}>Oku <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="white" strokeWidth="1.6"/></svg></span>
              </div>
            </div>

            <div className="article-side">
              <a href="#" className="mini-article" onClick={e=>e.preventDefault()}>
                <div className="mini-article-icon">◐</div>
                <div>
                  <h5>Erteleme aslında kaygıdır</h5>
                  <p>Mükemmeliyetçilik-erteleme döngüsünü kıran 10 dakikalık başlama ritüeli.</p>
                </div>
              </a>
              <a href="#" className="mini-article" onClick={e=>e.preventDefault()}>
                <div className="mini-article-icon">⬢</div>
                <div>
                  <h5>Uyku hijyeni kontrol listesi</h5>
                  <p>Uykuya dalmayı kolaylaştıran akşam rutini ve düşünce erteleme tekniği.</p>
                </div>
              </a>
              <a href="#" className="mini-article" onClick={e=>e.preventDefault()}>
                <div className="mini-article-icon">⬣</div>
                <div>
                  <h5>Sınırlar koymak bencillik değil</h5>
                  <p>Hayır diyebilmek için şiddetsiz iletişimden 3 diyaloğa hazır cümle.</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 04 ILETISIM - like Nadir's 04 */}
      <section className="section" id="iletisim" style={{paddingTop:18}}>
        <div className="container">
          <div className="section-header reveal">
            <div>
              <div className="section-num">04 — İletişim</div>
              <h2 className="section-title">Birlikte çalışalım mı? <em>Yazın</em></h2>
              <p className="section-desc">Ücret, müsaitlik ve terapi süreci hakkında bilgi almak için formu doldurun veya doğrudan e-posta gönderin. Mesajlar 24 saat içinde yanıtlanır.</p>
            </div>
          </div>

          <div className="contact-wrap reveal">
            <div className="contact-info">
              <div className="eyebrow">İletişim Bilgileri</div>
              <h3>Projeler & <em>iş birlikleri</em> için buradayım</h3>
              <p>Terapi başvurularınız, atölye davetleri veya kurumsal iyi oluş programları için doğrudan ulaşabilirsiniz. Tüm yazışmalar gizlilik ilkesiyle korunur.</p>

              <div className="contact-details">
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
                    <span>Ankara • Online tüm Türkiye<br/>Yüz yüze: Çankaya</span>
                  </div>
                </div>

                <div className="contact-row">
                  <div className="contact-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 7v5l3 3M12 22a10 10 0 110-20 10 10 0 010 20z" stroke="white" strokeWidth="1.5"/></svg>
                  </div>
                  <div>
                    <b>Çalışma Saatleri</b>
                    <span>Hafta içi 09:00 - 20:00<br/>Cumartesi 10:00 - 16:00</span>
                  </div>
                </div>
              </div>

              <div className="contact-social">
                <a href="#" className="social-btn" aria-label="Instagram" onClick={e=>e.preventDefault()}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="white" strokeWidth="1.5"/><circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.5"/><circle cx="17.5" cy="6.5" r="1" fill="white"/></svg>
                </a>
                <a href="#" className="social-btn" aria-label="LinkedIn" onClick={e=>e.preventDefault()}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 9h3v9H6zM7.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM12 9h3v2.2a3 3 0 013 1.6V18h-3v-4.5a1.5 1.5 0 00-3 0V18h-3V9z" fill="white"/></svg>
                </a>
                <a href="#" className="social-btn" aria-label="Youtube" onClick={e=>e.preventDefault()}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 12a3 3 0 01-3 3H6a3 3 0 01-3-3 3 3 0 013-3h12a3 3 0 013 3z" stroke="white" strokeWidth="1.5"/><path d="M11 9l5 3-5 3V9z" fill="white"/></svg>
                </a>
                <span style={{fontSize:12, opacity:.6, marginLeft:8, alignSelf:'center'}}>Gizlilik • KVKK uyumlu</span>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="field">
                  <label>Adınız Soyadınız</label>
                  <input value={form.ad} onChange={e=>setForm({...form, ad:e.target.value})} placeholder="Ad Soyad" />
                </div>
                <div className="field">
                  <label>E-posta</label>
                  <input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="ornek@mail.com" />
                </div>
              </div>

              <div className="field" style={{marginTop:14}}>
                <label>Konu</label>
                <select value={form.konu} onChange={e=>setForm({...form, konu:e.target.value})}>
                  <option>Bireysel Terapi</option>
                  <option>Çift / İlişki Terapisi</option>
                  <option>Online Terapi</option>
                  <option>Ergen Danışmanlığı</option>
                  <option>Kurumsal / Atölye</option>
                </select>
              </div>

              <div className="field" style={{marginTop:14}}>
                <label>Mesajınız</label>
                <textarea value={form.mesaj} onChange={e=>setForm({...form, mesaj:e.target.value})} placeholder="Kısaca sizi dinlemek isterim. Ne için destek arıyorsunuz?" rows="5" />
              </div>

              <div className="form-foot">
                <p className="form-note">Gönderimle birlikte <u>gizlilik politikasını</u> kabul etmiş olursunuz. Acil risk durumunda 112 veya en yakın sağlık kuruluşuna başvurun.</p>
                <button type="submit" className="btn-submit" disabled={sending}>
                  {sending ? 'Gönderiliyor…' : 'Mesaj Gönder'}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6"/></svg>
                </button>
              </div>
            </form>
          </div>

          {/* FAQ quick */}
          <div className="faq-grid reveal" style={{marginTop:18}}>
            <div className="faq-item">
              <h5>Seans ücreti ve süresi nedir?</h5>
              <p>Seanslar 50 dakikadır. Güncel ücret ve müsaitlik için iletişime geçin; öğrenci ve ihtiyaç odaklı kontenjan bilgisi paylaşılır.</p>
            </div>
            <div className="faq-item">
              <h5>Online terapi yüz yüze kadar etkili mi?</h5>
              <p>Evet. Araştırmalar pek çok durumda eşdeğer etkililik gösteriyor. Sessiz, kesintisiz bir alan ve stabil internet yeterli.</p>
            </div>
            <div className="faq-item">
              <h5>İlk görüşmede ne olur?</h5>
              <p>Tanışma, beklentiler ve terapi çerçevesi konuşulur. Uygunluk değerlendirilir; birlikte bir yol haritası çıkarırız.</p>
            </div>
            <div className="faq-item">
              <h5>Gizlilik nasıl korunuyor?</h5>
              <p>Tüm paylaşımlar meslek etiği ve KVKK kapsamında gizlidir. Yasal istisnalar (risk durumları) ilk seansta şeffafça açıklanır.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-left">
            <b>Halil Karaduman.</b><br/>
            Psikolog • Ankara & Online<br/>
            <span>© {new Date().getFullYear()} Halil Karaduman. Tüm hakları saklıdır. Bu site tıbbi tanı koymaz; bilgiler psiko-eğitim amaçlıdır.</span>
          </div>
          <div className="footer-links">
            <a href="#">Gizlilik</a>
            <a href="#">Aydınlatma Metni</a>
            <a href="#">Çerez Politikası</a>
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
