'use client'
import type { PointerEvent, ReactNode } from 'react'

const MAX = 6 // px, DESIGN.md §7.1

/**
 * Magnetic hover for CTAs on fine pointers: the button drifts at most 6 px toward
 * the cursor. The drift itself is a CSS transition on --mx/--my (300 ms).
 */
export function Magnetic({ children }: { children: ReactNode }) {
  const move = (e: PointerEvent<HTMLSpanElement>) => {
    if (e.pointerType !== 'mouse') return
    const el = e.currentTarget.firstElementChild as HTMLElement | null
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
    el.style.setProperty('--mx', `${(Math.max(-1, Math.min(1, dx)) * MAX).toFixed(2)}px`)
    el.style.setProperty('--my', `${(Math.max(-1, Math.min(1, dy)) * MAX).toFixed(2)}px`)
  }
  const leave = (e: PointerEvent<HTMLSpanElement>) => {
    const el = e.currentTarget.firstElementChild as HTMLElement | null
    el?.style.setProperty('--mx', '0px')
    el?.style.setProperty('--my', '0px')
  }
  return (
    <span className="contents" onPointerMove={move} onPointerLeave={leave}>
      {children}
    </span>
  )
}
