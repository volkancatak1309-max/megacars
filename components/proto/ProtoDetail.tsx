import { getTranslations } from 'next-intl/server'
import { SITE, whatsappHref } from '@/lib/site'
import { CarImage } from '@/components/ui/CarImage'
import { Icon } from '@/components/ui/Icon'
import { ShutterA, ShutterLink } from './Shutter'
import type { ProtoCar } from './data'

/**
 * First screen of a vehicle page, shared by the prototypes and styled per variant.
 * Gallery after Turo (Mobbin: main photo + two stacked photos + "all photos"); mobile
 * contact bar after Redfin / Insight Timer (price left, one strong action right).
 * The photos open with the counter-slide of Animmaster Page Transitions 5.
 */
export async function ProtoDetail({ variant, car, url }: { variant: 'a' | 'b' | 'c'; car: ProtoCar; url: string }) {
  const tp = await getTranslations('proto')
  const tc = await getTranslations('common')
  const td = await getTranslations('detail')
  const testDrive = whatsappHref(`${tc('whatsappTestDriveGeneric')} ${car.name}, ${car.price}. ${url}`)
  const ask = whatsappHref(td('whatsappMessage', { name: car.name, price: car.price, url }))
  const side = car.photos.filter((p) => p !== car.cover).slice(0, 2)

  return (
    <article className="pd" aria-labelledby="pd-title">
      <div className="pd-in pg">
        <div className="pd-back">
          <ShutterLink href={`/prototyp/${variant}`} kind="text">
            <Icon name="arrowRight" size={16} style={{ transform: 'rotate(180deg)' }} />
            {tp('back')}
          </ShutterLink>
        </div>

        <header className="pd-head">
          <p className="pd-make">{car.make}</p>
          <h1 id="pd-title" className="pd-model">
            <span className="mline rise">
              <span>{car.model}</span>
            </span>
          </h1>
          {car.version && <p className="pd-version">{car.version}</p>}
        </header>

        <div className="pd-gallery">
          <div className="pd-main pd-slide">
            <div className="pd-slide-in">
              <CarImage photo={car.cover} alt={car.alt} sizes="(min-width: 1024px) 50vw, 100vw" priority className="aspect-[4/3] h-full w-full" />
            </div>
          </div>
          {side.map((p, i) => (
            <div key={p.src} className="pd-side pd-slide" style={{ ['--i' as string]: i + 1 }}>
              <div className="pd-slide-in">
                <CarImage photo={p} alt="" sizes="(min-width: 1024px) 24vw, 50vw" className="aspect-[4/3] h-full w-full" />
              </div>
            </div>
          ))}
          <ShutterLink href={{ pathname: '/fahrzeuge/[slug]', params: { slug: car.slug } }} kind="solid" className="pd-all">
            {tp('allPhotos', { count: car.photos.length })}
          </ShutterLink>
        </div>

        <div className="pd-info">
          <p className="pd-price">
            <span className="pd-price-label">{tc('price')}</span>
            <span className="pd-price-value tabular">{car.price}</span>
          </p>
          <dl className="pd-facts">
            {car.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd className="tabular">{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="pd-cta">
            <ShutterA href={testDrive} target="_blank" rel="noopener" kind="solid">
              <Icon name="calendar" size={18} />
              {td('testDrive')}
            </ShutterA>
            <ShutterA href={ask} target="_blank" rel="noopener" kind="line">
              <Icon name="whatsapp" size={18} />
              {tc('whatsapp')}
            </ShutterA>
            <ShutterA href={SITE.phoneHref} kind="line">
              <Icon name="phone" size={18} />
              {tc('call')}
            </ShutterA>
          </div>
        </div>
      </div>

      <div className="pd-bar" role="region" aria-label={td('keyFacts')}>
        <p className="pd-bar-price tabular">{car.price}</p>
        <ShutterA href={SITE.phoneHref} kind="line" aria-label={tc('call')} className="pd-bar-icon">
          <Icon name="phone" size={18} />
        </ShutterA>
        <ShutterA href={testDrive} target="_blank" rel="noopener" kind="solid">
          {tc('testDriveShort')}
        </ShutterA>
      </div>
    </article>
  )
}
