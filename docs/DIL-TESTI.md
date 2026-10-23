# DİL TESTİ — Mega Cars v2

> Tarih: 23.10.2026 · Adres: yerel üretim derlemesi (localhost:3100) · Commit: c306c8a · Araç: Playwright 1.64.1 (Chromium), gerçek tıklama.
> Her sayfa tipinde DE → EN → TR → DE sırasıyla dil seçiciye tıklandı (masaüstünde üst bar, mobilde menü). Her adımda kontrol: adres o dilin yoluna değişti, `<html lang>` değişti, sayfada o dilin anahtar kelimesi var, menü yalnız o dilde, sayfa yenileyince dil korundu, `NEXT_LOCALE` çerezi seçilen dil. Kök adres: çerezli ziyarette çerezin dili, çerezsiz ilk ziyarette tarayıcı dili.
> Sonuç: **62/62 geçti.** Ekran görüntüleri `_work/faz7/pw/out-final/` altında (repoya girmez; `_work/` gitignore'da).

| Sayfa | Adım | Cihaz | Sonuç | Ölçüm | Ekran görüntüsü |
|---|---|---|---|---|---|
| Startseite | de→en | Masaüstü 1440 | ✓ geçti | path=/en lang=en text=ok menu=ok reload=en cookie=en | `_work/faz7/pw/out-final/home-desktop-en.jpg` |
| Startseite | en→tr | Masaüstü 1440 | ✓ geçti | path=/tr lang=tr text=ok menu=ok reload=tr cookie=tr | `_work/faz7/pw/out-final/home-desktop-tr.jpg` |
| Startseite | tr→de | Masaüstü 1440 | ✓ geçti | path=/de lang=de text=ok menu=ok reload=de cookie=de | `_work/faz7/pw/out-final/home-desktop-de.jpg` |
| Fahrzeuge (liste) | de→en | Masaüstü 1440 | ✓ geçti | path=/en/vehicles lang=en text=ok menu=ok reload=en cookie=en | `_work/faz7/pw/out-final/list-desktop-en.jpg` |
| Fahrzeuge (liste) | en→tr | Masaüstü 1440 | ✓ geçti | path=/tr/araclar lang=tr text=ok menu=ok reload=tr cookie=tr | `_work/faz7/pw/out-final/list-desktop-tr.jpg` |
| Fahrzeuge (liste) | tr→de | Masaüstü 1440 | ✓ geçti | path=/de/fahrzeuge lang=de text=ok menu=ok reload=de cookie=de | `_work/faz7/pw/out-final/list-desktop-de.jpg` |
| Fahrzeug-Detail | de→en | Masaüstü 1440 | ✓ geçti | path=/en/vehicles/mercedes-benz-s-560-4matic-l-amg-line-4fac42 lang=en text=ok menu=ok reload=en cookie=en | `_work/faz7/pw/out-final/detail-desktop-en.jpg` |
| Fahrzeug-Detail | en→tr | Masaüstü 1440 | ✓ geçti | path=/tr/araclar/mercedes-benz-s-560-4matic-l-amg-line-4fac42 lang=tr text=ok menu=ok reload=tr cookie=tr | `_work/faz7/pw/out-final/detail-desktop-tr.jpg` |
| Fahrzeug-Detail | tr→de | Masaüstü 1440 | ✓ geçti | path=/de/fahrzeuge/mercedes-benz-s-560-4matic-l-amg-line-4fac42 lang=de text=ok menu=ok reload=de cookie=de | `_work/faz7/pw/out-final/detail-desktop-de.jpg` |
| Kontakt & Über uns | de→en | Masaüstü 1440 | ✓ geçti | path=/en/contact lang=en text=ok menu=ok reload=en cookie=en | `_work/faz7/pw/out-final/contact-desktop-en.jpg` |
| Kontakt & Über uns | en→tr | Masaüstü 1440 | ✓ geçti | path=/tr/iletisim lang=tr text=ok menu=ok reload=tr cookie=tr | `_work/faz7/pw/out-final/contact-desktop-tr.jpg` |
| Kontakt & Über uns | tr→de | Masaüstü 1440 | ✓ geçti | path=/de/kontakt lang=de text=ok menu=ok reload=de cookie=de | `_work/faz7/pw/out-final/contact-desktop-de.jpg` |
| Finanzierung | de→en | Masaüstü 1440 | ✓ geçti | path=/en/financing lang=en text=ok menu=ok reload=en cookie=en | `_work/faz7/pw/out-final/financing-desktop-en.jpg` |
| Finanzierung | en→tr | Masaüstü 1440 | ✓ geçti | path=/tr/finansman lang=tr text=ok menu=ok reload=tr cookie=tr | `_work/faz7/pw/out-final/financing-desktop-tr.jpg` |
| Finanzierung | tr→de | Masaüstü 1440 | ✓ geçti | path=/de/finanzierung lang=de text=ok menu=ok reload=de cookie=de | `_work/faz7/pw/out-final/financing-desktop-de.jpg` |
| Ankauf (gizli) | de→en | Masaüstü 1440 | ✓ geçti | path=/en/trade-in lang=en text=ok menu=ok reload=en cookie=en | `_work/faz7/pw/out-final/tradeIn-desktop-en.jpg` |
| Ankauf (gizli) | en→tr | Masaüstü 1440 | ✓ geçti | path=/tr/takas lang=tr text=ok menu=ok reload=tr cookie=tr | `_work/faz7/pw/out-final/tradeIn-desktop-tr.jpg` |
| Ankauf (gizli) | tr→de | Masaüstü 1440 | ✓ geçti | path=/de/ankauf lang=de text=ok menu=ok reload=de cookie=de | `_work/faz7/pw/out-final/tradeIn-desktop-de.jpg` |
| Impressum | de→en | Masaüstü 1440 | ✓ geçti | path=/en/imprint lang=en text=ok menu=ok reload=en cookie=en | `_work/faz7/pw/out-final/imprint-desktop-en.jpg` |
| Impressum | en→tr | Masaüstü 1440 | ✓ geçti | path=/tr/kunye lang=tr text=ok menu=ok reload=tr cookie=tr | `_work/faz7/pw/out-final/imprint-desktop-tr.jpg` |
| Impressum | tr→de | Masaüstü 1440 | ✓ geçti | path=/de/impressum lang=de text=ok menu=ok reload=de cookie=de | `_work/faz7/pw/out-final/imprint-desktop-de.jpg` |
| Datenschutz | de→en | Masaüstü 1440 | ✓ geçti | path=/en/privacy lang=en text=ok menu=ok reload=en cookie=en | `_work/faz7/pw/out-final/privacy-desktop-en.jpg` |
| Datenschutz | en→tr | Masaüstü 1440 | ✓ geçti | path=/tr/gizlilik lang=tr text=ok menu=ok reload=tr cookie=tr | `_work/faz7/pw/out-final/privacy-desktop-tr.jpg` |
| Datenschutz | tr→de | Masaüstü 1440 | ✓ geçti | path=/de/datenschutz lang=de text=ok menu=ok reload=de cookie=de | `_work/faz7/pw/out-final/privacy-desktop-de.jpg` |
| 404 | de→en | Masaüstü 1440 | ✓ geçti | path=/en/gibt-es-nicht lang=en text=ok menu=ok reload=en cookie=en | `_work/faz7/pw/out-final/notFound-desktop-en.jpg` |
| 404 | en→tr | Masaüstü 1440 | ✓ geçti | path=/tr/gibt-es-nicht lang=tr text=ok menu=ok reload=tr cookie=tr | `_work/faz7/pw/out-final/notFound-desktop-tr.jpg` |
| 404 | tr→de | Masaüstü 1440 | ✓ geçti | path=/de/gibt-es-nicht lang=de text=ok menu=ok reload=de cookie=de | `_work/faz7/pw/out-final/notFound-desktop-de.jpg` |
| Kök adres (/) | cookie=tr | Masaüstü 1440 | ✓ geçti | path=/tr | — |
| Kök adres (/) | cookie=en | Masaüstü 1440 | ✓ geçti | path=/en | — |
| Kök adres (/) | accept-language=en | Masaüstü 1440 | ✓ geçti | path=/en | — |
| console | desktop | errors | ✓ geçti | none | — |
| Startseite | de→en | Mobil 390 (menü) | ✓ geçti | path=/en lang=en text=ok menu=ok reload=en cookie=en | `_work/faz7/pw/out-final/home-mobile-en.jpg` |
| Startseite | en→tr | Mobil 390 (menü) | ✓ geçti | path=/tr lang=tr text=ok menu=ok reload=tr cookie=tr | `_work/faz7/pw/out-final/home-mobile-tr.jpg` |
| Startseite | tr→de | Mobil 390 (menü) | ✓ geçti | path=/de lang=de text=ok menu=ok reload=de cookie=de | `_work/faz7/pw/out-final/home-mobile-de.jpg` |
| Fahrzeuge (liste) | de→en | Mobil 390 (menü) | ✓ geçti | path=/en/vehicles lang=en text=ok menu=ok reload=en cookie=en | `_work/faz7/pw/out-final/list-mobile-en.jpg` |
| Fahrzeuge (liste) | en→tr | Mobil 390 (menü) | ✓ geçti | path=/tr/araclar lang=tr text=ok menu=ok reload=tr cookie=tr | `_work/faz7/pw/out-final/list-mobile-tr.jpg` |
| Fahrzeuge (liste) | tr→de | Mobil 390 (menü) | ✓ geçti | path=/de/fahrzeuge lang=de text=ok menu=ok reload=de cookie=de | `_work/faz7/pw/out-final/list-mobile-de.jpg` |
| Fahrzeug-Detail | de→en | Mobil 390 (menü) | ✓ geçti | path=/en/vehicles/mercedes-benz-s-560-4matic-l-amg-line-4fac42 lang=en text=ok menu=ok reload=en cookie=en | `_work/faz7/pw/out-final/detail-mobile-en.jpg` |
| Fahrzeug-Detail | en→tr | Mobil 390 (menü) | ✓ geçti | path=/tr/araclar/mercedes-benz-s-560-4matic-l-amg-line-4fac42 lang=tr text=ok menu=ok reload=tr cookie=tr | `_work/faz7/pw/out-final/detail-mobile-tr.jpg` |
| Fahrzeug-Detail | tr→de | Mobil 390 (menü) | ✓ geçti | path=/de/fahrzeuge/mercedes-benz-s-560-4matic-l-amg-line-4fac42 lang=de text=ok menu=ok reload=de cookie=de | `_work/faz7/pw/out-final/detail-mobile-de.jpg` |
| Kontakt & Über uns | de→en | Mobil 390 (menü) | ✓ geçti | path=/en/contact lang=en text=ok menu=ok reload=en cookie=en | `_work/faz7/pw/out-final/contact-mobile-en.jpg` |
| Kontakt & Über uns | en→tr | Mobil 390 (menü) | ✓ geçti | path=/tr/iletisim lang=tr text=ok menu=ok reload=tr cookie=tr | `_work/faz7/pw/out-final/contact-mobile-tr.jpg` |
| Kontakt & Über uns | tr→de | Mobil 390 (menü) | ✓ geçti | path=/de/kontakt lang=de text=ok menu=ok reload=de cookie=de | `_work/faz7/pw/out-final/contact-mobile-de.jpg` |
| Finanzierung | de→en | Mobil 390 (menü) | ✓ geçti | path=/en/financing lang=en text=ok menu=ok reload=en cookie=en | `_work/faz7/pw/out-final/financing-mobile-en.jpg` |
| Finanzierung | en→tr | Mobil 390 (menü) | ✓ geçti | path=/tr/finansman lang=tr text=ok menu=ok reload=tr cookie=tr | `_work/faz7/pw/out-final/financing-mobile-tr.jpg` |
| Finanzierung | tr→de | Mobil 390 (menü) | ✓ geçti | path=/de/finanzierung lang=de text=ok menu=ok reload=de cookie=de | `_work/faz7/pw/out-final/financing-mobile-de.jpg` |
| Ankauf (gizli) | de→en | Mobil 390 (menü) | ✓ geçti | path=/en/trade-in lang=en text=menu menu=ok reload=en cookie=en | `_work/faz7/pw/out-final/tradeIn-mobile-en.jpg` |
| Ankauf (gizli) | en→tr | Mobil 390 (menü) | ✓ geçti | path=/tr/takas lang=tr text=menu menu=ok reload=tr cookie=tr | `_work/faz7/pw/out-final/tradeIn-mobile-tr.jpg` |
| Ankauf (gizli) | tr→de | Mobil 390 (menü) | ✓ geçti | path=/de/ankauf lang=de text=ok menu=ok reload=de cookie=de | `_work/faz7/pw/out-final/tradeIn-mobile-de.jpg` |
| Impressum | de→en | Mobil 390 (menü) | ✓ geçti | path=/en/imprint lang=en text=ok menu=ok reload=en cookie=en | `_work/faz7/pw/out-final/imprint-mobile-en.jpg` |
| Impressum | en→tr | Mobil 390 (menü) | ✓ geçti | path=/tr/kunye lang=tr text=ok menu=ok reload=tr cookie=tr | `_work/faz7/pw/out-final/imprint-mobile-tr.jpg` |
| Impressum | tr→de | Mobil 390 (menü) | ✓ geçti | path=/de/impressum lang=de text=ok menu=ok reload=de cookie=de | `_work/faz7/pw/out-final/imprint-mobile-de.jpg` |
| Datenschutz | de→en | Mobil 390 (menü) | ✓ geçti | path=/en/privacy lang=en text=menu menu=ok reload=en cookie=en | `_work/faz7/pw/out-final/privacy-mobile-en.jpg` |
| Datenschutz | en→tr | Mobil 390 (menü) | ✓ geçti | path=/tr/gizlilik lang=tr text=menu menu=ok reload=tr cookie=tr | `_work/faz7/pw/out-final/privacy-mobile-tr.jpg` |
| Datenschutz | tr→de | Mobil 390 (menü) | ✓ geçti | path=/de/datenschutz lang=de text=menu menu=ok reload=de cookie=de | `_work/faz7/pw/out-final/privacy-mobile-de.jpg` |
| 404 | de→en | Mobil 390 (menü) | ✓ geçti | path=/en/gibt-es-nicht lang=en text=ok menu=ok reload=en cookie=en | `_work/faz7/pw/out-final/notFound-mobile-en.jpg` |
| 404 | en→tr | Mobil 390 (menü) | ✓ geçti | path=/tr/gibt-es-nicht lang=tr text=ok menu=ok reload=tr cookie=tr | `_work/faz7/pw/out-final/notFound-mobile-tr.jpg` |
| 404 | tr→de | Mobil 390 (menü) | ✓ geçti | path=/de/gibt-es-nicht lang=de text=ok menu=ok reload=de cookie=de | `_work/faz7/pw/out-final/notFound-mobile-de.jpg` |
| Kök adres (/) | cookie=tr | Mobil 390 (menü) | ✓ geçti | path=/tr | — |
| Kök adres (/) | cookie=en | Mobil 390 (menü) | ✓ geçti | path=/en | — |
| Kök adres (/) | accept-language=en | Mobil 390 (menü) | ✓ geçti | path=/en | — |
| console | mobile | errors | ✓ geçti | none | — |

## Panelden eklenen araç sayfası (23.10.2026, derleme 44e8303, önizleme)

Yöntem: Playwright (Chromium) ile yönetim panelinden gerçek bir deneme aracı eklendi (3 fotoğraf, 3 donanım, "CC-Test"); aracın sayfası üç dilde açılıp görünen metin tarandı; Almanca/İngilizce/Türkçe olmayan kelime listesiyle (Kilometerstand, Erstzulassung, Zum Verkauf, Getriebe, Kraftstoff, Mileage, First registration, For sale, Sold, Satılık, İlk tescil …) kontrol edildi; donanım etiketlerinin üç dilde kendi dilinde göründüğü doğrulandı. Deneme aracı testin sonunda tamamen silindi. Betik: `_work/faz8/pw-preview.mjs` (repoya girmez); sonuçlar `_work/faz8/out-preview/results.json`.

| Sayfa | Dil | Cihaz | Sonuç | Ölçüm | Ekran görüntüsü |
|---|---|---|---|---|---|
| Fahrzeug-Detail (yeni araç) | de | Masaüstü 1440 | ✓ geçti | ad + fiyat 1,3 sn'de göründü; 3 donanım DE; EN/TR kelime yok | `_work/faz8/out-preview/detail-de-new.jpg` |
| Fahrzeug-Detail (yeni araç) | en | Masaüstü 1440 | ✓ geçti | "Dual-zone automatic climate control / Three-zone … / 360° camera"; €28,900; DE kelime yok | — |
| Fahrzeug-Detail (yeni araç) | tr | Masaüstü 1440 | ✓ geçti | "2 bölgeli otomatik klima / 3 bölgeli … / 360° kamera"; 28.900 €; DE/EN kelime yok | — |
| Fahrzeug-Detail (satıldı) | de / en / tr | Masaüstü 1440 | ✓ geçti | "Verkauft" + "Dieses Fahrzeug ist bereits verkauft." · "Sold" + "This vehicle has already been sold." · "Satıldı" + "Bu araç satılmıştır." (1,0–1,4 sn) | — |
| Fahrzeug-Detail (telefondan eklenen araç) | tr | Mobil 390 | ✓ geçti | "CC-Test-Mobil" görünür; DE/EN kelime yok | — |
| Yönetim paneli | de | Masaüstü 1440 | ✓ geçti | Giriş, liste, form: TR/EN kelime yok (Araçlar/Giriş/Vehicles/Sign taraması) | `docs/rehber/liste-de.jpg` |
| Yönetim paneli | tr | Mobil 390 | ✓ geçti | Giriş, liste, form: DE/EN kelime yok (Fahrzeuge/Anmelden/Abmelden/Vehicles/Logout taraması) | `docs/rehber/liste-tr.jpg` |
| Yönetim paneli | en | — | ✓ geçti | `/en/admin` → `/de/admin/login` (panel yalnız DE/TR) | — |

Not: Panelde marka, model ve "Version / Ausstattungslinie" alanları özel ad sayılır ve her dilde aynı görünür (KARAR-DEFTERI, CC varsayımı 2). Donanım, renk, kasa tipi, yakıt, vites, durum ve KDV notu anahtarla saklanır ve her dilde o dilin sözcüğüyle çizilir.
