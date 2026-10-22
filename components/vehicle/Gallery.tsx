'use client'
import { useCallback, useEffect, useRef, useState, ViewTransition, type KeyboardEvent, type RefObject } from 'react'
import { useTranslations } from 'next-intl'
import type { Photo } from '@/lib/types'
import { SITE } from '@/lib/site'
import { CarImage } from '@/components/ui/CarImage'
import { Icon } from '@/components/ui/Icon'
import { lockScroll } from '@/components/motion/SmoothScroll'

export const GALLERY_OPEN_EVENT = 'gallery:open'

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches

function scrollToIndex(ref: RefObject<HTMLElement | null>, i: number, instant = false) {
  const track = ref.current
  if (!track) return
  track.scrollTo({ left: i * track.clientWidth, behavior: instant || reduced() ? 'auto' : 'smooth' })
}

function useTrackIndex() {
  const ref = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const onScroll = useCallback(() => {
    const el = ref.current
    if (el) setIndex(Math.round(el.scrollLeft / Math.max(1, el.clientWidth)))
  }, [])
  return { ref, index, onScroll }
}

/**
 * Large gallery of the original listing photos (no 360° data yet): swipe, arrow buttons,
 * ← → keys, thumbnails and a full-screen view with the contact buttons kept at hand.
 * The first photo carries the shared view-transition name from the card (Wow 3).
 */
export function Gallery({
  photos,
  alts,
  name,
  viewTransitionName,
  whatsapp,
}: {
  photos: Photo[]
  alts: string[]
  name: string
  viewTransitionName: string
  whatsapp: string
}) {
  const t = useTranslations('gallery')
  const tc = useTranslations('common')
  const stage = useTrackIndex()
  const full = useTrackIndex()
  const dialog = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)
  const total = photos.length

  const openAt = useCallback((i: number) => {
    setOpen(true)
    requestAnimationFrame(() => scrollToIndex(full.ref, i, true))
  }, [full.ref])

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
    lockScroll(open)
  }, [open])

  // the "all photos" grid further down the page opens the same full-screen view
  useEffect(() => {
    const onOpen = (e: Event) => openAt((e as CustomEvent<number>).detail)
    window.addEventListener(GALLERY_OPEN_EVENT, onOpen)
    return () => window.removeEventListener(GALLERY_OPEN_EVENT, onOpen)
  }, [openAt])

  const keys = (track: RefObject<HTMLElement | null>, index: number) => (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      scrollToIndex(track, Math.min(total - 1, index + 1))
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      scrollToIndex(track, Math.max(0, index - 1))
    }
  }

  const arrows = (track: RefObject<HTMLElement | null>, index: number, dark = false) => (
    <>
      <button
        type="button"
        onClick={() => scrollToIndex(track, Math.max(0, index - 1))}
        disabled={index === 0}
        aria-label={t('prev')}
        className={`icon-btn absolute top-1/2 left-3 size-11 -translate-y-1/2 disabled:opacity-0 ${dark ? 'bg-panel' : 'bg-night/70'}`}
      >
        <Icon name="chevronLeft" size={20} />
      </button>
      <button
        type="button"
        onClick={() => scrollToIndex(track, Math.min(total - 1, index + 1))}
        disabled={index === total - 1}
        aria-label={t('next')}
        className={`icon-btn absolute top-1/2 right-3 size-11 -translate-y-1/2 disabled:opacity-0 ${dark ? 'bg-panel' : 'bg-night/70'}`}
      >
        <Icon name="chevronRight" size={20} />
      </button>
    </>
  )

  const thumbs = (track: RefObject<HTMLElement | null>, index: number, instant = false) => (
    <ul aria-label={t('thumbs')} className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
      {photos.map((p, i) => (
        <li key={p.src} className="shrink-0">
          <button
            type="button"
            onClick={() => scrollToIndex(track, i, instant)}
            aria-label={t('counter', { index: i + 1, total })}
            aria-current={i === index ? 'true' : undefined}
            className={`block w-20 overflow-clip rounded-[4px] border transition-[opacity,border-color] duration-300 sm:w-24 ${
              i === index ? 'border-ink opacity-100' : 'border-transparent opacity-60 hover:opacity-90'
            }`}
          >
            <CarImage photo={p} alt="" sizes="96px" className="aspect-[4/3]" />
          </button>
        </li>
      ))}
    </ul>
  )

  return (
    <section aria-label={t('label', { name })} aria-roledescription="carousel">
      <div className="relative">
        <div
          ref={stage.ref}
          onScroll={stage.onScroll}
          onKeyDown={keys(stage.ref, stage.index)}
          tabIndex={0}
          className="flex aspect-[4/3] snap-x snap-mandatory overflow-x-auto overflow-y-hidden rounded-[4px] bg-panel [scrollbar-width:none]"
        >
          {photos.map((p, i) => (
            <div key={p.src} role="group" aria-roledescription="slide" aria-label={t('counter', { index: i + 1, total })} className="relative h-full w-full shrink-0 snap-start">
              {i === 0 ? (
                <ViewTransition name={viewTransitionName} share="car-photo" default="none">
                  <CarImage photo={p} alt={alts[i]} sizes="(min-width: 1280px) 62vw, (min-width: 1024px) 56vw, 100vw" priority className="h-full w-full" />
                </ViewTransition>
              ) : (
                <CarImage photo={p} alt={alts[i]} sizes="(min-width: 1280px) 62vw, (min-width: 1024px) 56vw, 100vw" className="h-full w-full" />
              )}
              <button type="button" onClick={() => openAt(i)} aria-label={t('open', { index: i + 1 })} className="absolute inset-0 cursor-zoom-in" tabIndex={-1} />
            </div>
          ))}
        </div>
        {arrows(stage.ref, stage.index)}
        <p className="tabular pointer-events-none absolute bottom-3 left-3 rounded-full bg-night/75 px-3 py-1.5 text-[0.8125rem] text-ink" aria-live="polite">
          {t('counter', { index: stage.index + 1, total })}
        </p>
        <button type="button" onClick={() => openAt(stage.index)} aria-label={t('fullscreen')} className="icon-btn absolute right-3 bottom-3 size-11 bg-night/70">
          <Icon name="maximize" size={18} />
        </button>
      </div>
      <div className="mt-3">{thumbs(stage.ref, stage.index)}</div>

      <dialog
        ref={dialog}
        onClose={() => setOpen(false)}
        onKeyDown={keys(full.ref, full.index)}
        aria-label={t('label', { name })}
        className="lightbox fixed inset-0 m-0 h-[100svh] max-h-none w-full max-w-none bg-black p-0 text-ink"
        data-lenis-prevent
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <p className="tabular text-[0.9375rem] text-ink-2">{t('counter', { index: full.index + 1, total })}</p>
            <button type="button" onClick={() => setOpen(false)} className="btn btn-secondary btn-sm gap-2">
              <Icon name="close" size={16} />
              {tc('close')}
            </button>
          </div>
          <div className="relative min-h-0 flex-1">
            <div ref={full.ref} onScroll={full.onScroll} className="flex h-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden [scrollbar-width:none]">
              {photos.map((p, i) => (
                <div key={p.src} className="flex h-full w-full shrink-0 snap-start items-center justify-center">
                  {open && (
                    <img
                      src={p.src}
                      srcSet={[p.src800 && `${p.src800} 800w`, `${p.src} ${p.width}w`].filter(Boolean).join(', ')}
                      sizes="100vw"
                      width={p.width}
                      height={p.height}
                      alt={alts[i]}
                      loading={Math.abs(i - full.index) <= 1 ? 'eager' : 'lazy'}
                      className="max-h-full w-auto max-w-full object-contain"
                    />
                  )}
                </div>
              ))}
            </div>
            {arrows(full.ref, full.index, true)}
          </div>
          <div className="grid gap-3 px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] sm:px-6">
            <div className="flex justify-center">{thumbs(full.ref, full.index, true)}</div>
            <div className="flex justify-center gap-3">
              <a href={whatsapp} target="_blank" rel="noopener" className="btn btn-secondary btn-sm gap-2">
                <Icon name="whatsapp" size={16} />
                {tc('whatsappWrite')}
              </a>
              <a href={SITE.phoneHref} className="btn btn-secondary btn-sm gap-2">
                <Icon name="phone" size={16} />
                {tc('call')}
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </section>
  )
}

/** "All photos" grid; opens the full-screen view of the gallery above (DESIGN.md §7.4). */
export function PhotoGrid({ photos, alts, labels }: { photos: Photo[]; alts: string[]; labels: string[] }) {
  return (
    <ul className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
      {photos.map((p, i) => (
        <li key={p.src}>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent(GALLERY_OPEN_EVENT, { detail: i }))}
            aria-label={labels[i]}
            className="group block w-full overflow-clip rounded-[4px]"
          >
            <CarImage
              photo={p}
              alt={alts[i]}
              sizes="(min-width: 1024px) 31vw, 50vw"
              className="aspect-[4/3]"
              imgClassName="transition-transform duration-700 ease-[var(--ease)] group-hover:scale-[1.02]"
            />
          </button>
        </li>
      ))}
    </ul>
  )
}
