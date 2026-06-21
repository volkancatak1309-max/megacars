import type Lenis from 'lenis'

// Module-level Lenis singleton so any component can request a smooth scroll
// without prop-drilling the instance.
let instance: Lenis | null = null

export const setLenisInstance = (l: Lenis | null) => {
  instance = l
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (instance) instance.scrollTo(el, { duration: 1.1 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export function scrollTop(immediate = false) {
  if (instance) instance.scrollTo(0, { immediate })
  else window.scrollTo(0, 0)
}

export function scrollToY(y: number, immediate = true) {
  if (instance) {
    // Freshly-mounted home content: force Lenis to recompute its limit first,
    // otherwise it clamps the target to the stale (detail-page) max scroll.
    instance.resize()
    instance.scrollTo(y, { immediate, force: true })
  } else {
    window.scrollTo(0, y)
  }
}
