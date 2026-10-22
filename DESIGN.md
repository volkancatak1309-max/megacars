# MEGACARS V2 — TASARIM SİSTEMİ (DESIGN.md)

> Dal: `v2` · Tarih: 22.10.2026 · Brif: `docs/BRIEF.md` · Strateji: `docs/PRODUCT.md` · Araştırma: `docs/ARASTIRMA.md`
> v1 tasarım sistemi (Tesla mavisi, açık/koyu tema düğmesi, Archivo Expanded) bu dosyanın eski sürümünde ve `main` dalında duruyor; v2 onu devralmaz.
> Biçim: Google Stitch DESIGN.md bölümleri (awesome-design-md derlemesinin kullandığı biçim) + brifin istediği 14 başlık. Kullanılan skill'ler: impeccable (brand register), gsap-skills (ScrollTrigger). `awesome-design-md` bu bilgisayarda skill olarak kurulu değil; derlemenin GitHub sayfasındaki bölüm yapısı referans alındı (https://github.com/VoltAgent/awesome-design-md).

---

## 1. Konsept: **Die Übergabe** (Teslim anı)

Her araç, teslim alınacağı an gibi sunulur: sakin, karanlık bir teslim salonu, mat zemin, yukarıdan tek bir yumuşak ışık ve platformun üstünde yalnız o araç. Arayüz bu salondaki iyi bir satış danışmanı gibi davranır: sessiz, kesin ve dürüsttür; her rakam gerçektir, her fotoğraf aracın kendisidir. Hareketler bir kameranın hareketleridir: yavaş dolly, geri çekilme ve bir insanın aracın etrafında yürüme hızında dönen platform.

**Sahne cümlesi (tema seçimi için):** Vorarlberg'de bir alıcı akşam kanepede, loş ışıkta, telefonundan ikinci el Mercedes ve BMW ilanlarını karşılaştırıyor; temkinli, ama doğru aracı görünce hemen yazmak istiyor. → **Koyu tema.** Akşam ekran parlaklığı, sinematik fotoğraf ve karanlık showroom konsepti aynı yönü gösteriyor. Tema düğmesi yok.

**Renk stratejisi:** *Restrained* (impeccable): renk tonlu nötrlerden ve yüzeyin %5'inden azında kullanılan tek vurgudan oluşur. Renk fotoğraftan gelir.

---

## 2. Renk paleti

**Vurgunun kaynağı:** Mega Cars showroom'undaki ışıklı "MEGA CARS" tabelası, repo fotoğraflarından ölçüldü: ≈ `#9AAAE9` = OKLCH(0.749 0.093 273). [DOĞRULANDI: `docs/ARASTIRMA.md` §a7] Vurgu `--signal`, bu ışığın biraz daha açık ve sakin hâlidir. Nötrler aynı tona (272°) 0,006–0,010 kroma ile yaslanır; böylece gri "galerinin kendi grisi" olur.

```css
:root {
  /* Yüzeyler: karanlıktan aydınlığa */
  --night:       oklch(0.165 0.006 272);  /* #0d0e11  sayfa zemini */
  --hall:        oklch(0.205 0.007 272);  /* #16171a  bölüm zemini, alternatif bant */
  --panel:       oklch(0.245 0.008 272);  /* #1f2024  kart, form alanı, alt sayfa (sheet) */
  --line:        oklch(0.33  0.008 272);  /* #34353a  ayraç çizgisi (yalnız dekoratif) */
  --line-strong: oklch(0.56  0.010 272);  /* #72747b  form alanı ve kontrol sınırı */

  /* Metin */
  --ink:         oklch(0.955 0.004 272);  /* #eff0f3  ana metin, birincil düğme zemini */
  --ink-2:       oklch(0.80  0.008 272);  /* #bcbdc3  ikincil metin */
  --ink-3:       oklch(0.68  0.010 272);  /* #96989f  meta bilgi, yardımcı metin */

  /* Tek vurgu: tabela ışığı */
  --signal:      oklch(0.78  0.085 272);  /* #a4b5ef  odak halkası, etkin filtre, seçili sekme, spin yükleme çizgisi */
  --signal-12:   oklch(0.78  0.085 272 / 0.12); /* seçili çip zemini */

  /* Durum */
  --danger:      oklch(0.72  0.13  25);   /* #eb827b  form hatası */
  --ok:          oklch(0.78  0.10  160);  /* #7bcba1  gerçekleşmiş gönderim onayı */

  /* Yalnız açılış videosundaki metin bölgesi için nötr karartma */
  --scrim:       oklch(0.165 0.006 272 / 0.70);
}
```

**Kullanım oranı:** night/hall/panel yüzeyin ≈ %90'ı; ink metin; signal ≤ %5 (yalnız durum ve odak bildirir, süs değildir). Fiyat **ink** renginde yazılır, asla vurgu renginde değil.

### Kontrast tablosu (WCAG 2.2) — hesap: OKLCH → sRGB → göreli parlaklık

| Ön plan | Zemin | Oran | Sınıf |
|---|---|---|---|
| ink #eff0f3 | night #0d0e11 | **16,94 : 1** | AAA |
| ink | hall #16171a | 15,73 : 1 | AAA |
| ink | panel #1f2024 | 14,28 : 1 | AAA |
| ink-2 #bcbdc3 | night | 10,30 : 1 | AAA |
| ink-2 | hall | 9,56 : 1 | AAA |
| ink-2 | panel | 8,68 : 1 | AAA |
| ink-3 #96989f | night | 6,70 : 1 | AA |
| ink-3 | hall | 6,22 : 1 | AA |
| ink-3 | panel | 5,65 : 1 | AA |
| signal #a4b5ef | night | 9,59 : 1 | AAA |
| signal | panel | 8,09 : 1 | AAA |
| night (düğme yazısı) | ink (birincil düğme) | 16,94 : 1 | AAA |
| night | signal | 9,59 : 1 | AAA |
| danger #eb827b | night / hall / panel | 7,36 / 6,84 / 6,21 : 1 | AA |
| ok #7bcba1 | night / hall / panel | 10,02 / 9,30 / 8,45 : 1 | AAA |
| line-strong #72747b (kontrol sınırı) | night / hall / panel | 4,14 / 3,84 / 3,49 : 1 | ≥ 3:1 (1.4.11) |
| line #34353a | night | 1,58 : 1 | Yalnız dekoratif ayraç; bilgi taşımaz |
| ink | video + %70 karartma, en kötü durumda beyaz gökyüzü | 7,65 : 1 (%65'te 5,98) | AA |

Kural: `--ink-3`ten daha soluk metin yoktur. Yer tutucu (placeholder) metni de `--ink-3`tür (5,65:1).

---

## 3. Tipografi

**Aile: Hanken Grotesk** (değişken, wght 100–900, normal + italik). Lisans: **SIL Open Font License 1.1**; Google Fonts deposunda `ofl/hankengrotesk` altında `OFL.txt` ile. [DOĞRULANDI] https://github.com/google/fonts/tree/main/ofl/hankengrotesk · Ticari kullanım, gömme ve kendi sunucumuzda barındırma serbest.
- Yükleme: `next/font/google`, `subsets: ['latin', 'latin-ext']` (Almanca ß ä ö ü, Türkçe ğ ş ı İ ç), `display: 'swap'`, `adjustFontFallback` açık (CLS < 0,1).
- **Neden tek aile:** Porsche Next ve Mercedes Corporate gibi Alman otomotiv sistemleri tek ses kullanır; sakin özgüven ağırlık ve boyut zıtlığından gelir. 5 aday aynı metinle denendi (Hanken, Schibsted, Albert Sans, Familjen, Onest); Hanken en sakin ve en "teknik belge" duranıydı. Mono ve serif bilerek yok: mono burada kostüm olur, serif ise editoryal dergi şeridine kayar (impeccable reflex-reject).
- Rakamlar: fiyat, km, kW/PS, tarih **daima** `font-variant-numeric: tabular-nums`.
- Harf durumu: cümle düzeni. Büyük harf yalnız logo ve 2–3 kelimelik kısa etiketlerde, harf aralığı +0,02em ile; her bölümün üstüne büyük harf "eyebrow" konmaz.
- `text-wrap: balance` (h1–h3), `text-wrap: pretty` (paragraf). Paragraf genişliği en fazla 68ch.

### Ölçek (önce mobil; `clamp(min, tercih, max)`, 360 px → 1440 px)

| Token | Mobil | Masaüstü | clamp | Ağırlık | Satır yüksekliği | Harf aralığı | Kullanım |
|---|---|---|---|---|---|---|---|
| `display` | 40 px | 84 px | `clamp(2.5rem, 1.55rem + 4.1vw, 5.25rem)` | 300 | 1.02 | −0.025em | Açılış başlığı |
| `h1` | 32 px | 56 px | `clamp(2rem, 1.5rem + 2.2vw, 3.5rem)` | 400 | 1.06 | −0.02em | Sayfa başlığı, araç adı |
| `h2` | 26 px | 40 px | `clamp(1.625rem, 1.3rem + 1.4vw, 2.5rem)` | 400 | 1.12 | −0.015em | Bölüm başlığı |
| `h3` | 20 px | 24 px | `clamp(1.25rem, 1.15rem + 0.45vw, 1.5rem)` | 500 | 1.25 | −0.01em | Kart başlığı, alt başlık |
| `price` | 28 px | 40 px | `clamp(1.75rem, 1.5rem + 1vw, 2.5rem)` | 500 | 1.1 | −0.01em | Fiyat (tabular) |
| `lead` | 18 px | 20 px | `clamp(1.125rem, 1.08rem + 0.2vw, 1.25rem)` | 400 | 1.6 | 0 | Giriş paragrafı |
| `body` | 16 px | 16 px | `1rem` | 400 | 1.65 | 0 | Metin (koyu zemin için +0,05) |
| `spec` | 18 px | 20 px | `clamp(1.125rem, 1.08rem + 0.2vw, 1.25rem)` | 500 | 1.3 | 0 | Özellik değeri (tabular) |
| `small` | 14 px | 14 px | `0.875rem` | 400 | 1.55 | 0 | Yardımcı metin |
| `label` | 13 px | 13 px | `0.8125rem` | 500 | 1.4 | +0.01em | Özellik etiketi, form etiketi |

Adımlar arası oran başlıklarda ≥ 1,25. Görünür en küçük metin 13 px'tir. 84 px açılış başlığı impeccable'ın 96 px tavanının altında kalır.

---

## 4. Boşluk, ızgara, köşe, kenarlık ve gölge

**Boşluk (4 px tabanı):** `--s-1` 4 · `--s-2` 8 · `--s-3` 12 · `--s-4` 16 · `--s-5` 24 · `--s-6` 32 · `--s-7` 48 · `--s-8` 64 · `--s-9` 96 · `--s-10` 128 · `--s-11` 160.
- Bölüm dikey boşluğu: `clamp(64px, 9vw, 144px)`; ritim için bölümler eşit değil, "geniş ayrım, sıkı gruplama" (araç adı + fiyat + özellikler sıkı; bölümler arası geniş).
- Sayfa kenar boşluğu: `clamp(20px, 4.5vw, 72px)`. İçerik en fazla 1440 px; metin sütunu en fazla 68ch.

**Izgara:** mobil (< 640 px) 4 sütun / 16 px oluk · tablet (640–1023 px) 8 sütun / 20 px · masaüstü (≥ 1024 px) 12 sütun / 24 px. Kırılımlar: 640 · 768 · 1024 · 1280 · 1536. Araç ızgarası: 1 / 2 / 3 sütun (≥ 1536'da 4).

**Köşe:**
| Token | Değer | Nerede |
|---|---|---|
| `--r-0` | 0 | Tam genişlik fotoğraf, video, showroom sahnesi |
| `--r-s` | 4 px | Kart fotoğrafı, form alanı, küçük resim |
| `--r-m` | 12 px | Alt sayfa (sheet), menü paneli, açılır panel |
| `--r-pill` | 999 px | Düğmeler, filtre çipleri, dil seçici, yuvarlak ikon düğmesi |

**Kenarlık:** her zaman 1 px. Ayraç `--line`; kontrol sınırı `--line-strong`; odak halkası 2 px `--signal` + 2 px `--night` aralık (`outline-offset: 2px`).

**Gölge ve yükseklik:** karanlık zeminde derinlik önce yüzey tonuyla verilir (night → hall → panel). Gölge yalnız yüzen öğelerde:
- `--shadow-float`: `0 16px 48px oklch(0 0 0 / 0.5), inset 0 1px 0 oklch(1 0 0 / 0.04)` (alt çubuk, sheet, yüzen düğmeler)
- `--shadow-lift`: `0 8px 24px oklch(0 0 0 / 0.45)` (düğme hover)
- Parlayan gölge, renkli gölge ve cam efekti (glassmorphism) yok.

**Katman sırası (z-index):** içerik 0 · yükseltilmiş 10 · üst menü 100 · mobil alt çubuk 200 · yüzen düğmeler 210 · açılır panel 300 · sheet arka planı 400 · sheet 410 · tam ekran galeri ve showroom 500 · bildirim 600 · yükleyici 700 · "içeriğe atla" bağlantısı 800.

---

## 5. Fotoğraf sunum kuralları

1. **Araç pikseline dokunulmaz.** Renk, parlaklık, kontrast, keskinlik, rötuş, çizik ya da hasar düzeltmesi yok. Yalnız geometrik ölçekleme (tarayıcının yaptığı gibi) ve kırpma yapılır.
2. **Arka plan değişimi yalnız showroom görünümündedir:** 360 sahnesi, liste kartları ve öne çıkanlar şeridindeki kapak. Ayırma kalitesi yetersizse (jant boşluğunda ya da camda belirgin eski arka plan, kenarda hale) o araçta **orijinal fotoğraf** kullanılır. Karar araç başına `inventory.json` içindeki `cover.mode: "showroom" | "original"` alanında tutulur.
3. **Detay sayfasında orijinal ilan fotoğrafları her zaman ayrıca gösterilir.** Showroom sahnesinin altında küçük bir not durur: DE "Fahrzeug unverändert, nur der Hintergrund ist digital ersetzt." (öneri; Volkan onayı).
4. **Oranlar:** kart ve galeri 4:3 (kaynak fotoğraflar 1440×1080 olduğu için kırpma gerekmez). Showroom ana kareleri 4:3 1600×1200 üretilir; masaüstü sahne 16:10 gösterir ve tavanı ve zemini kırpar (`object-position: 50% 62%`), araç asla kırpılmaz. Açılış videosu 16:9 masaüstü, mobilde `object-fit: cover` ile belirlenmiş odak noktasından kırpılır.
5. **Kırpma kuralı:** araç gövdesi, aynalar ve tekerlekler hiçbir kırpımda kesilmez. Dikey fotoğraf (1/90) kartta `contain` ile, panel zemin üzerinde gösterilir.
6. **Üst katman yasağı:** araç fotoğrafına renkli katman, filtre, vurgu rengi ya da degrade konmaz. Tek istisna: açılış videosunda **yalnız metin bölgesinde** nötr `--scrim` karartması (renksiz).
7. **Plaka:** fotoğraflarda galerinin kendi "MEGA CARS.at" plaka kapağı görünüyor; bırakılır. Gerçek plaka görünen kare yayına girmez.
8. **Alt metin (alt) araca özeldir:** "Mercedes-Benz S 560 4Matic L in Schwarz, Frontansicht von links" gibi; "Auto" ya da "Bild 1" değil.
9. **Teknik:** WebP (AVIF ek), 1600 w masaüstü + 800 w mobil `srcset`, bulanık yer tutucu (blur-up, 16 px base64), `loading="lazy"` (ilk görünen hariç), `/cars`, `/hero`, `/spin` altında 1 yıl `immutable` önbellek.

---

## 6. Hareket felsefesi

"Hareket kameradır." Her hareket bir kamera ya da gerçek bir nesne gibi davranır: dolly, geri çekilme, perdenin aralanması, platformun dönmesi. Yaylanma, zıplama, sekme yok.

### Süre tablosu (hiçbir animasyon 300 ms'den kısa değildir)

| Token | Süre | Kullanım |
|---|---|---|
| `--t-1` | 300 ms | Hover, basma (0,98), odak, renk ve alt çizgi geçişleri |
| `--t-2` | 450 ms | Menü, sheet, sekme, dil seçici, filtre sonucu yeniden diziliş (Flip) |
| `--t-3` | 700 ms | Kart ve metin bloğu girişleri, ayraç çizgisinin çizilmesi |
| `--t-4` | 1000 ms | Başlık satırı maske açılışı (satır başına), görsel pencere açılışı |
| `--t-5` | 1400 ms | Kart → showroom sayfa geçişi, showroom ışıklarının yanması |
| `--t-6` | 2400 ms | Platformun çeyrek tur dönüşü (Wow 3) |
| Kademe | 90–120 ms | Satırlar ve kartlar arası gecikme |

### Easing
- GSAP zamanlı animasyonlar: **`power3.out`**.
- CSS geçişleri: **`cubic-bezier(0.25, 0.1, 0.25, 1)`**.
- **Teknik istisna (açıkça):** kaydırmaya bağlı (`scrub`) animasyonlarda easing kaydırmanın kendisidir; GSAP belgesi pin'li yatay şeritte (`containerAnimation`) tween'in `ease: "none"` olmasını zorunlu tutar, yoksa kaydırma ile konum eşleşmez (gsap-skills: gsap-scrolltrigger). Yumuşaklık `scrub: 0.8` ve Lenis'ten gelir. Bounce, elastic, spring, back hiçbir yerde yok.

### Kaydırma
- **Masaüstü (`pointer: fine`):** Lenis (`lerp: 0.1`, `smoothWheel: true`); `lenis.on('scroll', ScrollTrigger.update)` ve `gsap.ticker.add(t => lenis.raf(t * 1000))`, `gsap.ticker.lagSmoothing(0)`.
- **Dokunmatik:** doğal kaydırma (Lenis `syncTouch: false`); pin yok, şeritler `scroll-snap`.
- Sayfa değişiminde ScrollTrigger'lar `useGSAP` ile temizlenir; yazı tipi yüklenince `ScrollTrigger.refresh()`.
- Kaydırma kilitlenmez; yalnız açık sheet ve tam ekran galeri arka planı kilitler.

### `prefers-reduced-motion: reduce`
`gsap.matchMedia()` ile tek yerden yönetilir:
- Lenis kapalı, pin ve scrub yok; yatay şerit doğal yatay kaydırma + snap olur.
- Başlıklar ve içerik anında görünür (maske yok); video otomatik oynamaz, poster + "Video abspielen" düğmesi görünür.
- Showroom kendiliğinden dönmez, çeyrek tur girişi yapmaz, atalet kapalıdır; sürükleme kare kare çalışır.
- View Transition kapalı; sayfa anında değişir.
- Sayaç son değeri doğrudan gösterir.
- **İçerik görünürlüğü animasyona bağlı değildir:** varsayılan durum görünürdür; animasyon yalnız JS ve hareket izni varsa eklenir (impeccable kuralı: arka plan sekmede ya da başsız tarayıcıda içerik boş kalmaz).

---

## 7. Bileşenler ve durumları

Her etkileşimli öğe: normal · hover · odak (`:focus-visible`, 2 px signal halka) · basılı · devre dışı. Dokunma hedefi en az 44×44 px.

### 7.1 CTA düğmeleri
| Tür | Normal | Hover (yalnız `hover: hover`) | Odak | Basılı | Devre dışı |
|---|---|---|---|---|---|
| **Birincil** (ink hap, 52 px yükseklik, metin night 16 px/500) | zemin ink | ölçek 1.02 + `--shadow-lift` + manyetik kayma (imlece doğru en fazla 6 px, yalnız masaüstü), `--t-1` | 2 px signal halka, 2 px aralık | ölçek 0.98, `--t-1` | zemin panel, metin ink-3, `aria-disabled="true"`, hover yok |
| **İkincil** (çerçeveli hap) | 1 px line-strong, metin ink | çerçeve ink, zemin ink %4, ölçek 1.02 | aynı halka | 0.98 | çerçeve line, metin ink-3 |
| **Metin bağlantısı + ok** | ink, alt çizgi yok | alt çizgi soldan sağa çizilir (`scaleX` 0→1), ok 4 px kayar | halka | – | ink-3 |
| **Yuvarlak ikon düğmesi** (44–52 px) | zemin panel, ikon ink, lucide 1,5 px çizgi | zemin `oklch(0.29 0.008 272)` | halka | 0.98 | ink-3 |
- Gönderim süren form düğmesi: metin "Wird gesendet …" olur, düğmenin altında ince bir çizgi soldan sağa dolar (dönen ikon yok).
- Her ikon düğmesinde `aria-label` (ör. `aria-label="Per WhatsApp schreiben"`).

### 7.2 Araç kartı
- Yapı: fotoğraf 4:3 (showroom kapağı ya da orijinal) → başlık (Marke + Modell, en fazla 2 satır, h3) → tek satır özellik zinciri `02/2019 · 148.000 km · 469 PS · Benzin · Automatik` (ink-2, tabular) → fiyat (price-s 22 px, ink) → küçük fotoğraf sayısı ("18 Fotos", ink-3). Tamamı tek bir `<a>`.
- Durumlar: normal · **hover:** fotoğraf kendi çerçevesinde ölçek 1.02 (`--t-3`), başlık alt çizgisi · **odak:** kartın tamamında halka · **basılı:** ölçek 0.99 · **yükleniyor:** blur-up yer tutucu · "Showroom 360°" rozeti yalnız spin verisi varsa (signal-12 zemin, ink metin).
- Yasak: parıltı, kart çevirme, renkli fiyat, sahte "Top-Angebot" rozeti.

### 7.3 Filtre
- **Mobil:** "Filter" düğmesi + etkin filtre sayısı → alttan açılan `<dialog>` sheet (r-m üst köşeler, 90 vh). İçerik: Marke, Preis bis, Karosserie, Kilometer bis, Erstzulassung ab, Kraftstoff, Getriebe. Altta yapışkan **"24 Fahrzeuge anzeigen"** düğmesi; sayı canlı ve gerçek veriden. "Zurücksetzen" metin düğmesi. (Desen: Airbnb ve Farfetch, `ARASTIRMA.md` §d.)
- **Masaüstü:** üstte yatay filtre çubuğu; her filtre bir popover (native Popover API, kırpılma yok) + "Alle Filter" sheet'i + sıralama seçici (Preis ↑↓, Kilometer ↑, Erstzulassung ↓, Neueste).
- Etkin filtreler çip olarak görünür (signal-12 zemin + "×").
- Erişilebilirlik: her değişiklik `aria-live="polite"` ile duyurulur ("24 Fahrzeuge gefunden").
- Durumlar: seçili değil · hover · odak · seçili (signal-12 + signal çerçeve) · devre dışı (o filtrede 0 sonuç veren seçenek, "(0)" ile).
- Boş sonuç: "Für diese Auswahl haben wir gerade kein Fahrzeug." + "Filter zurücksetzen".

### 7.4 Galeri (orijinal ilan fotoğrafları)
- Izgara: mobil 2 sütun, masaüstü 3 sütun, 4:3. Tıklanınca GSAP Flip ile fotoğraf yerinden büyüyerek tam ekrana geçer (katalog #8).
- Tam ekran: siyah zemin, `contain`, sayaç "3 / 18", ← → ve Esc, kaydırma (swipe), altta küçük resim şeridi, sağ üstte "Schließen"; altta WhatsApp ve Anrufen düğmeleri kalır (GetYourGuide deseni).
- Odak kapanınca tetikleyen fotoğrafa geri döner.

### 7.5 360° görüntüleyici: bkz. §10
Durumlar: ilk kare (poster) · yükleniyor (platformun altında ince signal çizgisi 12 → 36 → 72 kare) · etkileşime hazır ("Zum Drehen ziehen" ipucu) · sürükleniyor (`cursor: grabbing`) · atalet · boşta · kendiliğinden dönüyor · yakınlaştırılmış · tam ekran · hata (karelerden biri gelmezse galeri moduna düşer).

### 7.6 Formlar (Probefahrt, Finanzierung, Inzahlungnahme, Kontakt)
- Etiket alanın üstünde (label 13 px/500), alan 52 px, zemin panel, 1 px line-strong, r-s.
- Durumlar: normal · hover (çerçeve ink-3) · odak (çerçeve signal + halka) · dolu · hatalı (çerçeve danger + altında danger metin, `aria-invalid`, `aria-describedby`) · devre dışı (zemin hall, metin ink-3).
- En az alan: ad, telefon ya da e-posta, mesaj; araç seçiliyse adı ve fiyatı otomatik dolu ve düzenlenebilir.
- **Gönderim dürüstlüğü:** "Gesendet" mesajı yalnız sunucu gönderimi doğruladıktan sonra görünür ve **nereye gittiğini** söyler: "Ihre Anfrage ist bei Mega Cars eingegangen (an: …). Wir melden uns telefonisch oder per E-Mail." Sunucu yoksa form bunu açıkça söyler ve WhatsApp ya da e-posta uygulamasıyla gönderir.
- Her formun yanında "Lieber direkt? Anrufen · WhatsApp" kısayolu.

### 7.7 Gezinme (üst menü)
- Açılışın üstünde saydam; 80 px kaydırınca night zemin + alt `--line` çizgisi (`--t-2`).
- Masaüstü: logo · Fahrzeuge · Finanzierung · Ankauf · Kontakt · telefon ikonu + numara · dil seçici.
- Mobil: logo · telefon ikon düğmesi · "Menü" düğmesi → tam ekran menü (katalog #7): büyük bağlantılar kelime kelime alttan gelir; altta adres, açılış saatleri (doğrulanırsa), telefon ve WhatsApp.
- Etkin sayfa: `aria-current="page"` + 1 px signal alt çizgi.
- "Zum Inhalt springen" bağlantısı ilk odakta görünür.

### 7.8 Dil seçici
- Masaüstü: `DE · EN · TR` bölmeli kontrol, etkin dil ink, diğerleri ink-3, `lang` ve `hreflang` öznitelikli bağlantılar.
- Mobil menüde: radyo listesi, dillerin kendi adlarıyla (Deutsch, English, Türkçe) (N26 deseni).
- Dil değişince aynı sayfanın karşılığına gidilir (çevrilmiş adres), seçim çerezde saklanır.

### 7.9 Mobil alt eylem çubuğu
- Sabit, 64 px + `env(safe-area-inset-bottom)`, zemin night %92 + üst `--line`, `--shadow-float`.
- Üç eşit düğme: **Anrufen** (`tel:`) · **WhatsApp** (araç adı, fiyat ve sayfa adresiyle dolu mesaj) · **Probefahrt** (form sheet'i). Detay sayfasında Probefahrt birincil (ink), diğer ikisi ikincil.
- Klavye açıkken gizlenir; içerik altına çubuğun yüksekliği kadar boşluk eklenir.

### 7.10 Yüzen düğmeler
- **WhatsApp (masaüstü ve alt çubuğun olmadığı mobil sayfalar):** 52 px yuvarlak, zemin panel, tek renk WhatsApp işareti (ink), hover'da yanına "WhatsApp schreiben" etiketi açılır (`--t-2`). Yeşil balon yok; sayfaya ait bir nesne gibi durur.
- **En üste çık:** iki ekran kaydırınca görünür (opaklık, `--t-2`), 44 px, ok ikonu, `aria-label="Nach oben"`. Mobilde alt çubuğun üstünde, WhatsApp ile çakışmaz (Agoda deseni).
- Dönen halka, nabız atan animasyon, parlama yok.

### 7.11 Yükleyici
- Yalnız oturumdaki ilk ziyarette; logo kelimesi + altında ince çizgi dolar; **en fazla 900 ms**; `pointer-events: none`; içerik altında hemen render edilir (LCP posterdir, yükleyici değil). Yüzde sayacı yok. Reduced-motion'da hiç gösterilmez.

### 7.12 Sayaç
- Stoktaki araç sayısı gibi **yalnız gerçek veriden** sayılar; görünür olunca 1200 ms'de sayar (`power3.out`), bir kez. Sayı bilinmiyorsa bileşen render edilmez.

---

## 8. Sayfa sayfa plan

Adres yapısı §13'te. Her bölümde en az bir anlamlı hareket var (yalnız fade-in değil). Metin örnekleri Almanca **taslaktır**; son metinler FAZ 3'te üç dilde yazılır ve her cümle yüklemlidir.

### 8.1 Startseite
| # | Bölüm | Amaç | İçerik | Hareket |
|---|---|---|---|---|
| 1 | **Açılış (Wow 1)** | İlk izlenim, tonu kurmak | Tam ekran 24 fps video (poster = LCP). Başlık 2 satır, ör. "Jeder Wagen, so wie er ist." + tek cümle alt metin + 2 CTA: "Fahrzeuge ansehen" (birincil), "WhatsApp schreiben" (ikincil). Sağ altta video duraklat düğmesi. | Başlık satırları maskeden alttan açılır (`--t-4`, 120 ms kademe); kaydırınca video 1 → 0,92 ölçeklenir ve %0 → %55 kararır ("kamera geri çekiliyor"). |
| 2 | **Hızlı arama** | Stoktaki araca 2 dokunuşta varmak | Marke · Preis bis · Karosserie + "24 Fahrzeuge anzeigen" (canlı, gerçek sayı). | Alanlar sırayla 24 px yukarıdan yerleşir (`--t-3`); sayı değişiminde rakam yumuşak sayar (`--t-1`). |
| 3 | **Öne çıkanlar (Wow 2)** | Seçilmiş araçları sinematik göstermek | 4–8 araç (veride `featured: true`), showroom kapağı, ad, fiyat, 3 özellik. | Masaüstünde pin'li yatay şerit; mobilde snap'li şerit. Ayrıntı §9. |
| 4 | **Showroom tanıtımı** | İmza özelliği göstermek | Spin verisi olan bir araç: sahne + "Ziehen, um den Wagen zu drehen." **En az bir aracın spin verisi yoksa bu bölüm hiç render edilmez.** | Kaydırdıkça platform 0° → 90° döner (scrub, 72 karenin ilk çeyreği). |
| 5 | **Galeri ve güven** | "Bu galeri gerçek" demek | Gerçek showroom fotoğrafı (galeriden istenecek), adres, galerinin kendi sloganı "Gewissenhaft. Verlässlich. Professionell.", stoktaki araç sayısı (sayaç). Uydurma yorum, yıl, garanti yok. | Fotoğraf dar bir pencereden tam genişliğe açılır (katalog #4); sayaç sayar. |
| 6 | **Hizmetler** | Finanzierung, Inzahlungnahme, Probefahrt'a yönlendirmek | Üç satır (aynı kart ızgarası değil): tek cümle + metin bağlantısı. | Satır ayraçları soldan sağa çizilir (`--t-3`), metin maskeden çıkar. |
| 7 | **İletişim bandı** | Son adımı kolaylaştırmak | Telefon, WhatsApp, adres, açılış saatleri (doğrulanırsa), "Route planen" bağlantısı. Harita tıklayınca yüklenir (gizlilik). | Telefon numarası maskeden açılır; harita önizlemesi pencere açılışıyla gelir. |
| 8 | **Footer** | Yasal ve yardımcı bağlantılar | Impressum · Datenschutz · dil · küçük "Website: Galzura" (galzura.com). | Footer kelimesi (MEGA CARS) kaydırma sonunda yavaşça yukarı kayar (`--t-4`). |

### 8.2 Fahrzeuge (liste + filtre + sıralama)
| Bölüm | İçerik | Hareket |
|---|---|---|
| Başlık | "Fahrzeuge" + canlı sayı ("24 Fahrzeuge im Bestand") | Sayı sayar; başlık maskeden açılır |
| Filtre çubuğu / sheet | §7.3 | Sheet alttan `--t-2`; sonuç sayısı canlı |
| Izgara | 1 / 2 / 3 sütun araç kartı | `ScrollTrigger.batch` ile 24 px + opaklık, 90 ms kademe; filtre değişiminde Flip ile yeniden diziliş (`--t-2`) |
| Boş durum | §7.3 | Metin maskeden açılır |

### 8.3 Fahrzeug-Detail
| # | Bölüm | İçerik | Hareket |
|---|---|---|---|
| 1 | **Showroom / galeri** | Spin varsa 360 sahnesi (§10); yoksa büyük galeri (ilk fotoğraf büyük + kaydırılabilir şerit). Boş showroom ya da "bald verfügbar" yok. | Wow 3 girişi (§9) |
| 2 | **Ana bilgi (ilk ekranda)** | Marke Modell (h1), fiyat (price), 6 temel bilgi: Erstzulassung, Kilometerstand, Leistung (kW/PS), Kraftstoff, Getriebe, Karosserie. CTA'lar: Probefahrt, WhatsApp, Anrufen; ikincil: Finanzierung anfragen, Inzahlungnahme. | Özellik değerleri sırayla maskeden açılır (`--t-3`, 90 ms) |
| 3 | **Orijinal ilan fotoğrafları** | Bütün orijinal fotoğraflar (§7.4) | Flip ile tam ekran |
| 4 | **Ausstattung** | Yalnız ilandaki gerçek donanım; gruplar (Komfort, Sicherheit, Multimedia, Licht) veri izin verirse | Gruplar açılır-kapanır (`--t-2`), liste satırları kademeli |
| 5 | **Fahrzeugdaten** | Tablo: yalnız bilinen alanlar | Satır ayraçları çizilir |
| 6 | **Benzer araçlar** | Aynı marka ya da gövde, fiyat ±%20, en fazla 6 | Snap'li yatay şerit |
| 7 | Yasal not | Fiyat ve vergi notu (galeriyle doğrulanacak: "inkl. MwSt." mi, "differenzbesteuert" mi) | – |
- Mobilde alt eylem çubuğu her zaman görünür (§7.9).

### 8.4 Finanzierung
| Bölüm | İçerik | Hareket |
|---|---|---|
| Giriş | Dürüst, kısa açıklama: oran, banka adı, örnek taksit **yok** (doğrulanmadıkça). | Başlık maskesi |
| Nasıl işler | Gerçek adımlar (galeriyle doğrulanır): talep → görüşme → teklif | Sabit görsel + değişen adım metni (katalog #5) |
| Form | §7.6; seçili araç otomatik dolu | Alanlar sırayla yerleşir |

### 8.5 Ankauf / Inzahlungnahme
| Bölüm | İçerik | Hareket |
|---|---|---|
| Giriş | Ne yapıldığı tek cümleyle; değer tahmini **vaat edilmez** | Başlık maskesi |
| Form | Marke, Modell, Erstzulassung, Kilometerstand, isteğe bağlı fotoğraf (sunucu varsa), iletişim | Adım adım (Rivian deseni); adımlar arası `--t-2` kayma |
| Alternatif | "Fotos per WhatsApp senden" (dolu mesajla) | Metin bağlantısı alt çizgi çizimi |

### 8.6 Kontakt & Über uns
| Bölüm | İçerik | Hareket |
|---|---|---|
| İletişim | Telefon(lar), WhatsApp, e-posta (Volkan onayından sonra), adres, açılış saatleri (doğrulanırsa) | Satırlar maskeden açılır |
| Harita | Tıklayınca yüklenen harita (önizleme görseli + "Karte laden") | Pencere açılışı |
| Über uns | Yalnız doğrulanmış bilgiler: kimiz, nerede, ne satıyoruz; ekip fotoğrafı ve adları yalnız izinle | Fotoğraf pencere açılışı |

### 8.7 Impressum ve Datenschutz
Okunabilir uzun metin düzeni (68ch, h2 ve h3 hiyerarşisi). Hareket: yalnız başlık maskesi (yasal metin sakin kalır). İçerik avukat ya da galeri tarafından doğrulanır; bilinmeyen alan sitede **gösterilmez** (v1'deki "[wird ergänzt]" yer tutucuları yok).

### 8.8 Satılmış araç adresi ve 404
Satılmış araç adresi 410 döner ve kibar bir sayfa gösterir: "Dieses Fahrzeug ist nicht mehr verfügbar." + benzer araçlar + "Alle Fahrzeuge ansehen" (Porsche Finder deseni). Sitemap'ten düşer. Hareket: başlık maskesi + şerit.

---

## 9. Dört wow anının teknik tarifi

### Wow 1 — Açılış
1. **LCP:** `<img>` poster (AVIF/WebP, 1600 w / 800 w, `fetchpriority="high"`, `<link rel="preload">`). Video, poster boyandıktan ve `load` olayından sonra eklenir; `navigator.connection.saveData` ya da 2G'de hiç eklenmez.
2. **Video:** 24 fps, H.264 MP4 + VP9/AV1 WebM; masaüstü 1920×1080 ≈ 4–6 MB, mobil 1080×1350 (4:5) ≈ 1,5–2,5 MB; `muted autoplay playsinline loop`, `preload="none"`; duraklat düğmesi (WCAG 2.2.2).
3. **Başlık:** GSAP SplitText `type: "lines", mask: "lines"`; satırlar `yPercent: 100 → 0`, `--t-4`, `power3.out`, 120 ms kademe, poster görünür olduktan 200 ms sonra başlar. Başlık ekranda kalır, hiçbir zaman kendiliğinden değişmez (okunur hız kuralı). Yazı tipi yüklenmeden bölünmez (`document.fonts.ready`).
4. **Geri çekilme:** `ScrollTrigger` scrub (`start: "top top"`, `end: "bottom top"`, `scrub: 0.8`): video kabı `scale: 1 → 0.92`, üstündeki karartma opaklığı 0 → 0,55; başlık −8 % y'ye kayar.
5. Reduced-motion: video yok (poster + oynat düğmesi), başlık anında.

### Wow 2 — Öne çıkan araçlar şeridi
1. **Masaüstü (≥ 1024 px ve `pointer: fine`):** bölüm pin'lenir (`pin: true`, `end: () => "+=" + (track.scrollWidth - innerWidth)`); iç şerit `x` ile sola kayar, **`ease: "none"`**, `scrub: 0.8`.
2. **Çerçeve içi paralaks:** her kartın fotoğrafı çerçevesinden %12 geniş; `containerAnimation: stripTween` ile `xPercent: -6 → 6`.
3. **Yazılar:** kart görünür alana girince (`containerAnimation`, `start: "left 75%"`) fiyat ve özellik satırları maskeden yavaşça çıkar (`--t-3`).
4. **Mobil ve tablet:** pin yok; `overflow-x: auto; scroll-snap-type: x mandatory`; kart genişliği 82 vw; parmakla kaydırılır; sağda bir sonraki kartın kenarı görünür.
5. Reduced-motion: masaüstünde de doğal yatay kaydırma + snap.

### Wow 3 — Kart → showroom geçişi
1. **View Transitions API** (Next.js App Router'da `next.config` `experimental.viewTransition` ya da `document.startViewTransition`): kart fotoğrafı ve detay sahnesindeki ilk kare aynı `view-transition-name: car-<id>` adını taşır; tarayıcı fotoğrafı büyüterek platformdaki araca taşır (`--t-5`, `cubic-bezier(0.25, 0.1, 0.25, 1)`).
2. **Işıklar:** sahne iki önceden üretilmiş zeminle gelir: "ışık kapalı" ve "ışık açık". Geçiş bitince açık zemin 0 → 1 opaklıkla 1400 ms'de belirir (fotoğrafik ışık; Spotlight SVG değil).
3. **Çeyrek tur:** spin karelerinin ilk 18'i (0° → 90°) 2400 ms'de `power3.out` ile oynatılır ve durur.
4. **İpucu:** "Zum Drehen ziehen" etiketi + iki yönlü ince ok, 600 ms sonra belirir, ilk sürüklemede kaybolur.
5. **Desteklemeyen tarayıcı:** kart fotoğrafı ile sahne arasında 450 ms çapraz geçiş. Reduced-motion: geçiş yok, çeyrek tur yok.
6. Spin verisi olmayan araç: aynı geçiş büyük galerinin ilk fotoğrafına yapılır.

### Wow 4 — 360° showroom
§10'daki görüntüleyici.

---

## 10. Showroom (360°)

### 10.1 Sahne kompozisyonu
- **Oda:** karanlık, mat, gri-antrasit duvar ve zemin; yukarıdan geniş ve yumuşak tek ışık (softbox); ufuk çizgisi kamera yüksekliğinde; yumuşak köşeli "sonsuz" duvar-zemin geçişi. Neon, LED şeridi, renkli ışık yok. Porsche ve Mercedes teslim merkezi havası.
- **Platform:** zeminle aynı mat malzemeden, kenarı 1 cm koyu bant, üst kenarında ince açık çizgi; kenar bandında her 3°'de bir ince, her 30°'de bir uzun işaret çizgisi (dönüşü gösterir). "MEGA CARS" yazısı kenara oyulmuş hâlde **yalnız gerçekçi durursa** eklenir (FAZ 3'te iki varyant denenir).
- **Araç:** platform merkezinde, genişliği platform çapının ≈ %78'i; tekerlek temas çizgisi sabit bir y değerinde.
- **Gölge:** iki katman çarpma: geniş ve soluk ambiyans gölgesi (araç ayak izi, açıyla birlikte döner) + tekerlek altlarında küçük ve koyu temas gölgesi.
- **Yansıma:** aracın aynalanmış hâli, temas çizgisine yapışık, %10 opaklık, araç yüksekliğinin %30'unda solar, hafif bulanık (mat zemin).
- **Işık sabittir; yalnız platform ve araç döner.**

### 10.2 Görüntüleyici davranışı (özel canvas, Three.js yok)
| Davranış | Değer |
|---|---|
| Sürükleme | Pointer Events; yatay 1 px = 0,5° (masaüstü), 1 px = 0,9° (mobil); `touch-action: pan-y` → dikey kaydırma sayfanındır |
| Sürükleme kilidi | İlk 8 px hareketin yönüne bakılır: yatay ise döndürme, dikey ise sayfa |
| Atalet | Bırakınca son hız korunur ve her karede ×0,92 azalır (≈ 0,6 sn'de durur); yaylanma yok |
| Kendiliğinden dönme | 4 sn dokunulmazsa 9°/sn (bir tur 40 sn), 1,2 sn'de hızlanarak başlar; sekme görünmüyorsa ya da reduced-motion açıksa kapalı |
| Yakınlaştırma | Tekerlek ve iki parmak; 1× → 2,5×; yakınlaşınca o açının 2400 px yüksek çözünürlüklü tek karesi yüklenir; yakınken sürükleme kaydırır, çift dokunma geri alır |
| Tam ekran | Fullscreen API (iOS'ta sabit katman); Esc ve "Schließen" |
| Klavye | Odaklanabilir (`tabindex="0"`, `role="img"` + `aria-roledescription="360-Grad-Ansicht"`); ← → 5°, Shift+← → 45°, + ve − yakınlaştırma, F tam ekran; ayrıca görünür ← → düğmeleri |
| aria | `aria-label="Mercedes-Benz S 560, 360-Grad-Ansicht. Mit Pfeiltasten drehen."`; açı değişimi `aria-live` ile duyurulmaz (gürültü) |
| İpucu | "Zum Drehen ziehen" (DE) / "Drag to rotate" (EN) / "Döndürmek için sürükleyin" (TR); ilk etkileşimde kaybolur |

### 10.3 Kare sayısı, boyut ve yükleme
- **72 kare** (5°), en az 36 (10°). Ana kare 4:3 **1600×1200** WebP (≈ 90–140 KB) ve mobil **960×720** WebP (≈ 40–60 KB) [VARSAYIM: boyut tahmini]; yakınlaştırma için istek üzerine 2400×1800.
- **Sıra:** (1) ilk kare `<img>` olarak sunucuda render edilir = detay sayfasının LCP'si; (2) görüntüleyici ekrana girince 12 kare (her 30°), (3) sonra 36, (4) ilk etkileşimde ya da boşta (`requestIdleCallback`) 72; yavaş bağlantıda 36'da kalınır. Eksik kare gelmeden o açıya gelinirse en yakın yüklü kare gösterilir.
- Dosya yolu: `/spin/<arac-id>/<v>/1600/000.webp … 071.webp`; `immutable` 1 yıl; sürüm klasörü (`<v>`) yeniden işlemede değişir.
- Veri modeli: `inventory.json` içinde isteğe bağlı `spin: { version, frames: 72, angleStep: 5, sizes: [960, 1600], zoom: 2400, background: "hall-01" }`. Alan varsa showroom kendiliğinden açılır.

### 10.4 Mobil hareketler
Yatay sürükleme döndürür; dikey kaydırma sayfayı kaydırır (kilit yok); iki parmak yakınlaştırır; çift dokunma 1×'e döner; tam ekran düğmesi sağ altta. Alt eylem çubuğu sahnenin altında kalır, üstüne binmez.

### 10.5 Videosu olmayan araç
Detay sayfasında showroom alanı **hiç yoktur**; yerinde büyük galeri durur (ilk fotoğraf 4:3 tam genişlik + kaydırılabilir şerit + "Alle 18 Fotos"). "Bald verfügbar" ya da boş sahne yok. Liste kartı ve öne çıkanlar şeridinde kapak fotoğrafı showroom zeminine yerleştirilir; kalite yetersizse orijinali kullanılır (§5.2).

### 10.6 Boru hattı özeti (FAZ 3)
ffmpeg → COLMAP global mapper (açı) → 5° ızgara seçimi → BiRefNet alfası × SAM 2.1 bölgesi → çekirdek alfa opak (≥ 250) → renk orijinal kareden → ölçek ve temas çizgisi sabitleme → platform(θ) + gölge + yansıma → WebP 1600/960/2400 → `inventory.json` güncellemesi. Ayrıntı: `docs/ARASTIRMA.md` §f, deneme kodu: `docs/showroom-deneme/kod/`.

---

## 11. Aceternity / Magic UI kullanımı

| Bileşen | Kullanılıyor mu | Nerede ve nasıl |
|---|---|---|
| **NumberTicker** | Evet | Stok sayısı (Startseite güven bölümü, Fahrzeuge başlığı). Yalnız gerçek veri; 1200 ms, `power3.out`. |
| **CardHoverEffect** | Evet (uyarlanmış) | Araç kartı: yalnız fotoğraf ölçek 1.02, parıltı ve arka plan lekesi yok. |
| **StickyScrollReveal** | Evet (katalog #5 ile uyarlanmış) | Finanzierung ve Ankauf "nasıl işler" adımları. |
| **ParallaxScroll** | Kısmen | Yalnız öne çıkanlar şeridindeki çerçeve içi paralaks mantığı; hazır bileşen değil. |
| Spotlight | Hayır | Showroom ışığı fotoğrafik zeminle verilir; SVG ışık huzmesi CGI hissi verir. |
| TracingBeam | Hayır | Uzun okuma sayfamız yok. |
| TextGenerateEffect | Hayır | Kelime kelime belirme yapay zekâ metni hissi veriyor; başlıklar satır maskesiyle açılır. |
| BorderBeam | Hayır | Kenarda dolaşan ışık "dönen kenarlık" yasağına çok yakın. |
| Marquee / InfiniteMovingCards | Hayır | Doldurma hissi verir; marka logoları izinsiz kullanılmaz. |
| BentoGrid | Hayır | Aynı kart ızgarası tekrarı (impeccable yasağı). |
| AuroraBackground, Meteors, Particles, AnimatedGridPattern, RetroGrid, ShimmerButton, MovingBorder, Globe, HeroHighlight | **Yasak** | Brif. |

---

## 12. Performans bütçesi

| Ölçüt | Hedef |
|---|---|
| Lighthouse Performans | mobil ≥ 80, masaüstü ≥ 85 (hedefimiz 90 / 95) |
| LCP (mobil, 4G) | < 3,0 sn (hedef 2,2) |
| CLS | < 0,1 (hedef 0,02) |
| INP | < 200 ms |
| İlk yük JS (gzip) | < 300 KB (hedef ≤ 200 KB) |

**JS dağılımı (gzip, [VARSAYIM: yaklaşık değerler, FAZ 3'te ölçülecek]):** Next.js + React çalışma zamanı ≈ 95 KB · GSAP core ≈ 27 KB · ScrollTrigger ≈ 17 KB · SplitText ≈ 8 KB · Flip ≈ 7 KB (yalnız galeri sayfasında) · Lenis ≈ 4 KB · 360 görüntüleyici ≈ 4 KB (yalnız detay) · i18n + metinler ≈ 6 KB. Startseite ≈ 160 KB, detay ≈ 175 KB.
- GSAP eklentileri sayfa bazında dinamik yüklenir; Flip ve görüntüleyici yalnız detay sayfasında.
- Sunucu bileşenleri varsayılan; istemci bileşeni yalnız etkileşimde.

**LCP stratejisi:**
- Startseite: poster `<img>` önceden yüklenir; video poster boyandıktan ve `load`'dan sonra eklenir; mobil için ayrı hafif sürüm; Save-Data'da video yok.
- Detay: spin varsa ilk kare, yoksa ilk fotoğraf `priority` ile; spin kareleri §10.3 sırasıyla, yalnız görüntüleyici görünür olunca.
- Yazı tipi: tek değişken dosya, `latin` + `latin-ext`, `swap`, fallback ölçü ayarı.
- Görseller: AVIF/WebP, `sizes` doğru, blur-up; ekran dışındakiler tembel.
- Önbellek: `/cars`, `/hero`, `/spin` → `Cache-Control: public, max-age=31536000, immutable` (vercel.json `headers`).
- Üçüncü taraf: analytics yok (ya da yalnız çerezsiz, Volkan kararı); harita tıklayınca.

---

## 13. SEO planı

**Adres yapısı (dile göre, her zaman önekli):**
| Sayfa | DE (varsayılan) | EN | TR |
|---|---|---|---|
| Startseite | `/de` | `/en` | `/tr` |
| Fahrzeuge | `/de/fahrzeuge` | `/en/vehicles` | `/tr/araclar` |
| Fahrzeug-Detail | `/de/fahrzeuge/mercedes-benz-s-560-4matic-l-amg-line-<kısa-id>` | `/en/vehicles/…` | `/tr/araclar/…` |
| Finanzierung | `/de/finanzierung` | `/en/financing` | `/tr/finansman` |
| Ankauf / Inzahlungnahme | `/de/ankauf` | `/en/trade-in` | `/tr/takas` |
| Kontakt & Über uns | `/de/kontakt` | `/en/contact` | `/tr/iletisim` |
| Impressum | `/de/impressum` | `/en/imprint` | `/tr/kunye` |
| Datenschutz | `/de/datenschutz` | `/en/privacy` | `/tr/gizlilik` |
- `/` → tarayıcı diline göre 307 yönlendirme (Next.js 16 `proxy.ts`), çerez varsa çerez önceliklidir; `x-default` = `/de`.
- Her sayfada `generateMetadata`: title (≤ 60), description (≤ 155), canonical, `alternates.languages` (de-AT, en, tr, x-default), Open Graph (mutlak adresli görsel), Twitter `summary_large_image`.
- **OG görseli:** araç sayfalarında `next/og` ile üretilen 1200×630 (showroom kapağı + ad + fiyat), mutlak adres; yedek `/og/default.jpg`.
- **JSON-LD:**
  - Her sayfa: `AutoDealer` (name, legalName (doğrulanınca), address PostalAddress, geo, telephone, url, sameAs Facebook; `openingHoursSpecification` yalnız doğrulanırsa; `aggregateRating` **yok**, kendi sitemizde toplanmadıkça).
  - Araç sayfası: `Car` (brand, model, vehicleConfiguration, productionDate/`dateVehicleFirstRegistered`, `mileageFromOdometer` QuantitativeValue KMT, fuelType, vehicleTransmission, bodyType, color, vehicleEngine.enginePower) + `Offer` (price, priceCurrency EUR, availability InStock, itemCondition UsedCondition, seller → AutoDealer).
  - `BreadcrumbList`: Startseite › Fahrzeuge › Araç.
- `robots.txt`: hepsine izin, `/api/` hariç; sitemap adresi.
- `sitemap.xml`: her adres için `xhtml:link rel="alternate" hreflang` üç dil + x-default; satılmış araçlar günlük güncellemede çıkar (410).

---

## 14. i18n planı

- **Kitaplık:** `next-intl` (App Router, `[locale]` segmenti, `localePrefix: "always"`), diller `de` (varsayılan), `en`, `tr`; çevrilmiş yol adları (`pathnames`).
- **Algılama:** ilk girişte `Accept-Language` → en yakın dil; seçim `NEXT_LOCALE` çerezinde; dil seçici aynı sayfanın karşılığına götürür.
- **Metinler:** `messages/de.json`, `en.json`, `tr.json`; anahtarlar ekran ve bölüme göre (`home.hero.title`). Sayfa başına yalnız gereken ad alanı gönderilir.
- **Kalite kuralı:** her müşteri cümlesi yüklemli ve tam; başlıklar dahil. Almanca metin önce yazılır, İngilizce ve Türkçe aynı anlamı doğal dille verir (birebir çeviri değil). Terimler sözlüğü: Erstzulassung = first registration = ilk tescil; Kilometerstand = mileage = kilometre; Probefahrt = test drive = test sürüşü; Inzahlungnahme = trade-in = takas; Finanzierung = financing = finansman. Çeviri FAZ 3'te uzman düzeyinde yazılır; Türkçe metni anadili Türkçe biri (Volkan) okur.
- **Biçimler:** `Intl.NumberFormat` (de-AT "64.900 €", en "€64,900", tr "64.900 €"), km "148.000 km" (en "148,000 km"), güç "345 kW (469 PS)" (en "345 kW (469 hp)", tr "345 kW (469 PS)"), tarih "02/2019".
- **Araç verisi:** marka, model ve donanım ilandan Almanca gelir. Sık donanım terimleri için kontrollü sözlük (EN/TR); sözlükte olmayan terim Almanca kalır ve `lang="de"` ile işaretlenir. Makine çevirisi yok.
- **Yasal sayfalar:** Impressum ve Datenschutz için bağlayıcı metin Almancadır; EN ve TR sürümleri bilgilendirme amaçlı olduğunu belirtir (galeri ya da avukat onayı).
- **Erişilebilirlik:** `<html lang>` dile göre; dil seçicide `hreflang` ve `lang`.

---

## Ek A — Do's and Don'ts

**Yap:** gerçek veri, tek vurgu, tabular rakam, cümle düzeni başlık, kısa CTA fiili, aracı sahnenin ortasına koy, her bölümde amaçlı tek hareket, reduced-motion alternatifi, odak halkası.

**Yapma:** renkli fiyat; her bölümün üstüne büyük harf eyebrow; 01/02/03 bölüm numarası (yalnız gerçek adım sıralarında); yan çizgi vurgulu kart; degrade metin; cam efekti; aynı kart ızgarası tekrarı; neon, aurora, parçacık, glitch; dönen kart ya da kenarlık; 300 ms'den kısa animasyon; bounce/elastic/spring; imleci izleyen görsel önizleme; kaydırmayla kare kare oynayan açılış; YZ ile üretilmiş araç; araç fotoğrafına filtre; uydurma yorum, yıl, garanti, sayı.

## Ek B — Volkan onayı bekleyen tasarım kararları
1. Konsept adı "Die Übergabe" ve koyu tek tema (tema düğmesi kaldırıldı).
2. Vurgu renginin tabeladan türetilmesi (`#a4b5ef`).
3. Yazı tipi: Hanken Grotesk tek aile.
4. Showroom sahnesinin altında "arka plan dijital olarak değiştirildi" notu.
5. Kaydırmaya bağlı şeritte `ease: "none"` teknik istisnası.
