import { ViewTransition } from 'react'

/**
 * Re-mounts on every navigation. Browsers with the View Transitions API get a
 * crossfade (plus the shared car photo, Wow 3); others get a 450 ms CSS fade (.no-vt).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-vt" exit="page-vt" default="none">
      <div className="page-enter">{children}</div>
    </ViewTransition>
  )
}
