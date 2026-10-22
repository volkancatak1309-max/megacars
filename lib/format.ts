const numberLocale = (locale: string) => (locale === 'tr' ? 'tr-TR' : 'de-DE')

export const formatNumber = (n: number, locale: string) => new Intl.NumberFormat(numberLocale(locale)).format(n)

/** "64.900 €" in both DE and TR (DESIGN.md §13) */
export const formatPrice = (n: number, locale: string) => `${formatNumber(n, locale)} €`

export const formatKm = (n: number, locale: string) => `${formatNumber(n, locale)} km`

export const formatPower = (kw: number | null, ps: number | null, locale: string) => {
  if (kw && ps) return `${formatNumber(kw, locale)} kW (${formatNumber(ps, locale)} PS)`
  if (ps) return `${formatNumber(ps, locale)} PS`
  if (kw) return `${formatNumber(kw, locale)} kW`
  return null
}

export const formatDecimal = (n: number, locale: string) =>
  new Intl.NumberFormat(numberLocale(locale), { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(n)

export const vehicleName = (v: { make: string; model: string }) => `${v.make} ${v.model}`
export const vehicleFullName = (v: { make: string; model: string; version: string | null }) =>
  [v.make, v.model, v.version].filter(Boolean).join(' ')
