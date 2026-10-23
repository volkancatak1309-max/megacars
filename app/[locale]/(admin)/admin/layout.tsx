import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import '@/styles/admin.css'

export const metadata: Metadata = {
  title: 'Mega Cars – Fahrzeugverwaltung',
  robots: { index: false, follow: false },
}

// Only the panel's own words travel to the browser.
const NAMESPACES = ['admin', 'vehicle', 'common', 'form']
/** the equipment picker shows the group names of the site's detail page */
const detailSubset = (all: Record<string, unknown>) => {
  const detail = all.detail as Record<string, unknown> | undefined
  return detail?.equipmentGroups ? { detail: { equipmentGroups: detail.equipmentGroups } } : {}
}
const pick = (all: Record<string, unknown>, keys: string[]) => Object.fromEntries(keys.filter((k) => k in all).map((k) => [k, all[k]]))

/** Admin panel shell: no loader, curtain or site chrome; German or Turkish (proxy.ts). */
export default async function AdminLayout({ children, params }: LayoutProps<'/[locale]/admin'>) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const messages = await getMessages()
  return (
    <NextIntlClientProvider messages={{ ...pick(messages, NAMESPACES), ...detailSubset(messages) }}>
      <div className="adm s-night">{children}</div>
    </NextIntlClientProvider>
  )
}
