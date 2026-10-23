'use client'
import { useMemo, useState, useTransition, type ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import type { Vehicle } from '@/lib/types'
import type { CardVehicle } from '@/lib/filter'
import { BODIES, COLORS, DOORS, DRIVES, EMISSION_CLASSES, FUELS, GEARBOXES, kwToPs, MATERIALS, psToKw, SEATS, STATUSES, VAT_NOTES } from '@/lib/options'
import { archiveVehicles, saveVehicle } from '@/app/[locale]/(admin)/admin/actions'
import { Faces } from '@/components/site/Shutter'
import { Icon } from '@/components/ui/Icon'
import { PhotoField, type PhotoState } from './PhotoField'
import { EquipmentPicker } from './EquipmentPicker'
import { Preview } from './Preview'

type Known = { makes: string[]; models: Record<string, string[]> }

interface Form {
  make: string
  model: string
  version: string
  body: string
  registrationMonth: string
  registrationYear: string
  mileage: string
  price: string
  vatNote: string
  fuel: string
  transmission: string
  powerKw: string
  powerPs: string
  drive: string
  seats: string
  doors: string
  displacementCcm: string
  emissionClass: string
  consumptionL: string
  co2: string
  color: string
  interiorColor: string
  interiorMaterial: string
  previousOwners: string
  serviceBook: string
  nonSmoker: string
  accidentFree: boolean
  firstOwner: boolean
  warranty: boolean
  inspectionNew: boolean
  featured: boolean
  featuredOrder: string
  status: string
  visible: boolean
}

const EMPTY: Form = {
  make: '',
  model: '',
  version: '',
  body: '',
  registrationMonth: '',
  registrationYear: '',
  mileage: '',
  price: '',
  vatNote: 'unknown',
  fuel: '',
  transmission: '',
  powerKw: '',
  powerPs: '',
  drive: '',
  seats: '',
  doors: '',
  displacementCcm: '',
  emissionClass: '',
  consumptionL: '',
  co2: '',
  color: '',
  interiorColor: '',
  interiorMaterial: '',
  previousOwners: '',
  serviceBook: '',
  nonSmoker: '',
  accidentFree: false,
  firstOwner: false,
  warranty: false,
  inspectionNew: false,
  featured: false,
  featuredOrder: '0',
  status: 'for_sale',
  visible: true,
}

const s = (x: number | string | null) => (x === null ? '' : String(x))
const tri = (b: boolean | null) => (b === null ? '' : b ? 'true' : 'false')

function fromVehicle(v: Vehicle): Form {
  const [mm, yyyy] = v.firstRegistration.split('/')
  return {
    make: v.make,
    model: v.model,
    version: v.version ?? '',
    body: v.body ?? '',
    registrationMonth: String(Number(mm)),
    registrationYear: yyyy,
    mileage: s(v.mileage),
    price: s(v.price),
    vatNote: v.vatNote,
    fuel: v.fuel ?? '',
    transmission: v.transmission ?? '',
    powerKw: s(v.powerKw),
    powerPs: s(v.powerPs),
    drive: v.drive ?? '',
    seats: s(v.seats),
    doors: s(v.doors),
    displacementCcm: s(v.displacementCcm),
    emissionClass: v.emissionClass ?? '',
    consumptionL: s(v.consumptionL),
    co2: s(v.co2),
    color: v.colorBase ?? '',
    interiorColor: v.interiorColor ?? '',
    interiorMaterial: v.interiorMaterial ?? '',
    previousOwners: s(v.previousOwners),
    serviceBook: tri(v.serviceBook),
    nonSmoker: tri(v.nonSmoker),
    accidentFree: v.accidentFree,
    firstOwner: v.firstOwner,
    warranty: v.warranty,
    inspectionNew: v.inspectionNew,
    featured: v.featured,
    featuredOrder: s(v.featuredOrder),
    status: v.status,
    visible: v.visible,
  }
}

const fromSaved = (v: Vehicle): PhotoState[] =>
  v.photos.map((p) => ({
    id: p.id,
    path: p.src.replace(/^.*\/vehicles\//, '').replace(/\/1600\.(webp|jpg)$/, ''),
    ext: p.src.endsWith('.jpg') ? 'jpg' : 'webp',
    width: p.width,
    height: p.height,
    blur: p.blur,
    url: p.src800 ?? p.src,
    state: 'done',
    fresh: false,
  }))

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1)
const THIS_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: THIS_YEAR - 1989 }, (_, i) => THIS_YEAR - i)

/**
 * One form for a new or existing vehicle: photos first (the phone's camera is one tap
 * away), then selects for everything the site translates, the three-language equipment
 * checklist, and the website switches. A preview shows the card as the visitor sees it.
 */
export function VehicleForm({ locale, vehicle, known }: { locale: string; vehicle: Vehicle | null; known: Known }) {
  const t = useTranslations('admin.form')
  const tv = useTranslations('vehicle')
  const tc = useTranslations('common')
  const router = useRouter()
  const [id] = useState(() => vehicle?.id ?? crypto.randomUUID())
  const [f, setF] = useState<Form>(() => (vehicle ? fromVehicle(vehicle) : EMPTY))
  const [photos, setPhotos] = useState<PhotoState[]>(() => (vehicle ? fromSaved(vehicle) : []))
  const [cover, setCover] = useState(() => (vehicle ? (vehicle.photos[vehicle.cover]?.id ?? '') : ''))
  const [equipment, setEquipment] = useState<string[]>(() => vehicle?.equipment ?? [])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState<string | null>(null)
  const [preview, setPreview] = useState(false)
  const [pending, start] = useTransition()

  const set = <K extends keyof Form>(key: K, value: Form[K]) => setF((prev) => ({ ...prev, [key]: value }))
  const setKw = (kw: string) => setF((prev) => ({ ...prev, powerKw: kw, powerPs: /^\d+$/.test(kw) ? String(kwToPs(Number(kw))) : prev.powerPs }))
  const setPs = (ps: string) => setF((prev) => ({ ...prev, powerPs: ps, powerKw: /^\d+$/.test(ps) ? String(psToKw(Number(ps))) : prev.powerKw }))

  const uploading = photos.some((p) => p.state === 'uploading')
  const done = photos.filter((p) => p.state === 'done')

  const submit = () => {
    if (uploading) {
      setMessage(t('waitUpload'))
      return
    }
    setMessage(null)
    const payload = {
      id,
      ...f,
      version: f.version || null,
      equipment,
      photos: done.map((p) => ({ id: p.id, path: p.path, ext: p.ext, width: p.width, height: p.height, blur: p.blur })),
      cover,
    }
    start(async () => {
      const r = await saveVehicle(payload)
      if (r.ok) {
        router.push('/admin')
        router.refresh()
        return
      }
      setErrors(r.errors ?? {})
      setMessage(r.errors ? t('fixErrors') : t('error', { message: r.message ?? '' }))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  const archive = () => {
    if (!vehicle || !window.confirm(t('confirmArchive'))) return
    start(async () => {
      await archiveVehicles([vehicle.id], true)
      router.push('/admin')
      router.refresh()
    })
  }

  // the card as the visitor will see it (first photo as cover until another is chosen)
  const card: CardVehicle | null = useMemo(() => {
    const c = done.find((p) => p.id === cover) ?? done[0]
    if (!c) return null
    return {
      id,
      slug: '',
      make: f.make || '—',
      makeSlug: '',
      model: f.model || '—',
      version: f.version || null,
      price: Number(f.price) || 0,
      mileage: Number(f.mileage) || 0,
      firstRegistration: f.registrationMonth && f.registrationYear ? `${f.registrationMonth.padStart(2, '0')}/${f.registrationYear}` : '',
      firstRegistrationKey: 0,
      powerKw: Number(f.powerKw) || null,
      powerPs: Number(f.powerPs) || null,
      fuel: (f.fuel || null) as CardVehicle['fuel'],
      transmission: (f.transmission || null) as CardVehicle['transmission'],
      body: (f.body || null) as CardVehicle['body'],
      colorBase: f.color || null,
      status: f.status as CardVehicle['status'],
      createdAt: '',
      cover: { id: c.id, src: c.url, src800: null, src240: c.url, width: c.width || 4, height: c.height || 3, blur: c.blur },
      photoCount: done.length,
      hasSpin: false,
      rank: 0,
    }
  }, [done, cover, f, id])

  const err = (key: string) => (errors[key] ? <span className="field-error">{t(errors[key])}</span> : null)
  const field = (key: keyof Form, label: string, control: ReactNode, hint?: string) => (
    <div className="field" data-error={errors[key] || undefined}>
      <label htmlFor={`f-${key}`} className="field-label">
        {label}
      </label>
      {control}
      {hint && <span className="adm-hint">{hint}</span>}
      {err(key)}
    </div>
  )
  const select = (key: keyof Form, items: { value: string; label: string }[], required = false, extra?: ReactNode) => (
    <select id={`f-${key}`} className="field-control" value={String(f[key])} onChange={(e) => set(key, e.target.value as never)} aria-invalid={errors[key] ? 'true' : undefined} required={required}>
      <option value="">{required ? t('choose') : t('unknown')}</option>
      {extra}
      {items.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
  const number = (key: keyof Form, opts: { min?: number; max?: number; step?: string; placeholder?: string } = {}) => (
    <input
      id={`f-${key}`}
      type="number"
      inputMode={opts.step ? 'decimal' : 'numeric'}
      className="field-control tabular"
      value={String(f[key])}
      min={opts.min}
      max={opts.max}
      step={opts.step}
      placeholder={opts.placeholder}
      onChange={(e) => set(key, e.target.value as never)}
      aria-invalid={errors[key] ? 'true' : undefined}
    />
  )
  const check = (key: 'accidentFree' | 'firstOwner' | 'warranty' | 'inspectionNew', label: string) => (
    <label className="adm-check" data-on={f[key] || undefined}>
      <input type="checkbox" checked={f[key]} onChange={(e) => set(key, e.target.checked)} />
      <span>{label}</span>
    </label>
  )
  const yesNo = (key: 'serviceBook' | 'nonSmoker', label: string) =>
    field(
      key,
      label,
      <select id={`f-${key}`} className="field-control" value={f[key]} onChange={(e) => set(key, e.target.value)}>
        <option value="">{t('unknown')}</option>
        <option value="true">{tc('yes')}</option>
        <option value="false">{tc('no')}</option>
      </select>,
    )
  const opts = (list: readonly string[], ns: string) => list.map((v) => ({ value: v, label: tv(`${ns}.${v}`) }))
  const models = known.models[f.make] ?? []

  return (
    <form
      className="adm-form adm-vehicle"
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        submit()
      }}
    >
      {message && (
        <p className="adm-alert" role="alert">
          {message}
        </p>
      )}

      <section className="adm-section" aria-labelledby="s-photos">
        <h2 id="s-photos" className="adm-section-title">
          {t('photos')}
        </h2>
        <PhotoField vehicleId={id} photos={photos} cover={cover} onChange={setPhotos} onCover={setCover} />
        {err('photos')}
      </section>

      <section className="adm-section" aria-labelledby="s-basics">
        <h2 id="s-basics" className="adm-section-title">
          {t('basics')}
        </h2>
        <div className="adm-grid">
          {field(
            'make',
            t('make'),
            <>
              <input id="f-make" list="adm-makes" className="field-control" value={f.make} onChange={(e) => set('make', e.target.value)} autoComplete="off" aria-invalid={errors.make ? 'true' : undefined} />
              <datalist id="adm-makes">
                {known.makes.map((m) => (
                  <option key={m} value={m} />
                ))}
              </datalist>
            </>,
          )}
          {field(
            'model',
            t('model'),
            <>
              <input id="f-model" list="adm-models" className="field-control" value={f.model} onChange={(e) => set('model', e.target.value)} autoComplete="off" aria-invalid={errors.model ? 'true' : undefined} />
              <datalist id="adm-models">
                {models.map((m) => (
                  <option key={m} value={m} />
                ))}
              </datalist>
            </>,
          )}
          {field('version', t('version'), <input id="f-version" className="field-control" value={f.version} onChange={(e) => set('version', e.target.value)} maxLength={80} />, t('versionHint'))}
          {field('body', t('body'), select('body', opts(BODIES, 'bodyValues'), true))}
          <div className="field adm-reg" data-error={errors.registrationYear || undefined}>
            <span className="field-label" id="l-reg">
              {t('registration')}
            </span>
            <div className="adm-reg-row" role="group" aria-labelledby="l-reg">
              <select className="field-control" aria-label={t('month')} value={f.registrationMonth} onChange={(e) => set('registrationMonth', e.target.value)} aria-invalid={errors.registrationYear ? 'true' : undefined}>
                <option value="">{t('month')}</option>
                {MONTHS.map((m) => (
                  <option key={m} value={m}>
                    {String(m).padStart(2, '0')}
                  </option>
                ))}
              </select>
              <select className="field-control" aria-label={t('year')} value={f.registrationYear} onChange={(e) => set('registrationYear', e.target.value)} aria-invalid={errors.registrationYear ? 'true' : undefined}>
                <option value="">{t('year')}</option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            {err('registrationYear')}
          </div>
          {field('mileage', t('mileage'), number('mileage', { min: 0, max: 2000000, placeholder: 'km' }))}
          {field('price', t('price'), number('price', { min: 1, max: 10000000, placeholder: '€' }))}
          {field(
            'vatNote',
            t('vat'),
            <select id="f-vatNote" className="field-control" value={f.vatNote} onChange={(e) => set('vatNote', e.target.value)}>
              {VAT_NOTES.map((v) => (
                <option key={v} value={v}>
                  {v === 'unknown' ? t('vatUnknown') : tv(`vatValues.${v}`)}
                </option>
              ))}
            </select>,
          )}
        </div>
      </section>

      <section className="adm-section" aria-labelledby="s-tech">
        <h2 id="s-tech" className="adm-section-title">
          {t('tech')}
        </h2>
        <div className="adm-grid">
          {field('fuel', t('fuel'), select('fuel', opts(FUELS, 'fuelValues'), true))}
          {field('transmission', t('gearbox'), select('transmission', opts(GEARBOXES, 'gearboxValues'), true))}
          {field(
            'powerKw',
            t('powerKw'),
            <input id="f-powerKw" type="number" inputMode="numeric" min={1} max={2000} className="field-control tabular" value={f.powerKw} onChange={(e) => setKw(e.target.value)} />,
            t('powerHint'),
          )}
          {field('powerPs', t('powerPs'), <input id="f-powerPs" type="number" inputMode="numeric" min={1} max={3000} className="field-control tabular" value={f.powerPs} onChange={(e) => setPs(e.target.value)} />)}
          {field('drive', t('drive'), select('drive', opts(DRIVES, 'driveValues')))}
          {field('seats', t('seats'), select('seats', SEATS.map((n) => ({ value: String(n), label: String(n) }))))}
          {field('doors', t('doors'), select('doors', DOORS.map((n) => ({ value: String(n), label: String(n) }))))}
          {field('displacementCcm', t('displacement'), number('displacementCcm', { min: 50, max: 10000 }))}
          {field('emissionClass', t('emission'), select('emissionClass', EMISSION_CLASSES.map((e) => ({ value: e, label: e }))))}
          {field('consumptionL', t('consumption'), number('consumptionL', { min: 0, max: 50, step: '0.1' }))}
          {field('co2', t('co2'), number('co2', { min: 0, max: 1000 }))}
        </div>
      </section>

      <section className="adm-section" aria-labelledby="s-colors">
        <h2 id="s-colors" className="adm-section-title">
          {t('colors')}
        </h2>
        <div className="adm-grid">
          {field('color', t('color'), select('color', opts(COLORS, 'colorValues')))}
          {field('interiorColor', t('interiorColor'), select('interiorColor', opts(COLORS, 'colorValues')))}
          {field('interiorMaterial', t('material'), select('interiorMaterial', opts(MATERIALS, 'materialValues')))}
        </div>
      </section>

      <section className="adm-section" aria-labelledby="s-history">
        <h2 id="s-history" className="adm-section-title">
          {t('history')}
        </h2>
        <div className="adm-grid">
          {field('previousOwners', t('owners'), number('previousOwners', { min: 0, max: 20 }))}
          {yesNo('serviceBook', t('serviceBook'))}
          {yesNo('nonSmoker', t('nonSmoker'))}
        </div>
        <div className="adm-checks">
          {check('accidentFree', tv('accidentFree'))}
          {check('firstOwner', tv('firstOwner'))}
          {check('warranty', tv('warranty'))}
          {check('inspectionNew', tv('inspectionNew'))}
        </div>
      </section>

      <section className="adm-section" aria-labelledby="s-equipment">
        <h2 id="s-equipment" className="adm-section-title">
          {t('equipment')}
        </h2>
        <EquipmentPicker value={equipment} onChange={setEquipment} />
      </section>

      <section className="adm-section" aria-labelledby="s-site">
        <h2 id="s-site" className="adm-section-title">
          {t('site')}
        </h2>
        <div className="adm-grid">
          {field(
            'status',
            t('status'),
            <select id="f-status" className="field-control" value={f.status} onChange={(e) => set('status', e.target.value)}>
              {STATUSES.map((v) => (
                <option key={v} value={v}>
                  {tv(`statusValues.${v}`)}
                </option>
              ))}
            </select>,
          )}
          {field('featuredOrder', t('featuredOrder'), number('featuredOrder', { min: 0, max: 999 }), t('featuredHint'))}
        </div>
        <div className="adm-checks">
          <label className="adm-check" data-on={f.visible || undefined}>
            <input type="checkbox" checked={f.visible} onChange={(e) => set('visible', e.target.checked)} />
            <span>{t('visible')}</span>
          </label>
          <label className="adm-check" data-on={f.featured || undefined}>
            <input type="checkbox" checked={f.featured} onChange={(e) => set('featured', e.target.checked)} />
            <span>{t('featured')}</span>
          </label>
        </div>
      </section>

      {preview && card && (
        <section className="adm-section" aria-label={t('preview')}>
          <Preview v={card} equipment={equipment} />
        </section>
      )}

      <div className="adm-actions">
        <button type="submit" className="sh sh--solid" disabled={pending} aria-busy={pending}>
          <Faces>
            <Icon name="check" size={16} />
            {pending ? t('saving') : t('save')}
          </Faces>
        </button>
        <button type="button" className="sh sh--line" onClick={() => setPreview((p) => !p)} disabled={!card} aria-pressed={preview}>
          <Faces>
            <Icon name="eye" size={16} />
            {preview ? t('closePreview') : t('preview')}
          </Faces>
        </button>
        <button type="button" className="sh sh--text" onClick={() => router.push('/admin')} disabled={pending}>
          <Faces>{t('cancel')}</Faces>
        </button>
        {vehicle && (
          <button type="button" className="sh sh--text adm-danger adm-actions-archive" onClick={archive} disabled={pending}>
            <Faces>
              <Icon name="trash" size={15} />
              {t('archive')}
            </Faces>
          </button>
        )}
      </div>
    </form>
  )
}
