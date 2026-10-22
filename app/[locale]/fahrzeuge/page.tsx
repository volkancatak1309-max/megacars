import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import { toCard, vehicles } from '@/lib/inventory'
import { buildOptions, parseFilters } from '@/lib/filter'
import { alternates } from '@/lib/seo'
import { VehicleList } from '@/components/vehicles/VehicleList'
import { MobileActionBar } from '@/components/layout/MobileActionBar'

type Props = PageProps<'/[locale]/fahrzeuge'>

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return {
    title: t('listTitle'),
    description: t('listDescription'),
    alternates: alternates('/fahrzeuge', locale as Locale),
  }
}

export default async function VehiclesPage({ params, searchParams }: Props) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  // filters live in the URL, so a shared or reloaded link renders the same result
  const initial = parseFilters(await searchParams)
  const cards = vehicles.map(toCard)

  return (
    <div className="pt-[var(--header-h)]">
      <VehicleList cards={cards} options={buildOptions(cards)} initial={initial} />
      <MobileActionBar />
    </div>
  )
}
