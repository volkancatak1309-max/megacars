'use client'
// Scroll reveals for the prototypes. Content is visible in the server HTML; GSAP
// (lazy, after the first paint) only adds motion to what is still below the fold.
import { useRef, type ElementType, type ReactNode } from 'react'
import { useMotion, MOTION_OK, fontsReady } from '@/lib/gsap'

const belowFold = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.9

/**
 * A coloured block sweeps across each line, the line appears under it and the block
 * leaves to the right (Animmaster Text Animations 15, built after landonorris.com).
 */
export function BlockReveal({
  as = 'p',
  className,
  children,
  color = 'var(--red)',
  id,
}: {
  as?: ElementType
  className?: string
  children: ReactNode
  color?: string
  id?: string
}) {
  const ref = useRef<HTMLElement>(null)
  useMotion(({ gsap, SplitText }, ctx) => {
    const el = ref.current!
    gsap.matchMedia().add(MOTION_OK, () => {
      if (!belowFold(el)) return
      let split: InstanceType<typeof SplitText> | null = null
      const wrappers: HTMLElement[] = []
      fontsReady().then(() =>
        ctx.add(() => {
          split = SplitText.create(el, { type: 'lines', linesClass: 'block-line', aria: 'none', tag: 'span' })
          const lines = split.lines as HTMLElement[]
          const blocks = lines.map((line) => {
            const wrap = document.createElement('span')
            wrap.className = 'block-line-wrapper'
            line.parentNode!.insertBefore(wrap, line)
            wrap.appendChild(line)
            const block = document.createElement('span')
            block.className = 'block-revealer'
            block.style.background = color
            wrap.appendChild(block)
            wrappers.push(wrap)
            return block
          })
          gsap.set(lines, { opacity: 0 })
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } })
          blocks.forEach((block, i) => {
            const at = i * 0.15
            tl.to(block, { scaleX: 1, duration: 0.75, ease: 'power4.inOut' }, at)
              .set(lines[i], { opacity: 1 }, at + 0.75)
              .set(block, { transformOrigin: 'right center' }, at + 0.75)
              .to(block, { scaleX: 0, duration: 0.75, ease: 'power4.inOut' }, at + 0.75)
          })
        }),
      )
      return () => {
        wrappers.forEach((w) => {
          if (w.parentNode && w.firstChild) {
            w.parentNode.insertBefore(w.firstChild, w)
            w.remove()
          }
        })
        split?.revert()
      }
    })
  }, ref)
  const Comp = as
  return (
    <Comp ref={ref} className={className} id={id}>
      {children}
    </Comp>
  )
}

/** The frame opens from its lower edge while the photo settles (Animmaster Scroll Animation 41). */
export function ClipReveal({ className, children, from = 'bottom' }: { className?: string; children: ReactNode; from?: 'bottom' | 'left' }) {
  const ref = useRef<HTMLDivElement>(null)
  useMotion(({ gsap }) => {
    const el = ref.current!
    gsap.matchMedia().add(MOTION_OK, () => {
      if (!belowFold(el)) return
      const start = from === 'bottom' ? 'inset(100% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)'
      gsap.fromTo(el, { clipPath: start }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
      const img = el.querySelector('img')
      if (img) gsap.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
    })
  }, ref)
  return (
    <div ref={ref} className={`clip-reveal ${className ?? ''}`}>
      {children}
    </div>
  )
}

/** Masked heading lines rise when they reach the viewport (Animmaster Text Animations 17). */
export function LinesUp({ as = 'h2', className, children, id, lang }: { as?: ElementType; className?: string; children: ReactNode; id?: string; lang?: string }) {
  const ref = useRef<HTMLElement>(null)
  useMotion(({ gsap, SplitText }, ctx) => {
    const el = ref.current!
    gsap.matchMedia().add(MOTION_OK, () => {
      if (!belowFold(el)) return
      let split: InstanceType<typeof SplitText> | null = null
      fontsReady().then(() =>
        ctx.add(() => {
          split = SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            tag: 'span',
            aria: 'none',
            autoSplit: true,
            onSplit: (self) => gsap.from(self.lines, { yPercent: 110, duration: 1.1, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } }),
          })
        }),
      )
      return () => split?.revert()
    })
  }, ref)
  const Comp = as
  return (
    <Comp ref={ref} className={className} id={id} lang={lang}>
      {children}
    </Comp>
  )
}
