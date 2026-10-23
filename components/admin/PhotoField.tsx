'use client'
import { useRef, useState, type DragEvent } from 'react'
import { useTranslations } from 'next-intl'
import { browserClient } from '@/lib/supabase/browser'
import { PHOTO_BUCKET } from '@/lib/supabase/env'
import { preparePhoto, PHOTO_SIZES, type PhotoExt } from '@/lib/admin/image'
import { discardUpload } from '@/app/[locale]/(admin)/admin/actions'
import { Faces } from '@/components/site/Shutter'
import { Icon } from '@/components/ui/Icon'

export interface PhotoState {
  id: string
  path: string
  ext: PhotoExt
  width: number
  height: number
  blur: string
  /** what the panel shows: the browser's own copy of a fresh upload, or the saved 800 px file */
  url: string
  state: 'uploading' | 'done' | 'error'
  /** true until the vehicle has been saved with this photo */
  fresh: boolean
  file?: File
}

/**
 * Photos of one vehicle: pick from the phone or shoot right away, each file is scaled
 * and re-encoded in the browser (lib/admin/image.ts) and uploaded straight into the
 * bucket under <vehicle>/<photo>/<size>.<ext>. Order by dragging or with the arrows;
 * one photo is the cover.
 */
export function PhotoField({
  vehicleId,
  photos,
  cover,
  onChange,
  onCover,
}: {
  vehicleId: string
  photos: PhotoState[]
  cover: string
  onChange: (next: PhotoState[] | ((prev: PhotoState[]) => PhotoState[])) => void
  onCover: (id: string) => void
}) {
  const t = useTranslations('admin.form')
  const pick = useRef<HTMLInputElement>(null)
  const shoot = useRef<HTMLInputElement>(null)
  const [drag, setDrag] = useState<number | null>(null)

  const patch = (id: string, p: Partial<PhotoState>) => onChange((prev) => prev.map((x) => (x.id === id ? { ...x, ...p } : x)))

  async function upload(photo: PhotoState, file: File) {
    try {
      const prepared = await preparePhoto(file)
      const storage = browserClient().storage.from(PHOTO_BUCKET)
      for (const size of PHOTO_SIZES) {
        const { error } = await storage.upload(`${photo.path}/${size}.${prepared.ext}`, prepared.files[size], {
          contentType: prepared.mime,
          cacheControl: '31536000',
          upsert: true,
        })
        if (error) throw error
      }
      patch(photo.id, { state: 'done', ext: prepared.ext, width: prepared.width, height: prepared.height, blur: prepared.blur })
    } catch (e) {
      console.error('[photos] upload failed', e)
      patch(photo.id, { state: 'error' })
    }
  }

  async function add(files: FileList | null) {
    if (!files?.length) return
    const list = [...files].filter((f) => f.type.startsWith('image/') || /\.(jpe?g|png|webp|heic|heif)$/i.test(f.name))
    const fresh: PhotoState[] = list.map((file) => {
      const id = crypto.randomUUID()
      return { id, path: `${vehicleId}/${id}`, ext: 'webp', width: 0, height: 0, blur: '', url: URL.createObjectURL(file), state: 'uploading', fresh: true, file }
    })
    onChange((prev) => [...prev, ...fresh])
    if (!cover && fresh[0]) onCover(fresh[0].id)
    // one after the other: phones have little memory for several decoded photos at once
    for (const p of fresh) await upload(p, p.file!)
  }

  const remove = (p: PhotoState) => {
    onChange((prev) => {
      const next = prev.filter((x) => x.id !== p.id)
      if (cover === p.id) onCover(next[0]?.id ?? '')
      return next
    })
    if (p.url.startsWith('blob:')) URL.revokeObjectURL(p.url)
    if (p.fresh && p.state !== 'uploading') void discardUpload(p.path, p.ext)
  }

  const move = (from: number, to: number) => {
    if (to < 0 || to >= photos.length || from === to) return
    onChange((prev) => {
      const next = [...prev]
      const [item] = next.splice(from, 1)
      next.splice(to, 0, item)
      return next
    })
  }

  const onDrop = (e: DragEvent, to: number) => {
    e.preventDefault()
    if (drag !== null) move(drag, to)
    setDrag(null)
  }

  return (
    <div className="adm-photos">
      <p className="adm-hint">{t('photosLead')}</p>
      <div className="adm-photo-actions">
        <input ref={pick} type="file" accept="image/*" multiple hidden onChange={(e) => void add(e.target.files).then(() => (e.target.value = ''))} />
        <input ref={shoot} type="file" accept="image/*" capture="environment" hidden onChange={(e) => void add(e.target.files).then(() => (e.target.value = ''))} />
        <button type="button" className="sh sh--solid" onClick={() => pick.current?.click()}>
          <Faces>
            <Icon name="image" size={16} />
            {t('addPhotos')}
          </Faces>
        </button>
        <button type="button" className="sh sh--line adm-shoot" onClick={() => shoot.current?.click()}>
          <Faces>
            <Icon name="camera" size={16} />
            {t('takePhoto')}
          </Faces>
        </button>
        <span className="adm-photo-count tabular">{t('photoCount', { count: photos.length })}</span>
      </div>
      {photos.length > 1 && <p className="adm-hint">{t('dragHint')}</p>}
      <ol className="adm-photo-grid">
        {photos.map((p, i) => (
          <li
            key={p.id}
            className="adm-photo"
            data-cover={cover === p.id || undefined}
            data-state={p.state}
            data-dragging={drag === i || undefined}
            draggable={p.state !== 'uploading'}
            onDragStart={() => setDrag(i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e, i)}
            onDragEnd={() => setDrag(null)}
          >
            <span className="adm-photo-frame">
              <img src={p.url} alt="" draggable={false} />
              <span className="adm-photo-n tabular" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              {cover === p.id && <span className="status-chip adm-photo-cover">{t('cover')}</span>}
              {p.state === 'uploading' && <span className="adm-photo-busy">{t('uploading')}</span>}
              {p.state === 'error' && (
                <span className="adm-photo-busy adm-photo-error">
                  {t('uploadFailed')}
                  {p.file && (
                    <button type="button" className="sh sh--line sh--sm" onClick={() => (patch(p.id, { state: 'uploading' }), void upload(p, p.file!))}>
                      <Faces>{t('retry')}</Faces>
                    </button>
                  )}
                </span>
              )}
            </span>
            <span className="adm-photo-tools">
              <button type="button" className="adm-icon-btn" onClick={() => move(i, i - 1)} disabled={i === 0} aria-label={t('moveBack')} title={t('moveBack')}>
                <Icon name="chevronLeft" size={18} />
              </button>
              <button type="button" className="adm-icon-btn" onClick={() => move(i, i + 1)} disabled={i === photos.length - 1} aria-label={t('moveForward')} title={t('moveForward')}>
                <Icon name="chevronRight" size={18} />
              </button>
              <button type="button" className="adm-icon-btn" onClick={() => onCover(p.id)} disabled={cover === p.id || p.state !== 'done'} aria-label={t('setCover')} title={t('setCover')} aria-pressed={cover === p.id}>
                <Icon name="star" size={18} />
              </button>
              <button type="button" className="adm-icon-btn adm-danger" onClick={() => remove(p)} disabled={p.state === 'uploading'} aria-label={t('removePhoto')} title={t('removePhoto')}>
                <Icon name="trash" size={18} />
              </button>
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
