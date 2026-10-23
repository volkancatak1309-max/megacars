'use client'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import type { Photo } from '@/lib/types'
import { formatPrice } from '@/lib/format'
import { archiveVehicles, deleteVehicle } from '@/app/[locale]/(admin)/admin/actions'
import { Faces } from '@/components/site/Shutter'
import { Icon } from '@/components/ui/Icon'

export interface ArchiveRow {
  id: string
  make: string
  model: string
  version: string | null
  price: number
  firstRegistration: string
  cover: Photo | null
  photoCount: number
  archivedAt: string
}

/** Archived vehicles: restore with one click, or delete for good after a confirmation. */
export function ArchiveList({ rows, locale }: { rows: ArchiveRow[]; locale: string }) {
  const t = useTranslations('admin.archive')
  const tl = useTranslations('admin.list')
  const router = useRouter()
  const [pending, start] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const run = (fn: () => Promise<{ ok: boolean; message?: string }>) =>
    start(async () => {
      const r = await fn()
      setError(r.ok ? null : (r.message ?? 'error'))
      router.refresh()
    })
  const date = (iso: string) => new Date(iso).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'de-AT', { day: '2-digit', month: '2-digit', year: 'numeric' })

  if (!rows.length) return <p className="adm-empty">{t('empty')}</p>
  return (
    <>
      {error && (
        <p className="adm-alert" role="alert">
          {t('error', { message: error })}
        </p>
      )}
      <ul className="adm-rows" aria-busy={pending}>
        {rows.map((r) => (
          <li key={r.id} className="adm-row adm-row--archive">
            <span className="adm-thumb">{r.cover ? <img src={r.cover.src240} alt="" width={120} height={90} loading="lazy" /> : <span className="adm-thumb-none">{tl('noPhoto')}</span>}</span>
            <span className="adm-row-name">
              <b>
                {r.make} {r.model}
              </b>
              {r.version && <span className="adm-row-version">{r.version}</span>}
              <span className="adm-row-chain tabular">
                {r.firstRegistration} · {formatPrice(r.price, locale)} · {tl('photos', { count: r.photoCount })}
              </span>
              <span className="adm-row-chain tabular">
                {t('archivedAt')} {date(r.archivedAt)}
              </span>
            </span>
            <span className="adm-row-actions">
              <button type="button" className="sh sh--line sh--sm" disabled={pending} onClick={() => run(() => archiveVehicles([r.id], false))}>
                <Faces>
                  <Icon name="rotate" size={15} />
                  {t('restore')}
                </Faces>
              </button>
              <button
                type="button"
                className="sh sh--text adm-danger"
                disabled={pending}
                onClick={() => {
                  if (window.confirm(t('confirmDelete'))) run(() => deleteVehicle(r.id))
                }}
              >
                <Faces>
                  <Icon name="trash" size={15} />
                  {t('delete')}
                </Faces>
              </button>
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}
