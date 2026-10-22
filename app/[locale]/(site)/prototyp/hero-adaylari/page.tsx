import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import { HERO_ACTIVE, HERO_CANDIDATES, type HeroKey } from '@/lib/hero'
import { NOINDEX } from '@/lib/seo'
import { FilmInLetters } from '@/components/home/HeroLetters'
import { LinesUp } from '@/components/site/Reveals'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('heroCandidates')
  return { title: `${t('metaTitle')} – Mega Cars`, robots: NOINDEX }
}

/** The three opening films inside the same letters, side by side (Volkan chooses one). */
export default async function HeroCandidatesPage({ params }: PageProps<'/[locale]/prototyp/hero-adaylari'>) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = await getTranslations('heroCandidates')
  const keys = Object.keys(HERO_CANDIDATES) as HeroKey[]
  const l = locale as 'de' | 'tr'

  return (
    <section className="hc s-night pg wide" aria-labelledby="hc-title">
      <LinesUp as="h1" id="hc-title" className="hc-title d-l">
        {t('title')}
      </LinesUp>
      <p className="lead" style={{ marginTop: 24 }}>
        {t('lead')}
      </p>
      <ol className="hc-list">
        {keys.map((key) => {
          const film = HERO_CANDIDATES[key]
          return (
            <li key={key} className="hc-item">
              <FilmInLetters film={film} id={`hc-${key}`} label={film.label[l]} />
              <p className="hc-key">
                <b>{key.toUpperCase()}</b>
                <span className="d-s">{film.car[l]}</span>
              </p>
              {key === HERO_ACTIVE && <span className="hc-active">{t('active')}</span>}
              <p>{film.note[l]}</p>
              <p className="hc-meta">
                <span>
                  {t('source')}:{' '}
                  <a href={film.source} target="_blank" rel="noopener">
                    {film.source.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>{' '}
                  · {film.author}
                </span>
                <span>
                  {t('licence')}:{' '}
                  <a href={film.licenceUrl} target="_blank" rel="noopener">
                    {film.licence}
                  </a>
                </span>
              </p>
            </li>
          )
        })}
      </ol>
      <p className="hc-note">{t('note')}</p>
    </section>
  )
}
