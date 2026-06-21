import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

// Cinematic logo-center loader — ARSENAL BÖLÜM 0.4. No cartoon, no bounce.
export default function Loader({ onDone }: { onDone?: () => void }) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = root.current
      if (!el) return
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) {
        gsap.set(el, { display: 'none' })
        onDone?.()
        return
      }
      const tl = gsap.timeline()
      tl.fromTo(
        '.loader-word',
        { autoAlpha: 0, letterSpacing: '0.4em', y: 5 },
        { autoAlpha: 1, letterSpacing: '0.06em', y: 0, duration: 0.55, ease: 'power2.out' },
      )
        .fromTo('.loader-line', { scaleX: 0 }, { scaleX: 1, duration: 0.35, ease: 'power2.inOut' }, '-=0.2')
        .to(el, {
          autoAlpha: 0,
          duration: 0.4,
          ease: 'power2.inOut',
          delay: 0.05,
          onStart: () => {
            // stop swallowing clicks the instant the fade-out begins
            el.style.pointerEvents = 'none'
            onDone?.()
          },
          onComplete: () => gsap.set(el, { display: 'none' }),
        })
    },
    { scope: root },
  )

  return (
    <div ref={root} className="fixed inset-0 z-[100] grid place-items-center bg-bg">
      <div className="flex flex-col items-center gap-4">
        <span className="loader-word display text-2xl text-text md:text-4xl">MEGACARS</span>
        <span className="loader-line h-px w-24 origin-left scale-x-0 bg-accent" />
      </div>
    </div>
  )
}
