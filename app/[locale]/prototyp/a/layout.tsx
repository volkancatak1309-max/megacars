import { Archivo } from 'next/font/google'
import { ProtoShell } from '@/components/proto/Shell'
import '@/components/proto/a.css'

// Yön A "Rosso": one family, Archivo (SIL OFL 1.1) with its width axis — Extra
// Condensed Black for the giant names, normal width for text.
const archivo = Archivo({ subsets: ['latin', 'latin-ext'], axes: ['wdth'], variable: '--f-text', display: 'swap' })

export default function RossoLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtoShell variant="a" fonts={archivo.variable}>
      {children}
    </ProtoShell>
  )
}
