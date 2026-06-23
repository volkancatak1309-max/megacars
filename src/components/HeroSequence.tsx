import { useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { prefersReducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger, SplitText)

// ── Scroll-scrub hero sequence (FAZ B — "WOW moment", item 9) ────────────────
// Apple AirPods-style frame-scrub: a pinned <canvas> plays a pre-rendered WebP
// frame sequence keyed to scroll position. We draw bitmaps to a canvas (NOT
// <video currentTime>) so scrubbing is jank-free in every browser.
//   • Assets: public/hero/seq/seq_###.webp (1024×576, q48, ~3.8 MB total).
//   • Mobile: load every 2nd frame → ~half the bytes + half the decode memory.
//   • Motion is power-curve only (ARSENAL: no bounce/spring); the frame tween is
//     linear ('none') so frames track scroll 1:1.
//   • reduced-motion: no pin/scrub — render the static LAST frame, captions shown.
const FRAME_COUNT = 120
const FRAME_W = 1024
const FRAME_H = 576
const SCROLL_VH = 3.2 // viewport-heights of scroll the section is pinned for
const framePath = (i: number) => `/hero/seq/seq_${String(i).padStart(3, '0')}.webp`

export default function HeroSequence() {
  const { t, i18n } = useTranslation()
  const root = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  // draw(k) is wired up in the preload effect and called from the scrub timeline.
  const drawFrameRef = useRef<(k: number) => void>(() => {})

  const reduced = useMemo(() => prefersReducedMotion(), [])

  // Which source frames to actually fetch: all on desktop, every 2nd on mobile
  // (lighter download + decode). The last frame is always kept.
  const playable = useMemo<number[]>(() => {
    const isMobile =
      typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
    const step = isMobile ? 2 : 1
    const arr: number[] = []
    for (let i = 0; i < FRAME_COUNT; i += step) arr.push(i)
    if (arr[arr.length - 1] !== FRAME_COUNT - 1) arr.push(FRAME_COUNT - 1)
    return arr
  }, [])
  const N = playable.length

  const captions = [
    { k: t('heroSeq.k1'), l: t('heroSeq.l1') },
    { k: t('heroSeq.k2'), l: t('heroSeq.l2') },
    { k: t('heroSeq.k3'), l: t('heroSeq.l3') },
  ]
  // reduced-motion: only the closing line, shown statically over the last frame.
  const shownCaptions = reduced ? captions.slice(2) : captions

  // ── Preload + canvas rendering (independent of language) ────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    const stage = stageRef.current
    if (!canvas || !stage) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const images = playable.map((srcIdx) => {
      const img = new Image()
      img.decoding = 'async'
      img.src = framePath(srcIdx)
      return img
    })
    imagesRef.current = images

    let last = -1
    const sizeCanvas = () => {
      const w = stage.clientWidth
      const h = stage.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.round(w * dpr))
      canvas.height = Math.max(1, Math.round(h * dpr))
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0) // draw in CSS px
    }
    const drawCover = (img: HTMLImageElement) => {
      const cw = stage.clientWidth
      const ch = stage.clientHeight
      const iw = img.naturalWidth
      const ih = img.naturalHeight
      if (!iw || !ih) return
      const ir = iw / ih
      const cr = cw / ch
      let dw: number
      let dh: number
      if (cr > ir) {
        dw = cw
        dh = cw / ir
      } else {
        dh = ch
        dw = ch * ir
      }
      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
    }
    const draw = (k: number) => {
      const idx = Math.max(0, Math.min(N - 1, k))
      const img = images[idx]
      if (img && img.complete && img.naturalWidth) {
        drawCover(img)
        last = idx
      }
    }
    drawFrameRef.current = draw

    sizeCanvas()

    // Poster: draw the initial frame (first, or last under reduced-motion) ASAP.
    const initialIdx = reduced ? N - 1 : 0
    const initImg = images[initialIdx]
    const drawInit = () => draw(initialIdx)
    if (initImg.complete && initImg.naturalWidth) drawInit()
    else initImg.addEventListener('load', drawInit, { once: true })

    // If a frame the scrub is currently parked on loads late, repaint it.
    images.forEach((img, idx) => {
      img.addEventListener(
        'load',
        () => {
          if (idx === last) drawCover(img)
        },
        { once: true },
      )
    })

    let rafId = 0
    const onResize = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        sizeCanvas()
        draw(last < 0 ? initialIdx : last)
      })
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafId)
      drawFrameRef.current = () => {}
    }
  }, [N, playable, reduced])

  // ── Pin + scrub timeline + char-by-char captions (re-splits on language) ────
  useGSAP(
    () => {
      if (reduced) return
      const el = root.current
      if (!el) return

      const state = { f: 0 }
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: () => `+=${window.innerHeight * SCROLL_VH}`,
          scrub: 0.6,
          pin: stageRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Linear frame scrub across the whole (normalized 0→1) timeline.
      tl.to(
        state,
        {
          f: N - 1,
          ease: 'none',
          duration: 1,
          onUpdate: () => drawFrameRef.current(Math.round(state.f)),
        },
        0,
      )

      // Narrative beats — each caption rises in char-by-char, then clears for the
      // next (the final one stays). Positions are fractions of the timeline.
      const bands: { in: number; out: number | null }[] = [
        { in: 0.05, out: 0.3 },
        { in: 0.4, out: 0.64 },
        { in: 0.74, out: null },
      ]
      const caps = gsap.utils.toArray<HTMLElement>(el.querySelectorAll('.seq-cap'))
      caps.forEach((cap, i) => {
        const band = bands[i] ?? bands[bands.length - 1]
        const headline = cap.querySelector<HTMLElement>('.seq-headline')
        const eyebrow = cap.querySelector<HTMLElement>('.seq-eyebrow')
        if (!headline) return

        const split = new SplitText(headline, {
          type: 'chars',
          mask: 'chars',
          charsClass: 'seq-char',
        })
        gsap.set(cap, { autoAlpha: 1 })
        gsap.set(split.chars, { yPercent: 115, autoAlpha: 0 })
        if (eyebrow) gsap.set(eyebrow, { autoAlpha: 0, y: 8 })

        if (eyebrow)
          tl.to(eyebrow, { autoAlpha: 1, y: 0, ease: 'power3.out', duration: 0.1 }, band.in)
        tl.to(
          split.chars,
          { yPercent: 0, autoAlpha: 1, ease: 'power3.out', stagger: 0.012, duration: 0.16 },
          band.in,
        )
        if (band.out != null)
          tl.to(cap, { autoAlpha: 0, ease: 'power2.out', duration: 0.05 }, band.out)
      })
    },
    { scope: root, dependencies: [i18n.resolvedLanguage] },
  )

  return (
    <section id="sequence" ref={root} className="relative bg-bg" aria-label="MEGACARS">
      <div ref={stageRef} className="relative h-[100svh] w-full overflow-hidden bg-bg">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 block h-full w-full"
          style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}
        />

        {/* legibility scrim for the white caption text (frames brighten toward the end) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-2/3 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

        {shownCaptions.map((c, i) => (
          <div
            key={i}
            className="seq-cap absolute bottom-14 left-6 right-6 z-10 mx-auto max-w-[1100px] md:bottom-20 md:left-10 md:right-10"
          >
            <p className="seq-eyebrow eyebrow mb-3 text-white/70">{c.k}</p>
            <h2
              className="seq-headline display text-white"
              data-nosplit
              style={{ fontSize: 'clamp(2rem, 6vw, 5.5rem)', textWrap: 'balance' }}
            >
              {c.l}
            </h2>
          </div>
        ))}
      </div>
    </section>
  )
}
