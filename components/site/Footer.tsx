import { getTranslations } from 'next-intl/server'
import { SITE, mailHref, routeHref, whatsappHref } from '@/lib/site'
import { Icon } from '@/components/ui/Icon'
import { LinesUp } from './Reveals'
import { ShutterA, ShutterLink } from './Shutter'
import { Logo } from '@/components/brand/Logo'

/** Footer: one sentence, the real contact data, legal links and the Galzura credit. */
export async function Footer() {
  const tc = await getTranslations('common')
  const tl = await getTranslations('location')
  const tf = await getTranslations('footer')
  const tn = await getTranslations('nav')

  return (
    <footer className="ft s-night" aria-labelledby="ft-title">
      <div className="pg wide">
        <Logo sizes="(min-width: 1024px) 158px, 122px" className="ft-brand" />
        <LinesUp as="p" id="ft-title" className="ft-title d-l">
          {tf('title')}
        </LinesUp>
        <div className="ft-cols">
          <div>
            <p className="label">{tl('addressLabel')}</p>
            <p>
              {SITE.street}
              <br />
              {SITE.zip} {SITE.city}, {SITE.region}
            </p>
            <ShutterA href={routeHref} target="_blank" rel="noopener" kind="text">
              {tl('route')}
              <Icon name="arrowRight" size={16} />
            </ShutterA>
          </div>
          <div>
            <p className="label">{tl('hoursLabel')}</p>
            <p className="tabular">
              {tl('weekdays')} 08:00–18:00
              <br />
              {tl('saturday')} 09:00–15:00
              <br />
              {tl('sunday')} {tl('closed')}
            </p>
          </div>
          <div>
            <p className="label">{tl('contactLabel')}</p>
            <div className="ft-links">
              <ShutterA href={SITE.phoneHref} kind="text" className="tabular">
                {SITE.phone}
              </ShutterA>
              <ShutterA href={whatsappHref(tc('whatsappGeneric'))} target="_blank" rel="noopener" kind="text">
                {tc('whatsappWrite')}
              </ShutterA>
              <ShutterA href={mailHref} kind="text">
                {SITE.email}
              </ShutterA>
            </div>
          </div>
        </div>
      </div>
      <p className="ft-word" aria-hidden="true">
        <span>MEGA CARS</span>
      </p>
      <div className="pg wide">
        <div className="ft-base">
          <span>{tf('copyright', { year: new Date().getFullYear() })}</span>
          <span className="ft-legal">
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
      </div>
    </footer>
  )
}
