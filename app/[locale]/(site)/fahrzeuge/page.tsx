import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import { getCards } from '@/lib/inventory'
import { buildOptions, parseFilters } from '@/lib/filter'
import { breadcrumbLd, localizedUrl, pageMeta } from '@/lib/seo'
import { JsonLd } from '@/components/ui/JsonLd'
import { VehicleList } from '@/components/vehicles/VehicleList'
import { ActionBar } from '@/components/site/ActionBar'

type Props = PageProps<'/[locale]/fahrzeuge'>

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return pageMeta({ locale: locale as Locale, href: '/fahrzeuge', title: t('listTitle'), description: t('listDescription') })
}

export default async function VehiclesPage({ params, searchParams }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  // filters live in the URL, so a shared or reloaded link renders the same result
  const initial = parseFilters(await searchParams)
  const cards = await getCards()
  const tn = await getTranslations('nav')

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: tn('home'), url: localizedUrl('/', locale as Locale) },
          { name: tn('vehicles'), url: localizedUrl('/fahrzeuge', locale as Locale) },
        ])}
      />
      <VehicleList cards={cards} options={buildOptions(cards)} initial={initial} />
      <ActionBar />
    </>
  )
}
