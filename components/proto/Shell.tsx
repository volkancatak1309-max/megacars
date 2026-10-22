import { getTranslations } from 'next-intl/server'
import { ProtoLoader } from './Loader'
import { CurtainProvider } from './Curtain'
import { ProtoHeader } from './ProtoHeader'
import { ViewCursor, Grain } from './Chrome'

/** Everything a prototype shares: first-visit loader, red curtain, top bar, cursor, grain. */
export async function ProtoShell({ variant, fonts, children }: { variant: 'a' | 'b' | 'c'; fonts: string; children: React.ReactNode }) {
  const t = await getTranslations('proto')
  return (
    <div className={`proto proto-${variant} ${fonts}`}>
      <ProtoLoader variant={variant} mark="MEGA CARS" />
      <CurtainProvider mark="MEGA CARS">
        <ProtoHeader variant={variant} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
      </CurtainProvider>
      <ViewCursor label={t('view')} />
      <Grain />
    </div>
  )
}
