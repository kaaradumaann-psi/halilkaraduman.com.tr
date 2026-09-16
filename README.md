# halilkaraduman.com.tr — Psikolog Web Sitesi

React + Vite ile hazırlanmış, Cloudflare Workers Static Assets üzerinde yayınlanacak kişisel web sitesi.

## Hedef mimari

```text
GitHub: kaaradumaann-psi/halilkaraduman.com.tr
        ↓
Cloudflare Workers + Static Assets
        ↓
https://halilkaraduman.com.tr
        ↓
POST /api/contact
        ↓
Cloudflare Worker
        ↓
Resend API
        ↓
contact@halilkaraduman.com.tr
```

Sitedeki HTML, CSS ve JavaScript dosyaları `dist/` klasöründen Static Assets olarak servis edilir. Sadece `/api/*` istekleri Worker koduna gider. Böylece Resend API anahtarı tarayıcıya gönderilmez.

## Sitede bulunan bölümler

- **Hero** — ortalı karşılama; kişi fotoğrafı (`public/foto.jpg|png|webp`), fotoğraf yoksa HK monoğramlı yedek daire; sosyal medya butonları
- **01 / Hakkımda** — kısa tanıtım, eğitim/konum/odak künyesi
- **02 / Çalışmalar** — MMPI değerlendirme aracı için hazırlanan çalışma kartı
- **03 / Özgeçmiş** — Eğitim (Lisans + boş Yüksek Lisans satırı), Sertifikalar (placeholder kutular) ve tarihsel sıralı staj deneyimleri
- **04 / İletişim** — e-posta kartı ve ad/e-posta/mesaj alanlarından oluşan çalışan iletişim formu
- **Footer** — sosyal medya ikonları ve telif satırı
- Responsive menü, doğru bölüm navigasyonu, smooth scroll, reveal animasyonları ve toast bildirimleri

## İçeriği özelleştirme

| Ne | Nerede | Not |
| --- | --- | --- |
| Sosyal medya linkleri | `src/App.jsx` → `SOCIALS` | Hero ve footer birlikte güncellenir |
| Sertifikalar | `src/App.jsx` → `CERTS` | `name` ve `year` doldurulunca kutu gerçek içeriğe döner |
| Kişi fotoğrafı | `public/foto.jpg` (veya `.png`/`.webp`) | Eklenince yedek monoğram otomatik kaybolur |
| Logolar | `public/logo-mark.png` (nav), `public/logo-full.png` (sosyal önizleme) | Orijinal görsel kökte yedekli |

## Dosya yapısı

```text
src/App.jsx              # React arayüzü ve iletişim formu
src/index.css            # Tasarım sistemi ve responsive stiller
worker/index.js          # Cloudflare Worker ve /api/contact endpoint'i
wrangler.jsonc           # Workers + Static Assets yapılandırması
.dev.vars.example        # Yerel secret dosyası için örnek
public/favicon.svg
vite.config.js
```

## 1. Bilgisayarı hazırlama

Node.js 20 veya daha yeni bir sürüm kurulu olmalı. Terminalde kontrol et:

```bash
node --version
npm --version
```

Daha sonra projenin klasöründe çalıştır:

```bash
npm install
```

Bu projede Wrangler, `devDependencies` içinde kurulu olduğu için ayrıca global kurulum yapmana gerek yok.

## 2. Resend hesabını ve alan adını hazırlama

İletişim formunun e-posta gönderebilmesi için önce Resend ayarlanır.

1. [resend.com](https://resend.com) adresine git ve hesap oluştur.
2. Resend panelinde **Domains → Add Domain** bölümünü aç.
3. Alan adı olarak `halilkaraduman.com.tr` yaz.
4. Resend'in gösterdiği DNS kayıtlarını ayrı bir sekmede Cloudflare'a ekle:
   - Cloudflare Dashboard'a gir.
   - **Websites → halilkaraduman.com.tr → DNS → Records** bölümünü aç.
   - Resend'in verdiği her kaydı **Add record** ile tek tek ekle.
   - Kayıt türü, isim ve değer alanlarını Resend'de yazdığı şekilde kopyala.
   - E-posta ile ilgili kayıtları proxy'leme; DNS kayıtları **DNS only** olarak kalmalı.
5. Resend'e dön ve **Verify DNS Records** butonuna bas. DNS yayılması birkaç dakika sürebilir.
6. Resend panelinde **API Keys → Create API Key** seç.
7. İsmini örneğin `halilkaraduman-workers` yap ve gönderim yetkisi olan anahtarı oluştur.
8. Oluşan `re_...` anahtarını güvenli bir yere kopyala. Bu anahtarı GitHub'a, frontend koduna veya sohbet mesajına yazma.

`CONTACT_FROM` değeri, Resend'de doğruladığın alan adından gelmelidir. Bu projedeki varsayılan gönderen:

```text
Halil Karaduman <website@halilkaraduman.com.tr>
```

## 3. Yerelde çalıştırma ve test etme

Yerel Worker, gerçek Resend API'sine bağlanabilsin diye gizli değişken dosyası oluştur.

macOS / Linux:

```bash
cp .dev.vars.example .dev.vars
```

Windows PowerShell:

```powershell
Copy-Item .dev.vars.example .dev.vars
```

`.dev.vars` dosyasını bir metin editörüyle aç ve örnek değeri kendi Resend API anahtarınla değiştir:

```text
RESEND_API_KEY="re_buraya_resend_anahtarini_yaz"
```

Bu dosya `.gitignore` içindedir ve GitHub'a gönderilmez.

Şimdi Worker'ı yerelde başlat:

```bash
npm run worker:dev
```

Komut önce Vite ile `dist/` klasörünü oluşturur, sonra Wrangler'ı başlatır. Terminalde verilen yerel adresi, genellikle `http://localhost:8787`, tarayıcıda aç.

Formu gerçek bir ad, e-posta ve mesaj ile test et. Bu test Resend üzerinden gerçek e-posta gönderir.

Worker'ı durdurmak için terminalde `Ctrl + C` tuşlarına bas.

## 4. Cloudflare'a giriş yapma

Bir kez çalıştır:

```bash
npx wrangler login
```

Tarayıcı açılır. Cloudflare hesabını seçip erişim iznini onayla. Sonra terminalde kontrol et:

```bash
npx wrangler whoami
```

Doğru Cloudflare hesabının e-posta adresini görüyorsan devam edebilirsin.

## 5. Production Resend secret'ını Cloudflare'a ekleme

Yereldeki `.dev.vars` dosyası production Worker'a otomatik aktarılmaz. Production secret'ını ayrıca eklemek gerekir.

Terminalde çalıştır:

```bash
npx wrangler secret put RESEND_API_KEY
```

Terminal senden değeri isteyince Resend'den aldığın `re_...` anahtarını yapıştır ve Enter'a bas. Yapıştırırken ekranda karakter görünmemesi normaldir.

Alternatif olarak Cloudflare Dashboard'dan:

1. **Workers & Pages** bölümünü aç.
2. `psikolog` Worker'ını aç.
3. **Settings → Variables and Secrets** bölümüne gir.
4. **Add → Secret** seç.
5. İsim olarak `RESEND_API_KEY`, değer olarak Resend anahtarını yaz.
6. Kaydet ve deploy et.

`CONTACT_FROM` ve `CONTACT_TO` gizli değildir; `wrangler.jsonc` içinde tanımlıdır. Gönderen veya alıcı adresini değiştirmek istersen bu dosyadaki değerleri güncelle.

## 6. İlk production deploy

Proje klasöründe:

```bash
npm run deploy
```

Bu komut iki iş yapar:

1. `npm run build` ile React sitesini `dist/` klasörüne derler.
2. `wrangler deploy` ile Worker kodunu ve `dist/` içindeki Static Assets dosyalarını Cloudflare'a gönderir.

Başarılı deploy sonunda Wrangler bir `workers.dev` adresi gösterir. Önce bu adreste kontrol et:

- Ana sayfa açılıyor mu?
- Üst menü doğru bölümlere gidiyor mu?
- İletişim formu gerçekten e-posta gönderiyor mu?

## 7. `halilkaraduman.com.tr` özel alan adını bağlama

Önce eski bir Cloudflare Pages projesi aynı alan adını kullanıyorsa, onun **Custom domain** bağlantısını kaldır. DNS bölgesini veya alan adını silme; yalnızca eski Pages bağlantısını kaldır. Aynı hostname iki farklı Cloudflare projesine bağlanamaz.

Sonra:

1. Cloudflare Dashboard → **Workers & Pages** bölümüne gir.
2. `psikolog` Worker'ını aç.
3. **Settings → Domains & Routes** bölümüne gir.
4. **Add → Custom Domain** seç.
5. `halilkaraduman.com.tr` yaz.
6. Onayla ve Cloudflare'ın domain aktivasyonunu tamamlamasını bekle.

Alan adının nameserver'ları Cloudflare'da olmalı. Zaten siteyi Cloudflare üzerinden yönetiyorsan bu işlem çoğunlukla otomatik DNS kaydı oluşturur.

İstersen ayrıca `www.halilkaraduman.com.tr` adresini de aynı Worker'a ekleyebilirsin. Daha sonra ana alan adına yönlendirme kararı verilebilir.

## 8. GitHub'a her push'ta otomatik deploy

Manuel `npm run deploy` çalıştırmak yerine Cloudflare Workers Builds ile GitHub bağlantısı kurabilirsin.

1. Cloudflare Dashboard → **Workers & Pages** → `psikolog` Worker'ı aç.
2. **Settings → Builds** bölümüne gir.
3. **Connect** seçeneğine bas.
4. GitHub hesabını yetkilendir.
5. `kaaradumaann-psi/halilkaraduman.com.tr` repository'sini seç.
6. Production branch olarak `main` seç.
7. Ayarları şöyle gir:

```text
Root directory: /
Build command: npm run build
Deploy command: npx wrangler deploy
```

8. Production branch build'lerini etkinleştir.
9. Kaydet ve ilk build'in tamamlanmasını bekle.

Bundan sonra `main` branch'ine yapılan her push önce `npm run build`, sonra `npx wrangler deploy` çalıştırır.

Cloudflare Dashboard'daki Worker adı ile `wrangler.jsonc` içindeki `name` aynı olmalıdır:

```text
psikolog
```

GitHub'daki API anahtarını build ayarlarına ekleme. `RESEND_API_KEY` bir **runtime secret** olarak Worker'ın **Variables and Secrets** bölümünde kalmalıdır.

## 9. Endpoint'i terminalden test etme

Domain bağlandıktan sonra aşağıdaki komutla form endpoint'ini test edebilirsin. Bu komut gerçek e-posta gönderir:

```bash
curl -i -X POST https://halilkaraduman.com.tr/api/contact \
  -H "Content-Type: application/json" \
  --data '{"name":"Test Kullanıcısı","email":"test@example.com","message":"Bu bir test mesajıdır.","website":""}'
```

Başarılı cevap şuna benzer:

```json
{"ok":true}
```

`GET https://halilkaraduman.com.tr/api/contact` ile tarayıcıda açınca 405 görmen normaldir; endpoint yalnızca formun yaptığı `POST` isteğini kabul eder.

## 10. Sorun giderme

### Form `mailto:` açıyor

Yerel Vite sunucusunda (`npm run dev`) Worker endpoint'i çalışmaz. `npm run worker:dev` ile test et veya production'da `RESEND_API_KEY` secret'ının eklendiğini kontrol et.

### `503 İletişim servisi henüz yapılandırılmadı` geliyor

Worker production ortamında `RESEND_API_KEY` bulunamıyor. Şunu tekrar çalıştır:

```bash
npx wrangler secret put RESEND_API_KEY
```

Ardından yeniden deploy et.

### Resend 403 veya 422 döndürüyor

- Resend domain durumunun **Verified** olduğuna bak.
- `CONTACT_FROM` adresinin doğrulanmış alan adından geldiğini kontrol et.
- `website@halilkaraduman.com.tr` adresini Resend'de doğruladığın domain ile eşleştir.

### Site açılıyor ama `/api/contact` 404 dönüyor

- İstek gerçekten `halilkaraduman.com.tr` Worker domain'ine mi gidiyor kontrol et.
- Eski Pages custom domain bağlantısı varsa kaldır.
- Deploy sırasında `wrangler.jsonc` dosyasının proje kökünde olduğundan emin ol.
- `assets.run_worker_first` içinde `/api/*` bulunduğunu kontrol et.

### DNS doğrulaması bekliyor

Resend'in verdiği DNS kayıtlarını eksiksiz kopyala. DNS yayılımı zaman alabilir. Cloudflare DNS ekranındaki kayıtların proxy durumunu Resend'in istediği şekilde bırak.

## Güvenlik notları

- `RESEND_API_KEY` hiçbir zaman `src/` dosyalarına yazılmaz.
- `RESEND_API_KEY` hiçbir zaman `VITE_` ile başlayan frontend değişkenine dönüştürülmez.
- `.dev.vars` Git'e eklenmez.
- Bir API anahtarı yanlışlıkla paylaşılırsa Resend panelinden hemen iptal edip yenisini oluştur.

## Resmi dokümantasyon

- [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [Cloudflare Workers Static Assets routing](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/)
- [Cloudflare Workers secrets](https://developers.cloudflare.com/workers/configuration/secrets/)
- [Cloudflare Workers Builds ve Git bağlantısı](https://developers.cloudflare.com/workers/ci-cd/builds/)
- [Cloudflare Workers ile Resend](https://developers.cloudflare.com/workers/tutorials/send-emails-with-resend/)
