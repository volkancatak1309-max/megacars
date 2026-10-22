import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { localizedUrl } from '@/lib/seo'
import { ProtoDetail } from '@/components/proto/ProtoDetail'
import { protoCar, protoSlugs } from '@/components/proto/data'

type Props = PageProps<'/[locale]/prototyp/a/[slug]'>

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => protoSlugs().map((slug) => ({ locale, slug })))
}
export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const t = await getTranslations({ locale: locale as Locale, namespace: 'proto' })
  const car = await protoCar(slug)
  return car ? { title: `${car.name} · ${t('word')} A – Mega Cars` } : {}
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale as Locale)
  const car = await protoCar(slug)
  if (!car) notFound()
  const url = localizedUrl({ pathname: '/prototyp/a/[slug]', params: { slug } }, locale as Locale)
  return <ProtoDetail variant="a" car={car} url={url} />
}
