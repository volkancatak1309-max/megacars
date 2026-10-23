/** Address part of a name: "Mercedes-Benz S 560" → "mercedes-benz-s-560". */
export const slugify = (s: string) =>
  s
    .normalize('NFKD')
    .replace(/ß/g, 'ss')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** Same pattern as the migrated listings: make-model-version-<6 characters of the id>. */
export const vehicleSlug = (v: { id: string; make: string; model: string; version: string | null }) =>
  [slugify(v.make), slugify(v.model), v.version ? slugify(v.version) : '', v.id.replace(/-/g, '').slice(0, 6)].filter(Boolean).join('-')
