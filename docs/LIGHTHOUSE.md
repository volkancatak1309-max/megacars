# LIGHTHOUSE — Mega Cars v2 (önizleme)

> Ölçüm: 23.10.2026 (commit 38f09d0), sabit önizleme adresi https://megacars-git-v2-volkancatak1309-maxs-projects.vercel.app (girişsiz, noindex). Lighthouse 13.5.0 CLI, headless Chrome, varsayılan simüle kısıtlama (mobil: Moto G Power, yavaş 4G, 4× CPU; masaüstü: `--preset=desktop`). Her sayfa tipi ve cihaz için **3 ölçüm, sırayla (aynı anda değil)**; tablodaki değerler **ortanca**. Ham JSON: `_work/faz5/lh/` (repoya girmez), betik: `_work/faz5/lh.py`.
> Hedefler (KARAR-DEFTERI): mobil Performans ≥ 80, masaüstü ≥ 85, mobil LCP < 3,0 sn, CLS < 0,1, INP < 200 ms, ilk yük JS < 300 KB (gzip).
> \* SEO puanı bilerek düşük: site canlıya çıkana kadar `noindex` + `robots.txt Disallow: /` (Lighthouse "is-crawlable" denetimi). `lib/launch.ts` → `INDEXABLE = true` ile açılır.
> 23.10.2026 (logo oturumu): Volkan mobil LCP < 3,0 sn hedefini bu proje için askıya aldı; açılış ekranı sayaçtan logoya çevrildi, özel imleç kaldırıldı. Bu oturumda hız ölçümü yenilenmedi; aşağıdaki değerler 38f09d0 ölçümleridir.

## Mobil

| Sayfa tipi | Performans | LCP (sn) | CLS | TBT (ms) | FCP (sn) | Erişilebilirlik | En iyi uyg. | SEO* | İlk yük JS gzip (KB) | 3 ölçüm (Perf / LCP) |
|---|---|---|---|---|---|---|---|---|---|---|
| Startseite /de | 84 ✓ | **3.4 ✗** | 0 ✓ | 151 | 1.32 | 100 | 100 | 69 | 230.1 ✓ | 84 / 2.68 · 85 / 3.4 · 83 / 3.42 |
| Fahrzeuge /de/fahrzeuge | 91 ✓ | 2.73 ✓ | 0.0 ✓ | 126 | 1.27 | 100 | 100 | 69 | 230.3 ✓ | 91 / 2.73 · 93 / 2.71 · 83 / 3.67 |
| Fahrzeug-Detail (S 560) | **78 ✗** | **3.69 ✗** | 0.0 ✓ | 334 | 1.69 | 100 | 100 | 69 | 231.3 ✓ | 79 / 3.69 · 78 / 3.71 · 77 / 3.59 |
| Kontakt & Über uns | 89 ✓ | 2.58 ✓ | 0.003 ✓ | 234 | 1.58 | 100 | 100 | 69 | 228.0 ✓ | 89 / 2.58 · 87 / 2.64 · 90 / 2.53 |
| Finanzierung | 87 ✓ | **3.23 ✗** | 0.013 ✓ | 276 | 1.49 | 100 | 100 | 66 | 227.3 ✓ | 83 / 3.23 · 87 / 3.3 · 89 / 2.51 |
| Ankauf (gizli) | 82 ✓ | **3.38 ✗** | 0.012 ✓ | 305 | 1.45 | 100 | 100 | 66 | 227.3 ✓ | 79 / 3.46 · 82 / 3.38 · 88 / 2.52 |
| Impressum | 92 ✓ | 2.46 ✓ | 0.0 ✓ | 207 | 1.19 | 100 | 100 | 66 | 224.7 ✓ | 92 / 2.36 · 89 / 2.5 · 92 / 2.46 |
| Datenschutz | 87 ✓ | **3.11 ✗** | 0 ✓ | 98 | 1.26 | 100 | 100 | 66 | 224.7 ✓ | 95 / 2.31 · 87 / 3.11 · 87 / 3.11 |

## Masaüstü

| Sayfa tipi | Performans | LCP (sn) | CLS | TBT (ms) | FCP (sn) | Erişilebilirlik | En iyi uyg. | SEO* | İlk yük JS gzip (KB) | 3 ölçüm (Perf / LCP) |
|---|---|---|---|---|---|---|---|---|---|---|
| Startseite /de | 96 ✓ | 0.98 | 0.022 ✓ | 4 | 0.41 | 100 | 100 | 69 | 235.4 ✓ | 96 / 0.98 · 96 / 0.97 · 96 / 0.99 |
| Fahrzeuge /de/fahrzeuge | 92 ✓ | 1.24 | 0.0 ✓ | 0 | 0.4 | 100 | 100 | 69 | 235.6 ✓ | 92 / 1.22 · 92 / 1.37 · 93 / 1.24 |
| Fahrzeug-Detail (S 560) | 96 ✓ | 1.02 | 0.013 ✓ | 0 | 0.41 | 100 | 100 | 69 | 236.6 ✓ | 95 / 1.14 · 97 / 0.76 · 96 / 1.02 |
| Kontakt & Über uns | 97 ✓ | 0.89 | 0.013 ✓ | 0 | 0.41 | 100 | 100 | 69 | 233.3 ✓ | 97 / 0.9 · 97 / 0.89 · 97 / 0.89 |
| Finanzierung | 96 ✓ | 0.91 | 0.014 ✓ | 4 | 0.4 | 100 | 100 | 66 | 232.6 ✓ | 96 / 0.91 · 97 / 0.61 · 94 / 1.17 |
| Ankauf (gizli) | 96 ✓ | 0.99 | 0.0 ✓ | 36 | 0.45 | 100 | 100 | 66 | 232.6 ✓ | 95 / 1.04 · 96 / 0.99 · 97 / 0.61 |
| Impressum | 96 ✓ | 0.94 | 0.0 ✓ | 4 | 0.36 | 100 | 100 | 66 | 230.0 ✓ | 96 / 0.94 · 96 / 0.98 · 96 / 0.93 |
| Datenschutz | 96 ✓ | 0.95 | 0.0 ✓ | 9 | 0.4 | 100 | 100 | 66 | 230.0 ✓ | 96 / 1.01 · 96 / 0.95 · 97 / 0.59 |

## INP

Lighthouse'un sayfa yükleme ölçümü INP'yi ölçemez (etkileşim gerekir); laboratuvar karşılığı TBT yukarıda. Ayrıca gerçek tıklamalarla ölçüldü (Chrome, mobil öykünme, 4× CPU, Event Timing API; en kötü etkileşim):

| EtkileÅŸim (Ã¶nizleme, 23.10.2026) | 4Ã— CPU, mobil Ã¶ykÃ¼nme | 1Ã— CPU |
|---|---|---|
| Detay: galeride "NÃ¤chstes Foto" | 72 ms âœ“ | â€” |
| Detay: kÃ¼Ã§Ã¼k resme dokunma | 48 ms âœ“ | â€” |
| Liste: "Filter" panelini aÃ§ma (mobil) | **224â€“272 ms âœ—** | â€” |
| MenÃ¼yÃ¼ aÃ§ma | **272â€“288 ms âœ—** | 40 ms âœ“ |
| Detay: "Probefahrt anfragen" penceresini aÃ§ma | **296 ms âœ—** | 40 ms âœ“ |

Modal pencere aÃ§an dÃ¼ÄŸmelerde (menÃ¼, filtre paneli, Probefahrt) sÃ¼re 4Ã— yavaÅŸlatmada 200 ms'yi aÅŸÄ±yor: `dialog.showModal()` sayfanÄ±n geri kalanÄ±nÄ± "inert" yapÄ±yor ve tarayÄ±cÄ± bÃ¼tÃ¼n belgenin stilini yeniden hesaplÄ±yor (izde â‰ˆ 120 ms). Liste sayÄ±mlarÄ±nÄ±n Ã¶nbelleÄŸe alÄ±nmasÄ± ve kaydÄ±rma kilidinin Ã§izimden sonraya ertelenmesi sÃ¼reyi 304 â†’ 224 ms'ye indirdi; kalan kÄ±sÄ±m iÃ§in modal yapÄ±sÄ±nÄ±n deÄŸiÅŸtirilmesi (Ã¶r. modal olmayan `show()` + kendi odak tuzaÄŸÄ±) gerekiyor â€” aÃ§Ä±k madde.

## İlk yük JS

"İlk yük JS" = sayfa açılırken indirilen bütün betikler (hareket paketi GSAP/Lenis ilk boyamadan sonra ayrı yüklenir ve dahildir); gzip -9 ile yeniden sıkıştırılmış boyut. Vercel brotli ile daha az gönderir (tabloda "aktarım" değil gzip verildi).

## Notlar

- Vercel önizlemesi, ziyaretçiye `vercel.live/_next-live/feedback/feedback.js` (Vercel araç çubuğu) ekler; üretim adresinde bu betik yoktur.
- Ölçüm sırasında bulunan ve düzeltilen sorunlar `docs/KARAR-DEFTERI.md` → "Performans ve erişilebilirlik düzeltmeleri".
- **İlk ziyaret yükleyicisi:** Lighthouse her ölçümü ilk ziyaret olarak yaptığından yükleyici her seferinde açılır; açık olduğu ölçümlerde ilk boyama ≈ 2,4 sn'ye kayar ve mobil LCP'yi yükseltir (ayrıntı ve seçenekler KARAR-DEFTERI'nde; Volkan'ın kararı bekleniyor).
