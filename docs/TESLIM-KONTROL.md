# TESLİM KONTROLÜ — Mega Cars v2 (Galzura teslim listesi)

> Tarih: 23.10.2026 · Dal: `v2` · Önizleme: https://megacars-git-v2-volkancatak1309-maxs-projects.vercel.app (girişsiz, noindex) · Ölçüm ayrıntıları: `docs/LIGHTHOUSE.md` · Kararlar ve kaynaklar: `docs/KARAR-DEFTERI.md`
> Durum: ✓ tamam · ◐ kısmen · ✗ eksik — her eksik madde nedeniyle yazıldı.

| # | Madde | Durum | Kanıt / not |
|---|---|---|---|
| 1 | **Lighthouse** (mobil Perf ≥ 80, masaüstü ≥ 85, mobil LCP < 3,0 sn, CLS < 0,1, INP < 200 ms, ilk yük JS < 300 KB gzip) | ◐ | 8 sayfa tipi × mobil/masaüstü × 3 ölçüm, ortanca. **Masaüstü** 92–97, LCP ≤ 1,24 sn ✓. **Mobil Performans** 7/8 ≥ 80 (detay 78 ✗). **Mobil LCP** liste 2,73 · Kontakt 2,58 · Impressum 2,46 ✓; ana sayfa 3,40 · detay 3,69 · Finanzierung 3,23 · Ankauf 3,38 · Datenschutz 3,11 ✗. CLS her yerde ≤ 0,022 ✓. İlk yük JS 225–237 KB ✓. Erişilebilirlik ve en iyi uygulamalar her sayfada 100. **Neden:** Lighthouse her ölçümü ilk ziyaret sayar; ilk ziyaret yükleyicisi açıkken ilk boyama ≈ 2,4 sn'ye kayıyor (ilk boyamanın erken geldiği ölçümlerde aynı sayfalar 2,3–2,7 sn). "Yükleyici ↔ LCP" çelişkisi Volkan'ın kararını bekliyor (KARAR-DEFTERI). **INP:** 1× CPU'da 40–72 ms ✓; 4× yavaşlatmada modal açan düğmeler 224–296 ms ✗ (`showModal` stil yeniden hesabı). |
| 2 | **WebP + srcset** | ✓ | Araç fotoğrafları WebP 240 / 800 / 1440 w `srcset` + bulanık yer tutucu + tembel yükleme; açılış posteri WebP (LCP öğesi); film H.264 MP4 (masaüstü 1920 px 5,2 MB, mobil 540×960 2,2 MB). Paylaşım görselleri JPG (Open Graph standardı). |
| 3 | **Premium düğmeler** | ✓ | Bütün düğmeler, menü linkleri, filtre hücreleri ve yeni form düğmelerinde kırmızı kepenk + yazı yuvarlanması (`Shutter`), manyetik CTA, tıklamada 0.98, 2 px odak halkası. Bilinçli istisnalar: dev telefon numarası (hover'da kırmızı alt çizgi), Datenschutz içindekiler linkleri ve form seçim çipleri. |
| 4 | **Her bölümde hareket** | ✓ | İç sayfa açılışı: dağınık harf yükselişi + maskeli başlık; adımlar: maskeli başlık + sırayla yerleşme; formlar: dev kelime harf harf; Über uns: maskeli başlık, clip-path fotoğraf, blok süpürme, çizilen satırlar, stok sayacı; konum: çizilen harita; Impressum/Datenschutz: çizilen satırlar, bölüm başlıkları maskeli; liste: dev rakam yükselişi, GSAP Flip (filtre ve Raster/Liste), clip-path kartlar, sayaçlı sonuç sayısı; açılış: harflerin içinde film + 12 sn'de %6 yakınlaşma. |
| 5 | **Reduced motion** | ✓ | `prefers-reduced-motion: reduce` ile ölçüldü (/en): film eklenmiyor, yakınlaşma yok, yükleyici/grain/imleç gizli, Lenis kapalı, çalışan animasyon 0, GSAP satır içi dönüşüm 0. |
| 6 | **DE / EN / TR %100** | ✓ | EN ve TR 409 anahtar, eksik 0 (DE'de 13 renk/döşeme anahtarı bilerek yok: veri Almanca). Donanım sözlüğü EN 108/108, TR 108/108. Dil seçici DE · EN · TR, çevrilmiş yollar (/en/vehicles, /tr/araclar …). Bilerek Almanca kalanlar: plaka kapağındaki "Gewissenhaft. Verlässlich. Professionell." ve Facebook alıntısı (EN/TR'de çevirisiyle, `lang="de"`). Impressum ve Datenschutz EN/TR'de "bağlayıcı olan Almanca metindir" notu. |
| 7 | **Konsol** | ✓ | 48 Lighthouse ölçümünün hepsinde "errors-in-console" 0. Önizlemede Vercel araç çubuğu betiği (`vercel.live`) bulunur; üretim adresinde yoktur. |
| 8 | **robots + sitemap + favicon + OG** | ✓ | `robots.txt` şimdilik `Disallow: /` + her sayfada `noindex` + `X-Robots-Tag` — canlıya geçiş tek satır: `lib/launch.ts` → `INDEXABLE = true`. `sitemap.xml` 72 adres (6 sayfa + 18 araç × 3 dil), her biri hreflang alternatifleriyle; gizli Ankauf dışarıda. Favicon `icon.svg` (kırmızı kare, beyaz M) + `apple-icon.png` 180 px. OG/Twitter her sayfada, mutlak adresli; araçta kendi kapak fotoğrafından 1200×630, diğerlerinde yedek `og/default.jpg`. JSON-LD: AutoDealer, Car + Offer, BreadcrumbList. |
| 9 | **/cars ve /hero için 1 yıl immutable önbellek** | ✓ | `Cache-Control: public, max-age=31536000, immutable` (önizlemede curl ile doğrulandı: /cars/…webp, /hero/c8/…mp4, …webp). Yeni film kodlaması yeni klasöre gider (`/hero/c8/`). |
| 10 | **Vercel'in GitHub'a bağlı otomatik yayını** | ✓ | Her `v2` push'u Vercel'de kendiliğinden derlendi (commit durumu "Vercel: success"); elle CLI deploy yapılmadı. Sabit önizleme adresinde bütün sayfalar girişsiz 200 döndü (30 adres kontrol edildi). |

## Ek kontroller
- **390 / 1440 / 2560 px:** 20 sayfa × 3 genişlik = 60 kontrol; bulunan tek yatay taşma (TR "HAKKIMIZDA" dev kelimesi) düzeltildi. 2560 px'te filtre panelinde kesilen İngilizce etiket düzeltildi (panel her genişlikte 4 × 2).
- **Klavye:** "İçeriğe atla" → logo → menü → dil; her odakta görünür 2 px halka; formlarda radyo çipleri, seçimler, düğmeler klavyeyle çalışıyor; filtre hücrelerinde yerel `select`.
- **aria-label:** Lighthouse erişilebilirlik 100 (bütün sayfa tipleri, mobil + masaüstü); ikon-yalnız düğmelerde etiket var; logo ve dil linklerinde görünen yazı erişilebilir adın başında.
- **Kontrast (WCAG AA):** kırmızı bölümde ikincil metin 4,13:1 → 5,24:1 düzeltildi; yeni eşleşmeler ölçüldü (kırmızı-koyu/kemik 5,47:1; kemik/gece 15,97:1; seçili form çipi 5,24:1). Koyu zeminde küçük kırmızı yazı yok.
- **Çerez:** site çerez koymuyor ve cihaza bir şey kaydetmiyor (dil çerezi kapalı, yükleyici depolama kullanmıyor) → çerez bandı yok.

## Eksik kalanlar ve nedenleri
1. **Mobil LCP 5 sayfa tipinde > 3,0 sn, detay mobil Performans 78** — ilk ziyaret yükleyicisi ilk boyamayı geciktiriyor; çözüm yolu Volkan'ın seçimine bağlı (yükleyici yalnız ana sayfada / sayfayı örtmeyen köşe sayacı / olduğu gibi).
2. **INP (4× yavaşlatma) modal açılışlarında 224–296 ms** — `showModal` kaynaklı; modal yapısı değişikliği ayrı iş.
3. **Güncel stok** — Gökhan'dan bekleniyor; demo Haziran 2026'daki son bilinen 18 araçla çalışıyor.
4. **360° showroom** — deneme çekimi bekleniyor; görüntüleyici hazır, veri gelince kendiliğinden açılır.
5. **Yasal eksikler:** UID (bulunan numara VIES'te geçersiz), fiyatların KDV durumu (§ 5 Abs. 2 ECG), Firmenbuch'taki güncel firma yazımı — "Teyit bekliyor" listesinde.
6. **Ankauf / Inzahlungnahme** — sayfa ve form hazır, teyit gelene kadar menüde ve sitemap'te gizli (`PAGES.tradeIn`).
7. **SEO puanı 66–69** — bilerek: canlıya çıkana kadar noindex.
