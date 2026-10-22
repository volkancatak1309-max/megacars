import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import { alternates } from '@/lib/seo'
import { InfoPage } from '@/components/site/InfoPage'

export async function generateMetadata({ params }: PageProps<'/[locale]/ankauf'>): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'info' })
  return { title: `${t('tradeIn')} – Mega Cars`, alternates: alternates('/ankauf', locale as Locale) }
}

export default async function Page({ params }: PageProps<'/[locale]/ankauf'>) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = await getTranslations('info')
  return <InfoPage title={t('tradeIn')} lead={t('lead')} />
}
