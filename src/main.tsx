import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Self-hosted fonts (DESIGN.md tipografi). Archivo "standard" file carries the
// wdth axis (62–125) + latin-ext → real "Archivo Expanded" + DE/TR glyphs.
import '@fontsource-variable/archivo/standard.css'
import '@fontsource-variable/geist/index.css'
import '@fontsource-variable/geist-mono/index.css'

import 'lenis/dist/lenis.css'
import './i18n'
import './styles/globals.css'

import App from './App'
import { ThemeProvider } from './theme/ThemeProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
