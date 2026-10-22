'use client'
import { useRef } from 'react'
import { useMotion, MOTION_OK } from '@/lib/gsap'

export type TechFact = { label: string; value: string; unit?: string; note?: string }

/**
 * The six key facts as a large-figure technical card. When it scrolls in, each cell's
 * rule is drawn and its figure rises out of a mask, one after another. Everything is
 * readable in the server HTML; motion only applies while the card is still below the fold.
 */
export function TechCard({ facts, label }: { facts: TechFact[]; label: string }) {
  const ref = useRef<HTMLDListElement>(null)
  useMotion(({ gsap }) => {
    gsap.matchMedia().add(MOTION_OK, () => {
      const el = ref.current!
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return
      const cells = [...el.querySelectorAll<HTMLElement>('[data-cell]')]
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 82%', once: true } })
      cells.forEach((cell, i) => {
        const at = i * 0.12
        tl.fromTo(cell, { '--draw': 0 }, { '--draw': 1, duration: 0.8, ease: 'power3.inOut' }, at)
          .from(cell.querySelector('.tc-value > span'), { yPercent: 110, duration: 1, ease: 'expo.out' }, at + 0.15)
          .from(cell.querySelectorAll('dt, .tc-note'), { autoAlpha: 0, y: 10, duration: 0.6 }, at + 0.25)
      })
    })
  }, ref)

  return (
    <dl ref={ref} className="tc" aria-label={label}>
      {facts.map((f) => (
        <div key={f.label} className="draw" data-cell>
          <dt>{f.label}</dt>
          <dd>
            <span className="tc-value tabular">
              <span>
                {f.value}
                {f.unit && <span className="tc-unit">{f.unit}</span>}
              </span>
            </span>
            {f.note && <span className="tc-note tabular">{f.note}</span>}
          </dd>
        </div>
      ))}
    </dl>
  )
}

/** Card frames inside it open from their lower edge as they arrive (Animmaster Scroll Animation 41). */
export function RevealFrames({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useMotion(({ gsap, ScrollTrigger }) => {
    gsap.matchMedia().add(MOTION_OK, () => {
      const frames = [...ref.current!.querySelectorAll<HTMLElement>('[data-reveal]')].filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.95)
      if (!frames.length) return
      gsap.set(frames, { clipPath: 'inset(100% 0% 0% 0%)' })
      ScrollTrigger.batch(frames, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, stagger: 0.12, ease: 'expo.out' })
          gsap.fromTo(
            batch.map((b) => b.querySelector('img')),
            { scale: 1.2 },
            { scale: 1, duration: 1.5, stagger: 0.12, ease: 'expo.out', clearProps: 'transform' },
          )
        },
      })
    })
  }, ref)
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
