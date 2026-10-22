import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import { FUELS, GEARBOXES } from '@/lib/filter'
import { breadcrumbLd, localizedUrl, pageMeta } from '@/lib/seo'
import { JsonLd } from '@/components/ui/JsonLd'
import { ActionBar } from '@/components/site/ActionBar'
import { PageHero, Steps } from '@/components/site/PageHero'
import { RequestForm, type FormField } from '@/components/site/RequestForm'
import { Chars } from '@/components/site/Loader'

type Props = PageProps<'/[locale]/ankauf'>

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'tradeInPage' })
  return pageMeta({ locale: locale as Locale, href: '/ankauf', title: t('metaTitle'), description: t('metaDescription') })
}

/**
 * Selling or trading in a car. The service still waits for the dealer's confirmation,
 * so the page stays out of the menu and the sitemap until lib/launch.ts PAGES.tradeIn
 * is switched on; the form already delivers by WhatsApp or e-mail.
 */
export default async function TradeInPage({ params }: Props) {
  const { locale: raw } = await params
  const locale = raw as Locale
  setRequestLocale(locale)
  const t = await getTranslations('tradeInPage')
  const tn = await getTranslations('nav')
  const tf = await getTranslations('form')
  const tv = await getTranslations('vehicle')

  const fields: FormField[] = [
    {
      name: 'purpose',
      kind: 'choice',
      options: [
        { value: 'sell', label: tf('tradeIn.purposeSell') },
        { value: 'trade', label: tf('tradeIn.purposeTrade') },
      ],
    },
    { name: 'make', kind: 'text', required: true, half: true },
    { name: 'model', kind: 'text', required: true, half: true },
    { name: 'registration', kind: 'text', inputMode: 'numeric', half: true },
    { name: 'mileage', kind: 'text', inputMode: 'numeric', half: true },
    { name: 'fuel', kind: 'select', options: FUELS.map((x) => ({ value: x, label: tv(`fuelValues.${x}`) })), half: true },
    { name: 'gearbox', kind: 'select', options: GEARBOXES.map((x) => ({ value: x, label: tv(`gearboxValues.${x}`) })), half: true },
    { name: 'condition', kind: 'textarea' },
    { name: 'name', kind: 'text', required: true, autoComplete: 'name', half: true },
    { name: 'phone', kind: 'tel', required: true, autoComplete: 'tel', half: true },
    { name: 'email', kind: 'email', autoComplete: 'email' },
  ]

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: tn('home'), url: localizedUrl('/', locale) },
          { name: tn('tradeIn'), url: localizedUrl('/ankauf', locale) },
        ])}
      />
      <PageHero word={t('word')} title={t('title')} lead={t('lead')} />
      <Steps title={t('stepsTitle')} steps={[t('step1'), t('step2'), t('step3')]} />
      <section className="rf-section s-red" aria-label={tf('tradeIn.title')}>
        <div className="rf-grid pg wide">
          <div className="rf-aside">
            <p className="rf-aside-word" aria-hidden="true">
              <Chars text={t('formWord')} />
            </p>
            <p className="lead">{t('formLead')}</p>
          </div>
          <RequestForm kind="tradeIn" fields={fields} />
        </div>
      </section>
      <ActionBar />
    </>
  )
}
