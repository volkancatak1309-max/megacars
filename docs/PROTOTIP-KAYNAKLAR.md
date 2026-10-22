# Prototip A / B / C — kaynaklar ve kalite kapısı (22.10.2026)

Adresler: `/de/prototyp` (karşılaştırma), `/de/prototyp/a`, `/b`, `/c`; Türkçe: `/tr/prototip/...`.
Üçü de aynı 18 aracın verisini kullanır (`components/proto/data.ts`), noindex.

## Kepenk (galzura) hover
- Kaynak: `C:\Users\90553\Desktop\galzura-motion-demo\src\d6\Roll.tsx` + `src\d6\d6.css`
  (`.R`, `.R-face`, `.R-btn`; `useMagnet`). Canlı galzura.com stil dosyasıyla aynı (22.10.2026 kontrol).
- Uyarlama: `components/proto/Shutter.tsx` (yüzler + mıknatıs) ve `components/proto/proto.css`
  (`.sh` kırmızı `::before` paneli yukarıdan iner, yazı yuvarlanır, çıkışta panel yukarı katlanır).

## Animmaster (300 Awwwards components)
Kaynak: `C:\Users\90553\Downloads\300 Awwwards components.zip` → `Awwwards Pack/…/code.zip`, içinden çıkarılıp uyarlandı.

| Bileşen | Nerede |
|---|---|
| Hero Animations 9 / 18 (sayaç 0→100 + çubuk) | `Loader.tsx`, `.ploader` (ilk ziyaret, CSS; LCP'yi bekletmez) |
| Hero Animations 26 (harfler dağınık sırayla yükselir) | `Chars` → B kapak başlığı |
| Page Transitions 5 (iki satırlı perde, karşı kayma) | `Curtain.tsx` kırmızı perde; detay galerisi açılışı |
| Text Animations 15 (Lando Norris blok süpürme) | `Reveals.tsx` `BlockReveal` → A ve C giriş metni |
| Text Animations 17 (maskeli satırlar) | `Reveals.tsx` `LinesUp` |
| Sliders 19 (modüler slider, iki bant) | `RossoHero.tsx` (A hero) |
| Navigation Menus 19 (clip-path düşüş, satırlar yükselir) | `ProtoHeader.tsx` mobil menü |
| Mouse Effect 13 (takip eden imleç) | `Chrome.tsx` "Ansehen" imleci (önizlemesiz) |
| Scroll Animation 41 (çerçeve alt kenardan açılır) | `Reveals.tsx` `ClipReveal` → A satırları, C kartları |

## Mobbin örnekleri (Mobbin MCP, 22.10.2026)
| Parça | Örnek | Ne alındı |
|---|---|---|
| Header | ZARA (web) https://mobbin.com/screens/5330ba4b-e910-48bf-ad42-1dcaa06546ed | yalnız metin gezinme, logo solda |
| Header | GetYourGuide (web) https://mobbin.com/screens/82e223df-d397-4939-982e-2258ffc41709 | sağda dil + iletişim kümesi |
| Mobil menü | Open (iOS) https://mobbin.com/screens/a1869a59-77fb-4ff5-8149-527f1fb06747 | siyah tam ekran, çok büyük bağlantılar (A, C) |
| Mobil menü | ZARA (iOS) https://mobbin.com/screens/fab9fd81-4397-423b-a03a-0c5c778c92fa | serif büyük liste (B) |
| Araç kartı | Turo (iOS) https://mobbin.com/screens/8e949346-74a7-480d-9eac-5f9bfbdd77d2 | büyük foto, altında model + fiyat + kısa bilgi |
| Araç detay | Turo (web) https://mobbin.com/screens/bda7a271-139d-4c9a-a8ff-4bdbb7e7a79d | ana foto + iki küçük foto + "tüm fotoğraflar" |
| Sabit iletişim çubuğu | Redfin (iOS) https://mobbin.com/screens/faaf793b-e8ae-4a40-a505-8e9b16386208 | tek dolu CTA + ikincil eylem (mobil `.pd-bar`) |
| Filtre | Airbnb (iOS) https://mobbin.com/screens/7f04f4bf-bdfd-4dcd-ad10-2b4225a08b7f | canlı sonuç sayılı alt panel (gerçek `/fahrzeuge`; prototipler oraya bağlanır) |

## Yazı tipleri (hepsi SIL Open Font License 1.1, Google Fonts / next/font)
- A Rosso: Archivo (genişlik ekseni, başlıklar `wdth 62`, 900).
- B Atelier: Instrument Serif + Instrument Sans.
- C Nachtfahrt: Unbounded + Hanken Grotesk.

## Kalite kapısı sonuçları
- Yatay taşma: 13 sayfa × 390 / 1440 / 2560 → 0 (iframe taraması). Detay galerisinde mobil taşma bulundu ve düzeltildi (`minmax(0,1fr)`).
- Konsol: 0 hata / uyarı. Azaltılmış hareket: çalışan animasyon 0, yükleyici / grain / video kapalı, A otomatik oynatmaz.
- Ekran görüntüleri ve kayıtlar (yerel, repo dışı): oturum scratchpad'i `qa/` klasörü
  (`a|b|c-1440`, `a|b|c-2560`, `side-by-side.jpg`, `a|b|c-rec.mp4`).
- Yan yana: S-2K (s-2k.webflow.io, Awwwards) ve Artificial Garage (artificial-garage.com, Awwwards).
- Bulunup düzeltilenler: A'da model adı animasyonu satır içi `span` yüzünden hiç oynamıyordu (eski/yeni ad üst üste); uzun adlar (PANAMERA) fotoğrafın altına taşıyordu (artık ölçülmüş harf genişliğiyle boyutlanıyor); C'de Unbounded harfleri %39'a sıkıştırılmıştı (artık doğal oranında, iki satır) ve yakınlaşma boşluğa gidiyordu (artık E harfinin içine).

## "Standart galeri şablonu mu?" — dürüst cevap
- Açılış ekranları değil: A dev model adı + kırmızı bantlı slayt, B dergi kapağı + içindekiler, C harflerin içinde film.
- Zayıf yanlar: detay sayfası üç yönde aynı iskelet (yalnız yazı tipi / renk değişiyor); fotoğrafların hepsi aynı showroom fonunda, Awwwards örneklerindeki sinematik çekimlerin yerini tutmuyor; WebGL yok.
- Karikatür testi: tek düz kırmızı, oyuncak şekil yok; en yumuşak öğe B'nin hap düğmeleri. Geçti.
