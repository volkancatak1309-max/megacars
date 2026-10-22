# Showroom denemesi (22.10.2026)

Amaç: Repodaki 3 gerçek ilan fotoğrafında aracı arka plandan ayırmak, tek bir boş showroom zeminine temas gölgesi ve hafif yansımayla yerleştirmek, kenarları %200 büyütmeyle dürüstçe değerlendirmek. Sitede kullanılmaz; yalnız karar içindir.

## Dosyalar

| Dosya | İçerik |
|---|---|
| `1-mercedes-s-560-4matic-showroom.jpg` | Siyah araç, kaynak: iç showroom (beyaz zemin, mavi LED, ahşap duvar) |
| `2-porsche-panamera-e-hybrid-s-showroom.jpg` | Beyaz araç, kaynak: iç showroom |
| `3-audi-q3-35-tdi-showroom.jpg` | Beyaz araç, kaynak: dış mekân, yağmurlu, bulutlu |
| `*-yan-yana.jpg` | Solda orijinal ilan fotoğrafı, sağda showroom sonucu |
| `kenar-200/*-kenar.jpg` | Ayna, jant, cam ve tavan bölgeleri; solda orijinal, sağda sonuç, ikisi de %200 |
| `zemin-yerel-prosedurel.jpg` | Denemede kullanılan zemin (aşağıdaki nota bakın) |
| `kod/cutout.py` | Arka plan ayırma (rembg + BiRefNet-general) |
| `kod/showroom.py` | Zemin, platform, gölge, yansıma ve yerleştirme; **araç pikseli kanıtı** |
| `kod/edges.py` | %200 kenar kırpımları |

## Yöntem

1. **Arka plan ayırma (yerel, ücretsiz):** rembg 2.x + **BiRefNet-general** ONNX modeli (MIT lisansı). CPU'da çalıştı: 24,5 sn · 26,8 sn · 31,3 sn. fal.ai kullanılmadı. [DOĞRULANDI: çalıştırma çıktısı]
2. **Yalnız maske alındı.** rembg'nin RGBA çıktısı rengi maskeyle çarpıyor, yani yarı saydam piksellerde aracı karartıyor (ölçülen fark: 5 birim). Bu yüzden modelden yalnız alfa maskesi alındı; renk doğrudan orijinal fotoğraftan geldi. [DOĞRULANDI]
3. **Maskenin çekirdeği opak yapıldı.** BiRefNet gövdenin içini alfa 250–254 olarak veriyor; bu, yeni zeminin boyaya %1–2 karışması demek. Alfa ≥ 250 olan pikseller 255 yapıldı. Değişen yalnız maske; aracın rengi değişmedi. Kenarlar (alfa < 250, aracın ≈ %2'si) yumuşak kaldı. [DOĞRULANDI]
4. **Yerleştirme:** araç **yeniden örneklenmedi**; oda aracın ölçeğine göre büyütüldü. Katman sırası: zemin → platform → yansıma (%10, aracın %32 yüksekliğinde solan, 3 px bulanık) → ambiyans gölgesi (çarpma, %78) + temas gölgesi (tekerlek ve en alt noktalar, çarpma) → araç (yalnız alfa).
5. **Kanıt:** sonuç ile **orijinal ilan fotoğrafı** tam opak piksellerde karşılaştırıldı.

| Araç | Tam opak piksel | Orijinalle en büyük renk farkı |
|---|---|---|
| Mercedes S 560 | 750.502 | **0** |
| Porsche Panamera | 657.465 | **0** |
| Audi Q3 | 447.560 | **0** |

[DOĞRULANDI: `kod/showroom.py` → `proof_untouched()`]

## Zemin hakkında dürüst not

Brif tek bir boş showroom zemininin fal.ai ile üretilmesine izin veriyordu (en fazla 3 deneme, en fazla 1 USD). **Bu oturumda fal.ai anahtarı (FAL_KEY) bulunmadığı için fal.ai çağrısı yapılmadı; harcanan tutar 0 USD.** Deneme, kodla çizilmiş geçici bir karanlık oda ve platformla yapıldı (yapay zekâ yok). Bu zemin fotoğraf gerçekçiliğinde değil; kenar, gölge ve yansıma tekniğini değerlendirmek için yeterli, odanın gerçekçiliğini değerlendirmek için yeterli değil. fal.ai için hazır istem `docs/GORSEL-PLANI.md` §1'de; `kod/showroom.py` herhangi bir zemin görseliyle çalışır (`python showroom.py zemin.jpg cikti/ arac.png`).

## %200 kenar kontrolü

| Bölge | S 560 (siyah) | Panamera (beyaz) | Q3 (beyaz, dış mekân) |
|---|---|---|---|
| **Ayna** | Temiz; hale yok | Temiz; beyaz kenarda açık renk taşması yok | Temiz |
| **Anten / tavan** | Tavan kenarı temiz. Tavan camında eski showroom'un mavi "MEGA CARS" neon yansıması kalıyor (aracın pikseli) | Aynı neon yansıması tavan camında kalıyor | Tavan rayı ve anten temiz |
| **Jant** | Kollar arası doğru ayrılmış; lastik tabanı temiz | **Sorun:** jantın bir boşluğunda eski zeminin açık gri parçası kalmış | Temiz |
| **Cam** | A direği kenarı temiz; camdan görünen iç mekân kalıyor | Ön camdan eski showroom'un mavi tabelası görünüyor | Yan camlardan eski bina seçiliyor; camdaki yağmur damlaları korunmuş |

## Değerlendirme

- **Kenar kalitesi: çok iyi.** BiRefNet ince yapıları (ayna kolu, tavan rayı, A direği) %200'de bile temiz ayırıyor; siyah araçta da beyaz araçta da hale yok. [DOĞRULANDI: `kenar-200/`]
- **Asıl sınır ayırma değil, ışık ve perspektif.** Kapak fotoğrafları diz hizasından ve geniş açıyla çekilmiş; platformun perspektifiyle tam uyuşmuyor. Araç biraz "stüdyoya yapıştırılmış" duruyor. Aracın kendi ışığı (eski showroom'un tavan ışıkları, mavi LED yansımaları, dış mekânın bulutlu ışığı) yeni odayla çelişiyor ve pikselleri değiştirmediğimiz için düzeltilemez. Beyaz araçlar karanlık odada fazla parlak kalıyor. [DOĞRULANDI: görsel değerlendirme]
- **Liste kartı ve öne çıkanlar şeridi için:** küçük boyutta kabul edilebilir; zemin fotogerçekçi olursa daha iyi durur. Jant boşluğu ya da camda belirgin sorun olan araçta orijinal fotoğraf kullanılır (DESIGN.md §5.2).
- **360 sahnesi için:** gerçekçilik ancak kontrollü yeni çekimle gelir: sabit kamera yüksekliği (≈ 1,2 m), sabit mesafe, kapalı hava ya da gölge, sade arka plan (bkz. `docs/360-CEKIM-REHBERI.md`). Oda zemini de aynı kamera yüksekliğine göre üretilmelidir.

## Volkan'a sorular
1. Camdan görünen eski arka plan (kural gereği) kalsın mı?
2. Kenarlardaki eski arka plan rengini temizlemek "araç pikseline dokunmak" sayılır mı? (Bu denemede temizlik yapılmadı.)
3. Zemin fal.ai ile üretilsin mi? (Bunun için bir FAL_KEY gerekiyor.)
