# Product

> Kaynak: `docs/BRIEF.md` (Volkan, 22.10.2026). Bu dosya impeccable tasarım akışının stratejik bağlam dosyasıdır; brifle çelişirse brif geçerlidir.

## Register

brand

## Users

- Mercedes-Benz, BMW, Audi ya da Porsche'den orta-üst segment ikinci el araç arayan alıcılar (brif). Bölge ve yaş aralığı [VARSAYIM]: Vorarlberg, Bodensee çevresi ve İsviçre sınırı; 30–60 yaş. Fiyat bandı repodaki Haziran 2026 verisine göre 23.900–64.900 € (güncel stok doğrulanamadı, bkz. `docs/ARASTIRMA.md`).
- Bağlam [VARSAYIM]: akşam kanepede telefondan ilan karşılaştırıyor, ertesi gün iş arasında masaüstünden ayrıntıya bakıyor. Temkinli; galeriye güvenip güvenemeyeceğini tartıyor.
- Yapmak istediği üç iş: stoktaki aracı bulmak, aracı ayrıntılı incelemek, tek dokunuşla iletişime geçmek (Anrufen / WhatsApp / Probefahrt / Finanzierung / Inzahlungnahme).
- Diller: Almanca (varsayılan), İngilizce, Türkçe.

## Product Purpose

Mega Cars'ın gerçek stoğunu, her aracın kendi fotoğraflarıyla, dürüst ve sinematik bir vitrinde göstermek; ziyaretçiyi en kısa yoldan telefona, WhatsApp'a ya da randevuya taşımak. Başarı ölçütü: ilan başına daha çok doğrudan iletişim ve "bu galeri ciddi" izlenimi. İmza özellik: araç sayfasında, gerçek video karelerinden yapılmış ve döner platformda duran 360° showroom.

## Brand Personality

- Üç kelime: **sakin, kesin, dürüst**.
- Ses: kendinden emin ama gösterişsiz bir Alman otomotiv satıcısı; abartı, ünlem ve pazarlama süsü yok. Her rakam gerçek, her fotoğraf aracın kendisi.
- Duygu hedefi: teslim alma anının sessiz güveni. Kamera ile çekilmiş film hissi; ulaşılabilir lüks.
- Referans tonu: bugatti.com (sinematik koyu sahne), porsche.com (sakin hiyerarşi, kısa başlık), apple.com (boşluk ve ürün odağı), studiofreight.com ve locomotive.ca (hareket işçiliği).

## Anti-references

- Need for Speed tarzı neon garaj, oyun/CGI hissi, 3D araba modeli.
- Dribbble ve jenerik Behance otomotiv şablonları; parlayan düğmeler, aurora, parçacık, glitch, dönen kart.
- Klasik ilan sitesi yoğunluğu (AutoScout24/mobile.de ızgarası), indirim etiketi gibi renkli fiyatlar.
- Sahte güven ögeleri: uydurma yorum, uydurma garanti, uydurma kuruluş yılı, uydurma sayılar.
- Eski v1 sitenin kendisi: her yerde büyük harf geniş başlık, doygun Tesla mavisi, stokta olmayan yapay zekâ arabası.

## Design Principles

1. **Araç sahnenin tek yıldızıdır.** Arayüz geri çekilir; fotoğraf ve showroom önde durur.
2. **Gerçeklik pazarlıksızdır.** Bilinmeyen bilgi gösterilmez; aracın pikseline dokunulmaz; eksik açı doldurulmaz.
3. **Her ekranda bir sonraki adım bellidir.** Ara, yaz, randevu al: her zaman bir dokunuş uzaklıkta.
4. **Hareket kameradır, oyuncak değil.** Yavaş dolly, geri çekilme, platformun ağır dönüşü; zıplama ve yaylanma yok.
5. **Önce telefon.** Akşam kanepede tek elle kullanılabilirlik, masaüstünden önce gelir.

## Accessibility & Inclusion

- WCAG 2.2 AA: metin kontrastı ≥ 4.5:1, büyük metin ve arayüz sınırları ≥ 3:1.
- Bütün düğmelerde ve yalnız ikonlu bağlantılarda aria-label; tam klavye gezintisi; görünür odak halkası.
- `prefers-reduced-motion: reduce` açıkken bütün animasyonlar kapanır ya da anlık geçişe döner; 360 platform kendiliğinden dönmez.
- Üç dilde tam ve yüklemli cümleler; makine çevirisi yok.
