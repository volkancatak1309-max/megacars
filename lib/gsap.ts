'use client'
// One place to register GSAP plugins for client components (DESIGN.md §6).
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)
gsap.defaults({ ease: 'power3.out', duration: 0.7 })

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
export const REDUCED = '(prefers-reduced-motion: reduce)'
export const DESKTOP_FINE = '(min-width: 1024px) and (pointer: fine)'

/** Waits for web fonts so SplitText measures final line breaks. */
export const fontsReady = (): Promise<unknown> =>
  typeof document !== 'undefined' && document.fonts ? document.fonts.ready : Promise.resolve()

export { gsap, ScrollTrigger, SplitText, useGSAP }
