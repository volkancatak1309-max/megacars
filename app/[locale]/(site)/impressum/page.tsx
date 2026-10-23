import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import { breadcrumbLd, localizedUrl, pageMeta } from '@/lib/seo'
import { SITE, mailHref } from '@/lib/site'
import { JsonLd } from '@/components/ui/JsonLd'
import { DrawGroup } from '@/components/motion/Reveal'
import { PageHero } from '@/components/site/PageHero'
import { ShutterA } from '@/components/site/Shutter'

type Props = PageProps<'/[locale]/impressum'>

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'imprintPage' })
  return pageMeta({ locale: locale as Locale, href: '/impressum', title: t('metaTitle'), description: t('metaDescription') })
}

/**
 * § 5 ECG, § 14 UGB, § 25 MedienG — only verified facts (Firmenbuch via EVI, WKO Firmen
 * A-Z, GISA; KARAR-DEFTERI 23.10.2026). The UID is unknown, so there is no line for it
 * (no empty placeholder).
 */
export default async function ImprintPage({ params }: Props) {
  const { locale: raw } = await params
  const locale = raw as Locale
  setRequestLocale(locale)
  const t = await getTranslations('imprintPage')
  const tn = await getTranslations('nav')
  const tc = await getTranslations('common')

  const rows: { label: string; value: React.ReactNode }[] = [
    { label: t('company'), value: SITE.legalName },
    { label: t('legalForm'), value: t('legalFormValue') },
    { label: t('owner'), value: SITE.owner },
    { label: t('address'), value: `${SITE.street}, ${SITE.zip} ${SITE.city}, ${t('country')}` },
    {
      label: t('phone'),
      value: (
        <ShutterA href={SITE.phoneHref} kind="text" className="tabular">
          {SITE.phone}
        </ShutterA>
      ),
    },
    {
      label: t('email'),
      value: (
        <ShutterA href={mailHref} kind="text">
          {SITE.email}
        </ShutterA>
      ),
    },
    { label: t('register'), value: SITE.register },
    { label: t('court'), value: tc('court') },
    { label: t('purpose'), value: t('purposeValue') },
    { label: t('trade'), value: t('tradeValue') },
    { label: t('authority'), value: t('authorityValue') },
    { label: t('chamber'), value: t('chamberValue') },
    { label: t('law'), value: t('lawValue') },
    { label: t('mediaOwner'), value: t('mediaOwnerValue') },
    { label: t('credits'), value: t('creditsValue') },
    {
      label: t('website'),
      value: (
        <ShutterA href={SITE.galzura} target="_blank" rel="noopener" kind="text">
          {t('websiteValue')}
        </ShutterA>
      ),
    },
  ]

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: tn('home'), url: localizedUrl('/', locale) },
          { name: tn('imprint'), url: localizedUrl('/impressum', locale) },
        ])}
      />
      <PageHero word={t('word')} title={t('title')} lead={t('lead')} />
      <section className="lg s-bone" aria-label={t('word')}>
        <div className="pg wide">
          {locale !== 'de' && <p className="lg-note">{t('translationNote')}</p>}
          <dl className="lg-rows">
            {rows.map((r) => (
              <DrawGroup key={r.label}>
                <dt>{r.label}</dt>
                <dd>{r.value}</dd>
              </DrawGroup>
            ))}
          </dl>
        </div>
      </section>
    </>
  )
}
