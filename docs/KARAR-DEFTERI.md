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

## 22.10.2026 — Showroom yöntemi değişikliği + 360° denemesi (ikinci talimat)

### Önceki denemenin reddi
- **22.10.2026** — "Volkan sonucu "çok amatör" bulup reddetti. Nedenleri: platform düz ve derinliksiz; araç başka bir ışıkta çekildiği için karanlık sahnede yapıştırılmış duruyor; tekerleklerin altında gerçek gölge yok; perspektif tutmuyor." — İlgili: docs/showroom-deneme/

### Oturum sınırı
- **22.10.2026** — "Site koduna dokunma. Deploy etme. fal.ai ile görsel ya da video üretme. Mega Cars'ın gerçek fotoğraflarını düzenleme. Yalnız belgeleri güncelle, showroom denemesini yap, raporla ve dur." — İlgili: bu oturum
- **22.10.2026** — "main dalı eski canlı sitedir (megacars-one.vercel.app); main'e dokunma, main'e push etme." — İlgili: main dalı
- **22.10.2026** — "docs/BRIEF.md ve DESIGN.md'de ilgili bölümleri aşağıdaki kararlarla değiştir; eski hâli silinsin, çelişen hiçbir cümle kalmasın." — İlgili: docs/BRIEF.md, DESIGN.md

### a) İletişim ve künye
- **22.10.2026** — "Sahibi: Murat Demir. Firmenbuch kaydı: "Mega Cars Murat Demir e.U.", FN 447871 i, Landesgericht Feldkirch (kaynak: firmeneintrag.creditreform.de). Bazı dizinlerde "Mega Cars OG" geçiyor; Impressum Firmenbuch kaydına göre yazılır. UID bilinmiyor." — İlgili: Impressum
- **22.10.2026** — "Ana telefon: +43 660 6877002 (kaynak: galerinin Facebook sayfası facebook.com/Autohaus.MegaCars, AutoScout24 kaydındaki "Demir Murat" iletişim bilgisi, OpenStreetMap). İkinci numara: +43 660 6969496 (Firmenbuch dizinleri: creditreform, firmenabc, herold)." — İlgili: Kontakt, alt eylem çubuğu, footer
- **22.10.2026** — "E-posta: megacars@live.at (Facebook, firmenabc, herold, OpenStreetMap)." — İlgili: Kontakt, formlar, Impressum
- **22.10.2026** — "Açılış saatleri: Pazartesi–Cuma 08:00–18:00, Cumartesi 09:00–15:00, Pazar kapalı (Cylex, OpenStreetMap). Öğle arası kaynaklar arasında farklı; teyit edilecek." — İlgili: Kontakt, JSON-LD openingHours
- **22.10.2026** — "Eski sitedeki office@meral.at ve +43 660 1999472 galeriye ait DEĞİL; yeni sitede hiçbir yerde kullanılmaz. WhatsApp bağlantısı wa.me/436606877002 olur (numaranın WhatsApp'ta açık olduğu teyit edilecek)." — İlgili: WhatsApp CTA, bütün site
- **22.10.2026** — "Galerinin AutoScout24 profil metninde "seit 2002" yazıyor; Firmenbuch'taki e.U. kaydı 02.02.2016 tarihli. "Seit 2002" sitede yalnız sahibi teyit ederse kullanılır." — İlgili: Über uns

### b) Stok
- **22.10.2026** — "Bugün AutoScout24'te ve galerinin Facebook'ta verdiği gebrauchtwagen.at sayfasında (cid=9564827) Mega Cars ilanı yok. Güncel stok kaynağı Gökhan'dan öğrenilecek." — İlgili: data/inventory.json, içe aktarma
- **22.10.2026** — "Stok yalnız premium değil: geçmiş AutoScout24 kaydında 3.900 €'luk Renault Kangoo ve 12.900 €'luk Ford Kuga'dan 64.900 €'luk Mercedes S 560'a kadar geniş bir fiyat aralığı vardı. Facebook sloganı: "Autos zu Top Preisen. Auch für die kleine Geldtasche." Site premium görünür, ama bütçe arayan ziyaretçiyi dışlayan dil ve filtre kullanılmaz; fiyat filtresi en düşük fiyattan başlar. Brifteki "orta-üst segment" ifadesi bununla değiştirilir." — İlgili: brif, filtre, metin dili
- **22.10.2026** — "Demo sürümünde son bilinen gerçek stok (Haziran 2026, 18 araç) kullanılır; site canlıya çıkana kadar noindex kalır; canlıya çıkmadan önce güncel stoka geçilir." — İlgili: demo, robots/noindex

### c) Kapak fotoğrafları
- **22.10.2026** — "İlan fotoğraflarında arka plan değiştirme İPTAL. Kartlarda, öne çıkanlar şeridinde ve detay sayfasında Mega Cars'ın kendi showroom'unda çekilmiş orijinal fotoğraflar kullanılır; yalnız oran ve kırpma tek tip yapılır; mümkünse showroom içinde çekilmiş açı kapak seçilir." — İlgili: araç kartı, öne çıkanlar, detay galerisi

### d) Showroom (360°) yeni yöntemi
- **22.10.2026** — "Araç, altındaki gerçek zemin ve gerçek gölgesi korunur; yalnız arka plandaki duvarlar ve uzak çevre dikişsiz bir fonla değiştirilir. Camdan görünen arka plan da yeni fona uyarlanır; aracın gövdesine, rengine ve çiziğine dokunulmaz. Kaynak yine aracın etrafında yürünerek çekilmiş telefon videosudur." — İlgili: showroom boru hattı

### e) Dönme kuralı
- **22.10.2026** — "Detay sayfası açılınca araç, üstten bakıldığında saat yönünde ve yavaş döner (1 tam tur ≈ 40 sn; hız ve yön tek ayardan değişir). Ziyaretçi sürükleyince araç fareyi ya da parmağı takip eder; bırakınca ataletle yumuşakça durur; 3 sn dokunulmazsa yine yavaşça dönmeye başlar. prefers-reduced-motion açıkken kendiliğinden dönme kapalıdır. Tek açılı ilan fotoğrafları döndürülmez." — İlgili: 360 görüntüleyici

### f) Wow 3 güncellemesi
- **22.10.2026** — "Kart → detay geçişinde kartın fotoğrafı büyüyerek detay sayfasının üstüne yerleşir; aracın 360° verisi varsa fotoğraf yumuşakça showroom sahnesine geçer ve dönmeye başlar." — İlgili: kart → detay geçişi

### fal.ai anahtarı
- **22.10.2026** — "FAL_KEY ya da FAL_API_KEY'i önce ortam değişkenlerinde, sonra bu bilgisayardaki diğer projelerin .env dosyalarında ara (C:\Users\90553\Desktop\business\*, C:\Users\90553\Desktop\*, C:\Users\90553\*; node_modules ve .git klasörlerini atla). Değeri ASLA ekrana, log'a, rapora ya da repoya yazma." — İlgili: .env.local
- **22.10.2026** — "Bulursan değeri bu projedeki .env.local dosyasına FAL_KEY olarak yaz ve .env.local'ın .gitignore'da olduğunu doğrula. Raporda yalnız "bulundu (hangi dosyadan)" ya da "bulunamadı" yaz." — İlgili: .env.local, .gitignore

### 360° denemesi
- **22.10.2026** — "Amaç: Yeni yöntemin gerçekten fotoğraf gibi durduğunu, Mega Cars'tan çekim istemeden önce kanıtlamak." — İlgili: docs/showroom-v2/
- **22.10.2026** — "Ticari kullanıma açık (Pexels, Coverr ya da Mixkit) bir stok video bul. Videoda kamera bir aracın etrafında sabit yükseklikte tam tur dönmeli; ortam kapalı bir showroom ya da stüdyo olmalı; çözünürlük en az 1080p olmalı. Kaynak linkini ve lisansını yaz. Bu video yalnız denemedir; sitede ASLA yayınlanmaz. Uygun video bulamazsan dur ve raporla." — İlgili: deneme videosu
- **22.10.2026** — "Boru hattı (yalnız yerel ve ücretsiz araçlar; ev PC'de NVIDIA RTX 4050 6 GB var)" — İlgili: showroom boru hattı
- **22.10.2026** — "Kurulum ya da ekran kartı belleği sorun çıkarırsa geçici çözüm uydurma; dur ve raporla." — İlgili: showroom boru hattı
- **22.10.2026** — "A — Açık stüdyo: açık gri ya da kırık beyaz dikişsiz fon; gerçek zemin ve gerçek gölge korunur." — İlgili: docs/showroom-v2/
- **22.10.2026** — "B — Karanlık salon: koyu fon; aracın altında gerçek zeminden oluşan doğal bir ışık havuzu (sahne)." — İlgili: docs/showroom-v2/
- **22.10.2026** — "C — Platformlu: B'ye ek olarak aracın altında ince bir platform kenarı. Platformun perspektifi COLMAP'in zemin düzleminden ve kamera konumlarından hesaplanır; gerçek gölge platformun üstüne düşer; araç platformla birlikte döner. Sahte duruyorsa bunu dürüstçe yaz." — İlgili: docs/showroom-v2/
- **22.10.2026** — "Görüntüleyici: hafif, özel bir canvas 360 görüntüleyici yaz (Three.js yok)." — İlgili: 360 görüntüleyici
- **22.10.2026** — "Kalite kontrolü (kendin, dürüstçe): zemin–fon geçişi, tekerleğin zemine teması, gölge, camdan görünen fon, maske titremesi, kareler arası zıplama. Her birini %200 yakınlaştırmayla kontrol et; başarısız olan noktayı gizleme, rapora yaz." — İlgili: docs/showroom-v2/

### Çekim rehberi
- **22.10.2026** — "Tercih edilen yer Mega Cars'ın kapalı showroom'u; aracın çevresinde yaklaşık 3 m boş alan." — İlgili: docs/360-CEKIM-REHBERI.md
- **22.10.2026** — "Mesafe, yükseklik ve tur süresini denemedeki boru hattının ihtiyacına göre yaz." — İlgili: docs/360-CEKIM-REHBERI.md

### Kapanış
- **22.10.2026** — ".playwright-mcp/ klasörünü .gitignore'a ekle. docs/ ve DESIGN.md değişikliklerini v2 dalına commit et (mesaj: "docs: showroom v2 yontemi, kunye ve stok guncellemesi, 360 denemesi") ve v2'yi push et. Stok videonun kendisini ve büyük kare klasörlerini commit etme; yalnız index.html, en fazla 10 MB'lık önizleme MP4'leri ve küçük örnekler girsin." — İlgili: git

## 22.10.2026 — Stok video bulunamadıktan sonraki karar (üçüncü talimat)
- **22.10.2026** — "KARAR: (a) + (c) birlikte." — İlgili: 360° denemesi
- **22.10.2026** — "Belge değişikliklerini şimdi commit'le ve push et. Commit mesajı yalnız yapılanı söylesin, ör. "docs: künye, showroom yöntemi ve Wow 3 güncellendi; .gitignore". "360 denemesi" ifadesi geçmeyecek. main'e değil, çalıştığın dala." — İlgili: git, v2 dalı
- **22.10.2026** — "Mega Cars'tan tek araçlık deneme çekimini Volkan isteyecek. Senden: çekim için kısa, Almanca bir talep metni yaz (mesafe, yükseklik, tur süresi, kapalı showroom, 3 m boş alan). Rakamlar kesin değilse [VARSAYIM] yaz." — İlgili: çekim talebi
- **22.10.2026** — "Çekim gelene kadar Pexels 854754 ile YALNIZ boru hattını kur: kare çıkarma, 72 kare, görüntüleyici, ölçümler (kare boyutu, ilk kare süresi, JS boyutu, işlem süresi). Raporda bunun yöntemi kanıtlamadığını açıkça yaz." — İlgili: docs/showroom-v2/
- **22.10.2026** — "fal.ai anahtarını Volkan onay vermeden hiçbir ücretli işte kullanma." — İlgili: .env.local, fal.ai
- **22.10.2026** — "Rapordan sonra dur." — İlgili: faz sırası

## 22.10.2026 — 360° kararları, çekim talimatı düzeltmesi ve commit (dördüncü talimat)

### Sınır
- **22.10.2026** — "Site koduna dokunma. Deploy etme. fal.ai anahtarını Volkan onay vermeden hiçbir ücretli işte kullanma. Yeni görsel ya da video üretme." — İlgili: bu oturum

### 1) Yakınlaştırma
- **22.10.2026** — "Onaylandı: Yakınlaştırma Ctrl/⌘ + fare tekerleğiyle ya da iki parmakla yapılır. Düz fare tekerleği yalnız tam ekranda yakınlaştırır; normal sayfada sayfayı kaydırır." — İlgili: 360 görüntüleyici, BRIEF.md, DESIGN.md

### 2) Boru hattı ölçek kuralı
- **22.10.2026** — "Döner platform taklidinde araç kendi merkezi etrafında döner, kamera sabittir; aracın yandan geniş, önden dar görünmesi doğaldır." — İlgili: showroom boru hattı
- **22.10.2026** — "Kareler, COLMAP'ten gelen "kamera – araç merkezi" uzaklığına göre ölçeklenir; kamera yüksekliği ve ufuk çizgisi sabitlenir." — İlgili: showroom boru hattı
- **22.10.2026** — "Aracın kutu boyutunu (bounding box) her karede eşitleyen ölçekleme YASAK: bu, aracın dönerken büyüyüp küçülüyormuş gibi görünmesine yol açar." — İlgili: showroom boru hattı
- **22.10.2026** — "72 kare, araç merkezi etrafında eşit açı adımlarıyla seçilir." — İlgili: showroom boru hattı
- **22.10.2026** — "BRIEF.md'deki "araç her karede aynı boyut ve konumda ortalanır" ifadesini bu kuralla değiştir. README'ye bu kuralın gerçek çekimde doğrulanacağını yaz." — İlgili: BRIEF.md, docs/showroom-v2/README.md

### 3) Çekim talimatı
- **22.10.2026** — "docs/showroom-v2/CEKIM-TALEBI-DE.md dosyasını aşağıdaki kurallarla yeniden yaz ve adını CEKIM-TALEBI.md yap. İçerik Almanca + Türkçe olsun (çekimi galeride kim yaparsa anlasın); tek sayfa, kısa, maddeli ve yazılımcı olmayan birinin anlayacağı dilde yaz." — İlgili: docs/showroom-v2/CEKIM-TALEBI.md
- **22.10.2026** — "Yürüme yolu: Çeken kişi aracın gövdesine göre değil, aracın ORTASINA hep aynı uzaklıkta kalarak bir çember üzerinde yürür. Çember yere 8 koni ya da işaretle önceden işaretlenir." — İlgili: çekim talimatı
- **22.10.2026** — "Uzaklık ve lens: Aracın doğal (çarpık olmayan) görünmesi lense değil uzaklığa bağlıdır; kamera yaklaştıkça burun ve arka olduğundan büyük görünür, 0,5× lens bunu düzeltmez." — İlgili: çekim talimatı
- **22.10.2026** — "Çember yarıçapını kendin hesapla: telefonun ana kamerası (1×), 4K yatay video; aracın yan görünümü kenarlarda yaklaşık %10 boşlukla kadraja sığacak; araç uzunluğunu 5,2 m kabul et. Hesabı ve kullandığın görüş açısı değerini kaynağıyla yaz. Talimata çemberin yarıçapını ve çapını metre olarak yaz." — İlgili: çekim talimatı
- **22.10.2026** — "1. tercih: Bu çember showroom'un içinde açılabiliyorsa 1× lensle çekilir." — İlgili: çekim talimatı
- **22.10.2026** — "2. tercih: Açılamıyorsa video çekilmeden önce, açılabilen en büyük çemberin üstünden 0,5× lensle 3 deneme fotoğrafı istenir: ön, ön çapraz, yan. Galzura bu fotoğraflara bakıp çekimin yapılıp yapılmayacağına karar verir." — İlgili: çekim talimatı
- **22.10.2026** — "Kamera: Yükseklik yaklaşık 1,0–1,2 m ve tur boyunca sabit (monopod ya da gimbal varsa kullanılsın). 4K yatay, 30 fps. Odak ve pozlama kilitli. Kayıt sırasında yakınlaştırma yapılmaz. iPhone'da "Kamerayı Kilitle" ayarı açık olsun ki kayıt sırasında lens değişmesin; HDR video, sinematik mod ve aksiyon modu kapalı olsun. Bu ayarların iPhone menüsündeki adlarını güncel Apple kaynağından doğrula; Android için genel karşılıklarını kısaca yaz." — İlgili: çekim talimatı
- **22.10.2026** — "Tur: Eşit ve yavaş hızla tam tur ve yaklaşık %10 fazlası. Tur süresini boru hattının ihtiyacına göre sen belirle." — İlgili: çekim talimatı
- **22.10.2026** — "Ortam: Kapalı showroom ve sabit ışık; kadrajda insan yok; kapılar kapalı; ön tekerlekler düz; aracın çevresindeki eşyalar çekimden önce kaldırılır." — İlgili: çekim talimatı
- **22.10.2026** — "Gönderim: Video WhatsApp'tan normal video olarak gönderilmez, çünkü kalitesi düşer; WhatsApp'ta "Dokument" olarak ya da Google Drive / WeTransfer linkiyle gönderilir. Dosya adı kuralı: marka-model-tarih." — İlgili: çekim talimatı
- **22.10.2026** — "İlk çekim tek araçla yapılan bir denemedir." — İlgili: çekim talimatı
- **22.10.2026** — "[VARSAYIM] etiketlerini yalnız md dosyasında tut. Gönderilecek temiz sürümü docs/showroom-v2/CEKIM-TALEBI.pdf olarak üret; PDF'te etiket, iç not ya da Galzura'ya özel açıklama olmasın. PDF'i açıp bir kez kontrol et." — İlgili: docs/showroom-v2/CEKIM-TALEBI.pdf

### 4) Commit
- **22.10.2026** — "docs/showroom-v2/ içindeki kare klasörlerini ve stok klibi .gitignore'a ekle; bunların hiçbiri commit'lenmez." — İlgili: .gitignore
- **22.10.2026** — "Test sayfasını, görüntüleyici kodunu, boru hattı kodunu, README'yi ve çekim talimatını (md + pdf) commit'le; BRIEF.md, DESIGN.md ve KARAR-DEFTERI.md değişikliklerini de ekle." — İlgili: git
- **22.10.2026** — "Commit mesajı: "docs: 360 olcek kurali, cekim talimati (DE+TR), yakinlastirma karari; showroom-v2 test kodu". v2'ye push et. main'e dokunma." — İlgili: git, v2 dalı

## 22.10.2026 — FAZ 4A: site iskeleti + ana sayfa + araç listesi + araç detay

### Sınır ve kapsam
- **22.10.2026** — "fal.ai ya da başka bir yapay zekâ aracıyla görsel veya video üretme; para harcayan hiçbir iş yapma. Vercel proje ayarlarını değiştirme. Vercel CLI ile elle deploy yapma; yayın yalnız v2'ye push ile olur. Uydurma veri yok." — İlgili: bu faz
- **22.10.2026** — "Finanzierung, Ankauf/Inzahlungnahme, Kontakt & Über uns, Impressum ve Datenschutz FAZ 4B'de yapılacak. Menüdeki linkler çalışsın diye bu sayfalar için geçici, sade bir sayfa koy: yalnız başlık ve BRIEF'teki gerçek iletişim bilgileri. Lorem ipsum ya da "yakında" yazısı yok. İngilizce de FAZ 4B'de eklenecek; bu oturumda dil seçicide yalnız DE ve TR görünsün." — İlgili: geçici sayfalar, dil seçici
- **22.10.2026** — "Çelişki görürsen BRIEF.md ve KARAR-DEFTERI.md geçerlidir." — İlgili: belgeler

### Açılış videosu
- **22.10.2026** — "Coverr, Pexels ya da Mixkit'te ticari kullanıma açık, GERÇEK kamera çekimi bir açılış videosu bul (yapay zekâ üretimi ya da 3D animasyon değil): marka logosu okunmayan premium bir araç atmosferi; yavaş dolly, push-in ya da yumuşak pan; ani kesim yok; karanlık, sinematik ton; DESIGN.md'deki "Die Übergabe" konseptine uygun." — İlgili: açılış videosu
- **22.10.2026** — "En az 8 kare çıkarıp kontrol et. Yapay zekâ ya da 3D izi, okunur rozet ya da plaka, ani kesim varsa o videoyu ele. Seçilen videonun kaynak linkini ve lisansını docs/KARAR-DEFTERI.md'ye yaz." — İlgili: açılış videosu
- **22.10.2026** — "Kodlama: masaüstü 1920 px (en fazla 6 MB) ve mobil 960 px (en fazla 2,5 MB) H.264 MP4 + WebP poster (LCP öğesi). Döngü kesintisiz olsun." — İlgili: public/hero
- **22.10.2026** — "Uygun video bulamazsan durma: açılışta Mega Cars'ın kendi showroom'unda çekilmiş gerçek bir ilan fotoğrafını (ör. "MEGA CARS" tabelalı S 560) yavaş bir kamera ilerlemesiyle (push-in) kullan ve bunu raporda yaz." — İlgili: açılış

### Teknik iskelet
- **22.10.2026** — "v2 dalında Vite projesini kaldır; Next.js (güncel kararlı sürüm, App Router) + TypeScript + Tailwind + GSAP (ScrollTrigger, SplitText, Flip) + Lenis kur. public/cars altındaki gerçek araç fotoğraflarını koru." — İlgili: kod tabanı
- **22.10.2026** — "Diller: /de (varsayılan), /tr (bu oturumda), /en (FAZ 4B). İlk girişte tarayıcı diline göre yönlendirme; kayma animasyonlu dil seçici. Bu oturumdaki bütün metinler Almanca ve Türkçe, uzman tercüman seviyesinde ve yüklemli tam cümlelerle yazılır." — İlgili: i18n
- **22.10.2026** — "vercel.json: dal içinde framework = nextjs; /cars ve /hero altındaki dosyalar için 1 yıl immutable önbellek başlığı." — İlgili: vercel.json
- **22.10.2026** — "Bütün site şimdilik noindex (robots meta + X-Robots-Tag)." — İlgili: SEO
- **22.10.2026** — "Envanter: data/inventory.json (cars-data.json'daki son bilinen 18 gerçek araçtan) + scripts/import-inventory.ts. Her araç için şu alanlar: slug, marka, model, sürüm, fiyat, km, ilk tescil, güç, yakıt, şanzıman, kasa tipi, donanım, fotoğraflar, isteğe bağlı spin alanı. Kaynakta olmayan alanı uydurma; boş bırak ve arayüzde o satırı gösterme." — İlgili: data/inventory.json
- **22.10.2026** — "Fotoğraflar: WebP, srcset (kaynak 1440 px ise 1440w ve 800w), bulanık yer tutucu, tembel yükleme. Arka plan değiştirme ve renk filtresi yok." — İlgili: görseller

### Ortak bileşenler ve sayfalar
- **22.10.2026** — "Üst menü: Fahrzeuge, Finanzierung, Ankauf, Kontakt + dil seçici + telefon/WhatsApp." — İlgili: üst menü
- **22.10.2026** — "Footer: iletişim, açılış saatleri, yasal linkler ve küçük bir "Website: Galzura" bağlantısı (galzura.com)." — İlgili: footer
- **22.10.2026** — "İletişim bilgileri yalnız BRIEF.md'den alınır (+43 660 6877002, megacars@live.at). office@meral.at ve +43 660 1999472 hiçbir yerde geçmez." — İlgili: bütün site
- **22.10.2026** — "Güven bölümü: yalnız kaynağı belli, güncel ve doğrulanmış bilgiler (her birinin kaynağını KARAR-DEFTERI'ne yaz) ve galerinin kendi showroom fotoğrafı. "Seit 2002" ifadesi sahibi teyit etmeden kullanılmaz." — İlgili: Startseite güven bölümü
- **22.10.2026** — "Hizmetler: yalnız doğrulanmış olanlar. Teyit bekleyen hizmetleri (ör. Inzahlungnahme) KARAR-DEFTERI'ne "teyit bekliyor" diye yaz." — İlgili: Startseite hizmetler
- **22.10.2026** — "Konum: DSGVO'ya uygun harita (önce statik önizleme, tıklanınca yüklenir), açılış saatleri ve iletişim." — İlgili: Startseite konum
- **22.10.2026** — "Filtreler: Marke, Preis von–bis (en düşük fiyattan başlar), Kilometerstand, Erstzulassung, Kraftstoff, Getriebe, Karosserie. Sıralama da olsun. Filtre durumu adres çubuğunda saklanır; mobilde filtre paneli alttan açılır. Filtre değişince kartlar GSAP Flip ile yumuşakça yeniden dizilir." — İlgili: Fahrzeuge
- **22.10.2026** — "Sayfanın üstünde: spin verisi varsa docs/showroom-v2'deki görüntüleyiciden üretilen 360 bileşeni, yoksa büyük galeri (tam ekran, kaydırma, klavye). Şu an hiçbir araçta spin verisi yok; bileşen hazır dursun, veri gelince kendiliğinden açılsın." — İlgili: Fahrzeug-Detail
- **22.10.2026** — "CTA'lar: Anrufen; WhatsApp (araç adı + fiyat + sayfa linki hazır dolu); Probefahrt anfragen (kısa form → WhatsApp'a hazır mesaj; sahte "gönderildi" ekranı yok)." — İlgili: Fahrzeug-Detail
- **22.10.2026** — "Önizleme adresi girişe kapalıysa (Vercel koruması), ölçümü yerelde production derlemesinde yap ve bunu raporda belirt; Vercel ayarını değiştirme." — İlgili: Lighthouse

### Kayıtlar (CC, kaynaklı) — FAZ 4A uygulaması
> Bu alt bölüm Volkan'ın cümlesi değildir; talimatın istediği kaynak ve lisans kayıtlarıdır.

**Açılış videosu**
- Seçilen: Pexels 6872081 "Footage of sportive car", çeken: Tima Miroshnichenko — https://www.pexels.com/video/footage-of-sportive-car-6872081/ — lisans: Pexels License (https://www.pexels.com/license/; ticari kullanım serbest, atıf zorunlu değil). Gerçek kamera çekimi; yavaş dolly.
- Kontrol (22.10.2026): 10 kare + 1440p kırpım incelendi; sahne kesimi taraması boş (ani kesim yok); yapay zekâ/3D izi görülmedi; aynadaki yazı 1440p'de bile okunmuyor; çamurluktaki bayrak rozeti kadraj dışında bırakıldı (alt %12,5 ve sol %12,5 kırpıldı).
- Kodlama: 25 → 24 fps (%4 yavaşlatma, kare atlanmadı), ileri-geri kesintisiz döngü 22,7 sn (dikiş PSNR 35,9 dB; ardışık iki kare 30,3 dB). Masaüstü 1920×1080 H.264 5,26 MB; mobil 540×960 (dikey) H.264 1,27 MB; WebP poster 36 KB / 12 KB (LCP öğesi). Dosyalar: public/hero/.
- Elenenler: Pexels 6161372 (gövdede kanatlı marka logosu görünüyor, hızlı yakın planlar); Pexels 36282645 (kamera sabit, dolly/pan yok; turuncu jantlı modifiye araç konsepte uymuyor).

**Güven bölümü — gösterilen bilgiler ve kaynakları**
- "Mega Cars Murat Demir e.U., FN 447871 i, Landesgericht Feldkirch": Firmenbuch kaydı (firmeneintrag.creditreform.de; bu defterde 22.10.2026, a) maddesi).
- Adres Radetzkystraße 80, 6845 Hohenems: BRIEF.md + OpenStreetMap way 307149900 "Mega Cars" (Nominatim sorgusu 22.10.2026; 47.3727136, 9.6940083).
- Açılış saatleri Pzt–Cum 08:00–18:00, Cmt 09:00–15:00, Pazar kapalı: Cylex + OpenStreetMap. Öğle arası teyit edilmediği için gösterilmedi.
- "Gewissenhaft - Verlässlich - Professionell": galerinin kendi plaka kapağı (public/cars/mercedes-s-560-4matic/4.webp karesinde okundu).
- Stok sayısı 18 ve fiyat aralığı 23.900–64.900 €: data/inventory.json (son bilinen gerçek stok, Haziran 2026).
- Showroom fotoğrafı: public/cars/mercedes-glc-220-d/4.webp; bina fotoğrafı: public/cars/audi-q3-35-tdi/1.webp (galerinin kendi ilan fotoğrafları).
- Kullanılmadı: AutoScout24 puanı (Haziran 2026 ilan sayfasında "27 Bewertungen, 5 von 5"; 22.10.2026'da bayi profili autoscout24.at/haendler/mega-cars-hohenems "reviewCount 0" gösteriyor, güncel değil). "Seit 2002" kullanılmadı.

**Hizmetler — sitede gösterilenler**
- Showroom'da yerinde inceleme (adres ve saatler doğrulanmış), test sürüşü randevusu WhatsApp/telefonla (Volkan'ın CTA kararı), telefon/WhatsApp/e-posta ile danışma (iletişim bilgileri BRIEF.md).

**Teyit bekliyor (sitede gösterilmedi)**
- Finanzierung ("Wir erstellen Ihre Finanzierung individuell auch OHNE Anzahlung" — galerinin AutoScout24 ilan metni, Haziran 2026).
- Inzahlungnahme, Leasing, Tausch ("Inzahlungnahme, Finanzierung, Leasing oder Tausch möglich" — aynı ilan metni).
- Pazar ve resmî tatil günlerinde inceleme/test sürüşü ("Besichtigungen sowie Probefahrten auch an Sonn- und Feiertagen bei vorheriger Absprache" — aynı ilan metni).
- Wartung und Pflege (Firmenbuch iş kolu kaydında geçiyor; müşteriye hizmet olarak sunulduğu teyit edilmedi).
- +43 660 6877002 numarasının WhatsApp'ta açık olduğu; öğle arası; UID.

**Veri notları**
- Porsche Panamera'nın ilanında kasa tipi "Kleinwagen" yazıyor (ilan hatası); data/overrides.json ile yalnız gizlendi, yerine tahmin yazılmadı. Galeriden teyit bekliyor.
- Liste sıralaması: ilan tarihi verisi olmadığı için "Neueste" yerine varsayılan "Jüngste Erstzulassung zuerst" (DESIGN.md Ek B #7 Volkan onayı bekliyor).
- İkinci telefon +43 660 6969496 FAZ 4A talimatı gereği (yalnız +43 660 6877002 ve megacars@live.at) kullanılmadı.
- Öne çıkanlar şeridi (data/featured.json): S 560, 340i Touring, Panamera, C 220 d Cabrio, A 35 AMG, Range Rover Sport, Octavia — fiyat aralığının tamamını göstermek için seçildi.

## 22.10.2026 — Tasarım yönü yeniden: 3 premium prototip (A / B / C) + önizleme erişimi

### Ret kararı ve gerekçeleri
- **22.10.2026** — "FAZ 4A'nın görsel tasarımı REDDEDİLDİ." — İlgili: bütün site (görsel katman)
- **22.10.2026** — "Açılış alanı, üst bar ve renkler premium hissettirmiyor; site standart bir galeri sitesi gibi duruyor. Hedef Awwwards seviyesi: site, sırf Awwwards'ta ödül almak için yapılmış gibi görsel olarak tatmin edici olmalı." — İlgili: açılış, üst bar, renkler
- **22.10.2026** — "Ana sayfadaki yatay araç şeridi istenmiyor: aşağı kaydırırken sayfa sağa kayıyor." — İlgili: Startseite öne çıkanlar
- **22.10.2026** — "Efektler, geçişler ve slaytlar premium değil. galzura.com'da düğmenin üzerine gelince kepenk iner gibi çok güzel bir geçiş var; bu sitede o bile yok." — İlgili: hareket dili, düğmeler
- **22.10.2026** — "Mobbin kullanılması istenmişti; tasarımda izi görünmüyor." — İlgili: tasarım süreci
- **22.10.2026** — "Site simsiyah; galerilerde canlı kırmızı çok çekici durur." — İlgili: renk
- **22.10.2026** — "Galerinin sahibi sitesini görünce gurur duymalı." — İlgili: bütün site
- **22.10.2026** — "Altyapı (Next.js, diller, veri, sayfa yapısı, filtreler, 360 bileşeni) KORUNUR; değişecek olan görsel katman ve hareket dilidir. DESIGN.md'deki "Die Übergabe" konsepti iptal edildi." — İlgili: DESIGN.md, kod tabanı

### Sınır
- **22.10.2026** — "main'e dokunma. fal.ai ya da başka ücretli iş yok; yapay zekâ ile görsel üretme. Vercel CLI ile elle deploy yok; yayın yalnız v2'ye push ile olur. Uydurma veri yok." — İlgili: bu oturum

### Hemen yapılacaklar
- **22.10.2026** — "Ana sayfadaki yatay araç şeridini (pin'li yatay kaydırma) kaldır; yerine şimdilik basit, dikey bir araç ızgarası koy." — İlgili: Startseite
- **22.10.2026** — "Önizleme erişimi (Volkan onayladı): Vercel'deki "megacars" projesinde Deployment Protection → Vercel Authentication korumasını kapat; amaç önizlemenin telefondan ve paylaşılan linkten girişsiz açılması. Yalnız bu projeye dokun." — İlgili: Vercel proje ayarı (BRIEF'teki "Vercel proje ayarlarını değiştirme" kuralına Volkan'ın verdiği tek istisna)

### Yeni kurallar (bütün yönler için)
- **22.10.2026** — "Hedef: Awwwards Site of the Day seviyesi. Her ekran "bu bir ödül sitesi" dedirtmeli; standart galeri şablonu hissi başarısızlık sayılır." — İlgili: bütün site
- **22.10.2026** — "Renk: Canlı kırmızı ana vurgu rengidir (ör. #E10600 ya da #D7141A çevresinde; düz renk olarak kullanılır, neon ışıltısı yok). Site simsiyah olmaz: bölümler arasında siyah, kırık beyaz/kemik rengi ve kırmızı ile ritim kurulur. Kontrast WCAG AA ile kanıtlanır (siyah zemin üstünde küçük kırmızı yazı yok; kırmızı zemin üstünde beyaz yazı)." — İlgili: renk sistemi
- **22.10.2026** — "Tipografi: karakterli, büyük, iddialı bir başlık fontu (ör. geniş ya da sıkışık grotesk, ya da grotesk + serif eşleşmesi). Yalnız ticari kullanıma açık lisanslı fontlar (OFL ya da Fontshare); lisansı yaz." — İlgili: tipografi
- **22.10.2026** — "Kaydırma her zaman sayfayı aşağı götürür: yatay kaydırma YOK; sayfayı kilitleyen uzun sabitleme (pin) YOK — bir bölüm en fazla bir ekran boyu sabit kalabilir. Kaydırmayla kare kare oynayan açılış ve imleci izleyen küçük görsel önizleme YASAK (Volkan ikisini de daha önce reddetti)." — İlgili: kaydırma, hareket
- **22.10.2026** — "Kepenk hover: galzura.com'daki düğme hover efektini kaynağından bul (C:\Users\90553\Desktop\galzura-motion-demo deposu ve canlı galzura.com). Aynı kalitede ve kırmızı renkle bütün düğmelere ve menü linklerine uygula: imleç üzerine gelince renk paneli kepenk gibi iner ve yazı yuvarlanarak değişir; imleç çıkınca kepenk yukarı toplanır." — İlgili: düğmeler, menü linkleri
- **22.10.2026** — "Hareket dili: her bölümde en az bir etkileyici hareket olur; bounce/spring/elastic yok, 0,3 sn'den hızlı animasyon yok. Kullanılacaklar: sayaçlı sinematik açılış yükleyicisi (yalnız ilk ziyarette, LCP'yi geciktirmeden); sayfa geçişlerinde kırmızı perde (curtain) geçişi; başlıklarda maskeli / split-text açılış; görsellerde clip-path ile açılan reveal'lar; slaytlarda perde ya da maske ile premium geçişler (sıradan kaydırma değil); manyetik CTA; hover'da "Ansehen" yazan özel imleç (görsel önizlemesiz); gerçek veriden sayı sayaçları; ince grain dokusu." — İlgili: hareket sistemi
- **22.10.2026** — "Bileşen kaynakları: Animmaster kütüphanesi (C:\Users\90553\Downloads\300 Awwwards components.zip; katalog C:\Users\90553\Desktop\olgun-foods\GALZURA_BILESEN_KATALOG.md): bu sefer seçtiğin bileşenleri zip'ten gerçekten çıkar ve kullan. Mobbin MCP: header, mobil menü, araç kartı, filtre, araç detay ve sabit iletişim çubuğu için en az 6 ekran örneği bul; hangi örnekten neyi aldığını yaz. Awwwards'ın otomotiv kategorisindeki ödüllü sitelerden ve galzura.com'un hareket kalitesinden (hasib.site çizgisi) referans al." — İlgili: bileşenler, referanslar
- **22.10.2026** — "Gerçek araç fotoğrafları 1440 px genişliğinde: 1440 px'ten büyük, bulanık tam ekran fotoğraf yok. Tam ekran alanlarda video ya da tipografi kullan; fotoğraflar çerçeveli ve keskin dursun." — İlgili: fotoğraf sunumu
- **22.10.2026** — "Mobil birinci sınıf: her efektin mobil karşılığı tasarlanır; mobilde de premium his korunur." — İlgili: mobil

### Üç prototip
- **22.10.2026** — "Aynı içerikle (gerçek 18 aracın verisi ve fotoğrafları) birbirinden belirgin biçimde farklı üç tasarım yönü yap. Her prototip şunları içerir: açılış yükleyicisi; üst bar (kepenk hover'lı menü + dil seçici + telefon); açılış bölümü (hero); öne çıkan araçlar bölümü (dikey); bir hizmetler/güven bölümü; araç kartı hover'ı; karttan araç detayına kırmızı perde geçişi ve detay sayfasının ilk ekranı; footer'ın üst kısmı; mobil menü. Metinler Almanca ve Türkçe." — İlgili: /de/prototyp
- **22.10.2026** — "Yön A — "Rosso": siyah + canlı kırmızı + beyaz; büyük, iddialı, sportif. Açılışta galerinin gerçek araçlarından oluşan premium bir slayt gösterisi (kırmızı perde/maske geçişleri, dev model adları)." — İlgili: /de/prototyp/a
- **22.10.2026** — "Yön B — "Atelier": kırık beyaz/kemik zemin + siyah tipografi + kırmızı vurgu; lüks dergi düzeni, bol boşluk, büyük tipografi. Araçlar dergi sayfası gibi sunulur." — İlgili: /de/prototyp/b
- **22.10.2026** — "Yön C — "Nachtfahrt": sinematik ve dramatik; koyu ağırlıklı, ama kırmızı ve kırık beyaz bölümlerle ritim kurulur (kırmızı düz renk, neon değil). Açılış videosu dev "MEGA CARS" harflerinin içinden görünür; kaydırınca harfler açılır (dikey, sayfayı kilitlemeden)." — İlgili: /de/prototyp/c
- **22.10.2026** — "Prototipler mevcut Next.js uygulamasında ayrı adreslerde olsun (/de/prototyp/a, /de/prototyp/b, /de/prototyp/c ve /tr karşılıkları). Bir karşılaştırma sayfası (/de/prototyp) üçüne link versin. Prototip sayfaları noindex olsun." — İlgili: rotalar

### Kalite kapısı ve kapanış
- **22.10.2026** — "Her prototipi masaüstünde (1440 ve 2560 px) ve mobilde (390 px) ekran görüntüsü ve kısa ekran kaydıyla incele. Seçtiğin 2 Awwwards otomotiv sitesinin ekran görüntüleriyle yan yana koy. "Standart galeri şablonu gibi mi duruyor?" sorusuna dürüst cevap ver; cevap evetse düzelt." — İlgili: kalite kontrolü
- **22.10.2026** — "Çizgi film testi: neon, bounce, ucuz parıltı ya da jenerik Dribbble hissi varsa kaldır." — İlgili: kalite kontrolü
- **22.10.2026** — "Konsol hatası 0 olsun; prefers-reduced-motion açıkken animasyonlar kapalı olsun; yatay taşma olmasın." — İlgili: kalite kontrolü
- **22.10.2026** — "Sonra DUR. Volkan bir yön seçene kadar siteyi yeniden kurma." — İlgili: faz sırası

## 22.10.2026 23:57 — Yön seçildi: "C — Nachtfahrt"; FAZ 4 yeniden kurulum, 1. aşama (talimat 23.10.2026)

### Karar
- **22.10.2026 23:57** — "Üç prototipten "C — Nachtfahrt" seçildi. Bütün site bu yönle, Awwwards Site of the Day seviyesinde yeniden kurulacak." — İlgili: bütün site, DESIGN.md
- **22.10.2026 23:57** — "Tek değişiklik isteği: açılış videosundaki araç çok daha etkileyici, KIRMIZI bir araç olmalı. Volkan Maserati Alfieri ya da o ölçekte kırmızı bir araç istedi." — İlgili: Startseite açılış videosu
- **23.10.2026** — "Bu kararı KARAR-DEFTERI'ne tarihiyle yaz. DESIGN.md'yi C yönünün tasarım sistemiyle baştan yaz (renk token'ları, fontlar ve lisansları, ölçekler, hareket kuralları, bileşenler); eski konsept metinleri silinsin." — İlgili: DESIGN.md

### Sınır
- **23.10.2026** — "main'e dokunma. fal.ai ya da başka ücretli iş yok; yapay zekâ ile görsel ya da video üretme. Vercel CLI ile elle deploy yok; yayın yalnız v2'ye push ile olur. Uydurma veri yok. BRIEF.md ve KARAR-DEFTERI.md'deki bütün kurallar geçerli: kırmızı vurgu, yatay kaydırma yok, en fazla bir ekran boyu pin, kepenk hover, kırmızı perde geçişi, bounce yok, 0,3 sn'den hızlı animasyon yok, imleci izleyen görsel önizleme yok, kare kare oynayan açılış yok, 1440 px'ten büyük bulanık fotoğraf yok." — İlgili: bu aşama

### 1) Açılış videosu: kırmızı araç
- **23.10.2026** — "Önce en fazla 5 dakika içinde, Maserati Alfieri'nin ticari kullanıma açık, GERÇEK kamera çekimi olan bir videosu var mı kontrol et. Varsa 3 adaydan biri o olsun. Yoksa bunu rapora yaz ve devam et. Alfieri'yi yapay zekâyla üretmek YASAK." — İlgili: açılış videosu
- **23.10.2026** — "Pexels, Pixabay, Coverr ya da Mixkit'te ticari kullanıma açık, GERÇEK kamera çekimi (yapay zekâ ya da 3D değil) toplam 3 aday bul: Araç kırmızı, premium bir spor ya da GT araç olsun: Porsche 911, Mercedes-AMG GT, Audi R8 ya da BMW M sınıfı; Mega Cars'ın sattığı markalar öncelikli. Işık sinematik olsun: karanlık, gece ya da stüdyo ışığı. Kamera yavaş hareket etsin: dolly, push-in ya da yumuşak pan. En az 8 saniyelik kesintisiz bir bölüm olsun; tercihen 4K." — İlgili: açılış videosu adayları
- **23.10.2026** — "Her adayı en az 8 kareyle kontrol et: logo, rozet ve plaka okunmayacak (gerekirse kadrajı kırp); yapay zekâ ya da 3D izi, ani kesim ve insan yüzü olmayacak. Her adayın kaynak linkini ve lisansını KARAR-DEFTERI'ne yaz." — İlgili: aday kontrolü
- **23.10.2026** — "Video harflerin içinde iyi okunmalı: kırmızı boya ve ışık yansımaları dev "MEGA CARS" harflerinin içini doldurmalı." — İlgili: harf maskesi
- **23.10.2026** — "Üç adayı aynı harf maskesi içinde yan yana gösteren bir sayfa yap: /de/prototyp/hero-adaylari (noindex). Siteye şimdilik en iyi adayı koy; Volkan seçince video tek değişiklikle değişebilsin." — İlgili: /de/prototyp/hero-adaylari
- **23.10.2026** — "Kodlama: masaüstü 1920 px (en fazla 6 MB) + mobil 960 px (en fazla 2,5 MB) H.264 MP4 + WebP poster (LCP öğesi); döngü kesintisiz olsun." — İlgili: public/hero

### 2) Tasarım sistemi ve ortak bileşenler
- **23.10.2026** — "C'nin renkleri (koyu ağırlık + kemik rengi ve kırmızı bölümler), fontları (Unbounded + Hanken Grotesk, OFL) ve hareket dili bütün sayfalara uygulanır." — İlgili: bütün site
- **23.10.2026** — "Bütün sitede şunlar olur: bütün düğme ve menü linklerinde kepenk hover (galzura-motion-demo'dan uyarlanan components/proto/Shutter.tsx); bütün sayfa geçişlerinde kırmızı perde; ilk ziyarette sayaçlı sinematik yükleyici (LCP'yi geciktirmeden); "Ansehen" yazan özel imleç (görsel önizlemesiz); manyetik CTA; başlıklarda maskeli / split-text açılış; görsellerde clip-path reveal; gerçek veriden sayı sayaçları; ince grain dokusu; masaüstünde Lenis." — İlgili: ortak hareket sistemi
- **23.10.2026** — "Üst bar, mobil menü, footer, mobil alt eylem çubuğu (Anrufen · WhatsApp · Probefahrt) ve yüzen WhatsApp + en üste çık düğmesi C diliyle yeniden tasarlanır." — İlgili: ortak bileşenler
- **23.10.2026** — "Prototip kodu ürün koduna taşınır; prototip/ klasöründe kalmaz. A ve B prototipleri ve karşılaştırma sayfası kaldırılır (git geçmişinde kalırlar). /prototyp/hero-adaylari sayfası Volkan seçim yapana kadar kalır." — İlgili: components/proto, app/[locale]/prototyp

### 3) Ana sayfa
- **23.10.2026** — "C prototipindeki açılış korunur ve son kaliteye getirilir: video dev "MEGA CARS" harflerinin içinde oynar; aşağı kaydırınca harfler açılır ve sayfa kilitlenmez." — İlgili: Startseite açılış
- **23.10.2026** — "Ardından bu sırayla: 1. Hızlı arama: Marke · Preis bis · Karosserie ve gerçek sayıyı gösteren "… Fahrzeuge anzeigen" düğmesi. 2. Öne çıkan araçlar: dikey, clip-path reveal'lı. 3. İnce bir marka şeridi: yalnız stokta olan markalar. 4. Güven bölümü: yalnız kaynağı belli, güncel bilgiler ve galerinin kendi showroom fotoğrafı. 5. Hizmetler: yalnız doğrulanmış olanlar. 6. Konum: DSGVO'ya uygun, tıklanınca yüklenen harita; açılış saatleri; iletişim." — İlgili: Startseite bölüm sırası
- **23.10.2026** — "Her bölümde en az bir etkileyici hareket olsun; bölümler arasında koyu / kemik rengi / kırmızı ritim kurulsun." — İlgili: Startseite

### 4) Araç listesi
- **23.10.2026** — "Filtre çubuğu ve filtre çipleri kepenk hover'lı olsun; mobilde filtre paneli alttan açılsın." — İlgili: Fahrzeuge filtre
- **23.10.2026** — "Kartlar clip-path reveal ile gelsin. Kart hover'ında fotoğraf kendi çerçevesinde 1.04 büyüsün, kırmızı bir çizgi çizilsin ve imleçte "Ansehen" görünsün." — İlgili: araç kartı
- **23.10.2026** — "Filtre değişince kartlar GSAP Flip ile yeniden dizilsin; sonuç sayısı sayaçla değişsin." — İlgili: Fahrzeuge
- **23.10.2026** — "Sıralama: varsayılan "Empfohlen" (data/inventory.json sırası, öne çıkanlar başta). Ek seçenekler: Preis aufsteigend, Preis absteigend, Kilometerstand aufsteigend, Erstzulassung neueste zuerst, Erstzulassung älteste zuerst. İlan tarihi verisi olmadığı için "Neueste" etiketi kullanılmaz." — İlgili: Fahrzeuge sıralama

### 5) Araç detay
- **23.10.2026** — "Prototiplerde detay sayfası üç yönde aynı iskeletteydi; bu kez C'ye özgü tasarla." — İlgili: Fahrzeug-Detail
- **23.10.2026** — "Karttan gelişte kırmızı perde insin ve fotoğraf büyüyerek sahneye yerleşsin; dev model adı (Unbounded) ve fiyat sayaçla gelsin." — İlgili: kart → detay
- **23.10.2026** — "Temel bilgiler (Erstzulassung, Kilometerstand, Leistung, Kraftstoff, Getriebe, Karosserie) büyük rakamlı, sinematik bir "teknik kart" olarak dursun ve kaydırınca sırayla açılsın." — İlgili: teknik kart
- **23.10.2026** — "Galeri: fotoğraflar arasında maske ya da perde geçişi, küçük resim şeridi ve tam ekran görünüm (klavye ve kaydırma ile)." — İlgili: detay galerisi
- **23.10.2026** — "360 bileşeni yerinde dursun; spin verisi gelince kendiliğinden açılsın." — İlgili: 360 görüntüleyici
- **23.10.2026** — "Eylem alanı masaüstünde yanda yapışkan, mobilde altta dursun: Anrufen; WhatsApp (araç adı + fiyat + link hazır dolu); Probefahrt anfragen (kısa form → WhatsApp'a hazır mesaj; sahte "gönderildi" ekranı yok)." — İlgili: eylem alanı
- **23.10.2026** — "Donanım listesi dergi düzeninde dursun; benzer araçlar clip-path reveal ile gelsin." — İlgili: donanım, benzer araçlar

### 6) Diğer sayfalar
- **23.10.2026** — "Finanzierung, Ankauf, Kontakt & Über uns, Impressum ve Datenschutz şimdilik geçici sayfa olarak kalır, ama C diliyle giydirilir (başlık + gerçek iletişim bilgileri). Bu sayfaların içerikleri, formları ve İngilizce dil 2. aşamada yapılacak. Bu aşamada metinler Almanca ve Türkçe olacak; uzman tercüman seviyesinde ve yüklemli tam cümlelerle yazılacak." — İlgili: geçici sayfalar

### 7) Performans ve kalite kapısı
- **23.10.2026** — "Hız hedefleri (önizleme adresinde, her sayfa için 3 ölçümün ortancası): Lighthouse mobilde ana sayfa, liste ve detay için LCP < 3,0 sn. Mobil Performans ≥ 80, masaüstü ≥ 85; CLS < 0,1; ilk yük JS < 300 KB (gzip). LCP öğesi opacity 0'dan başlayan bir animasyonun arkasında beklemesin; kritik olmayan JS sonradan yüklensin." — İlgili: performans
- **23.10.2026** — "390 / 1440 / 2560 px'te ekran görüntüsü ve kısa ekran kaydı al. Konsol hatası 0 olsun; yatay taşma olmasın; prefers-reduced-motion açıkken animasyonlar kapansın; klavyeyle gezinme çalışsın." — İlgili: kalite kapısı
- **23.10.2026** — "Seçtiğin 2 Awwwards otomotiv sitesiyle yan yana koy. "Standart galeri şablonu gibi mi duruyor?" sorusuna dürüst cevap ver; cevap evetse düzelt. Çizgi film testi yap: neon, bounce ya da ucuz parıltı olmasın." — İlgili: kalite kapısı

### 8) Yayın ve rapor
- **23.10.2026** — "Anlamlı commit'lerle (feat:, fix:, perf:, a11y:) v2'ye push et. Sabit önizleme adresinde yeni sitenin ve hero adayları sayfasının girişsiz açıldığını doğrula. Ana sayfayı ve hero adayları sayfasını Volkan'ın tarayıcısında aç." — İlgili: yayın
- **23.10.2026** — "En fazla 15 satırlık kısa Türkçe rapor ver ... Her maddede [DOĞRULANDI]+kaynak / [VARSAYIM] / [BİLMİYORUM] etiketi olsun. Sonra DUR." — İlgili: rapor

### Kayıtlar (CC, kaynaklı) — 1. aşama uygulaması
> Bu alt bölüm Volkan'ın cümlesi değildir; talimatın istediği kaynak, lisans ve kontrol kayıtlarıdır.

**Maserati Alfieri kontrolü (≈ 5 dk, 23.10.2026): bulunamadı.** Pexels ("maserati", "maserati alfieri"), Pixabay, Coverr ve Mixkit'te Alfieri'nin gerçek kamera çekimi yok; genel aramada yalnız 2014 tarihli haber siteleri videoları (ticari lisans yok) çıktı. Maserati'nin basın sitesi media.stellantis.com kullanım koşulları sayfası 403 verdi; ticari lisans doğrulanamadığı için kullanılmadı. Yapay zekâyla üretim yapılmadı.

**Sonuç:** Dört arşivde "kırmızı + premium marka + karanlık/stüdyo ışığı + yavaş kamera + ≥ 8 sn + okunur rozet yok" koşullarının hepsini aynı anda karşılayan gerçek çekim bulunamadı. Aşağıdaki üç aday gerçek çekimdir; her birinin bir eksiği vardır.

**A — siteye konan aday (lib/hero.ts `HERO_ACTIVE = 'a'`)**
- Mixkit 63 "Close up of red sports car", marcolopez — https://mixkit.co/free-stock-video/close-up-of-red-sports-car-63/ — lisans: Mixkit Stock Video Free License (https://mixkit.co/license/#videoFree; ticari kullanım serbest, atıf zorunlu değil).
- Araç: Mazda MX-5 (ND), kırmızı; premium değil. Karanlık garaj, slider ile yavaş kayış (stop lambasından kapı koluna). Kaynak 3840×2160, 24 fps, 12,3 sn; sahne kesimi yok (en yüksek sahne puanı 0,037; eşik 0,30). Kırmızı boya karenin ≈ %80'i (harfleri en iyi dolduran aday).
- Kontrol: 10 kare + tam çözünürlük üst şerit; rozet, plaka ve insan yüzü yok (üst kenardaki bulanık şekiller aracın iç mekânı); stop lambası biçimi meraklı biri için tanınabilir; yapay zekâ/3D izi yok.
- Kodlama: 0–10 sn, ileri + geri döngü 19,9 sn (dikiş PSNR 26,26 dB = normal kare adımı 26,26 dB). Masaüstü 1920×1080 H.264 5,24 MB; mobil 540×960 (dikey kırpım) 2,15 MB; WebP poster 41 KB / 15 KB. Dosyalar: public/hero/a/.

**B**
- Mixkit 74 "Red sports car", franklandgrave — https://mixkit.co/free-stock-video/red-sports-car-74/ — lisans: Mixkit Stock Video Free License.
- Araç: Mazda MX-5 (ND); premium değil. Karanlık garaj, alçak açıdan yavaş kayış; koyu kırmızı. 3840×2160, 24 fps, 10,2 sn, kesim yok.
- Kontrol: jant göbeğinde Mazda amblemi okunuyor (kaynakta yüksekliğin ≈ %80'inde) → kadraj üst %69'la sınırlandı (masaüstü kırpım 2667×1500, mobil 844×1500); kırpılmış çıktıda 6 noktada tam çözünürlükte amblem görünmediği doğrulandı. Plaka ve yüz yok.
- Kodlama: ileri + geri döngü 19,9 sn (dikiş PSNR 35,0 dB; normal adım 35,6 dB). Masaüstü 5,21 MB; mobil 2,18 MB; poster 31 KB / 8 KB. public/hero/b/.

**C**
- Pexels 33374869 "Luxurious Red Sports Car on Urban Street", Igor Vieira — https://www.pexels.com/video/luxurious-red-sports-car-on-urban-street-33374869/ — lisans: Pexels License (https://www.pexels.com/license/; ticari kullanım serbest, atıf zorunlu değil).
- Araç: Chevrolet Corvette C8, kırmızı (tek premium aday); yan hava girişi yakın planı; amblem görünmüyor. Ama bulutlu gün ışığı ve sabit kamera; arka planda trafik ışığı ve kasklı bir motosikletli (yüz görünmüyor). 3840×2160, 23,976 fps, 8,6 sn, kesim yok.
- Kodlama: arka plandaki trafik geri gitmesin diye ileri-geri değil, 1 sn çapraz geçişli döngü 7,6 sn (dikiş PSNR 37,4 dB; normal adım 37,2 dB). Masaüstü 5,19 MB; mobil 2,15 MB; poster 65 KB / 21 KB. public/hero/c/.

**Elenenler (özet; ayrıntı ve kareler _work/faz4c/video/, repoya girmez)**
- Pexels 29498796–29498827 (Michael Pronin) kırmızı Ferrari F50 + GMA T.50: görünüm ideal ama 3D render (kusursuz siyah boşluk, parlayan camgöbeği yansıma, aynı serideki nadir araç eşleşmesi); Ferrari amblemi ve "F50" yazısı okunuyor.
- Pexels 5309351 (Ferrari 812, 720p, gün ışığı, amblem), 39810055 (turuncu GT86 benzeri), 10807128 / 30794587 / 33374862–68 (gün ışığı, kesim ya da plaka), 13358188 (3 sn dikey), 25397940 ve diğer dikey klipler; Pixabay 152184 / 230482 / 314039 (CGI), 347290 ("AI generated" etiketli), 93252 (yeşil perde); Coverr'daki kırmızı premium klipler (kendi verisinde yapay zekâ işaretli), BMW M4 arkası (gün ışığı, amblem); Mixkit 35576/35577 (CGI görünümlü, Restricted lisans), 49 (7,96 sn), 66 (araç kadrajda çok küçük).

**Volkan için not:** Gerçek, karanlık, kırmızı ve premium bir açılış istenirse yol ya ücretli lisans ya da galerinin kendi aracıyla kısa bir çekimdir; ikisi de Volkan onayı gerektirir.

**Başka kayıtlar**
- Sıralama "Empfohlen": data/featured.json sırası, sonra data/inventory.json sırası (lib/inventory.ts `rankOf`). Eski "?sort=year" bağlantısı "Erstzulassung neueste zuerst" olarak okunur.
- Güven bölümündeki "Gewissenhaft. Verlässlich. Professionell." galerinin kendi plaka kapağından (public/cars/mercedes-s-560-4matic/4.webp; FAZ 4A kaydı).
- Detay sayfasında "Der Preis stammt aus dem Inserat." yazılır; KDV ya da pazarlık durumu bilinmediği için yazılmaz.
- Hizmetler: yalnız Besichtigung, Probefahrt, Beratung (FAZ 4A'da doğrulananlar); Finanzierung, Inzahlungnahme, Leasing hâlâ "teyit bekliyor".

## 23.10.2026 — Açılış videosu değişimi (Corvette C8) + 2. aşama talimatı

### Çalışma kuralı ve sınır
- **23.10.2026** — "Önceki oturumda bilgisayarın belleği doldu ve arka plan işleri durduruldu. Bu oturumda aynı anda yalnız tek bir ağır iş çalıştır: geliştirme sunucusu, production sunucusu ve Lighthouse aynı anda açık olmasın. Ölçümleri mümkün olduğunca önizleme adresinde yap; iş bitince açtığın sunucuları kapat." — İlgili: çalışma düzeni
- **23.10.2026** — "main'e dokunma. fal.ai ya da başka ücretli iş yok; yapay zekâ ile görsel ya da video üretme. Vercel CLI ile elle deploy yok; yayın yalnız v2'ye push ile olur. Uydurma veri yok. BRIEF.md, KARAR-DEFTERI.md ve DESIGN.md'deki bütün kurallar geçerli." — İlgili: bu oturum

### 1) Açılış videosu: Corvette C8
- **23.10.2026** — "AÇILIŞ VİDEOSU: CORVETTE C8 (Volkan seçti, 23.10.2026)" — "lib/hero.ts'de açılış videosunu Pexels 33374869 (Corvette C8, Pexels License) adayına çevir." — İlgili: lib/hero.ts, public/hero
- **23.10.2026** — "Video gündüz çekilmiş ve kamera sabit. Premium ve sinematik görünmesi için: Doğal kalan, koyu ve sinematik bir renk düzeni uygula: gölgeleri derinleştir, parlak alanları bastır, kırmızıyı doygun ama doğal tut, hafif vinyet ekle. Gece taklidi yapma. Sonucu orijinaliyle yan yana karşılaştır; doğal durmuyorsa daha hafif bir düzen kullan." — İlgili: açılış videosu renk düzeni
- **23.10.2026** — "Sabit kamera hissini kırmak için video çok yavaş yakınlaşsın (ör. 12 saniyede %6). Kaynak çözünürlüğü yakınlaşmada görüntüyü yumuşatıyorsa yakınlaşmayı görüntünün keskin kaldığı sınırda tut." — İlgili: açılış videosu yakınlaşma
- **23.10.2026** — "Logo, rozet ve plaka okunmayacak; gerekirse kadrajı kırp. En az 8 kareyle yeniden kontrol et." — İlgili: açılış videosu kontrolü
- **23.10.2026** — "Kodlama: masaüstü 1920 px (en fazla 6 MB), mobil 960 px (en fazla 2,5 MB), WebP poster (LCP öğesi), kesintisiz döngü. Mobil LCP 3,0 sn'nin altında kalsın." — İlgili: public/hero
- **23.10.2026** — "/prototyp/hero-adaylari sayfasını kaldır (git geçmişinde kalır)." — İlgili: /de/prototyp/hero-adaylari
- **23.10.2026** — "Bu bölüm bitince HEMEN commit'le, v2'ye push et ve ana sayfayı Volkan'ın tarayıcısında aç. Volkan yeni açılışa bakarken sen 2. bölüme geç." — İlgili: yayın sırası

### 2) 2. aşama: kalan sayfalar, İngilizce, SEO
- **23.10.2026** — "Bütün sayfalar C diliyle ve aynı kalitede olacak (kepenk hover, kırmızı perde, maskeli başlıklar, clip-path reveal'lar). Sitede yalnız kaynağı belli, doğrulanmış bilgi yer alır. Teyit bekleyen her bilgiyi KARAR-DEFTERI'nde "teyit bekliyor" diye listele; Gökhan'dan cevap gelince açılacak." — İlgili: bütün sayfalar
- **23.10.2026** — "Kontakt & Über uns: Doğrulanmış iletişim bilgileri (BRIEF.md'den). Açılış saatleri: Pazartesi–Cuma 08:00–18:00, Cumartesi 09:00–15:00, Pazar kapalı. Öğle arası teyit bekliyor; yazılmaz. DSGVO'ya uygun, tıklanınca yüklenen harita. İletişim formu: gönderim gerçek olsun (WhatsApp'a hazır mesaj ve e-posta); sahte "gönderildi" ekranı yok. "Über uns" metni yalnız doğrulanmış bilgilerle yazılır; "seit 2002" sahibi teyit etmeden kullanılmaz." — İlgili: Kontakt & Über uns
- **23.10.2026** — "Finanzierung: Faiz oranı, banka ortağı ya da koşul uydurulmaz. Sayfa bir finansman talep formu ve sade bir açıklamadan oluşur. Galerinin finansman sunduğunu kaynağıyla doğrulayabiliyorsan (ör. galerinin Facebook sayfasındaki tanıtım metni) sayfayı menüde göster; doğrulayamıyorsan sayfayı hazırla ama menüden ve sitemap'ten gizli tut." — İlgili: Finanzierung
- **23.10.2026** — "Ankauf / Inzahlungnahme: teyit bekliyor. Sayfayı form dahil hazırla, ama menüden ve sitemap'ten gizli tut; teyit gelince tek ayarla açılabilsin." — İlgili: Ankauf
- **23.10.2026** — "Impressum: Avusturya ECG §5, UGB §14 ve MedienG §25'e göre ve yalnız doğrulanmış bilgilerle yaz: Mega Cars Murat Demir e.U., Firmenbuch FN 447871 i, Landesgericht Feldkirch, adres, telefon, e-posta. Yetkili ticaret makamı ve meslek odası bilgisini resmî kaynaktan (ör. WKO Firmen A-Z) doğrula. UID bilinmiyor; sitede boş yer tutucu gösterilmez, eksik olarak KARAR-DEFTERI'ne yazılır." — İlgili: Impressum
- **23.10.2026** — "Datenschutz: DSGVO'ya uygun ve sitenin GERÇEKTEN kullandığı teknolojilere göre yaz: barındırma (Vercel), fontlar, harita sağlayıcısı, WhatsApp ve e-posta bağlantıları, varsa çerezler. Sitede olmayan bir hizmetten bahsetme. Çerez kullanılmıyorsa bunu yaz ve çerez bandı koyma." — İlgili: Datenschutz
- **23.10.2026** — "İngilizce: Bütün sayfaları İngilizce olarak ekle; dil seçicide DE · EN · TR görünsün. Üç dilde de metinler uzman tercüman seviyesinde ve yüklemli tam cümlelerle yazılır." — İlgili: i18n, dil seçici
- **23.10.2026** — "Araç listesi: Önceki raporda "standart bir ilan ızgarasına en yakın ekran" olarak işaretlendi. C dilinde daha özgün hâle getir (ör. sayaçlı, büyük tipografili liste başlığı; filtre çubuğunun daha karakterli tasarımı; kartların daha sinematik sunumu). Kullanım kolaylığı ve filtrelerin çalışması bozulmasın." — İlgili: Fahrzeuge
- **23.10.2026** — "SEO hazırlığı (site canlıya çıkana kadar noindex kalır): Her sayfada generateMetadata (title, description, OG, Twitter). hreflang'li sitemap.xml. robots.txt şimdilik engelli olsun; canlıya geçişte tek ayarla açılabilsin. JSON-LD: AutoDealer (yalnız doğrulanmış bilgiler), her araç için Car + Offer, BreadcrumbList. Her araç için gerçek fotoğrafından üretilen OG görseli; mutlak OG adresleri ve bir yedek OG görseli." — İlgili: SEO

### 3) Kalite kapısı ve teslim kontrolü
- **23.10.2026** — "Lighthouse mobil ve masaüstü: bütün sayfa tipleri için önizleme adresinde, her biri 3 ölçümün ortancası; ölçümleri tek tek çalıştır, aynı anda değil. Hedefler: mobil Performans ≥ 80, masaüstü ≥ 85, mobil LCP < 3,0 sn, CLS < 0,1, INP < 200 ms, ilk yük JS < 300 KB (gzip). Sonuçları docs/LIGHTHOUSE.md'ye yaz." — İlgili: docs/LIGHTHOUSE.md
- **23.10.2026** — "390 / 1440 / 2560 px'te kontrol et. Konsol hatası 0 olsun; yatay taşma olmasın; prefers-reduced-motion açıkken animasyonlar kapansın; klavyeyle gezinme çalışsın. Bütün düğmelerde ve yalnız ikonlu linklerde aria-label olsun; kontrast WCAG AA'yı karşılasın." — İlgili: kalite kapısı
- **23.10.2026** — "docs/TESLIM-KONTROL.md: Galzura teslim listesini madde madde doldur: Lighthouse; WebP + srcset; premium düğmeler; her bölümde hareket; reduced-motion; DE/EN/TR %100; konsol; robots + sitemap + favicon + OG; /cars ve /hero için 1 yıl immutable önbellek; Vercel'in GitHub'a bağlı otomatik yayını. Eksik kalan her maddeyi nedeniyle yaz (ör. güncel stok ve 360 çekimi bekleniyor)." — İlgili: docs/TESLIM-KONTROL.md

### 4) Yayın ve rapor
- **23.10.2026** — "Anlamlı commit'lerle (feat:, fix:, perf:, a11y:, docs:) v2'ye push et; main'e dokunma. Sabit önizleme adresinde bütün yeni sayfaların girişsiz açıldığını doğrula." — İlgili: yayın
- **23.10.2026** — "En fazla 15 satırlık kısa Türkçe rapor ver ... Her maddede [DOĞRULANDI]+kaynak / [VARSAYIM] / [BİLMİYORUM] etiketi olsun. Sonra DUR." — İlgili: rapor

### Kayıtlar (CC, kaynaklı) — açılış videosu uygulaması
> Bu alt bölüm Volkan'ın cümlesi değildir; talimatın istediği kaynak, lisans ve kontrol kayıtlarıdır.

- **Film:** Pexels 33374869 "Luxurious Red Sports Car on Urban Street", Igor Vieira — https://www.pexels.com/video/luxurious-red-sports-car-on-urban-street-33374869/ — lisans: Pexels License (https://www.pexels.com/license/; ticari kullanım serbest, atıf zorunlu değil). Kaynak 3840×2160, 23,976 fps, 8,6 sn; sahne kesimi yok. `lib/hero.ts` artık yalnız bu filmi tanımlar.
- **Renk düzeni (ffmpeg, betik `_work/faz5/encode_c8.py`):** eğri 0→0 · 0,10→0,055 · 0,30→0,235 · 0,55→0,49 · 0,80→0,73 · 1→0,88 (gölgeler derinleşir, en parlak değer %88'e iner); kırmızılarda göreli −%10 camgöbeği (kırmızı doygun kalır); genel doygunluk 0,94; gölgede çok hafif soğuk, parlakta çok hafif sıcak denge (±0,02); vinyet açısı 0,52 rad. Ortalama parlaklık 93 → 65 (0–255), en parlak piksel 251 → 207: gündüz ışığı korunur, gece taklidi yok. Orijinal + hafif düzen (G2) + bu düzen (G1) iki karede yan yana karşılaştırıldı (`_work/faz5/grade/cmp_0.1.jpg`, `cmp_4.3.jpg`); G2 düz ve sönük durduğu için G1 seçildi.
- **Yakınlaşma:** CSS `.hl-push`, 12 sn'de %6 (1 → 1,06, `--ease-film`, ileri-geri sonsuz), reduced motion'da kapalı. Keskinlik ölçümü (Laplace varyansı, 4K kaynaktan doğrudan üretilen görüntüye oranla): 1920 px dosya 1,06× büyütmede %90, 1,12×'te %85, 1,19×'te %80 ayrıntı korur. Kaydırma yakınlaşmasının taban ölçeği 1,12'den 1,06'ya indirildi; böylece en büyük büyütme eskisi gibi ≈ 1,12 kalır (1440 ve 1536 px ekranlarda film hiç büyütülmez, 1920 px'te en çok 1,12×).
- **Kontrol (23.10.2026):** 8 tam çözünürlük kaynak karesi (0,1 / 1,5 / 3,2 / 4,3 / 5,4 / 6,6 / 7,6 / 8,4 sn) + her iki çıktıdan 10'ar kare. Arka plan sığ alan derinliğiyle bulanık: arkadaki beyaz SUV'un ve motosikletin plakası okunmuyor; motosikletlinin kaskı var, yüz görünmüyor; sırt çantasındaki beyaz şekil okunmuyor; aracın amblemi ve jant göbekleri kadraj dışında. Yapay zekâ/3D izi yok.
- **Kodlama:** 1 sn çapraz geçişli döngü 7,58 sn (dikiş PSNR 38,15 dB; normal kare adımı 38,10 dB). Masaüstü 1920×1080 H.264 5,20 MB (sınır 6); mobil 540×960 dikey kırpım (kaynakta x 1000–2215) 2,17 MB (sınır 2,5); WebP poster 58 KB / 18 KB (LCP öğesi). Dosyalar yeni klasörde: `public/hero/c8/` (/hero/* bir yıl immutable önbellekte; aynı adın üzerine yazılmaz).
- **Kaldırılanlar:** `/de/prototyp/hero-adaylari` sayfası, `heroCandidates` metinleri, `public/hero/a|b|c` (git geçmişinde kalır).

### Kayıtlar (CC, kaynaklı) — 2. aşama uygulaması
> Bu alt bölüm Volkan'ın cümlesi değildir; talimatın istediği kaynak ve teyit kayıtlarıdır. Erişim tarihi: 23.10.2026.

**Impressum — kullanılan bilgiler ve kaynakları**
- Firma "Mega Cars Murat Demir e.U.", FN 447871 i, Landesgericht Feldkirch: BRIEF.md (creditreform). EVI (https://www.evi.gv.at/f/447871i): "Rechtsform Einzelunternehmer", "Eintragungsdatum 02.03.2016", "Geschäftszweig Handel sowie Wartung und Pflege von Kraftfahrzeugen" → sitede Unternehmensgegenstand olarak yazıldı. Not: BRIEF'te e.U. kaydı 02.02.2016 yazıyor, EVI 02.03.2016 diyor (sitede tarih kullanılmadı).
- WKO Firmen A-Z (https://firmen.wko.at/murat-demir/vorarlberg/?firmaid=f0566b38-748b-4a4f-a50f-c55be0944a1e): "Handelsgewerbe mit Ausnahme der reglementierten Handelsgewerbe", "Berufszweig Einzelhandel mit Automobilen", "LG Fahrzeughandel", "Behörde gem. ECG (E-Commerce Gesetz) Bezirkshauptmannschaft Dornbirn", "GISA-Zahl 38931796", "Seit 20.10.2025".
- GISA resmî çıktısı (https://www.gisa.gv.at/abfrage): "Behörde: Bezirkshauptmannschaft Dornbirn", "Gewerbeart: freies Gewerbe", "Anschrift: 6845 Hohenems, Radetzkystraße 80".
- "Wirtschaftskammer Vorarlberg, Landesgremium Fahrzeughandel": WKO kaydı /vorarlberg/ altında ve "LG Fahrzeughandel" yazıyor; "LG = Landesgremium" WKO'nun standart kısaltması olarak açıldı [VARSAYIM: kısaltmanın açılımı sayfada yazmıyor].
- Yasal metinler (RIS açık veri kopyası): § 5 Abs. 1 ECG (Z 1–7), § 14 Abs. 1 UGB, § 25 Abs. 5 MedienG (küçük web sitesi: ad/firma, gerekirse faaliyet konusu, merkez).
- Bildnachweis: araç ve showroom fotoğrafları galerinin ilanlarından; açılış filmi Pexels 33374869 (Igor Vieira, Pexels License); harita © OpenStreetMap.

**Finanzierung — menüde gösterildi (`lib/launch.ts` `PAGES.financing = true`)**
- Galerinin Facebook tanıtım metni (https://www.facebook.com/Autohaus.MegaCars/, oturumsuz görünüm ve meta etiketi): "Bei Mega Car's erwarten euch Autos zu Top Preisen. Auch für die kleine Geldtasche. Finanzierunge…" (metin bu noktada kesiliyor; cümlenin devamı okunamadı).
- Galerinin kendi AutoScout24 ilan metni (Haziran 2026): "Wir erstellen Ihre Finanzierung individuell auch OHNE Anzahlung".
- Sitede faiz oranı, banka ortağı, "ohne Anzahlung" ya da başka koşul yazılmadı; sayfa yalnız sade açıklama + talep formundan oluşur.

**Ankauf / Inzahlungnahme — hazır, menüde ve sitemap'te gizli (`PAGES.tradeIn = false`)**
- Facebook'ta geçmiyor; yalnız Haziran 2026 ilan metninde "Inzahlungnahme, Finanzierung, Leasing oder Tausch möglich". Teyit gelince `lib/launch.ts` içinde tek satır: `tradeIn: true`.

**Datenschutz — sitenin gerçekten kullandığı teknolojiler ve kaynaklar**
- Barındırma: Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA; "Vercel complies with the EU-U.S. Data Privacy Framework"; DPA'da 2021/914 standart sözleşme maddeleri; ziyaretçi verisi "End User IP address, location information derived from IP address, and system configuration information" (vercel.com/legal/privacy-policy, vercel.com/legal/dpa). Log saklama: Hobby 1 saat, Pro 1 gün, Observability Plus 30 gün (vercel.com/docs/logs/runtime) → sitede "bir saat ile 30 gün arası".
- Yazı tipleri: next/font — "No requests are sent to Google by the browser" (nextjs.org/docs/app/api-reference/components/font).
- Harita: önce kendi sunucudan statik çizim; "Karte laden" tıklanınca OpenStreetMap Foundation, St John's Innovation Centre, Cowley Road, Cambridge, CB4 0WS, UK (osmfoundation.org/wiki/Contact; Privacy_Policy: IP, tarayıcı, cihaz, sayfa). AB'nin Birleşik Krallık yeterlilik kararı 19.12.2025'te yenilendi, 27.12.2031'e kadar geçerli (ec.europa.eu ip_25_3059).
- WhatsApp: WhatsApp Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Ireland (whatsapp.com/legal/privacy-policy-eea).
- Şikâyet makamı: Österreichische Datenschutzbehörde, Barichgasse 40-42, 1030 Wien, dsb@dsb.gv.at (dsb.gv.at).
- Saklama: § 132 Abs. 1 BAO yedi yıl.
- Çerez ve depolama: kod incelendi. next-intl dil çerezi (NEXT_LOCALE) kapatıldı (`localeCookie: false`); yükleyicinin "ilk ziyaret" işareti için kullanılan sessionStorage kaldırıldı (artık yönlendiren adres ve gezinme türüne bakılıyor). Analiz, takip ve reklam aracı yok → Datenschutz'ta "çerez yok, cihazda depolama yok" yazıldı, çerez bandı konmadı.

**İngilizce**
- Bütün sayfalar /en altında (yollar: /en/vehicles, /financing, /trade-in, /contact, /imprint, /privacy). Donanım sözlüğü data/equipment-en.json (108 terim). Fiyat biçimi "€64,900".
- Impressum ve Datenschutz'un EN/TR sürümlerinde "bağlayıcı olan Almanca metindir" notu [VARSAYIM: yaygın uygulama; Volkan'ın ayrıca bir kararı yok].

**Teyit bekliyor (Gökhan'dan cevap gelince açılacak)**
1. Inzahlungnahme / Ankauf hizmeti → sayfa hazır, `PAGES.tradeIn`.
2. Leasing ve Tausch (yalnız Haziran 2026 ilan metninde geçiyor).
3. Öğle arası (kaynaklar farklı; sitede yazılmadı).
4. +43 660 6877002 numarasının WhatsApp'ta açık olduğu.
5. UID numarası: firmenabc'de görünen ATU70884019 AB VIES'te geçersiz ("isValid": false, 22.10.2026 23:16Z) → yayınlanmadı; Impressum'da UID satırı yok (eksik).
6. **Fiyatların KDV durumu:** § 5 Abs. 2 ECG fiyatın vergi dahil olup olmadığının belirtilmesini istiyor; galeri ilanlarında bu bilgi yok. Sitede şimdilik yalnız "Der Preis stammt aus dem Inserat." yazıyor — canlıya çıkmadan önce galeriden öğrenilmeli (ör. "Endpreise inkl. USt." ya da "differenzbesteuert").
7. "Seit 2002": hiçbir resmî kaynakta yok; en eski kayıt 02.03.2016 (Demir OG). Kullanılmadı. Kaynak (Volkan, 23.10.2026): ifade Mega Cars'ın eski AutoScout24 bayi profilinin tanıtım metninde geçiyordu („Mega Car's bietet Ihnen bereits seit dem Jahr 2002…"); profil kapandı, metin arama motoru kaydında görüldü. Sahibi teyit etmeden sitede kullanılmaz.
8. Firma adının güncel yazımı: EVI'de Mart 2026 tarihli "Namensänderung … Rechtsformänderung … Auflösung" kaydı var (OG'den e.U.'ya geçiş olduğu düşünülüyor), WKO "Firmenname: Murat Demir" gösteriyor. Impressum'daki "Mega Cars Murat Demir e.U." yazımı güncel Firmenbuchauszug ile doğrulanmalı.
9. İkinci telefon +43 660 6969496 (firmenabc'de "T:0660/6969496") — sitede kullanılmıyor.
10. "Wartung und Pflege" müşteriye hizmet olarak sunuluyor mu (yalnız Firmenbuch iş kolunda geçiyor; sitede hizmet olarak yazılmadı).
11. Pazar ve resmî tatil günlerinde randevuyla inceleme / test sürüşü.
12. Porsche Panamera'nın kasa tipi (ilan hatası, gizli).
13. Güncel stok kaynağı ve 360° deneme çekimi.

**Performans ve erişilebilirlik düzeltmeleri (ölçümle bulunan, 23.10.2026)**
- İlk Lighthouse turunda mobil LCP: ana sayfa 2,81 sn, liste 2,68, detay 3,59 (hedef < 3,0). Neden: bütün sayfalar her istekte sunucuda üretiliyordu (`(site)/layout.tsx` `setRequestLocale` çağırmadığı için next-intl istek başlıklarını okuyordu) → HTML akışla ~0,6 sn'de bitiyordu ve ilk boyama JS çalıştıktan sonraya kalıyordu. Düzeltme: `setRequestLocale` eklendi; ana sayfa, detay ve iç sayfalar derlemede üretiliyor (Vercel önbelleği HIT). Liste bilerek dinamik (filtreler adres satırından sunucuda okunuyor). Finanzierung'daki `?fahrzeug=` ön seçimi istemcide okunuyor.
- Gövde yazı tipi Hanken Grotesk artık ön yüklenmiyor (34 KB LCP görseliyle yarışmasın; ölçü ayarlı yedek yazı tipiyle kayma yok); detay galerisindeki küçük resimler `fetchpriority=low`.
- Kırmızı bölümlerde ikincil metin %86 beyazdan (4,13:1) tam beyaza (5,24:1) çekildi (WCAG AA; 1. aşamadan kalan hata). Logo ve dil bağlantılarında görünen yazı erişilebilir adın başında (WCAG 2.5.3).
- Denenip etkisi görülmeyen: ilk ziyaret yükleyicisini kapatmak (detay LCP değişmedi) → yükleyici yerinde bırakıldı.

**İlk ziyaret yükleyicisi ↔ LCP çelişkisi (ölçüm, 23.10.2026) — Volkan'ın kararı gerekiyor**
- Lighthouse her ölçümü "ilk ziyaret" olarak yaptığı için yükleyici her ölçümde açılıyor. Önizlemede yükleyici açıkken gözlenen ilk boyama 2,4 sn civarında kalıyor (film şeridinde 2,4 sn'ye kadar ekran boş); yükleyicinin açılmadığı ölçümlerde 0,9–1,2 sn. Simülasyondaki mobil LCP buna göre ana sayfada ≈ 3,3–3,7 sn (yükleyici açık) ↔ 2,3 sn (kapalı).
- Denenip etkisiz kalanlar (yerel, tek değişken): grain katmanını kapatmak; yükleyici panellerini yarı saydam yapmak; iç metnin opaklık animasyonunu kaldırmak; panelleri hiç hareket ettirmemek. Yalnız yükleyiciyi tümden kaldırmak ilk boymayı sürekli öne çekti.
- Sonuç: "sayaçlı sinematik yükleyici (yalnız ilk ziyarette)" ile "LCP'yi geciktirmeden" kuralı bugünkü yükleyiciyle aynı anda sağlanamıyor. Seçenekler Volkan'a soruldu: (a) yükleyici yalnız ana sayfada, (b) yükleyici sayfayı örtmeden yalnız köşede sayaç + çizgi olarak, (c) olduğu gibi kalsın, LCP hedefi ilk ziyaret için esnetilsin.

## 23.10.2026 — Premium logo + logolu açılış ekranı + küçük düzeltmeler (talimat)

### Volkan'ın kararları (23.10.2026)
- **23.10.2026** — "Açılış yükleyicisi KALIYOR ve ekranı kaplamaya devam ediyor. İçindeki sayaç (0–100) KALDIRILIYOR. Yerine Mega Cars için tasarlanacak ultra premium bir logo/amblem gösterilecek. Örnek: HAK61 projesindeki açılış (ekranın ortasında amblem görünür, sonra yumuşakça kaybolur); Mega Cars'ta bundan daha gösterişli olacak." — İlgili: components/site/Loader.tsx, açılış yükleyicisi (yukarıdaki "yükleyici ↔ LCP" sorusunun cevabı: yükleyici kalır)
- **23.10.2026** — "Mobilde "3 sn içinde görünme" hedefi bu proje için Volkan'ın kararıyla askıya alındı; bu oturumda hız çalışması yapılmayacak." — İlgili: performans bütçesi (mobil LCP < 3,0 sn), docs/LIGHTHOUSE.md, docs/TESLIM-KONTROL.md
- **23.10.2026** — "Volkan'ın bütün projeler için koyduğu kural: özel imleç (fare okunun yerine çıkan nokta/halka ya da yazılı imleç) yasak. Sitedeki "Ansehen" imlecini kaldır; normal fare oku kalsın. Kartların hover efektleri (fotoğraf büyümesi, kırmızı çizgi) kalır." — İlgili: components/site/Cursor.tsx, araç kartı, galeri sahnesi; BRIEF.md ve DESIGN.md'deki "Ansehen imleci" maddeleri bu kararla kalkar

### Sınır
- **23.10.2026** — "main'e dokunma. Vercel CLI ile elle deploy yok. fal.ai yalnız logo fikir aşamasında kullanılabilir; toplam harcama en fazla 5 USD; harcamayı raporla. Uydurma veri yok. BRIEF.md ve KARAR-DEFTERI.md'deki diğer bütün kurallar geçerli." — İlgili: bu oturum

### 1) Ultra premium Mega Cars logosu — 3 konsept
- **23.10.2026** — "Her konsept iki parçadan oluşur: bir amblem (otomobil rozeti hissi veren; "MC" harflerinden ya da Mega Cars'a özgü bir biçimden türetilmiş işaret) + "MEGA CARS" yazısı (logotype)." — İlgili: logo
- **23.10.2026** — "Her konseptin üç kullanım biçimi olur: yatay (üst bar), ortalanmış/dikey (açılış ekranı), yalnız amblem (sekme ikonu, uygulama ikonu)." — İlgili: logo
- **23.10.2026** — "His: fiyakalı, gösterişli, premium otomotiv. C yönünün renkleri (yarış kırmızısı, kemik rengi, derin siyah) kullanılır; istenirse metalik krom etkisi eklenir. Ucuz parıltı, neon, çizgi film ve clipart yok." — İlgili: logo
- **23.10.2026** — "Hiçbir otomobil üreticisinin ya da bilinen bir markanın logosuna benzemeyecek (Mercedes yıldızı, BMW yuvarlağı, Ferrari atı, Lamborghini boğası, Porsche arması, Alfa Romeo arması vb.). Her konsept için benzerlik kontrolü yap." — İlgili: logo
- **23.10.2026** — "Fikir aşamasında fal.ai'deki logo ve yazı üretiminde en iyi model(ler)i kullanabilirsin (ör. Ideogram ya da Recraft; güncel en iyisini seç); bütçe sınırı yukarıda. Son logoları temiz vektör SVG olarak sen çiz: harfler kusursuz, her boyutta keskin, 16 px sekme ikonunda bile okunur." — İlgili: logo SVG
- **23.10.2026** — "Galerinin bugünkü adı "MEGA CARS" aynen kalır; logo galeriye bir öneri olarak sunulacak." — İlgili: logo

### 2) Logolu açılış ekranı (her konsept için)
- **23.10.2026** — "Ekranı kaplayan, koyu, sinematik bir açılış: amblem ince çizgilerle çizilerek belirir; üzerinden bir ışık (krom parıltısı) geçer; "MEGA CARS" yazısı açılır; ardından kırmızı perde kalkar ve site görünür. Sayaç, yüzde ya da ilerleme çubuğu YOK." — İlgili: açılış yükleyicisi
- **23.10.2026** — "Süre yaklaşık 2–2,5 sn. Tarayıcı oturumu başına yalnız bir kez gösterilir; aynı oturumda sayfa değişince tekrar çıkmaz. prefers-reduced-motion açıkken yalnız sade bir belirme olur." — İlgili: açılış yükleyicisi
- **23.10.2026** — "Bounce ya da elastic yok; hareketler sakin ama etkileyici." — İlgili: açılış yükleyicisi

### 3) Karşılaştırma sayfası ve uygulama
- **23.10.2026** — "/de/prototyp/logo (noindex) sayfasında üç konsept yan yana dursun: her birinin açılış animasyonu (tekrar oynat düğmesiyle), koyu ve açık zemin üzerinde yatay / dikey / yalnız amblem biçimleri ve sekme ikonu önizlemesi." — İlgili: /de/prototyp/logo
- **23.10.2026** — "Senin önerdiğin konsepti şimdiden bütün siteye uygula: açılış ekranı, üst bar, footer, favicon + apple-touch-icon, varsayılan OG paylaşım görseli. Volkan başka bir konsept seçerse logo tek değişiklikle değişebilsin." — İlgili: Header, Footer, app/icon.svg, app/apple-icon.png, public/og/default.jpg

### 4) Büyük sayı kesiliyor (Volkan'ın ekran görüntüsü)
- **23.10.2026** — ""Stokumuzda 18 araç bulunuyor." başlıklı bölümde (Almanca ve İngilizce karşılıklarında da aynı bölüm; büyük olasılıkla araç listesi sayfasının başı) soldaki büyük kırmızı "18" sayısının sağ kenarı kesiliyor: "8"in sağ kısmı kutunun dışında kalıyor. Bölümü metinden arayarak bul." — İlgili: components/vehicles/VehicleList.tsx, styles/list.css (.vl-num)
- **23.10.2026** — "Sayı her ekran genişliğinde (390 / 1440 / 2560 px) kutusuna tam sığsın; hane sayısına göre (ör. 9, 66, 120) otomatik boyutlansın ve hiçbir zaman kesilmesin. Maske ya da reveal animasyonu kullanılıyorsa maske sayının tamamını kapsasın." — İlgili: liste başlığı
- **23.10.2026** — "Sitedeki diğer büyük tipografili sayıları ve başlıkları (fiyat sayacı, teknik kart rakamları, açılıştaki MEGA CARS harfleri vb.) aynı kesilme sorunu için üç genişlikte ve üç dilde kontrol et; bulduklarını düzelt." — İlgili: bütün büyük tipografi

### 5) Küçük not
- **23.10.2026** — ""Seit 2002" ifadesi Mega Cars'ın eski AutoScout24 bayi profilinin tanıtım metninde geçiyordu ("Mega Car's bietet Ihnen bereits seit dem Jahr 2002…"). Profil kapandı; metin arama motoru kaydında görüldü. Bu kaynağı KARAR-DEFTERI'ne ekle. İfade yine de sahibi teyit etmeden sitede kullanılmaz." — İlgili: Über uns; "Teyit bekliyor" 7. madde (kaynak: eski AutoScout24 bayi profili tanıtım metni, arama motoru kaydı)

### 6) Kontrol, yayın, rapor
- **23.10.2026** — "Production derlemesi temiz olsun; konsol hatası 0 olsun; 390 / 1440 / 2560 px'te taşma ve kesilen yazı ya da sayı olmasın; prefers-reduced-motion ve klavye kontrollerini yap." — İlgili: kalite kapısı
- **23.10.2026** — "Anlamlı commit'lerle v2'ye push et; main'e dokunma. Önizlemede doğrula. Ana sayfayı ve /de/prototyp/logo sayfasını Volkan'ın tarayıcısında aç." — İlgili: yayın
- **23.10.2026** — "En fazla 12 satırlık kısa Türkçe rapor ver ... Her maddede [DOĞRULANDI]+kaynak / [VARSAYIM] / [BİLMİYORUM] etiketi olsun. Sonra DUR." — İlgili: rapor

### Kayıtlar (CC, kaynaklı) — logo, açılış ekranı ve düzeltmeler
> Bu alt bölüm Volkan'ın cümlesi değildir; talimatın istediği kaynak, harcama ve kontrol kayıtlarıdır. Tarih: 23.10.2026.

**Logotype ve çizim**
- "MEGA CARS" yazısı Unbounded 800 konturlarından vektör yol olarak çıkarıldı (kaynak: Google Fonts deposu `ofl/unbounded/Unbounded[wght].ttf`, SIL Open Font License 1.1; fontTools + HarfBuzz ile kerning'li şekillendirme, betik `_work/faz6/glyphs.py`, çıktı `lib/brand/glyphs.ts`). Font dosyası repoya girmedi.
- Amblemler CC tarafından elle çizildi (`lib/brand/marks.ts`): A Monogramm (geometrik iki fasetli M + köşeleri yuvarlak kare C), B Plakette (yuvarlak köşeli plaket, çerçeve, kırmızı şerit, Unbounded 900 "MC"), C Wappen (altıgen, üst alan gece/M, alt alan kırmızı/C). Önerilen ve uygulanan: **A** (en sade silüet, 16 px'te M okunur, C kırmızı vurguyla ayrışır). Anahtar: `lib/launch.ts` → `LOGO_CONCEPT = 'a'`.
- Krom etkisi (fırçalanmış metal gradyanı) yalnız koyu zeminde; açılış ekranı, dikey lockup ve paylaşım görselinde.

**fal.ai harcaması (fikir aşaması, Volkan'ın 5 USD sınırı)**
- 6 görsel: Ideogram V3 (BALANCED, DESIGN stili) 3 × 0,06 $ + Recraft V3 (vector_illustration) 3 × 0,08 $ = **0,42 $** (liste fiyatları fal.ai model sayfalarından, 23.10.2026; fal panelindeki kesin tutar görülmedi). Çıktılar `_work/faz6/ideas/` (repoya girmez). Ideogram'ın monogram çıktısı yalnız yön teyidi olarak işe yaradı; Recraft çıktıları clipart düzeyindeydi (araba çizimi, yıldız, metin olarak renk kodu) ve kullanılmadı. Son logolarda yapay zekâ üretimi yok.

**Benzerlik kontrolü (CC, görsel; marka/tescil araştırması değil)**
- A: yıldız, halka, kalkan, kanat, hayvan yok; katlanmış M Maybach'ın üçgen içindeki çift M'si değil, C McLaren işareti değil. B: Honda'nın dikdörtgen içindeki H'si, plaka ya da oval (Ford, Toyota, Land Rover) değil. C: düz kenarlı altıgen; kalkan (Porsche, Cadillac, Lamborghini), oval (Hyundai, Infiniti), sekizgen (MG) değil; üç dişli mızrak ve taç yok. Metinler `/de/prototyp/logo` sayfasında.

**Açılış ekranı**
- `components/site/Loader.tsx` + `styles/motion.css`: sayaç, yüzde ve çubuk kaldırıldı; sıra: amblem çizgi çizimi (0,1–1,0 sn) → krom dolgu → ışık geçişi → harfler yükselir → gece paneli kalkar (1,78 sn) → kırmızı perde kalkar (1,95 sn) → 2,7 sn'de gizlenir. Saf CSS; JS yok; cihazda depolama yok. "Oturumda bir kez": site içi bağlantı, yenileme ve geri/ileri gezinmede gösterilmez (yönlendiren adres + gezinme türü; önceki oturumdaki yöntem korundu). [VARSAYIM] Dış siteden aynı sekmeye yeniden gelişte tekrar gösterilir; sessionStorage kullanılmadı (Datenschutz "depolama yok").
- HAK61 örneği: proje klasörü açılıp incelenmedi; Volkan'ın tarifi ("amblem ortada belirir, yumuşakça kaybolur") esas alındı ve üstüne çizim, krom ve perde eklendi. [VARSAYIM]
- Reduced motion: amblem ve ad 0,6 sn'de belirir, 1,4–1,9 sn'de solar; çizim, parıltı ve perde yok.

**Özel imleç**
- Kaldırıldı: `components/site/Cursor.tsx` (ViewCursor), `.vcursor` stilleri, `[data-cursor] { cursor: none }`, `--z-cursor`, kartlardaki / galeri sahnesindeki `data-cursor`. Grain `components/site/Grain.tsx`'e taşındı. Kart hover'ı (fotoğraf 1.04, kırmızı çizgi, çerçeve daralması) değişmedi.

**Büyük sayı ve maskeler**
- Liste başlığındaki sayı (`.vl-num`): `.mline` maskesi `overflow: clip` + −0,07 em harf aralığı yüzünden son glifin ("8") sağ taşmasını kesiyordu. Düzeltme: bütün `.mline` maskelerine sağ 0,15 em / üst 0,08 em / alt 0,1 em pay (eksi kenar boşluğuyla düzen sabit); sayı `--digits` ile hane sayısına göre boyutlanır (mobilde içerik genişliği, ≥ 900 px'te içerik genişliğinin %55'i; Unbounded 900 rakamı ≈ 0,84 em). 390 / 1440 / 2560'ta "18" tam; 3 haneli sayı için formül aynı.
- Tarama (10 sayfa × DE/EN/TR × 390/1440/2560, canvas `measureText` ile glif sınırı ↔ maske kutusu): SplitText satır maskeleri (LinesUp) ve `.chars` kelime maskelerinde 2–6 px sağ kesilme → maskelere pay eklendi (`Reveals.tsx` onSplit, `.chars`). TR sayfa adlarında İ/Ü noktası ve Ş çengeli kesiliyordu → `.chars` üst 0,22 em / alt 0,24 em pay, harfler %150'den yükselir. Açılış harfleri (SVG), fiyat odometresi, teknik kart ve footer dev yazısı: kesilme yok. Yatay taşma 0.

**Varlıklar ve derleme**
- `scripts/brand-assets.ts` (`npm run brand`, `prebuild`): `app/icon.svg` (64 px), `app/apple-icon.png` (180 px, gece zemin), `public/og/default.jpg` (1200 × 630, dikey krom lockup + kırmızı çizgi). Konsept değişince tek satır (`LOGO_CONCEPT`) + derleme yeter.

## 23.10.2026 — Volkan'ın Gökhan'a mesajı (galeriye iletilecek sorular ve istekler; aynen)

- **23.10.2026** — "Gökhan, Mega Cars'ın yeni sitesinin demosu hazır: https://megacars-git-v2-volkancatak1309-maxs-projects.vercel.app — Telefonda da açılıyor. Dil otomatik seçiliyor; üstten DE / EN / TR arasında değiştirilebiliyor." — İlgili: önizleme
- **23.10.2026** — "Sitedeki araçlar, galerinin haziranda AutoScout24'te ilanda olan gerçek araçları. Demo olduğu için şimdilik bunlar duruyor; güncel araçların fotoğrafları ve bilgileri gelince değişecek." — İlgili: data/inventory.json
- **23.10.2026** — "Logo galeriye bir öneri: "M" harfi ve ona bitişik kırmızı bir "C". İsterlerse kendi mevcut logoları da kullanılabilir." — İlgili: logo (konsept A)
- **23.10.2026** — "Site şu an Google'a kapalı. Galeri onaylayınca kendi adresleri olan megacars.at üzerinden yayına alınacak." — İlgili: lib/launch.ts INDEXABLE, alan adı
- **23.10.2026** — "1) Araçlarını şu an hangi sitede ilana koyuyorlar? AutoScout24'teki mağazaları kapalı görünüyor." — İlgili: stok kaynağı (teyit bekliyor 13)
- **23.10.2026** — "2) Sitede telefon +43 660 6877002, e-posta megacars@live.at yazıyor. Bunlar doğru mu? Bu numara WhatsApp'ta açık mı? İkinci numara (+43 660 6969496) da sitede yazsın mı?" — İlgili: Kontakt, Impressum (teyit bekliyor 4, 9)
- **23.10.2026** — "3) Açılış saatleri hafta içi 08:00–18:00, cumartesi 09:00–15:00 olarak yazıyor. Öğle arası veriyorlar mı? Pazar günü randevuyla açıyorlar mı?" — İlgili: saatler (teyit bekliyor 3, 11)
- **23.10.2026** — "4) Hangi hizmetleri veriyorlar: kredi (Finanzierung), takas (Inzahlungnahme), araç değişimi (Tausch), müşteriden araç satın alma (Ankauf), leasing, bakım? Sitede yalnız gerçekten verdikleri hizmetleri yazacağız." — İlgili: hizmetler, PAGES (teyit bekliyor 1, 2, 10)
- **23.10.2026** — "5) İlan fiyatları KDV dahil son fiyat mı? Bazı araçlar "differenzbesteuert" (KDV'si ayrıca gösterilmeyen ikinci el satış) mi satılıyor? Avusturya'da sitede bunun yazması gerekiyor." — İlgili: fiyat notu, § 5 Abs. 2 ECG (teyit bekliyor 6)
- **23.10.2026** — "6) Firmanın UID numarası (Umsatzsteuer-Identifikationsnummer) ne? Firma dizinlerinde ATU70884019 yazıyor, ama bu numara AB'nin sorgu sisteminde geçersiz çıkıyor; doğru numarayı öğrenmemiz lazım. Firmenbuch'taki tam unvanları da lazım (ör. "Mega Cars Murat Demir e.U."). Künye (Impressum) sayfası için ikisi de yasal olarak gerekli." — İlgili: Impressum (teyit bekliyor 5, 8)
- **23.10.2026** — "7) Sitede "Seit 2002" yazabilir miyiz? Galerinin eski AutoScout24 tanıtımında 2002'den beri çalıştıkları yazıyordu." — İlgili: Über uns (teyit bekliyor 7)
- **23.10.2026** — "8) Şu anki araçların fotoğrafları ve bilgileri: Her araç için ayrı bir klasör olsun; klasörün adı aracın adı olsun (ör. Mercedes-S560-2019). Her klasörde 10–20 tane yatay, net, üstüne yazı ya da logo basılmamış orijinal fotoğraf olsun. Her aracın bilgileri de olsun: marka, model, versiyon, kasa tipi (Limousine, Kombi, SUV, Cabrio vb.), ilk tescil tarihi, kilometre, güç, yakıt, vites, renk, fiyat ve donanım listesi. Dosyaları WhatsApp'tan normal fotoğraf olarak göndermesinler, çünkü kalite düşüyor. Google Drive ya da WeTransfer linkiyle göndersinler." — İlgili: stok teslim biçimi, scripts/import-inventory.ts
- **23.10.2026** — "9) Ekteki PDF'teki talimata göre tek bir arabanın etrafında yürüyerek bir deneme videosu çekilmesi lazım. Sitede araba bir platformun üstünde dönüyormuş gibi görünecek. Fotoğrafları çektikleri gün bunu da çekebilirlerse çok iyi olur." — İlgili: docs/showroom-v2/CEKIM-TALEBI.pdf, 360° denemesi
- **23.10.2026** — "10) megacars.at alan adı kimin yönetiminde, hangi firmada kayıtlı? Site oraya taşınırken alan adı ayarlarına (DNS) erişim gerekecek; şimdiden öğrenirsek zaman kazanırız." — İlgili: alan adı, canlıya geçiş
- Not (CC): Bu mesaj, Gökhan'a gönderilen son sürümdür (23.10.2026); önceki taslak bununla değiştirildi.

## 23.10.2026 — Dil hataları: önce dil seçici (hemen yayınla), sonra karışık dil temizliği (talimat)

### Volkan'ın bulduğu iki hata
- **23.10.2026** — "1) Dil seçici çalışmıyor: EN'e basınca İngilizceye geçmiyor; DE'ye basınca Almancaya geçmiyor." — İlgili: components/site/Header.tsx, components/site/Curtain.tsx
- **23.10.2026** — "2) Türkçe seçiliyken sayfada Almanca yazılar görünüyor. Örnek: "GEWISSENHAFT. VERLÄSSLICH. PROFESSIONELL." büyük başlığı Türkçe sayfada Almanca duruyor; aynı bölümde "SHOWROOM" etiketi İngilizce." — İlgili: Startseite güven bölümü, messages/*.json
- **23.10.2026** — "Önceki raporda "İngilizce tamam [DOĞRULANDI]" yazılmıştı. Bu doğrulama yetersizdi: yalnız çeviri dosyaları kontrol edilmiş, ekranda tıklanarak test edilmemiş. Bu oturumda doğrulama gerçek tıklamayla ve ekrandaki metnin taranmasıyla yapılacak." — İlgili: doğrulama yöntemi

### Sınır ve bağlam
- **23.10.2026** — "main dalı eski canlı sitedir; main'e dokunma." / "KARAR-DEFTERI'nde commit'lenmemiş Gökhan mesajı kaydı varsa koru; bu oturumun commit'lerine kat." — İlgili: git

### 1) Dil seçici
- **23.10.2026** — "Doğru davranış: Otomatik dil seçimi yalnız ilk girişte, dil belirtilmemiş adreste (/) çalışır. Ziyaretçi dil seçiciden bir dil seçerse aynı sayfanın o dildeki karşılığına gider ve seçimi hatırlanır. Sonraki sayfa geçişlerinde, sayfa yenilemede ve siteye tekrar girişte o dil kalır. Dil seçici masaüstünde ve mobil menüde çalışır." — İlgili: i18n/routing.ts, proxy.ts, Header
- **23.10.2026** — "Playwright ile, önizleme adresinde gerçek tıklama testi yap: ana sayfada, araç listesinde ve bir araç sayfasında DE → EN → TR → DE sırasıyla tıkla. Her tıklamada adresin ve sayfadaki metnin değiştiğini doğrula; sayfa yenileyince dilin korunduğunu doğrula. Testi masaüstünde (1440 px) ve mobil menüden (390 px) yap." — İlgili: dil testi
- **23.10.2026** — "Test geçince HEMEN commit'le ve v2'ye push et (mesaj: "fix(i18n): dil secici"). Vercel önizlemesinin güncellendiğini doğrula. Siteyi Volkan'ın tarayıcısında aç ve bana tek satırla yaz: "Dil seçici düzeltildi, önizlemede deneyebilirsin." Sonra 2. bölüme geç." — İlgili: yayın sırası

### 2) Karışık dili temizle — KESİN KURAL
- **23.10.2026** — "KESİN KURAL (Volkan): Hangi dil seçiliyse sayfada yalnız o dil görünür; başka dilde tek kelime kalmaz." — İlgili: bütün site × 3 dil
- **23.10.2026** — "İstisna yalnız özel isimlerdir: firma adı, marka ve model adları, cadde adı, mahkeme ve sicil gibi resmî kurum adları. Resmî kurum adları ilk geçtiği yerde o dildeki açıklamasıyla birlikte yazılır (ör. TR: "Feldkirch Eyalet Mahkemesi (Landesgericht Feldkirch)")." — İlgili: Impressum, Datenschutz, Kontakt
- **23.10.2026** — "Karşılığı olan yabancı kelimeler (ör. "Showroom") her dilde o dilin kelimesiyle yazılır." — İlgili: bütün metinler
- **23.10.2026** — "Galerinin sloganı "Gewissenhaft. Verlässlich. Professionell." Almanca sayfada aynen kalır. Türkçe ve İngilizce sayfalarda uzman tercüman seviyesinde çevrilir (ör. TR: "Titiz. Güvenilir. Profesyonel." · EN: "Conscientious. Reliable. Professional."). Büyük harflerle de kesilmeden sığdığını üç genişlikte kontrol et." — İlgili: Startseite güven bölümü
- **23.10.2026** — "Kapsam: bütün sayfalar × 3 dil. Görünen metinlerin yanında şunlar da taranır: görsel açıklamaları (alt), aria-label'lar, title'lar, form yer tutucuları ve hata mesajları, WhatsApp'a ve e-postaya giden hazır mesajlar, sayfa başlıkları ve paylaşım (OG) metinleri, 404 sayfası, açılış ekranı ve yasal sayfalar (Impressum, Datenschutz)." — İlgili: tarama kapsamı
- **23.10.2026** — "Ekrandaki metni otomatik tara: her dil sayfasındaki bütün metinleri çıkar; bir dil algılama aracı ve kelime listesiyle o dile ait olmayan kelimeleri bul; özel isimler için bir izin listesi tut. Bulduklarını uzman tercüman seviyesinde çevir. Ardından her sayfanın her dildeki ekran görüntüsüne kendin bak ve otomatik taramanın kaçırdığını yakala." — İlgili: tarama yöntemi

### 3) Tam tıklama testi
- **23.10.2026** — "Bütün sayfa tiplerinde dil seçici testini (DE → EN → TR → DE, sayfa geçişi, yenileme) masaüstünde ve mobilde tekrarla. Sonuçları docs/DIL-TESTI.md'ye yaz: her sayfa × dil × cihaz için geçti/kaldı ve ekran görüntüsünün yolu. Tek bir "kaldı" kalmayana kadar düzelt ve yeniden test et." — İlgili: docs/DIL-TESTI.md

### 4) Küçük temizlik
- **23.10.2026** — "Volkan logo konsepti A'yı seçti (23.10.2026); bunu KARAR-DEFTERI'ne yaz. /prototyp/logo sayfasını ve kullanılmayan B ve C logo kodlarını kaldır (git geçmişinde kalırlar)." — İlgili: logo (A Monogramm kesinleşti), lib/brand/marks.ts, app/[locale]/prototyp/logo

### 5) Yayın ve rapor
- **23.10.2026** — "Production derlemesi temiz olsun; konsol hatası 0 olsun. Anlamlı commit'lerle (fix:, i18n:, chore:, docs:) v2'ye push et; önizlemede doğrula; main'e dokunma. Ana sayfayı Türkçe olarak Volkan'ın tarayıcısında aç." — İlgili: yayın
- **23.10.2026** — "En fazla 12 satırlık kısa Türkçe rapor ver ... Her maddede [DOĞRULANDI]+kaynak / [VARSAYIM] / [BİLMİYORUM] etiketi olsun. Sonra DUR." — İlgili: rapor
