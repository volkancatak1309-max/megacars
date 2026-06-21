import { useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import FeaturedCar from './components/FeaturedCar'
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
import { useLenis } from './hooks/useLenis'
import { useHash, parseRoute, scrollMemory } from './lib/router'
import { scrollTop, scrollToY } from './lib/lenis'
import { cars } from './lib/cars'

export default function App() {
  useLenis()
  const route = parseRoute(useHash())
  const car = route.name === 'detail' ? cars.find((c) => c.id === route.slug) : undefined
  const slug = route.name === 'detail' ? route.slug : ''

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
    </>
  )
}
