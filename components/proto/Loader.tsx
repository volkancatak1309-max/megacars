// First-visit loader (Animmaster Hero Animations 9 / 18: counter 0 → 100 + bar, then
// the panels open). Pure CSS: it runs from the first paint, needs no JavaScript and
// never holds the page back; the page renders underneath at once.

const digits = (from: number, to: number, times = 1) => {
  const out: number[] = []
  for (let t = 0; t < times; t++) for (let d = from; d <= to; d++) out.push(d)
  return out
}

export function ProtoLoader({ variant, mark }: { variant: string; mark: string }) {
  // shown once per visit and prototype; the flag is set before the first paint
  const boot = `(function(){try{var k='mcp-loader-${variant}';if(sessionStorage.getItem(k)){document.documentElement.setAttribute('data-ploader-off','')}else{document.documentElement.removeAttribute('data-ploader-off');sessionStorage.setItem(k,'1')}}catch(e){}})()`
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: boot }} />
      <div className="ploader" aria-hidden="true">
        <div className="ploader-panel" data-pos="top" />
        <div className="ploader-panel" data-pos="bottom" />
        <div className="ploader-inner">
          <span className="ploader-mark">{mark}</span>
          <div className="ploader-count">
            <span className="odo">
              <span className="odo-col" data-col="h">
                <span>0</span>
                <span>1</span>
              </span>
              <span className="odo-col" data-col="t">
                {[...digits(0, 9), 0].map((d, i) => (
                  <span key={i}>{d}</span>
                ))}
              </span>
              <span className="odo-col" data-col="o">
                {[...digits(0, 9, 10), 0].map((d, i) => (
                  <span key={i}>{d}</span>
                ))}
              </span>
            </span>
          </div>
        </div>
        <div className="ploader-bar" />
      </div>
    </>
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
