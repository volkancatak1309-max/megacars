import { useTranslation } from 'react-i18next'
import ThemeToggle from './ThemeToggle'
import LangToggle from './LangToggle'
import { goSection, go } from '../lib/router'

export default function Nav() {
  const { t } = useTranslation()

  const handleLogo = (e: React.MouseEvent) => {
    e.preventDefault()
    goSection('top')
  }
  const handleInventory = (e: React.MouseEvent) => {
    e.preventDefault()
    goSection('inventory')
  }
  const handleAbout = (e: React.MouseEvent) => {
    e.preventDefault()
    go('#/ueber-uns')
  }
  const handleContact = (e: React.MouseEvent) => {
    e.preventDefault()
    go('#/kontakt')
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <a href="#/" onClick={handleLogo} className="display text-lg leading-none text-text">
          MEGACARS
        </a>
        <div className="hidden items-center gap-8 md:flex">
          <a href="#inventory" onClick={handleInventory} className="spec text-[0.72rem] text-text/75 transition-colors hover:text-text">
            {t('nav.inventory')}
          </a>
          <a href="#/ueber-uns" onClick={handleAbout} className="spec text-[0.72rem] text-text/75 transition-colors hover:text-text">
            {t('nav.about')}
          </a>
          <a href="#/kontakt" onClick={handleContact} className="spec text-[0.72rem] text-text/75 transition-colors hover:text-text">
            {t('nav.contact')}
          </a>
        </div>
        <div className="flex items-center gap-3">
          <LangToggle />
          <span className="h-4 w-px bg-border" />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
