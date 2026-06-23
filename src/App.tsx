import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import Nav from './components/Nav'
import Hero from './components/Hero'
import FeaturedCar from './components/FeaturedCar'
import HeroSequence from './components/HeroSequence'
import Inventory from './components/Inventory'
import Process from './components/Process'
import Reviews from './components/Reviews'
import CarDetail from './components/CarDetail'
import About from './components/About'
import Contact from './components/Contact'
import Finance from './components/Finance'
import TradeIn from './components/TradeIn'
import Faq from './components/Faq'
import Legal from './components/Legal'
import Footer from './components/Footer'
import Loader from './components/Loader'
import CustomCursor from './components/CustomCursor'
import { useLenis } from './hooks/useLenis'
import { useHeadingReveal } from './hooks/useHeadingReveal'
import { useHash, parseRoute, scrollMemory, type Route } from './lib/router'
import { scrollTop, scrollToY } from './lib/lenis'
import { prefersReducedMotion } from './lib/motion'
import { cars } from './lib/cars'

// A route's identity (page), ignoring on-home section anchors — the wipe only
// fires when this changes, never for in-page section scrolls.
const routeKey = (r: Route) => (r.name === 'detail' ? `detail:${r.slug}` : r.name)

export default function App() {
  const { i18n } = useTranslation()
  useLenis()

  // Overlay-wipe page transition (item 11). The shown route lags the target hash
  // during the wipe: the screen is covered, content swaps behind it, then it
  // reveals — so pages never jump. In-page anchors (same routeKey) sync without a
  // wipe; reduced-motion swaps instantly. The existing hash router is untouched.
  const targetHash = useHash()
  const [shownHash, setShownHash] = useState(targetHash)
  const shownHashRef = useRef(shownHash)
  const wipeRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    shownHashRef.current = shownHash
  }, [shownHash])

  useEffect(() => {
    const cur = shownHashRef.current
    if (routeKey(parseRoute(targetHash)) === routeKey(parseRoute(cur))) {
      if (targetHash !== cur) setShownHash(targetHash) // anchor change only, no wipe
      return
    }
    if (prefersReducedMotion() || !wipeRef.current) {
      setShownHash(targetHash)
      return
    }
    const ov = wipeRef.current
    const tl = gsap.timeline()
    tl.set(ov, { autoAlpha: 1, scaleY: 0, transformOrigin: 'center bottom', pointerEvents: 'auto' })
      .to(ov, { scaleY: 1, duration: 0.42, ease: 'power3.inOut' })
      .add(() => setShownHash(targetHash)) // swap behind the cover
      .to(ov, { scaleY: 0, transformOrigin: 'center top', duration: 0.5, ease: 'power3.inOut' }, '+=0.04')
      .set(ov, { autoAlpha: 0, pointerEvents: 'none' })
    return () => {
      tl.kill()
    }
  }, [targetHash])

  const route = parseRoute(shownHash)
  const car = route.name === 'detail' ? cars.find((c) => c.id === route.slug) : undefined
  const slug = route.name === 'detail' ? route.slug : ''

  // Cinematic SplitText reveal on display headings — re-run per route + language
  // (so re-splitting picks up the freshly rendered, correctly-measured text).
  useHeadingReveal(`${route.name}:${slug}:${i18n.resolvedLanguage ?? 'de'}`)

  // Take over scroll restoration from the browser (it fights our manual restore).
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])

  // Home restores the remembered scroll; every other route opens at its own top.
  useEffect(() => {
    if (route.name === 'home') {
      const y = scrollMemory.take()
      if (y != null) requestAnimationFrame(() => scrollToY(y, true))
    } else {
      scrollTop(true)
    }
  }, [route.name, slug])

  let page
  if (route.name === 'detail' && car) page = <CarDetail car={car} />
  else if (route.name === 'about') page = <About />
  else if (route.name === 'contact') page = <Contact />
  else if (route.name === 'finance') page = <Finance />
  else if (route.name === 'tradein') page = <TradeIn />
  else if (route.name === 'faq') page = <Faq />
  else if (route.name === 'impressum') page = <Legal kind="impressum" />
  else if (route.name === 'datenschutz') page = <Legal kind="datenschutz" />
  else if (route.name === 'agb') page = <Legal kind="agb" />
  else
    page = (
      <>
        <Hero />
        <FeaturedCar />
        <HeroSequence />
        <Inventory />
        <Process />
        <Reviews />
      </>
    )

  return (
    <>
      <Loader />
      <Nav />
      <main>{page}</main>
      <Footer />
      {/* page-wipe cover (item 11) — driven imperatively by the transition above */}
      <div
        ref={wipeRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[70] bg-bg"
        style={{ visibility: 'hidden', transform: 'scaleY(0)' }}
      />
      <CustomCursor />
    </>
  )
}
