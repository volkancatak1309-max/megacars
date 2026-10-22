# KARAR DEFTERİ — Mega Cars

> Kural: Volkan bir karar, kural, ölçü, sayı, istisna ya da "şöyle olsun / şöyle olmasın" dediğinde aynı turda buraya eklenir: tarih + Volkan'ın kendi cümlesi (özetleme, yorumlama, kısaltma yok) + ilgili dosya ya da ekran.
> Yeni oturumda ya da sıkıştırma özetinden sonra iş yapmadan önce bu dosya baştan sona okunur.

## 22.10.2026 — MEGACARS V2 FAZ 1 (Araştırma) + FAZ 2 (Tasarım sistemi) talimatı

### Oturum sınırı ve çalışma düzeni
- **22.10.2026** — "Site koduna dokunma. Deploy etme. main dalına commit ya da push yapma." — İlgili: bütün repo, main dalı
- **22.10.2026** — "Görsel veya video üretme; yalnız iki istisna var: (1) inceleme için videodan kare çıkarmak serbest; (2) showroom denemesi için repodaki 3 gerçek ilan fotoğrafında aracı arka plandan ayırmak ve bu deneme için tek bir boş showroom/platform arka planı üretmek serbest (fal.ai, en fazla 3 deneme, toplam en fazla 1 USD)." — İlgili: docs/showroom-deneme/, docs/referans/hero-kareler/
- **22.10.2026** — "main dalı eski Vite sitesidir; Volkan yeni siteyi onaylayana kadar main'e dokunulmaz." — İlgili: main dalı
- **22.10.2026** — "Commit edilmemiş değişiklik varsa silme ve yeni commitlere katma; raporda listele." — İlgili: git status
- **22.10.2026** — "main'den "v2" adlı yeni dal aç ve ona geç. Bu oturumda üretilen belgeler yalnız bu dala gider." — İlgili: v2 dalı
- **22.10.2026** — "Sonraki bütün fazlarda işe başlamadan önce bu dosya okunacak." — İlgili: docs/BRIEF.md
- **22.10.2026** — "Ekran görüntülerini sıkıştırılmış JPG veya WebP olarak (her biri en fazla 300 KB) docs/referans/ altına kaydet." — İlgili: docs/referans/
- **22.10.2026** — "Yalnız oku; toplu indirme yapma. Sayfa bot korumasıyla açılmazsa zorlama ve raporla." — İlgili: autoscout24.at/haendler/mega-cars
- **22.10.2026** — "Zip dosyasını açma; yalnız katalogdan seç ve her seçimin nedenini yaz." — İlgili: GALZURA_BILESEN_KATALOG.md
- **22.10.2026** — "Bu video yalnız test içindir; sitede asla yayınlanmaz." — İlgili: showroom boru hattı test videosu
- **22.10.2026** — "Yalnız docs/ klasörünü ve DESIGN.md'yi v2 dalına commit et (mesaj: "docs: megacars v2 faz 1-2 arastirma, tasarim sistemi ve showroom denemesi") ve v2 dalını GitHub'a push et." — İlgili: v2 dalı
- **22.10.2026** — "Sonra DUR. FAZ 3'e geçme." — İlgili: faz sırası

### Müşteri
- **22.10.2026** — "Mega Cars — premium ikinci el araç galerisi. Adres: Radetzkystraße 80, 6845 Hohenems, Vorarlberg, Avusturya. Telefon: +43 660 1999472 (ikinci galeri numarası +43 660 6969496 — doğrulanacak). E-posta: office@meral.at. WhatsApp: wa.me/436601999472. AutoScout24 bayi profili: autoscout24.at/haendler/mega-cars. Kendi alan adı: megacars.at (şu an bozuk bir WordPress şablonu)." — İlgili: Kontakt, Impressum, footer
- **22.10.2026** — "Stok ağırlıklı Mercedes-Benz, BMW, Audi ve Porsche; orta-üst segment ikinci el." — İlgili: envanter

### Hedef ve ton
- **22.10.2026** — "Eski siteyi sıfırdan, Awwwards seviyesinde (10 üzerinden en az 9) yeniden kurmak." — İlgili: bütün site
- **22.10.2026** — "Ziyaretçi üç şeyi zahmetsizce yapabilmeli: stoktaki aracı bulmak, aracı ayrıntılı incelemek, tek dokunuşla iletişime geçmek (Anrufen / WhatsApp / Probefahrt / Finanzierung / Inzahlungnahme talebi)." — İlgili: Fahrzeuge, Fahrzeug-Detail, CTA'lar
- **22.10.2026** — "Site sade ve kullanıcı dostu olacak; karmaşık olmayacak." — İlgili: bütün site
- **22.10.2026** — "Ton: sakin, kendinden emin premium Alman otomotiv; kamera ile çekilmiş film hissi. bugatti.com ve porsche.com yanına konduğunda aynı işçilikte durmalı, ama galerinin gerçek fiyat seviyesine yabancılaşmamalı (ulaşılabilir lüks)." — İlgili: DESIGN.md

### Showroom (360°) — sitenin imza özelliği
- **22.10.2026** — "Ziyaretçi bir araç sayfasına girdiğinde araç, showroom'daki döner bir platformun üstünde durur ve platformla birlikte yavaşça döner. Ziyaretçi fareyle ya da parmağıyla sürükleyerek aracı çepeçevre, istediği açıdan inceler." — İlgili: Fahrzeug-Detail / 360 görüntüleyici
- **22.10.2026** — "Hareket dinamiktir: sürükleyip bırakınca araç ataletle yumuşakça yavaşlayıp durur; birkaç saniye dokunulmazsa platform yavaşça kendiliğinden dönmeye devam eder; yakınlaştırma (fare tekerleği ve iki parmak) ve tam ekran vardır." — İlgili: 360 görüntüleyici
- **22.10.2026** — "Yöntem: 3D model DEĞİL. Her aracın etrafında dönülerek çekilmiş gerçek video karelerinden 360° döndürme (spin) yapılır" — İlgili: showroom boru hattı
- **22.10.2026** — "Kareler eşit açı adımlarıyla seçilir (hedef 72 kare = 5°, en az 36 kare)." — İlgili: showroom boru hattı
- **22.10.2026** — "Araç her karede aynı boyut ve konumda ortalanır; zıplama ve kayma olmaz." — İlgili: showroom boru hattı
- **22.10.2026** — "Araç, zaman içinde titremeyen tutarlı bir maskeyle arka plandan ayrılır ve her karede aynı sanal showroom platformunun üstüne yerleştirilir." — İlgili: showroom boru hattı
- **22.10.2026** — "Platform her karede aracın açısına göre döner (platform kenarındaki ince çizgiler ve, gerçekçi duruyorsa, kenara oyulmuş "MEGA CARS" yazısı dönüşü belli eder); ışıklar sabit kalır." — İlgili: showroom platformu
- **22.10.2026** — "Aracın altına gerçekçi temas gölgesi, zemine hafif yansıma eklenir." — İlgili: showroom kompoziti
- **22.10.2026** — "Showroom havası: NFS tarzı neon garaj DEĞİL. Porsche / Mercedes teslim merkezi gibi sakin, karanlık, mat zeminli, yukarıdan yumuşak ışıklı bir oda. Fotoğraf gibi gerçekçi; oyun ya da CGI hissi yok." — İlgili: showroom arka planı
- **22.10.2026** — "Dürüstlük: Aracın kendi piksellerine dokunulmaz (renk, parlaklık, çizik ve hasar rötuşu yok); yalnız arka plan değişir. Orijinal ilan fotoğrafları sayfada ayrıca gösterilir. Eksik açılar yapay zekâyla ASLA doldurulmaz." — İlgili: showroom, Fahrzeug-Detail galerisi
- **22.10.2026** — "Kaynak: Mega Cars'ta birinin her araç için telefonla çektiği yaklaşık 40 saniyelik tam tur videosu. Önce tek araçla deneme çekimi yapılır; boru hattının sonucu Volkan tarafından onaylanınca kalan araçlar çekilir. Site yapımı bu videoları beklemez." — İlgili: docs/360-CEKIM-REHBERI.md
- **22.10.2026** — "Videosu olmayan araç: Detay sayfasında premium fotoğraf galerisi görünür; boş showroom alanı ya da "yakında" yer tutucusu görünmez. Spin verisi eklendiği anda o aracın showroom'u kendiliğinden açılır." — İlgili: Fahrzeug-Detail
- **22.10.2026** — "Videosuz kısım: Her aracın kapak fotoğrafı da arka planı ayrılarak aynı showroom zeminine yerleştirilir; liste kartları ve öne çıkanlar şeridi tek bir showroom'daymış gibi tutarlı görünür. Ayırma kalitesi yetersiz kalan fotoğrafta orijinal fotoğraf kullanılır." — İlgili: araç kartı, öne çıkanlar şeridi
- **22.10.2026** — "Teknik: Hafif, özel bir canvas görüntüleyici kullanılır (Three.js yok). İlk kare önce yüklenir (detay sayfasının LCP öğesi); kalan kareler kademeli olarak ve görüntüleyici ekrana girince yüklenir. Mobilde yatay sürükleme aracı döndürür, dikey kaydırma sayfayı kaydırır (sayfa kilitlenmez). Klavye için ← → düğmeleri ve aria-label bulunur; prefers-reduced-motion açıkken kendiliğinden dönme kapalıdır." — İlgili: 360 görüntüleyici

### Teknik kararlar
- **22.10.2026** — "Next.js (güncel kararlı sürüm, App Router) + TypeScript + Tailwind + GSAP (ScrollTrigger, SplitText) + Lenis. Eski Vite + hash router yapısı terk ediliyor: her araç sayfası ayrı adresle Google'da indekslenmeli." — İlgili: v2 kod tabanı
- **22.10.2026** — "Diller: Almanca (varsayılan, /de), İngilizce (/en), Türkçe (/tr). İlk girişte tarayıcı diline göre otomatik seçim; üstte dil seçici." — İlgili: i18n, dil seçici
- **22.10.2026** — "Çeviriler uzman tercüman seviyesinde olacak; makine çevirisi kokan tek cümle olmayacak. Müşteriye görünen her cümle (başlıklar dahil) yüklemli ve tam olacak; yarım ya da devrik cümle olmayacak." — İlgili: bütün metinler
- **22.10.2026** — "Envanter: tek kaynak dosya (data/inventory.json) + tekrar çalıştırılabilir içe aktarma betiği. Her araç yalnız kendi ilanının fotoğraflarıyla gösterilir; satılmış ya da eski araç gösterilmez. Her araç kaydında isteğe bağlı bir 360 showroom alanı bulunur. Yapı, ileride günlük otomatik stok güncellemesi eklenebilecek şekilde kurulacak." — İlgili: data/inventory.json, içe aktarma betiği
- **22.10.2026** — "Çalışma dalı: v2. Yayın yalnız GitHub push → Vercel otomatik derleme ile olur; Vercel CLI ile elle deploy YASAK. Vercel proje ayarlarını değiştirme; Next.js önizleme derlemesi gerekirse dal içindeki vercel.json ile ayarlanır." — İlgili: v2 dalı, vercel.json
- **22.10.2026** — "Görseller: WebP, 1600w masaüstü + 800w mobil srcset, bulanık yer tutucu (blur-up), tembel yükleme. /cars, /hero ve /spin altındaki dosyalar için 1 yıl immutable önbellek başlığı." — İlgili: görsel boru hattı, vercel.json başlıkları
- **22.10.2026** — "Commit mesajları anlamlı olur: feat:, fix:, perf:, a11y:, docs:." — İlgili: git
- **22.10.2026** — "Volkan yazılımcı değil: ondan yalnız zorunlu onay istenir; Vercel dahil bütün teknik işleri CC yapar. Raporlar kısa Türkçe ve [DOĞRULANDI]+kaynak / [VARSAYIM] / [BİLMİYORUM] etiketli olur." — İlgili: raporlama

### Kesin yasaklar
- **22.10.2026** — "Uydurma veri yok: sahte yorum, sahte faiz oranı, sahte kuruluş yılı, sahte garanti, sahte sayı yok. Bilinmeyen bilgi sitede gösterilmez." — İlgili: bütün içerik
- **22.10.2026** — "Çizgi film / yapay zekâ kokusu yok: bounce, spring, elastic easing yok; 0,3 sn'den hızlı animasyon yok; easing power3.out veya cubic-bezier(0.25,0.1,0.25,1)." — İlgili: hareket sistemi
- **22.10.2026** — "Neon, aurora, parçacık, konfeti, glitch, retro ızgara, dönen kart, dönen kenarlık, parlayan buton, dönen dünya yok. Çizgi film veya illüstrasyon ikon yok (lucide gibi ince çizgi ikon olur)." — İlgili: bileşenler, ikonlar
- **22.10.2026** — "Aceternity / Magic UI'dan yalnız şunlar kullanılabilir: Spotlight, TracingBeam, ParallaxScroll, StickyScrollReveal, TextGenerateEffect (yavaş), BorderBeam (çok hafif), NumberTicker, Marquee, InfiniteMovingCards (gri tonlu), BentoGrid, CardHoverEffect (scale 1.02, parıltı yok). AuroraBackground, Meteors, Particles, AnimatedGridPattern, RetroGrid, ShimmerButton, MovingBorder, Globe, HeroHighlight YASAK." — İlgili: bileşen kitaplığı
- **22.10.2026** — "3D araba modeli yok: hazır ya da jenerik GLB, ilkel geometriden model ve yapay zekâyla fotoğraftan üretilmiş 3D model YASAK — galerinin kendi aracı olmaz ve oyun gibi görünür. Showroom yalnız gerçek fotoğraflarla yapılır." — İlgili: showroom
- **22.10.2026** — "Yapay zekâ ile araba görseli üretilip stok aracı gibi gösterilmez. Araç fotoğraflarına renk filtresi, renkli katman ya da vurgu rengi uygulanmaz; vurgu rengi yalnız arayüzde kullanılır." — İlgili: fotoğraf sunumu
- **22.10.2026** — "Volkan'ın daha önce reddettiği iki efekt kullanılmaz: imleci izleyen küçük görsel önizleme (image trail / hover preview) ve kaydırdıkça kare kare oynayan açılış (frame-scrub scroll sequence)." — İlgili: hareket sistemi, açılış
- **22.10.2026** — "Açılış başlığı okunamayacak hızda geçmez." — İlgili: Startseite açılışı

### Hareket ve wow anları
- **22.10.2026** — "Her bölümde en az bir anlamlı hareket olur; tek başına düz fade-in yetmez." — İlgili: bütün bölümler
- **22.10.2026** — "Wow 1 — Açılış: tam ekran sinematik video (yavaş dolly, 24 fps). Başlık maskeli olarak satır satır, okunur hızda açılır. Aşağı kaydırınca kamera geri çekiliyormuş gibi hafif ölçek ve kararma olur. Video yüklenene kadar poster görünür (LCP öğesi = poster)." — İlgili: Startseite açılışı
- **22.10.2026** — "Wow 2 — Öne çıkan araçlar: masaüstünde sabitlenen (pin) yatay şerit. Kaydırma, kamera kayışı gibi araçları geçirir; fotoğraf kendi çerçevesinde hafif paralaks yapar; fiyat ve özellik yazıları yavaşça belirir. Mobilde parmakla kaydırılan, yapışkan (snap) şerit olur." — İlgili: öne çıkanlar şeridi
- **22.10.2026** — "Wow 3 — Kart → showroom: araç kartına tıklanınca kartın fotoğrafı büyüyerek detay sayfasındaki platformun üstündeki araca dönüşür; showroom ışıkları yavaşça yanar, platform aracı çeyrek tur döndürüp durur ve sürükleme ipucu ("Zum Drehen ziehen") belirir. View Transitions API kullanılır; desteklemeyen tarayıcıda yumuşak geçiş olur." — İlgili: araç kartı → Fahrzeug-Detail
- **22.10.2026** — "Wow 4 — 360° showroom: yukarıdaki SHOWROOM bölümü." — İlgili: 360 görüntüleyici
- **22.10.2026** — "Ek hareketler: CTA'larda manyetik hover (scale 1.02 + hafif gölge, tıklamada 0.98, WCAG AA odak halkası); masaüstünde Lenis yumuşak kaydırma (dokunmatikte doğal kaydırma); sayfa açılışında kısa sinematik yükleyici (boş sayfa görünmez, LCP'yi geciktirmez); gerçek veriden sayı sayacı (ör. stoktaki araç sayısı)." — İlgili: CTA, kaydırma, yükleyici, sayaç

### Sayfa iskeleti
- **22.10.2026** — "Sayfalar: Startseite · Fahrzeuge (liste + filtre + sıralama) · Fahrzeug-Detail · Finanzierung · Ankauf/Inzahlungnahme · Kontakt & Über uns · Impressum · Datenschutz." — İlgili: site haritası
- **22.10.2026** — "Önce mobil tasarlanır." — İlgili: bütün ekranlar
- **22.10.2026** — "Startseite'de açılışın hemen altında üç alanlı hızlı arama olur (Marke · Preis bis · Karosserie) ve canlı sonuç sayısını gösteren bir düğme bulunur ("24 Fahrzeuge anzeigen" gibi; sayı gerçek veriden gelir)." — İlgili: Startseite hızlı arama
- **22.10.2026** — "Detay sayfası: En üstte showroom bulunur (spin verisi yoksa büyük galeri). Fiyat ve altı temel bilgi (Erstzulassung, Kilometerstand, Leistung, Kraftstoff, Getriebe, Karosserie) ilk ekranda görünür. Altında orijinal ilan fotoğrafları, donanım listesi ve benzer araçlar yer alır." — İlgili: Fahrzeug-Detail
- **22.10.2026** — "Mobilde altta sabit eylem çubuğu olur (Anrufen · WhatsApp · Probefahrt). Yüzen WhatsApp ve en üste çık düğmesi alelade olmaz, siteyle uyumlu olur." — İlgili: alt eylem çubuğu, yüzen düğmeler
- **22.10.2026** — "WhatsApp mesajı araç adı, fiyat ve sayfa linkiyle hazır dolu gider." — İlgili: WhatsApp CTA
- **22.10.2026** — "Formlarda sahte "gönderildi" ekranı olmaz; gönderimin nereye gittiği gerçek ve belli olur." — İlgili: formlar
- **22.10.2026** — "Footer'da küçük bir "Website: Galzura" bağlantısı (galzura.com) olur." — İlgili: footer

### Kalite eşiği
- **22.10.2026** — "Lighthouse mobil Performans ≥ 80, masaüstü ≥ 85; LCP < 3,0 sn (mobil); CLS < 0,1; INP < 200 ms; ilk yükte JS < 300 KB (gzip)." — İlgili: performans bütçesi
- **22.10.2026** — "Erişilebilirlik: bütün butonlarda ve yalnız ikonlu linklerde aria-label; kontrast ≥ 4.5:1; klavyeyle tam gezinme; prefers-reduced-motion açıkken animasyonlar kapanır." — İlgili: erişilebilirlik
- **22.10.2026** — "SEO: robots.txt, sitemap.xml (hreflang'li), her sayfada generateMetadata (title, description, OG, Twitter), JSON-LD (AutoDealer; her araç için Car + Offer; BreadcrumbList), mutlak adresli OG görseli + yedeği." — İlgili: SEO
- **22.10.2026** — "Production derlemesinde konsol hatası ve uyarısı 0." — İlgili: derleme
- **22.10.2026** — "Referans tonu: bugatti.com, porsche.com, studiofreight.com, locomotive.ca, apple.com. Dribbble ve jenerik Behance işleri referans alınmaz." — İlgili: DESIGN.md, ARASTIRMA.md
- **22.10.2026** — "Çizgi film testi: her bileşen için "Bu, porsche.com'da ya da apple.com'da olur mu?" sorusu sorulur; cevap hayırsa bileşen kullanılmaz." — İlgili: bütün bileşenler

### Görsel planı kuralları (FAZ 3 için)
- **22.10.2026** — "Prompt kuralı: "photorealistic", "shot on Sony FX9" veya "shot on Phase One medium format", "natural lighting" veya "professional studio lighting", "documentary realism", "no CGI feel", "shallow depth of field", "natural color grading", "cinematic 35mm" veya "85mm lens" ifadeleri zorunlu. "cartoon", "illustration", "low-poly", "stylized", "neon", "vibrant colors" yasak." — İlgili: docs/GORSEL-PLANI.md
- **22.10.2026** — "Video kuralı: 24 fps, doğal hareket bulanıklığı; kamera yalnız dolly, push-in, tilt-up veya yumuşak pan yapar; ani kesim, zoom flaşı, parçacık patlaması ve sert sarsıntı yok; doğal renk düzenlemesi." — İlgili: docs/GORSEL-PLANI.md
