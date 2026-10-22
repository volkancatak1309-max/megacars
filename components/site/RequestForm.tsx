'use client'
import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { useTranslations } from 'next-intl'
import { SITE, whatsappHref } from '@/lib/site'
import { Icon } from '@/components/ui/Icon'
import { CurtainLink } from './Curtain'
import { ShutterButton } from './Shutter'

export type FormKind = 'contact' | 'financing' | 'tradeIn'

type Option = { value: string; label: string }

export type FormField =
  | { name: string; kind: 'text' | 'email' | 'tel'; required?: boolean; autoComplete?: string; inputMode?: 'numeric' | 'decimal' | 'text'; half?: boolean }
  | { name: string; kind: 'select'; options: Option[]; required?: boolean; half?: boolean }
  | { name: string; kind: 'textarea'; required?: boolean }
  | { name: string; kind: 'choice'; options: Option[] }

/**
 * Real delivery without a server: the request is written out as a finished message and
 * opens either in WhatsApp (to +43 660 6877002) or in the visitor's e-mail program (to
 * megacars@live.at). The form says so before the visitor presses a button, and nothing
 * pretends it has been sent: the visitor sends it there (KARAR-DEFTERI 23.10.2026).
 */
export function RequestForm({
  kind,
  fields,
  headingLevel = 'h2',
  initial = {},
  queryPresets = {},
}: {
  kind: FormKind
  fields: FormField[]
  headingLevel?: 'h2' | 'h3'
  initial?: Record<string, string>
  /** field name → URL parameter whose value preselects that field (if it is a valid option) */
  queryPresets?: Record<string, string>
}) {
  const t = useTranslations('form')
  const id = useId()
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    for (const [field, param] of Object.entries(queryPresets)) {
      const value = query.get(param)
      const el = formRef.current?.elements.namedItem(field)
      if (value && el instanceof HTMLSelectElement && [...el.options].some((o) => o.value === value)) el.value = value
    }
    // presets are read once, on arrival
  }, [])
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const Heading = headingLevel
  const label = (name: string) => t(`${kind}.${name}`)

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const via = ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value === 'email' ? 'email' : 'whatsapp'
    const data = new FormData(form)
    const value = (name: string) => String(data.get(name) ?? '').trim()

    const missing = fields.filter((f) => 'required' in f && f.required && !value(f.name)).map((f) => f.name)
    if (missing.length) {
      setErrors(Object.fromEntries(missing.map((n) => [n, true])))
      ;(form.elements.namedItem(missing[0]) as HTMLElement | null)?.focus()
      return
    }
    setErrors({})

    // "Label: value" for every filled field; the free text goes last, on its own
    const lines = fields
      .filter((f) => f.kind !== 'textarea' && value(f.name))
      .map((f) => {
        const raw = value(f.name)
        const shown = 'options' in f ? (f.options.find((o) => o.value === raw)?.label ?? raw) : raw
        return `${label(f.name)}: ${shown}`
      })
    const free = fields.filter((f) => f.kind === 'textarea' && value(f.name)).map((f) => value(f.name))
    const body = [t(`${kind}.intro`), '', ...lines, ...(free.length ? ['', ...free] : [])].join('\n')

    if (via === 'email') {
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(t(`${kind}.subject`))}&body=${encodeURIComponent(body)}`
      return
    }
    const href = whatsappHref(body)
    const win = window.open(href, '_blank', 'noopener')
    if (!win) window.location.assign(href)
  }

  const control = (f: FormField) => {
    const fid = `${id}-${f.name}`
    const invalid = errors[f.name] || undefined
    const describedBy = invalid ? `${fid}-error` : undefined
    const clear = () => errors[f.name] && setErrors((x) => ({ ...x, [f.name]: false }))
    const optional = !('required' in f && f.required) && f.kind !== 'choice'
    const caption = optional ? t('optional', { label: label(f.name) }) : label(f.name)

    if (f.kind === 'choice') {
      return (
        <fieldset key={f.name} className="rf-choice">
          <legend className="field-label">{caption}</legend>
          <div>
            {f.options.map((o, i) => (
              <label key={o.value} className="rf-pill">
                <input type="radio" name={f.name} value={o.value} defaultChecked={initial[f.name] ? initial[f.name] === o.value : i === 0} />
                <span>{o.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )
    }

    return (
      <div key={f.name} className={`field${'half' in f && f.half ? ' rf-half' : ''}`}>
        <label htmlFor={fid} className="field-label">
          {caption}
        </label>
        {f.kind === 'textarea' ? (
          <textarea id={fid} name={f.name} rows={4} className="field-control" required={f.required} aria-invalid={invalid} aria-describedby={describedBy} onInput={clear} defaultValue={initial[f.name]} />
        ) : f.kind === 'select' ? (
          <select id={fid} name={f.name} className="field-control" required={f.required} aria-invalid={invalid} aria-describedby={describedBy} onChange={clear} defaultValue={initial[f.name] ?? ''}>
            <option value="">{t('choose')}</option>
            {f.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={fid}
            name={f.name}
            type={f.kind}
            className="field-control"
            required={f.required}
            autoComplete={f.autoComplete}
            inputMode={f.inputMode}
            aria-invalid={invalid}
            aria-describedby={describedBy}
            onInput={clear}
            defaultValue={initial[f.name]}
          />
        )}
        {invalid && (
          <p id={`${fid}-error`} className="field-error">
            {t('required', { label: label(f.name) })}
          </p>
        )}
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="rf" aria-labelledby={`${id}-title`}>
      <Heading id={`${id}-title`} className="rf-title d-m">
        {t(`${kind}.title`)}
      </Heading>
      <div className="rf-fields">{fields.map(control)}</div>
      <p className="rf-note">{t('note')}</p>
      <div className="rf-actions">
        <ShutterButton type="submit" name="via" value="whatsapp" kind="solid">
          <Icon name="whatsapp" size={18} />
          {t('viaWhatsapp')}
        </ShutterButton>
        <ShutterButton type="submit" name="via" value="email" kind="line">
          <Icon name="mail" size={18} />
          {t('viaEmail')}
        </ShutterButton>
      </div>
      <p className="rf-privacy">
        {t.rich('privacy', {
          link: (chunks) => <CurtainLink href="/datenschutz">{chunks}</CurtainLink>,
        })}
      </p>
    </form>
  )
}
