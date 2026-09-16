# halilkaraduman.com.tr — Psikolog Web Sitesi (Sade)

**Psikolog Halil Karaduman** — yeni mezun, teknolojiyle psikolojiyi birleştiren sade portfolyo. **nadirmermer.com** referans alınarak **React + Vite** ile tasarlandı (birebir kopya değil, aynı minimal-editoryal dilde yorum).

> Yeni mezun vurgusu: gösterişsiz, dürüst, öğrenmeye açık. Komplex detaylar çıkarıldı, 4 bölümde sade akış: Hakkımda → Çalışmalar → Özgeçmiş → İletişim.

## Bölümler
- **Hero** — “Psikoloji ile teknolojiyi aynı masada buluşturuyorum.” Kicker: *Yeni Mezun • Psikolog & Geliştirici*, sade portre, 2 CTA
- **01 / Çalışmalar** — Sadece 2 kart: **MMPI Değerlendirme Aracı** (featured, koyu) + *Yeni fikirler yolda* dashed placeholder. MMPI butonu var ama **henüz pasif** — tıklayınca toast: “Çok yakında”.
- **02 / Özgeçmiş** — İzmir Bakırçay Üniversitesi Psikoloji lisans eğitimi, Gelişim Analiz Danışmanlık ve Gemlik Devlet Hastanesi staj deneyimleri.
- **03 / İletişim** — Sol koyu panel (e-posta/konum) + sağ 3 alanlı form (Ad/E-posta/Mesaj), toast bildirim, 2 sosyal ikon (yakında)

- Responsive hamburger, sticky blurred nav, smooth scroll, reveal animasyon, toast
- Tipografi: `DM Sans` + `Newsreader`, palet: `#FDFCF9` / `#111113` / `#C2B5A3`
- Vanilla CSS (`src/index.css` içinde tasarım sistemi)

## Çalıştırma
```bash
npm install
npm run dev    # http://localhost:5173
npm run build
npm run preview
```

## Yapı
```
src/App.jsx      # sade tek sayfa
src/index.css    # tüm stiller
public/favicon.svg
vite.config.js   # host 0.0.0.0 + allowedHosts true (Arena preview uyumlu)
functions/api/contact.js # Cloudflare Pages Function — Resend iletişim endpoint'i
```

## Cloudflare üzerinde iletişim formunu aktifleştirme

Form, doğrudan tarayıcıdan üçüncü taraf bir endpoint'e gitmek yerine `/api/contact` adresindeki **Cloudflare Pages Function** üzerinden çalışır. Function, e-postayı Resend API ile `contact@halilkaraduman.com.tr` adresine iletir.

1. Resend'de hesap açıp `halilkaraduman.com.tr` alan adını doğrula.
2. Resend API anahtarı oluştur.
3. Cloudflare Dashboard → **Workers & Pages** → ilgili Pages projesi → **Settings → Variables and Secrets** bölümüne Production için şu değişkenleri ekle:
   - `RESEND_API_KEY` — Resend API anahtarı, **Secret** olarak.
   - `CONTACT_FROM` — doğrulanmış alan adından bir gönderen, örneğin `Halil Karaduman <website@halilkaraduman.com.tr>`.
   - `CONTACT_TO` — opsiyonel; boş bırakılırsa `contact@halilkaraduman.com.tr` kullanılır.
4. Yeni deploy başlat. Cloudflare Pages, kökteki `functions/api/contact.js` dosyasını otomatik olarak `/api/contact` rotasına bağlar.

Yerelde yalnızca `npm run dev` çalışırken Pages Function devreye girmez. Bu durumda form, otomatik olarak kullanıcının `mailto:` uygulamasına düşer. Cloudflare üzerinde değişkenler tanımlandıktan sonra form sunucu üzerinden çalışır. Daha güçlü bot koruması için sonraki adım olarak Cloudflare Turnstile eklenebilir.

### Alternatif yollar

- **En hızlı:** Formspree veya FormSubmit gibi hazır bir form servisi kullanmak; ek backend gerekmez ancak üçüncü taraf bağımlılığı ve ücretsiz plan limitleri vardır.
- **Önerilen:** Bu repodaki Pages Function + Resend; API anahtarı tarayıcıya çıkmaz ve alan adı üzerinden gönderim yapılır.
- **Tam Cloudflare:** Pages yerine Workers kullanılıyorsa aynı endpoint bir Worker route olarak tanımlanmalı; Pages Function dosyası otomatik çalışmaz.

## Not
nadirmermer.com’un ruhu (ekru zemin, ince border, yuvarlatılmış kartlar, numaralı başlıklar) korunup içerik Halil’in yeni mezun kimliğine göre sadeleştirildi. MMPI yönlendirmesi hazır ama disabled; aktif etmek için tek satır yeterli.
