// The equipment checklist in three languages (data/equipment.json). The database stores
// only the keys; every page shows the words of its own language (Volkan, 23.10.2026).
import list from '@/data/equipment.json'
import type { EquipmentGroup } from './types'

export interface EquipmentItem {
  key: string
  group: EquipmentGroup
  de: string
  en: string
  tr: string
}

export const EQUIPMENT = list as EquipmentItem[]
export const EQUIPMENT_GROUPS: EquipmentGroup[] = ['comfort', 'safety', 'media', 'extras']

const byKey = new Map(EQUIPMENT.map((e) => [e.key, e]))
const byGerman = new Map(EQUIPMENT.map((e) => [e.de, e.key]))

export const equipmentItem = (key: string) => byKey.get(key) ?? null
export const equipmentLabel = (key: string, locale: string) => {
  const item = byKey.get(key)
  if (!item) return null
  return (item as unknown as Record<string, string>)[locale] ?? item.de
}
/** German listing wording → key (migration of data/inventory.json). */
export const equipmentKeyOf = (german: string) => byGerman.get(german) ?? null

/** Keys grouped and ordered as the checklist shows them. */
export function groupEquipment(keys: string[]): { group: EquipmentGroup; keys: string[] }[] {
  const set = new Set(keys)
  return EQUIPMENT_GROUPS.map((group) => ({ group, keys: EQUIPMENT.filter((e) => e.group === group && set.has(e.key)).map((e) => e.key) })).filter((g) => g.keys.length)
}
