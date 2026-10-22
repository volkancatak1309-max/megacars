'use client'
// Scroll-linked motion primitives. Every element is fully visible in the server HTML;
// motion is added only when GSAP has loaded and the visitor allows motion (DESIGN.md §6).
import { useRef, type ElementType, type ReactNode } from 'react'
import { useMotion, MOTION_OK, fontsReady } from '@/lib/gsap'

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'div'

/** Heading lines rise out of a mask, one after another (t-4 per line, 120 ms stagger). */
export function RevealText({
  as = 'h2',
  className,
  children,
  id,
  start = 'top 85%',
}: {
  as?: Tag
  className?: string
  children: ReactNode
  id?: string
  start?: string
}) {
  const ref = useRef<HTMLElement>(null)
  useMotion(({ gsap, SplitText }, ctx) => {
    const el = ref.current!
    gsap.matchMedia().add(MOTION_OK, () => {
      // a heading already on screen when motion arrives stays as it is
      if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return
      let split: InstanceType<typeof SplitText> | null = null
      fontsReady().then(() =>
        // runs inside the gsap.context so the split and its tween are reverted with it
        ctx.add(() => {
          split = SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            tag: 'span',
            // lines stay real text for screen readers; no aria-label on <p>/<h*>
            aria: 'none',
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, { yPercent: 105, duration: 1, stagger: 0.12, scrollTrigger: { trigger: el, start, once: true } }),
          })
        }),
      )
      return () => split?.revert()
    })
  }, ref)
  const Comp = as as ElementType
  return (
    <Comp ref={ref} className={className} id={id}>
      {children}
    </Comp>
  )
}

/** Heading above the fold: rises out of a mask in CSS from the first paint (no JS). */
export function RiseHeading({ as = 'h1', className, children }: { as?: Tag; className?: string; children: ReactNode }) {
  const Comp = as as ElementType
  return (
    <Comp className={className}>
      <span className="rise-mask">
        <span>{children}</span>
      </span>
    </Comp>
  )
}

/** A photo opens from a narrow window to its full frame while scrolling (catalog #4). */
export function WindowReveal({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useMotion(({ gsap }) => {
    gsap.matchMedia().add(MOTION_OK, () => {
      const el = ref.current!
      gsap.fromTo(
        el,
        { clipPath: 'inset(18% 26% 18% 26%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: el, start: 'top 90%', end: 'center 55%', scrub: 0.8 } },
      )
      const img = el.querySelector('img')
      if (img) {
        gsap.fromTo(img, { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 90%', end: 'bottom 30%', scrub: 0.8 } })
      }
    })
  }, ref)
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

/**
 * A <dl> row (or any block) whose top rule is drawn left to right when it enters.
 * The rule is a ::before line, so dt/dd stay direct children (valid list markup).
 */
export function DrawGroup({ className = '', children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useMotion(({ gsap }) => {
    gsap.matchMedia().add(MOTION_OK, () => {
      gsap.fromTo(ref.current, { '--draw': 0 }, { '--draw': 1, duration: 0.7, scrollTrigger: { trigger: ref.current, start: 'top 92%', once: true } })
    })
  }, ref)
  return (
    <div ref={ref} className={`draw ${className}`}>
      {children}
    </div>
  )
}

/** Divider drawn from left to right when it enters (t-3). */
export function DrawLine({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useMotion(({ gsap }) => {
    gsap.matchMedia().add(MOTION_OK, () => {
      gsap.from(ref.current, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.7,
        scrollTrigger: { trigger: ref.current, start: 'top 92%', once: true },
      })
    })
  }, ref)
  return <span ref={ref} aria-hidden="true" className={`block h-px w-full bg-line ${className}`} />
}

/** Children marked [data-stagger] settle 24 px upward in sequence (t-3, 90 ms). */
export function Stagger({
  as = 'div',
  className,
  children,
  start = 'top 88%',
}: {
  as?: ElementType
  className?: string
  children: ReactNode
  start?: string
}) {
  const ref = useRef<HTMLElement>(null)
  useMotion(({ gsap, ScrollTrigger }) => {
    gsap.matchMedia().add(MOTION_OK, () => {
      // items already on screen when motion arrives stay as they are
      const items = [...ref.current!.querySelectorAll<HTMLElement>('[data-stagger]')].filter(
        (el) => el.getBoundingClientRect().top > window.innerHeight,
      )
      if (!items.length) return
      gsap.set(items, { autoAlpha: 0, y: 24 })
      ScrollTrigger.batch(items, {
        start,
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.09, overwrite: true }),
      })
    })
  }, ref)
  const Comp = as
  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  )
}

/** Counts up from zero once when visible (1200 ms). Only for numbers from real data. */
export function Ticker({ value, locale, className }: { value: number; locale: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const fmt = new Intl.NumberFormat(locale === 'tr' ? 'tr-TR' : 'de-DE')
  useMotion(
    ({ gsap }) => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const el = ref.current!
        if (el.getBoundingClientRect().top < window.innerHeight) return
        const state = { n: 0 }
        el.textContent = fmt.format(0)
        gsap.to(state, {
          n: value,
          duration: 1.2,
          snap: { n: 1 },
          onUpdate: () => {
            el.textContent = fmt.format(state.n)
          },
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
        return () => {
          el.textContent = fmt.format(value)
        }
      })
    },
    ref,
    [value],
  )
  return (
    <span ref={ref} className={`tabular ${className ?? ''}`}>
      {fmt.format(value)}
    </span>
  )
}
