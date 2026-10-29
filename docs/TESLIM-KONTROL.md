# TESLİM KONTROLÜ — Mega Cars v2 (Galzura teslim listesi)

> Güncelleme: 29.10.2026 · Dal: `v2` · Önizleme: https://megacars-git-v2-volkancatak1309-maxs-projects.vercel.app (girişsiz, noindex) · Hız ölçümleri: `docs/LIGHTHOUSE.md` · Kararlar ve kaynaklar: `docs/KARAR-DEFTERI.md`
> Durum: ✓ tamam · ◐ kısmen · ✗ eksik. Her eksik madde nedeniyle yazıldı.

## 1. Teslim listesi

| # | Madde | Durum | Kanıt / not |
|---|---|---|---|
| 1 | **Lighthouse** (29.10.2026, f823edc; 4 sayfa × mobil/masaüstü × 3 ölçüm, ortanca) | ◐ | **Masaüstü** Performans 90–96, LCP 0,75–1,54 sn ✓. **Mobil** Performans 73–77, LCP 4,39–5,62 sn ✗ (hedef 80 / 3,0 sn; Volkan'ın 23.10.2026 kararıyla askıda, hız işi yapılmıyor). CLS ≤ 0,014 ✓. İlk yük JS 228–237 KB ✓. Erişilebilirlik 8/8 ölçümde 100; en iyi uygulamalar 96–100 (tek eksik: logonun küçük dosyalarında piksel yuvarlaması; logoya dokunulmadı); SEO 69 (bilerek, noindex). Konsol hatası 0. Ayrıntı ve ekran görüntüleri: `docs/LIGHTHOUSE.md`. |
| 2 | **WebP + srcset** | ✓ | Araç fotoğrafları WebP 240 / 800 / 1600 w `srcset` + bulanık yer tutucu + tembel yükleme (Supabase deposu; yedek `public/cars` 240/800/1440). Açılış posterleri WebP: masaüstü 100 KB, telefon 22 KB (`/hero/gt2/`). Açılış filmi H.264 MP4 (29.10.2026): **masaüstü 1920×1080, 14,4 MB, `/hero/gt2/desktop.mp4`, VMAF 96,44**; **telefon 1080×1920, 8,3 MB, `/hero/gt3/mobile.mp4`, VMAF 96,44**. Telefon dosyası için 2,5 MB kuralı Volkan'ın kararıyla kalktı. Paylaşım görselleri JPG (Open Graph standardı). |
| 3 | **Premium düğmeler** | ✓ | Bütün düğmeler, menü linkleri, filtre hücreleri ve form düğmelerinde kırmızı kepenk + yazı yuvarlanması (`Shutter`), manyetik CTA, tıklamada 0.98, 2 px odak halkası. Bilinçli istisnalar: dev telefon numarası (hover'da kırmızı alt çizgi), Datenschutz içindekiler linkleri, form seçim çipleri. |
| 4 | **Her bölümde hareket** | ✓ | İç sayfa açılışı: dağınık harf yükselişi + maskeli başlık; liste: dev rakam, GSAP Flip, clip-path kartlar, sayaçlı sonuç sayısı; detay: perde, fiyat odometresi, teknik kart; açılış bölümü: harflerin içinde film + yavaş yakınlaşma; açılış ekranı: galerinin logosu yavaşça belirir, kromun üzerinden ışık geçer, gece paneli ve kırmızı perde kalkar (28.10.2026). |
| 5 | **Hareket azaltma (reduced motion)** | ✓ | 29.10.2026 ölçümü (önizleme, 390 + 1440 px): açılış ekranında logo 0,6 sn'de belirir, 1,4–1,9 sn'de solar; ışık geçişi ve perde yok. **Bulunup düzeltilen:** genel reduced-motion kuralı bu solmaları 0,01 ms'ye kısıyordu, açılış ekranı hiç görünmüyordu (f823edc). Açılış filmi eklenmiyor (poster kalıyor); kaydırınca satır içi dönüşüm ve çalışan animasyon 0; grain gizli; Lenis kapalı. |
| 6 | **DE / EN / TR %100** | ✓ | Dil seçici DE · EN · TR, çevrilmiş yollar (/en/vehicles, /tr/araclar …); tıklama testi `docs/DIL-TESTI.md`. Bilerek Almanca kalanlar: plaka kapağındaki slogan ve Facebook alıntısı (EN/TR'de çevirisiyle). Panamera kasa tipi üç dilde: Limousine · Saloon · Sedan (29.10.2026). |
| 7 | **Konsol** | ✓ | 24 Lighthouse ölçümünde ve 72 sayfa görünümünde (8 sayfa × 3 dil × 390/1440/2560) konsol hatası 0. |
| 8 | **robots + sitemap + favicon + OG** | ✓ | `robots.txt` şimdilik `Disallow: /` + her sayfada `noindex` + `X-Robots-Tag` (canlıya geçişte `lib/launch.ts` → `INDEXABLE = true`). `sitemap.xml` 72 adres (6 sayfa + 18 araç × 3 dil, hreflang'li; her istekte üretilir, panelden eklenen araç hemen girer; gizli Ankauf dışarıda). Favicon `icon.png` 64 px, `apple-icon.png` 180 px ve yedek `og/default.jpg` galerinin logosundan (`assets/brand/logo.png`). OG/Twitter her sayfada mutlak adresli; araç sayfasında kendi kapak fotoğrafı. JSON-LD: AutoDealer, Car + Offer, BreadcrumbList. |
| 9 | **Bir yıl immutable önbellek** | ✓ | 29.10.2026'da önizlemede ölçüldü: `/hero/gt2/desktop.mp4`, `/hero/gt3/mobile.mp4`, `/hero/gt2/poster-desktop.webp`, `/cars/…webp`, `/brand/…webp` ve Supabase'deki araç fotoğrafları → `public, max-age=31536000, immutable`. Yeni film kodlaması her zaman yeni klasöre gider (`/hero/gt2/`, `/hero/gt3/`). |
| 10 | **Vercel'in GitHub'a bağlı otomatik yayını** | ✓ | Her `v2` push'u Vercel'de kendiliğinden derlendi (commit durumu "success"); elle CLI deploy yapılmadı. |
| 11 | **Veritabanı + araç yönetim paneli** | ✓ | Supabase projesi "megacars" (Frankfurt). 18 örnek araç + 90 fotoğraf; `data/inventory.json` yedek. Panel `/de/admin` ve `/tr/admin`: giriş, liste (arama, filtre, toplu işlem), ekleme/düzenleme (tarayıcıda WebP + EXIF temizliği, sıralama, kapak), arşiv/geri al/kalıcı sil. Kayıttan sonra site 1–3 sn içinde güncellenir. Rehber: `docs/ARAC-PANELI-REHBERI.md` + `.pdf`. Araçları galeri sahibi panelden kendisi yükleyecek (29.10.2026). |
| 12 | **Güvenlik (RLS, yazma yalnız yönetici)** | ✓ | RLS üç tabloda açık; Supabase güvenlik danışmanı 0 uyarı; dışarıdan kayıt kapalı; publishable key ile yazma 401, gizli araç okunamaz; girişsiz panel → giriş sayfası (23.10.2026 ölçümü). |
| 13 | **Panel uçtan uca testi** | ✓ | 73 kontrol (DE masaüstü + TR telefon); 28.10.2026'da yeni logoyla yeniden 73/73. |
| 14 | **Erişilebilirlik** (29.10.2026, 28–29.10 değişikliklerinden sonra) | ✓ | **axe-core 4.13** (WCAG 2.0/2.1/2.2 A + AA): 8 sayfa × 3 dil × 390/1440/2560 = 72 görünümde ihlal 0; açık menü, filtre paneli ve test sürüşü penceresi (DE + TR, 390 px) ihlal 0, Esc ile kapanıyor. Adsız ikonlu düğme/bağlantı 0. Yatay taşma 0 (2560 px dahil). **Kontrast:** axe, yazıların arka planını kepenk katmanı, fotoğraf ve film yüzünden belirleyemediği için ekran pikselinden ayrıca ölçüldü (4.689 yazı kutusu; 390/1440/2560; film 3 anda; açık menü). Eşiğin altında kalan gerçek yazı yok; işaretlenenler kutuya giren çizgi ya da çerçeve ve ölçüm yöntemi kaynaklı, kırpılmış görüntülerle tek tek kontrol edildi. Renk çiftleri: kemik/gece 15,97:1 · gri/gece 6,78:1 · beyaz/kırmızı 5,24:1 · koyu gri/kemik 5,82:1. **Klavye:** ana sayfa, liste, detay, iletişim (1440) ve TR ana sayfa (390): her durakta görünür odak halkası; test sürüşü penceresinde odak pencere içinde kalıyor, Esc kapatıp odağı düğmeye geri veriyor. **Bulunup düzeltilenler:** (1) hareket azaltmada açılış ekranı görünmüyordu (madde 5); (2) tarih alanındaki takvim düğmesine klavyeyle gelince odak halkası yoktu → diğer alanlardaki halkanın aynısı (f823edc); (3) telefon bağlantısının erişilebilir adı görünen numarayla başlamıyordu (WCAG 2.5.3) → "+43 660 6877002 – Mega Cars anrufen", üç dilde (6a26281). Tasarım ve logo değişmedi. |

## 2. Bizim yapacaklarımız (galeriden bir şey beklemeyenler)

1. **Gerçek iPhone denemesi:** açılış filmi (Safari) ve paneldeki "Fotoğraf çek" (kamera) düğmesi. Bilgisayardaki iPhone taklidinde film oynadı; gerçek cihazla denenmedi.

## 3. Galeriden beklenenler

1. **İletişim:** +43 660 6877002 ve megacars@live.at doğru mu, bu numara WhatsApp'ta açık mı, ikinci numara (+43 660 6969496) sitede yazsın mı?
2. **Açılış saatleri:** Öğle arası veriyorlar mı, pazar ve tatil günleri randevuyla açıyorlar mı?
3. **Hizmetler:** Finanzierung, Inzahlungnahme/Ankauf, Tausch, Leasing ve bakımdan hangilerini gerçekten veriyorlar? (Ankauf sayfası hazır, onay gelene kadar gizli: `lib/launch.ts` → `PAGES.tradeIn`.)
4. **KDV:** İlan fiyatları KDV dahil son fiyat mı, yoksa "differenzbesteuert" mi? (§ 5 Abs. 2 ECG; canlıya çıkmadan önce gerekli.)
5. **Yasal bilgiler:** Doğru UID numarası ve güncel Firmenbuch dökümündeki tam unvan (Impressum için yasal olarak gerekli).
6. **"Seit 2002":** Sitede yazılabilir mi?
7. **Hakkımızda:** Galerinin kendi hikâyesi ve fotoğrafları (28.10.2026: müşteri gönderecek; gelene kadar sayfa değişmiyor).
8. **Panel hesabı:** Galeri sahibinin panel hesabı hangi e-posta adresiyle açılsın?
9. **Alan adı:** megacars.at kimde kayıtlı, DNS ayarlarına kim erişebiliyor?
10. **Logo:** Logonun orijinal (vektör ya da yüksek çözünürlüklü) dosyası var mı? (Gelirse yalnız `assets/brand/logo.png` değişir.)
11. **Onay:** Yeni siteyi onaylıyorlar mı? (Canlıya geçiş bu onaydan sonra başlar.)

## 4. Volkan kararıyla yapılmayacaklar / bekletilenler

1. **Hız iyileştirmeleri** (Volkan, 23.10.2026 ve 29.10.2026): mobil LCP < 3,0 sn ve mobil Performans ≥ 80 hedefi, modal açan düğmelerin INP'si (4× yavaşlatmada 224–296 ms), araç fotoğraflarının önbellek ayarı (ölçüldü: zaten bir yıl immutable, madde 9). Bu sitede hız işleriyle uğraşılmıyor.
2. **Stok yükleme:** Güncel araçları ve fotoğraflarını galeri sahibi panelden kendisi yükleyecek; biz yüklemeyeceğiz (29.10.2026).
3. **360° deneme çekimi:** şimdilik bekliyor (29.10.2026). Görüntüleyici hazır; spin verisi eklenince aracın showroom'u kendiliğinden açılır.
4. **Canlıya geçiş:** galeri yeni siteyi onaylayınca ayrıca yapılacak (aşağıdaki adımlar).

## 5. Canlıya geçiş adımları (galeri onayından sonra)

1. Galerinin yeni siteyi onayı.
2. **Sitedeki 18 örnek aracın durumu canlıya geçmeden önce galeri sahibiyle netleşecek** (kalacak, satıldı işaretlenecek ya da kaldırılacak); galeri sahibi güncel araçlarını panelden yükler.
3. Galeri sahibinin panel hesabı açılır (e-posta galeriden; madde 3.8).
4. Yasal eksikler tamamlanır: UID, Firmenbuch unvanı, fiyatların KDV notu (madde 3.4–3.5).
5. Supabase anahtarları Vercel'de **Production** ortamına eklenir (şimdi yalnız Preview + Development); Supabase Auth'ta site adresi ve yönlendirme listesine canlı adres eklenir.
6. megacars.at alan adı Vercel projesine bağlanır, DNS kaydı değiştirilir (erişim galeriden; madde 3.9).
7. Site Google'a açılır: `lib/launch.ts` → `INDEXABLE = true` (robots.txt engeli ve `noindex` kalkar; sitemap canlı adresle).
8. `v2` → `main` birleştirilir (Volkan'ın onayıyla); üretim derlemesi Vercel'de GitHub'dan.
9. Canlı adreste kontrol: robots.txt, sitemap.xml, önbellek başlıkları, konsol hatası, Lighthouse SEO, panelden deneme kaydı.
