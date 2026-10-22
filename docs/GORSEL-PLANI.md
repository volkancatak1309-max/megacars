# GÖRSEL PLANI (FAZ 3 için; bu oturumda hiçbir şey üretilmedi)

Tarih: 22.10.2026 · Fiyatlar fal.ai model sayfalarından 22.10.2026'da okundu; fal "fiyatlar değişebilir" diyor. Etiketler: [DOĞRULANDI] + kaynak · [VARSAYIM] · [BİLMİYORUM].

**Genel kurallar (brif):**
- İstemlerde zorunlu ifadeler: "photorealistic", "shot on Sony FX9" ya da "shot on Phase One medium format", "natural lighting" ya da "professional studio lighting", "documentary realism", "no CGI feel", "shallow depth of field", "natural color grading", "cinematic 35mm" ya da "85mm lens".
- İstemlerde yasak kelimeler (olumsuz cümle içinde bile kullanılmaz): cartoon, illustration, low-poly, stylized, neon, vibrant colors.
- Video: 24 fps, doğal hareket bulanıklığı; kamera yalnız dolly, push-in, tilt-up ya da yumuşak pan; ani kesme, zoom flaşı, parçacık patlaması, sert sarsıntı yok; doğal renk düzenlemesi.
- Yapay zekâ ile üretilmiş hiçbir araç stok aracı gibi gösterilmez; stok araçların görselleri yalnız kendi gerçek fotoğrafları ve gerçek videolarıdır.

---

## 0. Özet tablo

| # | Görsel | Nerede | Mevcut varlık yeterli mi | Yöntem | Tahmini maliyet |
|---|---|---|---|---|---|
| 1 | Showroom odası (boş, ışık açık) | 360 sahnesi, liste kartları, öne çıkanlar | Hayır (denemedeki zemin kodla çizildi, fotogerçekçi değil) | fal.ai FLUX 1.1 [pro] ultra | ≈ 0,36 $ (6 deneme) |
| 2 | Showroom odası (ışık kapalı) | Wow 3 "ışıklar yanar" geçişi | – | #1'den ton eğrisiyle türetilir (YZ yok) | 0 $ |
| 3 | Döner platform dokusu | Her spin karesi | – | Kodla üretilir (her açıya tam döndürme için) | 0 $ |
| 4 | Açılış videosu | Startseite Wow 1 | **Hayır** (mevcut video YZ üretimi, stokta olmayan araç, 30 fps, sert kesmeli) | Seçenek A ya da B (§4) | A ≈ 4,72 $ · B ≈ 4,48 $ |
| 5 | Açılış posteri | Startseite LCP | – | Seçilen videonun bir karesi | 0 $ |
| 6 | Araç kapakları (showroom zemininde) | Liste kartları, öne çıkanlar | Kısmen (yalnız eski 18 aracın fotoğrafları var, ilanlar kalkmış) | Yerel BiRefNet boru hattı | 0 $ (yerel) |
| 7 | 360 spin kareleri | Detay sayfası | Hayır (video yok) | Galeride telefon çekimi + boru hattı | 0 $ yerel, araç başı en fazla ≈ 1,32 $ fal yedeği |
| 8 | Galerinin gerçek showroom fotoğrafı | Startseite "Galeri ve güven", Kontakt | Kısmen (ilan fotoğraflarının arka planında görünüyor, ayrı fotoğraf yok) | Galeride gerçek çekim (YZ yok) | 0 $ |
| 9 | Ekip fotoğrafı | Über uns | Hayır | Gerçek çekim, yalnız izinle | 0 $ |
| 10 | Finanzierung ve Ankauf bölüm görselleri (isteğe bağlı) | İlgili sayfaların girişi | Hayır | Tercihen gerçek çekim; olmazsa FLUX 1.1 [pro] ultra (araçsız) | ≈ 0,36 $ |
| 11 | OG görselleri | Paylaşım önizlemesi | – | `next/og` ile gerçek veriden; yedek görsel gerçek fotoğraftan | 0 $ |
| 12 | Logo ve favicon | Bütün site | Hayır (dijital logo dosyası yok) | Galeriden vektör logo istenir; yoksa yazı tipiyle kelime logo önerisi (Volkan onayı) | 0 $ |

**Önerilen yolla toplam YZ maliyeti: ≈ 5,44 $** (#1 + #4-A + #10). Spin kareleri yerelde 0 $; yerel hat başarısız olursa fal yedeği eklenir (§7). Bu tutar bu oturumun 1 $ sınırının dışında; FAZ 3 bütçesi için Volkan onayı gerekir.

---

## 1. Showroom odası (boş, ışık açık)

- **Nerede:** 360 sahnesinin arka planı; liste kartlarında ve öne çıkanlar şeridinde kapak fotoğraflarının zemini.
- **Mevcut:** denemedeki zemin kodla çizildi (`showroom-deneme/zemin-yerel-prosedurel.jpg`), fotogerçekçi değil.
- **Model:** `fal-ai/flux-pro/v1.1-ultra`, `raw: true`, 4:3, en fazla 2048×2048 (4 MP). **0,06 $ / görsel.** [DOĞRULANDI] https://fal.ai/models/fal-ai/flux-pro/v1.1-ultra
- **Deneme sayısı:** 6 (2 kamera yüksekliği × 3 deneme) → ≈ 0,36 $. [VARSAYIM: deneme sayısı]
- **Kamera yüksekliği:** galeri çekimindeki yükseklikle (≈ 1,2 m) aynı olmalı; ilk deneme videosu geldikten sonra ufuk çizgisi karelerden ölçülür ve istem buna göre ayarlanır.
- **İstem (EN):**

```
photorealistic empty vehicle handover hall at night, shot on Phase One medium format, professional studio lighting from one large rectangular soft overhead light panel, dark charcoal matte concrete floor with very fine natural texture, seamless curved cove where the floor meets a dark graphite back wall, a soft pool of light on the center of the floor fading to near black toward the edges, calm and quiet atmosphere of a premium German car brand delivery center, camera at 1.2 meters height looking straight ahead, horizon line one third from the top of the frame, wide empty floor area in the center reserved for a vehicle, no vehicles, no people, no text, no signage, no logos, no colored light strips, no reflections of windows, documentary realism, no CGI feel, shallow depth of field on the far back wall only, natural color grading, cinematic 35mm
```

- **Kabul ölçütü:** zemin ortası keskin ve dokulu; renk nötr (ton 260–280° arası çok düşük kroma); duvarla zemin arasında yumuşak geçiş; yazı ya da logo yok; aynı oda iki yükseklikte tutarlı.

## 2. Showroom odası (ışık kapalı)

- **Nerede:** Wow 3, "showroom ışıkları yavaşça yanar".
- **Yöntem:** #1'den ton eğrisi ve merkezî ışık havuzunun söndürülmesiyle türetilir (Pillow/OpenCV). YZ yok, maliyet 0 $. Aracın pikseline dokunulmaz; yalnız zemin görseli değişir.

## 3. Döner platform

- **Yöntem:** kodla üretilir (`showroom-deneme/kod/showroom.py` mantığı genişletilerek): mat malzeme dokusu, kenarda 3°'de bir ince ve 30°'de bir uzun işaret, isteğe bağlı oyulmuş "MEGA CARS" yazısı. Her spin karesi için tam θ açısında döndürülüp kamera yükseklik açısına göre elipse basılır. YZ yok, 0 $.
- **Neden YZ değil:** platformun her karede tam 5° dönmesi gerekir; üretken model bu geometrik tutarlılığı garanti etmez.

## 4. Açılış videosu: iki seçenek

Mevcut `hero-main.mp4` kullanılamaz (`docs/ARASTIRMA.md` §a3). Masaüstü 1920×1080 ve mobil 1080×1350 (4:5) sürüm aynı kaynaktan kırpılır.

### Seçenek A — Marka-nötr premium araç sahnesi (logo okunmaz)
- **Fikir:** karanlık teslim salonunda, tek bir koyu aracın yalnız parçaları (çamurluk kavisi, far, jant) üzerinden yavaşça kayan yumuşak ışık. Araç asla tam görünmez; rozet ve logo yoktur; atmosfer gösterir, stok iddiası taşımaz.
- **Adım 1, başlangıç karesi:** `fal-ai/flux-pro/v1.1-ultra`, 4 deneme × 0,06 $ = 0,24 $ [DOĞRULANDI fiyat]

```
photorealistic close detail of the front fender and headlight of a dark gray premium sedan standing in a dark vehicle handover hall, no badges, no emblems, no lettering, no license plate, a single soft band of light from a large overhead panel tracing the curve of the paintwork, matte charcoal concrete floor, deep shadows, calm and restrained mood, shot on Phase One medium format, professional studio lighting, documentary realism, no CGI feel, shallow depth of field, natural color grading, 85mm lens
```

- **Adım 2, video:** `fal-ai/kling-video/v3/pro/image-to-video`, sessiz, 10 sn: **0,112 $/sn → 1,12 $ / klip** [DOĞRULANDI] https://fal.ai/models/fal-ai/kling-video/v3/pro/image-to-video · 4 deneme = 4,48 $.

```
slow continuous dolly-in toward the car fender, the soft overhead light slowly glides across the paintwork from left to right, 24 fps, natural motion blur, no cuts, no zoom, no camera shake, no flashes, the car body stays perfectly rigid and unchanged, calm and quiet, photorealistic, shot on Sony FX9, professional studio lighting, documentary realism, no CGI feel, shallow depth of field, natural color grading, cinematic 35mm
```

- **Toplam A ≈ 4,72 $.**
- **fps:** Kling sayfası fps yazmıyor [BİLMİYORUM]; çıktı 24 fps değilse ffmpeg ile 24 fps'e dönüştürülür (hareket bulanıklığı kontrol edilir). 24 fps'i sayfasında yazan Veo 3.1 (0,20 $/sn sessiz) 17.11.2026'da fal'dan kaldırılıyor [DOĞRULANDI] https://fal.ai/models/fal-ai/veo3.1; bu yüzden önerilmez.

### Seçenek B — Stoktaki gerçek bir aracın gerçek fotoğrafından video (image-to-video)
- **Fikir:** stokta olan bir aracın orijinal ilan fotoğrafı başlangıç karesi olur; model yavaş bir push-in üretir.
- **Model:** `fal-ai/kling-video/v3/pro/image-to-video`, 10 sn, 4 deneme = **4,48 $** [DOĞRULANDI fiyat].

```
slow push-in toward the car, the camera glides forward smoothly at walking pace, 24 fps, natural motion blur, no cuts, no zoom, no camera shake, keep the vehicle, its badges, wheels and license plate cover exactly as in the photo, no changes to the paint color, calm, photorealistic, shot on Sony FX9, natural lighting, documentary realism, no CGI feel, shallow depth of field, natural color grading, cinematic 35mm
```

- **Riskler:** model aracı her karede yeniden çizer; rozet, jant ve yazılar bozulabilir (eski videodaki sorunun aynısı). Bu, gerçek ve satılık bir aracın görüntüsünü yapay zekâyla değiştirmek demektir ("aracın pikseline dokunulmaz" ilkesine aykırı). Araç satıldığında açılış videosu da değişmek zorundadır.

### Öneri: **Seçenek A**
Gerekçe: (1) Stok aracının görüntüsü yapay zekâyla değiştirilmez; dürüstlük ilkesi korunur. (2) Araç asla tam görünmediği ve rozet taşımadığı için "stok aracı" iddiası oluşmaz; açılış yalnız atmosfer kurar, gerçek araçlar hemen altındaki hızlı arama ve öne çıkanlar şeridinde gerçek fotoğraflarıyla gelir. (3) Araç satıldığında açılış eskimez.
**Daha da iyi (uzun vade):** galeride, 360 çekim düzeni oturduktan sonra gerçek bir aracın 24 fps gerçek çekimi. YZ yok, maliyet 0 $; Volkan isterse FAZ 3'te A ile başlanır, gerçek çekim gelince değiştirilir. [VARSAYIM: öneri]

## 5. Açılış posteri
Seçilen videonun en temiz karesi (ilk saniye), AVIF/WebP 1600 w ve 800 w. 0 $.

## 6. Araç kapakları (showroom zemininde)
- **Nerede:** liste kartları ve öne çıkanlar şeridi.
- **Yöntem:** her yeni stok aracının kapak fotoğrafı yerel BiRefNet ile ayrılır (CPU'da ≈ 25–31 sn, GPU kurulursa ≈ 1 sn [VARSAYIM]); renk orijinalden; zemin #1. Kalite kontrolünden geçmeyen araçta orijinal fotoğraf (DESIGN.md §5.2). 0 $.

## 7. 360 spin kareleri: araç başına ve stok için maliyet ve süre

| Kalem | Değer | Etiket |
|---|---|---|
| Çekim (galeride) | ≈ 2 dk araç başı + hazırlık | [VARSAYIM] |
| Yerel işlem (RTX 4050, CUDA kurulu) | COLMAP 5–10 dk + BiRefNet 72 kare ≈ 1–2 dk + SAM 2.1 ≈ 2–4 dk + kompozit < 1 dk → **≈ 10–20 dk** | [VARSAYIM] |
| Yerel işlem (yalnız CPU) | BiRefNet 72 × ≈ 25 sn ≈ 30 dk eklenir | [DOĞRULANDI: kare başı süre denemede ölçüldü] |
| İnsan kontrolü | ≈ 5 dk araç başı | [VARSAYIM] |
| Yerel maliyet | 0 $ | – |
| fal yedeği, maske | Bria RMBG 2.0: 0,018 $/görsel × 72 = **1,30 $** [DOĞRULANDI] https://fal.ai/models/fal-ai/bria/background/remove · SAM 3 video: 0,005 $ / 16 kare → 72 kare ≈ **0,02 $** [DOĞRULANDI] https://fal.ai/models/fal-ai/sam-3/video | |
| fal yedeği, kapak fotoğrafı | Bria 0,018 $ | [DOĞRULANDI] |
| **Araç başı fal yedeğiyle en fazla** | ≈ 1,32 $ | [VARSAYIM: hesap] |

**Güncel stok için toplam:** bugün AutoScout24'te ilan yok, gerçek stok sayısı bilinmiyor [BİLMİYORUM]. Son bilinen 18 araç üzerinden hesap: yerelde **0 $**, makine süresi ≈ 18 × 15 dk ≈ **4,5 saat** (GPU ile) + çekim ≈ 18 × 5 dk ≈ 1,5 saat + kontrol ≈ 1,5 saat; hepsi fal yedeğine düşerse en fazla ≈ 18 × 1,32 $ ≈ **24 $**. [VARSAYIM: hesap]

## 8. Galerinin gerçek showroom fotoğrafı
İlan fotoğraflarının arka planında galerinin iç mekânı (ahşap çıtalı duvar, ışıklı "MEGA CARS" tabelası, beyaz zemin) görünüyor; ama ayrı, temiz bir mekân fotoğrafı yok. Galeriden gerçek fotoğraf istenir ya da ilk 360 çekim günü telefonla çekilir: geniş iç mekân, tabela, bina cephesi (gündüz, kapalı hava). **YZ ile üretilmez** (galerinin kendi mekânı uydurulamaz). 0 $.

## 9. Ekip fotoğrafı
Yalnız Murat ve Kerim Demir izin verirse gerçek çekim. Yoksa bölüm yok. 0 $.

## 10. Finanzierung ve Ankauf bölüm görselleri (isteğe bağlı)
Önce gerçek çekim tercih edilir (galerideki masa, anahtar, belge). Gerçek çekim yoksa araçsız YZ görseli:
- **Model:** `fal-ai/flux-pro/v1.1-ultra`, 2 görsel × 3 deneme × 0,06 $ = **0,36 $** [DOĞRULANDI fiyat].
- **Finanzierung (EN):**

```
photorealistic dark walnut wooden desk in a quiet car dealership office at dusk, a closed dark leather folder, a simple pen and a single modern car key fob without any brand emblem resting on the folder, soft warm desk light from the left, deep shadows, calm and trustworthy mood, no text, no logos, no documents with readable writing, shot on Phase One medium format, natural lighting, documentary realism, no CGI feel, shallow depth of field, natural color grading, 85mm lens
```

- **Ankauf / Inzahlungnahme (EN):**

```
photorealistic close view of a car key fob without any brand emblem placed on a dark matte counter next to a small neatly folded microfiber cloth, a large soft overhead light, quiet premium handover atmosphere, no hands, no people, no text, no logos, shot on Phase One medium format, professional studio lighting, documentary realism, no CGI feel, shallow depth of field, natural color grading, 85mm lens
```

## 11. OG görselleri
Araç sayfaları için `next/og` ile 1200×630: showroom kapağı (ya da orijinal) + araç adı + fiyat; mutlak adres. Yedek `/og/default.jpg`: galerinin gerçek mekân fotoğrafından (#8). 0 $.

## 12. Logo ve favicon
Dijital logo dosyası bulunamadı (`docs/ARASTIRMA.md` §a7). Galeriden vektör logo istenir. Yoksa geçici çözüm: Hanken Grotesk 700, harf aralığı +0,04em ile "MEGA CARS" kelime logosu; favicon "MC". YZ ile logo üretilmez. Volkan onayı gerekir.

---

## Fiyat kaynakları (22.10.2026)
- FLUX 1.1 [pro] ultra: 0,06 $ / görsel, en fazla 4 MP — https://fal.ai/models/fal-ai/flux-pro/v1.1-ultra [DOĞRULANDI]
- Kling v3 Pro image-to-video: 0,112 $/sn sessiz, 0,168 $/sn sesli — https://fal.ai/models/fal-ai/kling-video/v3/pro/image-to-video [DOĞRULANDI]
- Veo 3.1: 0,20 $/sn sessiz, 24 fps; 17.11.2026'da kaldırılıyor — https://fal.ai/models/fal-ai/veo3.1 [DOĞRULANDI]
- Bria RMBG 2.0 (fal üzerinden, ticari lisanslı): 0,018 $ / görsel — https://fal.ai/models/fal-ai/bria/background/remove [DOĞRULANDI]
- SAM 3 video: 0,005 $ / 16 kare — https://fal.ai/models/fal-ai/sam-3/video [DOĞRULANDI]
- BiRefNet v2 (fal): sayfada "0 $ per compute second" yazıyor; gerçek fatura küçük bir testle ölçülmeli — https://fal.ai/models/fal-ai/birefnet/v2 [BİLMİYORUM: gerçek fiyat]
