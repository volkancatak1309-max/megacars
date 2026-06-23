import type { RefObject } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

// Shared scroll-reveal: any `.reveal` element inside the scope rises + clip-wipes
// in, staggered per in-view batch (Process/Reviews/Inventory/About/Finance).
// Initial hidden state is applied in JS only (so no-JS / reduced-motion keeps the
// content visible). useGSAP runs in a layout effect, so the hide happens before
// paint — no flash. (DESIGN.md/ARSENAL: power-curve ease, no bounce.)
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current
      if (!root || prefersReducedMotion()) return
      const items = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('.reveal'))
      if (!items.length) return

      gsap.set(items, { autoAlpha: 0, y: 48, clipPath: 'inset(0 0 100% 0)' })
      ScrollTrigger.batch(items, {
        start: 'top 85%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            clipPath: 'inset(0 0 0% 0)',
            duration: 1,
            ease: 'power3.out',
            stagger: 0.09,
            overwrite: true,
          }),
      })
    },
    { scope },
  )
}
