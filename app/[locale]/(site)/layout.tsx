import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingActions } from '@/components/layout/FloatingActions'

/** The public site's chrome; the design prototypes under /prototyp bring their own. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="loader" aria-hidden="true">
        <div className="loader-bar" data-pos="top" />
        <div className="loader-bar" data-pos="bottom" />
        <div className="loader-mark">
          MEGA CARS
          <i />
        </div>
      </div>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      <FloatingActions />
    </>
  )
}
