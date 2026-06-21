import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// MEGACARS — Vite + React + Tailwind v4 (+ GSAP/Lenis/i18next used in src)
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { host: true, port: 5173 },
})
