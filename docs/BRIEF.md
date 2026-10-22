# MEGACARS V2 — PROJE BRİFİ

> Kaynak: Volkan'ın 22.10.2026 tarihli FAZ 1 + FAZ 2 talimatı. Aşağıdaki bölüm değiştirilmeden aktarılmıştır.
> Sonraki bütün fazlarda işe başlamadan önce bu dosya okunur.

━━━ PROJE BRİFİ ━━━

MÜŞTERİ
- Mega Cars — premium ikinci el araç galerisi. Adres: Radetzkystraße 80, 6845 Hohenems, Vorarlberg, Avusturya. Telefon: +43 660 1999472 (ikinci galeri numarası +43 660 6969496 — doğrulanacak). E-posta: office@meral.at. WhatsApp: wa.me/436601999472. AutoScout24 bayi profili: autoscout24.at/haendler/mega-cars. Kendi alan adı: megacars.at (şu an bozuk bir WordPress şablonu).
- Stok ağırlıklı Mercedes-Benz, BMW, Audi ve Porsche; orta-üst segment ikinci el.

HEDEF
- Eski siteyi sıfırdan, Awwwards seviyesinde (10 üzerinden en az 9) yeniden kurmak.
- Ziyaretçi üç şeyi zahmetsizce yapabilmeli: stoktaki aracı bulmak, aracı ayrıntılı incelemek, tek dokunuşla iletişime geçmek (Anrufen / WhatsApp / Probefahrt / Finanzierung / Inzahlungnahme talebi).
- Site sade ve kullanıcı dostu olacak; karmaşık olmayacak.
- Ton: sakin, kendinden emin premium Alman otomotiv; kamera ile çekilmiş film hissi. bugatti.com ve porsche.com yanına konduğunda aynı işçilikte durmalı, ama galerinin gerçek fiyat seviyesine yabancılaşmamalı (ulaşılabilir lüks).

SHOWROOM (360°) — SİTENİN İMZA ÖZELLİĞİ (Volkan'ın isteği, 22.10.2026)
- Ziyaretçi bir araç sayfasına girdiğinde araç, showroom'daki döner bir platformun üstünde durur ve platformla birlikte yavaşça döner. Ziyaretçi fareyle ya da parmağıyla sürükleyerek aracı çepeçevre, istediği açıdan inceler.
- Hareket dinamiktir: sürükleyip bırakınca araç ataletle yumuşakça yavaşlayıp durur; birkaç saniye dokunulmazsa platform yavaşça kendiliğinden dönmeye devam eder; yakınlaştırma (fare tekerleği ve iki parmak) ve tam ekran vardır.
- Yöntem: 3D model DEĞİL. Her aracın etrafında dönülerek çekilmiş gerçek video karelerinden 360° döndürme (spin) yapılır:
  · Kareler eşit açı adımlarıyla seçilir (hedef 72 kare = 5°, en az 36 kare).
  · Araç her karede aynı boyut ve konumda ortalanır; zıplama ve kayma olmaz.
  · Araç, zaman içinde titremeyen tutarlı bir maskeyle arka plandan ayrılır ve her karede aynı sanal showroom platformunun üstüne yerleştirilir.
  · Platform her karede aracın açısına göre döner (platform kenarındaki ince çizgiler ve, gerçekçi duruyorsa, kenara oyulmuş "MEGA CARS" yazısı dönüşü belli eder); ışıklar sabit kalır.
  · Aracın altına gerçekçi temas gölgesi, zemine hafif yansıma eklenir.
- Showroom havası: NFS tarzı neon garaj DEĞİL. Porsche / Mercedes teslim merkezi gibi sakin, karanlık, mat zeminli, yukarıdan yumuşak ışıklı bir oda. Fotoğraf gibi gerçekçi; oyun ya da CGI hissi yok.
- Dürüstlük: Aracın kendi piksellerine dokunulmaz (renk, parlaklık, çizik ve hasar rötuşu yok); yalnız arka plan değişir. Orijinal ilan fotoğrafları sayfada ayrıca gösterilir. Eksik açılar yapay zekâyla ASLA doldurulmaz.
- Kaynak: Mega Cars'ta birinin her araç için telefonla çektiği yaklaşık 40 saniyelik tam tur videosu. Önce tek araçla deneme çekimi yapılır; boru hattının sonucu Volkan tarafından onaylanınca kalan araçlar çekilir. Site yapımı bu videoları beklemez.
- Videosu olmayan araç: Detay sayfasında premium fotoğraf galerisi görünür; boş showroom alanı ya da "yakında" yer tutucusu görünmez. Spin verisi eklendiği anda o aracın showroom'u kendiliğinden açılır.
- Videosuz kısım: Her aracın kapak fotoğrafı da arka planı ayrılarak aynı showroom zeminine yerleştirilir; liste kartları ve öne çıkanlar şeridi tek bir showroom'daymış gibi tutarlı görünür. Ayırma kalitesi yetersiz kalan fotoğrafta orijinal fotoğraf kullanılır.
- Teknik: Hafif, özel bir canvas görüntüleyici kullanılır (Three.js yok). İlk kare önce yüklenir (detay sayfasının LCP öğesi); kalan kareler kademeli olarak ve görüntüleyici ekrana girince yüklenir. Mobilde yatay sürükleme aracı döndürür, dikey kaydırma sayfayı kaydırır (sayfa kilitlenmez). Klavye için ← → düğmeleri ve aria-label bulunur; prefers-reduced-motion açıkken kendiliğinden dönme kapalıdır.

TEKNİK KARARLAR
- Next.js (güncel kararlı sürüm, App Router) + TypeScript + Tailwind + GSAP (ScrollTrigger, SplitText) + Lenis. Eski Vite + hash router yapısı terk ediliyor: her araç sayfası ayrı adresle Google'da indekslenmeli.
- Diller: Almanca (varsayılan, /de), İngilizce (/en), Türkçe (/tr). İlk girişte tarayıcı diline göre otomatik seçim; üstte dil seçici. Çeviriler uzman tercüman seviyesinde olacak; makine çevirisi kokan tek cümle olmayacak. Müşteriye görünen her cümle (başlıklar dahil) yüklemli ve tam olacak; yarım ya da devrik cümle olmayacak.
- Envanter: tek kaynak dosya (data/inventory.json) + tekrar çalıştırılabilir içe aktarma betiği. Her araç yalnız kendi ilanının fotoğraflarıyla gösterilir; satılmış ya da eski araç gösterilmez. Her araç kaydında isteğe bağlı bir 360 showroom alanı bulunur. Yapı, ileride günlük otomatik stok güncellemesi eklenebilecek şekilde kurulacak.
- Çalışma dalı: v2. Yayın yalnız GitHub push → Vercel otomatik derleme ile olur; Vercel CLI ile elle deploy YASAK. Vercel proje ayarlarını değiştirme; Next.js önizleme derlemesi gerekirse dal içindeki vercel.json ile ayarlanır.
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
- Açılış başlığı okunamayacak hızda geçmez.

HAREKET VE WOW ANLARI
- Her bölümde en az bir anlamlı hareket olur; tek başına düz fade-in yetmez.
- Wow 1 — Açılış: tam ekran sinematik video (yavaş dolly, 24 fps). Başlık maskeli olarak satır satır, okunur hızda açılır. Aşağı kaydırınca kamera geri çekiliyormuş gibi hafif ölçek ve kararma olur. Video yüklenene kadar poster görünür (LCP öğesi = poster).
- Wow 2 — Öne çıkan araçlar: masaüstünde sabitlenen (pin) yatay şerit. Kaydırma, kamera kayışı gibi araçları geçirir; fotoğraf kendi çerçevesinde hafif paralaks yapar; fiyat ve özellik yazıları yavaşça belirir. Mobilde parmakla kaydırılan, yapışkan (snap) şerit olur.
- Wow 3 — Kart → showroom: araç kartına tıklanınca kartın fotoğrafı büyüyerek detay sayfasındaki platformun üstündeki araca dönüşür; showroom ışıkları yavaşça yanar, platform aracı çeyrek tur döndürüp durur ve sürükleme ipucu ("Zum Drehen ziehen") belirir. View Transitions API kullanılır; desteklemeyen tarayıcıda yumuşak geçiş olur.
- Wow 4 — 360° showroom: yukarıdaki SHOWROOM bölümü.
- Ek hareketler: CTA'larda manyetik hover (scale 1.02 + hafif gölge, tıklamada 0.98, WCAG AA odak halkası); masaüstünde Lenis yumuşak kaydırma (dokunmatikte doğal kaydırma); sayfa açılışında kısa sinematik yükleyici (boş sayfa görünmez, LCP'yi geciktirmez); gerçek veriden sayı sayacı (ör. stoktaki araç sayısı).

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
- Lighthouse mobil Performans ≥ 80, masaüstü ≥ 85; LCP < 3,0 sn (mobil); CLS < 0,1; INP < 200 ms; ilk yükte JS < 300 KB (gzip).
- Erişilebilirlik: bütün butonlarda ve yalnız ikonlu linklerde aria-label; kontrast ≥ 4.5:1; klavyeyle tam gezinme; prefers-reduced-motion açıkken animasyonlar kapanır.
- SEO: robots.txt, sitemap.xml (hreflang'li), her sayfada generateMetadata (title, description, OG, Twitter), JSON-LD (AutoDealer; her araç için Car + Offer; BreadcrumbList), mutlak adresli OG görseli + yedeği.
- Production derlemesinde konsol hatası ve uyarısı 0.
- Referans tonu: bugatti.com, porsche.com, studiofreight.com, locomotive.ca, apple.com. Dribbble ve jenerik Behance işleri referans alınmaz.
- Çizgi film testi: her bileşen için "Bu, porsche.com'da ya da apple.com'da olur mu?" sorusu sorulur; cevap hayırsa bileşen kullanılmaz.
