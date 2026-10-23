const NUMBER_LOCALE: Record<string, string> = { de: 'de-DE', en: 'en-GB', tr: 'tr-TR' }
export const numberLocale = (locale: string) => NUMBER_LOCALE[locale] ?? 'de-DE'

export const formatNumber = (n: number, locale: string) => new Intl.NumberFormat(numberLocale(locale)).format(n)

/** "64.900 €" in DE and TR (DESIGN.md §13), "€64,900" in EN */
export const formatPrice = (n: number, locale: string) => (locale === 'en' ? `€${formatNumber(n, locale)}` : `${formatNumber(n, locale)} €`)

export const formatKm = (n: number, locale: string) => `${formatNumber(n, locale)} km`

// metric horsepower in each language's own unit name (Volkan, 23.10.2026: no foreign words)
const HP: Record<string, string> = { de: 'PS', en: 'hp', tr: 'BG' }
export const hpUnit = (locale: string) => HP[locale] ?? 'PS'
export const formatPower = (kw: number | null, ps: number | null, locale: string) => {
  const hp = hpUnit(locale)
  if (kw && ps) return `${formatNumber(kw, locale)} kW (${formatNumber(ps, locale)} ${hp})`
  if (ps) return `${formatNumber(ps, locale)} ${hp}`
  if (kw) return `${formatNumber(kw, locale)} kW`
  return null
}

export const formatDecimal = (n: number, locale: string) =>
  new Intl.NumberFormat(numberLocale(locale), { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(n)

/** Colour names sit mid-sentence in alt texts: lower case in EN and TR, German nouns keep their capital. */
export const inSentence = (word: string, locale: string) => (locale === 'de' ? word : word.toLocaleLowerCase(locale))

export const vehicleName = (v: { make: string; model: string }) => `${v.make} ${v.model}`

// The listing's version line mixes trim names (kept) with ordinary German words: those
// get the page language (Volkan, 23.10.2026). EN also gets its decimal point.
const VERSION_WORDS: Record<string, [RegExp, string][]> = {
  en: [
    [/\bAut\.(?=\s|$)/g, 'automatic'],
    [/\(7 Sitze\)/g, '(7 seats)'],
    [/Stretchlimousine/g, 'stretch limousine'],
    [/M-Paket/g, 'M package'],
    [/\bAllrad\b/g, 'all-wheel drive'],
    [/(\d),(\d)/g, '$1.$2'],
  ],
  tr: [
    [/\bAut\.(?=\s|$)/g, 'otomatik'],
    [/\(7 Sitze\)/g, '(7 koltuk)'],
    [/Stretchlimousine/g, 'uzatılmış limuzin'],
    [/M-Paket/g, 'M paketi'],
    [/\bAllrad\b/g, 'dört çeker'],
    [/\bFacelift\b/g, 'makyajlı'],
  ],
}
export const versionLabel = (version: string | null, locale: string) => {
  if (!version) return version
  let s = version
  for (const [re, to] of VERSION_WORDS[locale] ?? []) s = s.replace(re, to)
  return s
}
export const vehicleFullName = (v: { make: string; model: string; version: string | null }, locale = 'de') =>
  [v.make, v.model, versionLabel(v.version, locale)].filter(Boolean).join(' ')
