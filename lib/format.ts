const NUMBER_LOCALE: Record<string, string> = { de: 'de-DE', en: 'en-GB', tr: 'tr-TR' }
export const numberLocale = (locale: string) => NUMBER_LOCALE[locale] ?? 'de-DE'

export const formatNumber = (n: number, locale: string) => new Intl.NumberFormat(numberLocale(locale)).format(n)

/** "64.900 €" in DE and TR (DESIGN.md §13), "€64,900" in EN */
export const formatPrice = (n: number, locale: string) => (locale === 'en' ? `€${formatNumber(n, locale)}` : `${formatNumber(n, locale)} €`)

export const formatKm = (n: number, locale: string) => `${formatNumber(n, locale)} km`

export const formatPower = (kw: number | null, ps: number | null, locale: string) => {
  if (kw && ps) return `${formatNumber(kw, locale)} kW (${formatNumber(ps, locale)} PS)`
  if (ps) return `${formatNumber(ps, locale)} PS`
  if (kw) return `${formatNumber(kw, locale)} kW`
  return null
}

export const formatDecimal = (n: number, locale: string) =>
  new Intl.NumberFormat(numberLocale(locale), { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(n)

/** Colour names sit mid-sentence in alt texts: lower case in EN and TR, German nouns keep their capital. */
export const inSentence = (word: string, locale: string) => (locale === 'de' ? word : word.toLocaleLowerCase(locale))

export const vehicleName = (v: { make: string; model: string }) => `${v.make} ${v.model}`
export const vehicleFullName = (v: { make: string; model: string; version: string | null }) =>
  [v.make, v.model, v.version].filter(Boolean).join(' ')
