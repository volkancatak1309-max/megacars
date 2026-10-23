import type { CSSProperties } from 'react'
import { LOGO_CONCEPT } from '@/lib/launch'
import { logoSvg, type Concept, type Layout, type Tone } from '@/lib/brand/marks'

/**
 * The Mega Cars logo as inline SVG (lib/brand/marks.ts), decorative: the accessible name
 * comes from the surrounding link or heading. Size it by the height of `.logo`.
 */
export function Logo({
  concept = LOGO_CONCEPT,
  layout = 'horizontal',
  tone = 'dark',
  chrome = false,
  className = '',
  style,
}: {
  concept?: Concept
  layout?: Layout
  tone?: Tone
  chrome?: boolean
  className?: string
  style?: CSSProperties
}) {
  const { svg } = logoSvg(concept, layout, { tone, chrome })
  return <span className={`logo ${className}`.trim()} style={style} aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg }} />
}
