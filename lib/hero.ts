// Opening film (customer request, KARAR-DEFTERI 28.10.2026): the film of the previous
// Mega Cars website (main branch, public/hero/hero-main.mp4, the section "Jeder Kilometer,
// geprüft."), not graded or retimed. Its author and licence are not known; FAZ 1 audited it
// in docs/ARASTIRMA.md §a3. 1920×1080 desktop file, 540×960 centre-cropped portrait file and
// WebP posters of the first frame; sizes and quality checks are in KARAR-DEFTERI.md.
// /hero/* is cached immutable for a year, so a new encode always goes into a new folder.

type Text = { de: string; en: string; tr: string }

export interface HeroFilm {
  /** what the film shows (aria-label of the video) */
  label: Text
  /** where the file comes from (for the record; not shown on the site) */
  origin: string
  desktop: string
  mobile: string
  posterDesktop: string
  posterMobile: string
}

export const HERO: HeroFilm = {
  label: {
    de: 'Ein schwarzer Sportwagen mit großem Heckflügel auf einer Bergstraße.',
    en: 'A black sports car with a large rear wing on a mountain road.',
    tr: 'Dağ yolunda büyük arka kanatlı siyah bir spor otomobil.',
  },
  origin: 'main branch: public/hero/hero-main.mp4 (previous Mega Cars website)',
  desktop: '/hero/gt/desktop.mp4',
  mobile: '/hero/gt/mobile.mp4',
  posterDesktop: '/hero/gt/poster-desktop.webp',
  posterMobile: '/hero/gt/poster-mobile.webp',
}
