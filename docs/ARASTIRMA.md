# MEGACARS V2 — FAZ 1 ARAŞTIRMA

Tarih: 22.10.2026 · Dal: `v2` · Brif: `docs/BRIEF.md`

Etiketler: **[DOĞRULANDI]** + kaynak (link, dosya ya da kendi ölçümümüz) · **[VARSAYIM]** çıkarım ya da hesap · **[BİLMİYORUM]** bulunamadı.
Ekran görüntüleri `docs/referans/` altında (her biri ≤ 300 KB, JPG).

---

## 0. Özet: en önemli 10 bulgu

1. **AutoScout24'te bugün ilan yok.** Eski bayi adresi `autoscout24.at/haendler/mega-cars` ve `.de` karşılığı 404 veriyor. Aynı adresli yeni profil `autoscout24.at/haendler/mega-cars-hohenems` "MEGA CARS, Radetzkystrasse 80, 6845 Hohenems — **0 Ergebnisse**" gösteriyor. [DOĞRULANDI: tarayıcı + curl, 22.10.2026; `referans/autoscout24-mega-cars-hohenems-0-ilan.jpg`]
2. **Repodaki 18 aracın 18'i satılmış ya da yayından kalkmış.** 18 ilan adresinin hepsi 301 ile arama sayfasına yönleniyor. [DOĞRULANDI: curl, 22.10.2026] Envanter FAZ 3'te yeni kaynaktan alınmalı.
3. **Açılış videosu yapay zekâ üretimi ve stokta olmayan bir aracı gösteriyor** (Mercedes-AMG GT Black Series benzeri). Rozet yazıları bozuk ("AMG" yerine anlamsız harfler), 30 fps, 4 sert kesme. v2'de kullanılamaz. [DOĞRULANDI: `referans/hero-kareler/`]
4. **E-posta uyuşmazlığı:** `office@meral.at` alan adı MeralMedia adlı bir web ajansına ait; galerinin dizinlerdeki e-postası `megacars@live.at`. [DOĞRULANDI: https://meral.at, Herold, FirmenABC] Sitede hangi adresin kullanılacağını Volkan onaylamalı.
5. **Telefon uyuşmazlığı:** +43 660 1999472 hiçbir açık kaynakta geçmiyor; +43 660 6969496 (Herold, FirmenABC) ve +43 660 6877002 (shoogle, wemgehoert) galeriye ait görünüyor. [DOĞRULANDI: kaynaklar §a7]
6. **Hukuki ad:** Firmenbuch'ta "Mega Cars Murat Demir e.U.", FN 447871 i, Landesgericht Feldkirch. Eski unvan "Demir OG"; Mart 2026'da şirket türü değişmiş görünüyor. [DOĞRULANDI: https://www.evi.gv.at/f/447871i]
7. **İlan fotoğraflarından tam tur çıkmaz:** ilan başına 20–39 fotoğraf var ama dış açılar 5–8 civarında, düzensiz aralıklı, mesafe ve kamera yüksekliği değişken. [DOĞRULANDI: `referans/ilan-fotograf-acilari.jpg`]
8. **Galerinin gerçek marka ışığı ölçüldü:** showroom'daki ışıklı "MEGA CARS" tabelası ≈ `#9AAAE9` (OKLCH 0.75 0.09 273). v2 vurgu rengi buradan türetildi. Plaka kapaklarında galerinin kendi sloganı var: "Gewissenhaft · Verlässlich · Professionell". [DOĞRULANDI: repo fotoğraflarından piksel ölçümü]
9. **Showroom denemesi teknik olarak çalışıyor:** BiRefNet (MIT) ile ayna, tavan rayı ve cam kenarları %200'de temiz. Aracın tam opak piksellerinde orijinalle renk farkı **0**. Asıl sınır ışık ve perspektif uyuşmazlığı ile camdan görünen eski arka plan. [DOĞRULANDI: `showroom-deneme/`]
10. **Ev PC'de GPU var:** NVIDIA GeForce RTX 4050 Laptop, 6 GB VRAM, sürücü 592.82. [DOĞRULANDI: `nvidia-smi`]

---

## a) Mevcut durum

### a1. Eski site (megacars-one.vercel.app)

Ekran görüntüleri: `referans/eski-site-masaustu-hero.jpg`, `eski-site-masaustu-tam.jpg`, `eski-site-mobil-hero.jpg`, `eski-site-mobil-tam-1.jpg`, `eski-site-mobil-tam-2.jpg` (1440×900 ve 390×844, 22.10.2026).

**Neden eski görünüyor (8 madde):**

1. **Açılışın yıldızı galerinin aracı değil.** Yapay zekâyla üretilmiş, stokta olmayan bir AMG GT gösteriliyor; rozet yazıları bozuk (bkz. a3). Ziyaretçi aldatıldığını fark ettiği anda güven gider. [DOĞRULANDI]
2. **Fotoğraf dili tutarsız.** Her ilan başka bir ortamda: beyaz zeminli ve mavi LED'li iç showroom, bulutlu dış otopark, farklı beyaz dengesi, telefonun geniş açı bozulması. Izgara bir ilan sitesi gibi duruyor, tek bir galeri gibi değil. [DOĞRULANDI: `ilan-fotograf-acilari.jpg`]
3. **Tipografi bağırıyor.** Bütün başlıklar geniş, kalın ve büyük harf ("JEDER KILOMETER, GEPRÜFT."). Uzun Almanca kelimeler kırılıyor ("MERCEDES-/BENZ"); mono etiketler her yerde teknik kostüm gibi duruyor. Sakin premium Alman tonunun tersi. [DOĞRULANDI: masaüstü tam sayfa]
4. **Vurgu rengi markaya ait değil.** Doygun Tesla mavisi (#3C6BE2) fiyatlarda ve düğmelerde kullanılıyor; fiyatlar indirim etiketine benziyor. [DOĞRULANDI: eski DESIGN.md + ekran]
5. **Hiyerarşi ve yoğunluk.** Masaüstünde 4 sütunlu küçük kartlar ve küçük çipli filtre paneli var; kart yalnız yıl, km ve fiyat söylüyor. Mobilde ilk ekranın yarısı videoya, yarısı uzun metne gidiyor. [DOĞRULANDI]
6. **Okunurluk sorunları.** Açılışta logo ve metin, karla kaplı dağın ve aracın kaputunun üstünde duruyor; karartma yok. Mobilde "MEGACARS" logosu karın üstünde zor seçiliyor. Footer ve etiketlerde gri üstüne küçük gri mono yazı var. [DOĞRULANDI: `eski-site-mobil-hero.jpg`]
7. **Güven bölümü boş ve doğrulanamaz.** "Geprüfter Händler auf AutoScout24" büyük bir kartta tek cümle olarak duruyor ve bağlandığı profil bugün 404. "120-Punkte-Check", "Garantie" ve açılıştaki "2024 ·" ifadeleri belgelenmemiş. [DOĞRULANDI]
8. **Teknik iskelet.** Hash router (`#/fahrzeug/...`) yüzünden araç sayfaları Google'da ayrı adres olarak indekslenmiyor. Mobil ilk ekranda gezinme menüsü görünmüyor (yalnız DE/TR ve tema düğmesi). [DOĞRULANDI: kod + `eski-site-mobil-hero.jpg`]

### a2. Repodaki varlıklar

| Varlık | Ölçüm | Etiket |
|---|---|---|
| `cars-data.json` | **18 araç**: Mercedes-Benz 7, BMW 4, Porsche 1, Audi 1, VW 1, Volvo 1, Skoda 1, Chrysler (Jeep) 1, Land Rover 1. Fiyat 23.900–64.900 €. Gövde tipi alanı yok. | [DOĞRULANDI: dosya] |
| Bu 18 ilanın bugünkü durumu | 18/18 AutoScout24 adresi 301 ile arama sayfasına yönleniyor, yani ilanlar yayında değil. | [DOĞRULANDI: curl 22.10.2026] |
| `public/cars` | **90 WebP** (araç başına 5), toplam 15 MB. 88/90 dosya 1440×1080, 1 dosya 1439×1080, 1 dosya 810×1080 (dikey). | [DOĞRULANDI: PIL] |
| Rastgele 5 fotoğraf | volvo-xc60/2 1439×1080 (180 KB) · mercedes-c-220-d/5 1440×1080 (82 KB) · bmw-320-320-d/2 1440×1080 (243 KB) · bmw-x6/1 1440×1080 (135 KB) · volvo-xc60/3 1440×1080 (181 KB) | [DOĞRULANDI: PIL, tohum 22102026] |
| `public/hero/hero-main.mp4` | 10.269.693 bayt (≈10,3 MB), **1920×1080**, H.264, yuv420p, **30 fps**, **19,7 sn**, 591 kare, 4,17 Mbit/sn. Sert kesmeler: 5,3 · 8,1 · 13,8 · 17,6 sn (5 ayrı çekim). | [DOĞRULANDI: ffprobe + ffmpeg scene filtresi] |
| `public/hero/hero-poster.jpg` | 1920×1080, 138 KB | [DOĞRULANDI] |
| Fotoğraflardaki filigran | Fotoğraflarda galerinin kendi plaka kapağı "MEGA CARS.at · Gewissenhaft · Verlässlich · Professionell" görünüyor; bu, galerinin kendi plakalığı (fotoğrafa sonradan eklenmiş filigran değil). | [DOĞRULANDI: görsel inceleme] |

### a3. Açılış videosu: yapay zekâ izi var mı?

Kareler: `referans/hero-kareler/hero-t{0.5,3.5,6.5,9.5,12.5,15.5,18.5}s.jpg` ve %200 yakınlaştırmalar `zoom200-*.jpg`.

| Kanıt | Bulgu |
|---|---|
| `zoom200-arka-rozet-t3.5s.jpg` | Bagaj kapağındaki model yazısı okunamayan, ayna simetrisi bozuk harflerden oluşuyor ("AMG" ya da model adı değil). |
| `zoom200-yan-rozet-t18.5s.jpg` | Ön çamurluk rozetinde "ASRMZ" benzeri anlamsız harfler var. |
| `zoom200-on-izgara-rozet-t15.5s.jpg` | Izgaradaki AMG rozeti eriyip okunmaz bir lekeye dönüşmüş. |
| `zoom200-on-izgara-t9.5s.jpg` | Panamericana ızgara çubukları düzensiz; yıldızın arkasında bir çubuk "H" biçimine dönüşmüş. |
| `zoom200-arka-jant-t0.5s.jpg` | Jant ve kaliper inandırıcı; tek başına kanıt değil. |
| Sahne | 5 farklı mekân arka arkaya (karlı dağ, karsız vadi, bulutlu tepe); aynı aracın gerçek bir çekiminde mümkün olmayan bir kurgu. |

**Karar: kullanılamaz.** [DOĞRULANDI: karelerle] Nedenler: (1) yapay zekâ izi tam ekranda gözle görülüyor, (2) stokta olmayan araç ("YZ aracını stok aracı gibi gösterme" yasağı), (3) 30 fps ve sert kesmeler (brif: 24 fps, ani kesme yok). Yerine konacak açılış için seçenekler `docs/GORSEL-PLANI.md`'de.

### a4. Güncel stok (AutoScout24)

| Soru | Cevap | Etiket |
|---|---|---|
| Bugünkü ilan sayısı | **0** (`autoscout24.at/haendler/mega-cars-hohenems`). Eski profil `…/haendler/mega-cars` (.at ve .de) **404**. | [DOĞRULANDI: tarayıcı + curl, ekran görüntüsü] |
| Marka dağılımı, en düşük ve en yüksek fiyat | Bugün ilan olmadığı için hesaplanamıyor. Son bilinen durum (Haziran 2026, repo): 18 araç, 23.900–64.900 €. Arama motoru özetlerindeki "66 ilan" bilgisi eski dizinden geliyor. | [BİLMİYORUM] güncel · [DOĞRULANDI] Haziran verisi |
| Bayi puanı | Yeni profilde puan ya da yorum görünmüyor; iletişim adı "Kerim Demir". Eski profilin "4,97 / 27 yorum" bilgisi yalnız arama özetinde var. | [DOĞRULANDI] yeni profil · [VARSAYIM] eski puan |
| İlan fotoğraflarının indirilebilen en büyük çözünürlüğü | AutoScout24 görsel sunucusu (`prod.pictures.autoscout24.net`) istenen her boyutu **büyüterek** veriyor; 9999×7499 bile döndü. Bu yüzden "en büyük indirilebilir boyut" yanıltıcı bir ölçü. Repodaki kopyalar 1440×1080. Kaynak çözünürlük ilan başına değişir. Öneri: 1920×1440 istenir, keskinlik ölçülerek ilan başına gerçek çözünürlüğe inilir. | [DOĞRULANDI: canlı bir ilanın görseli 1024 / 1280 / 1440 / 1920 / 2560 / 4000 / 9999 px boyutlarında istendi] |
| Bot koruması | AutoScout24 sayfaları açıldı. Bölgesel portal ländleauto.at 403 verdi (zorlanmadı). Carvana Cloudflare ile engelledi (zorlanmadı). | [DOĞRULANDI] |

**Volkan'a soru:** Mega Cars'ın araçları şu an nerede yayında? AutoScout24'teki yeni profil boş. willhaben.at, mobile.de ya da başka bir kaynak varsa FAZ 3 içe aktarması oradan kurulur.

**FAZ 3 stok içe aktarımı için öneri (uygulanmadı):**
1. **Birincil: galeriden doğrudan veri akışı.** Bayinin ilan yazılımı ya da AutoScout24 bayi hesabı CSV/XML dışa aktarma veriyorsa bu en sağlam ve kurala uygun yoldur. [VARSAYIM: imkân bayiye göre değişir]
2. **Yedek: tarayıcı otomasyonu (Playwright).** Repodaki `_work` betiklerine benzer; günde bir kez, yalnız okuyarak, düşük hızla çalışır. Satılmış araçlar bir sonraki çalıştırmada otomatik düşer. Risk: platform kullanım koşulları ve sayfa yapısı değişikliği. [VARSAYIM]
3. **Ücretli yedek: Apify AutoScout24 aktörü.** Hızlı kurulur ama aylık ücret, üçüncü taraf bağımlılığı ve aynı kullanım koşulu riski vardır. [VARSAYIM]

Her üç yolda da çıktı tek dosyaya (`data/inventory.json`) yazılır; araç başına yalnız kendi fotoğrafları alınır; 360 alanı isteğe bağlıdır.

### a5. İlan fotoğraflarından tam tur çıkar mı?

- Haziran 2026 ilan dökümlerinde (27 dosya) ilan başına **20–39 fotoğraf** var; repoya ilan başına 5 fotoğraf alınmış. [DOĞRULANDI: `_work/details`]
- 4 aracın 5'er fotoğrafı (`referans/ilan-fotograf-acilari.jpg`) incelendi:
  - Dış açılar çoğunlukla ön ve ön 3/4. Arka 3/4 ilan başına 1–2 fotoğraf; tam yan profil nadir. 5 fotoğrafta 3–4 farklı dış açı var; ilanın geri kalanı iç mekân ve ayrıntı fotoğrafı. [DOĞRULANDI: görsel inceleme]
  - Mesafe yakın detaydan (far, jant) geniş plana kadar değişiyor. [DOĞRULANDI]
  - Kamera yüksekliği diz ile göğüs arasında değişiyor; telefonun geniş açısı belirgin bozulma yaratıyor (ör. BMW X6 önden). [DOĞRULANDI]
  - Mekân değişiyor: iç showroom ve dış otopark. [DOĞRULANDI]
- **Sonuç:** Akıcı bir tam tur çıkmaz. 36 eşit adım için 10°'de bir, aynı mesafe ve yükseklikten çekilmiş kare gerekir; ilanlarda tipik olarak 8'den az, düzensiz dış açı var. Eksik açıyı yapay zekâyla doldurmak yasak. [DOĞRULANDI + kural]

### a6. Instagram ve 360° video

- Mega Cars'a ait Instagram, TikTok ya da YouTube hesabı bulunamadı. [BİLMİYORUM]
- Facebook sayfası var: https://www.facebook.com/Autohaus.MegaCars/ ("Mega Car's | Hohenems"). "9.203 takipçi" ve "%96 tavsiye (38 yorum)" bilgisi yalnız arama özetinde var. [DOĞRULANDI: sayfa başlığı · VARSAYIM: sayılar]
- Haziran 2026 ilan dökümlerinde 360° ya da video öğesi yok (metin araması). [DOĞRULANDI: `_work/details`]
- Aracın etrafında dönen bir video ya da 360° görünüm hiçbir kaynakta bulunamadı. [BİLMİYORUM] Showroom için ilk çekim galeride yapılacak (bkz. `docs/360-CEKIM-REHBERI.md`).

### a7. Firma künyesi

| Bilgi | Değer | Etiket ve kaynak |
|---|---|---|
| Hukuki ad ve tür | **Mega Cars Murat Demir e.U.** (Einzelunternehmen), FN 447871 i, Landesgericht Feldkirch, Inhaber Murat Demir, Firmenbuch kaydı 02.03.2016, faaliyet "Handel sowie Wartung und Pflege von Kraftfahrzeugen" | [DOĞRULANDI] https://www.evi.gv.at/f/447871i |
| Eski unvan | "Demir OG"; 24.03.2026 tarihli Firmenbuch yayınında "Rechtsformänderung … Auflösung" geçiyor. Dizinler (cylex, yably) hâlâ "Mega Cars OG" yazıyor. | [DOĞRULANDI] evi.gv.at · [VARSAYIM] OG'nin e.U.'ya dönüştüğü |
| UID (ATU) | FirmenABC "ATU70884019" yazıyor ama AB VIES sorgusu geçersiz döndü. Sitede yayımlanmadan önce sahibinden alınmalı. | [BİLMİYORUM] https://www.firmenabc.at/mega-cars-murat-demir-e-u_MnFC |
| Adres | Radetzkystraße 80, 6845 Hohenems | [DOĞRULANDI] Firmenbuch + AutoScout24 yeni profil |
| Telefon 1 | +43 660 6969496 | [DOĞRULANDI] https://www.herold.at/gelbe-seiten/hohenems/c1J2N/mega-cars/ |
| Telefon 2 | +43 660 6877002 ("Mega Car's Demir Murat") | [DOĞRULANDI] https://www.wemgehoert.at/nummer/436606877002 |
| Brifteki +43 660 1999472 ve WhatsApp | Açık kaynakta yok; Volkan doğrulamalı. | [BİLMİYORUM] |
| E-posta | Dizinlerde `megacars@live.at`. Brifteki `office@meral.at`, MeralMedia (web/grafik ajansı, Wolfurt) alan adına ait. | [DOĞRULANDI] Herold, FirmenABC, https://meral.at |
| Açılış saatleri | Pzt–Cum 08:00–12:00 ve 13:00–18:00, Cmt 09:00–15:00, Pazar kapalı (ikincil kaynak, OSM verisi). Kaynaklar birbirini tutmuyor; Google'daki saat doğrulanamadı. | [VARSAYIM] https://at.shoogle.net/austria/hohenems/mega-cars/ |
| AutoScout24 puanı | Yeni profilde yok; eski "4,97 / 27" yalnız arama özetinde. | [BİLMİYORUM] |
| Google puanı | "4,7 / 109 yorum" yalnız bir derleyici sitenin özetinde (sayfa 403). | [BİLMİYORUM] |
| Kuruluş | Resmî kayıt 2016. "seit 2002" (AutoScout24 eski profil özeti) ve "Gründungsjahr 2007" (Herold) bayinin kendi beyanı, resmî kayıtla çelişiyor. Sitede yıl yazılmaz. | [DOĞRULANDI] Firmenbuch · [VARSAYIM] beyanlar |
| Logo | Resmî dijital logo dosyası bulunamadı. Bina tabelası ve showroom'daki ışıklı tabela "MEGA CARS" yazısından oluşuyor (kalın, geniş grotesk). | [DOĞRULANDI: repo fotoğrafları] · dosya [BİLMİYORUM] |
| Marka rengi | Işıklı tabela ≈ `#9AAAE9` (S 560 ve Panamera fotoğraflarından ölçüm, ton 228°); bina tabelası beyaz/siyah. | [DOĞRULANDI: piksel ölçümü] |
| Slogan | "Gewissenhaft · Verlässlich · Professionell" (galerinin kendi plaka kapağı) | [DOĞRULANDI: `public/cars/audi-q3-35-tdi/1.webp`] |
| megacars.at bugün | Açılıyor; WordPress (`/wp-json/` yanıt veriyor). İçerik ThemeMakers "cardealer" temasının demo içeriği: Los Angeles adresi, `testmail@sitename.com`, ham `[google_map]` kısa kodu, geçici Hostinger alan adından görseller. Gerçek galeri içeriği yok. | [DOĞRULANDI] https://www.megacars.at |

Ayrıntılı kaynak dökümü: alt ajan raporu (oturum içi), özet bu tablodadır.

---

## b) Referans analizi (5 site)

| Site | Awwwards durumu | Ekran görüntüsü |
|---|---|---|
| **scgroup.dk** (Selected Car Group, Danimarka; lüks ve ikinci el araç grubu) | **Honorable Mention, 11.06.2025** (Checkmate Digitalt Bureau) [DOĞRULANDI] https://www.awwwards.com/sites/selected-car-group | `ref-scgroup-masaustu.jpg`, `ref-scgroup-mobil.jpg` |
| **porsche.com** (`/germany/`) | Ana site için doğrulanmış ödül yok. Ayrı bir Porsche projesi olan "Porsche Motorsport Hub" Honorable Mention aldı (12.08.2026, AKQA) [DOĞRULANDI: awwwards arama sonucu başlığı] | `ref-porsche-masaustu.jpg`, `ref-porsche-mobil.jpg` |
| **bugatti.com** | Ana site için doğrulanmış ödül yok. Ayrı mikro site "Bugatti DIVO" Honorable Mention aldı (21.09.2018) [VARSAYIM: yalnız arama özeti] | `ref-bugatti-masaustu.jpg`, `ref-bugatti-mobil.jpg` |
| **singervehicledesign.com** | Awwwards kaydı bulunamadı. [BİLMİYORUM] | `ref-singer-masaustu.jpg`, `ref-singer-mobil.jpg` |
| **rimac-automobili.com** | Honorable Mention, 08.12.2021 (Bornfight) [VARSAYIM: awwwards sayfa başlığı arama sonucunda, sayfa 502 verdi] | `ref-rimac-*-yukleyici-takildi.jpg` |

Not: Awwwards otomotiv kategorisinde S-2K (SOTD, 06.09.2025) ve Volkswagen Sportscars (SOTD, 07.03.2014, puan 8,2) da var [DOĞRULANDI: https://www.awwwards.com/sites/volkswagen-sportscars]; ikisi de kampanya sitesi, bayi değil, bu yüzden seçilmedi. Selected Car Group bulunan en güçlü **bayi** örneği.

### DNA notları

**Selected Car Group (scgroup.dk)**
- Tipografi: ince ve büyük serif başlık (freight-display-pro, 200 px, 400 ağırlık) + grotesk metin (Host Grotesk). [DOĞRULANDI: computed style]
- Renk: siyah bölümler ile kırık beyaz (#f9f9f9) bölümler sırayla geliyor; vurgu rengi yok denecek kadar az.
- Boşluk: çok cömert; tam ekran boş siyah alanlar kaydırmayla açılan büyük metinlere sahne oluyor.
- Hareket: kaydırmayla beliren dev metin, yumuşak görsel açılışları.
- Fotoğraf ve araç sunumu: kendi showroom'larının gerçek fotoğrafları (araç sırası, ahşap tabela); yarış ve etkinlik fotoğrafları.
- CTA dili: ok ikonlu kısa metin bağlantıları ("Om os", "Se alle events").
- **Bize uyan:** gerçek mekân fotoğrafı ile güven; ince çizgilerle ayrılmış sade "indeks" listesi; gerçek rakam şeridi (100+ çalışan, 9 marka, 7 lokasyon).
- **Bize uymayan:** grup ve yaşam tarzı anlatısı araç bulmayı geri plana itiyor; ana sayfada stok araması yok; serif ve dergi havası (editoryal şerit, brifteki ton değil).

**Porsche (porsche.com/germany)**
- Tipografi: tek aile (Porsche Next), kısa ve cümle düzeninde başlık ("Mission S."), ölçülü ağırlık.
- Renk: beyaz ve siyah; renk fotoğraftan geliyor.
- Boşluk ve düzen: tam ekran açılış, altında yuvarlak köşeli model kartları ve "Elektro / Hybrid" hap etiketleri.
- Hareket: açılış videosu ve **videoyu duraklatma düğmesi** (erişilebilirlik); sakin geçişler.
- Araç sunumu: stüdyo ve yaşam tarzı fotoğrafı; ana sayfada "Finden Sie Ihren Porsche — Neu- oder Gebrauchtwagen" araması.
- CTA dili: tek kelime ve fiil ("Mehr entdecken"), dolu siyah ve gri düğmeler.
- **Bize uyan:** kısa başlık, tek aile tipografi, açılışın hemen altında stok araması, video için duraklat düğmesi.
- **Bize uymayan:** çerez penceresi ilk ekranı tamamen kapatıyor; yeni model pazarlaması (bizim işimiz stok).

**Bugatti (bugatti.com)**
- Tipografi: el yazısı model logotipi ("Destrier") + büyük harfli, harf aralıklı mono küçük metin (Bugatti Monospace 12 px, 1,2 px aralık). [DOĞRULANDI: computed style]
- Renk: siyah zemin, hareket bulanıklığı olan karanlık video; renk yok.
- Hareket: tam ekran sinematik video; arayüz minimum (MENU · logo · STORE).
- CTA dili: ince çerçeveli hap düğme ("DISCOVER PURE BEAUTY").
- **Bize uyan:** karanlık, sinematik açılış; arayüzün geri çekilmesi; tek ince çerçeveli CTA.
- **Bize uymayan:** her yerde büyük harf mono metin (bizim için kostüm olur); ilk ekranda iş ilanı açılır penceresi; sayfa çok ağır (ekran görüntüsü aracı iki kez zaman aşımına uğradı).

**Singer (singervehicledesign.com)**
- Tipografi: ince, dar, büyük harf başlık; el yazısı logo; dik çizgiyle ayrılmış metin bağlantıları ("Vehicle Details | Discover The Collaboration").
- Renk: altın saat ışığında sıcak fotoğraf; arayüz koyu gri.
- Fotoğraf: tek araç, tek güçlü kare; metin minimum.
- CTA dili: "Inquire Now | Learn More" metin çiftleri.
- **Bize uyan:** tek güçlü fotoğrafın bütün sahneyi taşıması; iki eşit metin CTA'sı.
- **Bize uymayan:** dar büyük harf başlık retro ve restomod havasında; mobilde ince başlık fotoğrafın üstünde düşük kontrastla duruyor ve karusel okları "Vehicle Details" bağlantısının üstüne biniyor; çerez çubuğu ilk ekranın altını kaplıyor. [DOĞRULANDI: `ref-singer-mobil.jpg`, mobil emülasyon 390 px, yatay taşma yok]

**Rimac (rimac-automobili.com)**
- 25 saniyeden uzun süre yalnız üç çizgili yükleyici göründü; videolar yüklenmiş olsa da içerik açılmadı. [DOĞRULANDI: kendi testimiz, 1440×900 ve 390×844]
- **Ders (olumsuz referans):** yükleyici içeriği asla bloklamamalı; brifteki "boş sayfa görünmez, LCP'yi geciktirmez" kuralının nedeni tam olarak bu.

### Her referanstan alınacak tek fikir
- **Porsche:** açılışın hemen altında stok araması ve video duraklat düğmesi.
- **Bugatti:** karanlık sinematik sahne + tek ince çerçeveli CTA; arayüz geri çekilir.
- **Selected Car Group:** galerinin gerçek mekânını ve gerçek rakamlarını göstererek güven kurmak.
- **Singer:** tek güçlü fotoğrafa sahneyi bırakmak; metin CTA çifti.
- **Rimac:** (olumsuz) yükleyici içeriği bekletmez.

---

## c) Sektör lideri DNA

### Kullanıcı deneyimi liderleri

**Autohero (autohero.com/at)** [DOĞRULANDI: tarayıcı, 22.10.2026]
1. **Filtre:** üstte yatay filtre çubuğu (Marke, Modelle, Budget, Erstzulassung, Getriebe, Kilometer, Kraftstoff, Lieferung, "Alle Filter") + sıralama + **"775 Suchergebnisse"** canlı sonuç sayısı. Kartta fiyat, aylık taksit, yıl · yakıt · km, vites ve "1. Hand", "Scheckheftgepflegt" gibi gerçek rozetler var.
2. **Detay sayfası:** galeri sekmeleri **Galerie · 360° · Highlights · Gebrauchsspuren**; fiyatın yanında hemen "Finanzierung ab" ve "Einmalzahlung" seçimi; altında Fahrzeugdetails tablosu (Erstzulassung, Kilometerstand, Kraftstoff, Getriebe, Leistung, Vorbesitzer, Letzter Service).
3. **Güven:** "Gebrauchsspuren" sekmesinde **19 kullanım izi tek tek işaretlenmiş**: "2 metreden görünen her izi gösteriyoruz." Trustpilot puanı (4,1 / 1094) görünür ve tıklanabilir. Bizim dürüstlük ilkemize en yakın örnek.

**Carvana (carvana.com)** [Site Cloudflare ile erişimi engelledi, zorlanmadı; bilgiler basın kaynaklarından]
1. **Fotoğraf stüdyosu:** patentli çekim kabini; 2020 güncellemesiyle 64 kamera açısı ve 26.000 LED kullanılıyor. [DOĞRULANDI] https://www.businesswire.com/news/home/20200819005140/en
2. **Kusurlar işaretli:** 360° turda özellikler ve kusurlar işaret noktalarıyla gösteriliyor; detay sayfasında açık geri çağırma bilgileri de yazıyor. [DOĞRULANDI: aynı kaynak]
3. **Güven:** 7 gün iade + "150-point inspection". [DOĞRULANDI: aynı kaynak] Bizde böyle bir iddia ancak galeri gerçekten yapıyorsa yazılır.

**Porsche Finder (finder.porsche.com/at)** [DOĞRULANDI: tarayıcı]
1. **Erişilebilir filtre:** sol panelde açılır-kapanır gruplar (Zustand, Modelle, Karosserie, Motor und Getriebe, Preis, Laufleistung, Erstzulassung, Vorbesitzer, Standort); her değişiklik `aria-live` ile ekran okuyucuya duyuruluyor.
2. **Kart:** model adı + nokta ayraçlı tek satır özellik zinciri (renk · yakıt · km · EZ · Vorbesitzer · "Keine Unfälle" · kW/PS) + "€ 94.900 inkl. MwSt." + "Details anzeigen".
3. **Kaldırılmış ilan:** eski ilan adresi kibar bir 404 gösteriyor ("Wir kennen 404 nicht. Wir kennen nur 911.") ve "Verfügbare Fahrzeuge anzeigen" düğmesiyle stoğa döndürüyor. Bizdeki satılmış araç adresleri için doğrudan örnek.

### Lüks bayi tonu liderleri

**Girardo & Co (girardo.com)** [DOĞRULANDI: tarayıcı]
1. Her ilanın üstünde aracı tek cümleyle anlatan gerçek bir bilgi var ("One of just 12 … right-hand drive"). Bizde bu satır yalnız ilandaki gerçek donanımdan kurulur.
2. "Can't find what you're looking for? Contact us": aradığınızı biz buluruz. Mega Cars böyle bir hizmet veriyorsa "Suchauftrag" formu olur. [VARSAYIM: hizmet galeriye sorulmalı]
3. Kurucu ve ekip yüzleri ("Meet Max Girardo"): kişisel güven. Mega Cars için Murat ve Kerim Demir'in gerçek fotoğrafı, izinleri olursa.

**Tom Hartley (tomhartley.com)** [DOĞRULANDI: tarayıcı]
1. İki telefon numarası sayfanın en üstünde: arama her zaman bir dokunuş uzakta.
2. Marka seçicide **gerçek stok sayıları** ("Mercedes-Benz (8)", "Porsche (5)"); bizim hızlı aramadaki canlı sayıyla aynı fikir.
3. Kartta fotoğraf sayısı ("39") ve başlıkta "1 Owner" gibi doğrulanabilir tek bilgi. Uymayan yanı: Trajan serif ve altın tonları eski moda.

### Carvana ve Autohero 360° görünümü

| | Carvana | Autohero |
|---|---|---|
| Türü | Dış 360 + iç 360; stüdyo kabininde, döner tabla ve sabit kameralarla çekim. [DOĞRULANDI: basın] | "360°" sekmesi **yalnız iç mekân panoraması** (Pannellum, WebGL). Dış görünüm 8 sabit açılı fotoğraf (`exterior/1…8`, 840×560). [DOĞRULANDI: ağ istekleri + ekran görüntüsü `referans/autohero-360-ic-mekan-panorama.jpg`] |
| Sürükleme ipucu | [BİLMİYORUM] (site engelledi) | Sol altta küçük "360" ikonu; çıkış için "Zurück zur Galerie" + X. |
| Yükleme sırası | [BİLMİYORUM] | İlk yüklemede yer tutucu ve "Klicke um zu laden"; panorama yalnız sekmeye tıklanınca indiriliyor. [DOĞRULANDI] |
| Mobil hareketler | [BİLMİYORUM] | Tek tam ekran tuval; sürükleyerek bakış (WebGL). [DOĞRULANDI: masaüstünde] |
| İç mekân | Var [DOĞRULANDI: basın] | Var (asıl 360 bu) |
| İşaret noktaları | Özellikler ve kusurlar işaretli [DOĞRULANDI: basın] | 360'ta yok; kusurlar ayrı "Gebrauchsspuren" sekmesinde listeli [DOĞRULANDI] |

**Bizim için çıkarım:** (1) Ağır görüntüleyici yalnız kullanıcı isteyince yüklenir; ilk kare her zaman hazırdır. (2) Kusurları ayrı ve açık göstermek güveni artırır; fotoğrafları rötuşlamamak bunun ön şartıdır. (3) Showroom'un dış turu bizim fark yaratan özelliğimiz; iç panorama ileride ayrı bir çekimle eklenebilir.

---

## d) Mobbin desenleri

Kaynak: Mobbin MCP (alt ajan, 22.10.2026). Mobbin'de Carvana, Autohero, Cazoo ve Porsche yok; otomotivden Tesla, Rivian, Polestar, My BMW, Mercedes-Benz ve Turo var.

| Desen | Örnek 1 | Örnek 2 |
|---|---|---|
| Liste + mobil alt filtre paneli | **Airbnb (iOS) — Filters:** fiyat histogramı ve alt çubukta canlı "Show 45 homes" — https://mobbin.com/screens/7f04f4bf-bdfd-4dcd-ad10-2b4225a08b7f | **Farfetch (iOS) — Refine:** satır satır alt sayfalar ve siyah "Show 63429 Results" — https://mobbin.com/screens/a7e55caf-395f-4b61-80c6-6e2fe0b4a70d |
| Tam ekran fotoğraf galerisi | **Navan (web):** siyah tam ekran, küçük resim şeridi, "1/43" sayacı — https://mobbin.com/screens/55518825-4715-4a19-8882-1ec8449cc095 | **GetYourGuide (web):** sayaç + galeriden çıkmadan sabit CTA — https://mobbin.com/screens/a002c1c4-730a-4cfc-8ce9-fae8960a2ed0 |
| 360° görünüm (sürükle-döndür) | **CRED (iOS) — Garage:** araç altında "drag to rotate 360°" ipucu (satış sitesi değil, en yakın örnek) — https://mobbin.com/screens/7e383067-74f6-4097-95bc-de0f445effd3 | **Zalando (iOS):** "Drag to rotate" + "Exit 3D View" (ürün döndürücü) — https://mobbin.com/screens/ff2d0dc3-4d4a-4fc7-8932-7ac4ae43b756 |
| Sabit alt eylem çubuğu | **Realtor.com (iOS):** "Schedule tour" (çerçeveli) + "Contact agent" (dolu) — https://mobbin.com/screens/a9aad2b9-9f42-4761-8804-5746df452b60 | **Redfin (iOS):** tek CTA "Request showing" + altında "Next available: Tomorrow at 11 AM" — https://mobbin.com/screens/29643891-7abd-47f7-9173-d08c420c5c10 |
| Talep formu (test sürüşü / finansman / takas) | **Rivian (iOS) — Demo drive akışı:** her adımda tek karar, yalnız 4 alan — https://mobbin.com/flows/8120cd4d-ca1a-4171-adbb-0cdf9a6dc24d | **Monzo (iOS) — finansman soruları:** gruplu satırlar ve "kredi notunuzu etkilemez" güven metni — https://mobbin.com/screens/e89475c9-9255-4b7b-8d17-1f57f4600a8c (takas için ek: Walmart "Add a vehicle" yıl/marka/model seçici — https://mobbin.com/screens/31718137-7aff-49e4-9192-c214b19c94de) |
| Dil seçici | **N26 (iOS):** 5 dil, radyo listesi, dillerin kendi adlarıyla — https://mobbin.com/screens/80d6cc95-50c6-47a4-a556-d900b9d15c47 | **Airbnb (web):** "Language and region" penceresi — https://mobbin.com/screens/175938a5-5541-400a-b81f-3ce0eba12255 |
| Yüzen mesaj + en üste çık | **Agoda (iOS):** yüzen sohbet düğmesi sabit alt çubuğun hemen üstünde, çakışmıyor — https://mobbin.com/screens/34d6195b-f686-4b97-ae01-befa03c112ff | **Goodreads (iOS):** yarı saydam, sessiz "yukarı" düğmesi alt gezinmenin üstünde — https://mobbin.com/screens/242bc0b5-98e1-4785-9cf8-826c5fae971c |

Bulunamayanlar: Ara + WhatsApp + Randevu üçlü sabit çubuk ve markalı WhatsApp yüzen düğmesi Mobbin'de yok. [BİLMİYORUM] Realtor.com ikilisi ile Agoda yerleşimi birleştirilerek tasarlanır.

---

## e) Bileşen kataloğu seçimi

Kaynak: `C:\Users\90553\Desktop\olgun-foods\GALZURA_BILESEN_KATALOG.md` (zip açılmadı). Seçim ölçütü: brife uyması, "ağır-lüks" ya da "sakin-editoryal" his, telifin temiz olması, yasaklı efekt içermemesi.

| # | Bileşen | Nerede | Neden |
|---|---|---|---|
| 1 | **Text Animations / 17**: satırlar maskeli kutunun içinden alttan kayarak çıkar (Next.js + GSAP SplitText + Lenis; telif temiz) | Açılış başlığı (Wow 1), bölüm başlıkları | Brifteki "maskeli, satır satır, okunur hızda" açılışın birebir karşılığı; Next.js tabanlı. |
| 2 | **Page Transitions / 15**: yeni sayfa küçük bir kutudan büyüyerek açılır (View Transitions API; telif temiz) | Kart → showroom geçişi (Wow 3) | View Transitions API kullanıyor; kart fotoğrafını platformdaki araca büyütmek için temel. |
| 3 | **Sliders / 6**: sürüklenebilen yatay fotoğraf şeridi, karelerin içinde paralaks (GSAP; demo marka adı içeriyor, kod alınırken çıkarılır) | Öne çıkan araçlar şeridi (Wow 2) | "Kamera kayışı" ve "çerçeve içinde hafif paralaks" tarifine uyuyor; masaüstünde pin, mobilde snap'e uyarlanır. |
| 4 | **Scroll Animation / 41**: görsel dar bir pencereden açılıp tam ekrana genişler (telif temiz) | Galeri ve hizmet bölümlerinde mekân fotoğrafları | Düz fade-in yerine anlamlı açılış; "pencereden bakış" sakin bir kamera hareketi. |
| 5 | **Scroll Animation / 29**: bir görsel sabit kalır, yanındaki metin değişir, görsel maskeyle bir sonrakine geçer (telif temiz) | Finanzierung ve Ankauf "nasıl işler" adımları | StickyScrollReveal'in daha sinematik hâli; gerçek bir sıralı süreç anlatıyor. |
| 6 | **Hover Effects / 1**: fotoğraf üstüne gelince yumuşakça büyür (telif temiz) | Araç kartı (scale 1.02'ye sınırlanır) | Brifteki CardHoverEffect kuralına (1.02, parıltı yok) doğrudan uyar. |
| 7 | **Navigation Menus / 19**: tam ekran menü; solda görsel, sağda bağlantılar, altta iletişim bilgisi; bağlantılar kelime kelime alttan gelir (telif temiz) | Mobil menü | Menüde telefon, adres ve WhatsApp'ın görünmesi iletişim hedefine hizmet ediyor. |
| 8 | **Scroll Animation / 50**: görsel ızgaradaki yerinden kayıp büyüyerek tam ekrana geçer, geri döner (GSAP Flip; telif temiz) | Detay sayfasında orijinal ilan fotoğrafları → tam ekran galeri | Fotoğrafın nereden geldiği kaybolmuyor; lightbox açılışı mekânsal ve sakin. |

**Bilerek seçilmeyenler:** 00→100 sayaçlı yükleyiciler (Hero 8, 9, 26): sahte ilerleme hissi verir ve LCP'yi geciktirir. Jöle gibi dağılan karusel (Sliders 16) ve jöle menü (Navigation 9): çizgi film easing'i. Kart çevirme (Scroll 40): dönen kart yasağı. WebGL ve Three.js efektleri: 3D yasağı ve JS bütçesi.

---

## f) Showroom boru hattı araştırması

Ayrıntılı kaynaklı döküm alt ajan raporundan alınmıştır; burada karar ve gerekçe özeti var. Kontrol tarihi 22.10.2026.

### f1. Önerilen yöntem (kendi boru hattımız)

| Adım | Yöntem | Lisans | Etiket |
|---|---|---|---|
| Kare çıkarma | ffmpeg ile 10 fps (40 sn'lik turda kareler arası ≈ 0,9°) | LGPL/GPL | [VARSAYIM: tasarım] |
| Eşit açılı 72 kare | COLMAP 4.2 "global mapper" (eski GLOMAP) ile kamera pozu → her karenin araç merkezine göre azimutu → 5° ızgarasına en yakın **keskin** kare. ±1,5° içinde aday yoksa o açı boştur: 36 kareye düşülür ya da yeniden çekilir. **Doldurma yok.** | BSD-3 | [DOĞRULANDI] https://github.com/colmap/glomap · yöntem [VARSAYIM] |
| Aracı ortalama | Ölçek kamera-araç mesafesinden (SfM) alınır, bbox genişliğinden değil (yan profil önden 2,5 kat geniştir). Tekerlek temas çizgisi tuvalde sabit bir y değerine oturtulur. Seriler dairesel yumuşatılır (son kare ilk kareye komşu). | – | [VARSAYIM] |
| Zamanda tutarlı maske | Kare başına **BiRefNet** alfası (ince kenar) × **SAM 2.1** video izleme bölgesi (zamansal tutarlılık, arka plandaki başka araç ve insanları atar). IoU düşük kareler insan kontrolüne işaretlenir. | MIT · Apache-2.0 | [DOĞRULANDI] https://github.com/ZhengPeng7/BiRefNet · https://github.com/facebookresearch/sam2 |
| Kullanılamayan modeller | RMBG-2.0 (CC BY-NC) ve MatAnyone (S-Lab, ticari değil) yerelde ticari kullanılamaz; MASt3R (CC BY-NC-SA) ticari değil; VGGT-Omega 6 GB'a sığmıyor. | – | [DOĞRULANDI] alt ajan kaynakları |
| Platforma yerleştirme | Katman sırası: zemin → platform(θ) → ambiyans gölgesi → temas gölgesi → yansıma → araç (yalnız alfa). Platform dokusu her kare için θ kadar döndürülür ve kamera yükseklik açısına göre elipse basılır. 72 platform görüntüsü çevrimdışı üretilir; sitede 3D yok. | – | [VARSAYIM: tasarım] · deneme `showroom-deneme/kod/showroom.py` |
| Temas gölgesi ve yansıma | İki katmanlı çarpma gölgesi (geniş ve soluk + tekerlek altında küçük ve koyu); yansıma: dikey ayna, temas çizgisine hizalı, %8–12 opaklık, araç yüksekliğinin ≈ %30'unda solar, hafif bulanık. | – | [DOĞRULANDI: denemede uygulandı] |

**Denemede öğrendiklerimiz (kendi ölçümümüz):**
- rembg'nin RGBA çıktısı rengi maskeyle çarpıp yarı saydam piksellerde aracı hafifçe karartıyor. Doğru yol: modelden **yalnız maske** alınır, renk doğrudan orijinal fotoğraftan gelir. [DOĞRULANDI: fark 5 → 0]
- BiRefNet gövdenin içini alfa 250–254 olarak veriyor; bu, yeni zeminin gövdeye %1–2 karışması demek. Maskenin çekirdeği (≥ 250) tam opak yapılır; yalnız maske değişir. [DOĞRULANDI: tam opak piksel sayısı 24 bin → 750 bin]

### f2. Kendi hattımız ve hazır hizmetler

| Ölçüt | Kendi hattımız | Spyne | CloudPano | Glo3D | Impel (SpinCar) |
|---|---|---|---|---|---|
| Kalite | Kenar kalitesi denemede çok iyi; cam ve ışık uyuşmazlığı insan kontrolü ister | İyi; yapay zekâyla iyileştirme | API "preview" aşamasında | [BİLMİYORUM] | Endüstri standardı |
| Araç başı maliyet | Yerelde ≈ 0 $; fal yedeği ≈ 0,03–1,5 $ [VARSAYIM hesap] | Plan **aylık 350 $'dan** başlıyor [DOĞRULANDI] https://www.spyne.ai/360 → 20 araç/ay için ≥ 17,5 $/araç [VARSAYIM] | Yayımlanmamış [DOĞRULANDI] https://www.cloudpano.com/blog/automotive-imaging-api-buyers-guide | "2 $/araç'tan" [DOĞRULANDI-ikincil] https://blog.ricoh360.com/partners/glo3d | Bayi paketi 999–1.599 (dönem yazmıyor) + 899 donanım [DOĞRULANDI] https://impel.ai/wp-content/uploads/2026/07/Mitsubishi_CAN-DigitalMerch-Product-Pricing-2026.pdf |
| İşlem süresi | ≈ 10–20 dk makine + 5 dk kontrol [VARSAYIM] | "Dakikalar" | Eşzamansız, süre yok | ≈ 5 dk [ikincil] | 24 saat içinde yayında |
| Kareler bizim sitede mi | ✅ Evet (Vercel, 1 yıl önbellek) | Kendi oynatıcısı; dışa aktarma [BİLMİYORUM] | İşlenmiş kareler olabilir | [BİLMİYORUM] | Impel barındırır |
| YZ ile açı doldurma | ❌ Asla | **Evet, bildirildi** (blog, arama özeti) → kuralımıza aykırı [VARSAYIM] | Açı üretmiyor ama kenarları **aynalayarak dolduruyor** [DOĞRULANDI] | [BİLMİYORUM] | "AI Virtual Booth" arka plan üretiyor |

**Karar: kendi boru hattımız.** Kural uyumu (doldurma yok, piksele dokunma yok), sıfıra yakın maliyet ve karelerin kendi sitemizde 1 yıl önbellekle barındırılması belirleyici. [VARSAYIM: değerlendirme]

### f3. Ev PC'si

NVIDIA GeForce RTX 4050 Laptop GPU, 6141 MiB VRAM, sürücü 592.82; ayrıca Intel Iris Xe. [DOĞRULANDI: `nvidia-smi` + `Win32_VideoController`]
Not: Denemede BiRefNet ONNX **CPU'da** çalıştı (foto başı 25–31 sn); CUDA kurulumu yapılmadı. BiRefNet 1024² FP16 ≈ 3,5 GB, 6 GB'a sığar; 2048² sınırda. SAM 2.1 small/base+ CPU boşaltma ile sığar. [DOĞRULANDI: süre · VARSAYIM: GPU sığması]

### f4. Hazır 360 görüntüleyici mi, özel canvas mı?

| Kütüphane | Boyut (min / gzip) | Lisans | Mobil dokunma | Not |
|---|---|---|---|---|
| @cloudimage/360-view 4.10 | 144,2 / **40,9 KB** | MIT | Sürükleme, iki parmak yakınlaştırma, atalet (varsayılan kapalı) | lodash + popper bağımlılığı; Safari 16.4+ [DOĞRULANDI] https://bundlephobia.com/api/size?package=@cloudimage/360-view |
| SpriteSpin 4.1 | 28,4 / 9,5 KB + **jQuery** | MIT | [BİLMİYORUM] | 2019'dan beri durgun [VARSAYIM] |
| @mladenilic/threesixty.js 1.3 | 5,0 / 1,7 KB | MIT | Sürükleme + klavye; yakınlaştırma ve atalet yok | [DOĞRULANDI] |
| react-360-view 0.1.3 | 23,1 / 6,2 KB | MIT | – | Son sürüm 2020, React 16 çekiyor → kullanılmaz [DOĞRULANDI] |
| Magic 360 | – | Ticari, 1 site 99 £ | Var | [DOĞRULANDI] https://www.magictoolbox.com/magic360/ |
| Sirv Spin | SaaS | Ücretsiz 2 GB/ay trafik | Var | Trafik sınırı yetmez [VARSAYIM] |
| **Özel canvas** | ≈ 3–5 KB gzip [VARSAYIM] | Bizim | Pointer Events + `touch-action: pan-y` | Tam tasarım kontrolü |

**Seçim: özel canvas görüntüleyici.** Gerekçe: (1) brif açıkça istiyor; (2) en büyük hazır alternatif 41 KB gzip ve sitenin JS bütçesinin (< 300 KB) yedide biri; (3) brifteki davranışların hepsi (atalet, 4 sn sonra kendiliğinden dönme, platform ipuçları, kademeli yükleme, reduced-motion) özel kodla daha küçük ve daha denetlenebilir; (4) `touch-action: pan-y` ile yatay sürükleme bizde kalır, dikey kaydırma sayfada kalır. [DOĞRULANDI] https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action

### f5. Gaussian splatting (≤ 10 satır)

1. **Boya ve cam:** standart 3DGS ışık taşınımını modellemediği için parlak boyada bulanıklık ve "floater", camın arkasında karışıklık üretir; arabalar zor nesne sayılıyor. [DOĞRULANDI] https://arxiv.org/html/2504.18468v5
2. **Dosya boyutu:** ham PLY yüzlerce MB; SOG sıkıştırmayla ≈ 15–20 kat küçülüyor (1 GB → 55 MB). [DOĞRULANDI] https://blog.playcanvas.com/playcanvas-adopts-sogs-for-20x-3dgs-compression
3. **Mobil:** iPhone Safari'de 60 MB üstü dosyalar yüklenmiyor ya da çöküyor. [DOĞRULANDI-anekdot] https://forum.playcanvas.com/t/solved-large-3d-gaussian-splatting-file-doesnt-load-on-mobile/38758 · 72 karelik WebP spin ≈ 3–11 MB. [VARSAYIM]
4. **İşlem süresi:** gsplat 30 bin adımda ≈ 36 dk; çekim için farklı yüksekliklerde 3 tur öneriliyor, bizim tek 40 sn'lik turumuz yetmez. [DOĞRULANDI] https://radiancefields.com/nerfstudio-releases-gsplat-1-0
5. **Kural:** WebGL görüntüleyici gerekir ve "3D model yok, Three.js yok" kuralıyla çelişir.
6. **Karar: varsayılan yol olamaz.** Kalite riski, mobil bellek, ek çekim yükü ve kural çakışması kanıtlı. İleride tek bir vitrin aracı için deney olarak denenebilir. [VARSAYIM: değerlendirme]

### f6. Test videosu (yalnız deneme için, sitede asla yayınlanmaz)

Pexels, Pixabay, Mixkit ve Coverr tarandı; **"kamera park hâlindeki aracın etrafında tam tur atıyor" koşulunu sağlayan bir klip doğrulanamadı.** [BİLMİYORUM] Önizlenecek adaylar:
- Pexels "An aerial view of a car in a circular driveway": 3840×2160, 18 sn, drone, araç park hâlinde. https://www.pexels.com/video/an-aerial-view-of-a-car-in-a-circular-driveway-19120255/ (Pexels License: ticari kullanım serbest) https://www.pexels.com/license/
- Pexels "Red Car and Sunset in Sky": 3840×2160, 19 sn, drone. https://www.pexels.com/video/red-car-and-sunset-in-sky-13144373/
- Pixabay "Car, Red, Rotate": 1920×1080; döner tabla mı, CGI mı belirsiz. https://pixabay.com/videos/car-red-rotate-rotating-360-2708/ (Pixabay Content License) https://pixabay.com/service/license-summary/

**Öneri:** En doğru test girdisi galeri çalışanının çekeceği 40 sn'lik ilk deneme turu; stok drone klipleri farklı yükseklik ve yörünge geometrisi taşıyor. [VARSAYIM]

---

## g) Showroom denemesi (özet)

Ayrıntı ve bütün görseller: `docs/showroom-deneme/README.md`.

- 3 araç: Mercedes S 560 (siyah, iç mekân), Porsche Panamera (beyaz, iç mekân), Audi Q3 (beyaz, dış mekân, yağmurlu).
- Arka plan ayırma: **yerel BiRefNet-general (MIT), ücretsiz**, CPU'da foto başı 24,5 / 26,8 / 31,3 sn. fal.ai'ye gerek kalmadı.
- **Aracın piksellerine dokunulmadı:** tam opak 750.502 / 657.465 / 447.560 pikselde orijinalle en büyük renk farkı **0**. [DOĞRULANDI: `showroom-deneme/kod/showroom.py` kanıt fonksiyonu]
- Zemin: oturumda fal.ai anahtarı bulunmadığı için fal.ai ile üretilemedi; deneme için yapay zekâsız, kodla çizilmiş geçici bir karanlık oda ve platform kullanıldı. **Harcanan tutar: 0 USD.**
- %200 kenar kontrolü: ayna, tavan rayı, A direği ve cam üst kenarı temiz; hale yok. Sorunlar: Panamera jantının bir boşluğunda eski zemin kalıyor; camlardan eski showroom ve neon tabela görünüyor; boyada eski mekânın mavi LED ve tabela yansımaları var (bunlar aracın pikseli, kural gereği kalıyor).
- Dürüst sonuç: Kapak fotoğrafları diz hizasından ve geniş açıyla çekildiği için platformun perspektifiyle tam uyuşmuyor; araç "stüdyoya yapıştırılmış" duruyor. Beyaz araçlar karanlık odada fazla parlak kalıyor. Liste kartlarında kabul edilebilir; büyük sahnede ancak kontrollü yeni çekimle (sabit yükseklik, kapalı hava) gerçekçi olur.

---

## Volkan'a açık sorular

1. **Stok:** Araçlar şu an nerede yayında (AutoScout24 yeni profili boş)?
2. **İletişim:** Sitede hangi e-posta (`office@meral.at` mı, `megacars@live.at` mı) ve hangi telefonlar kullanılacak? WhatsApp numarası hangisi?
3. **Showroom:** (a) Camdan görünen eski arka plan kural gereği kalsın mı? (b) Kenar renk temizliği "piksele dokunmak" sayılır mı? (c) Bir açı eksikse 36 kareye mi düşülsün, yoksa yeniden mi çekilsin?
4. **fal.ai:** Boş showroom zemini fal.ai ile üretilsin mi? Anahtar bu oturumda yoktu.
5. **Impressum:** Hukuki ad, UID ve Firmenbuch bilgisini galeri sahibinden yazılı alabilir misin?
