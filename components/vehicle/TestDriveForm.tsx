'use client'
import { useId, useState, type FormEvent } from 'react'
import { useTranslations } from 'next-intl'
import { SITE, whatsappHref } from '@/lib/site'
import { Icon } from '@/components/ui/Icon'
import { ShutterA, ShutterButton } from '@/components/site/Shutter'

const DATE_LOCALE: Record<string, string> = { de: 'de-AT', en: 'en-GB', tr: 'tr-TR' }

export type VehicleRef = {
  name: string
  price: string
  url: string
}

/**
 * Probefahrt request. There is no server yet, so the form says plainly that it opens a
 * prepared WhatsApp message which the visitor sends themselves; there is no fake
 * "sent" screen.
 */
export function TestDriveForm({ vehicle, headingLevel = 'h2' }: { vehicle: VehicleRef; headingLevel?: 'h2' | 'h3' }) {
  const t = useTranslations('testDrive')
  const tc = useTranslations('common')
  const id = useId()
  const [nameError, setNameError] = useState(false)
  const Heading = headingLevel

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    if (!name) {
      setNameError(true)
      ;(e.currentTarget.elements.namedItem('name') as HTMLInputElement | null)?.focus()
      return
    }
    setNameError(false)
    const date = String(data.get('date') ?? '')
    const slot = String(data.get('slot') ?? '')
    const phone = String(data.get('phone') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    const lines = [
      t('messageIntro', vehicle),
      '',
      t('messageName', { value: name }),
      date && t('messageDate', { value: new Date(`${date}T12:00:00`).toLocaleDateString(DATE_LOCALE[document.documentElement.lang] ?? 'de-AT') }),
      slot && t('messageSlot', { value: slot }),
      phone && t('messagePhone', { value: phone }),
      message && `\n${message}`,
    ].filter(Boolean)
    const href = whatsappHref([lines[0], '', ...lines.slice(1)].join('\n'))
    const win = window.open(href, '_blank', 'noopener')
    if (!win) window.location.assign(href)
  }

  const today = new Date().toISOString().slice(0, 10)

  return (
    <form onSubmit={submit} noValidate className="tdf" aria-labelledby={`${id}-title`}>
      <Heading id={`${id}-title`} className="tdf-title d-m">
        {t('title')}
      </Heading>
      <div className="field">
        <label htmlFor={`${id}-name`} className="field-label">
          {t('name')}
        </label>
        <input
          id={`${id}-name`}
          name="name"
          autoComplete="name"
          required
          aria-invalid={nameError || undefined}
          aria-describedby={nameError ? `${id}-name-error` : undefined}
          onInput={() => nameError && setNameError(false)}
          className="field-control"
        />
        {nameError && (
          <p id={`${id}-name-error`} className="field-error">
            {t('nameError')}
          </p>
        )}
      </div>
      <div className="tdf-row">
        <div className="field">
          <label htmlFor={`${id}-date`} className="field-label">
            {t('dateOptional')}
          </label>
          <input id={`${id}-date`} name="date" type="date" min={today} className="field-control" />
        </div>
        <div className="field">
          <label htmlFor={`${id}-slot`} className="field-label">
            {t('slot')}
          </label>
          <select id={`${id}-slot`} name="slot" defaultValue={t('slotFlexible')} className="field-control">
            <option>{t('slotMorning')}</option>
            <option>{t('slotAfternoon')}</option>
            <option>{t('slotFlexible')}</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor={`${id}-phone`} className="field-label">
          {t('phone')}
        </label>
        <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" className="field-control" />
      </div>
      <div className="field">
        <label htmlFor={`${id}-message`} className="field-label">
          {t('message')}
        </label>
        <textarea id={`${id}-message`} name="message" rows={3} className="field-control" />
      </div>
      <p className="tdf-note">{t('note')}</p>
      <div>
        <ShutterButton type="submit" kind="solid">
          <Icon name="whatsapp" size={18} />
          {t('submit')}
        </ShutterButton>
      </div>
      <p className="tdf-direct">
        {t('direct')}
        <ShutterA href={SITE.phoneHref} kind="text">
          {tc('call')}
        </ShutterA>
        <ShutterA href={whatsappHref(t('messageIntro', vehicle))} target="_blank" rel="noopener" kind="text">
          WhatsApp
        </ShutterA>
      </p>
    </form>
  )
}
