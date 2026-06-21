import type { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'
import { CONTACT } from '../lib/contact'

type Kind = 'impressum' | 'datenschutz' | 'agb'

function ImpressumBody({ t }: { t: TFunction }) {
  const ph = t('legal.placeholder')
  const rows: { l: string; v?: string; href?: string; placeholder?: boolean }[] = [
    { l: t('legal.impressum.company'), v: 'Mega Cars' },
    { l: t('legal.impressum.address'), v: CONTACT.addressFull },
    { l: t('legal.impressum.phone'), v: CONTACT.phoneDisplay, href: CONTACT.tel },
    { l: t('legal.impressum.email'), v: CONTACT.email, href: CONTACT.mailto },
    { l: t('legal.impressum.owner'), placeholder: true },
    { l: t('legal.impressum.firmenbuch'), placeholder: true },
    { l: t('legal.impressum.uid'), placeholder: true },
    { l: t('legal.impressum.gewerbe'), placeholder: true },
  ]
  return (
    <>
      <p className="mt-6 text-sm leading-relaxed text-muted">{t('legal.impressum.intro')}</p>
      <dl className="mt-10 divide-y divide-border border-t border-border">
        {rows.map((r) => (
          <div key={r.l} className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[200px_1fr] sm:gap-6">
            <dt className="spec text-[0.66rem] text-muted">{r.l}</dt>
            <dd className={r.placeholder ? 'text-sm italic text-faint' : 'text-sm text-text'}>
              {r.placeholder ? ph : r.href ? (
                <a href={r.href} className="transition-colors hover:text-accent">
                  {r.v}
                </a>
              ) : (
                r.v
              )}
            </dd>
          </div>
        ))}
      </dl>
    </>
  )
}

function SectionsBody({ t, kind }: { t: TFunction; kind: Kind }) {
  const sections = t(`legal.${kind}.sections`, { returnObjects: true }) as unknown as {
    h: string
    b: string
  }[]
  return (
    <div className="mt-10 space-y-10">
      {sections.map((s) => (
        <div key={s.h}>
          <h2 className="text-base font-medium text-text">{s.h}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{s.b}</p>
        </div>
      ))}
    </div>
  )
}

// Legal pages (demo). Real data filled; unknown registry/tax numbers shown as
// faint "[wird ergänzt]" placeholders — never fabricated.
export default function Legal({ kind }: { kind: Kind }) {
  const { t } = useTranslation()
  return (
    <article className="bg-bg">
      <section className="mx-auto max-w-[760px] px-6 pb-28 pt-28 md:px-10 md:pt-36">
        <p className="eyebrow text-muted">{t('legal.eyebrow')}</p>
        <h1
          className="display mt-5 break-words text-text"
          style={{ fontSize: 'clamp(1.35rem, 2.5vw, 2.1rem)' }}
        >
          {t(`legal.${kind}.title`)}
        </h1>
        {kind !== 'impressum' && (
          <p className="spec mt-4 text-[0.62rem] text-faint">{t('legal.demoNote')}</p>
        )}
        {kind === 'impressum' ? <ImpressumBody t={t} /> : <SectionsBody t={t} kind={kind} />}
      </section>
    </article>
  )
}
