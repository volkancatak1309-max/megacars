import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  value: number
  format?: (n: number) => string
  trigger?: 'load' | 'view'
  duration?: number
  delay?: number
  className?: string
}

// Animated count-up (tabular-nums so digit width never shifts). ARSENAL: power3.out.
// reduced-motion writes the final value immediately. Initial children = final value
// (correct without JS); the layout effect resets to 0 before paint, so no flash.
export default function Counter({
  value,
  format,
  trigger = 'view',
  duration = 1.4,
  delay = 0,
  className = '',
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const fmt = format ?? ((n: number) => Math.round(n).toLocaleString('de-DE'))

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      if (prefersReducedMotion()) {
        el.textContent = fmt(value)
        return
      }
      const obj = { val: 0 }
      el.textContent = fmt(0)
      const vars: gsap.TweenVars = {
        val: value,
        duration,
        delay,
        ease: 'power3.out',
        snap: { val: 1 },
        onUpdate: () => {
          el.textContent = fmt(obj.val)
        },
      }
      if (trigger === 'view') {
        vars.scrollTrigger = { trigger: el, start: 'top 90%', once: true }
      }
      gsap.to(obj, vars)
    },
    { scope: ref, dependencies: [value] },
  )

  return (
    <span ref={ref} className={('tabular-nums ' + className).trim()}>
      {fmt(value)}
    </span>
  )
}
