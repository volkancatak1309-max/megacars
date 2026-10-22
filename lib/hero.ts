// Opening film (Volkan's choice, KARAR-DEFTERI 23.10.2026): Pexels 33374869, a red
// Chevrolet Corvette C8, graded dark and natural (no day-for-night). 1920×1080 desktop
// file (≤ 6 MB), 540×960 portrait file (≤ 2.5 MB) and WebP posters; source, licence,
// grade and checks are in KARAR-DEFTERI.md. /hero/* is cached immutable for a year,
// so a new encode always goes into a new folder.

type Text = { de: string; en: string; tr: string }

export interface HeroFilm {
  /** what the film shows (aria-label of the video) */
  label: Text
  source: string
  author: string
  licence: string
  licenceUrl: string
  desktop: string
  mobile: string
  posterDesktop: string
  posterMobile: string
}

export const HERO: HeroFilm = {
  label: {
    de: 'Die Seite eines roten Sportwagens an einer Straße in der Stadt.',
    en: 'The side of a red sports car parked on a city street.',
    tr: 'Şehirde bir caddede duran kırmızı bir spor otomobilin yan tarafı.',
  },
  source: 'https://www.pexels.com/video/luxurious-red-sports-car-on-urban-street-33374869/',
  author: 'Igor Vieira',
  licence: 'Pexels License',
  licenceUrl: 'https://www.pexels.com/license/',
  desktop: '/hero/c8/desktop.mp4',
  mobile: '/hero/c8/mobile.mp4',
  posterDesktop: '/hero/c8/poster-desktop.webp',
  posterMobile: '/hero/c8/poster-mobile.webp',
}
