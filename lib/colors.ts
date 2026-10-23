import colors from '@/data/colors.json'

type Entry = { de: string; en: string; tr: string }
const TABLE = colors as unknown as Record<string, Entry | string>

/** The manufacturer's paint name in the page language (data/colors.json); unknown names stay as listed. */
export function colorName(raw: string | null, locale: string): string | null {
  if (!raw) return null
  const e = TABLE[raw]
  if (!e || typeof e === 'string') return raw
  return e[locale as keyof Entry] ?? raw
}
