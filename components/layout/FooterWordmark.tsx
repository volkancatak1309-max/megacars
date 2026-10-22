'use client'
import { useRef } from 'react'
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap'

/** The MEGA CARS wordmark rises slowly as the page reaches its end (DESIGN.md §8.1 #8). */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ref.current!.firstElementChild,
          { yPercent: 55 },
          { yPercent: 0, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom bottom', scrub: 0.8 } },
        )
      })
    },
    { scope: ref },
  )
  return (
    <div ref={ref} aria-hidden="true" className="page-x mt-16 overflow-clip lg:mt-24">
      {/* decorative wordmark drawn as SVG so it scales to the full width */}
      <svg viewBox="0 0 1000 132" className="block w-full select-none" focusable="false">
        <text
          x="0"
          y="124"
          textLength="1000"
          lengthAdjust="spacingAndGlyphs"
          fill="var(--color-panel-hover)"
          style={{ font: '300 166px var(--font-sans)', letterSpacing: '-0.02em' }}
        >
          MEGA CARS
        </text>
      </svg>
    </div>
  )
}
