import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

type Theme = 'dark' | 'light'

const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'dark',
  toggle: () => {},
})

function read(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => read())

  const apply = useCallback((t: Theme) => {
    const root = document.documentElement
    root.setAttribute('data-theme', t)
    root.style.background = t === 'light' ? '#ffffff' : '#000000'
    try {
      localStorage.setItem('mc-theme', t)
    } catch {
      /* ignore */
    }
    setTheme(t)
  }, [])

  const toggle = useCallback(() => apply(read() === 'dark' ? 'light' : 'dark'), [apply])

  // keep React state in sync with the pre-paint boot script
  useEffect(() => {
    setTheme(read())
  }, [])

  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeCtx)
