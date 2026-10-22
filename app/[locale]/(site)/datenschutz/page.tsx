import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import { breadcrumbLd, localizedUrl, pageMeta } from '@/lib/seo'
import { JsonLd } from '@/components/ui/JsonLd'
import { PageHero } from '@/components/site/PageHero'
import { LinesUp } from '@/components/site/Reveals'

type Props = PageProps<'/[locale]/datenschutz'>

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'privacyPage' })
  return pageMeta({ locale: locale as Locale, href: '/datenschutz', title: t('metaTitle'), description: t('metaDescription') })
}

// Written for what the site really uses (KARAR-DEFTERI 23.10.2026): Vercel hosting,
// self-hosted fonts and media, OpenStreetMap only after a click, WhatsApp and e-mail
// links, no cookies and no storage on the device.
const SECTIONS = ['controller', 'hosting', 'fonts', 'map', 'contact', 'cookies', 'links', 'rights'] as const

export default async function PrivacyPage({ params }: Props) {
  const { locale: raw } = await params
  const locale = raw as Locale
  setRequestLocale(locale)
  const t = await getTranslations('privacyPage')
  const tn = await getTranslations('nav')
  const paragraphs = (key: string) => [1, 2, 3, 4].map((i) => `${key}P${i}`).filter((k) => t.has(k))

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: tn('home'), url: localizedUrl('/', locale) },
          { name: tn('privacy'), url: localizedUrl('/datenschutz', locale) },
        ])}
      />
      <PageHero word={t('word')} title={t('title')} lead={t('lead')} />
      <section className="lg s-bone" aria-label={t('word')}>
        <div className="lg-grid pg wide">
          <nav className="lg-toc" aria-label={t('tocLabel')}>
            <p className="label">{t('tocLabel')}</p>
            <ol>
              {SECTIONS.map((s, i) => (
                <li key={s}>
                  <a href={`#${s}`}>
                    <span className="tabular">{String(i + 1).padStart(2, '0')}</span>
                    {t(`${s}Title`)}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="lg-body">
            {locale !== 'de' && <p className="lg-note">{t('translationNote')}</p>}
            {SECTIONS.map((s, i) => (
              <section key={s} id={s} className="lg-sec" aria-labelledby={`${s}-h`}>
                <span className="lg-n tabular" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <LinesUp id={`${s}-h`} className="lg-h d-s">
                  {t(`${s}Title`)}
                </LinesUp>
                {paragraphs(s).map((k) => (
                  <p key={k}>{t(k)}</p>
                ))}
              </section>
            ))}
            <p className="lg-updated">{t('updated')}</p>
          </div>
        </div>
      </section>
    </>
  )
}
