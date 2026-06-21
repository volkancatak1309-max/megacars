# MEGACARS — Tasarım Sistemi (DESIGN.md)

> **Konsept:** Koyu-sinematik ana tema (**Tesla void DNA**) + tek butonla **light/dark toggle**.
> Açık modda **SSENSE/Zara editöryel DNA** (AATHER · Abel · Apple gündüz dili).
> Lüks **ikinci-el** otomotiv galerisi.

---

## 0. Bu doküman nasıl üretildi (provenance — uydurma yok)

Her token, font ve düzen kararı Refero MCP'den **gerçekten dönen** stil/ekranlara dayanır. Çekilen kaynaklar §9'da listelidir.

**ARSENAL_v6 uyumu hakkında dürüst not:** Sistemde bağımsız bir `ARSENAL_v6.md` dosyası bulunamadı (`**/ARSENAL*` boş). Kurallar, paste-cache'te bulunan **GALZURA ARSENAL v5 / "Master Bible"** fragmanlarından doğrulandı ve buraya BÖLÜM 0 + BÖLÜM 13 olarak uygulandı (bkz. §7, kaynak satırlarıyla). v6 numaralandırman farklıysa metni yapıştır; tokenları aynen koruyup eşlemeyi güncellerim.

---

## 1. Referans kilidi (Reference Lock)

| Alan | Birincil (dominant) | Borç alınan (dar rol) | Reddedilen (averaj kaçışı) |
|---|---|---|---|
| **Gece teması** | Tesla void + **Ferrari** (siyah sahne, beyaz tip, kırmızı kıvılcım) | **Arc** atmosferik derin ton, **BMW** ince-300 display | Aurora/neon zeminler; gradient çorbası |
| **Gündüz teması** | **AATHER** ("white linen" sessiz lüks) | **Abel** monospace teknik etiket + 0px kenar, **Apple** boşluk ritmi & ince gölge | Cream/terracotta "calm editorial" slop; pill butonlar |
| **Düzen** | Tesla detay (tek araç + sticky satın-alma rayı) | **Farfetch** "All Filters", **New Balance** yoğun grid | Stok hero→features→FAQ şablonu |
| **Aksan disiplini** | Tek aksan = elektrik mavisi (Tesla) | Ferrari kırmızısı **rezerve** (varsayılan kapalı) | Çoklu kromatik aksan |
| **Köşe** | **0px** keskin (Ferrari/BMW/Abel) | Butonlarda 2px (AATHER) | 980px pill (Apple) / 32px (Arc) |

**Korunacak imza:** sinematik full-bleed tek araç sahnesi · monokrom + tek aksan · keskin 0px kenar · cömert negatif alan · Geist/Mono + sinematik display · gerçek araç fotoğrafı/video (CSS sahte değil).

---

## 2. (a) Renk paleti — gerçek hex (gündüz + gece)

> Tüm hex'ler Refero'dan dönen gerçek token'lar veya ekran `hex_colors` değerleridir. Kaynak parantez içinde.

### 🌑 GECE (varsayılan — koyu sinematik)
```css
:root[data-theme="dark"] {
  /* Yüzeyler — Tesla /choose & inventory + Ferrari */
  --bg:           #000000; /* Ferrari Obsidian Black / Tesla /choose */
  --surface:      #141414; /* Tesla /choose (0x141414) — kart/panel */
  --surface-2:    #1F1F20; /* Tesla inventory (0x1F1F20) — yükseltilmiş */
  --border:       #303030; /* Ferrari Steel Gray — hairline */
  --border-soft:  #181818; /* Ferrari Shadow Graphite */

  /* Metin — Tesla used-car detay hex_colors */
  --text:         #FBFBFB; /* Tesla (0xFBFBFB) */
  --text-muted:   #A4A6A6; /* Tesla (0xA4A6A6) */
  --text-faint:   #68686A; /* Tesla (0x68686A) */

  /* Aksan — Tesla void DNA */
  --accent:       #3C6BE2; /* Tesla used-car detay (0x3C6BE2) — CTA/aktif */
  --accent-press: #2962C9; /* Tesla /choose (0x2962C9) */
  --accent-fg:    #FFFFFF;

  /* Rezerve performans aksanı — Ferrari, VARSAYILAN KAPALI, çok seyrek */
  --hot:          #FF0000; /* Ferrari Rosso Corsa — yalnız "performance" rozetinde */
}
```

### ☀️ GÜNDÜZ (editöryel açık — SSENSE/Zara DNA)
```css
:root[data-theme="light"] {
  /* Yüzeyler — AATHER + Apple + (opsiyonel) Abel sıcak */
  --bg:           #FFFFFF; /* AATHER Paper White / BMW Canvas White */
  --surface:      #F5F5F7; /* Apple Canvas White — recessed */
  --surface-warm: #F6EADA; /* Abel Soft Ivory — opsiyonel editöryel şerit */
  --border:       #E8E8E8; /* AATHER Ghost Gray */
  --border-strong:#D6D6D6; /* Apple Border Silver */

  /* Metin */
  --text:         #030303; /* Abel Charcoal Noir */
  --text-muted:   #707070; /* Apple Medium Gray */
  --text-faint:   #A4A4A4; /* Farfetch katalog (0xA4A4A4) */

  /* Aksan — gündüz için biraz daha derin mavi (Tesla light + Apple) */
  --accent:       #2962C9; /* Tesla light-page mavi */
  --accent-press: #0066CC; /* Apple Action Blue */
  --accent-fg:    #FFFFFF;
  --hot:          #FF0000;
}
```

**Aksan disiplini (her iki tema):** mavi YALNIZ birincil CTA + aktif/focus + fiyat vurgusu. Ferrari kırmızısı (`--hot`) varsayılan kapalı; sadece "Performance / nadir parça" rozetinde tek nokta olarak. Renk nadirdir; hiyerarşi boşluk + kontrast + tipografiyle kurulur (Ferrari/BMW north star).

---

## 3. (b) Tipografi

**Lisanssız öncelik (kullanıcı tercihi):** Geist · Monument Extended · Fraunces.
Refero referansları (Soehne/Founders Grotesk/BMWTypeNext/Gestura) → lisanssız eşlemeleri:

| Rol | Font | Kaynak referans → eşleme | OFL/güvenli fallback |
|---|---|---|---|
| **Display / hero / model adı** | **Monument Extended** (UPPERCASE, geniş) | BMW 60px light display + Ferrari condensed uppercase | **Archivo Expanded** (OFL) |
| **Editöryel aksan** (gündüz koleksiyon başlığı, pull-quote) | **Fraunces** (yüksek kontrast serif, italic optical) | AATHER "Gestura" ince serif display | Fraunces zaten OFL |
| **Gövde / UI / nav** | **Geist Sans** | Soehne/Untitled Sans/SF Pro → neo-grotesk | Geist OFL · Inter |
| **Teknik etiket / spec / VIN / fiyat-meta** | **Geist Mono** (UPPERCASE, tracked) | Ferrari & Abel mono utility + Tesla spec precision | Geist Mono OFL · Space Mono |

```css
--font-display: "Monument Extended", "Archivo Expanded", sans-serif; /* fallback OFL */
--font-serif:   "Fraunces", Georgia, serif;     /* gündüz editöryel aksan */
--font-sans:    "Geist", "Inter", system-ui, sans-serif;
--font-mono:    "Geist Mono", "Space Mono", ui-monospace, monospace;
```

> ⚠️ **Lisans notu:** Geist, Geist Mono ve Fraunces tam serbest (OFL). Monument Extended'in ticari kullanımı için Pangram Pangram lisansı gerekir — ticari risk istemezsen display için OFL **Archivo Expanded**'e düş; geniş otomotiv display hissini korur.

**Tip ölçeği (gerçek referans değerleri):**
```
display-hero : clamp(48px, 8vw, 132px)  Monument Ext.  UPPERCASE  tracking -0.01em   (Arc 140 / BMW 60)
display      : clamp(32px, 4vw, 56px)    Monument/Fraunces  lh 1.1   (Abel 32 / Arc 48 / Apple 56)
heading      : 24–28px  Geist 500        lh 1.2
body         : 16px     Geist 400        lh 1.6   (BMW 16/1.63)
body-sm      : 14px     Geist 400        lh 1.45
label/spec   : 11–13px  Geist Mono 400   UPPERCASE  letter-spacing 0.08em  (Ferrari 0.083em)
```
Gece display'i ince-cesur değil **kontrollü** (BMW north star: "ağırlıkla değil zarafetle otorite"). Küçük mono etiketler geniş tracking ile nefes alır (Ferrari/Abel imzası).

---

## 4. (c) Hero kurgusu

**Sahne (gece varsayılan):** full-bleed, kenardan kenara **tek araç** — `public/hero/hero-main.mp4` (poster: `hero-poster.jpg`, gerçek mevcut varlık) siyah sahnede yavaş döngü/pan. Üstte ince, **şeffaf** nav (logo sol · az link merkez · hesap/dil sağ). Letterbox sinematik his (Tesla Roadster/void).

**Lockup (alt-sol veya merkez):**
- Eyebrow (Geist Mono, UPPERCASE, tracked): `2024 · CURATED PRE-OWNED`
- Başlık (Monument Extended): kısa, güçlü — örn. `EVERY KILOMETER, VERIFIED.`
- Tek satır alt metin (Geist, --text-muted)
- **Çift CTA:** dolu aksan `Browse Inventory` + ghost outline (1px --border) `Book a Viewing`
- **Kredensiyel/spec şeridi** (Geist Mono): `120-POINT CHECK · 12-MO WARRANTY · 0% KM ROLLBACK` — Tesla'nın yatay stat satırı deseni.
- İnce scroll ipucu (alt-merkez).

**Gündüz varyantı:** aynı kurgu beyaz zemine döner; araç studio/contact-shadow ile "yüzer" (Tesla /choose & used-detay), Fraunces ile editöryel koleksiyon eyebrow.

**Açılış:** sinematik logo-merkez loader (ARSENAL BÖLÜM 0.4), fade — çizgi film/bounce yok.

---

## 5. (d) Envanter ızgarası + filtre

**Düzen:** solda **filtre rayı** + sağda **yoğun ürün gridi** (New Balance katalog deseni — gözle doğrulandı: ince sol ray + 4-5 kolon yoğun grid + sağ-üst "Sort").

**Filtre rayı (Farfetch "All Filters" deseni — gözle doğrulandı):**
- Başlık `All Filters / Tüm Filtreler` + (mobilde) X kapat.
- Katlanır accordion gruplar: **Marka** · **Model** · **Fiyat aralığı** · **Yıl** · **KM** · **Yakıt** · **Kasa tipi** · **Renk**.
- Seçenekler **dikdörtgen 0-radius** çipler/butonlar (Farfetch beden ızgarası gibi); aktif = aksan kenar.
- Marka için **alfabetik index rayı** opsiyonu (SSENSE DNA).
- Alt sticky bar: `Clear all` + dolu aksan **`Show 83 Results`** (Farfetch'teki gerçek desen).

**Araç kartı (grid):**
```
┌────────────────────────┐
│  [araç foto 4:3]        │  ← contact-shadow, 0px köşe
│                         │
├────────────────────────┤
│ BMW M4 Competition      │  ← Geist 500 (--text)
│ 2022 · 18.400 KM        │  ← Geist Mono UPPERCASE (--text-faint)
│ €74.900                 │  ← Geist Mono (--accent vurgu)
│ ⬩ Benzin ⬩ Otomatik     │  ← spec çipleri
└────────────────────────┘
```
- Gece: kart `--surface (#141414)`, 1px `--border`. Gündüz: beyaz kart, hairline `--border`, gölgesiz (AATHER/Abel düz yüzey).
- Hover: **ince** image scale 1.0→1.03 + ikinci açı crossfade. **Dönen/flip kart YOK** (BÖLÜM 13).
- Üstte: sonuç sayısı + `Sort by` dropdown (price, year, km).

---

## 6. (e) Araç detay sayfası

> Birebir Tesla used **2021 Model S Plaid** detay + order/spec rayından (gözle doğrulandı). İkinci-el lüks = yüksek değerli tekil obje → watch/jewelry ürün-sayfası deseni (kaide foto, seyrek fiyat paneli, accordion spec).

**İki kolon:**

**SOL — sahne galerisi:** seamless zeminde **yüzen tek araç** (gece siyah / gündüz beyaz, contact-shadow), altta pagination noktaları + açı thumbnail'ları, makro crop'lar, opsiyonel 360°/iç mekân sekmesi.

**SAĞ — sticky satın-alma rayı (Tesla deseni):**
1. Başlık (Monument Extended) `2022 BMW M4` + trim alt satırı.
2. **3'lü stat satırı** (Geist Mono): `2022 · YIL` / `18.400 · KM` / `510 · HP` (Tesla'nın Range/TopSpeed/0-60 satırının ikinci-el karşılığı).
3. Fiyat (büyük) + `€1.014 /mo` finansman satırı + dolu aksan **`Rezerve Et / Order Now`** + ghost `Test Sürüşü Ayarla`.
4. Kısa güven satırı (Geist Mono): `NO ACCIDENTS · AUTOCHECK ✓`.

**Altta — bölümlenmiş (merkez başlıklı, Tesla):**
- **Araç Detayı** — bullet spec listesi: VIN, boya (örn. *Pearl White Multi-Coat*), jant, iç mekân, odometre, donanım.
- **Durum / Kondisyon** — `Hasar kaydı yok · Mekanik kontrol ✓ · Kozmetik kusurlar · Autocheck geçmişi` (Tesla "Condition" birebir).
- **Garanti** — temel + ikinci-el ek garanti satırları.
- **Donanım & Paketler** — kart çiftleri (Tesla "Charging" iki-kart deseni).
- **Teslimat Lokasyonu** — seçilebilir lokasyon kartları + tahmini süre/ücret.
- **Finansman** — açılır "Show Pricing Details" kırılımı (peşinat/ay/oran).

Bol negatif alan, monokrom + tek aksan CTA, merkez bölüm başlıkları (Tesla used-detay imzası).

---

## 7. (f) Motion felsefesi — ARSENAL BÖLÜM 13 uyumlu

**Felsefe:** *Sinematik ama kontrollü. Araç konuşur, arayüz susar.* (GSAP + ScrollTrigger önerilir; transform/opacity only.)

**İlkeler:**
- Easing yalnız `ease-out` / `ease-in-out` / custom cubic — **bounce/spring YASAK**.
- Süreler 200–600ms; sadece `transform` + `opacity` (performans, 60fps).
- `prefers-reduced-motion` tam destek (animasyonlar kapanır).

**Uygulama:**
- **Hero:** sessiz autoplay loop video / yavaş Ken-Burns pan; lockup fade-up.
- **Scroll:** bölümlenmiş reveal (fade + 12–24px translateY), hero pin/handoff, hafif parallax.
- **Grid:** kart stagger fade-in (40–60ms), hover ince scale + açı crossfade.
- **Detay:** galeri crossfade, sticky ray, accordion düzgün yükseklik geçişi, opsiyonel fiyat count-up.
- **Tema toggle:** renk token'larında 300ms cross-fade (flash değil).
- **Loader:** sinematik logo-merkez fade (BÖLÜM 0.4).

### 🚫 YASAK (BÖLÜM 13 — Master Bible fragmanlarından doğrulandı)
> *"Galzura ARSENAL v5 BÖLÜM 0.13 yasakları geçerli: aurora bg, neon, particles, glitch, bounce/spring easing, dönen kartlar YASAK. Subtle micro-interactions OK."* — paste-cache 69fbda01
> *"Master Bible BÖLÜM 0.13: ÇİZGİ FİLM YASAK. cartoon ikonu YOK — lucide minimal veya custom SVG kullan."* — paste-cache 68f516f8 / 76983a6c

- ❌ Aurora/gradient zemin · ❌ neon glow · ❌ particle alanları · ❌ glitch
- ❌ bounce/spring easing · ❌ dönen / 3D-flip kartlar
- ❌ çizgi film illüstrasyon/ikon → ✅ **Lucide minimal** veya custom SVG
- ✅ subtle micro-interaction'lar serbest

---

## 8. ARSENAL_v6 — BÖLÜM 0 (Temel Standartlar) uyumu

| Kural (kaynak) | Bu sistemde karşılığı |
|---|---|
| **0.1 Görsel Varlık Standardı** (paste-cache 42cf44d4) — gerçek/üst düzey görsel, CSS sahte yok | Hero `hero-main.mp4` gerçek varlık; araç fotoğrafları kaide/contact-shadow; "imagery role" CSS kutuyla taklit edilmez |
| **0.4 Cinematic loader** (76983a6c) | Logo-merkez fade açılış |
| **0.13 Premium/sinematik, çizgi film yasak** (68f516f8) | §7 motion + Lucide/custom SVG ikon politikası |
| Premium logo 3 kuralı (bcb6ae15) | Logo ince, monokrom, boyuna gerilmez; nav'da küçük & net |

---

## 9. Karar defteri (Decision Ledger)

| Karar | Kaynak | Korunan rol | Neden |
|---|---|---|---|
| Gece zemini #000/#141414/#1F1F20 | Ferrari + Tesla /choose,inventory | bg/surface | Void DNA; araç metalini parlatır |
| Aksan #3C6BE2/#2962C9 | Tesla used-detay & /choose hex | yalnız CTA/aktif | Tesla void DNA, ticari güven (kırmızıdan sakin) |
| Ferrari kırmızısı rezerve | Ferrari Rosso Corsa | tek-nokta rozet | "tek kritik gösterge kırmızı yanar" disiplini |
| Gündüz #FFF + #030303 + #707070 | AATHER/Abel/Apple | bg/text | "white linen" sessiz lüks (SSENSE/Zara) |
| 0px köşe + 2px buton | Ferrari/BMW/Abel + AATHER | radius | Keskin galeri/precision; pill reddedildi |
| Monument Ext / Geist / Geist Mono / Fraunces | BMW display + Soehne/SF + Ferrari/Abel mono + AATHER serif | font rolleri | Lisanssız öncelik + referans karakteri |
| Sticky satın-alma rayı + bölümlü detay | Tesla used-detay (gözle) | detay düzeni | İkinci-el spec/güven kalıbı |
| Sol filtre + yoğun grid + "Show N" | Farfetch + New Balance (gözle) | envanter düzeni | Marka/fiyat filtreleme, lüks katalog yoğunluğu |

---

## 10. Araştırma kaynakları (Refero — gerçek dönüşler, giriş istenmedi)

**Stiller — `dark luxury automotive`** (toplam ~1000): en güçlü 3 → **Ferrari** `306ff7bc`, **Arc/arcboats** `f1ffea26`, **BMW** `002e3409`.
**Stiller — `minimal light editorial ecommerce`** (toplam ~1001): en güçlü 3 → **AATHER** `87895906`, **Abel** `5578dc12`, **Apple** `e02fcb85`.
**Ekranlar — `car detail page specifications`** (toplam ~1014): **Tesla 2021 Model S used detay** `a12032fb`, **Tesla used order+spec rail** `0bcde09c`, **Tesla /choose** `c61a5e48` (hepsi tesla.com).
**Ekranlar — `ecommerce product filter sidebar`** (toplam ~1304): **Farfetch All Filters** `4f4d9938`, **New Balance katalog+ray** `84f43187`, **Aesop editöryel filtre** `d4d63d11`.

> Tam çözünürlükte gözle incelenen ekranlar: `a12032fb`, `0bcde09c`, `4f4d9938`, `84f43187` (+ önceki turlardan Tesla/Rivian heroları). Tüm hex/font değerleri `refero_get_style` ve ekran `hex_colors` çıktılarından alındı.
