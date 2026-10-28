import { setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import { getStockStats } from '@/lib/inventory'
import { Loader } from '@/components/site/Loader'
import { CurtainProvider } from '@/components/site/Curtain'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { Floating } from '@/components/site/Floating'
import { Grain } from '@/components/site/Grain'
import { Logo } from '@/components/brand/Logo'

/**
 * Site chrome: first-visit loader, red curtain, top bar, footer and grain. No custom
 * cursor (Volkan's rule for every project, 23.10.2026). setRequestLocale here too:
 * layouts render on their own, and without it next-intl reads the request headers,
 * which turns every page into a dynamic render.
 */
export default async function SiteLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const stock = await getStockStats()
  return (
    <>
      <Loader />
      <CurtainProvider mark="MEGA CARS">
        {/* the logo renders here on the server and travels to the client header as markup */}
        <Header stock={stock.count} brand={<Logo sizes="(min-width: 1024px) 83px, 68px" />} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <Floating />
      </CurtainProvider>
      <Grain />
    </>
  )
}
