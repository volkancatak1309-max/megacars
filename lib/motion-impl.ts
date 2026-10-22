// Loaded lazily by lib/motion.ts after the first paint, so GSAP never delays LCP.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(ScrollTrigger, SplitText, Flip)
gsap.defaults({ ease: 'power3.out', duration: 0.7 })

export { gsap, ScrollTrigger, SplitText, Flip }
