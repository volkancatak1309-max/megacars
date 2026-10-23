# MEGACARS V2 — PROJE BRİFİ

> Kaynak: Volkan'ın 22.10.2026 tarihli FAZ 1 + FAZ 2 talimatı. Aynı gün ikinci talimatla (showroom yöntemi, künye, stok, kapak fotoğrafları, dönme kuralı, Wow 3) güncellendi; değişen cümleler Volkan'ın kararlarıdır, kaynak: `docs/KARAR-DEFTERI.md`.
> 22.10.2026 (üçüncü güncelleme): FAZ 4A'nın görsel tasarımı Volkan tarafından reddedildi; "Die Übergabe" konsepti iptal. Görsel dil ve hareket kuralları aşağıdaki GÖRSEL DİL bölümüyle değişti; altyapı (Next.js, diller, veri, sayfa yapısı, filtreler, 360 bileşeni) korunur.
> Sonraki bütün fazlarda işe başlamadan önce bu dosya okunur.

━━━ PROJE BRİFİ ━━━

MÜŞTERİ
- Mega Cars — ikinci el araç galerisi. Adres: Radetzkystraße 80, 6845 Hohenems, Vorarlberg, Avusturya. Kendi alan adı: megacars.at (şu an bozuk bir WordPress şablonu).
- Sahibi: Murat Demir. Firmenbuch kaydı: "Mega Cars Murat Demir e.U.", FN 447871 i, Landesgericht Feldkirch (kaynak: firmeneintrag.creditreform.de). Bazı dizinlerde "Mega Cars OG" geçiyor; Impressum Firmenbuch kaydına göre yazılır. UID bilinmiyor.
- Ana telefon: +43 660 6877002 (kaynak: galerinin Facebook sayfası facebook.com/Autohaus.MegaCars, AutoScout24 kaydındaki "Demir Murat" iletişim bilgisi, OpenStreetMap). İkinci numara: +43 660 6969496 (Firmenbuch dizinleri: creditreform, firmenabc, herold).
- E-posta: megacars@live.at (Facebook, firmenabc, herold, OpenStreetMap).
- Açılış saatleri: Pazartesi–Cuma 08:00–18:00, Cumartesi 09:00–15:00, Pazar kapalı (Cylex, OpenStreetMap). Öğle arası kaynaklar arasında farklı; teyit edilecek.
- Eski sitedeki office@meral.at ve +43 660 1999472 galeriye ait DEĞİL; yeni sitede hiçbir yerde kullanılmaz. WhatsApp bağlantısı wa.me/436606877002 olur (numaranın WhatsApp'ta açık olduğu teyit edilecek).
- Galerinin AutoScout24 profil metninde "seit 2002" yazıyor; Firmenbuch'taki e.U. kaydı 02.02.2016 tarihli. "Seit 2002" sitede yalnız sahibi teyit ederse kullanılır.
- Stok yalnız premium değil: geçmiş AutoScout24 kaydında 3.900 €'luk Renault Kangoo ve 12.900 €'luk Ford Kuga'dan 64.900 €'luk Mercedes S 560'a kadar geniş bir fiyat aralığı vardı. Facebook sloganı: "Autos zu Top Preisen. Auch für die kleine Geldtasche." Site premium görünür, ama bütçe arayan ziyaretçiyi dışlayan dil ve filtre kullanılmaz; fiyat filtresi en düşük fiyattan başlar.
- Bugün AutoScout24'te ve galerinin Facebook'ta verdiği gebrauchtwagen.at sayfasında (cid=9564827) Mega Cars ilanı yok. Güncel stok kaynağı Gökhan'dan öğrenilecek.
- Demo sürümünde son bilinen gerçek stok (Haziran 2026, 18 araç) kullanılır; site canlıya çıkana kadar noindex kalır; canlıya çıkmadan önce güncel stoka geçilir.

HEDEF
- Eski siteyi sıfırdan, Awwwards seviyesinde (10 üzerinden en az 9) yeniden kurmak.
- Ziyaretçi üç şeyi zahmetsizce yapabilmeli: stoktaki aracı bulmak, aracı ayrıntılı incelemek, tek dokunuşla iletişime geçmek (Anrufen / WhatsApp / Probefahrt / Finanzierung / Inzahlungnahme talebi).
- Site sade ve kullanıcı dostu olacak; karmaşık olmayacak.
- Hedef seviye: Awwwards Site of the Day. Her ekran "bu bir ödül sitesi" dedirtmeli; standart galeri şablonu hissi başarısızlık sayılır. Site, sırf Awwwards'ta ödül almak için yapılmış gibi görsel olarak tatmin edici olmalı; galerinin sahibi sitesini görünce gurur duymalı. Galerinin gerçek fiyat seviyesine yabancılaşmaz (ulaşılabilir lüks).

GÖRSEL DİL (Volkan, 22.10.2026; ayrıntı: docs/KARAR-DEFTERI.md)
- Renk: Canlı kırmızı ana vurgu rengidir (#E10600 ya da #D7141A çevresinde; düz renk, neon ışıltısı yok). Site simsiyah olmaz: bölümler arasında siyah, kırık beyaz/kemik rengi ve kırmızı ile ritim kurulur. Kontrast WCAG AA ile kanıtlanır (siyah zemin üstünde küçük kırmızı yazı yok; kırmızı zemin üstünde beyaz yazı).
- Tipografi: karakterli, büyük, iddialı bir başlık fontu (geniş ya da sıkışık grotesk, ya da grotesk + serif eşleşmesi). Yalnız ticari kullanıma açık lisanslı fontlar (OFL ya da Fontshare); lisans yazılır.
- Kaydırma her zaman sayfayı aşağı götürür: yatay kaydırma YOK; sayfayı kilitleyen uzun sabitleme (pin) YOK — bir bölüm en fazla bir ekran boyu sabit kalabilir.
- Kepenk hover: galzura.com'daki düğme hover efekti (kaynak: galzura-motion-demo deposu ve canlı galzura.com) aynı kalitede ve kırmızı renkle bütün düğmelere ve menü linklerine uygulanır: imleç üzerine gelince renk paneli kepenk gibi iner ve yazı yuvarlanarak değişir; imleç çıkınca kepenk yukarı toplanır.
- Hareket dili: her bölümde en az bir etkileyici hareket; bounce/spring/elastic yok, 0,3 sn'den hızlı animasyon yok. Kullanılacaklar: logolu sinematik açılış ekranı (sayaç yok; yalnız ilk ziyarette; ekranı kaplar — Volkan 23.10.2026); sayfa geçişlerinde kırmızı perde (curtain) geçişi; başlıklarda maskeli / split-text açılış; görsellerde clip-path ile açılan reveal'lar; slaytlarda perde ya da maske ile premium geçişler (sıradan kaydırma değil); manyetik CTA; gerçek veriden sayı sayaçları; ince grain dokusu. Özel imleç (fare okunun yerine çıkan nokta/halka ya da yazılı imleç) YASAK — Volkan'ın bütün projeler için kuralı (23.10.2026).
- Logo (Volkan, 23.10.2026): amblem + "MEGA CARS" logotype; üç konsept /de/prototyp/logo'da (A Monogramm uygulandı ve önerilir, B Plakette, C Wappen); seçili konsept `lib/launch.ts` → `LOGO_CONCEPT`. Galerinin adı "MEGA CARS" aynen kalır; logo galeriye bir öneridir. Hiçbir otomobil markasının logosuna benzemez.
- Bileşen kaynakları: Animmaster kütüphanesinden (300 Awwwards components) seçilen bileşenler zip'ten gerçekten çıkarılıp kullanılır; Mobbin'den header, mobil menü, araç kartı, filtre, araç detay ve sabit iletişim çubuğu için en az 6 ekran örneği alınır ve neyin nereden alındığı yazılır; referans: Awwwards otomotiv kategorisindeki ödüllü siteler ve galzura.com'un hareket kalitesi (hasib.site çizgisi).
- Fotoğraf: gerçek araç fotoğrafları 1440 px genişliğinde; 1440 px'ten büyük, bulanık tam ekran fotoğraf yok. Tam ekran alanlarda video ya da tipografi kullanılır; fotoğraflar çerçeveli ve keskin durur.
- Mobil birinci sınıf: her efektin mobil karşılığı tasarlanır; mobilde de premium his korunur.

SHOWROOM (360°) — SİTENİN İMZA ÖZELLİĞİ (Volkan'ın isteği, 22.10.2026)
- Ziyaretçi bir araç sayfasına girdiğinde araç, kendi gerçek zemininin oluşturduğu sahnede durur ve yavaşça döner. Ziyaretçi fareyle ya da parmağıyla sürükleyerek aracı çepeçevre, istediği açıdan inceler.
- Dönme kuralı: Detay sayfası açılınca araç, üstten bakıldığında saat yönünde ve yavaş döner (1 tam tur ≈ 40 sn; hız ve yön tek ayardan değişir). Ziyaretçi sürükleyince araç fareyi ya da parmağı takip eder; bırakınca ataletle yumuşakça durur; 3 sn dokunulmazsa yine yavaşça dönmeye başlar. prefers-reduced-motion açıkken kendiliğinden dönme kapalıdır. Tek açılı ilan fotoğrafları döndürülmez. Yakınlaştırma Ctrl/⌘ + fare tekerleğiyle ya da iki parmakla yapılır. Düz fare tekerleği yalnız tam ekranda yakınlaştırır; normal sayfada sayfayı kaydırır. Tam ekran vardır.
- Yöntem: 3D model DEĞİL. Her aracın etrafında dönülerek çekilmiş gerçek video karelerinden 360° döndürme (spin) yapılır:
  · 72 kare, araç merkezi etrafında eşit açı adımlarıyla seçilir (hedef 72 kare = 5°, en az 36 kare).
  · Ölçek kuralı: Döner platform taklidinde araç kendi merkezi etrafında döner, kamera sabittir; aracın yandan geniş, önden dar görünmesi doğaldır. Kareler, COLMAP'ten gelen "kamera – araç merkezi" uzaklığına göre ölçeklenir; kamera yüksekliği ve ufuk çizgisi sabitlenir. Aracın kutu boyutunu (bounding box) her karede eşitleyen ölçekleme YASAK: bu, aracın dönerken büyüyüp küçülüyormuş gibi görünmesine yol açar.
  · Araç, altındaki gerçek zemin ve gerçek gölgesi korunur; yalnız arka plandaki duvarlar ve uzak çevre dikişsiz bir fonla değiştirilir. Camdan görünen arka plan da yeni fona uyarlanır; aracın gövdesine, rengine ve çiziğine dokunulmaz.
  · Fon görünümü (açık stüdyo, karanlık salon ya da ince platform kenarlı karanlık salon) 360° denemesinin sonucuna göre Volkan tarafından seçilir; platform kenarı yalnız gerçekçi duruyorsa kullanılır.
- Showroom havası: NFS tarzı neon garaj DEĞİL. Fotoğraf gibi gerçekçi; oyun ya da CGI hissi yok.
- Dürüstlük: Aracın gövdesine, rengine ve çiziğine dokunulmaz (renk, parlaklık, çizik ve hasar rötuşu yok); yalnız duvarlar, uzak çevre ve camdan görünen arka plan değişir. Orijinal ilan fotoğrafları sayfada ayrıca gösterilir. Eksik açılar yapay zekâyla ASLA doldurulmaz.
- Kaynak: Mega Cars'ta birinin her araç için telefonla aracın etrafında yürüyerek çektiği tam tur videosu. Önce tek araçla deneme çekimi yapılır; boru hattının sonucu Volkan tarafından onaylanınca kalan araçlar çekilir. Site yapımı bu videoları beklemez.
- Videosu olmayan araç: Detay sayfasında premium fotoğraf galerisi görünür; boş showroom alanı ya da "yakında" yer tutucusu görünmez. Spin verisi eklendiği anda o aracın showroom'u kendiliğinden açılır.
- Kapak fotoğrafları: İlan fotoğraflarında arka plan değiştirme İPTAL. Kartlarda, öne çıkanlar şeridinde ve detay sayfasında Mega Cars'ın kendi showroom'unda çekilmiş orijinal fotoğraflar kullanılır; yalnız oran ve kırpma tek tip yapılır; mümkünse showroom içinde çekilmiş açı kapak seçilir.
- Teknik: Hafif, özel bir canvas görüntüleyici kullanılır (Three.js yok). İlk kare önce yüklenir (detay sayfasının LCP öğesi); kalan kareler kademeli olarak ve görüntüleyici ekrana girince yüklenir. Mobilde yatay sürükleme aracı döndürür, dikey kaydırma sayfayı kaydırır (sayfa kilitlenmez). Klavye için ← → düğmeleri ve aria-label bulunur; prefers-reduced-motion açıkken kendiliğinden dönme kapalıdır.

TEKNİK KARARLAR
- Next.js (güncel kararlı sürüm, App Router) + TypeScript + Tailwind + GSAP (ScrollTrigger, SplitText) + Lenis. Eski Vite + hash router yapısı terk ediliyor: her araç sayfası ayrı adresle Google'da indekslenmeli.
- Diller: Almanca (varsayılan, /de), İngilizce (/en), Türkçe (/tr). İlk girişte tarayıcı diline göre otomatik seçim; üstte dil seçici. Çeviriler uzman tercüman seviyesinde olacak; makine çevirisi kokan tek cümle olmayacak. Müşteriye görünen her cümle (başlıklar dahil) yüklemli ve tam olacak; yarım ya da devrik cümle olmayacak.
- Envanter: tek kaynak dosya (data/inventory.json) + tekrar çalıştırılabilir içe aktarma betiği. Her araç yalnız kendi ilanının fotoğraflarıyla gösterilir; satılmış ya da eski araç gösterilmez. Her araç kaydında isteğe bağlı bir 360 showroom alanı bulunur. Yapı, ileride günlük otomatik stok güncellemesi eklenebilecek şekilde kurulacak.
- Çalışma dalı: v2. Yayın yalnız GitHub push → Vercel otomatik derleme ile olur; Vercel CLI ile elle deploy YASAK. Vercel proje ayarlarını değiştirme; Next.js önizleme derlemesi gerekirse dal içindeki vercel.json ile ayarlanır. Tek istisna (Volkan onayı, 22.10.2026): "megacars" projesinde Vercel Authentication koruması kapatıldı; önizleme telefondan ve paylaşılan linkten girişsiz açılır, noindex korunur.
- Görseller: WebP, 1600w masaüstü + 800w mobil srcset, bulanık yer tutucu (blur-up), tembel yükleme. /cars, /hero ve /spin altındaki dosyalar için 1 yıl immutable önbellek başlığı.
- Commit mesajları anlamlı olur: feat:, fix:, perf:, a11y:, docs:.
- Volkan yazılımcı değil: ondan yalnız zorunlu onay istenir; Vercel dahil bütün teknik işleri CC yapar. Raporlar kısa Türkçe ve [DOĞRULANDI]+kaynak / [VARSAYIM] / [BİLMİYORUM] etiketli olur.

KESİN YASAKLAR
- Uydurma veri yok: sahte yorum, sahte faiz oranı, sahte kuruluş yılı, sahte garanti, sahte sayı yok. Bilinmeyen bilgi sitede gösterilmez.
- Çizgi film / yapay zekâ kokusu yok: bounce, spring, elastic easing yok; 0,3 sn'den hızlı animasyon yok; easing power3.out veya cubic-bezier(0.25,0.1,0.25,1). Neon, aurora, parçacık, konfeti, glitch, retro ızgara, dönen kart, dönen kenarlık, parlayan buton, dönen dünya yok. Çizgi film veya illüstrasyon ikon yok (lucide gibi ince çizgi ikon olur).
- Aceternity / Magic UI'dan yalnız şunlar kullanılabilir: Spotlight, TracingBeam, ParallaxScroll, StickyScrollReveal, TextGenerateEffect (yavaş), BorderBeam (çok hafif), NumberTicker, Marquee, InfiniteMovingCards (gri tonlu), BentoGrid, CardHoverEffect (scale 1.02, parıltı yok). AuroraBackground, Meteors, Particles, AnimatedGridPattern, RetroGrid, ShimmerButton, MovingBorder, Globe, HeroHighlight YASAK.
- 3D araba modeli yok: hazır ya da jenerik GLB, ilkel geometriden model ve yapay zekâyla fotoğraftan üretilmiş 3D model YASAK — galerinin kendi aracı olmaz ve oyun gibi görünür. Showroom yalnız gerçek fotoğraflarla yapılır.
- Yapay zekâ ile araba görseli üretilip stok aracı gibi gösterilmez. Araç fotoğraflarına renk filtresi, renkli katman ya da vurgu rengi uygulanmaz; vurgu rengi yalnız arayüzde kullanılır.
- Volkan'ın daha önce reddettiği iki efekt kullanılmaz: imleci izleyen küçük görsel önizleme (image trail / hover preview) ve kaydırdıkça kare kare oynayan açılış (frame-scrub scroll sequence).
- Yatay kaydırma ve sayfayı bir ekran boyundan uzun kilitleyen sabitleme (pin) yok (Volkan, 22.10.2026: "aşağı kaydırırken sayfa sağa kayıyor").
- Açılış başlığı okunamayacak hızda geçmez.

HAREKET VE WOW ANLARI
- Her bölümde en az bir anlamlı hareket olur; tek başına düz fade-in yetmez.
- Wow 1 — Açılış: seçilecek tasarım yönüne göre (prototip A slayt gösterisi / B dergi kapağı / C dev harflerin içinden video). Tam ekran alanda yalnız video ya da tipografi; başlık maskeli/split-text, okunur hızda açılır. LCP öğesi gecikmez.
- Wow 2 — Öne çıkan araçlar: DİKEY bölüm (yatay şerit kaldırıldı, Volkan 22.10.2026). Kart hover'ında fotoğraf kendi çerçevesinde büyür ve kırmızı çizgi çizilir (özel imleç yok, 23.10.2026); fotoğraflar clip-path ile açılır.
- Wow 3 — Kart → detay: karttan araç detayına kırmızı perde (curtain) geçişi (Volkan, 22.10.2026); aracın 360° verisi varsa detayda showroom sahnesi açılır ve dönmeye başlar.
- Wow 4 — 360° showroom: yukarıdaki SHOWROOM bölümü.
- Ek hareketler: bütün düğme ve menü linklerinde kırmızı kepenk hover; CTA'larda manyetik hover (tıklamada 0.98, WCAG AA odak halkası); masaüstünde Lenis yumuşak kaydırma (dokunmatikte doğal kaydırma); yalnız ilk ziyarette logolu sinematik açılış ekranı (Volkan 23.10.2026: sayaç kaldırıldı, ekran kaplanır; mobil LCP < 3 sn hedefi bu proje için askıda); gerçek veriden sayı sayaçları; ince grain dokusu.

SAYFA İSKELETİ (SADE)
- Sayfalar: Startseite · Fahrzeuge (liste + filtre + sıralama) · Fahrzeug-Detail · Finanzierung · Ankauf/Inzahlungnahme · Kontakt & Über uns · Impressum · Datenschutz.
- Önce mobil tasarlanır.
- Startseite'de açılışın hemen altında üç alanlı hızlı arama olur (Marke · Preis bis · Karosserie) ve canlı sonuç sayısını gösteren bir düğme bulunur ("24 Fahrzeuge anzeigen" gibi; sayı gerçek veriden gelir).
- Detay sayfası: En üstte showroom bulunur (spin verisi yoksa büyük galeri). Fiyat ve altı temel bilgi (Erstzulassung, Kilometerstand, Leistung, Kraftstoff, Getriebe, Karosserie) ilk ekranda görünür. Altında orijinal ilan fotoğrafları, donanım listesi ve benzer araçlar yer alır.
- Mobilde altta sabit eylem çubuğu olur (Anrufen · WhatsApp · Probefahrt). Yüzen WhatsApp ve en üste çık düğmesi alelade olmaz, siteyle uyumlu olur.
- WhatsApp mesajı araç adı, fiyat ve sayfa linkiyle hazır dolu gider.
- Formlarda sahte "gönderildi" ekranı olmaz; gönderimin nereye gittiği gerçek ve belli olur.
- Footer'da küçük bir "Website: Galzura" bağlantısı (galzura.com) olur.

KALİTE EŞİĞİ (teslimden önce kanıtlanır)
- Lighthouse mobil Performans ≥ 80, masaüstü ≥ 85; LCP < 3,0 sn (mobil); CLS < 0,1; INP < 200 ms; ilk yükte JS < 300 KB (gzip). Volkan (23.10.2026): mobilde "3 sn içinde görünme" hedefi bu proje için askıya alındı; açılış ekranı kalır.
- Erişilebilirlik: bütün butonlarda ve yalnız ikonlu linklerde aria-label; kontrast ≥ 4.5:1; klavyeyle tam gezinme; prefers-reduced-motion açıkken animasyonlar kapanır.
- SEO: robots.txt, sitemap.xml (hreflang'li), her sayfada generateMetadata (title, description, OG, Twitter), JSON-LD (AutoDealer; her araç için Car + Offer; BreadcrumbList), mutlak adresli OG görseli + yedeği. Demo sürümü canlıya çıkana kadar noindex kalır.
- Production derlemesinde konsol hatası ve uyarısı 0.
- Referans tonu: Awwwards otomotiv kategorisindeki ödüllü siteler, galzura.com'un hareket kalitesi (hasib.site çizgisi), bugatti.com, porsche.com, studiofreight.com, locomotive.ca. Dribbble ve jenerik Behance işleri referans alınmaz.
- Çizgi film testi: her bileşen için "Bu, porsche.com'da ya da apple.com'da olur mu?" sorusu sorulur; cevap hayırsa bileşen kullanılmaz.
