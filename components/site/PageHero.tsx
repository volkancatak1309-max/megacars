import type { ReactNode } from 'react'
import { Stagger } from '@/components/motion/Reveal'
import { Chars } from './Loader'
import { LinesUp } from './Reveals'

/**
 * Opening of every inner page: the page's name set huge in scattered rising letters
 * (Animmaster Hero Animations 26; decorative, hidden from screen readers), the real
 * heading as a full sentence under it, a one-sentence lead and whatever the page adds.
 * Everything is visible from the first paint (CSS only, nothing waits for JS).
 */
export function PageHero({
  word,
  title,
  lead,
  children,
  id = 'page-title',
}: {
  word: string
  title: string
  lead?: string
  children?: ReactNode
  id?: string
}) {
  return (
    <section className="pgh s-night" aria-labelledby={id}>
      <div className="pg wide">
        <p className="pgh-word" aria-hidden="true">
          <Chars text={word} />
        </p>
        <h1 id={id} className="pgh-title d-m">
          <span className="mline rise">
            <span>{title}</span>
          </span>
        </h1>
        {lead && <p className="pgh-lead lead fade-up">{lead}</p>}
        {children}
      </div>
    </section>
  )
}

/** Numbered steps on bone: masked heading, huge numerals, steps settle in sequence. */
export function Steps({ title, steps }: { title: string; steps: string[] }) {
  return (
    <section className="stp s-bone" aria-labelledby="stp-title">
      <div className="pg wide">
        <LinesUp id="stp-title" className="stp-title d-m">
          {title}
        </LinesUp>
        <Stagger as="ol" className="stp-list">
          {steps.map((s, i) => (
            <li key={i} data-stagger>
              <span className="stp-n tabular" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p>{s}</p>
            </li>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
