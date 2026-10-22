'use client'
// Motion is an enhancement: GSAP loads only after the first paint (load + two frames),
// so it never competes with the LCP element. Until then every element is fully visible.
import { useEffect, type DependencyList, type RefObject } from 'react'

export type Motion = typeof import('./motion-impl')

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
export const REDUCED = '(prefers-reduced-motion: reduce)'
export const DESKTOP_FINE = '(min-width: 1024px) and (pointer: fine)'

let pending: Promise<Motion> | null = null

const afterFirstPaint = () =>
  new Promise<void>((resolve) => {
    const frames = () => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
    if (document.readyState === 'complete') frames()
    else window.addEventListener('load', frames, { once: true })
  })

export function loadMotion(): Promise<Motion> {
  pending ??= afterFirstPaint().then(() => import('./motion-impl'))
  return pending
}

/** Waits for web fonts so SplitText measures final line breaks. */
export const fontsReady = (): Promise<unknown> => (document.fonts ? document.fonts.ready : Promise.resolve())

type Context = ReturnType<Motion['gsap']['context']>

/**
 * Runs `setup` inside a gsap.context once GSAP is loaded; everything it creates
 * (tweens, ScrollTriggers, matchMedia) is reverted on unmount or when deps change.
 */
export function useMotion(
  setup: (m: Motion, ctx: Context) => void | (() => void),
  scope: RefObject<Element | null>,
  deps: DependencyList = [],
) {
  useEffect(() => {
    let ctx: Context | undefined
    let cancelled = false
    loadMotion().then((m) => {
      if (cancelled || !scope.current) return
      ctx = m.gsap.context((self) => setup(m, self), scope.current)
    })
    return () => {
      cancelled = true
      ctx?.revert()
    }
    // the caller controls re-runs through deps
  }, deps)
}
