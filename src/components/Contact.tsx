import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CONTACT } from '../lib/contact'

// Contact — verified details only. No invented opening hours ("Termin nach
// Vereinbarung"). Form has no backend → opens the user's mail app (mailto).
export default function Contact() {
  const { t } = useTranslation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const field =
    'w-full rounded-[2px] border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-faint focus:border-accent focus:outline-none'

  const details: { label: string; value: string; href?: string; external?: boolean }[] = [
    { label: t('contact.addressLabel'), value: CONTACT.addressFull, href: CONTACT.mapsLink, external: true },
    { label: t('contact.phoneLabel'), value: CONTACT.phoneDisplay, href: CONTACT.tel },
    { label: t('contact.emailLabel'), value: CONTACT.email, href: CONTACT.mailto },
    { label: t('contact.whatsappLabel'), value: 'wa.me/436601999472', href: CONTACT.whatsapp, external: true },
    { label: t('contact.hoursLabel'), value: t('contact.hoursValue') },
  ]

  return (
    <article className="bg-bg">
      <section className="mx-auto max-w-[1100px] px-6 pb-16 pt-28 md:px-10 md:pt-36">
        <p className="eyebrow text-muted">{t('contact.eyebrow')}</p>
        <h1
          className="display mt-5 text-text"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 4.5rem)', textWrap: 'balance' }}
        >
          {t('contact.title')}
        </h1>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* details */}
          <div className="space-y-6">
            {details.map((d) => (
              <div key={d.label} className="border-t border-border pt-4">
                <div className="spec text-[0.62rem] text-faint">{d.label}</div>
                {d.href ? (
                  <a
                    href={d.href}
                    target={d.external ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="mt-1 block text-base text-text transition-colors hover:text-accent"
                  >
                    {d.value}
                  </a>
                ) : (
                  <div className="mt-1 text-base text-text">{d.value}</div>
                )}
              </div>
            ))}
          </div>

          {/* form → mailto (no backend) */}
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              const subject = encodeURIComponent(`Anfrage von ${name || 'Website'}`)
              const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`)
              window.location.href = `${CONTACT.mailto}?subject=${subject}&body=${body}`
            }}
          >
            <input
              className={field}
              placeholder={t('contact.formName')}
              aria-label={t('contact.formName')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              className={field}
              placeholder={t('contact.formEmail')}
              aria-label={t('contact.formEmail')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              className={`${field} min-h-[150px] resize-y`}
              placeholder={t('contact.formMessage')}
              aria-label={t('contact.formMessage')}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button
              type="submit"
              className="rounded-[2px] bg-accent px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-press"
            >
              {t('contact.formSubmit')}
            </button>
            <p className="spec text-[0.6rem] text-faint">{t('contact.formHint')}</p>
          </form>
        </div>
      </section>

      {/* map (Google Maps embed — no API key; geocodes the address) */}
      <section className="px-6 pb-28 md:px-10">
        <div className="mx-auto aspect-[16/9] max-w-[1100px] overflow-hidden border border-border bg-surface">
          <iframe
            title={t('contact.mapTitle')}
            src={CONTACT.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full"
            style={{ border: 0 }}
          />
        </div>
      </section>
    </article>
  )
}
