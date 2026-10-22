import { Hanken_Grotesk, Unbounded } from 'next/font/google'
import { ProtoShell } from '@/components/proto/Shell'
import '@/components/proto/c.css'

// Yön C "Nachtfahrt": Unbounded (SIL OFL 1.1) + Hanken Grotesk (SIL OFL 1.1).
const display = Unbounded({ subsets: ['latin', 'latin-ext'], variable: '--f-display', display: 'swap' })
const text = Hanken_Grotesk({ subsets: ['latin', 'latin-ext'], variable: '--f-text', display: 'swap' })

export default function NachtLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtoShell variant="c" fonts={`${display.variable} ${text.variable}`}>
      {children}
    </ProtoShell>
  )
}
