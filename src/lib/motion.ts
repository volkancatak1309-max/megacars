import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

// Central GSAP plugin registration + shared motion helpers (Phase A — cinematic
// motion upgrade). SplitText/Flip etc. are free since GSAP 3.13, no Club needed.
gsap.registerPlugin(ScrollTrigger, SplitText)

// Single source of truth for the repo's reduced-motion guard (ARSENAL BÖLÜM 13).
export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Pointer-capable devices only (no magnetic/tilt on touch).
export const canHover = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches
