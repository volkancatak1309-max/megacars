import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import { stockStats } from '@/lib/inventory'
import { SITE } from '@/lib/site'
import { Loader } from '@/components/site/Loader'
import { CurtainProvider } from '@/components/site/Curtain'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { Floating } from '@/components/site/Floating'
import { ViewCursor, Grain } from '@/components/site/Cursor'

/**
 * Site chrome: first-visit loader, red curtain, top bar, footer, cursor and grain.
 * setRequestLocale here too: layouts render on their own, and without it next-intl
 * reads the request headers, which turns every page into a dynamic render.
 */
export default async function SiteLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = await getTranslations('common')
  return (
    <>
      <Loader place={`${SITE.city} · ${SITE.region}`} />
      <CurtainProvider mark="MEGA CARS">
        <Header stock={stockStats.count} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <Floating />
      </CurtainProvider>
      <ViewCursor label={t('view')} />
      <Grain />
    </>
  )
}
