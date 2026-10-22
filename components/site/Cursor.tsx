'use client'
import { useEffect, useRef } from 'react'

/** "Ansehen" cursor over [data-cursor] elements on fine pointers; never an image preview. */
export function ViewCursor({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return
    let x = -200
    let y = -200
    let tx = x
    let ty = y
    let on = false
    let raf = 0
    const loop = () => {
      x += (tx - x) * 0.2
      y += (ty - y) * 0.2
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(loop) : 0
    }
    const move = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
      const hit = !!(e.target as Element | null)?.closest?.('[data-cursor]')
      if (hit !== on) {
        on = hit
        el.toggleAttribute('data-on', on)
      }
      if (!raf) raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [])
  return (
    <div ref={ref} className="vcursor" aria-hidden="true">
      <div className="vcursor-dot">{label}</div>
    </div>
  )
}

export function Grain() {
  return <div className="grain" aria-hidden="true" />
}
