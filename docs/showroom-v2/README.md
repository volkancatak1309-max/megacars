# 360° boru hattı: kurulum testi (22.10.2026)

> **Bu test yöntemi kanıtlamaz.** Kaynak klip (Pexels 854754, 1920×1080, 60 sn, Pexels License; yalnız iç test, sitede asla yayınlanmaz, repoya girmez) bir yürüme turu değil: araç sabit kamera önünde dönen bir müze sahnesinde duruyor ve yalnız ≈ 250° dönüyor. Zeminde müzenin döner sahnesi, LED yansımaları, direkler ve bir kask-gözlük aksesuarı var. Bu sayfa yalnız boru hattının uçtan uca çalıştığını ve ölçüleri gösterir. Yöntemin fotoğraf gibi durup durmadığı Mega Cars'ın deneme çekimiyle görülecek (talimat: `CEKIM-TALEBI.md` / `CEKIM-TALEBI.pdf`).

## Ölçek kuralı (Volkan kararı, 22.10.2026)

Döner platform taklidinde araç kendi merkezi etrafında döner, kamera sabittir; aracın yandan geniş, önden dar görünmesi doğaldır.
- Kareler COLMAP'ten gelen **"kamera – araç merkezi" uzaklığına** göre ölçeklenir: ölçek = dᵢ / medyan(d).
- Kamera yüksekliği ve ufuk çizgisi sabitlenir: COLMAP'in dikey eksenine göre her karenin eğimi düzeltilir ve araç merkezinin görüntüdeki izdüşümü tek bir noktaya taşınır.
- Aracın kutu boyutunu (bounding box) her karede eşitleyen ölçekleme **yasaktır**; araç dönerken büyüyüp küçülüyormuş gibi görünür.
- 72 kare, araç merkezi etrafında eşit açı adımlarıyla seçilir.
- Kod: `kod/sfm_angles.py` (araç merkezi, uzaklık, eğim, izdüşüm → `geometry.json`) ve `kod/stabilize.py` (dönüşüm).
- **Bu kural gerçek çekimde doğrulanacak.** Bu klipte kamera neredeyse sabit; kuralın asıl etkisi yürüyerek çekilen turda görülecek.

Bu klipteki değerler [DOĞRULANDI: `stab_stats.json`, `sfm_stats.json`]:

| Ölçü | Değer |
|---|---|
| Uzaklığa göre ölçek | 0,964 – 1,045 |
| Eğim düzeltmesi | en çok 4,43° |
| Aracın genişliği dönerken (korunur, eşitlenmez) | 935 – 1490 px (1,59 kat). Kutu eşitleme aracı %59'a varan oranda büyütüp küçültürdü. |
| 72 karenin hepsinde kaynakla dolu ortak alan | 1149 × 862 px. Kenarlara piksel uydurulmaz; 4:3 kırpma bu alanın içinde kalır. Bu klipte kareler 1440 × 1080'e büyütüldü (yumuşama). 4K kaynakta 1600 × 1200 için yeterli alan kalır [VARSAYIM]. |

## Adımlar ve süreler (RTX 4050 Laptop 6 GB, i5-13500H, 32 GB RAM)

| Adım | Araç | Süre |
|---|---|---|
| Kare çıkarma (5 fps, 300 kare) | ffmpeg | 2,1 sn |
| Araç maskesi, 150 kare, zamanda tutarlı | SAM 2.1 hiera-small (Apache-2.0), video modu, GPU | 7,4 sn yükleme + 20,2 sn (GPU zirve 605 MB) |
| Kamera pozları, açılar, araç merkezi | pycolmap 4.2.1 (BSD), yalnız araç maskesindeki SIFT, ardışık eşleme, artımlı eşleme, CPU | 25,6 + 14,9 + 24,2 + 38,4 = 103 sn |
| 72 kare seçimi (eşit açı) | çember uydurma + en yakın kare | < 1 sn |
| Kenar inceltme, 72 kare | BiRefNet (MIT), GPU, FP16 | 18,9 sn yükleme + 203,4 sn (2,8 sn/kare, zirve 1,6 GB) |
| Ölçek kuralı (uzaklık, ufuk, merkez) | `stabilize.py` | 11,0 sn |
| Fon değiştirme + dışa aktarma (A, B × 1440, 960) | Pillow/NumPy | 76,4 sn |
| **Toplam (bu klip)** | | **≈ 443 sn ≈ 7,4 dk** |

COLMAP sonucu: 150/150 kare kaydedildi, 17.529 3B nokta, ortalama yeniden izdüşüm hatası 0,59 px, kapsanan yay 250,3°, kamera yüksekliği sapması %0,52. 72 kare 3,52° adımla, hedef açıdan en çok 0,87° sapmayla seçildi (tam turda adım 5° olur).

## Çıktı ve ölçüler

| Ölçü | Değer |
|---|---|
| 72 kare masaüstü (1440×1080 WebP q80) | A 4,22 MB · B 4,09 MB |
| 72 kare mobil (960×720 WebP q80) | A 2,74 MB · B 2,66 MB |
| İlk kare | masaüstü 66–67 KB · mobil 43–44 KB |
| İlk kare süresi (Chrome ağ kısıtlaması, boş önbellek, B görünümü) | Yavaş 4G mobil 2,33 sn · Hızlı 4G mobil 0,81 sn · Hızlı 4G masaüstü 0,79 sn |
| 72 karenin tamamı | 19,3 sn · 5,0 sn · 5,9 sn (aynı sıra) |
| Görüntüleyici JS | 2,7 KB gzip · 6,1 KB küçültülmüş · 11,6 KB ham · bağımlılık yok |
| Aracın tam opak pikselleri | çıktı = yerleştirilmiş kaynak kare (fark 0; yerleştirme yalnız geometrik örneklemedir) |

## Görüntüleyici kontrolleri (Chrome, otomatik test)
- Kendiliğinden dönme: araç üstten saat yönünde, 9°/sn (1 tur ≈ 40 sn); tek ayar `autoRotate: { degPerSec, direction }` ✓
- Sürükleme: araç imleci izler (yakın yüz imleçle aynı yöne gider); bırakınca atalet en çok 180°/sn'den başlar, ≈ 28° kayıp durur ✓
- 3 sn dokunulmazsa yeniden döner ✓ · `prefers-reduced-motion`: kendiliğinden dönme ve atalet kapalı ✓
- Yakınlaştırma (Volkan kararı, 22.10.2026): Ctrl/⌘ + fare tekerleği ya da iki parmak (1×–2,5×); düz tekerlek yalnız tam ekranda yakınlaştırır, normal sayfada sayfayı kaydırır ✓
- Klavye ← → (Shift ile 45°), + / −, F; görünür ← → ve tam ekran düğmeleri `aria-label`'lı ✓ · `touch-action: pan-y` ✓ · konsol hatası 0 ✓
- Ölçüm sırasında bulunan ve düzeltilen hatalar: ilk 12 kare ilk kareyle aynı anda isteniyordu (yavaş 4G'de ilk kare 3,46 sn → 2,46 sn); sürükleme yönü tersti.

## Bilinen sınırlar
- Zemin dairesi bu testte sabit bir elips; gerçek çekimde COLMAP zemin düzleminden hesaplanacak.
- A (açık fon) bu klipte sahte duruyor: koyu ve parlak sahne zemini açık fonla çatışıyor. B daha doğal; zemindeki LED yansımaları kalıyor.
- C (platform kenarı) kurulmadı. Cam adımı denenemedi (araçta cam yok).
- SAM 2'nin isteğe bağlı CUDA eklentisi derlenmedi (küçük delik doldurma atlandı); bir karede araç altındaki beyaz zemin maskeye karıştı.

## Yeniden çalıştırma
Sıra: `mask_sam2.py` → `sfm_angles.py` → `refine_birefnet.py` → `stabilize.py` → `composite.py` (`kod/` altında). Kareler `kareler/` altında üretilir; `.gitignore`'da, repoya girmez. Test sayfası (`index.html`) bu kareler yerel olarak üretildikten sonra çalışır.
