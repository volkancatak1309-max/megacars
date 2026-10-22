import { getLocale, getTranslations } from 'next-intl/server'
import trDictionary from '@/data/equipment-tr.json'
import type { EquipmentGroup, Vehicle } from '@/lib/types'
import { DrawGroup } from '@/components/motion/Reveal'

const ORDER: EquipmentGroup[] = ['comfort', 'safety', 'media', 'extras']
const TR = trDictionary as Record<string, string>

/**
 * Only the equipment named in the listing, set like a magazine page: each group under
 * a heavy rule with its count, items in columns. German terms come from the listing;
 * Turkish uses a controlled dictionary, and a missing term stays German with lang="de".
 */
export async function Equipment({ equipment }: { equipment: Vehicle['equipment'] }) {
  const t = await getTranslations('detail')
  const locale = await getLocale()
  const groups = ORDER.filter((g) => equipment[g].length > 0)
  if (!groups.length) return null

  return (
    <div className="eq-groups">
      {groups.map((g) => (
        <DrawGroup key={g}>
          <div className="eq-group-head">
            <h3>{t(`equipmentGroups.${g}`)}</h3>
            <span className="tabular">
              <span aria-hidden="true">{String(equipment[g].length).padStart(2, '0')}</span>
              <span className="sr-only">{t('equipmentCount', { count: equipment[g].length })}</span>
            </span>
          </div>
          <ul className="eq-list">
            {equipment[g].map((item) => {
              const translated = locale === 'tr' ? TR[item] : item
              return (
                <li key={item} lang={translated ? undefined : 'de'}>
                  {translated ?? item}
                </li>
              )
            })}
          </ul>
        </DrawGroup>
      ))}
    </div>
  )
}
