import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import { vehicles } from '@/lib/inventory'
import { formatPrice, vehicleName } from '@/lib/format'
import { breadcrumbLd, localizedUrl, pageMeta } from '@/lib/seo'
import { JsonLd } from '@/components/ui/JsonLd'
import { ActionBar } from '@/components/site/ActionBar'
import { PageHero, Steps } from '@/components/site/PageHero'
import { RequestForm, type FormField } from '@/components/site/RequestForm'
import { Chars } from '@/components/site/Loader'

type Props = PageProps<'/[locale]/finanzierung'>

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'financingPage' })
  return pageMeta({ locale: locale as Locale, href: '/finanzierung', title: t('metaTitle'), description: t('metaDescription') })
}

/**
 * Financing request: no rates, partner banks or conditions (none are confirmed) — only
 * a plain explanation and a form that goes to the dealer by WhatsApp or e-mail.
 * Visibility in menu and sitemap: lib/launch.ts PAGES.financing.
 */
export default async function FinancingPage({ params }: Props) {
  const { locale: raw } = await params
  const locale = raw as Locale
  setRequestLocale(locale)
  const t = await getTranslations('financingPage')
  const tn = await getTranslations('nav')
  const tf = await getTranslations('form')

  const fields: FormField[] = [
    {
      name: 'vehicle',
      kind: 'select',
      options: [
        { value: 'open', label: tf('financing.vehicleOpen') },
        ...vehicles.map((v) => ({ value: v.slug, label: `${vehicleName(v)} · ${formatPrice(v.price, locale)}` })),
      ],
    },
    { name: 'downPayment', kind: 'text', inputMode: 'decimal', half: true },
    { name: 'term', kind: 'text', half: true },
    { name: 'name', kind: 'text', required: true, autoComplete: 'name', half: true },
    { name: 'phone', kind: 'tel', required: true, autoComplete: 'tel', half: true },
    { name: 'email', kind: 'email', autoComplete: 'email' },
    { name: 'message', kind: 'textarea' },
  ]

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: tn('home'), url: localizedUrl('/', locale) },
          { name: tn('financing'), url: localizedUrl('/finanzierung', locale) },
        ])}
      />
      <PageHero word={t('word')} title={t('title')} lead={t('lead')} />
      <Steps title={t('stepsTitle')} steps={[t('step1'), t('step2'), t('step3')]} />
      <section className="rf-section s-red" aria-label={tf('financing.title')}>
        <div className="rf-grid pg wide">
          <div className="rf-aside">
            <p className="rf-aside-word" aria-hidden="true">
              <Chars text={t('formWord')} />
            </p>
            <p className="lead">{t('formLead')}</p>
          </div>
          {/* ?fahrzeug=<slug> (from a vehicle page) preselects the car on the client, so the page stays static */}
          <RequestForm kind="financing" fields={fields} queryPresets={{ vehicle: 'fahrzeug' }} />
        </div>
      </section>
      <ActionBar />
    </>
  )
}
