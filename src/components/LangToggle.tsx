import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const LANGS = ['de', 'tr'] as const

// DE | TR text toggle. Sets <html lang> so CSS uppercase is locale-aware (Turkish İ).
export default function LangToggle() {
  const { i18n } = useTranslation()
  const active = (i18n.resolvedLanguage ?? 'de').slice(0, 2)

  useEffect(() => {
    document.documentElement.lang = active
  }, [active])

  return (
    <div className="spec flex items-center gap-1.5 text-[0.7rem]">
      {LANGS.map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => void i18n.changeLanguage(l)}
            className={
              l === active ? 'text-text' : 'text-text/40 transition-colors hover:text-text/70'
            }
            aria-current={l === active ? 'true' : undefined}
          >
            {l.toUpperCase()}
          </button>
          {i === 0 && <span className="text-text/25">/</span>}
        </span>
      ))}
    </div>
  )
}
