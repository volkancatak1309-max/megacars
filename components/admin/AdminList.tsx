'use client'
import { useMemo, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import type { CardVehicle } from '@/lib/filter'
import type { Photo, VehicleStatus } from '@/lib/types'
import { STATUSES } from '@/lib/options'
import { formatPrice } from '@/lib/format'
import { archiveVehicles, patchVehicles } from '@/app/[locale]/(admin)/admin/actions'
import { Faces } from '@/components/site/Shutter'
import { Icon } from '@/components/ui/Icon'

export type AdminRow = Omit<CardVehicle, 'cover'> & { cover: Photo | null; visible: boolean; featured: boolean; featuredOrder: number }

type Filter = 'all' | VehicleStatus | 'hidden' | 'featured'
const FILTERS: Filter[] = ['all', 'for_sale', 'reserved', 'sold', 'hidden', 'featured']

/**
 * The stock as a working list: search, status filter, one-click switches for
 * "on the website" and "home page", a status menu, bulk hide / show / archive.
 * Rows are a grid that turns into cards on phones (styles/admin.css).
 */
export function AdminList({ rows, locale }: { rows: AdminRow[]; locale: string }) {
  const t = useTranslations('admin.list')
  const tv = useTranslations('vehicle')
  const router = useRouter()
  const [pending, start] = useTransition()
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [error, setError] = useState<string | null>(null)

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return rows.filter((r) => {
      if (filter === 'hidden' && r.visible) return false
      if (filter === 'featured' && !r.featured) return false
      if (STATUSES.includes(filter as VehicleStatus) && r.status !== filter) return false
      if (!needle) return true
      return `${r.make} ${r.model} ${r.version ?? ''} ${r.firstRegistration} ${r.price}`.toLowerCase().includes(needle)
    })
  }, [rows, q, filter])

  const run = (fn: () => Promise<{ ok: boolean; message?: string }>) =>
    start(async () => {
      const r = await fn()
      setError(r.ok ? null : (r.message ?? 'error'))
      if (r.ok) setSelected(new Set())
      router.refresh()
    })
  const toggleSel = (id: string) =>
    setSelected((s) => {
      const n = new Set(s)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })
  const allShownSelected = shown.length > 0 && shown.every((r) => selected.has(r.id))
  const ids = [...selected]

  if (!rows.length) {
    return (
      <div className="adm-empty">
        <p>{t('empty')}</p>
        <Link href="/admin/neu" className="sh sh--solid">
          <Faces>
            <Icon name="plus" size={16} />
            {t('addFirst')}
          </Faces>
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="adm-tools">
        <input type="search" className="field-control adm-search" placeholder={t('search')} aria-label={t('search')} value={q} onChange={(e) => setQ(e.target.value)} />
        <label className="adm-filter">
          <span className="sr-only">{t('filter')}</span>
          <select className="field-control" value={filter} onChange={(e) => setFilter(e.target.value as Filter)}>
            {FILTERS.map((f) => (
              <option key={f} value={f}>
                {f === 'all' ? t('all') : f === 'hidden' ? t('hidden') : f === 'featured' ? t('featured') : tv(`statusValues.${f}`)}
              </option>
            ))}
          </select>
        </label>
        <label className="adm-check adm-selectall">
          <input type="checkbox" checked={allShownSelected} onChange={() => setSelected(allShownSelected ? new Set() : new Set(shown.map((r) => r.id)))} />
          <span>{t('selectAll')}</span>
        </label>
      </div>

      {ids.length > 0 && (
        <div className="adm-bulk" role="toolbar" aria-label={t('selected', { count: ids.length })}>
          <span className="tabular">{t('selected', { count: ids.length })}</span>
          <button type="button" className="sh sh--line sh--sm" disabled={pending} onClick={() => run(() => patchVehicles(ids, { visible: false }))}>
            <Faces>{t('bulkHide')}</Faces>
          </button>
          <button type="button" className="sh sh--line sh--sm" disabled={pending} onClick={() => run(() => patchVehicles(ids, { visible: true }))}>
            <Faces>{t('bulkShow')}</Faces>
          </button>
          <button
            type="button"
            className="sh sh--line sh--sm"
            disabled={pending}
            onClick={() => {
              if (window.confirm(t('confirmArchive', { count: ids.length }))) run(() => archiveVehicles(ids, true))
            }}
          >
            <Faces>{t('bulkArchive')}</Faces>
          </button>
        </div>
      )}

      {error && (
        <p className="adm-alert" role="alert">
          {t('error', { message: error })}
        </p>
      )}

      <p className="adm-found tabular" aria-live="polite">
        {t('count', { count: shown.length })}
      </p>

      <ul className="adm-rows" aria-busy={pending}>
        {shown.map((r) => (
          <li key={r.id} className="adm-row" data-hidden={!r.visible || undefined} data-selected={selected.has(r.id) || undefined}>
            <label className="adm-row-select">
              <input type="checkbox" checked={selected.has(r.id)} onChange={() => toggleSel(r.id)} aria-label={`${r.make} ${r.model}`} />
            </label>
            <Link href={{ pathname: '/admin/[id]', params: { id: r.id } }} className="adm-thumb" aria-label={t('edit')}>
              {r.cover ? <img src={r.cover.src240} alt="" width={120} height={90} loading="lazy" /> : <span className="adm-thumb-none">{t('noPhoto')}</span>}
              {r.status !== 'for_sale' && (
                <span className="status-chip adm-thumb-status" data-status={r.status}>
                  {tv(`statusValues.${r.status}`)}
                </span>
              )}
            </Link>
            <span className="adm-row-name">
              <Link href={{ pathname: '/admin/[id]', params: { id: r.id } }} className="adm-row-title">
                {r.make} {r.model}
              </Link>
              {r.version && <span className="adm-row-version">{r.version}</span>}
              <span className="adm-row-chain tabular">
                {r.firstRegistration} · {formatPrice(r.price, locale)} · {t('photos', { count: r.photoCount })}
              </span>
            </span>
            <span className="adm-row-status">
              <label>
                <span className="sr-only">{t('status')}</span>
                <select className="field-control" value={r.status} disabled={pending} onChange={(e) => run(() => patchVehicles([r.id], { status: e.target.value as VehicleStatus }))}>
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {tv(`statusValues.${s}`)}
                    </option>
                  ))}
                </select>
              </label>
            </span>
            <span className="adm-row-switches">
              <button type="button" role="switch" aria-checked={r.visible} className="adm-switch" disabled={pending} onClick={() => run(() => patchVehicles([r.id], { visible: !r.visible }))}>
                <span className="adm-switch-knob" aria-hidden="true" />
                <span>{t('visible')}</span>
              </button>
              <button type="button" role="switch" aria-checked={r.featured} className="adm-switch" disabled={pending} onClick={() => run(() => patchVehicles([r.id], { featured: !r.featured }))}>
                <span className="adm-switch-knob" aria-hidden="true" />
                <span>{t('featured')}</span>
              </button>
            </span>
            <span className="adm-row-actions">
              <Link href={{ pathname: '/admin/[id]', params: { id: r.id } }} className="sh sh--line sh--sm">
                <Faces>{t('edit')}</Faces>
              </Link>
              {r.visible && (
                <Link href={{ pathname: '/fahrzeuge/[slug]', params: { slug: r.slug } }} target="_blank" rel="noopener" className="sh sh--text adm-row-open" aria-label={t('open')}>
                  <Faces>
                    <Icon name="arrowRight" size={15} />
                  </Faces>
                </Link>
              )}
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}
