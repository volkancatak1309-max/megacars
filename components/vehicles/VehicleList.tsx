'use client'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import {
  EMPTY_FILTERS,
  activeCount,
  matches,
  parseFilters,
  sortVehicles,
  toSearchParams,
  type CardVehicle,
  type FilterKey,
  type FilterOptions,
  type Filters,
  type SortKey,
} from '@/lib/filter'
import { formatKm, formatPrice } from '@/lib/format'
import { loadMotion, useMotion, MOTION_OK, type Motion } from '@/lib/gsap'
import { Icon } from '@/components/ui/Icon'
import { RevealText, RiseHeading } from '@/components/motion/Reveal'
import { lockScroll } from '@/components/motion/SmoothScroll'
import { VehicleCard } from '@/components/vehicle/VehicleCard'

const SORT_LABEL: Record<SortKey, string> = {
  year: 'sortYear',
  'price-asc': 'sortPriceAsc',
  'price-desc': 'sortPriceDesc',
  km: 'sortKm',
}

/**
 * Bestand with filters (DESIGN.md §7.3): state lives in the URL, mobile filters open in
 * a bottom sheet, and cards re-arrange with GSAP Flip (t-2) when the result changes.
 */
export function VehicleList({ cards, options, initial }: { cards: CardVehicle[]; options: FilterOptions; initial: Filters }) {
  const t = useTranslations('list')
  const tv = useTranslations('vehicle')
  const tc = useTranslations('common')
  const locale = useLocale()
  const [f, setF] = useState<Filters>(initial)
  const [sheet, setSheet] = useState(false)
  const grid = useRef<HTMLUListElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  // GSAP arrives after the first paint; until then filtering simply re-renders
  const motion = useRef<Motion | null>(null)
  const flipState = useRef<ReturnType<Motion['Flip']['getState']> | null>(null)
  const entrance = useRef<{ kill: () => void }[]>([])

  const sorted = useMemo(() => sortVehicles(cards, f.sort), [cards, f.sort])
  const visible = useMemo(() => new Set(sorted.filter((v) => matches(v, f)).map((v) => v.id)), [sorted, f])
  const count = visible.size
  const active = activeCount(f)

  const update = (next: Filters) => {
    const el = grid.current
    const m = motion.current
    if (el && m && matchMedia(MOTION_OK).matches) {
      // finish any first-view entrance before measuring
      entrance.current.forEach((st) => st.kill())
      entrance.current = []
      m.gsap.set(el.querySelectorAll('[data-card]'), { clearProps: 'opacity,visibility,transform' })
      flipState.current = m.Flip.getState(el.querySelectorAll('[data-card]'))
    }
    setF(next)
  }
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) => update({ ...f, [key]: value })

  // back/forward restores the page from the router cache: the URL is the source of truth
  useEffect(() => {
    const fromUrl = parseFilters(new URLSearchParams(window.location.search))
    if (JSON.stringify(fromUrl) !== JSON.stringify(initial)) setF(fromUrl)
  }, [initial])

  // keep the URL in sync (shareable, survives reload) without a server round trip
  useEffect(() => {
    const qs = toSearchParams(f).toString()
    const url = `${window.location.pathname}${qs ? `?${qs}` : ''}`
    if (url !== `${window.location.pathname}${window.location.search}`) window.history.replaceState(window.history.state, '', url)
  }, [f])

  useLayoutEffect(() => {
    const state = flipState.current
    const m = motion.current
    if (!state || !m) return
    flipState.current = null
    const { gsap } = m
    m.Flip.from(state, {
      duration: 0.45,
      ease: 'power3.out',
      absolute: true,
      nested: true,
      prune: true,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.45, delay: 0.1 }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, duration: 0.3 }),
    })
  }, [f])

  // first view: cards settle 24 px upward in batches (t-3, 90 ms)
  useEffect(() => {
    loadMotion().then((m) => {
      motion.current = m
    })
  }, [])
  useMotion(({ gsap, ScrollTrigger }) => {
    gsap.matchMedia().add(MOTION_OK, () => {
      // cards already on screen when motion arrives stay as they are
      const items = [...grid.current!.querySelectorAll<HTMLElement>('[data-card]:not([hidden])')].filter(
        (el) => el.getBoundingClientRect().top > window.innerHeight,
      )
      if (!items.length) return
      gsap.set(items, { autoAlpha: 0, y: 24 })
      entrance.current = ScrollTrigger.batch(items, {
        start: 'top 92%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.09, overwrite: true }),
      })
    })
  }, grid)

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (sheet && !d.open) d.showModal()
    if (!sheet && d.open) d.close()
    lockScroll(sheet)
  }, [sheet])

  // counts for an option while the other filters stay as they are
  const countWith = (key: FilterKey, value: Filters[FilterKey]) =>
    cards.filter((v) => matches(v, { ...f, [key]: value })).length

  const chips: { key: FilterKey; label: string }[] = []
  if (f.make) chips.push({ key: 'make', label: options.makes.find((m) => m.value === f.make)?.label ?? f.make })
  if (f.priceMin !== null) chips.push({ key: 'priceMin', label: t('fromPrice', { value: formatPrice(f.priceMin, locale) }) })
  if (f.priceMax !== null) chips.push({ key: 'priceMax', label: t('upToPrice', { value: formatPrice(f.priceMax, locale) }) })
  if (f.kmMax !== null) chips.push({ key: 'kmMax', label: t('upToKm', { value: formatKm(f.kmMax, locale) }) })
  if (f.yearMin !== null) chips.push({ key: 'yearMin', label: t('fromYear', { value: f.yearMin }) })
  if (f.fuel) chips.push({ key: 'fuel', label: tv(`fuelValues.${f.fuel}`) })
  if (f.gearbox) chips.push({ key: 'gearbox', label: tv(`gearboxValues.${f.gearbox}`) })
  if (f.body) chips.push({ key: 'body', label: tv(`bodyValues.${f.body}`) })

  const reset = () => update({ ...EMPTY_FILTERS, sort: f.sort })

  const select = (id: string, key: FilterKey, label: string, items: { value: string; label: string }[], parse: (s: string) => Filters[FilterKey]) => (
    <div className="field" key={key}>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <select id={id} className="field-control tabular" value={f[key] === null ? '' : String(f[key])} onChange={(e) => set(key, e.target.value ? parse(e.target.value) : null)}>
        <option value="">{key === 'make' ? t('allMakes') : t('any')}</option>
        {items.map((o) => {
          const n = countWith(key, parse(o.value))
          return (
            <option key={o.value} value={o.value} disabled={n === 0 && String(f[key]) !== o.value}>
              {t('optionCount', { label: o.label, count: n })}
            </option>
          )
        })}
      </select>
    </div>
  )

  const fields = (prefix: string) => [
    select(`${prefix}-make`, 'make', t('make'), options.makes, (s) => s),
    select(`${prefix}-pmin`, 'priceMin', t('priceMin'), options.priceFrom.map((p) => ({ value: String(p), label: t('fromPrice', { value: formatPrice(p, locale) }) })), Number),
    select(`${prefix}-pmax`, 'priceMax', t('priceMax'), options.priceTo.map((p) => ({ value: String(p), label: t('upToPrice', { value: formatPrice(p, locale) }) })), Number),
    select(`${prefix}-km`, 'kmMax', t('kmMax'), options.kmTo.map((k) => ({ value: String(k), label: t('upToKm', { value: formatKm(k, locale) }) })), Number),
    select(`${prefix}-year`, 'yearMin', t('yearMin'), options.yearFrom.map((y) => ({ value: String(y), label: t('fromYear', { value: y }) })), Number),
    select(`${prefix}-fuel`, 'fuel', t('fuel'), options.fuels.map((x) => ({ value: x, label: tv(`fuelValues.${x}`) })), (s) => s as Filters['fuel']),
    select(`${prefix}-gear`, 'gearbox', t('gearbox'), options.gearboxes.map((x) => ({ value: x, label: tv(`gearboxValues.${x}`) })), (s) => s as Filters['gearbox']),
    select(`${prefix}-body`, 'body', t('body'), options.bodies.map((x) => ({ value: x, label: tv(`bodyValues.${x}`) })), (s) => s as Filters['body']),
  ]

  const sortSelect = (
    <div className="field min-w-[15rem]">
      <label htmlFor="sort" className="field-label">
        {t('sort')}
      </label>
      <select id="sort" className="field-control" value={f.sort} onChange={(e) => set('sort', e.target.value as SortKey)}>
        {(Object.keys(SORT_LABEL) as SortKey[]).map((s) => (
          <option key={s} value={s}>
            {t(SORT_LABEL[s])}
          </option>
        ))}
      </select>
    </div>
  )

  return (
    <div className="container-max page-x pb-[var(--section-y)]">
      <header className="pt-10 pb-8 lg:pt-16 lg:pb-10">
        <RiseHeading className="t-h1 max-w-[22ch]">{t('title', { count: cards.length })}</RiseHeading>
        <p className="t-lead mt-4 measure">{t('lead')}</p>
      </header>

      {/* desktop filter bar: native selects never get clipped */}
      <section aria-label={t('filterTitle')} className="hidden border-y border-line py-6 lg:block">
        <div className="grid grid-cols-4 gap-4 2xl:grid-cols-8">{fields('d')}</div>
      </section>

      <div className="flex flex-wrap items-end justify-between gap-4 py-6">
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => setSheet(true)} aria-haspopup="dialog" className="btn btn-secondary btn-sm gap-2 lg:hidden">
            <Icon name="sliders" size={16} />
            {active ? t('filtersActive', { count: active }) : t('filters')}
          </button>
          <p className="tabular text-ink-2" aria-live="polite">
            {t('found', { count })}
          </p>
        </div>
        {sortSelect}
      </div>

      {chips.length > 0 && (
        <ul className="-mt-2 mb-6 flex flex-wrap gap-2">
          {chips.map((c) => (
            <li key={c.key}>
              <button
                type="button"
                onClick={() => set(c.key, null)}
                aria-label={t('removeFilter', { label: c.label })}
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-signal bg-signal-12 px-4 text-[0.875rem] text-ink transition-colors duration-300 hover:bg-signal/20"
              >
                {c.label}
                <Icon name="close" size={14} />
              </button>
            </li>
          ))}
          <li>
            <button type="button" onClick={reset} className="link-arrow min-h-10 px-2 text-[0.875rem] text-ink-2">
              {t('reset')}
            </button>
          </li>
        </ul>
      )}

      {count === 0 && (
        <div className="border-y border-line py-16 text-center">
          <RevealText as="p" className="t-h3 mx-auto max-w-[30ch] font-normal" start="top 100%">
            {t('empty')}
          </RevealText>
          <button type="button" onClick={reset} className="btn btn-secondary mt-6">
            {t('reset')}
          </button>
        </div>
      )}

      <ul ref={grid} className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 2xl:grid-cols-4">
        {sorted.map((v, i) => (
          <li key={v.id} data-card data-flip-id={v.id} hidden={!visible.has(v.id)}>
            <VehicleCard v={v} priority={i === 0 && visible.has(v.id)} headingLevel="h2" />
          </li>
        ))}
      </ul>

      <dialog ref={dialog} onClose={() => setSheet(false)} aria-label={t('filterTitle')} className="sheet lg:hidden">
        <div className="flex max-h-[90svh] flex-col">
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <p className="t-h3 font-normal">{t('filters')}</p>
            <button type="button" onClick={() => setSheet(false)} className="btn btn-secondary btn-sm gap-2">
              <Icon name="close" size={16} />
              {tc('close')}
            </button>
          </div>
          <div className="grid gap-5 overflow-y-auto px-5 py-6" data-lenis-prevent>
            {fields('m')}
            <button type="button" onClick={reset} className="link-arrow justify-self-start text-ink-2">
              {t('reset')}
            </button>
          </div>
          <div className="border-t border-line px-5 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))]">
            <button type="button" onClick={() => setSheet(false)} className="btn btn-primary tabular w-full" aria-disabled={count === 0 || undefined}>
              {t('show', { count })}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  )
}
