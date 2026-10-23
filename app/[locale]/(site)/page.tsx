import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import map from '@/data/map.json'
import type { Locale } from '@/i18n/routing'
import { getCards, getFeatured, statsOf } from '@/lib/inventory'
import { BUILDING_PHOTO, SHOWROOM_PHOTO } from '@/lib/dealer-photos'
import { buildOptions } from '@/lib/filter'
import { HERO } from '@/lib/hero'
import { autoDealerLd, pageMeta } from '@/lib/seo'
import { JsonLd } from '@/components/ui/JsonLd'
import { HeroLetters } from '@/components/home/HeroLetters'
import { QuickSearch } from '@/components/home/QuickSearch'
import { BrandBand, FeaturedCars, LocationSection, ServicesSection, StockEmpty, TrustSection } from '@/components/home/Sections'
import type { MapData } from '@/components/home/MapPreview'
import { ActionBar } from '@/components/site/ActionBar'

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return pageMeta({ locale: locale as Locale, href: '/', title: t('homeTitle'), description: t('homeDescription') })
}

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = await getTranslations('hero')
  // the stock comes from the database (lib/inventory.ts); an empty answer shows the empty state
  const [cards, featured] = await Promise.all([getCards(), getFeatured()])
  const stats = statsOf(cards)

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
  const { makes, priceTo, bodies } = buildOptions(quick)
  const brandCounts = makes
    .map((m) => ({ slug: m.value, label: m.label, count: quick.filter((v) => v.makeSlug === m.value).length }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'de'))

  return (
    <>
      <JsonLd data={autoDealerLd(locale as Locale)} />
      <HeroLetters film={HERO} title={t('title')} cta={t('cta')} count={stats.count} />
      {cards.length > 0 ? (
        <>
          <QuickSearch vehicles={quick} options={{ makes, priceTo, bodies }} />
          <FeaturedCars cars={featured} />
          <BrandBand makes={brandCounts} />
        </>
      ) : (
        <StockEmpty />
      )}
      <TrustSection photo={SHOWROOM_PHOTO} stock={stats} />
      <ServicesSection />
      <LocationSection map={map as MapData} building={BUILDING_PHOTO} />
      <ActionBar />
    </>
  )
}
