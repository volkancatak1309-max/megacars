'use client'
import { useState, type ReactNode } from 'react'
import { ShutterButton } from '@/components/site/Shutter'

/** Plays the opening screen inside a frame; "again" remounts it so the CSS runs anew. */
export function LoaderDemo({ children, label }: { children: ReactNode; label: string }) {
  const [run, setRun] = useState(0)
  return (
    <div className="pl-demo">
      <div className="pl-frame" key={run} aria-hidden="true">
        {children}
      </div>
      <ShutterButton kind="line" onClick={() => setRun((n) => n + 1)}>
        {label}
      </ShutterButton>
    </div>
  )
}
