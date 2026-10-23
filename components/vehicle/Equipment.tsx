import { getLocale, getTranslations } from 'next-intl/server'
import { equipmentLabel, groupEquipment } from '@/lib/equipment'
import { DrawGroup } from '@/components/motion/Reveal'

/**
 * Only the equipment the dealer ticked, set like a magazine page: each group under a
 * heavy rule with its count, items in columns. The words come from the three-language
 * checklist (data/equipment.json), so every page shows its own language only.
 */
export async function Equipment({ equipment }: { equipment: string[] }) {
  const t = await getTranslations('detail')
  const locale = await getLocale()
  const groups = groupEquipment(equipment)
  if (!groups.length) return null

  return (
    <div className="eq-groups">
      {groups.map((g) => (
        <DrawGroup key={g.group}>
          <div className="eq-group-head">
            <h3>{t(`equipmentGroups.${g.group}`)}</h3>
            <span className="tabular">
              <span aria-hidden="true">{String(g.keys.length).padStart(2, '0')}</span>
              <span className="sr-only">{t('equipmentCount', { count: g.keys.length })}</span>
            </span>
          </div>
          <ul className="eq-list">
            {g.keys.map((key) => (
              <li key={key}>{equipmentLabel(key, locale)}</li>
            ))}
          </ul>
        </DrawGroup>
      ))}
    </div>
  )
}
