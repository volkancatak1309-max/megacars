'use client'
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type WheelEvent } from 'react'
import { useTranslations } from 'next-intl'
import type { Photo } from '@/lib/types'
import { SITE } from '@/lib/site'
import { CarImage } from '@/components/ui/CarImage'
import { Icon } from '@/components/ui/Icon'
import { lockScroll } from '@/components/motion/SmoothScroll'
import { Faces, ShutterA, ShutterButton } from '@/components/site/Shutter'

type Dir = 'next' | 'prev'
type Layer = { i: number; dir: Dir | null; k: number }

const STAGE_SIZES = '(min-width: 1024px) 62vw, 100vw'
const srcSetOf = (p: Photo) => [`${p.src240} 240w`, p.src800 && `${p.src800} 800w`, `${p.src} ${p.width}w`].filter(Boolean).join(', ')

/** Loads and decodes a photo the way the stage will request it (same srcset and sizes). */
function decodePhoto(p: Photo, sizes: string, timeout = 700): Promise<void> {
  const img = new Image()
  img.sizes = sizes
  img.srcset = srcSetOf(p)
  img.src = p.src
  return Promise.race([img.decode().catch(() => {}), new Promise<void>((r) => setTimeout(r, timeout))])
}

/** Photo layers: the newest one opens behind a red wipe, the older ones leave when it is in. */
function useLayers(total: number) {
  const [layers, setLayers] = useState<Layer[]>([{ i: 0, dir: null, k: 0 }])
  const index = layers[layers.length - 1].i
  const go = useCallback(
    (to: number, dir?: Dir) => {
      setLayers((ls) => {
        const cur = ls[ls.length - 1]
        const target = (to + total) % total
        if (target === cur.i) return ls
        const d: Dir = dir ?? (target > cur.i ? 'next' : 'prev')
        return [...ls.slice(-1), { i: target, dir: d, k: cur.k + 1 }]
      })
    },
    [total],
  )
  const settle = useCallback(() => setLayers((ls) => (ls.length > 1 ? ls.slice(-1) : ls)), [])
  const jump = useCallback((to: number) => setLayers((ls) => [{ i: to, dir: null, k: ls[ls.length - 1].k + 1 }]), [])
  return { layers, index, go, settle, jump }
}

/** Horizontal swipe (pointer) → next / previous; vertical movement stays page scroll. */
function useSwipe(onSwipe: (dir: Dir) => void, onTap?: () => void) {
  const start = useRef<{ x: number; y: number } | null>(null)
  return {
    onPointerDown: (e: PointerEvent) => {
      start.current = { x: e.clientX, y: e.clientY }
    },
    onPointerUp: (e: PointerEvent) => {
      const s = start.current
      start.current = null
      // the arrows and buttons inside the frame handle their own clicks
      if (!s || (e.target as Element).closest('button, a')) return
      const dx = e.clientX - s.x
      const dy = e.clientY - s.y
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.2) onSwipe(dx < 0 ? 'next' : 'prev')
      else if (Math.abs(dx) < 6 && Math.abs(dy) < 6) onTap?.()
    },
    onPointerCancel: () => {
      start.current = null
    },
  }
}

/**
 * The vehicle's original listing photos on the stage. Arrival: the first photo grows
 * from a window into the frame (CSS, from the first paint — it is the LCP element and
 * never starts invisible). Between photos a red wipe crosses the frame and the next
 * photo opens behind it (Animmaster Page Transitions 5 counter-slide). Arrows, ← →,
 * swipe, thumbnails, and a full-screen view with keyboard, swipe and wheel.
 */
export function Stage({ photos, alts, name, whatsapp }: { photos: Photo[]; alts: string[]; name: string; whatsapp: string }) {
  const t = useTranslations('gallery')
  const tc = useTranslations('common')
  const total = photos.length
  const stage = useLayers(total)
  const full = useLayers(total)
  const dialog = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)
  const wheelLock = useRef(0)

  // warm the neighbours so the wipe never reveals a blurred placeholder
  useEffect(() => {
    decodePhoto(photos[(stage.index + 1) % total], STAGE_SIZES)
    decodePhoto(photos[(stage.index - 1 + total) % total], STAGE_SIZES)
  }, [stage.index, photos, total])

  const show = (l: ReturnType<typeof useLayers>, sizes: string) => (to: number, dir?: Dir) => {
    const target = (to + total) % total
    decodePhoto(photos[target], sizes).then(() => l.go(target, dir))
  }
  const showStage = show(stage, STAGE_SIZES)
  const showFull = show(full, '100vw')

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
    lockScroll(open)
  }, [open])

  const openFull = () => {
    full.jump(stage.index)
    setOpen(true)
  }

  const keys = (go: (to: number, dir?: Dir) => void, index: number) => (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(index + 1, 'next')
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(index - 1, 'prev')
    }
  }

  const stageSwipe = useSwipe((dir) => showStage(stage.index + (dir === 'next' ? 1 : -1), dir), openFull)
  const fullSwipe = useSwipe((dir) => showFull(full.index + (dir === 'next' ? 1 : -1), dir))

  const onWheel = (e: WheelEvent) => {
    const now = Date.now()
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
    if (Math.abs(delta) < 24 || now < wheelLock.current) return
    wheelLock.current = now + 900
    showFull(full.index + (delta > 0 ? 1 : -1), delta > 0 ? 'next' : 'prev')
  }

  const renderLayers = (l: ReturnType<typeof useLayers>, mode: 'stage' | 'full') =>
    l.layers.map((layer, n) => {
      const newest = n === l.layers.length - 1
      const img =
        mode === 'stage' ? (
          <CarImage
            photo={photos[layer.i]}
            alt={newest ? alts[layer.i] : ''}
            sizes={STAGE_SIZES}
            priority={layer.k === 0}
            className="h-full w-full"
          />
        ) : (
          <img
            src={photos[layer.i].src}
            srcSet={srcSetOf(photos[layer.i])}
            sizes="100vw"
            width={photos[layer.i].width}
            height={photos[layer.i].height}
            alt={newest ? alts[layer.i] : ''}
          />
        )
      return (
        <div
          key={layer.k}
          className="st-layer"
          data-dir={layer.dir ?? undefined}
          // only the layer's own opening ends the change (the wipe and photo bubble up earlier)
          onAnimationEnd={newest && layer.dir ? (e) => e.target === e.currentTarget && l.settle() : undefined}
        >
          {mode === 'stage' && layer.k === 0 ? <div className="st-arrive">{img}</div> : img}
          {layer.dir && <span className="st-wipe" data-dir={layer.dir} aria-hidden="true" />}
        </div>
      )
    })

  const thumbs = (l: ReturnType<typeof useLayers>, go: (to: number, dir?: Dir) => void, className: string) => (
    <ul className={className} aria-label={t('thumbs')}>
      {photos.map((p, i) => (
        <li key={p.src}>
          <button type="button" className="st-thumb" onClick={() => go(i, i > l.index ? 'next' : 'prev')} aria-label={t('counter', { index: i + 1, total })} aria-current={i === l.index ? 'true' : undefined}>
            <CarImage photo={p} alt="" sizes="120px" className="aspect-[4/3]" quiet />
          </button>
        </li>
      ))}
    </ul>
  )

  return (
    <section className="st" aria-label={t('label', { name })} aria-roledescription="carousel">
      <div
        className="st-frame"
        tabIndex={0}
        role="group"
        aria-roledescription="slide"
        aria-label={t('counter', { index: stage.index + 1, total })}
        onKeyDown={keys(showStage, stage.index)}
        data-cursor
        {...stageSwipe}
      >
        {renderLayers(stage, 'stage')}
        <div className="st-ui">
          <p className="st-count tabular" aria-live="polite">
            {t('counter', { index: stage.index + 1, total })}
          </p>
          <span className="st-buttons">
            <ShutterButton kind="line" className="sh--sm sh--icon" onClick={() => showStage(stage.index - 1, 'prev')} aria-label={t('prev')}>
              <Icon name="chevronLeft" size={18} />
            </ShutterButton>
            <ShutterButton kind="line" className="sh--sm sh--icon" onClick={() => showStage(stage.index + 1, 'next')} aria-label={t('next')}>
              <Icon name="chevronRight" size={18} />
            </ShutterButton>
            <ShutterButton kind="line" className="sh--sm sh--icon" onClick={openFull} aria-label={t('fullscreen')}>
              <Icon name="maximize" size={16} />
            </ShutterButton>
          </span>
        </div>
      </div>
      {thumbs(stage, showStage, 'st-thumbs')}

      <dialog ref={dialog} className="lightbox" aria-label={t('label', { name })} onClose={() => setOpen(false)} onKeyDown={keys(showFull, full.index)} data-lenis-prevent>
        {open && (
          <div className="lb">
            <div className="lb-top">
              <p className="tabular" aria-live="polite">
                {t('counter', { index: full.index + 1, total })}
              </p>
              <button type="button" className="sh sh--line sh--sm" onClick={() => setOpen(false)}>
                <Faces>
                  <Icon name="close" size={15} />
                  {tc('close')}
                </Faces>
              </button>
            </div>
            <div className="lb-stage" onWheel={onWheel} {...fullSwipe}>
              {renderLayers(full, 'full')}
              <span className="lb-arrow" data-side="prev">
                <ShutterButton kind="line" className="sh--icon" onClick={() => showFull(full.index - 1, 'prev')} aria-label={t('prev')}>
                  <Icon name="chevronLeft" size={20} />
                </ShutterButton>
              </span>
              <span className="lb-arrow" data-side="next">
                <ShutterButton kind="line" className="sh--icon" onClick={() => showFull(full.index + 1, 'next')} aria-label={t('next')}>
                  <Icon name="chevronRight" size={20} />
                </ShutterButton>
              </span>
            </div>
            <div className="lb-bottom">
              {thumbs(full, showFull, 'lb-thumbs')}
              <span style={{ display: 'flex', gap: 8 }}>
                <ShutterA href={whatsapp} target="_blank" rel="noopener" kind="line" className="sh--sm">
                  <Icon name="whatsapp" size={15} />
                  {tc('whatsapp')}
                </ShutterA>
                <ShutterA href={SITE.phoneHref} kind="line" className="sh--sm">
                  <Icon name="phone" size={15} />
                  {tc('call')}
                </ShutterA>
              </span>
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}
