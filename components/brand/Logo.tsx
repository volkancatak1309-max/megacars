import type { CSSProperties } from 'react'
import { logoSvg, type Layout, type Tone } from '@/lib/brand/marks'

/**
 * The Mega Cars logo as inline SVG (lib/brand/marks.ts), decorative: the accessible name
 * comes from the surrounding link or heading. Size it by the height of `.logo`.
 */
export function Logo({ layout = 'horizontal', tone = 'dark', chrome = false, className = '', style }: { layout?: Layout; tone?: Tone; chrome?: boolean; className?: string; style?: CSSProperties }) {
  const { svg } = logoSvg(layout, { tone, chrome })
  return <span className={`logo ${className}`.trim()} style={style} aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg }} />
}
