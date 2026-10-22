/* Mega Cars 360° viewer: one canvas, no dependencies, no Three.js. Port of
 * docs/showroom-v2/spin-viewer.js with cleanup for client-side navigation.
 * Rule (Volkan, 22.10.2026): seen from above the car turns clockwise, one turn ≈ 40 s,
 * speed and direction come from one setting; drag follows the pointer, release coasts to a stop,
 * after 3 s without input it slowly turns again; reduced motion disables auto-turn and inertia.
 * Zoom: Ctrl/⌘ + wheel or pinch; plain wheel only in full screen.
 */

export interface SpinOptions {
  frames: string[]
  framesSmall?: string[]
  cameraDirection: 'cw' | 'ccw'
  autoRotate?: { degPerSec?: number; direction?: 'cw' | 'ccw'; resumeAfterMs?: number; rampMs?: number }
  degPerFrame?: number
  labels: { left: string; right: string; fullscreen: string; hint: string }
}

const ICON = {
  l: '<path d="M15 6l-6 6 6 6"/>',
  r: '<path d="M9 6l6 6-6 6"/>',
  f: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
}

export function mountSpin(root: HTMLElement, opt: SpinOptions) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const small = !!opt.framesSmall && Math.min(window.innerWidth, screen.width) < 900
  const srcs = small ? opt.framesSmall! : opt.frames
  const n = srcs.length
  const ar = { degPerSec: 9, direction: 'cw', resumeAfterMs: 3000, rampMs: 1200, ...opt.autoRotate }
  const degPerFrame = opt.degPerFrame ?? 360 / n
  // frame index step that makes the car turn clockwise (seen from above)
  const cwSign = opt.cameraDirection === 'ccw' ? 1 : -1
  const autoSign = (ar.direction === 'ccw' ? -1 : 1) * cwSign

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  canvas.setAttribute('aria-hidden', 'true')
  canvas.className = 'mcs-canvas'
  root.appendChild(canvas)

  const imgs: (HTMLImageElement | undefined)[] = new Array(n)
  const ready: boolean[] = new Array(n).fill(false)
  let pos = 0
  let vel = 0
  let zoom = 1
  let panX = 0
  let panY = 0
  let lastInput = -1e9
  let autoGain = reduce ? 0 : 1
  let dragging = false
  let firstDrawn = false
  const pointers = new Map<number, { x: number; y: number }>()
  let lastX = 0
  let lastT = 0
  let startX = 0
  let startY = 0
  let lock: 'h' | 'v' | 'pinch' | null = null
  let pinch0 = 0
  let zoom0 = 1
  let shown = -1
  let raf = 0
  let destroyed = false

  const nearestReady = () => {
    const c = Math.round(pos)
    for (let d = 0; d < n; d++) {
      const a = (((c + d) % n) + n) % n
      const b = (((c - d) % n) + n) % n
      if (ready[a]) return a
      if (ready[b]) return b
    }
    return -1
  }

  function load(i: number) {
    if (imgs[i]) return
    const im = new Image()
    im.decoding = 'async'
    im.onload = () => {
      ready[i] = true
      if (!firstDrawn || i === nearestReady()) draw()
    }
    im.src = srcs[i]
    imgs[i] = im
  }
  const loadTier = (step: number) => {
    for (let i = 0; i < n; i += step) load(i)
  }

  function resize() {
    const r = root.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.round(r.width * dpr)
    canvas.height = Math.round(r.height * dpr)
    draw()
  }

  function draw() {
    const i = nearestReady()
    if (i < 0) return
    if (i !== shown) {
      shown = i
      root.setAttribute('data-frame', String(i))
    }
    const im = imgs[i]!
    const cw = canvas.width
    const ch = canvas.height
    const s = Math.max(cw / im.naturalWidth, ch / im.naturalHeight) * zoom
    const w = im.naturalWidth * s
    const h = im.naturalHeight * s
    const maxX = Math.max(0, (w - cw) / 2)
    const maxY = Math.max(0, (h - ch) / 2)
    panX = Math.max(-maxX, Math.min(maxX, panX))
    panY = Math.max(-maxY, Math.min(maxY, panY))
    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(im, (cw - w) / 2 + panX, (ch - h) / 2 + panY, w, h)
    if (!firstDrawn) {
      firstDrawn = true
      root.classList.add('is-live')
      root.dispatchEvent(new CustomEvent('spin:first'))
    }
  }

  const setPos = (p: number) => {
    pos = ((p % n) + n) % n
  }

  let prev = performance.now()
  let visible = true
  function tick(t: number) {
    if (destroyed) return
    const dt = Math.min(0.05, (t - prev) / 1000)
    prev = t
    if (!dragging) {
      if (Math.abs(vel) > 0.05 && !reduce) {
        setPos(pos + vel * dt)
        vel *= Math.pow(0.9, dt * 60)
      } else vel = 0
      if (!reduce && visible && document.visibilityState === 'visible' && t - lastInput > ar.resumeAfterMs) {
        autoGain = Math.min(1, autoGain + (dt * 1000) / ar.rampMs)
        setPos(pos + autoSign * (ar.degPerSec / degPerFrame) * autoGain * dt)
      }
    }
    draw()
    raf = requestAnimationFrame(tick)
  }
  const input = () => {
    lastInput = performance.now()
    autoGain = 0
  }

  const hint = document.createElement('div')
  hint.className = 'mcs-hint'
  hint.textContent = opt.labels.hint
  const hideHint = () => hint.classList.add('is-gone')

  function setZoom(z: number) {
    zoom = Math.max(1, Math.min(2.5, z))
    if (zoom === 1) panX = panY = 0
    root.classList.toggle('is-zoomed', zoom > 1.01)
    input()
    draw()
  }

  // pointer: horizontal drag turns, vertical scroll stays with the page (touch-action: pan-y)
  canvas.style.touchAction = 'pan-y'
  const onDown = (e: PointerEvent) => {
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pointers.size === 2) {
      const p = [...pointers.values()]
      pinch0 = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y)
      zoom0 = zoom
      lock = 'pinch'
      return
    }
    startX = lastX = e.clientX
    startY = e.clientY
    lastT = performance.now()
    lock = null
    vel = 0
    input()
  }
  const onMove = (e: PointerEvent) => {
    if (!pointers.has(e.pointerId)) return
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (lock === 'pinch' && pointers.size === 2) {
      const p = [...pointers.values()]
      setZoom((zoom0 * Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y)) / pinch0)
      return
    }
    if (!lock) {
      const dx = Math.abs(e.clientX - startX)
      const dy = Math.abs(e.clientY - startY)
      if (dx < 8 && dy < 8) return
      lock = dx >= dy ? 'h' : 'v'
      if (lock === 'h') {
        dragging = true
        try {
          canvas.setPointerCapture(e.pointerId)
        } catch {
          /* pointer already released */
        }
        root.classList.add('is-dragging')
        hideHint()
      }
    }
    if (lock !== 'h') return
    const now = performance.now()
    const d = e.clientX - lastX
    if (zoom > 1.01) {
      panX += d * (window.devicePixelRatio || 1)
      panY += (e.movementY || 0) * (window.devicePixelRatio || 1)
    } else {
      // 0.5°/px with a mouse, 0.9°/px on touch; the car follows the pointer
      const perPx = (n / 360) * (matchMedia('(pointer: coarse)').matches ? 0.9 : 0.5)
      const df = -d * perPx * cwSign
      setPos(pos + df)
      const dtm = Math.max(1, now - lastT)
      const vmax = 180 / degPerFrame // coast at most 180°/s
      vel = Math.max(-vmax, Math.min(vmax, 0.8 * vel + 0.2 * (df / (dtm / 1000))))
    }
    lastX = e.clientX
    lastT = now
    input()
    draw()
  }
  const onEnd = (e: PointerEvent) => {
    pointers.delete(e.pointerId)
    if (pointers.size < 2 && lock === 'pinch') lock = null
    if (dragging) {
      dragging = false
      root.classList.remove('is-dragging')
      if (reduce) vel = 0
      input()
    }
  }
  const onWheel = (e: WheelEvent) => {
    if (!(e.ctrlKey || e.metaKey || document.fullscreenElement === root || root.classList.contains('is-full'))) return
    e.preventDefault()
    setZoom(zoom * Math.exp(-e.deltaY * 0.0015))
  }
  const onDbl = () => setZoom(zoom > 1.01 ? 1 : 2)

  const step = (k: number) => {
    vel = 0
    input()
    setPos(Math.round(pos) + k)
    draw()
  }
  const onKey = (e: KeyboardEvent) => {
    const big = e.shiftKey ? Math.round(45 / degPerFrame) : 1
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      step(big * cwSign)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      step(-big * cwSign)
    } else if (e.key === '+' || e.key === '=') setZoom(zoom * 1.25)
    else if (e.key === '-') setZoom(zoom / 1.25)
    else if (e.key === 'f' || e.key === 'F') toggleFull()
    else if (e.key === 'Escape' && root.classList.contains('is-full')) toggleFull()
  }

  function toggleFull() {
    if (document.fullscreenElement === root) {
      document.exitFullscreen()
      return
    }
    if (root.classList.contains('is-full')) {
      root.classList.remove('is-full')
      resize()
      return
    }
    if (root.requestFullscreen) root.requestFullscreen().catch(() => (root.classList.add('is-full'), resize()))
    else {
      root.classList.add('is-full')
      resize()
    }
  }
  const onFullscreen = () => setTimeout(resize, 50)

  canvas.addEventListener('pointerdown', onDown)
  canvas.addEventListener('pointermove', onMove)
  canvas.addEventListener('pointerup', onEnd)
  canvas.addEventListener('pointercancel', onEnd)
  canvas.addEventListener('wheel', onWheel, { passive: false })
  canvas.addEventListener('dblclick', onDbl)
  root.addEventListener('keydown', onKey)
  document.addEventListener('fullscreenchange', onFullscreen)

  const ui = document.createElement('div')
  ui.className = 'mcs-ui'
  const button = (a: keyof typeof ICON, label: string) =>
    `<button type="button" class="mcs-btn" data-a="${a}" aria-label="${label.replace(/"/g, '&quot;')}"><svg viewBox="0 0 24 24" aria-hidden="true">${ICON[a]}</svg></button>`
  ui.innerHTML = button('l', opt.labels.left) + button('r', opt.labels.right) + button('f', opt.labels.fullscreen)
  ui.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest('button')
    if (!b) return
    const big = Math.round(15 / degPerFrame) || 1
    if (b.dataset.a === 'l') step(big * cwSign)
    else if (b.dataset.a === 'r') step(-big * cwSign)
    else toggleFull()
  })
  root.appendChild(ui)
  root.appendChild(hint)

  // progressive loading: first frame now; 12 → 36 → 72 only after it arrived and the viewer is on screen
  load(0)
  let started = false
  let onScreen = false
  const startLoading = () => {
    onScreen = true
    if (started || !ready[0]) return
    started = true
    loadTier(Math.max(1, Math.round(n / 12)))
    setTimeout(() => !destroyed && loadTier(Math.max(1, Math.round(n / 36))), 400)
    const idle = window.requestIdleCallback ?? ((f: () => void) => setTimeout(f, 1200))
    idle(() => !destroyed && loadTier(1))
  }
  imgs[0]!.addEventListener('load', () => onScreen && startLoading())
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((x) => {
        visible = x.isIntersecting
        if (visible) startLoading()
      }),
    { rootMargin: '200px' },
  )
  io.observe(root)
  const ro = new ResizeObserver(resize)
  ro.observe(root)
  resize()
  raf = requestAnimationFrame(tick)

  return () => {
    destroyed = true
    cancelAnimationFrame(raf)
    io.disconnect()
    ro.disconnect()
    root.removeEventListener('keydown', onKey)
    document.removeEventListener('fullscreenchange', onFullscreen)
    canvas.remove()
    ui.remove()
    hint.remove()
    root.classList.remove('is-live', 'is-dragging', 'is-zoomed', 'is-full')
  }
}
