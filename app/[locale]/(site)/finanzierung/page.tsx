import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import { alternates } from '@/lib/seo'
import { InfoPage } from '@/components/site/InfoPage'

export async function generateMetadata({ params }: PageProps<'/[locale]/finanzierung'>): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'info' })
  return { title: `${t('financing')} – Mega Cars`, alternates: alternates('/finanzierung', locale as Locale) }
}

export default async function Page({ params }: PageProps<'/[locale]/finanzierung'>) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = await getTranslations('info')
  return <InfoPage title={t('financing')} lead={t('lead')} />
}
