import { Instrument_Sans, Instrument_Serif } from 'next/font/google'
import { ProtoShell } from '@/components/proto/Shell'
import '@/components/proto/b.css'

// Yön B "Atelier": Instrument Serif (SIL OFL 1.1) + Instrument Sans (SIL OFL 1.1).
const serif = Instrument_Serif({ subsets: ['latin', 'latin-ext'], weight: '400', style: ['normal', 'italic'], variable: '--f-display', display: 'swap' })
const sans = Instrument_Sans({ subsets: ['latin', 'latin-ext'], variable: '--f-text', display: 'swap' })

export default function AtelierLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtoShell variant="b" fonts={`${serif.variable} ${sans.variable}`}>
      {children}
    </ProtoShell>
  )
}
