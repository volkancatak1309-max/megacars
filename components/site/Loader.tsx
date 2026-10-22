// First-visit loader (Animmaster Hero Animations 9 / 18: counter 0 → 100 + bar, then
// the panels open). Pure CSS: it runs from the first paint, needs no JavaScript and
// never holds the page back; the page renders underneath at once. The head script in
// app/[locale]/layout.tsx hides it for the rest of the visit.

const digits = (from: number, to: number, times = 1) => {
  const out: number[] = []
  for (let t = 0; t < times; t++) for (let d = from; d <= to; d++) out.push(d)
  return out
}

export function Loader({ place }: { place: string }) {
  return (
    <div className="loader" aria-hidden="true">
      <div className="loader-panel" data-pos="top" />
      <div className="loader-panel" data-pos="bottom" />
      <div className="loader-inner">
        <span className="loader-mark">MEGA CARS</span>
        <div className="loader-count">
          <span className="loader-odo">
            <span className="loader-col" data-col="h">
              <span>0</span>
              <span>1</span>
            </span>
            <span className="loader-col" data-col="t">
              {[...digits(0, 9), 0].map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </span>
            <span className="loader-col" data-col="o">
              {[...digits(0, 9, 10), 0].map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </span>
          </span>
          <span className="loader-place">{place}</span>
        </div>
      </div>
      <div className="loader-bar" />
    </div>
  )
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
                {ch === ' ' ? ' ' : ch}
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
