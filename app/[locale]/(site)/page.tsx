import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import map from '@/data/map.json'
import type { Locale } from '@/i18n/routing'
import { featuredVehicles, stockStats, toCard, vehicles } from '@/lib/inventory'
import { buildOptions } from '@/lib/filter'
import { HERO } from '@/lib/hero'
import { autoDealerLd, pageMeta } from '@/lib/seo'
import { JsonLd } from '@/components/ui/JsonLd'
import { HeroLetters } from '@/components/home/HeroLetters'
import { QuickSearch } from '@/components/home/QuickSearch'
import { BrandBand, FeaturedCars, LocationSection, ServicesSection, TrustSection } from '@/components/home/Sections'
import type { MapData } from '@/components/home/MapPreview'
import { ActionBar } from '@/components/site/ActionBar'

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return pageMeta({ locale: locale as Locale, href: '/', title: t('homeTitle'), description: t('homeDescription') })
}

// The dealer's own photos: showroom interior and the building with its sign.
const SHOWROOM = { id: 'mercedes-glc-220-d', photo: 3 }
const BUILDING = { id: 'audi-q3-35-tdi', photo: 0 }
const photoOf = (ref: { id: string; photo: number }) => vehicles.find((v) => v.id === ref.id)!.photos[ref.photo]

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = await getTranslations('hero')

  const quick = vehicles.map(toCard).map(({ makeSlug, make, price, mileage, firstRegistrationKey, fuel, transmission, body }) => ({
    makeSlug,
    make,
    price,
    mileage,
    firstRegistrationKey,
    fuel,
    transmission,
    body,
  }))
  const { makes, priceTo, bodies } = buildOptions(quick)
  const brandCounts = makes
    .map((m) => ({ slug: m.value, label: m.label, count: quick.filter((v) => v.makeSlug === m.value).length }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'de'))

  return (
    <>
      <JsonLd data={autoDealerLd(locale as Locale)} />
      <HeroLetters film={HERO} title={t('title')} cta={t('cta')} count={stockStats.count} />
      <QuickSearch vehicles={quick} options={{ makes, priceTo, bodies }} />
      <FeaturedCars cars={featuredVehicles().slice(0, 6)} />
      <BrandBand makes={brandCounts} />
      <TrustSection photo={photoOf(SHOWROOM)} stock={stockStats} />
      <ServicesSection />
      <LocationSection map={map as MapData} building={photoOf(BUILDING)} />
      <ActionBar />
    </>
  )
}
