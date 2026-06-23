import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { canHover, prefersReducedMotion } from '../lib/motion'

// Magnetic CTA — element eases toward the pointer and back to rest.
// ARSENAL: power3.out on the return (NO elastic / back / bounce). Pointer-only.
export function useMagnetic<T extends HTMLElement = HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null)
  useGSAP(
    () => {
      const el = ref.current
      if (!el || prefersReducedMotion() || !canHover()) return

      const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' })

      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect()
        xTo((e.clientX - (r.left + r.width / 2)) * strength)
        yTo((e.clientY - (r.top + r.height / 2)) * strength)
      }
      const onLeave = () => {
        xTo(0)
        yTo(0)
      }

      el.addEventListener('pointermove', onMove)
      el.addEventListener('pointerleave', onLeave)
      return () => {
        el.removeEventListener('pointermove', onMove)
        el.removeEventListener('pointerleave', onLeave)
      }
    },
    { scope: ref },
  )
  return ref
}
