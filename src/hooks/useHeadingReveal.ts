import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { prefersReducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger, SplitText)

// Cinematic line-mask reveal for display headings.
//  • h1[data-split]  → page-title headings (About/Finance/CarDetail): play on load.
//  • h2.display      → section headings: play on scroll-in.
//  • opt out with [data-nosplit] (e.g. a heading already inside a .reveal block).
// CRITICAL: split runs AFTER document.fonts.ready — the .display class uses the
// variable Archivo at wdth 125%, and splitting before fonts settle mis-measures
// line breaks. Re-runs per route + language. reduced-motion: skipped (static).
export function useHeadingReveal(key: string) {
  useEffect(() => {
    if (prefersReducedMotion()) return

    let done = false
    let cancelled = false
    const splits: SplitText[] = []
    const triggers: ScrollTrigger[] = []

    const run = () => {
      if (done || cancelled) return
      done = true

      const split = (h: HTMLElement) => {
        const s = new SplitText(h, { type: 'lines', mask: 'lines', linesClass: 'split-line' })
        splits.push(s)
        return s
      }

      // Page-title headings — reveal on load.
      gsap.utils.toArray<HTMLElement>('h1[data-split]:not([data-nosplit])').forEach((h) => {
        if (!h.textContent?.trim()) return
        gsap.from(split(h).lines, {
          yPercent: 110,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.12,
          delay: 0.1,
        })
      })

      // Section headings — reveal on scroll-in.
      gsap.utils.toArray<HTMLElement>('h2.display:not([data-nosplit])').forEach((h) => {
        if (!h.textContent?.trim()) return
        const tw = gsap.from(split(h).lines, {
          yPercent: 110,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.12,
          scrollTrigger: { trigger: h, start: 'top 85%', once: true },
        })
        if (tw.scrollTrigger) triggers.push(tw.scrollTrigger)
      })

      ScrollTrigger.refresh()
    }

    document.fonts.ready.then(run).catch(() => {})
    // Fallback in case fonts.ready stalls — never leave headings hidden.
    const fallback = window.setTimeout(run, 1500)

    return () => {
      cancelled = true
      clearTimeout(fallback)
      triggers.forEach((t) => t.kill())
      splits.forEach((s) => s.revert())
    }
  }, [key])
}
