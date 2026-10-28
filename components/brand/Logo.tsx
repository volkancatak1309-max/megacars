import logo from '@/lib/brand/logo.json'

/** srcset of the transparent logo files written by scripts/brand-assets.ts */
export const LOGO_SRCSET = logo.files.map((f) => `${f.src} ${f.w}w`).join(', ')
/** a file large enough for the opening screen; also the mask of its sheen */
export const LOGO_LARGE = (logo.files.find((f) => f.w >= 960) ?? logo.files[logo.files.length - 1]).src
export const LOGO_RATIO = logo.width / logo.height

/**
 * The Mega Cars logo (assets/brand/logo.png, scaled down by scripts/brand-assets.ts),
 * decorative: the accessible name comes from the surrounding link or heading. Size it by
 * the CSS height of `.logo`; `sizes` is the rendered width (height × ratio).
 */
export function Logo({ sizes, className = '', priority = false }: { sizes: string; className?: string; priority?: boolean }) {
  const fallback = logo.files.find((f) => f.w >= 320) ?? logo.files[0]
  return (
    <img
      className={`logo ${className}`.trim()}
      src={fallback.src}
      srcSet={LOGO_SRCSET}
      sizes={sizes}
      width={logo.width}
      height={logo.height}
      alt=""
      aria-hidden="true"
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
      draggable={false}
    />
  )
}
