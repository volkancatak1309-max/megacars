import { useLocale, useTranslations } from 'next-intl'
import type { CardVehicle } from '@/lib/filter'
import { formatKm, formatNumber, formatPower, formatPrice, inSentence, vehicleName } from '@/lib/format'

/** Localised labels for vehicle values; works in server and client components. */
export function useVehicleLabels() {
  const t = useTranslations('vehicle')
  const locale = useLocale()
  const mapped = (group: 'colorValues' | 'materialValues', value: string | null) => {
    if (!value) return null
    const key = `${group}.${value}`
    return t.has(key) ? t(key) : value
  }
  return {
    locale,
    price: (n: number) => formatPrice(n, locale),
    km: (n: number) => formatKm(n, locale),
    power: (v: Pick<CardVehicle, 'powerKw' | 'powerPs'>) => formatPower(v.powerKw, v.powerPs, locale),
    fuel: (v: Pick<CardVehicle, 'fuel'>) => (v.fuel ? t(`fuelValues.${v.fuel}`) : null),
    gearbox: (v: Pick<CardVehicle, 'transmission'>) => (v.transmission ? t(`gearboxValues.${v.transmission}`) : null),
    body: (v: Pick<CardVehicle, 'body'>) => (v.body ? t(`bodyValues.${v.body}`) : null),
    color: (value: string | null) => mapped('colorValues', value),
    material: (value: string | null) => mapped('materialValues', value),
    /** "02/2019 · 148.000 km · 469 PS · Benzin · Automatik" */
    chain: (v: CardVehicle) =>
      [
        v.firstRegistration,
        formatKm(v.mileage, locale),
        v.powerPs ? `${formatNumber(v.powerPs, locale)} PS` : null,
        v.fuel ? t(`fuelValues.${v.fuel}`) : null,
        v.transmission ? t(`gearboxValues.${v.transmission}`) : null,
      ]
        .filter(Boolean)
        .join(' · '),
    photoAlt: (v: Pick<CardVehicle, 'make' | 'model' | 'version' | 'colorBase'>, index: number, total: number) => {
      const name = [vehicleName(v), v.version].filter(Boolean).join(' ')
      const color = mapped('colorValues', v.colorBase)
      return color
        ? t('photoAlt', { name, color: inSentence(color, locale), index, total })
        : t('photoAltNoColor', { name, index, total })
    },
  }
}
