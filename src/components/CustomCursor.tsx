import { useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion, canHover } from '../lib/motion'

// Contextual custom cursor (FAZ C, item 12). A blended dot + ring that follows
// the pointer and changes by context: grows on links/buttons, and over a car
// card shows a "Ansehen"/"Görüntüle" hint (read from [data-cursor-label]).
//   • Desktop only — canHover() gate; never rendered on touch.
//   • reduced-motion: not rendered (native cursor stays).
//   • mix-blend-difference on dot+ring; the hint pill uses theme tokens so it
//     stays legible over any photo. All easing is power-curve (no bounce).
type Ctx = 'default' | 'grow' | 'view' | 'text'

const ringScale = (c: Ctx) => (c === 'view' ? 2.7 : c === 'grow' ? 1.9 : 1)

export default function CustomCursor() {
  const enabled = useMemo(() => canHover() && !prefersReducedMotion(), [])
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    const ring = ringRef.current
    const labelEl = labelRef.current
    if (!dot || !ring || !labelEl) return

    document.documentElement.classList.add('has-cursor')
    gsap.set([dot, ring, labelEl], { xPercent: -50, yPercent: -50, autoAlpha: 0 })

    // Smooth, power-eased follow (dot snappy, ring trails, label soft).
    const xDot = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' })
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' })
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.38, ease: 'power3' })
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.38, ease: 'power3' })
    const xLabel = gsap.quickTo(labelEl, 'x', { duration: 0.32, ease: 'power3' })
    const yLabel = gsap.quickTo(labelEl, 'y', { duration: 0.32, ease: 'power3' })

    let visible = false
    let ctx: Ctx = 'default'
    let curLabel = ''
    let pressed = false

    const showCore = () =>
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.25, ease: 'power3.out' })

    const apply = (next: Ctx, text = '') => {
      if (next === ctx && text === curLabel) return
      ctx = next
      curLabel = next === 'view' ? text : ''
      const hidden = next === 'text'
      const press = pressed ? 0.8 : 1
      gsap.to(ring, {
        scale: ringScale(next) * press,
        autoAlpha: hidden ? 0 : 1,
        duration: 0.35,
        ease: 'power3.out',
      })
      gsap.to(dot, {
        scale: next === 'default' ? 1 : 0.4,
        autoAlpha: hidden ? 0 : 1,
        duration: 0.35,
        ease: 'power3.out',
      })
      if (next === 'view') {
        setLabel(text)
        gsap.to(labelEl, { autoAlpha: 1, duration: 0.3, ease: 'power3.out' })
      } else {
        gsap.to(labelEl, {
          autoAlpha: 0,
          duration: 0.25,
          ease: 'power3.out',
          onComplete: () => setLabel(''),
        })
      }
    }

    const onMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true
        if (ctx !== 'text') showCore()
      }
      xDot(e.clientX)
      yDot(e.clientY)
      xRing(e.clientX)
      yRing(e.clientY)
      xLabel(e.clientX)
      yLabel(e.clientY + 30)
    }
    const onLeaveWindow = () => {
      visible = false
      gsap.to([dot, ring, labelEl], { autoAlpha: 0, duration: 0.2, ease: 'power3.out' })
    }
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target || typeof target.closest !== 'function') return apply('default')
      const labeled = target.closest<HTMLElement>('[data-cursor-label]')
      if (labeled) return apply('view', labeled.dataset.cursorLabel ?? '')
      if (target.closest('input, textarea, select, [contenteditable="true"]')) return apply('text')
      if (target.closest('a, button, [role="button"], label, summary, .cursor-grow'))
        return apply('grow')
      apply('default')
    }
    // press feedback — only touches the ring scale, never the context/label
    const onDown = () => {
      pressed = true
      if (ctx !== 'text') gsap.to(ring, { scale: ringScale(ctx) * 0.8, duration: 0.15, ease: 'power3.out' })
    }
    const onUp = () => {
      pressed = false
      if (ctx !== 'text') gsap.to(ring, { scale: ringScale(ctx), duration: 0.25, ease: 'power3.out' })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseleave', onLeaveWindow)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeaveWindow)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      gsap.killTweensOf([dot, ring, labelEl])
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-9 w-9 rounded-full border border-white mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={labelRef}
        aria-hidden="true"
        className="spec pointer-events-none fixed left-0 top-0 z-[100] whitespace-nowrap rounded-full bg-text px-3 py-1.5 text-[0.58rem] text-bg"
        style={{ willChange: 'transform' }}
      >
        {label}
      </div>
    </>
  )
}
