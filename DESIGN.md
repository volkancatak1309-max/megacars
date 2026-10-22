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

Unbounded geniş ve iddialıdır; doğal oranlarında kullanılır (harf sıkıştırma yok). Açılış harfleri SVG maskesinde `textLength` yalnız harf aralığını açar (`lengthAdjust="spacing"`), glifleri bozmaz.

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
- Köşe yarıçapı **0** (düğme, çip, çerçeve); tek istisna yuvarlak "yukarı" düğmesi ve "Ansehen" imleci.
- Gölge yok; derinlik zemin tonu ve çizgiyle kurulur.
- z-index ölçeği: raised 10 · header 100 · bar 200 · float 210 · sheet 400 · fullscreen 500 · menu 600 · curtain 900 · grain 940 · loader 950 · cursor 960 · skip 990.

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
- **Reduced motion:** bütün animasyon ve geçişler kapanır; yükleyici, grain, imleç gizlenir; video eklenmez (oynat düğmesiyle istenirse gelir); perde yerine düz geçiş; galeri anında değişir.

### Hareket envanteri
| Hareket | Nerede | Kaynak |
|---|---|---|
| Sayaçlı açılış yükleyicisi (0 → 100, paneller açılır) | İlk ziyaretin ilk sayfası; saf CSS | Animmaster Hero Animations 9 / 18 |
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
| "Ansehen" imleci (görsel önizlemesiz) | Araç kartları, galeri sahnesi | Animmaster Mouse Effect 13 |
| İnce grain | Bütün sayfa (%7) | — |
| Kaydırma ilerleme halkası | "Yukarı" düğmesi | — |

Yasak (Volkan): imleci izleyen görsel önizleme; kaydırmayla kare kare oynayan açılış.

---

## 7. Bileşenler

### 7.1 Düğme ailesi (`.sh`, `components/site/Shutter.tsx`)
- `solid` (kırmızı zemin, beyaz yazı; hover'da kemik rengi kepenk iner), `line` (1 px çerçeve; hover'da kırmızı kepenk), `text` (çerçevesiz bağlantı; hover'da kırmızı kepenk), boyut `sh--sm`, `sh--icon`, `sh--wide`.
- Durumlar: hover (kepenk + yazı yuvarlanması + 1.02), focus-visible (kepenk iner, odak halkası), active (0.98), `aria-disabled` (%50, tıklanmaz).
- İç bağlantı `ShutterLink` (kırmızı perdeyle), dış bağlantı `ShutterA`, düğme `ShutterButton`.

### 7.2 Üst bar (`components/site/Header.tsx`)
Logo (Unbounded 800), gezinme (Fahrzeuge · Finanzierung · Ankauf · Kontakt; geçerli sayfa kırmızı alt çizgi), DE/TR, telefon (≥ 1280 px). Açılışın üstünde şeffaf; 40 px sonra koyu ve bulanık zemin; aşağı okurken gizlenir, yukarı kaydırınca geri gelir. Mobilde "Menü" düğmesi.

### 7.3 Mobil menü
Tam ekran `dialog`; clip-path ile yukarıdan iner, linkler satır satır yükselir (Animmaster Navigation Menus 19; Mobbin: Open). Büyük harfli Unbounded linkler, "Fahrzeuge" yanında stok adedi, altta telefon · WhatsApp · e-posta · adres · saatler ve dil seçimi.

### 7.4 Araç kartı (`components/vehicle/VehicleCard.tsx`)
4:3 çerçeve (foto sayısı rozeti), marka (etiket), model (Unbounded 800 büyük harf), sürüm, kırmızı çizgi (hover'da %12 → %100), özellik zinciri, fiyat. Kartın tamamı tek bağlantı; "Ansehen" imleci; clip-path ile gelir.

### 7.5 Filtre (`components/vehicles/VehicleList.tsx`)
Masaüstü: her filtre bir çip (`.chip.sh--line`), üstünde görünmez yerel `select` (klavye, ekran okuyucu ve sistem seçicisi çalışır); seçili çip kemik zemin. Sonuç sayısı büyük Unbounded rakam ve sayaçla değişir. Aktif filtreler kırmızı çerçeveli kaldırılabilir çipler. Mobil: "Filter (n)" → alttan açılan sheet, altta "n Fahrzeuge anzeigen". Sıralama: **Empfohlen** (varsayılan: öne çıkanlar, sonra `inventory.json` sırası), Preis aufsteigend, Preis absteigend, Kilometerstand aufsteigend, Erstzulassung neueste zuerst, Erstzulassung älteste zuerst. "Neueste" etiketi yok (ilan tarihi verisi yok). Durum adres çubuğunda.

### 7.6 Galeri sahnesi (`components/vehicle/Stage.tsx`)
4:3 sahne; ilk fotoğraf pencereden büyüyerek yerleşir (CSS, LCP öğesi). Değişimde kırmızı silme geçer, yeni fotoğraf arkasından açılır. Oklar, ← →, yatay kaydırma (swipe), sayaç, 5'li küçük resim satırı (kaydırmasız). Tam ekran: aynı geçiş, ← →, swipe, fare tekerleği, Esc, küçük resimler, WhatsApp ve Anrufen.

### 7.7 Teknik kart (`components/vehicle/TechCard.tsx`)
Erstzulassung, Kilometerstand, Leistung, Kraftstoff, Getriebe, Karosserie: büyük Unbounded rakam + küçük birim/not; 2 × 3 (mobil 2 sütun); kaydırınca hücre hücre çizgi çizilir ve rakam maskeden yükselir.

### 7.8 Eylem alanı
Masaüstünde sağda yapışkan: fiyat (odometre), özellik zinciri, **Probefahrt anfragen** (form penceresi), WhatsApp (araç adı + fiyat + link hazır dolu), Anrufen, showroom notu. Mobilde aynı içerik sahnenin hemen altında, ayrıca altta sabit eylem çubuğu.

### 7.9 Formlar
Probefahrt: ad (zorunlu), tarih, saat aralığı, telefon, mesaj → WhatsApp'ta hazır mesaj açılır; metin bunu açıkça söyler. Sahte "gönderildi" ekranı yok. Alanlar köşesiz, 1 px çerçeve; hata 2 px çerçeve + metin.

### 7.10 Mobil eylem çubuğu ve yüzen düğmeler
Çubuk: Anrufen · WhatsApp (çizgili) · Probefahrt (kırmızı); klavye açıkken iner (Mobbin: Realtor.com, Agoda). Yüzen: yuvarlak "yukarı" düğmesi (kırmızı ilerleme halkası; Mobbin: Goodreads) ve masaüstünde WhatsApp; ilk 1,5 ekranda ve footer'da gizli.

### 7.11 Footer
Tek cümle başlık, adres/route · saatler · iletişim, hover'da kırmızıya dolan dev çizgisel "MEGA CARS", telif · Impressum · Datenschutz · "Website: Galzura".

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
Başlık (marka etiketi, dev model adı, sürüm) → sahne + yapışkan eylem alanı → teknik kart → donanım (bone, dergi düzeni: grup başlığı + kırmızı adet + sütunlar) → bütün veriler (night) → Probefahrt formu (red) → benzer araçlar (night, clip-path). 360 verisi gelince sahnenin üstünde `SpinViewer` kendiliğinden açılır (§10).

### 8.4 Geçici sayfalar (2. aşamaya kadar)
Finanzierung, Ankauf, Kontakt, Impressum, Datenschutz: dev başlık (dağınık harf yükselişi), tek cümle giriş, gerçek iletişim satırları (Impressum'da şirket, sahip, Firmenbuch), üç düğme. İçerik, formlar ve EN 2. aşamada.

### 8.5 404
Kırmızı dev "404", tam cümle başlık, "Zum Bestand".

### 8.6 Açılış videosu adayları
`/de/prototyp/hero-adaylari` (noindex): üç aday aynı harf maskesinde yan yana; seçim `lib/hero.ts` içinde `HERO_ACTIVE` tek satır değişikliğiyle yapılır.

---

## 9. Açılış (Wow 1) teknik tarifi
- SVG maske (yatay 1600×900, dikey 900×1600, `xMidYMid slice`): Unbounded 900 "MEGA" / "CARS" doğal oranında (MEGA = 4,03 em, büyük harf yüksekliği 0,75 em); CARS harf aralığıyla MEGA genişliğine açılır.
- Video `load`'dan sonra eklenir; Save-Data, 2G ve reduced motion'da eklenmez. Poster (WebP) LCP öğesidir.
- ScrollTrigger scrub 0,6: maske 1 → 14 ölçek (`power2.in`), dönüş noktası E harfinin orta kolu (`getStartPositionOfChar` ile hesaplanır), %60'tan sonra maske kaybolur; film 1.12 → 1.
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
Diller önekli (`/de`, `/tr`; EN 2. aşamada), çevrilmiş yol adları; her sayfada `generateMetadata`, canonical, hreflang; JSON-LD `AutoDealer`, araçta `Car` + `Offer`, `BreadcrumbList`. Demo canlıya çıkana kadar **noindex** (meta + `X-Robots-Tag` + `robots.txt`).

## 13. i18n
`next-intl`, mesajlar derleme anında derlenir; Almanca önce yazılır, Türkçe uzman tercüman düzeyinde ve yüklemli tam cümlelerle. Biçimler: "64.900 €", "148.000 km", "345 kW (469 PS)", "02/2019". İlan donanımı Almanca gelir; Türkçe kontrollü sözlükten, sözlükte olmayan terim `lang="de"` ile Almanca kalır.

## 14. Yapılacaklar / yapılmayacaklar
- Yap: her bölümde bir anlamlı hareket; kırmızıyı eylem için sakla; fotoğrafı çerçevede tut; her sayıyı gerçek veriden al; reduced motion'da her şeyi okunur bırak.
- Yapma: neon, parıltı, bounce; yatay kaydırma; bir ekrandan uzun pin; koyu zeminde küçük kırmızı yazı; kart içinde kart; sahte yorum, sahte garanti, sahte sayı; uydurma hizmet (Finanzierung, Inzahlungnahme teyit bekliyor).
