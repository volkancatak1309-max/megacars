'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import type Lenis from 'lenis'
import { loadMotion } from '@/lib/gsap'

let lenis: Lenis | null = null
export const getLenis = () => lenis

/**
 * Locks page scroll behind sheets and fullscreen views (DESIGN.md §6 "Kaydırma").
 * Applied after the next paint: overflow on <html> relayouts the whole page, and the
 * dialog that asked for the lock should be on screen first (INP).
 */
export function lockScroll(on: boolean) {
  requestAnimationFrame(() =>
    setTimeout(() => {
      document.documentElement.classList.toggle('lock', on)
      if (on) lenis?.stop()
      else lenis?.start()
    }),
  )
}

export function scrollToTop() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  if (lenis) lenis.scrollTo(0, { duration: 1.2 })
  else window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
}

/**
 * Lenis smooth scrolling only for fine pointers with motion allowed; touch devices keep
 * native scrolling. Lenis is driven by the GSAP ticker so ScrollTrigger stays in sync.
 */
export function SmoothScroll() {
  const pathname = usePathname()

  useEffect(() => {
    const mq = matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)')
    let tick: ((time: number) => void) | null = null
    let disposed = false
    // loaded after the first paint together with GSAP (lib/gsap.ts)
    const start = async () => {
      if (lenis || !mq.matches) return
      const [{ gsap, ScrollTrigger }, { default: LenisClass }] = await Promise.all([loadMotion(), import('lenis')])
      if (disposed || lenis || !mq.matches) return
      lenis = new LenisClass({ lerp: 0.1, smoothWheel: true, syncTouch: false, anchors: true })
      lenis.on('scroll', ScrollTrigger.update)
      tick = (time) => lenis?.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
    }
    const stop = () => {
      const t = tick
      if (t) loadMotion().then(({ gsap }) => gsap.ticker.remove(t))
      tick = null
      lenis?.destroy()
      lenis = null
    }
    const onChange = () => (mq.matches ? start() : stop())
    start()
    mq.addEventListener('change', onChange)
    return () => {
      disposed = true
      mq.removeEventListener('change', onChange)
      stop()
    }
  }, [])

  useEffect(() => {
    lenis?.resize()
    let id = 0
    loadMotion().then(({ ScrollTrigger }) => {
      id = requestAnimationFrame(() => ScrollTrigger.refresh())
    })
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return null
}
