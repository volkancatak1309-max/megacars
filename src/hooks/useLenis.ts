import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setLenisInstance } from '../lib/lenis'

gsap.registerPlugin(ScrollTrigger)

// Smooth scroll (DESIGN.md §4) driven by GSAP ticker + wired to ScrollTrigger.
// Disabled under reduced-motion (ARSENAL BÖLÜM 13); scrollToId then falls back.
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    setLenisInstance(lenis)

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', onScroll)
      gsap.ticker.remove(raf)
      lenis.destroy()
      setLenisInstance(null)
    }
  }, [])
}
