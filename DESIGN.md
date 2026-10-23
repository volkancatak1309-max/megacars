# MEGACARS V2 — TASARIM SİSTEMİ: "NACHTFAHRT" (DESIGN.md)

> Kaynak: Volkan'ın 22.10.2026 23:57 kararı — üç prototipten **C "Nachtfahrt"** seçildi; bütün site bu yönle, Awwwards Site of the Day seviyesinde kurulur (`docs/KARAR-DEFTERI.md`). Kurallar: `docs/BRIEF.md`. Bileşen kaynakları: `docs/PROTOTIP-KAYNAKLAR.md`.
> Kod: `styles/*.css` (token'lar ve bileşen stilleri), `components/site/*` (ortak sistem), `components/home|vehicles|vehicle/*` (sayfalar).

---

## 1. Fikir

Gece, bir salonun ışığında duran bir otomobil. Site koyu ağırlıklıdır; ama simsiyah değildir: **koyu → kemik rengi → kırmızı** bölümler ritim kurar. Açılışta film dev "MEGA CARS" harflerinin içinde oynar; aşağı kaydırınca kamera E harfinin içine dalar ve film ekranı doldurur. Kırmızı yalnız iki şeydir: **eylem** (düğme, perde, kepenk) ve **imza** (harf maskesinin dışındaki tek renk, fiyat sayacının vurgusu değil). Galerinin gerçek fotoğrafları her zaman çerçeveli ve keskin durur; tam ekran alanlar video ya da tipografidir.

Ton: sakin, kendinden emin, sinematik; ulaşılabilir lüks. Çizgi film, neon, parıltı yok.

---

## 2. Renk token'ları (`styles/base.css`)

| Token | Değer | Rol |
|---|---|---|
| `--night` | `#0B0B0D` | Ana zemin (koyu bölümler) |
| `--night-2` | `#141417` | Yükseltilmiş yüzey (sheet, menü kartı, yüzen düğme) |
| `--night-3` | `#1C1C21` | Fotoğraf çerçevesi zemini |
| `--bone` | `#ECE7DE` | Koyu zeminde metin; kemik bölüm zemini |
| `--bone-2` | `#E1DBD0` | Kemik bölümde çerçeve |
| `--red` | `#D7141A` | Vurgu: düğme, perde, kepenk, kırmızı bölüm |
| `--red-deep` | `#B8100F` | Kemik zeminde küçük kırmızı sayı (5,5:1) |
| `--muted` | `#9C978F` | Koyu zeminde ikincil metin |
| `--muted-ink` | `#5C574F` | Kemik zeminde ikincil metin |
| `--line` / `--line-strong` | bone %14 / %34 | Koyu zeminde çizgiler |
| `--line-ink` / `--line-ink-strong` | night %16 / %40 | Kemik zeminde çizgiler |

**Bölüm temaları:** `.s-night`, `.s-bone`, `.s-red` aynı rol değişkenlerini (`--bg --fg --sub --rule --frame --focus --btn-*`) yeniden tanımlar; bileşenler yalnız rolleri kullanır, böylece aynı düğme üç zeminde doğru görünür.

### Kontrast (WCAG 2.2, ölçülmüş)
| Ön plan / zemin | Oran | Kullanım |
|---|---|---|
| bone / night | 15,97:1 | Metin |
| muted / night | 6,78:1 | İkincil metin |
| white / red | 5,24:1 | Kırmızı düğme ve bölümde metin |
| night / bone | 15,97:1 | Kemik bölümde metin |
| muted-ink / bone | 5,82:1 | Kemik bölümde ikincil metin |
| red-deep / bone | ≈ 5,5:1 | Marka şeridindeki adet sayıları |
| red / night | 3,75:1 | **Yalnız** büyük yazıda (≥ 24 px) ve arayüz öğesinde; koyu zeminde küçük kırmızı yazı yok |
| bone / red | 4,26:1 | Kullanılmaz (kırmızı zeminde yalnız beyaz) |

Odak halkası: koyu zeminde bone, kemik zeminde night, kırmızı zeminde beyaz; 2 px, 3 px boşluk.

---

## 3. Tipografi

| Rol | Yazı tipi | Lisans | Kaynak |
|---|---|---|---|
| Başlık / display | **Unbounded** (değişken, 200–900; kullanılan 600–900) | SIL Open Font License 1.1 | Google Fonts, `next/font/google` |
| Metin / arayüz | **Hanken Grotesk** (değişken, 100–900; kullanılan 400–700) | SIL Open Font License 1.1 | Google Fonts, `next/font/google` |

Unbounded geniş ve iddialıdır; doğal oranlarında kullanılır (harf sıkıştırma yok). Açılış harfleri SVG maskesinde `textLength` yalnız harf aralığını açar (`lengthAdjust="spacing"`), glifleri bozmaz. Logotype "MEGA CARS" sitede yazı olarak değil, Unbounded 800'den çıkarılmış vektör konturlarla çizilir (`lib/brand/glyphs.ts`, HarfBuzz ile kerning'li; OFL 1.1): üst bar, footer, açılış ekranı ve paylaşım görseli aynı çizgiyi kullanır (§15).

### Ölçek (önce mobil, `clamp()`)
| Sınıf | Boyut | Ağırlık / satır / harf aralığı | Kullanım |
|---|---|---|---|
| `.d-xl` | 3 → 11 rem (10,5 vw) | 800 / 0,9 / −0,035 em, büyük harf | Dev model adı, sayfa başlığı |
| `.vd-model` | 3 → 11,5 rem | 800 / 0,86 / −0,045 em | Detay sayfası model adı (uzun adda 8 rem) |
| `.d-l` | 2,125 → 6 rem (5,6 vw) | 700 / 1,02 / −0,025 em | Bölüm başlığı (kısa cümle) |
| `.d-m` | 1,625 → 3,5 rem | 600 / 1,1 | Uzun bölüm başlığı, form başlığı |
| `.d-s` | 1,25 → 1,75 rem | 600 / 1,15 | Alt başlık |
| `.lead` | 1,0625 → 1,3125 rem | 400 / 1,55, `--sub`, ≤ 52 ch | Giriş paragrafı |
| `.label` | 0,75 rem | 600 / 0,2 em, büyük harf | Tanım etiketi (dt), alan adı — her bölümün üstüne konmaz |
| Metin | 1 rem | 400 / 1,6 | Gövde |

Sayılar `font-variant-numeric: tabular-nums` (`.tabular`). Her başlık yüklemli tam cümledir (BRIEF).

---

## 4. Boşluk, ızgara, katman

- Sayfa kenarı `--page: clamp(20px, 4.5vw, 72px)`; en geniş içerik `--wide: 1680px`.
- Bölüm boşluğu `--section: clamp(96px, 12vw, 200px)`; ritim için bölümler farklı üst/alt boşluk alır (hızlı arama ve öne çıkanlar daha sıkı).
- Üst bar yüksekliği `--ph-h` 68 / 80 px; mobil eylem çubuğu `--bar-h` 64 px.
- Köşe yarıçapı **0** (düğme, çip, çerçeve); tek istisna yuvarlak "yukarı" düğmesi. Özel imleç yok (Volkan'ın bütün projeler için kuralı, 23.10.2026): fare oku her yerde normaldir.
- Gölge yok; derinlik zemin tonu ve çizgiyle kurulur.
- z-index ölçeği: raised 10 · header 100 · bar 200 · float 210 · sheet 400 · fullscreen 500 · menu 600 · curtain 900 · grain 940 · loader 950 · skip 990.

---

## 5. Fotoğraf kuralları

- Yalnız galerinin kendi ilan fotoğrafları (1440 px). Renk filtresi, renkli katman, arka plan değişimi yok.
- Fotoğraf her zaman **çerçeve içinde** (4:3); 1440 px'ten büyük tam ekran fotoğraf yok. Tam ekran alanlar: açılış videosu ya da tipografi. Tam ekran galeri `object-fit: contain` ile fotoğrafı büyütmeden gösterir.
- `srcset` 240 / 800 / 1440 w, bulanık yer tutucu (blur-up), ekran dışında tembel yükleme.
- Hover'da fotoğraf **kendi çerçevesinde** 1.04 büyür (çerçeve sabit).

---

## 6. Hareket kuralları

- **Easing:** `--ease-out` cubic-bezier(0.25, 1, 0.5, 1) (power3.out eğrisi), `--ease-io` (0.76, 0, 0.24, 1), `--ease-hop` (0.87, 0, 0.13, 1), `--ease-film` (0.25, 0.1, 0.25, 1). Bounce, spring, elastic **yok**.
- **Süreler:** 300 · 450 · 700 · 1000 · 1400 ms; hiçbir animasyon 0,3 sn'den kısa değil.
- **Kaydırma:** her zaman aşağı; yatay kaydırma yok; yalnız açılış sahnesi tam **bir ekran** boyu yapışkan (200 svh bölüm, 100 svh sahne). Masaüstünde Lenis (`lerp 0.1`), dokunmatikte doğal kaydırma.
- **LCP:** açılış posteri ve detay sayfasının ilk fotoğrafı ilk boyamada görünür; opacity 0'dan başlamaz. İlk ekrandaki başlıklar CSS ile maskeden yükselir (JS beklemez). GSAP, ScrollTrigger, SplitText, Flip ve Lenis ilk boyamadan sonra yüklenir (`lib/gsap.ts`).
- **Reduced motion:** bütün animasyon ve geçişler kapanır; açılış ekranı yalnız sade bir belirme yapar (çizim, parıltı ve perde yok), grain gizlenir; video eklenmez (oynat düğmesiyle istenirse gelir); perde yerine düz geçiş; galeri anında değişir.
- **Maskeler:** maskeli yükselişlerde (`.mline`, `.chars`, SplitText satır maskeleri) kutu, glif taşması için pay bırakır (üst 0,08–0,22 em, sağ 0,08–0,15 em, alt 0,1–0,24 em; eksi kenar boşluğuyla düzen değişmez) — sıkı harf aralığında son glifin sağ kenarı ve İ/Ü/Ş aksanları kesilmez. Liste sayısı hane sayısına göre boyutlanır (`--digits`).

### Hareket envanteri
| Hareket | Nerede | Kaynak |
|---|---|---|
| Logolu açılış ekranı: amblem ince çizgiyle belirir, kroma dolar, üzerinden ışık geçer, "MEGA CARS" harf harf yükselir, gece paneli ve kırmızı perde kalkar (≈ 2,6 sn; sayaç yok) | İlk ziyaretin ilk sayfası; saf CSS (`components/site/Loader.tsx`, `lib/brand/marks.ts`) | Volkan 23.10.2026 (HAK61 açılışından esinle) |
| Kırmızı perde (iki satır kapanır, MEGA CARS yükselir, açılır) | Bütün iç bağlantılar ve dil değişimi | Animmaster Page Transitions 5 |
| Kepenk hover (kırmızı panel iner, yazı yuvarlanır, çıkışta yukarı toplanır) | Bütün düğmeler, menü linkleri, filtre çipleri | galzura-motion-demo `src/d6/Roll.tsx` + `d6.css` |
| Manyetik CTA (en çok 8 px) | Dolu ve çizgili düğmeler | galzura `useMagnet` |
| Maskeli satır / split-text | Bölüm başlıkları (`LinesUp`), ilk ekran başlıkları (CSS `.rise`) | Animmaster Text Animations 17 |
| Blok süpürme | Güven paragrafı (`BlockReveal`) | Animmaster Text Animations 15 |
| Dağınık harf yükselişi | Geçici sayfa başlıkları (`Chars`) | Animmaster Hero Animations 26 |
| clip-path reveal + fotoğraf 1.2 → 1 | Öne çıkanlar, liste kartları, benzer araçlar, güven ve konum fotoğrafları | Animmaster Scroll Animation 41 |
| Film harflerin içinde, E harfine dalış | Açılış | Prototip C |
| Kırmızı silme + karşı kayma | Detay galerisinde fotoğraf değişimi | Animmaster Page Transitions 5 |
| Odometre fiyat | Detay sayfası fiyatı (CSS, ilk boyamadan) | — |
| Sayı sayacı | Stok adedi, hızlı arama ve liste sonuç sayısı (yalnız gerçek veri) | NumberTicker mantığı |
| GSAP Flip | Liste filtre değişimi | — |
| İnce grain | Bütün sayfa (%7) | — |
| Kaydırma ilerleme halkası | "Yukarı" düğmesi | — |

Yasak (Volkan): imleci izleyen görsel önizleme; kaydırmayla kare kare oynayan açılış; özel imleç (nokta, halka ya da yazılı; 23.10.2026).

---

## 7. Bileşenler

### 7.1 Düğme ailesi (`.sh`, `components/site/Shutter.tsx`)
- `solid` (kırmızı zemin, beyaz yazı; hover'da kemik rengi kepenk iner), `line` (1 px çerçeve; hover'da kırmızı kepenk), `text` (çerçevesiz bağlantı; hover'da kırmızı kepenk), boyut `sh--sm`, `sh--icon`, `sh--wide`.
- Durumlar: hover (kepenk + yazı yuvarlanması + 1.02), focus-visible (kepenk iner, odak halkası), active (0.98), `aria-disabled` (%50, tıklanmaz).
- İç bağlantı `ShutterLink` (kırmızı perdeyle), dış bağlantı `ShutterA`, düğme `ShutterButton`.

### 7.2 Üst bar (`components/site/Header.tsx`)
Logo (amblem + vektör yazı, `components/brand/Logo.tsx`, 30 / 34 px yüksek; bağlantının erişilebilir adı "MEGA CARS – Startseite"), gezinme (Fahrzeuge · Finanzierung · Ankauf · Kontakt; geçerli sayfa kırmızı alt çizgi), DE/EN/TR, telefon (≥ 1280 px). Açılışın üstünde şeffaf; 40 px sonra koyu ve bulanık zemin; aşağı okurken gizlenir, yukarı kaydırınca geri gelir. Mobilde "Menü" düğmesi.

### 7.3 Mobil menü
Tam ekran `dialog`; clip-path ile yukarıdan iner, linkler satır satır yükselir (Animmaster Navigation Menus 19; Mobbin: Open). Büyük harfli Unbounded linkler, "Fahrzeuge" yanında stok adedi, altta telefon · WhatsApp · e-posta · adres · saatler ve dil seçimi.

### 7.4 Araç kartı (`components/vehicle/VehicleCard.tsx`)
4:3 çerçeve (foto sayısı rozeti), film klaketi gibi sıra numarası (01, 02 … görünür sıraya göre), marka (etiket) ve ilk tescil yılı, model (Unbounded 800 büyük harf), sürüm, kırmızı çizgi (hover'da %12 → %100), özellik zinciri, fiyat ve "Ansehen →". Hover: çerçeve geniş ekran kesimine daralır (`clip-path: inset(7% 0)`), fotoğraf kendi çerçevesinde 1.04 büyür — fotoğrafın üstüne katman yok. Kartın tamamı tek bağlantı; fare oku normal; clip-path ile gelir.

### 7.5 Fahrzeuge (`components/vehicles/VehicleList.tsx`)
- **Başlık:** stok adedi dev Unbounded 900 kırmızı rakam (maskeden yükselir) + tam cümle başlık + gerçek veriden üç değer (fiyat aralığı, marka sayısı, ilk tescil yılı aralığı).
- **Filtre paneli (masaüstü):** sekiz hücreli gösterge paneli (her genişlikte 4 × 2); her hücrede küçük etiket + büyük değer + ok; üstünde görünmez yerel `select` (klavye, ekran okuyucu, sistem seçicisi); kepenk hover; seçili hücre kemik zemin + üstte 3 px kırmızı çizgi.
- **Sonuç satırı:** sonuç sayısı sayaçla değişir; sıralama çipi; **Raster / Liste** görünüm düğmeleri (Liste: katalog satırı — küçük fotoğraf, dev model adı, sağda fiyat; geçiş GSAP Flip ile).
- Mobil: "Filter (n)" → alttan açılan sheet, altta "n Fahrzeuge anzeigen". Aktif filtreler kırmızı çerçeveli kaldırılabilir çipler. Sıralama: **Empfohlen** (varsayılan), Preis auf-/absteigend, Kilometerstand aufsteigend, Erstzulassung neueste/älteste zuerst. Durum adres çubuğunda.

### 7.6 Galeri sahnesi (`components/vehicle/Stage.tsx`)
4:3 sahne; ilk fotoğraf pencereden büyüyerek yerleşir (CSS, LCP öğesi). Değişimde kırmızı silme geçer, yeni fotoğraf arkasından açılır. Oklar, ← →, yatay kaydırma (swipe), sayaç, 5'li küçük resim satırı (kaydırmasız). Tam ekran: aynı geçiş, ← →, swipe, fare tekerleği, Esc, küçük resimler, WhatsApp ve Anrufen.

### 7.7 Teknik kart (`components/vehicle/TechCard.tsx`)
Erstzulassung, Kilometerstand, Leistung, Kraftstoff, Getriebe, Karosserie: büyük Unbounded rakam + küçük birim/not; 2 × 3 (mobil 2 sütun); kaydırınca hücre hücre çizgi çizilir ve rakam maskeden yükselir.

### 7.8 Eylem alanı
Masaüstünde sağda yapışkan: fiyat (odometre), özellik zinciri, **Probefahrt anfragen** (form penceresi), WhatsApp (araç adı + fiyat + link hazır dolu), Anrufen, showroom notu. Mobilde aynı içerik sahnenin hemen altında, ayrıca altta sabit eylem çubuğu.

### 7.9 Formlar
- Probefahrt (`TestDriveForm`): ad (zorunlu), tarih, saat aralığı, telefon, mesaj → WhatsApp'ta hazır mesaj.
- Kontakt, Finanzierung, Ankauf (`components/site/RequestForm.tsx`): iki gerçek gönderim düğmesi — **In WhatsApp öffnen** (+43 660 6877002) ve **Als E-Mail öffnen** (megacars@live.at, konu + gövde hazır). Form hiçbir şey saklamaz; metin, mesajın ancak WhatsApp'ta ya da e-posta programında "Gönder"e basılınca gideceğini açıkça söyler. Sahte "gönderildi" ekranı yok. Zorunlu alan hatası alanın altında, ilk hatalı alana odak.
- Alanlar köşesiz, 1 px çerçeve; hata 2 px çerçeve + metin; seçim çipleri (`.rf-pill`) seçilince dolu.

### 7.10 Mobil eylem çubuğu ve yüzen düğmeler
Çubuk: Anrufen · WhatsApp (çizgili) · Probefahrt (kırmızı); klavye açıkken iner (Mobbin: Realtor.com, Agoda). Yüzen: yuvarlak "yukarı" düğmesi (kırmızı ilerleme halkası; Mobbin: Goodreads) ve masaüstünde WhatsApp; ilk 1,5 ekranda ve footer'da gizli.

### 7.11 Footer
Üstte yatay logo (44 px), tek cümle başlık, adres/route · saatler · iletişim, hover'da kırmızıya dolan dev çizgisel "MEGA CARS", telif · Impressum · Datenschutz · "Website: Galzura".

---

## 8. Sayfalar

### 8.1 Startseite (sıra Volkan kararı, 23.10.2026)
1. **Açılış** (night): film harflerin içinde; başlık + "Fahrzeuge ansehen (18)" + video duraklat/oynat; kaydırınca E harfine dalış (tek ekran, kilit yok).
2. **Hızlı arama** (night): Marke · Preis bis · Karosserie büyük alanlar + gerçek sayıyı sayaçla gösteren kırmızı düğme.
3. **Öne çıkanlar** (night): 6 araç, 7/4 dönüşümlü çerçeveler, clip-path reveal.
4. **Marka şeridi** (bone, ince): yalnız stoktaki markalar ve adetleri; her biri filtreli listeye gider.
5. **Güven** (bone): galerinin plaka kapağındaki "Gewissenhaft. Verlässlich. Professionell." (dev, maskeli), showroom fotoğrafı, Firmenbuch, adres, saatler, stok sayacı.
6. **Hizmetler** (red): Besichtigung, Probefahrt, Beratung (yalnız doğrulanmış olanlar).
7. **Konum** (night): DSGVO'ya uygun harita (statik çizim, tıklayınca OpenStreetMap), saatler, telefon, bina fotoğrafı.

### 8.2 Fahrzeuge — §7.5. ### 8.3 Fahrzeug-Detail
Başlık (marka etiketi, dev model adı, sürüm) → sahne + yapışkan eylem alanı (Probefahrt, WhatsApp, Anrufen; Finanzierung açıksa "Finanzierung für dieses Fahrzeug anfragen" → `/finanzierung?fahrzeug=<slug>`) → teknik kart → donanım (bone) → bütün veriler (night) → Probefahrt formu (red) → benzer araçlar (night, clip-path). 360 verisi gelince sahnenin üstünde `SpinViewer` kendiliğinden açılır (§10).

### 8.4 İç sayfalar (`components/site/PageHero.tsx`)
Her iç sayfa aynı açılışla başlar: sayfanın adı dev, dağınık harf yükselişiyle (dekoratif, ekran okuyucudan gizli) + tam cümle `h1` (maskeden yükselir) + tek cümle giriş. Ritim: night → bone → red.
- **Kontakt & Über uns:** dev telefon numarası (hover'da kırmızı alt çizgi), WhatsApp, e-posta, adres, saatler (Pazar kapalı; öğle arası yazılmaz) → kırmızı form bölümü (yapışkan dev "Schreiben") → bone "Über uns" (galerinin showroom fotoğrafı, Firmenbuch, Facebook tanıtım cümlesinden alıntı, stok sayacı) → konum (tıklanınca yüklenen harita).
- **Finanzierung:** sade açıklama (faiz, banka, koşul yok) → bone adımlar (01 02 03) → kırmızı talep formu (araç seçimi stoktan).
- **Ankauf / Inzahlungnahme:** aynı düzen; form: amaç, marka, model, ilk tescil, km, yakıt, şanzıman, durum, iletişim. Menüde ve sitemap'te gizli (`lib/launch.ts` → `PAGES.tradeIn`).
- **Impressum:** bone üzerinde etiket/değer satırları (§ 5 ECG, § 14 UGB, § 25 MedienG). UID satırı yok (bilinmiyor).
- **Datenschutz:** solda yapışkan içindekiler (masaüstü), sağda numaralı bölümler. EN/TR'de "bağlayıcı olan Almanca metindir" notu.

### 8.5 404
Kırmızı dev "404", tam cümle başlık, "Zum Bestand".

### 8.6 Açılış filmi
Pexels 33374869, kırmızı Chevrolet Corvette C8 (Volkan'ın seçimi, 23.10.2026); `lib/hero.ts`, dosyalar `public/hero/c8/`. Doğal, koyu renk düzeni (gölgeler derin, en parlak değer %88, kırmızı doygun, hafif vinyet; gece taklidi yok). Yeni kodlama her zaman yeni klasöre gider (/hero/* bir yıl immutable).

---

## 9. Açılış (Wow 1) teknik tarifi
- SVG maske (yatay 1600×900, dikey 900×1600, `xMidYMid slice`): Unbounded 900 "MEGA" / "CARS" doğal oranında (MEGA = 4,03 em, büyük harf yüksekliği 0,75 em); CARS harf aralığıyla MEGA genişliğine açılır.
- Video `load`'dan sonra eklenir; Save-Data, 2G ve reduced motion'da eklenmez. Poster (WebP) LCP öğesidir.
- ScrollTrigger scrub 0,6: maske 1 → 14 ölçek (`power2.in`), dönüş noktası E harfinin orta kolu (`getStartPositionOfChar` ile hesaplanır), %60'tan sonra maske kaybolur; film 1.06 → 1.
- Sabit kamerayı kırmak için film kendi içinde çok yavaş yakınlaşır (`.hl-push`: 12 sn'de %6, ileri-geri); taban ölçeğiyle birlikte en büyük büyütme ≈ 1,12 (1920 px dosyanın keskin kaldığı sınır). Reduced motion'da kapalı.
- Video sahne ekrandan çıkınca durur; duraklat/oynat düğmesi (WCAG 2.2.2).

---

## 10. Showroom (360°)

### 10.1 Sahne kompozisyonu (Volkan kararı, 22.10.2026)
- Gerçek zemin ve gerçek gölge korunur; yalnız duvarlar ve uzak çevre dikişsiz bir fonla değişir; camdan görünen arka plan yeni fona uyarlanır; aracın gövdesine, rengine ve çiziğine dokunulmaz.
- Fon görünümü (A açık stüdyo · B karanlık salon · C ince platform kenarlı karanlık salon) deneme çekiminden sonra Volkan tarafından seçilir.
- Ölçek kuralı: araç kendi merkezi etrafında döner, kamera sabittir; kareler COLMAP'ten gelen kamera–araç merkezi uzaklığına göre ölçeklenir; ufuk ve kamera yüksekliği sabitlenir; kutu (bounding box) eşitleme yasaktır.

### 10.2 Görüntüleyici (özel canvas, Three.js yok; `components/vehicle/spin/`)
| Davranış | Değer |
|---|---|
| Sürükleme | Pointer Events; yatay sürükleme döndürür, `touch-action: pan-y` ile dikey kaydırma sayfanındır |
| Atalet | Bırakınca son hız korunur ve yumuşakça durur; yaylanma yok |
| Kendiliğinden dönme | Üstten bakıldığında saat yönünde, 1 tur ≈ 40 sn; 3 sn dokunulmazsa yeniden başlar; reduced motion'da kapalı |
| Yakınlaştırma | Ctrl/⌘ + tekerlek ya da iki parmak; düz tekerlek yalnız tam ekranda |
| Klavye ve aria | Odaklanabilir, ← →, görünür düğmeler, `aria-label` |
| Tek açılı fotoğraf | Döndürülmez; spin verisi yoksa görüntüleyici yüklenmez |

### 10.3 Kareler ve yükleme
72 kare (5°), en az 36; ilk kare sunucuda `<img>` (LCP), kalanlar görüntüleyici ekrana girince kademeli; `/spin/<id>/<v>/<boyut>/NNN.webp`, 1 yıl immutable önbellek. Veri: `inventory.json` içinde isteğe bağlı `spin` alanı; alan gelince showroom kendiliğinden açılır.

---

## 11. Performans bütçesi
| Ölçüt | Hedef |
|---|---|
| Lighthouse Performans | mobil ≥ 80, masaüstü ≥ 85 |
| LCP (mobil) | < 3,0 sn (ana sayfa, liste, detay) |
| CLS | < 0,1 |
| INP | < 200 ms |
| İlk yük JS (gzip) | < 300 KB |

Hareket kitaplıkları ilk boyamadan sonra; video `load`'dan sonra; harita tıklanınca; yazı tipleri `swap` + fallback ölçüsü; `/cars`, `/hero`, `/spin` için 1 yıl immutable önbellek.

## 12. SEO
- Diller önekli ve çevrilmiş yol adları: `/de/fahrzeuge`, `/en/vehicles`, `/tr/araclar` …
- Her sayfada `generateMetadata` → `pageMeta()` (`lib/seo.ts`): title, description, canonical, hreflang (de-AT, en, tr, x-default), Open Graph (mutlak adres, yerel dil + alternatif diller) ve Twitter. Paylaşım görseli: araçta kendi kapak fotoğrafından 1200×630 (`public/cars/<id>/og.jpg`), diğer sayfalarda yedek `public/og/default.jpg`.
- JSON-LD: `AutoDealer` (ana sayfa, Kontakt; yalnız doğrulanmış bilgiler), araçta `Car` + `Offer`, bütün iç sayfalarda `BreadcrumbList`.
- `sitemap.xml`: her sayfa × 3 dil, hreflang alternatifleriyle; gizli sayfalar (`PAGES`) dışarıda.
- **Canlıya geçiş tek satır:** `lib/launch.ts` → `INDEXABLE = true` (robots.txt açılır ve sitemap'i duyurur, meta robots index/follow olur, `X-Robots-Tag` kalkar). Demo canlıya çıkana kadar **noindex**.
- `siteOrigin()`: üretimde `VERCEL_PROJECT_PRODUCTION_URL`, önizlemede sabit dal adresi.
- Favicon, apple-touch-icon ve yedek paylaşım görseli logodan üretilir (`scripts/brand-assets.ts`, `npm run brand`; her derlemeden önce `prebuild` ile kendiliğinden): `app/icon.svg`, `app/apple-icon.png`, `public/og/default.jpg`.

## 13. i18n
`next-intl`, mesajlar derleme anında derlenir; DE · EN · TR (dil seçicide bu sırayla). Almanca önce yazılır; İngilizce ve Türkçe uzman tercüman düzeyinde ve yüklemli tam cümlelerle. Biçimler: DE/TR "64.900 €", EN "€64,900"; "148.000 km" / "148,000 km"; "345 kW (469 PS)"; "02/2019". İlan donanımı Almanca gelir; İngilizce (`data/equipment-en.json`) ve Türkçe (`data/equipment-tr.json`) kontrollü sözlükten, sözlükte olmayan terim `lang="de"` ile Almanca kalır. Dil seçimi yalnız dil belirtilmemiş adreste (/) yapılır: önce `NEXT_LOCALE` çerezi (ziyaretçi dil seçiciden seçince yazılır, 1 yıl, teknik olarak gerekli — TKG 2021 § 165 Abs. 3, onay gerekmez, Datenschutz'ta adıyla anılır), sonra tarayıcı dili. Önekli adresler olduğu gibi sunulur; dil seçici aynı sayfanın karşılığına gider (`CurtainLink` hedef dili `router.push`'a aktarır — Volkan'ın 23.10.2026'da bulduğu hata). **Kural (Volkan, 23.10.2026):** hangi dil seçiliyse sayfada yalnız o dil görünür; istisna yalnız özel isimlerdir (firma, marka/model, cadde, resmî kurum adları — ilk geçtiği yerde o dildeki açıklamasıyla). "Showroom" → DE "Schauraum", TR "teşhir salonu"; slogan DE "Gewissenhaft. Verlässlich. Professionell.", EN "Conscientious. Reliable. Professional.", TR "Titiz. Güvenilir. Profesyonel.".

## 14. Yapılacaklar / yapılmayacaklar
- Yap: her bölümde bir anlamlı hareket; kırmızıyı eylem için sakla; fotoğrafı çerçevede tut; her sayıyı gerçek veriden al; reduced motion'da her şeyi okunur bırak.
- Yapma: neon, parıltı, bounce; yatay kaydırma; bir ekrandan uzun pin; koyu zeminde küçük kırmızı yazı; kart içinde kart; özel imleç; sahte yorum, sahte garanti, sahte sayı; faiz oranı, banka ortağı ya da koşul; uydurma hizmet (Inzahlungnahme, Leasing, Tausch teyit bekliyor); dil çerezi (NEXT_LOCALE) dışında çerez ya da depolama; seçili dilden başka dilde kelime.

## 15. Marka: logo (Volkan, 23.10.2026)

- **Seçim:** Volkan 23.10.2026'da **A "Monogramm"** konseptini seçti; B (Plakette) ve C (Wappen) ile karşılaştırma sayfası `/prototyp/logo` kaldırıldı (git geçmişinde: 9c668db). Logo galeriye bir öneridir; galerinin adı "MEGA CARS" aynen kalır.
- **Çizim:** `lib/brand/marks.ts` — React'siz SVG üreticisi: amblem (`EMBLEM`), lockup'lar (`logoSvg`: yatay / dikey / yalnız amblem), favicon (`iconSvg`) ve açılış ekranı sanatı (`loaderSvg`). Logotype Unbounded 800 konturları (`lib/brand/glyphs.ts`, `_work/faz6/glyphs.py` ile üretildi; font dosyası repoda değil). Favicon, apple-touch-icon ve `og/default.jpg` her derlemeden önce `npm run brand` ile üretilir.
- **Amblem:** geometrik, iki fasetli M (20 birimlik kalın çizgi, V 44/74'e iner) sağ bacağında köşeleri yuvarlak kare bir C taşır; C kırmızı, M kemik/koyu kemik (açık zeminde gece/koyu gri). Kutu 128 × 100.
- **Renk ve krom:** koyu zeminde kemik + kırmızı, açık zeminde gece + kırmızı; krom (fırçalanmış metal gradyanı) yalnız koyu zeminde ve yalnız açılış ekranı, dikey lockup ve paylaşım görselinde. Neon, parıltı, gölge yok.
- **Küçük boyut:** favicon 64 px kutu, amblem gece kare üstünde; 16 px'te M okunur, kırmızı C ayrışır. Apple ikonu gece zemin üstünde.
- **Benzerlik kontrolü (CC, görsel; marka araştırması değil):** yıldız, halka, kalkan, kanat, hayvan yok → Mercedes, BMW, Porsche, Ferrari, Lamborghini, Alfa Romeo, Bentley, Aston Martin'den ayrı; katlanmış M Maybach'ın üçgen içindeki çift M'si, C McLaren işareti değil.
- **Açılış ekranı zamanlaması (CSS, `styles/motion.css`):** 0,1–1,0 sn amblem çizgisi çizilir → 0,8–1,3 krom dolgu → 1,1–1,8 ışık geçer → 0,95–1,9 harfler yükselir (0,04 sn adım) → 1,78–2,5 gece paneli kalkar → 1,95–2,7 kırmızı perde kalkar → 2,7 gizlenir. Tarayıcı oturumunda bir kez: site içi bağlantı, yenileme ve geri/ileri gezinmede gösterilmez (`data-loader-off`, depolama yok). Reduced motion: amblem ve ad 0,6 sn'de belirir, 1,4–1,9 sn'de solar.
