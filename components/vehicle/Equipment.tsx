import { getLocale, getTranslations } from 'next-intl/server'
import trDictionary from '@/data/equipment-tr.json'
import type { EquipmentGroup, Vehicle } from '@/lib/types'
import { Icon } from '@/components/ui/Icon'

const ORDER: EquipmentGroup[] = ['comfort', 'safety', 'media', 'extras']
const TR = trDictionary as Record<string, string>

/**
 * Only the equipment named in the listing. German terms come from the listing; Turkish
 * uses a controlled dictionary, and a term missing from it stays German with lang="de".
 */
export async function Equipment({ equipment }: { equipment: Vehicle['equipment'] }) {
  const t = await getTranslations('detail')
  const locale = await getLocale()
  const groups = ORDER.filter((g) => equipment[g].length > 0)
  if (!groups.length) return null

  return (
    <div className="border-b border-line">
      {groups.map((g, i) => (
        <details key={g} className="disclosure border-t border-line" open={i === 0}>
          <summary className="flex min-h-16 items-center justify-between gap-4 py-4">
            <span className="t-h3">{t(`equipmentGroups.${g}`)}</span>
            <span className="flex items-center gap-4 text-ink-3">
              <span className="tabular">{equipment[g].length}</span>
              <Icon name="chevronDown" size={20} />
            </span>
          </summary>
          <ul className="gap-x-10 pb-8 sm:columns-2 lg:columns-3">
            {equipment[g].map((item) => {
              const translated = locale === 'tr' ? TR[item] : item
              return (
                <li key={item} lang={translated ? undefined : 'de'} className="flex break-inside-avoid gap-3 py-1.5 text-ink-2">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-line-strong" />
                  {translated ?? item}
                </li>
              )
            })}
          </ul>
        </details>
      ))}
    </div>
  )
}
