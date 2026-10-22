import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import { alternates } from '@/lib/seo'
import { InfoPage } from '@/components/site/InfoPage'

export async function generateMetadata({ params }: PageProps<'/[locale]/kontakt'>): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'info' })
  return { title: `${t('contact')} – Mega Cars`, alternates: alternates('/kontakt', locale as Locale) }
}

export default async function Page({ params }: PageProps<'/[locale]/kontakt'>) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = await getTranslations('info')
  return <InfoPage title={t('contact')} lead={t('lead')} />
}
