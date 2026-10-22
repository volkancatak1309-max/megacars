import { getLocale, getTranslations } from 'next-intl/server'
import { SITE, mailHref, routeHref, whatsappHref } from '@/lib/site'
import { stockStats } from '@/lib/inventory'
import { Icon } from '@/components/ui/Icon'
import { Ticker } from '@/components/motion/Reveal'
import { ShutterA, ShutterLink } from './Shutter'
import { protoStock } from './data'

/** Verified facts only (sources: docs/KARAR-DEFTERI.md, FAZ 4A records). */
export async function ProtoFacts({ className = '' }: { className?: string }) {
  const t = await getTranslations('trust')
  const tl = await getTranslations('location')
  const tp = await getTranslations('proto')
  const locale = await getLocale()
  const stock = await protoStock()
  return (
    <dl className={`pf ${className}`}>
      <div>
        <dt>{t('registerLabel')}</dt>
        <dd>
          {SITE.legalName}
          <span>
            {SITE.register} · {SITE.court}
          </span>
        </dd>
      </div>
      <div>
        <dt>{t('showroomLabel')}</dt>
        <dd>
          {SITE.street}
          <span>
            {SITE.zip} {SITE.city}
          </span>
        </dd>
      </div>
      <div>
        <dt>{t('hoursLabel')}</dt>
        <dd className="tabular">
          {tl('weekdays')} 08:00–18:00
          <span>{tl('saturday')} 09:00–15:00</span>
        </dd>
      </div>
      <div>
        <dt>{t('stockLabel')}</dt>
        <dd>
          <Ticker value={stockStats.count} locale={locale} className="pf-count" />
          <span className="tabular">{tp('range', { min: stock.min, max: stock.max })}</span>
        </dd>
      </div>
    </dl>
  )
}

/** The three services that are confirmed today (financing, trade-in … stay pending). */
export async function ProtoServices({ className = '', kind = 'line' }: { className?: string; kind?: 'line' | 'solid' }) {
  const t = await getTranslations('services')
  const tc = await getTranslations('common')
  const rows = [
    { title: t('visitTitle'), text: t('visitText'), link: t('visitLink'), href: routeHref, ext: true },
    { title: t('driveTitle'), text: t('driveText'), link: t('driveLink'), href: whatsappHref(tc('whatsappTestDriveGeneric')), ext: true },
    { title: t('adviceTitle'), text: t('adviceText'), link: t('adviceLink'), href: mailHref, ext: false },
  ]
  return (
    <ul className={`ps ${className}`}>
      {rows.map((r) => (
        <li key={r.title}>
          <h3>{r.title}</h3>
          <p>{r.text}</p>
          <ShutterA href={r.href} kind={kind} {...(r.ext ? { target: '_blank', rel: 'noopener' } : {})}>
            {r.link}
            <Icon name="arrowRight" size={16} />
          </ShutterA>
        </li>
      ))}
    </ul>
  )
}

/** Upper part of the footer: one sentence, real contact data, Galzura credit. */
export async function ProtoFooter({ title, className = '' }: { title: string; className?: string }) {
  const tc = await getTranslations('common')
  const tl = await getTranslations('location')
  const tf = await getTranslations('footer')
  const tn = await getTranslations('nav')
  return (
    <footer className={`pfoot ${className}`}>
      <div className="pg">
        <p className="pfoot-title">{title}</p>
        <div className="pfoot-cols">
          <div>
            <p className="pfoot-label">{tl('addressLabel')}</p>
            <p>
              {SITE.street}
              <br />
              {SITE.zip} {SITE.city}, {SITE.region}
            </p>
            <ShutterA href={routeHref} target="_blank" rel="noopener" kind="text">
              {tl('route')}
            </ShutterA>
          </div>
          <div>
            <p className="pfoot-label">{tl('hoursLabel')}</p>
            <p className="tabular">
              {tl('weekdays')} 08:00–18:00
              <br />
              {tl('saturday')} 09:00–15:00
              <br />
              {tl('sunday')} {tl('closed')}
            </p>
          </div>
          <div>
            <p className="pfoot-label">{tl('contactLabel')}</p>
            <ShutterA href={SITE.phoneHref} kind="text" className="tabular">
              {SITE.phone}
            </ShutterA>
            <br />
            <ShutterA href={whatsappHref(tc('whatsappGeneric'))} target="_blank" rel="noopener" kind="text">
              {tc('whatsappWrite')}
            </ShutterA>
            <br />
            <ShutterA href={mailHref} kind="text">
              {SITE.email}
            </ShutterA>
          </div>
        </div>
      </div>
      <p className="pfoot-word" aria-hidden="true">
        MEGA CARS
      </p>
      <div className="pfoot-base pg">
        <span>{tf('copyright', { year: new Date().getFullYear() })}</span>
        <span className="pfoot-legal">
          <ShutterLink href="/impressum" kind="text">
            {tn('imprint')}
          </ShutterLink>
          <ShutterLink href="/datenschutz" kind="text">
            {tn('privacy')}
          </ShutterLink>
        </span>
        <ShutterA href={SITE.galzura} target="_blank" rel="noopener" kind="text">
          {tf('website')}
        </ShutterA>
      </div>
    </footer>
  )
}
