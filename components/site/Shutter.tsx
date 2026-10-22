'use client'
import { useEffect, useRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ComponentProps, type ReactNode, type RefObject } from 'react'
import { CurtainLink } from './Curtain'

/**
 * galzura.com's button family (galzura-motion-demo/src/d6/Roll.tsx): two faces stand
 * one above the other in a one-face window; on hover, focus or touch the top face
 * rolls up and out and the copy rolls in. Mega Cars adds a red panel that drops like
 * a shutter (styles/motion.css .sh::before) and folds back up when the pointer leaves.
 */
export function Faces({ children }: { children: ReactNode }) {
  return (
    <span className="R">
      <span className="R-face">{children}</span>
      <span className="R-face" aria-hidden="true">
        {children}
      </span>
    </span>
  )
}

const MAGNET_OK = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

/** Lean an element toward a mouse over it, `reach` px at most (galzura useMagnet). */
export function useMagnet(ref: RefObject<HTMLElement | null>, reach = 8) {
  useEffect(() => {
    const el = ref.current
    if (!el || !reach || !window.matchMedia(MAGNET_OK).matches) return
    let x = 0
    let y = 0
    let frame = 0
    const clamp = (v: number) => Math.max(-reach, Math.min(reach, v))
    const put = () => {
      frame = 0
      el.style.setProperty('--mx', `${x.toFixed(2)}px`)
      el.style.setProperty('--my', `${y.toFixed(2)}px`)
    }
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(put)
    }
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const r = el.getBoundingClientRect()
      // measured from where the box stands without its lean, so the pull does not feed on itself
      x = clamp(((e.clientX - (r.left - x + r.width / 2)) / (r.width / 2)) * reach)
      y = clamp(((e.clientY - (r.top - y + r.height / 2)) / (r.height / 2)) * reach)
      queue()
    }
    const leave = () => {
      x = 0
      y = 0
      queue()
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [ref, reach])
}

export type Kind = 'solid' | 'line' | 'text'
const cls = (kind: Kind, className = '') => `sh sh--${kind} ${className}`

/** External, tel: or mailto: link in the button family. */
export function ShutterA({ kind = 'line', className, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { kind?: Kind }) {
  const ref = useRef<HTMLAnchorElement>(null)
  useMagnet(ref, kind === 'text' ? 0 : 8)
  return (
    <a ref={ref} className={cls(kind, className)} {...rest}>
      <Faces>{children}</Faces>
    </a>
  )
}

/** Internal link: opens the next page behind the red curtain. */
export function ShutterLink({
  kind = 'line',
  className,
  children,
  ...rest
}: Omit<ComponentProps<typeof CurtainLink>, 'ref'> & { kind?: Kind; children: ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null)
  useMagnet(ref, kind === 'text' ? 0 : 8)
  return (
    <CurtainLink ref={ref} className={cls(kind, className)} {...rest}>
      <Faces>{children}</Faces>
    </CurtainLink>
  )
}

export function ShutterButton({ kind = 'line', className, children, type = 'button', ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { kind?: Kind }) {
  const ref = useRef<HTMLButtonElement>(null)
  useMagnet(ref, kind === 'text' ? 0 : 8)
  return (
    <button ref={ref} type={type} className={cls(kind, className)} {...rest}>
      <Faces>{children}</Faces>
    </button>
  )
}
