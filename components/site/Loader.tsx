import { loaderSvg } from '@/lib/brand/marks'

/**
 * Opening screen (Volkan, 23.10.2026): no counter, no bar. The emblem is drawn in thin
 * lines, fills in chrome, a sheen passes over it, "MEGA CARS" rises letter by letter,
 * then the night panel and the red curtain lift and the page is there (≈ 2.5 s). Pure
 * CSS from the first paint (styles/motion.css): no JavaScript, nothing stored on the
 * device. The head script in app/[locale]/layout.tsx hides it for the rest of the visit
 * (links within the site, reload, back/forward). Reduced motion: a plain fade only.
 */
export function Loader() {
  const { svg } = loaderSvg()
  return (
    <div className="loader" aria-hidden="true">
      <div className="loader-red" />
      <div className="loader-night" dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  )
}

const digits = (from: number, to: number) => {
  const out: number[] = []
  for (let d = from; d <= to; d++) out.push(d)
  return out
}

/** Letters rise in a scattered order from the first paint (Animmaster Hero Animations 26). */
export function Chars({ text, className = '' }: { text: string; className?: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className={className}>
        {text.split(' ').map((word, w, words) => (
          <span key={w} className="chars">
            {[...word].map((ch, i) => {
              // deterministic scatter, 0 … 0.45 s
              const d = (((w * 31 + i * 7919) % 13) / 13) * 0.45
              return (
                <span key={i} style={{ ['--d' as string]: d.toFixed(3) }}>
                  {ch}
                </span>
              )
            })}
            {w < words.length - 1 ? <span> </span> : null}
          </span>
        ))}
      </span>
    </>
  )
}

/**
 * A number whose digits roll like an odometer from the first paint (CSS only, so the
 * server text is final and nothing flashes). Screen readers get the plain text.
 */
export function Odometer({ text, className = '' }: { text: string; className?: string }) {
  let k = 0
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span className="odo" aria-hidden="true">
        {[...text].map((ch, i) => {
          if (!/\d/.test(ch)) {
            return (
              <span key={i} className="odo-static">
                {ch === ' ' ? ' ' : ch}
              </span>
            )
          }
          const n = Number(ch)
          return (
            <span key={i} className="odo-col">
              <span style={{ ['--n' as string]: n, ['--k' as string]: k++ }}>
                {digits(0, 9).map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </span>
            </span>
          )
        })}
      </span>
    </span>
  )
}
