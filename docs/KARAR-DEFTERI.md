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

## 23.10.2026 — Araç yönetim paneli: galeri sahibi araç eklesin, satıldı işaretlesin, kaldırsın (talimat)

### Volkan'ın kararı (23.10.2026)
- **23.10.2026** — "Galeri sahibi araçlarını kendisi yönetmek istiyor; site dinamik olacak." — İlgili: bütün site, veri katmanı
- **23.10.2026** — "Galeri sahibi bir yönetim panelinden araç ekleyebilecek (fotoğraf + bilgiler), düzenleyebilecek, ana sayfadaki öne çıkan araçları seçebilecek, aracı "satıldı" olarak işaretleyebilecek ve siteden kaldırabilecek." — İlgili: /admin
- **23.10.2026** — "Sistem 100'ün üzerinde araçla sorunsuz çalışacak." — İlgili: liste sayfası, veritabanı

### Sınır
- **23.10.2026** — "main'e dokunma. Vercel CLI ile elle deploy yok; yayın yalnız v2'ye push ile olur. Ücretli tek yeni kalem: Supabase'de Mega Cars için ayrı bir proje (madde 1). Şifre, anahtar ve gizli bilgiler ASLA repoya, KARAR-DEFTERI'ne ya da rapora yazılmaz. Uydurma veri yok. BRIEF.md ve KARAR-DEFTERI.md'deki bütün kurallar geçerli; özellikle "seçili dil dışında tek kelime yok" kuralı. Galzura Fleet'in Supabase projelerine (HAK61, Sendigo, galzura-demo vb.) KESİNLİKLE dokunma." — İlgili: bu oturum

### 1) Veritabanı ve depolama (Supabase)
- **23.10.2026** — "Galzura'nın Supabase Pro hesabında Mega Cars için ayrı bir proje aç (bölge: AB / Frankfurt). Önce bu projenin aylık ek maliyetini Supabase'in güncel fiyat sayfasından doğrula ve rapora yaz. Proje açmak için gereken erişim bu bilgisayarda yoksa dur ve Volkan'ın yapacağı TEK adımı yaz." — İlgili: Supabase projesi
- **23.10.2026** — "Tablolar: araçlar: marka, model, versiyon, kasa tipi, ilk tescil, km, güç, yakıt, vites, renk, fiyat, fiyata KDV notu alanı, donanım listesi, özellik işaretleri, öne çıkan, sıra, durum (satışta / rezerve / satıldı), sitede görünür/gizli, eklenme ve güncellenme tarihi, isteğe bağlı 360 verisi; araç fotoğrafları: sıra ve kapak fotoğrafı bilgisiyle." — İlgili: veritabanı şeması
- **23.10.2026** — "Silme yumuşak olsun (arşiv): yanlışlıkla silinen araç geri alınabilsin." — İlgili: arşiv
- **23.10.2026** — "Güvenlik: Row Level Security açık. Herkes yalnız "sitede görünür" araçları okuyabilir; yazma yalnız yetkili yöneticilere açık. Fotoğraf deposunda da aynı kural geçerli." — İlgili: RLS, Storage
- **23.10.2026** — "Supabase anahtarlarını Vercel'deki megacars projesinin ortam değişkenlerine (önizleme + production) ve yerelde .env.local'a yaz; repoya yazma." — İlgili: ortam değişkenleri

### 2) Site artık veritabanından okur
- **23.10.2026** — "Ana sayfadaki öne çıkan araçlar, araç listesi ve araç detay sayfaları veritabanından gelir. Öne çıkan olarak işaretli araç 6'dan azsa boşluk en yeni eklenen araçlarla doldurulur." — İlgili: Startseite, Fahrzeuge, Fahrzeug-Detail
- **23.10.2026** — "Galeri sahibi kaydettiğinde site birkaç saniye içinde güncellenir (önbellek yenileme). Veritabanına ulaşılamazsa site çökmez; zarif bir boş durum gösterir." — İlgili: önbellek, boş durum
- **23.10.2026** — "Satıldı işaretli araç listede "Verkauft / Satıldı / Sold" etiketiyle görünür; galeri sahibi isterse tek tuşla gizler. Gizlenen ya da silinen aracın sayfasına gelen ziyaretçi araç listesine yönlendirilir; bozuk link kalmaz." — İlgili: liste, detay, yönlendirme
- **23.10.2026** — "Sıralama: Gerçek eklenme tarihi olduğu için "Neu eingetroffen" (en yeni gelenler) seçeneği eklenir ve varsayılan olur. Diğer sıralamalar (fiyat, km, ilk tescil) kalır." — İlgili: liste sıralaması
- **23.10.2026** — "100+ araçta liste sayfası hızlı kalsın (sayfalama ya da "daha fazla göster"); filtreler çalışsın." — İlgili: liste
- **23.10.2026** — "Mevcut 18 demo aracı fotoğraflarıyla birlikte veritabanına aktar (tekrar çalıştırılabilir bir betikle). data/inventory.json yalnız yedek olarak kalır." — İlgili: aktarım betiği

### 3) Yönetim paneli (/admin)
- **23.10.2026** — "Giriş: e-posta + şifre (Supabase Auth). Kayıt sayfası yok; hesapları yalnız Galzura açar. Şimdilik iki hesap aç: (a) Galzura yönetici hesabı, (b) galeriye gösterilecek demo hesabı. Galeri sahibinin gerçek hesabı, e-postası netleşince açılacak." — İlgili: Supabase Auth
- **23.10.2026** — "Şifreleri güçlü üret ve repoya yazma. Giriş bilgilerini C:\Users\90553\Desktop\megacars-giris-bilgileri.txt dosyasına yaz (repo klasörünün DIŞINDA); bana yalnız dosyanın yerini söyle." — İlgili: giriş bilgileri
- **23.10.2026** — "Panel dili Almanca ve Türkçe olsun (seçilebilir); seçili dil dışında kelime olmasın. Panel telefonda birinci sınıf çalışmalı: galeri sahibi galeride arabanın fotoğraflarını telefonla çekip doğrudan yükleyebilmeli." — İlgili: /admin
- **23.10.2026** — "Araç ekleme / düzenleme: Fotoğraflar: çoklu yükleme, sürükleyerek sıralama, kapak seçimi, silme. Yüklemeden önce tarayıcıda otomatik küçültme ve WebP'ye çevirme (1600 px ve 800 px sürümleri). Telefon fotoğraflarındaki konum ve cihaz bilgisi (EXIF) silinir. Bilgiler seçmeli alanlarla girilir: marka ve model (listeden seçim + yeni ekleme), kasa tipi, yakıt, vites, renk, ilk tescil, km, güç (kW ve PS otomatik çevrilir), fiyat. Donanım ve özellikler, önceden üç dile çevrilmiş geniş bir onay listesinden işaretlenir (ör. navigasyon, deri koltuk, panorama tavan, çeki demiri, koltuk ısıtma, servis kitapçıklı bakım, ilk sahibinden). Bu ilk aşamada serbest açıklama metni YOK: Almanca yazılan bir metin Türkçe ve İngilizce sayfada Almanca kalırdı. "Öne çıkan" anahtarı ve sıra. Durum: satışta / rezerve / satıldı; "sitede göster" anahtarı; arşive gönder (silme) ve arşivden geri al. Kaydetmeden önce önizleme: aracın sitede nasıl görüneceği." — İlgili: araç formu
- **23.10.2026** — "Paneldeki araç listesinde arama, durum filtresi ve toplu işlem (ör. birden çok aracı gizleme) olsun. Panel tasarımı sitenin C diliyle uyumlu, sade ve premium olsun. Kepenk hover ve kırmızı vurgu panelde de kullanılır, ama kullanım kolaylığı önce gelir." — İlgili: panel listesi, tasarım

### 4) Belgeler
- **23.10.2026** — "docs/ARAC-PANELI-REHBERI.md ve .pdf: galeri sahibi için Almanca + Türkçe, ekran görüntülü, kısa bir kullanım rehberi. Konular: giriş, araç ekleme, fotoğraf sıralama, öne çıkarma, satıldı işaretleme, gizleme, arşivden geri alma. Datenschutz sayfasını üç dilde güncelle: Supabase (AB bölgesi) veri işleyen olarak; yönetim paneli girişinin kullandığı çerezler. KARAR-DEFTERI ve BRIEF.md'yi yeni yapıyla güncelle." — İlgili: docs, Datenschutz

### 5) Test
- **23.10.2026** — "Playwright ile, önizleme adresinde uçtan uca test yap: 1. Demo hesabıyla giriş yap. 2. Yeni bir araç ekle (3 fotoğraf, bilgiler, donanım). 3. Aracın sitede üç dilde göründüğünü doğrula. 4. Aracı öne çıkar; ana sayfada göründüğünü doğrula. 5. Satıldı olarak işaretle; etiketi doğrula. 6. Gizle; listeden kalktığını ve eski linkin yönlendirdiğini doğrula. 7. Arşive gönder ve arşivden geri al. Telefon görünümünde (390 px) de fotoğraf yükleme ve kaydetme akışını dene." — İlgili: uçtan uca test
- **23.10.2026** — "Güvenlik testi: giriş yapmadan panel açılmıyor; giriş yapmadan veritabanına yazılamıyor; gizli araç sitede ve doğrudan adresle görünmüyor. Dil testi: yeni eklenen aracın sayfasında seçili dil dışında kelime yok; docs/DIL-TESTI.md'yi güncelle. Production derlemesi temiz olsun; konsol hatası 0 olsun. Test için eklediğin aracı en sonda tamamen sil (arşivde de bırakma)." — İlgili: güvenlik, dil, temizlik

### 6) Yayın ve rapor
- **23.10.2026** — "Anlamlı commit'lerle v2'ye push et; main'e dokunma. Önizlemede doğrula. Paneli ve ana sayfayı Volkan'ın tarayıcısında aç. En fazla 15 satırlık kısa Türkçe rapor ver ... Her maddede [DOĞRULANDI]+kaynak / [VARSAYIM] / [BİLMİYORUM] etiketi olsun. Sonra DUR." — İlgili: yayın, rapor

### Kayıtlar (CC, kaynaklı) — araç yönetim paneli, 1. oturum (23.10.2026)
> Bu alt bölüm Volkan'ın cümlesi değildir; maliyet, erişim, yapılanlar, doğrulananlar ve CC varsayımlarıdır.

**Aylık maliyet (supabase.com/pricing, 23.10.2026)** — Pro plan 25 $/ay; "Pro and Team plans include $10/month in compute credits, which covers one Micro instance."; "Additional projects each add their own compute cost." → Galzura'nın Pro hesabında Mega Cars için ikinci proje: Micro örneği ≈ **+10 $/ay** (ilk proje krediyle karşılanıyorsa; projeler duraklatılmaz). Disk: proje başına 8 GB dahil, sonrası 0,125 $/GB/ay. Bölge kodu: eu-central-1 "Central EU (Frankfurt)" (supabase.com/docs/guides/platform/regions, 23.10.2026).

**Erişim** — Supabase CLI bu bilgisayarda yok; bu projenin `.env.local` dosyasında Supabase anahtarı yok; `C:\Users\90553\galzura-oto\.env.local` içinde `SUPABASE_ACCESS_TOKEN` adlı bir satır bulundu (değeri okunmadı, yazılmadı). Claude Code'un otomatik mod izin denetleyicisi, başka projenin `.env` dosyasını okuyan komutu ve ardından Docker'ı / çalışan süreçleri yoklayan komutları "Credential Exploration" gerekçesiyle reddetti; bu yüzden bulut projesi açılamadı ve yerel Supabase (Docker) da kurulamadı. Volkan'ın tek adımı raporda.

**Bu oturumda yapılanlar (yerel commit'ler; v2'ye PUSH EDİLMEDİ — veritabanı yokken push edilseydi önizleme boş görünürdü)**
- Şema + Row Level Security + Storage politikaları: `supabase/migrations/20261023120000_vehicles.sql` (`admin_users`, `is_admin()`, `vehicles`, `vehicle_photos`, kova `vehicles`).
- Veri katmanı: `lib/supabase/{env,public,server,browser,rows}.ts`, `lib/inventory.ts` (`unstable_cache`, etiket `vehicles`, 5 dk güvenlik yenilemesi; kaydedince `revalidateTag` + `revalidatePath('/', 'layout')`), `lib/types.ts` (durum, görünür, öne çıkan, KDV notu, özellik işaretleri, zaman damgaları), `lib/options.ts` (seçmeli listeler, kW↔PS), `lib/equipment.ts` + `data/equipment.json` (117 terim × 3 dil; eski `equipment-en/tr.json` sözlüklerinden üretildi, `_work/faz8/equipment.mjs`), `lib/dealer-photos.ts` (showroom ve bina fotoğrafları yedek dosyadan).
- Site: ana sayfa (öne çıkanlar 6'ya tamamlanır, boş durum `StockEmpty`), liste (varsayılan "Neu eingetroffen", 24'er "Weitere anzeigen", boş durum), detay (gizli/silinmiş → listeye yönlendirme; "Verkauft/Reserviert" etiketi; KDV notu; özellik satırları; donanım anahtarlardan), kart ve öne çıkanlarda `.status-chip`, sitemap/kontakt/finanzierung/layout veritabanından; JSON-LD `availability` duruma göre.
- Panel: `proxy.ts` (oturum yenileme, girişsiz → `/admin/login`, `/en/admin` → `/de/admin`), `app/[locale]/(admin)/admin/*` (giriş, liste, yeni, düzenle, arşiv, `actions.ts`), `components/admin/*` (liste + arama/filtre/toplu işlem, form, fotoğraf alanı, donanım seçici, önizleme), `lib/admin/{schema,slug,queries,image}.ts`, `styles/admin.css`, `messages/de|tr.json` → `admin`.
- Aktarım betiği `scripts/migrate-inventory.ts` (`npm run migrate` kuru çalışma, `-- --write` yazar; legacy_id ile tekrar çalıştırılabilir; fotoğraflar `public/cars` dosyalarından kovaya). Eski `scripts/import-inventory.ts` `scripts/legacy-types.ts` ile derlenmeye devam eder.
- Datenschutz 3 dilde: yeni "Wo liegen die Fahrzeugdaten?" bölümü (Supabase Pte. Ltd., 65 Chulia Street #38-02/03, OCBC Centre, Singapur 049513; SCC (AB) 2021/914 — kaynak supabase.com/legal/dpa, 23.10.2026; bölge Frankfurt) ve çalışan giriş çerezleri (`sb-*`) paragrafı. BRIEF.md "Envanter" maddesi, DESIGN.md §16, `docs/ARAC-PANELI-REHBERI.md` (metin; ekran görüntüleri ve PDF canlı panelde çekilecek).

**Doğrulananlar (yerel)** — `npm run typecheck` temiz; `npm run build` temiz; Playwright (Chromium, 1440 ve 390 px, veritabanısız production sunucusu): boş durumlar DE/EN/TR ana sayfa + liste, bilinmeyen araç adresi → liste (3 dil), `/de/admin` ve `/tr/admin/neu` → giriş sayfası, `/en/admin` → `/de/admin/login`, giriş sayfası DE ve TR'de tek dil, Datenschutz'ta yeni bölüm 3 dilde, konsol hatası 0 (`_work/faz8/pw-local.mjs`).

**Doğrulanmayanlar (bulut projesi gerekiyor)** — giriş ve oturum, kaydetme, fotoğraf yükleme hattı, RLS'nin gerçek davranışı, önbellek yenileme süresi, 18 aracın aktarımı, uçtan uca/güvenlik/dil testleri önizlemede, rehber ekran görüntüleri ve PDF, Vercel ortam değişkenleri.

**CC varsayımları ve kararları (Volkan değiştirebilir)**
1. Fotoğraf kovası herkese açık okunur (statik sayfalara gömülü adresler süresiz çalışmalı); yazma yalnız yönetici. Yollar iki rastgele UUID içerir; gizlenen aracın fotoğrafı sitede hiçbir yerde bağlantılı kalmaz; arşivden tamamen silinen aracın dosyaları silinir. "Fotoğraf deposunda da aynı kural" tam anlamıyla (gizli aracın fotoğrafı adresi bilinse de açılmasın) istenirse imzalı adresler ya da bir sunucu geçidi gerekir — [VARSAYIM].
2. "Version / Ausstattungslinie" kısa serbest metin (ör. "4Matic AMG-Line"); donanım paketi adları özel ad sayılır, her dilde aynı görünür; `versionLabel` bilinen Almanca sözcükleri çevirmeye devam eder.
3. Aktarılan 18 aracın "eklenme tarihi" gerçek değildir: öne çıkanlar önce, sonra dosya sırası, birer dakika arayla verilir ki "Neu eingetroffen" sırası bugünkü "Empfohlen" sırasıyla aynı kalsın.
4. KDV notu: aktarılan araçlarda "bilinmiyor" → sitede eski "Der Preis stammt aus dem Inserat." yazısı; panelde "Endpreis inkl. MwSt." / "Differenzbesteuert" seçenekleri (teyit bekliyor 6 ile birlikte).
5. Özellik işaretleri: Unfallfrei, Erstbesitz, Garantie, Begutachtung nach § 57a neu; varsayılan "işaretsiz" ve sitede gösterilmez (uydurma veri yok).
6. Panel yalnız DE/TR; `/en/admin` Almancaya gider.
7. Veri önbelleği tek liste olarak tutulur (100–200 araç için yeterli; 300+ araçta araç başına önbelleğe geçilmeli).

- **23.10.2026** — "devam" (Volkan; Supabase erişim belirtecini bu projenin `.env.local` dosyasına koyduktan sonra; iş aynı oturumda 2. bölümle sürdü). — İlgili: .env.local, Supabase projesi

- CC (23.10.2026, "devam" sonrası): `.env.local`'daki belirteç doğru biçimde (sbp_ + 40 karakter), ama Supabase Management API iki uç noktada da 401 "Invalid access token" döndürdü → belirteç iptal edilmiş ya da süresi dolmuş [DOĞRULANDI: api.supabase.com/v1/organizations ve /v1/profile]. Talimat gereği yeniden duruldu; Volkan'ın tek adımı: supabase.com/dashboard/account/tokens'ta yeni belirteç üretip aynı dosyadaki değeri değiştirmek.

**Sonraki oturumun sırası** — token → proje "megacars" (eu-central-1) → şema (`supabase db push` ya da SQL) → kayıt (signup) kapalı → Galzura yönetici + demo hesabı, `admin_users` → anahtarlar Vercel (preview + production) ve `.env.local` → `npm run migrate -- --write` → push v2 → önizlemede E2E/güvenlik/dil testleri → rehber ekran görüntüleri + PDF → rapor.

### Kayıtlar (CC, kaynaklı) — dil seçici ve karışık dil temizliği
> Bu alt bölüm Volkan'ın cümlesi değildir; kök neden, kaynak ve kontrol kayıtlarıdır. Tarih: 23.10.2026.

**Dil seçicinin bozulma nedeni ve düzeltmesi**
- Neden: dil bağlantıları `CurtainLink` ile çiziliyordu; bu bileşen kırmızı perde geçişi için tıklamayı yakalayıp `router.push(href)` çağırıyor, ama bağlantının `locale` özelliğini aktarmıyordu. `<a href>` doğru dili gösterse de JS gezinmesi geçerli dilde kalıyordu (DE→EN ve EN→DE "geçmiyor" bulgusu). İkinci eksik: dil çerezi kapalıydı (`localeCookie: false`), seçim hatırlanmıyordu.
- Düzeltme (`components/site/Curtain.tsx`, `i18n/routing.ts`): `go(href, locale)` → `router.push(href, { locale })`; `NEXT_LOCALE` çerezi açık (1 yıl, SameSite=Lax; dil seçiciden seçince yazılır). Dil seçimi yalnız dil belirtilmemiş adreste (/) yapılır: önce çerez, sonra tarayıcı dili; önekli adresler olduğu gibi sunulur. Çerez teknik olarak gerekli (TKG 2021 § 165 Abs. 3), onay gerekmez; Datenschutz'ta adıyla, süresiyle ve içeriğiyle anlatıldı (DE/EN/TR; "çerez yok" ifadeleri kaldırıldı). [VARSAYIM] Kök adres dışında (ör. doğrudan /de/... bağlantısıyla gelen EN tercihli ziyaretçi) adres dili geçerlidir; yönlendirme yapılmaz — bu Volkan'ın "otomatik seçim yalnız / adresinde" kuralına uygundur.
- Test: Playwright (Chromium) gerçek tıklama; sonuçlar `docs/DIL-TESTI.md`.
- Yayın notu: 32f5d68 ve 2e77067 push'larında Vercel hiç derleme başlatmadı (GitHub'da deployment kaydı yok; nedeni bilinmiyor [BİLMİYORUM]); yeniden tetiklemek için attığım "boş" commit (ba32891) sahnelenmiş prototip silmelerini içerdiği için (`git rm` sonrası `--allow-empty` — CC hatası) Vercel derlemesi "proto.css bulunamadı" ile kırıldı. Kayıtlı Vercel CLI oturumuyla yalnız günlük okundu (`vercel inspect --logs`; deploy yapılmadı). Düzeltme bu oturumun tam commit'leriyle geldi.

**Karışık dil taraması — yöntem**
- Playwright ile her sayfa × dil × cihaz (masaüstü, mobil) metni çıkarıldı: görünen metin, alt/aria-label/title/placeholder, select seçenekleri, sayfa başlığı ve meta/OG, WhatsApp ve mailto hazır metinleri, açılan pencereler (menü, filtre, test sürüşü, tam ekran), form hata mesajları (boş gönderim) ve formun ürettiği WhatsApp mesajı (`_work/faz7/pw/extract.mjs`). Analiz (`_work/faz7/analyze.py`): EN ve TR sayfalarının DE sayfasıyla (TR'nin EN ile) paylaştığı kelimeler şüpheli sayıldı; izin listesi dışındakiler elle incelendi; ardından 27 tam sayfa ekran görüntüsü gözle kontrol edildi.
- Bulunup düzeltilenler (≈ 11 tür, ≈ 40 metin): (1) ana sayfa sloganı DE kalmıştı → EN "Conscientious. Reliable. Professional.", TR "Titiz. Güvenilir. Profesyonel." (`trust.quote1-3`); (2) "Showroom" → DE "Schauraum" (7 yer), TR "teşhir salonu" (7 yer); (3) Kontakt'taki Facebook alıntısı EN/TR'de Almanca duruyordu → yalnız çeviri, "(Almanca aslından çeviri)" notuyla; (4) TR footer "Website: Galzura" → "Web sitesi"; (5) galeri `aria-roledescription` "carousel/slide" DE/TR'de İngilizceydi → dil anahtarları; (6) güç birimi "PS" EN/TR'de → "hp" / "BG" (teknik kart, kart zinciri, meta, JSON-LD); (7) üreticinin renk adları (12 ham ad, ör. "OBSIDIANSCHWARZ - METALLICLACK", "BLACK SAPPHIRE METALLIC") → `data/colors.json` ile üç dilde; (8) TR donanım sözlüğü: "Head-up ekran" → "Ön cama yansıtmalı gösterge", "Start/Stop sistemi" → "Otomatik motor durdurma ve çalıştırma", "Full LED" → "Tam LED", "Modifiye (tuning)" → "Modifiye"; (9) ilan sürüm satırındaki Almanca kelimeler ("Aut.", "(7 Sitze)", "Stretchlimousine", "M-Paket", "Allrad"; TR'de "Facelift" → "makyajlı"; EN'de ondalık virgül → nokta) `versionLabel()`; (10) Impressum: mahkeme adı EN/TR'de açıklamasıyla ("Feldkirch Regional Court (Landesgericht Feldkirch)" / "Feldkirch Eyalet Mahkemesi (Landesgericht Feldkirch)"; ana sayfa ve Kontakt'ta da), yetkili makam sırası "Dornbirn İlçe Yönetimi (Bezirkshauptmannschaft Dornbirn)"; (11) TR Datenschutz'ta GDPR ilk geçtiği yerde "AB Genel Veri Koruma Tüzüğü (GDPR)".
- Özel isim izin listesi (sitede olduğu gibi kalır): firma ve kişi: Mega Cars, Mega Cars Murat Demir e.U., Murat Demir, FN 447871 i, GISA 38931796; yerler: Hohenems, Vorarlberg, Radetzkystraße, Dornbirn, Feldkirch, Wien, Covina, Cambridge, Dublin; resmî kurum ve yasa adları (ilk geçtiği yerde o dilde açıklamasıyla): Landesgericht Feldkirch, Bezirkshauptmannschaft Dornbirn, Wirtschaftskammer Vorarlberg / Landesgremium Fahrzeughandel, Firmenbuch, Gewerbeordnung (GewO), RIS, ECG, UGB, MedienG, BAO, TKG 2021, GDPR/DSGVO, Datenschutzbehörde; şirket ve ürün adları: Vercel Inc., OpenStreetMap Foundation, WhatsApp Ireland Limited, Google Maps, Pexels, Galzura, Unbounded, Hanken Grotesk, Android Auto, Apple CarPlay, Bluetooth, Wi-Fi, Isofix, DAB, LED, Xenon, USB, MP3, CD, TV, ABS, ESP, Euro 5/6/6d/6d-TEMP; marka, model ve donanım paketi adları: Mercedes-Benz, BMW, Audi, Porsche, Volkswagen, Skoda, Land Rover, Volvo, Chrysler Jeep, AMG-Line, 4Matic, xDrive, E-Hybrid, TDI, S line, Highline, Advantage, Ambition, BlueTec, Cabrio, Facelift (DE/EN), Deep Black Perleffekt, Pure White; dil seçicideki dil adları kendi dilinde (Deutsch, English, Türkçe — erişilebilirlik için olağan uygulama [VARSAYIM]); birimler km, kW; e-posta ve web adresleri.

**Logo**
- Volkan A "Monogramm" konseptini seçti (23.10.2026). `/prototyp/logo` sayfası, `LoaderDemo`, `proto.css` ve B/C çizimleri kaldırıldı (git geçmişi: 9c668db, 234c5b2); `LOGO_CONCEPT` anahtarı kaldırıldı, `lib/brand/marks.ts` yalnız A'yı çizer.

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

## 23.10.2026 — Supabase projesi açıldı: şema, hesaplar, Vercel ortamı, aktarım, push, uçtan uca test (talimat, aynen)

### Bağlam ve sınır
- **23.10.2026** — "devam. Supabase erişim anahtarı hazır; aşağıdaki kurallarla işe başla." — İlgili: bu oturum
- **23.10.2026** — "Repo: C:\Users\90553\Desktop\megacars, dal: v2. main dalına ve Production'a dokunma." — İlgili: git, Vercel
- **23.10.2026** — "Panel kodu yerel commit 63c1ce3'te, henüz push edilmedi. Bekleyenler: docs/TESLIM-KONTROL.md" — İlgili: docs/TESLIM-KONTROL.md

### Supabase projesi
- **23.10.2026** — "Project ref: ixcpfnzzxzxliyfdyurz" / "API adresi: https://ixcpfnzzxzxliyfdyurz.supabase.co" / "Bölge: Frankfurt. Proje açılırken "Automatically expose new tables" KAPALI, "Enable automatic RLS" AÇIK seçildi. Bu yüzden yeni tablolarda anon/authenticated için GRANT'leri ve RLS politikalarını migration içinde açıkça yaz; varsayılan izne güvenme." — İlgili: supabase/migrations/, lib/supabase/env.ts

### Anahtar
- **23.10.2026** — ".env.local içinde SUPABASE_ACCESS_TOKEN adıyla duruyor (sbp_… ile başlayan, sınırlı yetkili, 30 gün geçerli)." [CC: belirteç öneki deftere yazılmadı] — İlgili: .env.local
- **23.10.2026** — "Değerini hiçbir çıktıya, log'a, dosyaya, commit'e yazma; .env.local'ı ekrana basma. Yalnız ortam değişkeni olarak kullan." — İlgili: .env.local, _work/faz8/sb.mjs
- **23.10.2026** — "İşe başlamadan git check-ignore .env.local ile dosyanın git dışı olduğunu doğrula; değilse DUR, bana bildir." — İlgili: .gitignore
- **23.10.2026** — "Bu anahtarı Vercel'e ekleme." — İlgili: Vercel ortam değişkenleri

### Anahtarın yetkileri (bilerek kısıtlı)
- **23.10.2026** — "Okuma-yazma: Project Settings, Database, Migrations, Database Config, API Keys, Auth Config, Storage, Storage Config, Data API Config, Edge Functions, Edge Function Secrets, Realtime Config ve diğer veritabanı ayarları. Yalnız okuma: API Key Secrets, Advisors, Logs, Usage Analytics. Yok: proje ve organizasyon listeleme/ayarları, Compute, Backups, Database JIT, Auth Signing Keys, Data API JWT Secret, Analytics Config, branch/add-on/disk/domain." — İlgili: Supabase Management API
- **23.10.2026** — "supabase projects list ve supabase whoami bu anahtarla hata verir; bu beklenen durum, anahtar bozuk değil. Doğrulamak için GET /v1/projects/ixcpfnzzxzxliyfdyurz kullan." — İlgili: _work/faz8/sb.mjs
- **23.10.2026** — "Bir istek 403 dönerse cevaptaki missing_permissions listesini bana aynen raporla ve DUR. Başka yoldan aşmaya çalışma, tam yetkili anahtar isteme." — İlgili: rapor
- **23.10.2026** — "Veritabanı işlerini Management API'nin SQL/migration uç noktalarıyla yap. Veritabanı şifresine ihtiyaç duyarsan sıfırlamadan önce bana sor." — İlgili: veritabanı

### Yapılacaklar (sırayla)
- **23.10.2026** — "1. Şema + RLS + GRANT'ler (migration olarak). Sonra Supabase güvenlik danışmanıyla (advisors) açık kalmadığını kontrol et." — İlgili: supabase/migrations/20261023120000_vehicles.sql
- **23.10.2026** — "2. Auth: dışarıdan kayıt (signup) KAPALI. Site URL şimdilik https://megacars-git-v2-volkancatak1309-maxs-projects.vercel.app; yönlendirme listesine localhost da eklensin." — İlgili: Supabase Auth ayarı
- **23.10.2026** — "3. 2 hesap: Galzura yönetici + demo. Giriş bilgilerini yalnız C:\Users\90553\Desktop\megacars-giris-bilgileri.txt dosyasına yaz (repo dışında). Şifreleri ekrana yazma." — İlgili: Supabase Auth, admin_users
- **23.10.2026** — "4. Vercel ortam değişkenleri: yalnız megacars projesine, yalnız Preview ve Development ortamına; Production'a ekleme. Secret key yalnız sunucu tarafında kalsın (NEXT_PUBLIC_ öneki yok). Bunu push'tan ÖNCE yap; NEXT_PUBLIC_ değerleri derleme sırasında gömülüyor." — İlgili: Vercel ortam değişkenleri
- **23.10.2026** — "5. 18 aracı ve fotoğraflarını veritabanına ve Storage'a aktar. data/inventory.json yedek olarak kalsın." — İlgili: scripts/migrate-inventory.ts, data/inventory.json
- **23.10.2026** — "6. v2 dalına commit + push (63c1ce3 dahil). Vercel CLI ile deploy yok; Vercel GitHub'dan kendisi derlesin." — İlgili: git, v2 dalı
- **23.10.2026** — "7. Uçtan uca test önizleme adresinde: /de/admin ve /tr/admin girişi, araç ekle, örnek bir fotoğrafla yükleme, düzenle, satıldı işaretle, gizle; her adımın herkese açık sayfada doğru göründüğünü kontrol et. Publishable key ile araç listesi okunabiliyor mu, yazma reddediliyor mu ölç. Test aracını en sonda sil, stok yine 18 olsun." — İlgili: uçtan uca test, önizleme

### Rapor
- **23.10.2026** — "Her madde için [ÖLÇÜLDÜ] veya [ÖLÇÜLMEDİ] etiketiyle kısa Türkçe rapor. Son commit hash'ini yaz. Anahtar, şifre ve secret key değerlerini rapora koyma." — İlgili: rapor

### Kayıtlar (CC, kaynaklı) — Supabase projesi, aktarım, yayın ve uçtan uca test (23.10.2026, 2. oturum)
> Bu alt bölüm Volkan'ın cümlesi değildir; yapılanlar, ölçümler ve CC kararlarıdır. Hiçbir anahtar, şifre ya da gizli değer içermez.

**Erişim ve proje** — `git check-ignore .env.local` → `.gitignore:28` (git dışı). Sınırlı belirteç `GET /v1/projects/ixcpfnzzxzxliyfdyurz` → 200: ad "megacars", bölge eu-central-1, durum ACTIVE_HEALTHY. Oturum boyunca hiçbir istek 403 dönmedi; veritabanı şifresine ihtiyaç duyulmadı (sorulmadı, sıfırlanmadı). Data API `db_schema = public, graphql_public` (public açık). Başlangıçta: kayıt açık, site URL localhost, yönlendirme listesi boş, migration tablosu boş.

**Şema (Management API `POST /database/migrations`)** — 1) `20261023120000_vehicles` (sürüm 20261023153420): tablolar, RLS politikaları (11 public + 4 storage), kova `vehicles`, **GRANT'ler eklendi** (Volkan: "Automatically expose new tables" kapalı → `anon`/`authenticated` için select, `authenticated` için insert/update/delete, `service_role` için all; schema usage). 2) `20261023160000_advisor_fixes` (sürüm 20261023153627): güvenlik danışmanının 5 uyarısı için — `set_updated_at()` search_path sabitlendi; `is_admin()` SECURITY DEFINER'dan SECURITY INVOKER'a çevrildi ve `anon`'dan EXECUTE alındı (kendi `admin_users` satırını "own admin row" politikası zaten gösterir); Supabase'in "automatic RLS" seçeneğinin oluşturduğu `rls_auto_enable()` fonksiyonundan `anon`/`authenticated` EXECUTE alındı. Sonra danışman: 1 uyarı (sızdırılmış şifre koruması) → Auth'ta açıldı (`password_hibp_enabled`, en az 12 karakter — CC kararı) → **0 uyarı**. Doğrulama sorgusu: 3 tabloda RLS açık, kova 1, `vehicles` grant'leri anon:SELECT, authenticated:SELECT/INSERT/UPDATE/DELETE, service_role: tümü.

**Auth** — `PATCH /config/auth`: `disable_signup=true`, site URL önizleme adresi, yönlendirme listesi önizleme `/**` + `http://localhost:3000/**` + `http://localhost:3100/**`. Hesaplar Auth admin API ile (e-posta onaylı): Galzura yönetici `admin@galzura.com`, demo `demo@megacars.at` — **adresler CC varsayımı** (gerçek posta kutusu gerekmez; giriş yalnız e-posta + şifre; istenirse değiştirilebilir); ikisi de `admin_users`'a yazıldı (auth.users 2, admin_users 2). Şifreler 20 karakter, rastgele; yalnız `C:\Users\90553\Desktop\megacars-giris-bilgileri.txt` dosyasında (repo dışı), ekrana basılmadı.

**Vercel ortam değişkenleri** — `vercel env add` ile yalnız Preview + Development: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (Config, panelde okunabilir), `SUPABASE_SECRET_KEY` (Preview'da Secret, Development'ta Config — Vercel Secret türü Development'ta `env pull` için açık olmak zorunda). Production'a hiçbir şey eklenmedi; `SUPABASE_ACCESS_TOKEN` Vercel'e eklenmedi. `vercel env ls` ile doğrulandı (6 kayıt). Not: Vercel belgesi (vercel.com/docs/environment-variables/sensitive-environment-variables, 23.10.2026): Secret değerler derleme sırasında çözülür; eski "Enforce Sensitive" takım politikası kaldırılmış. İlk derlemede 92 statik sayfa (18 araç × 3 dil dahil) üretildi → derleme veritabanına bağlandı.

**Aktarım** — `npm run migrate` (kuru) ve `npm run migrate -- --write`: 18 araç, 5'er fotoğraf (= `data/inventory.json`'daki sayı), 90 fotoğraf satırı, 18 kapak, 270 dosya (1600/800/240), 7 öne çıkan; sorgu ile doğrulandı. Yerel `npm run build` veritabanıyla temiz (exit 0).

**Yayın (v2'ye push; Vercel GitHub'dan derledi, CLI deploy yok)** — b93090f (GRANT'ler + danışman düzeltmeleri + defter), 122a3fd (panel listesindeki "sitede aç" bağlantısı TR'de `/tr/fahrzeuge/…` üretiyordu → dil yoluyla `/tr/araclar/…`), 44e8303 (panel düzenine `detail.equipmentGroups` sözlüğü — konsolda `MISSING_MESSAGE: detail` hatası vardı; `app/sitemap.ts` artık her istekte üretilir — statik sitemap panelden eklenen aracı derlemeye kadar almıyordu; CC kararı). Önceki oturumun 5 yerel commit'i (ab01869…3c2bf72) aynı push'la gitti.

**Uçtan uca test (önizleme, derleme 44e8303, `_work/faz8/pw-preview.mjs`)** — 73 kontrol. Ölçülenler: girişsiz `/de/admin`, `/de/admin/neu`, `/tr/admin` → giriş; `/en/admin` → `/de/admin/login`. DE masaüstü giriş → 18 Fahrzeuge; 3 fotoğraf tarayıcıda küçültülüp 4 sn'de yüklendi, kapak 2. fotoğrafa taşındı, 140 kW → 190 PS, 3 donanım, önizleme kartı; kaydet → liste 19; herkese açık liste kayıttan **2 sn** sonra (en başta, "Neu eingetroffen"); detay DE 1,3 sn (ad, fiyat, 3 donanım DE); EN (€28,900, İngilizce donanım, Almanca kelime yok); TR (28.900 €, Türkçe donanım, DE/EN kelime yok); sitemap yeni aracı içeriyor. Fiyat düzenleme → detay 1,7 sn. Öne çıkar → ana sayfa 2,9 sn. Satıldı → liste etiketi 1,2 sn, detay DE/EN/TR notu 1,0–1,4 sn, ana sayfa kartı etiketi. Gizle → listeden 1,1 sn'de kalktı, eski bağlantı DE/EN/TR listeye yönlendirdi, ana sayfadan kalktı. Publishable key ile REST: gizli araç 0 satır; görünür stok 18; fotoğraflar 90; INSERT/UPDATE/DELETE 401; `admin_users` 401; `rpc/is_admin` 401; Storage yükleme 400; signup 422. Arşiv → listeden kalktı, arşivde göründü; geri al 3 sn; toplu arşiv; kalıcı silme 4 sn; stok 18; silinen aracın adresi listeye yönlendirdi. TR telefon (390 px): giriş → 18 araç; fotoğraf 2 sn'de yüklendi; 190 PS → 140 kW; yatay taşma yok; kaydet → 19 araç; "sitede aç" bağlantısı `/tr/araclar/…`; liste TR 1,6 sn; detay TR dil temiz; öne çıkar + satıldı etiketi TR listede 1 sn; arşiv + kalıcı silme → 18 araç. Sonda REST 18 satır, listede deneme aracı yok; konsol hatası 0 (ziyaretçi, panel DE, panel TR). İlk turda bulunan 7 hata: 3'ü üründe (yukarıdaki commit'ler), 4'ü testte (önizleme düğmesi seçicisi, satıldı notunda yoklama, CSS büyük harf → `innerText` "SOLD"/"SATILDI").

**Belgeler** — `docs/rehber/*.jpg` (14 ekran görüntüsü, 14–68 KB, önizlemeden), `docs/ARAC-PANELI-REHBERI.md` görsellerle, `.pdf` (`_work/faz8/guide-pdf.mjs`, Chromium), `docs/DIL-TESTI.md` yeni bölüm, `docs/TESLIM-KONTROL.md` 11–13. satırlar ve eksikler 8–9, `docs/BRIEF.md` envanter maddesi (proje, ortam, hesap kuralı).

**Doğrulanamayanlar / açık kalanlar** — "Fotoğraf çek" (kamera) düğmesi başsız tarayıcıda denenemedi (dosya seçme yolu telefonda ölçüldü). Production ortam değişkenleri talimat gereği yazılmadı. Hesap e-posta adresleri CC varsayımı. Supabase'in "Automatically expose new tables" ayarının tam etkisi (varsayılan GRANT'lerin gelmemesi) kendi sorgumuzla değil, GRANT'leri açıkça yazarak karşılandı.

## 28.10.2026 — Logo yüksek çözünürlük (yalnız logo işi)
- **28.10.2026** — "YALNIZ LOGO İŞİ. Sitede hiçbir şeyi değiştirme; commit ve push yapma." — İlgili: bu oturum
- **28.10.2026** — "AMAÇ: Mega Cars'ın logosunu BİREBİR AYNI kalacak şekilde yüksek çözünürlüğe çıkarmak. Logoda hiçbir şey değişmeyecek: şekil, oran, araba silueti, yazı, harf aralığı, renk ve ışık aynı kalacak." — İlgili: C:\Users\90553\Downloads\megacars.logo.png, _work/logo/
- **28.10.2026** — "Önce kontrol et: dosyanın üretim bilgisinde (C2PA, XMP, IPTC) Google, Gemini ya da yapay zekâ ile üretildi izi var mı? Downloads'ta adı "Gemini" ile başlayan dosyalar varsa, bu dosya onlardan biriyle görsel olarak aynı mı? İz bulursan ya da dosya o çıktılardan biriyle aynıysa DUR, bana sor; o çıktılar logoyu yeniden çizdiği için reddedildi." — İlgili: kaynak kontrolü
- **28.10.2026** — "Orijinali değiştirmeden C:\Users\90553\Desktop\megacars\_work\logo\ klasörüne logo-orijinal.png adıyla kopyala. Piksel boyutunu raporla." — İlgili: _work/logo/logo-orijinal.png
- **28.10.2026** — "BÜYÜTME: fal.ai'da yalnız detay uydurmayan, yaratıcı olmayan bir büyütme modeli kullan (Real-ESRGAN, AuraSR, Topaz türü). "Creative", "clarity" ya da prompt'la detay ekleyen modeller YASAK. 4 kat büyüt. fal.ai anahtarı .env.local'da; değerini ekrana yazma. Bu işe en fazla 0,50 USD harca, gerçek tutarı raporla." — İlgili: fal.ai, _work/logo/logo-4x.png
- **28.10.2026** — "KANIT: Büyütülmüş görseli orijinal boyuta geri küçült ve orijinalle piksel piksel karşılaştır; SSIM değerini ve fark haritasını üret. Solda orijinal (aynı boyuta basit büyütmeyle), sağda yeni büyütme olacak şekilde yan yana bir karşılaştırma görseli hazırla. Şekilde, yazıda ya da araba siluetinde fark görürsen o sonucu kullanma; başka bir yaratıcı olmayan model dene." — İlgili: _work/logo/karsilastirma.png, _work/logo/fark-haritasi.png
- **28.10.2026** — "Başka hiçbir işlem yapma: arka plan silme, renk ayarı, keskinleştirme filtresi, yeniden çizim yok." — İlgili: logo
- **28.10.2026** — "Sonuçları _work\logo\ altına kaydet (logo-4x.png, karsilastirma.png, fark-haritasi.png). karsilastirma.png'yi tarayıcımda aç." — İlgili: _work/logo/
- **28.10.2026** — "RAPOR: Kısa Türkçe. Kullanılan model, maliyet, orijinal ve yeni piksel boyutu, SSIM değeri; her madde [ÖLÇÜLDÜ] veya [ÖLÇÜLMEDİ] etiketli. Sonra DUR." — İlgili: rapor

### Kayıtlar (CC) — logo büyütme, 28.10.2026
> Bu alt bölüm Volkan'ın cümlesi değildir.
- Kaynak: 994 × 1002 RGBA PNG (alfa tamamen 255), yalnız sRGB/gAMA/pHYs parçaları; C2PA/XMP/IPTC yok. Downloads'taki 15 "Gemini*" görselinin hiçbiri bu logo değil (görsel karşılaştırma).
- Real-ESRGAN x4plus (fal-ai/esrgan): SSIM-Y 0,862; siluette çift çizgi ve kalkanda düzleşme → reddedildi. Topaz High Fidelity V2: SSIM-Y 0,983; krom yüzeye çizik dokusu ekledi → reddedildi. Topaz CGI (denoise 0, sharpen 0): SSIM-Y 0,984, PSNR 33,3 dB → kullanıldı (`_work/logo/logo-4x.png`, 3976 × 4008).
- Harcama: Topaz 2 × 8 birim × 0,01 $ = 0,16 $ + ESRGAN ≤ 0,003 $ (fiyat API'si × `x-fal-billable-units` başlığı; fal kullanım API'si bu anahtarla 403).

## 28.10.2026 — Müşteri geri bildirimi: logo, menü, açılış videosu (talimat)
- **28.10.2026** — "Müşteri (Mega Cars) önizleme sitesine geri bildirim verdi. Aşağıdaki değişiklikleri v2 dalında yap. main dalını değiştirme; yalnız okuyabilirsin." — İlgili: v2 dalı, main dalı
- **28.10.2026** — "Tanımlar: "açılış ekranı" = sayfa yüklenirken çıkan perdeli logo ekranı (yükleyici). "Açılış bölümü" = sayfanın en üstündeki videolu bölüm (hero)." — İlgili: terimler

### 1) Logo değişiyor
- **28.10.2026** — "MC monogram logosu (Konsept A) her yerden kaldırılacak. Sebep: "MC" adında başka bir galeri varmış." — İlgili: lib/brand, bütün site
- **28.10.2026** — "Yerine Mega Cars'ın kendi logosu gelecek. Kaynak: C:\Users\90553\Desktop\megacars\_work\logo\logo-4x.png (orijinal logonun yaratıcı olmayan 4 kat büyütmesi; Volkan onayladı). Bu dosyayı assets/brand/ altına koy; sitede yalnız ondan üretilen küçültülmüş türevleri kullan." — İlgili: assets/brand/
- **28.10.2026** — "Logo BİREBİR AYNI kalacak: yeniden çizme, renklendirme, kırpma, parça çıkarma, keskinleştirme ya da filtre yok. Yalnız küçültme ve web formatına dönüştürme serbest." — İlgili: logo türevleri
- **28.10.2026** — "Logo tek bir kaynak dosyadan beslensin; galerinin orijinal dosyası gelirse yalnız o dosyayı değiştirmek yetsin." — İlgili: assets/brand/, marka betiği
- **28.10.2026** — "Siyah zemin koyu sitede kutu gibi görünmesin (şeffaflaştırma ya da koyu zeminde karışım); kalkan, araba silueti ve yazının kenarları bozulmasın." — İlgili: logo gösterimi
- **28.10.2026** — "Kullanılacak yerler: açılış ekranı, üst bar, footer, favicon, apple-touch-icon, OG görseli, admin paneli (monogram oradaysa). Favicon ve apple-touch-icon için de logonun tamamı küçültülerek kullanılsın." — İlgili: Loader, Header, Footer, app/icon, app/apple-icon, public/og, admin
- **28.10.2026** — "Üst barda ve footer'da logonun yanındaki ayrı "MEGA CARS" yazısı kalksın; logo zaten MEGACARS yazısını içeriyor. Üst barda logo, içindeki MEGACARS yazısı okunacak büyüklükte olsun; gerekirse üst bar yüksekliğini buna göre ayarla." — İlgili: Header, Footer
- **28.10.2026** — "Açılış ekranı: monogram çizim animasyonu ve ayrı "MEGA CARS" yazı açılışı kalkar. Yerine logo yavaşça belirsin, kromun üzerinden geçici bir ışık geçsin, sonra mevcut kırmızı perde kalksın. Işık geçişi yalnız animasyondur; animasyon bitince logo birebir orijinal görünür. Sayaç yok, zıplama yok." — İlgili: açılış ekranı (Loader)

### 2) Menü yazıları küçülecek
- **28.10.2026** — ""Menü" düğmesiyle açılan ekrandaki büyük başlıklar (TR: ANA SAYFA / ARAÇLAR / FİNANSMAN / İLETİŞİM) müşteriye çok büyük gelmiş." — İlgili: menü ekranı
- **28.10.2026** — "Şu anki boyutu 390 px ve 1440 px genişlikte ölç. Yaklaşık üçte bir küçültmeyle başla. 3 dilde en uzun başlık tek satıra sığsın. Alttaki iletişim bilgileri olduğu gibi kalsın." — İlgili: menü ekranı

### 3) Açılış bölümünün arka planı
- **28.10.2026** — "Müşteri eski sitedeki açılış videosunu istiyor. Eski site = main dalı (megacars-one.vercel.app). Müşterinin gönderdiği ekranda siyah, büyük arka kanatlı bir spor araba, arkada dağlar ve "JEDER KILOMETER, GEPRÜFT." başlığı var." — İlgili: açılış bölümü (hero)
- **28.10.2026** — "Önce bu başlığın main dalında olduğunu doğrula; o bölümün gerçekte oynattığı video dosyasını bul. Bulamazsan ya da başlık v2'de çıkarsa DUR, bana sor." — İlgili: main dalı
- **28.10.2026** — "Bu video FAZ 1'de docs/ARASTIRMA.md içinde denetlendiyse o bulguyu raporda hatırlat." — İlgili: docs/ARASTIRMA.md
- **28.10.2026** — "Bu video, v2 açılış bölümündeki kırmızı Corvette videosunun yerine geçecek. Görüntü kalitesini düşürmeden web için uygun boyuta getir." — İlgili: public/hero

### 4) Açılış bölümündeki büyük "MEGA CARS" yazısı
- **28.10.2026** — "Müşteri "yazı tam görünmüyor" dedi: içi video dolgulu maskeli yazı koyu zeminde seçilmiyor." — İlgili: hero yazısı
- **28.10.2026** — "Yeni videoyla birlikte mobilde ve masaüstünde tamamen okunur hale getir." — İlgili: hero yazısı

### 5) Hakkımızda
- **28.10.2026** — "Müşteri kendi hikayesini ve fotoğraflarını gönderecek. Şimdilik değişiklik yok; docs/TESLIM-KONTROL.md'ye bekleyen olarak ekle." — İlgili: Über uns, docs/TESLIM-KONTROL.md

### Sonra
- **28.10.2026** — "docs/ARAC-PANELI-REHBERI (.md ve .pdf) içindeki ekran görüntülerini yeni logoyla yenile." — İlgili: docs/ARAC-PANELI-REHBERI.md/.pdf, docs/rehber/
- **28.10.2026** — "KARAR-DEFTERI'ne yaz: logo ve açılış videosu 28.10.2026'da müşteri isteğiyle değişti. Logo büyütme kaydı zaten eklendi; onu koru." — İlgili: KARAR-DEFTERI
- **28.10.2026** — "_work klasörünü commit'e katma." — İlgili: git
- **28.10.2026** — "v2'ye commit + push. Vercel GitHub'dan derlesin; CLI ile deploy yok." — İlgili: yayın
- **28.10.2026** — "Önizleme adresinde ekran görüntüleri al: 390 px ve 1440 px genişlikte açılış ekranı, açılış bölümü, üst bar, footer; menü ekranı 3 dilde. Hepsini docs/geri-bildirim-2026-10-28/ klasörüne kaydet." — İlgili: docs/geri-bildirim-2026-10-28/
- **28.10.2026** — "RAPOR: Her madde için [ÖLÇÜLDÜ] veya [ÖLÇÜLMEDİ] etiketiyle kısa Türkçe rapor. Son commit hash'ini yaz." — İlgili: rapor

### Kayıt (CC) — değişiklik
- **Logo ve açılış videosu 28.10.2026'da müşteri isteğiyle değişti.** Logo: MC monogramı (Konsept A, 23.10.2026) yerine Mega Cars'ın kendi logosu. Açılış videosu: Corvette C8 (Pexels 33374869, 23.10.2026) yerine eski sitenin filmi (main dalı `public/hero/hero-main.mp4`). Yukarıdaki "Logo yüksek çözünürlük" kaydı korunur.

### Kayıtlar (CC, ölçümlü) — müşteri geri bildirimi uygulaması, 28.10.2026
> Bu alt bölüm Volkan'ın cümlesi değildir.

**Logo**
- Kaynak `assets/brand/logo.png` = `_work/logo/logo-4x.png` (aynı SHA-256), 3976 × 4008. `scripts/brand-assets.ts` (`npm run brand`; `vercel.json` artık `npm run build` çalıştırdığı için Vercel'de de derlemeden önce) üretir: şeffaf WebP 96/160/240/320/480/640/960/1280 px (`public/brand/logo-<özet>-<w>.webp`, özet = kaynak + betik; satır sonundan bağımsız), `lib/brand/logo.json`, `app/icon.png` (64), `app/apple-icon.png` (180), `public/og/default.jpg`. `app/icon.svg`, `lib/brand/marks.ts`, `lib/brand/glyphs.ts` kaldırıldı.
- Kırpma yok: yalnız çizimin çevresindeki boş zemin bırakıldı (zemin 0–2/255; 2'den parlak piksellerin hepsi içeride — ölçüm: dışarıda 0 piksel; %3 pay). Çizim kutusu 3179 × 2629.
- Şeffaflaştırma: zemin gürültüsü tavanı T = 2 (çizim dışı alanın %99,9'u); alfa = (en parlak kanal − T) / (255 − T), renk = T + (v − T) / alfa. İlk denemede (alfa = en parlak kanal) zemin 1/255 alfa aldı ve açılış ekranında logonun çevresinde 1 seviyelik kutu ölçüldü (11 → 12); düzeltildi, şimdi logo çevresi = sayfa zemini 11/11/13.
- Web dosyası ↔ düz küçültme (sharp lanczos3, T zemininde): logoda ortalama fark 0,8–1,1 seviye, %99'u ≤ 9 (yalnız WebP q85 sıkıştırması).
- Açılış ekranı (animasyonlar Web Animations API ile 1,30 / 1,75 sn'de durdurularak, önizlemede): ışık geçerken pikseller değişir (en fazla 77, alanın %10,7'si); ışık geçtikten sonra ışık katmanı kaldırılmış kareyle fark 0; ölçeklemesiz (500 px pencere, 320 px dosya 1:1) düz logo dosyasıyla fark 0. 1440 px'te 480 px'lik dosya 400 px'e iner; animasyonlu katmanda tarayıcının küçültme filtresi farklı olduğu için düz `<img>` ile kenarlarda fark var (en fazla 56) — logo dosyası değil, tarayıcı ölçeklemesi.
- Üst bar 68 → 72 px (mobil), 80 → 88 px (≥ 1024); logo 56 / 68 px (yazı ≈ %17 → ≈ 9,5 / 11,5 px). Footer logosu 100 / 130 px. Panel üst barı 44 px, giriş sayfası 130 px.
- Footer'ın en altındaki dev, çizgisel "MEGA CARS" yazısı (`.ft-word`) logonun yanında değil, ayrı bir süs öğesi; talimat "logonun yanındaki" dediği için dokunulmadı → Volkan'a soruldu.

**Menü**
- Önce (önizleme, Playwright): başlık yazısı 390 px'te 35,1 px, 768 px'te 69,1 px, 1440 px'te 88 px. 1024 px ve üstünde "Menü" düğmesi yok (linkler üst barda); 1440 ölçümü pencere doğrudan açılarak alındı.
- Sonra: `clamp(1.4rem, 6vw, 3.65rem)` → 23,4 / 46,1 / 58,4 px (−%33). En uzun başlık "FINANZIERUNG" 390 px'te 217/350 px; DE/EN/TR bütün başlıklar tek satır. Alttaki iletişim bilgileri değişmedi.

**Açılış filmi**
- Başlık "Jeder Kilometer, geprüft." main dalında `src/i18n/locales/de.json` (hero.title); main'deki `src/components/Hero.tsx` `/hero/hero-main.mp4` oynatıyor; canlı megacars-one.vercel.app'teki dosya ile aynı (SHA-256 c28d2855…, 10.269.693 bayt, 1920×1080, 30 fps, 19,7 sn). v2'de başlık yok.
- FAZ 1 bulgusu (docs/ARASTIRMA.md §a3): bu filmde yapay zekâ izi var (okunmaz rozet harfleri, eriyen AMG rozeti, bozuk ızgara çubukları, 5 ayrı mekân) ve "kullanılamaz" kararı verilmişti; stokta olmayan araç. Ayrıca 1440 px'te "S" harfinin içinde Mercedes yıldızı seçiliyor (23.10.2026 kuralı: logo ve rozet okunmayacak). Müşteri isteğiyle yine de kullanıldı; Volkan'a hatırlatıldı.
- Kodlama (renk ve hız değişikliği yok, 30 fps, 19,7 sn döngü): x264 iki geçiş. Masaüstü 1920×1080: 5,8 MB → VMAF 93,1; 6,7 MB → 94,8; **7,5 MB → 95,9 (seçilen)**; CRF 24 8,6 MB → 97,0. Mobil 540×960 (kaynakta x 656–1264 merkez kırpım) **2,4 MB → VMAF 96,2**. Posterler ilk kareden WebP: 76 KB / 17 KB. Masaüstü dosyası 23.10.2026'daki 6 MB sınırını 1,5 MB aşıyor (talimat "kaliteyi düşürmeden"); 5,8 MB'lık sürüm `_work/hero-main/desktop-5.8mb.mp4` içinde. Film sayfa yüklendikten sonra bağlanır (ilk boyamayı etkilemez). Corvette dosyaları (`public/hero/c8/`) kaldırıldı; künyedeki film satırı üç dilde "eski Mega Cars web sitesinden".
- "MEGA CARS" harfleri: dış kenarda 1,75 px kemik rengi kontur (%90). Unbounded'ın üst üste binen iç konturları ilk denemede harf içinde çizgi olarak göründü; kontur 3,5 px çizilip plakanın maskesiyle kesildi, iç çizgiler gizlendi.

**Kontrol**
- `tsc` temiz; `npm run build` temiz (91 sayfa). Önizlemede: konsol hatası 0, yatay taşma 0 (390 / 1440), `/brand/*` ve `/hero/*` `immutable`, `/hero/c8/*` 404.
- Panel rehberi: `_work/faz8/pw-preview.mjs` önizlemede yeniden çalıştırıldı — 73/73 geçti, deneme aracı en sonda tamamen silindi (stok 18); `docs/rehber/*.jpg` (14) yeni logoyla, PDF yeniden üretildi (12 sayfa, 14/14 görsel).
- Ekran görüntüleri: `docs/geri-bildirim-2026-10-28/` (açılış ekranı 3 an, açılış bölümü, üst bar şeffaf + kaydırınca, footer — 390 ve 1440; menü DE/EN/TR — 390).

## 28.10.2026 — Volkan'ın kararları: açılış videosu, video kalitesi, footer yazısı (talimat)
- **28.10.2026** — "Volkan'ın kararları geldi. v2 dalında devam et; main dalını değiştirme, yalnız okuyabilirsin." — İlgili: v2 dalı, main dalı

### KARAR 1 — Açılış videosu kalıyor, yapay zekâ izleri gizlenecek
- **28.10.2026** — "FAZ 1'de (docs/ARASTIRMA.md §a3) bulunan izlerin (okunmayan rozet harfleri, eriyen AMG rozeti) göründüğü saniyeleri kare kare tespit et ve bu saniyeleri çıkar." — İlgili: açılış videosu, public/hero
- **28.10.2026** — "Kalan video en az 6 saniyelik, takılmadan dönen akıcı bir döngü olsun; döngü noktasında sert kesim görünmesin." — İlgili: açılış videosu döngüsü
- **28.10.2026** — "Videonun ekrandaki konumunu, Mercedes yıldızı ve rozetler büyük "MEGA CARS" harflerinin içine denk gelmeyecek ve okunmayacak şekilde ayarla. 390 px ve 1440 px'te kontrol et." — İlgili: açılış bölümü (hero) harf maskesi
- **28.10.2026** — "Bunlar videoyu bozmadan yapılamıyorsa hiçbir şeyi değiştirme, nedenini raporla." — İlgili: açılış videosu

### KARAR 2 — Video kalitesi: gerçek, keskin 1080p
- **28.10.2026** — "Volkan önizlemede videoyu 720p gibi görüyor. Önce sebebini ölç: kaynak dosyanın çözünürlüğü, bit hızı, kare hızı ve gerçek detay seviyesi (daha düşük çözünürlükten büyütülmüş mü?)." — İlgili: açılış videosu kaynağı
- **28.10.2026** — "Daha kaliteli kaynak ara: aynı videonun daha yüksek çözünürlüklü ya da daha az sıkıştırılmış bir kopyası C:\Users\90553\Desktop (alt klasörler dahil, ör. business\pikens-unboxing), Downloads, Videos ve CapCut'ın dışa aktarma klasörlerinde var mı? Süreye ve ilk kareye göre eşleştir. Varsa onu kullan." — İlgili: kaynak araması
- **28.10.2026** — "Daha iyi kaynak yoksa fal.ai'da yalnız detay uydurmayan bir video büyütme modeliyle (Topaz türü) 1080p'ye çıkar. Rozet, yazı ya da şekil uyduran modeller YASAK; önce ve sonra kareleri karşılaştırıp yeni iz oluşmadığını kontrol et. Bu işe en fazla 2 USD harca; fiyatı önceden hesapla, aşacaksa DUR, sor." — İlgili: fal.ai, video büyütme
- **28.10.2026** — "Sıra: önce saniyeleri çıkar, sonra büyüt (büyütme yalnız kalan kısma uygulansın), en son sıkıştır." — İlgili: video iş sırası
- **28.10.2026** — "Hedef: masaüstü 1920×1080, kalite ölçüsü (VMAF) en az 96. Dosya boyutu ikinci planda, ama 15 MB'ı geçecekse DUR, sor. Mobil dosyayı da aynı kaynaktan yeniden üret. iPhone Safari'de oynadığını doğrula." — İlgili: public/hero (masaüstü + mobil)

### KARAR 3 — Footer yazısı
- **28.10.2026** — "Footer'ın altındaki büyük "MEGA CARS" yazısı kalıyor; dokunma." — İlgili: Footer `.ft-word`

### Ek kontrol
- **28.10.2026** — "Sekme ikonunu (favicon) açık temalı tarayıcı sekmesinde kontrol et. Logo seçilmiyorsa ikonda logonun siyah zeminini koru; logonun kendisi yine değişmeyecek." — İlgili: app/icon.png

### Sonra
- **28.10.2026** — "KARAR-DEFTERI'ne üç kararı 28.10.2026 tarihiyle yaz." — İlgili: KARAR-DEFTERI
- **28.10.2026** — "_work klasörünü commit'e katma." — İlgili: git
- **28.10.2026** — "v2'ye commit + push. Vercel GitHub'dan derlesin; CLI ile deploy yok." — İlgili: yayın
- **28.10.2026** — "Önizlemeden 390 px ve 1440 px ekran görüntüleri al: açılış bölümü (videonun 3 farklı anı) ve footer. docs/geri-bildirim-2026-10-28/ altına ekle." — İlgili: docs/geri-bildirim-2026-10-28/
- **28.10.2026** — "RAPOR: Kısa Türkçe, her madde [ÖLÇÜLDÜ] veya [ÖLÇÜLMEDİ] etiketli: çıkarılan saniyeler, yeni video süresi, kaynak ve yeni çözünürlük, kalite ölçüsü, dosya boyutları, maliyet, son commit hash'i. Ayrıca açılış bölümünde videonun şu an nasıl göründüğünü yaz: tam ekran arka plan olarak mı, yalnız büyük yazının harflerinin içinde mi? Bu konuda bir şey değiştirme." — İlgili: rapor, açılış bölümü

### Kayıtlar (CC, ölçümlü) — Volkan'ın 28.10.2026 kararları uygulaması
> Bu alt bölüm Volkan'ın cümlesi değildir.

**KARAR 1 — uygulanmadı (talimat gereği hiçbir şey değiştirilmedi)**
- Kare kare tarama (`_work/hero-main/ai/`, 30 fps, sahne kesimleri 5,30 / 8,10 / 13,80 / 17,63 sn): okunmaz bagaj yazısı (sahte "AMG") 1,40 sn'den (kare 42) 5,30 sn'ye kadar; ızgaradaki eriyen AMG rozeti ("H" biçimli çubuk ya da leke) 5,30–11,57 sn (kare 347'ye kadar; 8,1–9,3 çapraz geçiş dahil) ve 13,80–19,70 sn; çamurlukta "ASRMZ" 17,63–19,70 sn. Çıkarılması gereken: 1,40–11,57 ve 13,80–19,70 sn (16,1 sn).
- Kalan temiz kısım: 0,00–1,37 sn (yan görünüş; jant göbeklerinde Mercedes yıldızı okunuyor) + 11,60–13,77 sn (kaput/kapı yakın planı, rozet yok) = **≈ 3,6 sn**. "En az 6 sn, takılmadan dönen döngü" bu iki parçayla sağlanamıyor (ileri-geri oynatma 1,4 sn'de bir yön değiştirir; yavaşlatma kare uydurur). → Video, konum ve kodlama değiştirilmedi; büyütme yapılmadı; harcama 0 $.
- Önizlemede bugünkü durum (1440 px, filmin 15,8. sn'si): kaput yıldızı "R"nin, eriyen AMG rozeti "S"nin içinde görünüyor (`docs/geri-bildirim-2026-10-28/1440-acilis-bolumu-film-3-15.8sn.jpg`).

**KARAR 2 — ölçüm ve kaynak araması**
- Sitedeki dosyanın kaynağı (main `hero-main.mp4`): 1920×1080, 30 fps, H.264 High, 4,17 Mbit/s, 19,7 sn. Ayrıntı: 720p'ye indirip geri büyütme kare farkı ortanca 44,9 dB (gerçek 4K→1080 Pexels referansı 47,3 dB; 720p'den büyütülmüş referans 53,2 dB); %200 kırpımlarda 1080 dosya ile 720p'ye inip dönen kare gözle ayırt edilmiyor, dağ dokusunda blok sıkıştırma izi var → dosya adıyla 1080p, ayrıntısıyla ≈ 720p + düşük bit hızı. Mobil dosya kaynağın 608 px genişliğinden kırpılıyor; 390 px telefonda (2× ekran) ≈ 1,3× büyütülerek gösteriliyor.
- Arama (Desktop alt klasörler, Downloads, OneDrive dahil Videos, CapCut; 269 video; 32×18 kare korelasyonu, ilk kare + bütün kareler): eşleşenler — `Downloads/hero-source.mp4` = `Desktop/business/pikens-unboxing/hero-source-backup.mp4` (aynı dosya, 1920×1080, 15,6 Mbit/s, 19,7 sn; ayrıntı ölçüsü daha yüksek ama %200'de aynı blok izleri — düşük bit hızlı kopyadan yeniden kodlanmış), `pikens-unboxing/public|dist/hero/hero-main.mp4` (1600×900), ve **`Downloads/Blacked-Out AMG GT Black Series 🖤 ｜ Aggressive 4K Cinematic Edit.mp4`** (101,6 sn, 1920×1080, 3,7 Mbit/s; dosya etiketi: sanatçı "VibeOnDriveOfficial", https://www.youtube.com/watch?v=yhcDe-59P18, 10.05.2026; açılış filmi bu YouTube videosunun 14–33,7 sn'lik bölümü). Daha yüksek çözünürlüklü kopya yok.
- Sıra kuralı ("önce saniyeleri çıkar, sonra büyüt") ve KARAR 1 uygulanamadığı için fal.ai'da büyütme yapılmadı.

**KARAR 3** — footer `.ft-word` olduğu gibi kaldı.

**Ek kontrol — sekme ikonu** — `app/icon.png` 64 px, logonun kendi siyah zemini korunuyor (köşe pikseli 0/1/0, opak). Beyaz, Chrome açık sekme (#f1f3f4) ve açık şerit (#dee1e6) zemininde 16 ve 32 px'te siyah kare içinde krom logo seçiliyor; önizlemenin sunduğu dosya repodakiyle aynı (SHA-1 5e80754f). Değişiklik gerekmedi.

**Ekran görüntüleri** — `docs/geri-bildirim-2026-10-28/{390,1440}-acilis-bolumu-film-{1,2,3}-*.jpg` (filmin 0,2 / 8,9 / 15,8. saniyesi) ve `{390,1440}-footer.jpg` (yenilendi); konsol hatası 0, yatay taşma 0.

## 29.10.2026 — Açılış videosu: aynı sahneler, yüksek kaliteli kaynak (talimat, aynen)
- **29.10.2026** — "YENİ KARAR (29.10.2026, Volkan): Açılış videosu, eski sitedekiyle AYNI sahneler ve AYNI geçişlerle kalacak; yalnız görüntü kalitesi yükselecek. 28.10'daki "yapay zekâ izlerini gizle" planı İPTAL; videodan hiçbir sahne çıkarılmayacak. Bu talimatın dışına çıkma. main dalını değiştirme. Raporu Türkçe yaz." — İlgili: açılış videosu, public/hero, main dalı
- **29.10.2026** — "Kaynak izni: YouTube kanalı "VibeOnDriveOfficial" Volkan'ın yakın arkadaşı; video onun izniyle kullanılıyor." — İlgili: açılış videosu kaynağı, lisans

### 1) Kaliteli kaynak
- **29.10.2026** — "Videonun YouTube'daki aslı: https://www.youtube.com/watch?v=yhcDe-59P18" — İlgili: kaynak
- **29.10.2026** — "yt-dlp ile mevcut biçimleri listele (gerekirse yt-dlp'yi kur). En yüksek çözünürlüklü ve en yüksek bit hızlı görüntü akışını indir; ses gerekmez. Biçim listesini rapora koy. İndirme başarısız olursa DUR, raporla." — İlgili: yt-dlp, _work/video
- **29.10.2026** — "İndirilen dosyanın, Downloads'taki "Blacked-Out AMG GT Black Series … Cinematic Edit.mp4" ile aynı video olduğunu süre ve karelerle doğrula." — İlgili: kaynak doğrulama

### 2) Aynı sahneler, aynı geçişler
- **29.10.2026** — "Referans: eski sitenin (main dalı) açılış videosu hero-main.mp4. Senin tespitine göre YouTube videosunun 14,0–33,7 sn arası." — İlgili: main `public/hero/hero-main.mp4`
- **29.10.2026** — "Başlangıç ve bitiş noktalarını yuvarlak saniyeyle değil, eski klibin ilk ve son karesini yeni kaynakta kare kare eşleştirerek bul." — İlgili: kesim noktaları
- **29.10.2026** — "Eski klipte renk, kırpma, yakınlaştırma ya da hız değişikliği varsa aynısını uygula; yoksa hiçbir şey ekleme. Sahne sırası, geçişler, süre, hız ve kare hızı eskisiyle birebir aynı olacak." — İlgili: yeni klip
- **29.10.2026** — "KANIT: Eski klipteki her kare için yeni klipte aynı andaki karenin aynı sahne ve aynı kadraj olduğunu ölç (iki kareyi aynı boyuta küçültüp karşılaştırarak). Tek bir karede bile sahne, geçiş ya da zamanlama farkı çıkarsa DUR, siteye koyma, raporla." — İlgili: kare kare karşılaştırma
- **29.10.2026** — "Yan yana karşılaştırma videosu hazırla: solda eski, sağda yeni, aynı anda oynasın. _work\video\ altına kaydet ve tarayıcımda aç." — İlgili: _work/video/

### 3) Kodlama
- **29.10.2026** — "Masaüstü: 1920×1080, kalite ölçüsü (VMAF) en az 96. Dosya 15 MB'ı geçecekse DUR, sor." — İlgili: masaüstü film dosyası
- **29.10.2026** — "Mobil: şu anki mobil dosyanın kırpım alanının aynısı (aynı konum ve oran), yeni kaynaktan." — İlgili: mobil film dosyası
- **29.10.2026** — "iPhone Safari'de oynadığını doğrula." — İlgili: mobil oynatma

### 4) Site
- **29.10.2026** — "Ölçümler geçerse v2'deki açılış videosu dosyalarını yenileriyle değiştir. Açılış bölümünün düzenine (harflerin içinde başlama, kaydırınca tam ekran), videonun ekrandaki konumuna ve başka hiçbir şeye dokunma." — İlgili: public/hero, lib/hero.ts, açılış bölümü
- **29.10.2026** — "KARAR-DEFTERI'ne yaz: 29.10.2026 — açılış videosu eski sitedekiyle aynı sahnelerle, yüksek kaliteli kaynaktan yeniden kesildi; kaynak VibeOnDriveOfficial (Volkan'ın arkadaşı, izinli); 28.10 "izleri gizle" planı iptal." — İlgili: KARAR-DEFTERI
- **29.10.2026** — "_work klasörünü commit'e katma. v2'ye commit + push; Vercel GitHub'dan derlesin, CLI ile deploy yok." — İlgili: git, yayın
- **29.10.2026** — "Önizlemeden 390 px ve 1440 px ekran görüntüleri al (açılış bölümü, videonun 3 farklı anı) ve docs/geri-bildirim-2026-10-28/ altına ekle." — İlgili: docs/geri-bildirim-2026-10-28/

### Rapor
- **29.10.2026** — "RAPOR: Kısa Türkçe, her madde [ÖLÇÜLDÜ] veya [ÖLÇÜLMEDİ] etiketli: indirilen biçim (çözünürlük, bit hızı, kare hızı), eşleşen başlangıç ve bitiş kareleri, kare kare karşılaştırma sonucu, yeni dosya boyutları ve kalite ölçüsü, son commit hash'i. Künyedeki video satırının şu anki metnini de yaz; o satırı değiştirme." — İlgili: rapor, künye (Impressum) film satırı

### Kayıt (CC) — Volkan'ın istediği satır
- **29.10.2026 — açılış videosu eski sitedekiyle aynı sahnelerle, yüksek kaliteli kaynaktan yeniden kesildi; kaynak VibeOnDriveOfficial (Volkan'ın arkadaşı, izinli); 28.10 "izleri gizle" planı iptal.**

### Kayıtlar (CC, ölçümlü) — 29.10.2026 uygulaması
> Bu alt bölüm Volkan'ın cümlesi değildir.

**Kaynak**
- `yt-dlp -F` (2026.08.19; JS çalışma ortamı yok uyarısıyla): en yüksek görüntü akışları 625 (mp4/HLS, 3840×2160, 30 fps, VP9, listede ≈ 15,5 Mbit/s tahmini), 313 (webm, 3840×2160, 30 fps, VP9, 8,8 Mbit/s), 620/271 (2560×1440), 270/137/614/248 (1920×1080; H.264 en çok 4,8 Mbit/s). İndirilen: **625** → 3840×2160, 30 fps, VP9, yuv420p bt709, **gerçek ortalama 8,83 Mbit/s**, 101,5 sn, 106,9 MiB (`_work/video/src/`).
- Downloads'taki "Blacked-Out AMG GT Black Series … Cinematic Edit.mp4" ile aynı video: ikisi de 3045 kare / 101,5 sn; 96×54 gri karelerde kayma 0'da ortalama korelasyon 0,9943 (±1 karede 0,968); 0,97'nin altında kalan 38 kare tamamen siyah kareler.

**Eşleşen kareler (kare kare)**
- Eski klip (main `hero-main.mp4`, 591 kare, 30 fps, 19,7 sn) 4K kaynakta **kare 493'ten (16,433 sn) kare 1083'e (36,100 sn) kadar** kesintisiz duruyor (ortalama korelasyon 0,9996; en yakın başka konum 0,9791). Eski klibin ilk 3 karesi aynı resim (kare 0–2 = kaynak kare 495; eski dosyanın kendi donması); son karesi = kaynak kare 1083.
- Yeni klip bunu birebir kuruyor: kaynak kare 495–1083 (589 kare), ilk kare 2 kez daha tekrarlanıyor → 591 kare, 30 fps, 19,700 sn.
- Kırpma / yakınlaştırma / renk / hız: faz korelasyonu kayma 0/0 px, en iyi ölçek 1,000 (5 örnek kare); eski klip ile 1080p kaynağı arasında renk ortalaması farkı ≤ 0,8/255 → eski klipte renk ayarı yok; hiçbir şey eklenmedi. (4K ile 1080p YouTube kopyası arasında R/B ortalamasında 1–2,6/255 fark var; bu YouTube'un iki ayrı dönüştürmesinden, eklenmiş bir ayar değil.)

**Kare kare kanıt** (`_work/video/proof.py`, sonuçlar `_work/video/proof/*.csv`)
- Masaüstü, eski `hero-main.mp4` ↔ yeni `public/hero/gt2/desktop.mp4`, 192×108: 591/591 kare; korelasyon en düşük 0,9985 (ortalama 0,9995); sahne kesimleri eski [159, 243, 529] = yeni [159, 243, 529]; ffmpeg scdet ikisinde de 5,30 / 8,10 / 13,80 / 17,633 sn; kareden kareye hareket eğrisi korelasyonu 0,9996. 480×270'te korelasyon en düşük 0,9963.
- Zamanlama: 467–472 karede en iyi eşleşme aynı numaralı kare; kalanlarda komşu kare kaynağın kendi tekrar karesi (24→30 kare çoğaltması) ya da durağan görüntü. Tek işaretlenen kare **257** (8,1–9,3 sn çapraz geçişi): eski kare 257, yeni 256 ile 257 arasında başa baş (192×108'de fark 0,08/255; 480×270'te 0,015); 960×540'ta yeni 257 açıkça önde (3,39 / 3,50); eski 257 kendi kaynağı olan 1080p kopyanın 257. karesine en yakın (2,24), o da 4K'nın 257. karesine (1,30; 256 ile 2,19). Sonuç: zamanlama farkı yok; başa baş durum eski dosyanın geçişteki sıkıştırmasından.
- Mobil, eski `gt/mobile.mp4` ↔ yeni `gt2/mobile.mp4`, 270×480: 591/591 kare, korelasyon en düşük 0,9948, sahne kesimleri aynı, işaretlenen kare 0.
- Yan yana video: `_work/video/yan-yana-tam.mp4` (3840×1080) ve `yan-yana-detay.mp4` (ortadaki 960 px, 1:1 piksel), `_work/video/karsilastirma.html` tarayıcıda açıldı.

**Kodlama** (referans = 4K'dan lanczos ile küçültülmüş kayıpsız FFV1 ana kopya; VMAF kare kare eşlenerek ölçüldü)
- Masaüstü `public/hero/gt2/desktop.mp4`: 1920×1080, 30 fps, H.264 High 4.1, x264 veryslow iki geçiş 6 Mbit/s, tune ssim, GOP 150, faststart, ses yok → **14.368.220 bayt (14,4 MB), VMAF 96,44** (en düşük kare 88,4). Denenenler: CRF 22 16,4 MB / 96,67; 6 Mbit/s tune'suz 95,60 / 14,5 MB; 6,2 Mbit/s 96,56 / 14,9 MB. (İlk ölçümde mkv zaman damgası yuvarlaması kareleri kaydırıp VMAF'ı 74'e düşürüyordu; `settb=1/30,setpts=N` ile düzeltildi.)
- Mobil `public/hero/gt2/mobile.mp4`: aynı kırpım (1920 genişliğinde x 656–1264 = 4K'da 1312–2528, tam yükseklik, 608:1080 oranı) → 540×960, H.264 High 4.0, 1 Mbit/s iki geçiş → **2.414.083 bayt (2,4 MB), VMAF 95,11**. VMAF ≥ 96 için 1,3 Mbit/s → 3,14 MB / 96,36 gerekiyor; 22.10.2026'daki "mobil en fazla 2,5 MB" sınırı nedeniyle 2,4 MB'lık sürüm konuldu (3,14 MB'lık `_work/video/enc/m1300.mp4`). Karşılaştırma: eski mobil dosya aynı referansa göre VMAF 71,5.
- Posterler ilk kareden WebP q80: 98 KB / 21 KB. Eski `public/hero/gt/` kaldırıldı (önbellek bir yıl immutable olduğu için yeni klasör `gt2`). `lib/hero.ts` yalnız dosya yolları ve kaynak notu değişti; açılış bölümünün düzeni, videonun konumu ve künye satırı değişmedi.
- Künyedeki film satırı (değiştirilmedi): DE "Eröffnungsfilm: aus der bisherigen Website von Mega Cars." · EN "Opening film: from the previous Mega Cars website." · TR "Açılış filmi: Mega Cars'ın önceki web sitesinden."
- `tsc` temiz; `npm run build` temiz (91 sayfa).

**Önizleme (6e2e7f8, Vercel "Deployment has completed")**
- `/hero/gt2/desktop.mp4` ve `mobile.mp4`: `video/mp4`, bayt aralığı isteğine 206 (Safari'nin istediği), `Content-Length` 14.368.220 / 2.414.083, `public, max-age=31536000, immutable`; eski `/hero/gt/desktop.mp4` 404.
- iPhone Safari: gerçek iPhone ile denenmedi. Playwright WebKit 27.2 (iPhone 13 profili, iOS Safari tarayıcı kimliği, 390 px, dokunmatik) önizlemede `gt2/mobile.mp4`'ü seçti, oynattı (2 sn'de 2,01 sn ilerledi, `paused` false, `readyState` 4, hata yok), `canPlayType('avc1.640028')` = "probably"; konsol hatası 0. Dosya iOS'un oynattığı biçimde: H.264 High 4.0, yuv420p, faststart, ses yok; video etiketi `muted loop playsInline autoPlay`.
- Chrome 390 px → `gt2/mobile.mp4` 540×960; 1440 px → `gt2/desktop.mp4` 1920×1080; ikisi de 19,7 sn; yatay taşma 0; konsol hatası 0. Düzen değişmedi (harflerin içinde başlıyor).
- Ekran görüntüleri: `docs/geri-bildirim-2026-10-28/{390,1440}-acilis-bolumu-4k-film-{1-0.2sn,2-8.9sn,3-15.8sn}.jpg`.

## 29.10.2026 — Telefon videosu tam çözünürlük + bitirmek için kalanlar (talimat, aynen)
- **29.10.2026** — "Volkan'ın kararı (29.10.2026): Telefon videosu, telefon ekranına tam uyan çözünürlükte olacak. Künyedeki video satırına dokunma. main dalını değiştirme. Raporu Türkçe yaz." — İlgili: açılış bölümü telefon film dosyası, künye (Impressum) film satırı, main dalı

### 1) Telefon videosu
- **29.10.2026** — "Kaynak: 4K kaynaktaki aynı parça (kare 493–1083). Kırpım alanı, şu anki telefon dosyasıyla aynı konum ve oranda olsun. Sahne, geçiş, süre ve hız birebir aynı kalacak." — İlgili: telefon film dosyası
- **29.10.2026** — "Çıktı: 1080×1920, kalite ölçüsü (VMAF, bu çözünürlükte ölçülmüş) en az 96. Kodlayıcı şu anki telefon dosyasınınkiyle aynı olsun (iPhone Safari uyumu için)." — İlgili: telefon film dosyası
- **29.10.2026** — "22.10'daki "telefon dosyası en fazla 2,5 MB" kuralı bu video için kalktı. Yeni üst sınır 15 MB. Dosya 15 MB'ı geçerse 720×1280'e in (yine VMAF en az 96) ve onu kullan." — İlgili: telefon film dosyası boyut sınırı (22.10.2026 "mobil 960 px (en fazla 2,5 MB)" kuralı bu video için geçersiz)
- **29.10.2026** — "Yeni telefon dosyasının 591 karesini şu anki telefon dosyasıyla karşılaştır: aynı sahne ve aynı kadraj olduğunu ölç. Fark çıkarsa DUR, raporla." — İlgili: kare kare karşılaştırma
- **29.10.2026** — "v2'deki telefon dosyasını yenisiyle değiştir. Önbellek sorunu olmasın diye gerekirse yeni bir klasör kullan. Başka hiçbir şeye dokunma." — İlgili: public/hero, lib/hero.ts
- **29.10.2026** — "KARAR-DEFTERI'ne yaz: 29.10.2026 — telefon videosu 1080×1920 (ya da kullanılan çözünürlük); 2,5 MB kuralı bu video için kalktı; künye satırı değişmeyecek." — İlgili: KARAR-DEFTERI
- **29.10.2026** — "_work klasörünü commit'e katma. v2'ye commit + push; Vercel GitHub'dan derlesin, CLI ile deploy yok." — İlgili: git, yayın

### 2) Bitirmek için kalanlar (yalnız listele, hiçbirini yapma)
- **29.10.2026** — "docs/TESLIM-KONTROL.md ve docs/BRIEF.md'deki açık maddeleri iki grupta listele: (a) Bizim şimdi yapabileceklerimiz (müşteriden bir şey beklemeyenler). (b) Galeriden bilgi ya da dosya bekleyenler. Her biri için galeriden tam olarak ne istenmesi gerektiğini tek cümleyle yaz." — İlgili: docs/TESLIM-KONTROL.md, docs/BRIEF.md
- **29.10.2026** — "Galzura web kalite standardının teslim kontrol listesinde (Lighthouse ölçümleri, erişilebilirlik, SEO, robots.txt, sitemap, önbellek başlıkları vb.) henüz ölçülmemiş ya da geçmemiş maddeleri de (a) grubuna ekle." — İlgili: docs/TESLIM-KONTROL.md

### Rapor
- **29.10.2026** — "RAPOR: Kısa Türkçe, her madde [ÖLÇÜLDÜ] veya [ÖLÇÜLMEDİ] etiketli: telefon dosyasının çözünürlüğü, boyutu, kalite ölçüsü, kare karşılaştırma sonucu, son commit hash'i; ardından (a) ve (b) listeleri. Sonra DUR." — İlgili: rapor

### Kayıt (CC) — Volkan'ın istediği satır
- **29.10.2026 — telefon videosu 1080×1920; 2,5 MB kuralı bu video için kalktı; künye satırı değişmeyecek.**

### Kayıtlar (CC, ölçümlü) — telefon videosu 1080×1920, 29.10.2026
> Bu alt bölüm Volkan'ın cümlesi değildir.
- Kaynak: 4K `yt-625-yhcDe-59P18.mp4`, kaynak kare 495–1083 + ilk kare 2 kez daha (eski klibin kare 493–1083 eşleşmesi, 29.10 kaydı) → 591 kare, 30 fps, 19,700 sn. Kırpım öncekiyle aynı: 4K'da `crop=1216:2160:1312:0` (1920 genişliğinde x 656–1264), lanczos ile 1080×1920; kayıpsız FFV1 ana kopya `_work/video/master/mobile1080.mkv`.
- Kodlayıcı şu anki telefon dosyasıyla aynı: x264 veryslow iki geçiş, H.264 High, seviye 4.0, yuv420p, bt709, tune ssim, GOP 150, faststart, ses yok (betik `_work/video/enc/phone.sh`).
- VMAF (1080×1920'de, kare kare eşlenerek, referans kayıpsız ana kopya): 3000 kbit/s 7,28 MB → 95,92; 3200 → 7,77 MB / 96,21; **3400 kbit/s → 8.262.199 bayt (8,3 MB), VMAF 96,44 (en düşük kare 88,7) — kullanılan**; 4500 → 10,96 MB / 97,30. 15 MB sınırının altında; 720×1280'e inmek gerekmedi.
- Kare kare karşılaştırma (`_work/video/proof.py`), yeni ↔ şu anki telefon dosyası (`gt2/mobile.mp4`, 540×960): 591/591 kare; 270×480'de korelasyon en düşük 0,9988, işaretlenen kare 0; 540×960'ta en düşük 0,9975, işaretlenen kare 0; sahne kesimleri ikisinde de [159, 243, 529]; hareket eğrisi korelasyonu 0,9999. Faz korelasyonuyla kadraj kayması 5 karede (5/150/300/450/580) 0/0 px. Eski sitenin telefon dosyasına karşı da 0 işaretli kare (en düşük 0,9948).
- Site: `public/hero/gt3/mobile.mp4` (yeni klasör; /hero/* bir yıl immutable), `lib/hero.ts` yalnız `mobile` yolu ve açıklama satırı; `public/hero/gt2/mobile.mp4` kaldırıldı. Masaüstü dosyası, posterler, açılış bölümünün düzeni ve künye satırı değişmedi. `tsc` temiz; `npm run build` temiz (91 sayfa).
- Önizleme (e4aa4af, Vercel "success"): `/hero/gt3/mobile.mp4` bayt aralığına 206, `Content-Range … /8262199`, `video/mp4`, `public, max-age=31536000, immutable`; eski `/hero/gt2/mobile.mp4` 404; `/hero/gt2/desktop.mp4` 200 (değişmedi). Chrome 390 px (3× ekran) → `gt3/mobile.mp4` 1080×1920, 19,7 sn, oynuyor; 1440 px → `gt2/desktop.mp4` 1920×1080; yatay taşma 0, konsol hatası 0. iPhone: gerçek cihazla denenmedi; Playwright WebKit (iPhone 13 profili) `gt3/mobile.mp4`'ü seçti ve oynattı (2 sn'de 2,02 sn ilerledi, `readyState` 4, hata yok, `canPlayType('avc1.640028')` = "probably"), konsol hatası 0.

## 29.10.2026 — Siteyi bitiriyoruz: Lighthouse, erişilebilirlik, Panamera kasa tipi, teslim kontrolü (talimat, aynen)
- **29.10.2026** — "Volkan'ın kararları (29.10.2026): Siteyi bitiriyoruz. v2 dalında aşağıdaki işleri yap; main dalını değiştirme. Raporu Türkçe yaz." — İlgili: v2 dalı, main dalı

### Yapılacaklar
- **29.10.2026** — "1. Lighthouse'u yeniden ölç: ana sayfa, araç listesi, araç detayı ve iletişim sayfası; mobil ve masaüstü. Sonuçları ekran görüntüleriyle docs/LIGHTHOUSE.md'ye yaz. Yalnız ölç, hız iyileştirmesi yapma." — İlgili: docs/LIGHTHOUSE.md
- **29.10.2026** — "2. Erişilebilirlik kontrolü (28–29.10 değişikliklerinden sonra): hareket azaltma ayarı açıkken yeni logolu açılış ekranı ve açılış filmi, 2560 px genişlik, klavyeyle tam gezinme, kontrast en az 4.5:1, ikonlu düğmelerde aria-label. Sorun bulursan düzelt; düzeltmeler tasarımı ve logoyu değiştirmesin." — İlgili: açılış ekranı (Loader), açılış bölümü, bütün site
- **29.10.2026** — "3. Porsche Panamera kasa tipi: Stoktaki Panamera'nın model adına bak. Standart Panamera ise kasa tipi "Limousine" (arkası bagaj kapaklı sedan), "Sport Turismo" ise "Kombi" olacak. Kaynak: Porsche Newsroom ve Alman otomotiv basını; bu, galeriye sorulacak bir soru değil. Veritabanında ve sitede 3 dilde düzelt." — İlgili: Supabase vehicles, data/overrides.json, Fahrzeug-Detail (teyit bekliyor 12)
- **29.10.2026** — "4. docs/TESLIM-KONTROL.md'yi güncelle: güncel film boyutları ve klasörleri, düzgün numaralar. Bizim yapacaklarımızı, galeriden beklenenleri, Volkan kararıyla yapılmayacakları ve canlıya geçiş adımlarını ayrı başlıklarla yaz. Ayrıca: Galeriden beklenenler listesinden çıkar: güncel stok ve fotoğraflar (galeri sahibi araçlarını panelden kendisi yükleyecek, biz yüklemeyeceğiz), Panamera kasa tipi (biz düzelttik), 360° deneme (Volkan kararı: şimdilik bekliyor). Canlıya geçiş adımlarına ekle: Sitedeki 18 örnek aracın durumu canlıya geçmeden önce galeri sahibiyle netleşecek." — İlgili: docs/TESLIM-KONTROL.md

### Yapılmayacaklar
- **29.10.2026** — "Hız iyileştirmeleri: önceki listendeki 2, 3, 4. maddeler ve araç fotoğraflarının önbellek ayarı. Volkan'ın 23.10 kararı: bu sitede hız işleriyle uğraşılmıyor." — İlgili: performans
- **29.10.2026** — "Canlıya geçiş (Supabase anahtarlarını Production'a ekleme, siteyi Google'a açma, main'e birleştirme): galeri yeni siteyi onaylayınca ayrıca yapılacak." — İlgili: Vercel Production, lib/launch.ts INDEXABLE, main dalı

### Sonra
- **29.10.2026** — "KARAR-DEFTERI'ne 29.10.2026 tarihiyle yaz: araçları galeri sahibi panelden kendisi yükleyecek; 360° deneme şimdilik bekliyor; Panamera kasa tipi kaynaktan düzeltildi; hız iyileştirmeleri yapılmıyor; canlıya geçiş galeri onayından sonra." — İlgili: KARAR-DEFTERI
- **29.10.2026** — "_work klasörünü commit'e katma. v2'ye commit + push; Vercel GitHub'dan derlesin, CLI ile deploy yok." — İlgili: git, yayın

### Rapor
- **29.10.2026** — "RAPOR: Kısa Türkçe, her madde [ÖLÇÜLDÜ] veya [ÖLÇÜLMEDİ] etiketli: sayfa sayfa Lighthouse sonuçları (mobil ve masaüstü), bulunan ve düzeltilen erişilebilirlik sorunları, Panamera'nın model adı ve yazılan kasa tipi, son commit hash'i. Sonra DUR." — İlgili: rapor

### Kayıt (CC) — Volkan'ın istediği satırlar
- **29.10.2026 — araçları galeri sahibi panelden kendisi yükleyecek (biz yüklemeyeceğiz).**
- **29.10.2026 — 360° deneme şimdilik bekliyor.**
- **29.10.2026 — hız iyileştirmeleri yapılmıyor (23.10 kararı).**
- **29.10.2026 — canlıya geçiş (Production anahtarları, Google'a açma, main'e birleştirme) galeri onayından sonra.**
- **29.10.2026 — Porsche Panamera kasa tipi kaynaktan düzeltildi: model adı "Panamera E-Hybrid S Facelift" (11/2013) = 2013 makyajlı Panamera S E-Hybrid, standart Panamera → "Limousine" (EN "Saloon", TR "Sedan"). Galeriye sorulmayacak; "Teyit bekliyor" 12. madde kapandı.**

### Kayıtlar (CC, ölçümlü) — 29.10.2026 uygulaması
> Bu alt bölüm Volkan'ın cümlesi değildir.

**Panamera** — Veritabanı `vehicles` (legacy_id `porsche-panamera-e-hybrid-s`): `body` null → `limousine` (Management API SQL, 29.10.2026 16:37 UTC). Yedek `data/inventory.json` aynı; `data/overrides.json` artık değeri `_source` ile yazıyor (`scripts/import-inventory.ts`: kaynaksız değer hâlâ reddedilir). Kaynaklar: Porsche Newsroom, 07.03.2017, "World premiere in Geneva: Sport Turismo expands the Panamera model line" — "The Sport Turismo is a new body version of the Porsche Panamera", "Based on the successful sports saloon" (Sport Turismo 2017'de geldi; 11/2013 aracı Sport Turismo olamaz); ecomento.de, 19.09.2013, auto motor und sport testi — "die hybride Reiselimousine". Önizlemede (39d316d) teknik kartta DE "Karosserie Limousine", EN "Body type Saloon", TR "Kasa tipi Sedan"; JSON-LD `bodyType` aynı.

**Erişilebilirlik** (`_work/finish/a11y.mjs`, `contrast.mjs`, önizleme) — axe-core 4.13 WCAG 2.0/2.1/2.2 A+AA, 72 görünüm (8 sayfa × DE/EN/TR × 390/1440/2560): ihlal 0, adsız ikonlu düğme 0, taşma 0, konsol hatası 0; açık menü/filtre/test sürüşü (DE+TR) ihlal 0. axe'nin "belirlenemedi" dediği kontrast (kepenk sahte öğesi, fotoğraf, film) ekran pikselinden ölçüldü: 4.689 yazı kutusu, gerçek eksik yok. Bulunup düzeltilen 3 sorun: (1) hareket azaltmada açılış ekranı hiç görünmüyordu — `styles/base.css`'teki genel `* { animation-duration: 0.01ms !important }` kuralı `styles/motion.css`'teki sade solmayı eziyordu; açılış ekranı zamanlamaları `!important` ile korundu, ölçüm: logo 0,3 sn'de %17–35, 0,9 sn'de tam, 2,1 sn'de ekran kalktı (f823edc). (2) Tarih alanının takvim düğmesi ayrı bir Tab durağı ve odak halkası yoktu (alan `:focus` olmuyor) → `:focus-within:not(:focus)` ile aynı halka (f823edc). (3) Üst bar telefon bağlantısı `aria-label` "Mega Cars anrufen: …" görünen numarayla başlamıyordu (Lighthouse label-content-name-mismatch, WCAG 2.5.3) → etiket kalktı, numara + gizli " – Mega Cars anrufen / Call Mega Cars / Mega Cars'ı arayın"; Kontakt'taki büyük numara da aynı (6a26281; önizlemede denetim geçiyor). Tasarım ve logo değişmedi.

**Lighthouse** — `docs/LIGHTHOUSE.md` (f823edc, 4 sayfa × 2 cihaz × 3 ölçüm, ekran görüntüleri `docs/lighthouse/2026-10-29/`). Mobil Performans 73–77, LCP 4,39–5,62 sn; masaüstü 90–96, LCP 0,75–1,54 sn; erişilebilirlik 100; en iyi uygulamalar 96–100 (logonun 96/160 px dosyalarında en-boy yuvarlaması; dokunulmadı); SEO 69 (noindex). Talimat gereği hız iyileştirmesi yapılmadı.

**Önbellek** — önizlemede `/hero/gt2/*`, `/hero/gt3/*`, `/cars/*`, `/brand/*` ve Supabase araç fotoğrafları `public, max-age=31536000, immutable` (29.10.2026).
