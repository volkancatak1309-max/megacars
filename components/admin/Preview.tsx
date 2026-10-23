'use client'
import { useTranslations } from 'next-intl'
import type { CardVehicle } from '@/lib/filter'
import { versionLabel } from '@/lib/format'
import { equipmentLabel } from '@/lib/equipment'
import { CarImage } from '@/components/ui/CarImage'
import { useVehicleLabels } from '@/components/vehicle/labels'

/**
 * "So erscheint das Fahrzeug auf der Website": the list card as the visitor sees it
 * (same classes as components/vehicle/VehicleCard.tsx, without the link) and the key
 * facts underneath. Photos come from the browser's own copies.
 */
export function Preview({ v, equipment }: { v: CardVehicle; equipment: string[] }) {
  const t = useTranslations('admin.form')
  const tv = useTranslations('vehicle')
  const tc = useTranslations('common')
  const label = useVehicleLabels()
  const year = v.firstRegistration.split('/')[1]
  const facts: [string, string | null][] = [
    [tv('registration'), v.firstRegistration],
    [tv('mileage'), label.km(v.mileage)],
    [tv('power'), label.power(v)],
    [tv('fuel'), label.fuel(v)],
    [tv('gearbox'), label.gearbox(v)],
    [tv('body'), label.body(v)],
    [tv('colorBase'), label.color(v.colorBase)],
  ]
  return (
    <div className="adm-preview">
      <p className="adm-preview-lead">{t('previewLead')}</p>
      <div className="adm-preview-grid">
        <span className="vc" data-status={v.status}>
          <span className="vc-frame">
            <CarImage photo={v.cover} alt={label.photoAlt(v, 1, v.photoCount)} sizes="(min-width: 1024px) 420px, 100vw" className="aspect-[4/3] h-full w-full" />
            {v.status !== 'for_sale' && (
              <span className="vc-status status-chip" data-status={v.status}>
                {tv(`statusValues.${v.status}`)}
              </span>
            )}
            <span className="vc-photos tabular">{tc('photos', { count: v.photoCount })}</span>
          </span>
          <span className="vc-body">
            <span className="vc-top">
              <span className="vc-make">{v.make}</span>
              {year && <span className="vc-year tabular">{year}</span>}
            </span>
            <span className="vc-model">{v.model}</span>
            {v.version && <span className="vc-version">{versionLabel(v.version, label.locale)}</span>}
            <span className="vc-rule" aria-hidden="true" />
            <span className="vc-chain tabular">{label.chain(v)}</span>
            <span className="vc-foot">
              <span className="vc-price tabular">{label.price(v.price)}</span>
            </span>
          </span>
        </span>
        <div>
          <dl className="adm-facts">
            {facts
              .filter(([, value]) => value)
              .map(([k, value]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd className="tabular">{value}</dd>
                </div>
              ))}
          </dl>
          {equipment.length > 0 && (
            <p className="adm-preview-eq">
              {equipment
                .map((k) => equipmentLabel(k, label.locale))
                .filter(Boolean)
                .join(' · ')}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
