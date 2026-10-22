import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import map from '@/data/map.json'
import type { Locale } from '@/i18n/routing'
import { featuredVehicles, stockStats, toCard, vehicles } from '@/lib/inventory'
import { buildOptions } from '@/lib/filter'
import { alternates, autoDealerLd } from '@/lib/seo'
import { JsonLd } from '@/components/ui/JsonLd'
import { Hero } from '@/components/home/Hero'
import { QuickSearch } from '@/components/home/QuickSearch'
import { FeaturedGrid } from '@/components/home/FeaturedGrid'
import { Trust } from '@/components/home/Trust'
import { Services } from '@/components/home/Services'
import { Location } from '@/components/home/Location'
import type { MapData } from '@/components/home/MapPreview'
import { MobileActionBar } from '@/components/layout/MobileActionBar'

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
    alternates: alternates('/', locale as Locale),
  }
}

// The dealer's own photos: showroom interior and the building with its sign.
const SHOWROOM = { id: 'mercedes-glc-220-d', photo: 3 }
const BUILDING = { id: 'audi-q3-35-tdi', photo: 0 }
const photoOf = (ref: { id: string; photo: number }) => vehicles.find((v) => v.id === ref.id)!.photos[ref.photo]

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params
  setRequestLocale(locale as Locale)

  const cards = vehicles.map(toCard)
  const quick = cards.map(({ makeSlug, make, price, mileage, firstRegistrationKey, fuel, transmission, body }) => ({
    makeSlug,
    make,
    price,
    mileage,
    firstRegistrationKey,
    fuel,
    transmission,
    body,
  }))
  const options = buildOptions(quick)

  return (
    <>
      <JsonLd data={autoDealerLd(locale as Locale)} />
      <Hero />
      <QuickSearch vehicles={quick} options={{ ...options, priceFrom: [], kmTo: [], yearFrom: [] }} />
      <FeaturedGrid cards={featuredVehicles().map(toCard).slice(0, 6)} />
      <Trust photo={photoOf(SHOWROOM)} stock={stockStats} />
      <Services />
      <Location map={map as MapData} building={photoOf(BUILDING)} />
      <MobileActionBar />
    </>
  )
}
