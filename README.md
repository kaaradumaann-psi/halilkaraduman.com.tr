# halilkaraduman.com.tr — Psikolog Web Sitesi

**Psikolog Halil Karaduman** için tasarlanmış, **nadirmermer.com** referans alınarak React + Vite ile geliştirilmiş modern psikolog portfolyo / terapi sitesi.

> Birebir kopya değil; aynı **minimal-editoryal** dilde yeniden yorumlandı: açık zemin, güçlü tipografi, numaralı bölümler (01/02/03/04), kartlı hizmetler, timeline özgeçmiş, video/kaynak alanı ve sade iletişim formu.

## Özellikler
- **Hero** — büyük serif başlık, güven rozetleri, online/yüz yüze uygunluk kartı
- **01 / Uzmanlık Alanları** — 7 kartlı hizmet grid'i (featured + 6), hover, yumuşak gölge
- **02 / Özgeçmiş** — dikey timeline (staj, eğitim, klinik deneyim)
- **03 / Anlatı & Kaynaklar** — YouTube tarzı video kartları + blog Yazıları
- **04 / İletişim** — sol koyu bilgi paneli + sağ form (KVKK notu, toast bildirim)
- Responsive (mobilde hamburger), smooth-scroll, reveal animasyonları, sticky blurred nav
- Tipografi: `DM Sans` + `Newsreader` (Google Fonts), renk paleti: `#FDFCF9` / `#111113` / `#C2B5A3` / `#7A8A7A`

## Teknoloji
React 19 + Vite 8 + Vanilla CSS (tasarım sistemi `src/index.css` içinde)

## Çalıştırma
```bash
npm install
npm run dev    # http://localhost:5173
npm run build  # dist/
npm run preview
```

## Yapı
```
src/
  App.jsx      # tek sayfa bölümler
  index.css    # tasarım sistemi + tüm stiller
  main.jsx
public/favicon.svg
index.html
vite.config.js # host 0.0.0.0 + allowedHosts true (Arena preview uyumlu)
```

## Tasarım Notu
Referans site nadirmermer.com'un ruhu korundu (beyaz/ekru zemin, ince border, yuvarlatılmış kartlar, numaralı başlıklar) fakat içerik, renk vurguları ve bölüm hiyerarşisi Halil Karaduman'ın klinik kimliğine göre özgünleştirildi.

## Lisans
Özel proje — halilkaraduman.com.tr
