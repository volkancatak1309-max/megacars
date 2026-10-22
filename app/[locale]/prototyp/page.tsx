import type { Metadata } from 'next'
import { Archivo, Instrument_Serif, Unbounded } from 'next/font/google'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { Icon } from '@/components/ui/Icon'
import { ShutterLink } from '@/components/proto/Shutter'

const archivo = Archivo({ subsets: ['latin', 'latin-ext'], axes: ['wdth'], variable: '--f-a', display: 'swap' })
const serif = Instrument_Serif({ subsets: ['latin', 'latin-ext'], weight: '400', variable: '--f-b', display: 'swap' })
const unbounded = Unbounded({ subsets: ['latin', 'latin-ext'], variable: '--f-c', display: 'swap' })

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('proto')
  return { title: `${t('wordMany')} – Mega Cars`, description: t('compareLead') }
}

export default async function ComparePage({ params }: PageProps<'/[locale]/prototyp'>) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = await getTranslations('proto')
  const tn = await getTranslations('nav')

  const directions = [
    { key: 'a', href: '/prototyp/a', name: t('aName'), desc: t('aDesc'), font: 'Archivo · SIL OFL 1.1', swatches: ['#0a0a0a', '#e10600', '#f4f4f0'] },
    { key: 'b', href: '/prototyp/b', name: t('bName'), desc: t('bDesc'), font: 'Instrument Serif + Instrument Sans · SIL OFL 1.1', swatches: ['#efebe3', '#141414', '#d7141a'] },
    { key: 'c', href: '/prototyp/c', name: t('cName'), desc: t('cDesc'), font: 'Unbounded + Hanken Grotesk · SIL OFL 1.1', swatches: ['#0b0b0d', '#ece7de', '#d7141a'] },
  ] as const

  return (
    <div className={`proto proto-cmp ${archivo.variable} ${serif.variable} ${unbounded.variable}`}>
      <main id="main" tabIndex={-1} className="pg cmp outline-none">
        <header className="cmp-top">
          <span className="cmp-mark">MEGA CARS</span>
          <nav className="cmp-lang" aria-label={tn('label')}>
            {routing.locales.map((l) => (
              <Link key={l} href="/prototyp" locale={l} hrefLang={l} lang={l} aria-current={l === locale ? 'true' : undefined}>
                {l.toUpperCase()}
              </Link>
            ))}
          </nav>
        </header>
        <h1 className="cmp-title">{t('compareTitle')}</h1>
        <p className="cmp-lead">{t('compareLead')}</p>
        <ol className="cmp-grid">
          {directions.map((d) => (
            <li key={d.key} className={`cmp-card cmp-${d.key}`}>
              <div className="cmp-spec" aria-hidden="true">
                <span className="cmp-spec-letter">{d.key.toUpperCase()}</span>
                <span className="cmp-spec-word">S 560</span>
                <span className="cmp-swatches">
                  {d.swatches.map((c) => (
                    <i key={c} style={{ background: c }} />
                  ))}
                </span>
              </div>
              <h2 className="cmp-name">{d.name}</h2>
              <p className="cmp-desc">{d.desc}</p>
              <p className="cmp-font">{d.font}</p>
              <ShutterLink href={d.href} kind="solid">
                {t('open')}
                <Icon name="arrowRight" size={18} />
              </ShutterLink>
            </li>
          ))}
        </ol>
        <p className="cmp-note">{t('compareNote')}</p>
      </main>
    </div>
  )
}
