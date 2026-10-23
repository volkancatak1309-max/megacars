'use client'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import {
  EMPTY_FILTERS,
  SORTS,
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
import { loadMotion, useMotion, MOTION_OK, REDUCED, type Motion } from '@/lib/gsap'
import { Icon } from '@/components/ui/Icon'
import { lockScroll } from '@/components/motion/SmoothScroll'
import { Faces, ShutterButton } from '@/components/site/Shutter'
import { VehicleCard } from '@/components/vehicle/VehicleCard'

// cards per step; "Weitere anzeigen" adds the next ones (100+ vehicles stay fast)
const PAGE = 24

const SORT_LABEL: Record<SortKey, string> = {
  newest: 'sortNewest',
  recommended: 'sortRecommended',
  'price-asc': 'sortPriceAsc',
  'price-desc': 'sortPriceDesc',
  km: 'sortKm',
  'year-desc': 'sortYearDesc',
  'year-asc': 'sortYearAsc',
}

type Option = { value: string; label: string }
type View = 'grid' | 'rows'

/**
 * Fahrzeuge: the stock count opens huge and rises from its mask, next to the real
 * price, make and year span. On desktop the filters form one instrument panel: every
 * cell carries the red shutter and a native select lies over it; on phones the filters
 * rise in a bottom sheet. Filter state lives in the URL. Cards are numbered like film
 * slates, re-arrange with GSAP Flip (also when switching between grid and rows), the
 * result count rolls to its new value, and cards below the fold open by clip-path.
 */
export function VehicleList({ cards, options, initial }: { cards: CardVehicle[]; options: FilterOptions; initial: Filters }) {
  const t = useTranslations('list')
  const tv = useTranslations('vehicle')
  const tc = useTranslations('common')
  const locale = useLocale()
  const [f, setF] = useState<Filters>(initial)
  const [sheet, setSheet] = useState(false)
  const [view, setView] = useState<View>('grid')
  const grid = useRef<HTMLUListElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  // GSAP arrives after the first paint; until then filtering simply re-renders
  const motion = useRef<Motion | null>(null)
  const flipState = useRef<ReturnType<Motion['Flip']['getState']> | null>(null)
  const entrance = useRef<{ kill: () => void }[]>([])

  const sorted = useMemo(() => sortVehicles(cards, f.sort), [cards, f.sort])
  const matched = useMemo(() => sorted.filter((v) => matches(v, f)), [sorted, f])
  const count = matched.length
  const [limit, setLimit] = useState(PAGE)
  const visible = useMemo(() => new Set(matched.slice(0, limit).map((v) => v.id)), [matched, limit])
  const active = activeCount(f)
  const [shown, setShown] = useState(count)

  // the result count rolls to its new value
  useEffect(() => {
    if (matchMedia(REDUCED).matches) {
      setShown(count)
      return
    }
    let cancelled = false
    const state = { n: shown }
    let tween: { kill: () => void } | null = null
    loadMotion().then(({ gsap }) => {
      if (!cancelled) tween = gsap.to(state, { n: count, duration: 0.6, snap: { n: 1 }, ease: 'power3.out', onUpdate: () => setShown(state.n) })
    })
    return () => {
      cancelled = true
      tween?.kill()
    }
    // `shown` is the tween's start value only
  }, [count])

  const captureFlip = () => {
    const el = grid.current
    const m = motion.current
    if (el && m && matchMedia(MOTION_OK).matches) {
      // finish any first-view entrance before measuring
      entrance.current.forEach((st) => st.kill())
      entrance.current = []
      m.gsap.set(el.querySelectorAll('[data-card], [data-reveal]'), { clearProps: 'opacity,visibility,transform,clipPath' })
      flipState.current = m.Flip.getState(el.querySelectorAll('[data-card]'))
    }
  }
  const update = (next: Filters) => {
    captureFlip()
    setLimit(PAGE)
    setF(next)
  }
  const showMore = () => {
    captureFlip()
    setLimit((l) => l + PAGE)
  }
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) => update({ ...f, [key]: value })

  const switchView = (next: View) => {
    if (next === view) return
    const el = grid.current
    const m = motion.current
    if (el && m && matchMedia(MOTION_OK).matches) {
      entrance.current.forEach((st) => st.kill())
      entrance.current = []
      m.gsap.set(el.querySelectorAll('[data-card], [data-reveal]'), { clearProps: 'opacity,visibility,transform,clipPath' })
      flipState.current = m.Flip.getState(el.querySelectorAll('[data-card], [data-card] .vc-frame, [data-card] .vc-model'))
    }
    setView(next)
  }

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
      duration: 0.7,
      ease: 'power3.inOut',
      absolute: true,
      nested: true,
      prune: true,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: 0.6, delay: 0.15, ease: 'power3.out' }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, duration: 0.35 }),
    })
  }, [f, view, limit])

  useEffect(() => {
    loadMotion().then((m) => {
      motion.current = m
    })
  }, [])

  // first view: frames below the fold open from their lower edge when they arrive
  useMotion(({ gsap, ScrollTrigger }) => {
    gsap.matchMedia().add(MOTION_OK, () => {
      const frames = [...(grid.current?.querySelectorAll<HTMLElement>('[data-card]:not([hidden]) [data-reveal]') ?? [])].filter(
        (el) => el.getBoundingClientRect().top > window.innerHeight * 0.95,
      )
      if (!frames.length) return
      gsap.set(frames, { clipPath: 'inset(100% 0% 0% 0%)' })
      entrance.current = ScrollTrigger.batch(frames, {
        start: 'top 92%',
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, stagger: 0.12, ease: 'expo.out', overwrite: true })
          gsap.fromTo(
            batch.map((b) => b.querySelector('img')),
            { scale: 1.2 },
            { scale: 1, duration: 1.5, stagger: 0.12, ease: 'expo.out', clearProps: 'transform' },
          )
        },
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
  // option counts once per filter state (opening the sheet must not recount 8 × 10 options)
  const counts = useMemo(() => {
    const cache = new Map<string, number>()
    return (key: FilterKey, value: Filters[FilterKey]) => {
      const id = `${key}:${String(value)}`
      let n = cache.get(id)
      if (n === undefined) {
        n = cards.filter((v) => matches(v, { ...f, [key]: value })).length
        cache.set(id, n)
      }
      return n
    }
  }, [cards, f])
  const countWith = counts

  const priceFrom = options.priceFrom.map((p) => ({ value: String(p), label: t('fromPrice', { value: formatPrice(p, locale) }) }))
  const priceTo = options.priceTo.map((p) => ({ value: String(p), label: t('upToPrice', { value: formatPrice(p, locale) }) }))
  const kmTo = options.kmTo.map((k) => ({ value: String(k), label: t('upToKm', { value: formatKm(k, locale) }) }))
  const yearFrom = options.yearFrom.map((y) => ({ value: String(y), label: t('fromYear', { value: y }) }))
  const fuels = options.fuels.map((x) => ({ value: x, label: tv(`fuelValues.${x}`) }))
  const gears = options.gearboxes.map((x) => ({ value: x, label: tv(`gearboxValues.${x}`) }))
  const bodies = options.bodies.map((x) => ({ value: x, label: tv(`bodyValues.${x}`) }))

  const FIELDS: { key: FilterKey; label: string; items: Option[]; parse: (s: string) => Filters[FilterKey]; any: string }[] = [
    { key: 'make', label: t('make'), items: options.makes, parse: (s) => s, any: t('allMakes') },
    { key: 'priceMin', label: t('priceMin'), items: priceFrom, parse: Number, any: t('any') },
    { key: 'priceMax', label: t('priceMax'), items: priceTo, parse: Number, any: t('any') },
    { key: 'kmMax', label: t('kmMax'), items: kmTo, parse: Number, any: t('any') },
    { key: 'yearMin', label: t('yearMin'), items: yearFrom, parse: Number, any: t('any') },
    { key: 'fuel', label: t('fuel'), items: fuels, parse: (s) => s as Filters['fuel'], any: t('any') },
    { key: 'gearbox', label: t('gearbox'), items: gears, parse: (s) => s as Filters['gearbox'], any: t('any') },
    { key: 'body', label: t('body'), items: bodies, parse: (s) => s as Filters['body'], any: t('any') },
  ]

  const valueLabel = (field: (typeof FIELDS)[number]) => {
    const v = f[field.key]
    if (v === null) return field.any
    return field.items.find((o) => o.value === String(v))?.label ?? String(v)
  }

  const options$ = (field: (typeof FIELDS)[number]) => (
    <>
      <option value="">{field.any}</option>
      {field.items.map((o) => {
        const n = countWith(field.key, field.parse(o.value))
        return (
          <option key={o.value} value={o.value} disabled={n === 0 && String(f[field.key]) !== o.value}>
            {t('optionCount', { label: o.label, count: n })}
          </option>
        )
      })}
    </>
  )

  const onPick = (field: (typeof FIELDS)[number], raw: string) => set(field.key, raw ? field.parse(raw) : null)

  const reset = () => update({ ...EMPTY_FILTERS, sort: f.sort })

  // the filter panel and the sheet fields only change with the filters: opening the
  // sheet or a menu must not rebuild 16 selects with their counted options (INP)
  const deck = useMemo(
    () => (
      <section aria-label={t('filterTitle')} className="vl-bar">
        {FIELDS.map((field) => (
          <span key={field.key} className="sh sh--line chip" data-on={f[field.key] !== null || undefined}>
            <Faces>
              <span className="chip-key">{field.label}</span>
              <span className="chip-val">{valueLabel(field)}</span>
              <Icon name="chevronDown" size={14} />
            </Faces>
            <select aria-label={field.label} value={f[field.key] === null ? '' : String(f[field.key])} onChange={(e) => onPick(field, e.target.value)}>
              {options$(field)}
            </select>
          </span>
        ))}
      </section>
    ),
    // FIELDS, labels and handlers derive from the filters and the (fixed) options
    [f, countWith],
  )
  const sheetFields = useMemo(
    () =>
      FIELDS.map((field) => (
        <div className="field" key={field.key}>
          <label htmlFor={`m-${field.key}`} className="field-label">
            {field.label}
          </label>
          <select id={`m-${field.key}`} className="field-control tabular" value={f[field.key] === null ? '' : String(f[field.key])} onChange={(e) => onPick(field, e.target.value)}>
            {options$(field)}
          </select>
        </div>
      )),
    [f, countWith],
  )

  // running numbers follow the visible order
  const order = useMemo(() => new Map(sorted.filter((v) => visible.has(v.id)).map((v, i) => [v.id, i + 1])), [sorted, visible])

  // the card grid only changes with the result, never when the sheet or a menu opens
  const cardItems = useMemo(
    () =>
      sorted.map((v, i) => (
        <li key={v.id} data-card data-flip-id={v.id} hidden={!visible.has(v.id)}>
          <VehicleCard v={v} priority={i === 0 && visible.has(v.id)} headingLevel="h2" index={order.get(v.id)} />
        </li>
      )),
    [sorted, visible, order],
  )

  // the stock in real numbers: price span, makes, years of first registration
  const years = cards.map((v) => Math.floor(v.firstRegistrationKey / 100))
  const stats = cards.length
    ? [
        { label: t('statPrice'), value: `${formatPrice(Math.min(...cards.map((v) => v.price)), locale)} – ${formatPrice(Math.max(...cards.map((v) => v.price)), locale)}` },
        { label: t('statMakes'), value: String(options.makes.length) },
        { label: t('statYears'), value: `${Math.min(...years)} – ${Math.max(...years)}` },
      ]
    : []

  const sortChip = (
    <span className="sh sh--line chip" data-sort>
      <Faces>
        <span className="chip-key">{t('sort')}</span>
        {t(SORT_LABEL[f.sort])}
        <Icon name="chevronDown" size={14} />
      </Faces>
      <select aria-label={t('sort')} value={f.sort} onChange={(e) => set('sort', e.target.value as SortKey)}>
        {SORTS.map((s) => (
          <option key={s} value={s}>
            {t(SORT_LABEL[s])}
          </option>
        ))}
      </select>
    </span>
  )

  // no vehicle online (empty database or no connection): a calm note instead of a list
  if (!cards.length) {
    return (
      <div className="vl pg wide">
        <header className="vl-head vl-none">
          <div className="vl-intro">
            <h1 className="vl-title d-m">
              <span className="mline rise">
                <span>{t('noneTitle')}</span>
              </span>
            </h1>
            <p className="lead fade-up">{t('noneLead')}</p>
          </div>
        </header>
      </div>
    )
  }

  return (
    <div className="vl pg wide">
      <header className="vl-head">
        <p className="vl-num" aria-hidden="true" style={{ ['--digits' as string]: String(cards.length).padStart(2, '0').length }}>
          <span className="mline rise">
            <span className="tabular">{String(cards.length).padStart(2, '0')}</span>
          </span>
        </p>
        <div className="vl-intro">
          <h1 className="vl-title d-m">
            <span className="mline rise">
              <span>{t('title', { count: cards.length })}</span>
            </span>
          </h1>
          <p className="lead fade-up">{t('lead')}</p>
          <dl className="vl-stats fade-up">
            {stats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd className="tabular">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {deck}

      <div className="vl-row">
        <p className="vl-found" aria-live="polite">
          <b className="tabular">{shown}</b>
          <span>{t('foundLabel', { count })}</span>
        </p>
        <div className="vl-tools">
          <ShutterButton kind="line" className="vl-filters-btn chip" onClick={() => setSheet(true)} aria-haspopup="dialog">
            <Icon name="sliders" size={15} />
            {active ? t('filtersActive', { count: active }) : t('filters')}
          </ShutterButton>
          {sortChip}
          <span className="vl-view" role="group" aria-label={t('view')}>
            <ShutterButton kind="line" className="chip" aria-pressed={view === 'grid'} onClick={() => switchView('grid')}>
              {t('viewGrid')}
            </ShutterButton>
            <ShutterButton kind="line" className="chip" aria-pressed={view === 'rows'} onClick={() => switchView('rows')}>
              {t('viewRows')}
            </ShutterButton>
          </span>
        </div>
      </div>

      {active > 0 && (
        <ul className="vl-active">
          {FIELDS.filter((field) => f[field.key] !== null).map((field) => (
            <li key={field.key}>
              <ShutterButton kind="line" onClick={() => set(field.key, null)} aria-label={t('removeFilter', { label: valueLabel(field) })}>
                {valueLabel(field)}
                <Icon name="close" size={13} />
              </ShutterButton>
            </li>
          ))}
          <li>
            <ShutterButton kind="text" onClick={reset} style={{ margin: 0, padding: '0 0.8em', minHeight: 40 }}>
              {t('reset')}
            </ShutterButton>
          </li>
        </ul>
      )}

      {count === 0 && (
        <div className="vl-empty">
          <p className="d-s">{t('empty')}</p>
          <ShutterButton kind="solid" onClick={reset}>
            {t('reset')}
          </ShutterButton>
        </div>
      )}

      <ul ref={grid} className="vl-grid" data-view={view}>
        {cardItems}
      </ul>

      {count > visible.size && (
        <div className="vl-more">
          <ShutterButton kind="line" onClick={showMore}>
            {t('showMore', { count: count - visible.size })}
          </ShutterButton>
        </div>
      )}

      <dialog ref={dialog} onClose={() => setSheet(false)} aria-label={t('filterTitle')} className="sheet">
        <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '90svh' }}>
          <div className="sheet-head">
            <p className="d-s">{t('filters')}</p>
            <button type="button" onClick={() => setSheet(false)} className="sh sh--line sh--sm">
              <Faces>
                <Icon name="close" size={15} />
                {tc('close')}
              </Faces>
            </button>
          </div>
          <div className="sheet-body vl-sheet-fields" data-lenis-prevent>
            {sheetFields}
            <ShutterButton kind="text" onClick={reset} style={{ justifySelf: 'start', margin: 0 }}>
              {t('reset')}
            </ShutterButton>
          </div>
          <div className="sheet-foot">
            <ShutterButton kind="solid" className="sh--wide tabular" onClick={() => setSheet(false)} aria-disabled={count === 0 ? 'true' : undefined}>
              {t('show', { count })}
            </ShutterButton>
          </div>
        </div>
      </dialog>
    </div>
  )
}
