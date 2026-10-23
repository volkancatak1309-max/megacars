'use client'
import { useMemo, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { EQUIPMENT, EQUIPMENT_GROUPS } from '@/lib/equipment'

/** The three-language checklist: grouped boxes with a quick search, counts per group. */
export function EquipmentPicker({ value, onChange }: { value: string[]; onChange: (keys: string[]) => void }) {
  const t = useTranslations('admin.form')
  const td = useTranslations('detail')
  const locale = useLocale() as 'de' | 'tr'
  const [q, setQ] = useState('')
  const selected = useMemo(() => new Set(value), [value])
  const needle = q.trim().toLocaleLowerCase(locale)
  const toggle = (key: string) => onChange(selected.has(key) ? value.filter((k) => k !== key) : [...value, key])

  return (
    <div className="adm-eq">
      <div className="adm-eq-tools">
        <input
          type="search"
          className="field-control"
          placeholder={t('equipmentSearch')}
          aria-label={t('equipmentSearch')}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <span className="adm-eq-count tabular">{t('equipmentCount', { count: value.length })}</span>
      </div>
      {EQUIPMENT_GROUPS.map((group) => {
        const items = EQUIPMENT.filter((e) => e.group === group && (!needle || e[locale].toLocaleLowerCase(locale).includes(needle)))
        if (!items.length) return null
        const on = items.filter((e) => selected.has(e.key)).length
        return (
          <fieldset key={group} className="adm-eq-group">
            <legend>
              {td(`equipmentGroups.${group}`)}
              <span className="tabular"> {on}/{items.length}</span>
            </legend>
            <div className="adm-eq-grid">
              {items.map((e) => (
                <label key={e.key} className="adm-check" data-on={selected.has(e.key) || undefined}>
                  <input type="checkbox" checked={selected.has(e.key)} onChange={() => toggle(e.key)} />
                  <span>{e[locale]}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )
      })}
    </div>
  )
}
