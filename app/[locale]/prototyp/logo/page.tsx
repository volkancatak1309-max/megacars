import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import { LOGO_CONCEPT } from '@/lib/launch'
import { CONCEPTS, iconSvg, type Concept, type Layout, type Tone } from '@/lib/brand/marks'
import { Logo } from '@/components/brand/Logo'
import { LoaderDemo } from '@/components/brand/LoaderDemo'
import { Loader } from '@/components/site/Loader'

// Comparison page for Volkan (23.10.2026), German with Turkish, never indexed.
export const metadata: Metadata = {
  title: 'Logo-Konzepte – Mega Cars',
  robots: { index: false, follow: false, nocache: true },
}

const ORDER: Concept[] = ['a', 'b', 'c']
const LAYOUTS: { key: Layout; de: string; tr: string }[] = [
  { key: 'horizontal', de: 'Horizontal (Kopfzeile)', tr: 'Yatay (üst bar)' },
  { key: 'stacked', de: 'Zentriert (Startbildschirm)', tr: 'Dikey (açılış ekranı)' },
  { key: 'mark', de: 'Nur Emblem (Tab, App)', tr: 'Yalnız amblem (sekme, uygulama)' },
]
const TONES: { key: Tone; de: string; tr: string }[] = [
  { key: 'dark', de: 'auf Nacht', tr: 'koyu zemin' },
  { key: 'light', de: 'auf Knochen', tr: 'açık zemin' },
]
// CC's visual likeness check against well-known car marks (no trademark search).
const CHECK: Record<Concept, { de: string; tr: string }> = {
  a: {
    de: 'Ähnlichkeitsprüfung: kein Stern, kein Ring, kein Schild, keine Flügel, kein Tier — nicht wie Mercedes, BMW, Porsche, Ferrari, Lamborghini, Alfa Romeo, Bentley oder Aston Martin. Das gefaltete M ist kein Doppel-M im Dreieck (Maybach), das C kein Swoosh (McLaren).',
    tr: 'Benzerlik kontrolü: yıldız, halka, kalkan, kanat ve hayvan yok — Mercedes, BMW, Porsche, Ferrari, Lamborghini, Alfa Romeo, Bentley, Aston Martin’e benzemiyor. Katlanmış M, Maybach’ın üçgen içindeki çift M’si değil; C, McLaren’in kuyruklu işareti değil.',
  },
  b: {
    de: 'Ähnlichkeitsprüfung: eine Plakette mit Zierlinie, Streifen und Monogramm — nicht Hondas H im Rechteck, kein Kennzeichen (kein Land, keine Zahl), kein Oval wie Ford, Toyota oder Land Rover.',
    tr: 'Benzerlik kontrolü: çerçeveli, şeritli ve monogramlı plaket — Honda’nın dikdörtgen içindeki H’si değil, plaka değil (ülke ve sayı yok), Ford/Toyota/Land Rover gibi oval değil.',
  },
  c: {
    de: 'Ähnlichkeitsprüfung: ein Sechseck mit geraden Kanten — kein Schild (Porsche, Cadillac, Lamborghini), kein Oval (Hyundai, Infiniti), kein Achteck (MG), kein Dreizack, keine Krone.',
    tr: 'Benzerlik kontrolü: düz kenarlı altıgen — kalkan değil (Porsche, Cadillac, Lamborghini), oval değil (Hyundai, Infiniti), sekizgen değil (MG); üç dişli mızrak ve taç yok.',
  },
}

export default async function LogoPrototypePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  return (
    <main id="main" className="pl s-night">
      <div className="pg wide">
        <header className="pl-head">
          <p className="label">Prototyp · Prototip</p>
          <h1 className="d-m">Drei Logo-Konzepte für Mega Cars stehen hier nebeneinander.</h1>
          <p className="lead">Üç logo konsepti burada yan yana duruyor: her birinin açılış ekranı, koyu ve açık zeminde üç kullanım biçimi ve sekme ikonu önizlemesi.</p>
        </header>

        {ORDER.map((c) => (
          <section key={c} className="pl-concept" id={`konzept-${c}`} aria-labelledby={`pl-${c}`}>
            <h2 id={`pl-${c}`} className="d-s">
              Konzept {c.toUpperCase()} — {CONCEPTS[c].name}
              {c === LOGO_CONCEPT && <span className="pl-badge">Empfohlen · Önerilen</span>}
            </h2>
            <p className="pl-desc">{CONCEPTS[c].de}</p>
            <p className="pl-desc" lang="tr">
              {CONCEPTS[c].tr}
            </p>

            <h3 className="label">Startbildschirm · Açılış ekranı</h3>
            <LoaderDemo label="Nochmal abspielen · Yeniden oynat">
              {/* what stays in the frame once the curtain has lifted */}
              <div className="pl-after">
                <Logo concept={c} layout="stacked" tone="dark" chrome />
              </div>
              <Loader demo concept={c} />
            </LoaderDemo>

            <h3 className="label">Formen · Biçimler</h3>
            <div className="pl-grid">
              {TONES.map((t) =>
                LAYOUTS.map((l) => (
                  <div key={`${t.key}-${l.key}`} className="pl-tile" data-tone={t.key} data-layout={l.key}>
                    <Logo concept={c} layout={l.key} tone={t.key} chrome={l.key === 'stacked'} />
                    <small>
                      {l.de} {t.de} · {l.tr}, {t.tr}
                    </small>
                  </div>
                )),
              )}
            </div>

            <h3 className="label">Tab-Icon · Sekme ikonu (16 px / 32 px)</h3>
            <div className="pl-tabs">
              {TONES.map((t) => (
                <span key={t.key} className="pl-tab" data-tone={t.key}>
                  <span className="pl-fav" dangerouslySetInnerHTML={{ __html: iconSvg(c, 16) }} />
                  Mega Cars – Gebrauchtwagen in Hohenems
                </span>
              ))}
              <span className="pl-tab" data-tone="dark">
                <span className="pl-fav pl-fav--32" dangerouslySetInnerHTML={{ __html: iconSvg(c, 32) }} />
                32 px
              </span>
            </div>

            <p className="pl-note">{CHECK[c].de}</p>
            <p className="pl-note" lang="tr">
              {CHECK[c].tr}
            </p>
          </section>
        ))}
      </div>
    </main>
  )
}
