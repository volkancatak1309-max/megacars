import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import { CarImage } from '@/components/ui/CarImage'
import { Icon } from '@/components/ui/Icon'
import { CurtainLink } from '@/components/proto/Curtain'
import { NachtHero } from '@/components/proto/NachtHero'
import { BlockReveal, ClipReveal, LinesUp } from '@/components/proto/Reveals'
import { ProtoFacts, ProtoFooter, ProtoServices } from '@/components/proto/Sections'
import { ShutterLink } from '@/components/proto/Shutter'
import { protoCars } from '@/components/proto/data'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('proto')
  return { title: `${t('word')} C · ${t('cName')} – Mega Cars`, description: t('cDesc') }
}

export default async function NachtPage({ params }: PageProps<'/[locale]/prototyp/c'>) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = await getTranslations('proto')
  const th = await getTranslations('hero')
  const cars = await protoCars()

  return (
    <>
      <NachtHero title={t('cHeroTitle')} cta={t('allVehicles')} scroll={t('cScroll')} label={th('videoLabel')} />

      <section className="rc-intro" aria-label={t('cIntro')}>
        <div className="pg">
          <BlockReveal as="p" className="rc-intro-text">
            {t('cIntro')}
          </BlockReveal>
        </div>
      </section>

      <section className="rc-feat" aria-labelledby="rc-feat-title">
        <div className="pg">
          <LinesUp id="rc-feat-title" className="rc-h2">
            {t('cFeaturedTitle')}
          </LinesUp>
        </div>
        <ol className="rc-list pg">
          {cars.map((car, k) => (
            <li key={car.id} className={k % 2 ? 'is-flip' : undefined}>
              <CurtainLink href={{ pathname: '/prototyp/c/[slug]', params: { slug: car.slug } }} className="rc-card" data-cursor>
                <ClipReveal className="rc-card-frame" from={k % 2 ? 'left' : 'bottom'}>
                  <CarImage photo={car.cover} alt={car.alt} sizes="(min-width: 1024px) 58vw, 100vw" className="aspect-[4/3] h-full w-full" />
                </ClipReveal>
                <span className="rc-card-text">
                  <span className="rc-card-make">{car.make}</span>
                  <span className="rc-card-model">{car.model}</span>
                  <span className="rc-card-rule" aria-hidden="true" />
                  <span className="rc-card-chain tabular">{car.chain}</span>
                  <span className="rc-card-price tabular">{car.price}</span>
                </span>
              </CurtainLink>
            </li>
          ))}
        </ol>
        <div className="pg rc-feat-more">
          <ShutterLink href="/fahrzeuge" kind="line">
            {t('allVehicles')}
            <Icon name="arrowRight" size={18} />
          </ShutterLink>
        </div>
      </section>

      <section className="rc-facts" aria-labelledby="rc-facts-title">
        <div className="pg">
          <LinesUp id="rc-facts-title" className="rc-h2">
            {t('cFactsTitle')}
          </LinesUp>
          <ProtoFacts className="rc-facts-list" />
        </div>
      </section>

      <section className="rc-red" aria-labelledby="rc-red-title">
        <div className="pg">
          <LinesUp id="rc-red-title" className="rc-h2">
            {t('cRedTitle')}
          </LinesUp>
          <ProtoServices className="rc-services" kind="solid" />
        </div>
      </section>

      <ProtoFooter title={t('cFootTitle')} className="rc-foot" />
    </>
  )
}
