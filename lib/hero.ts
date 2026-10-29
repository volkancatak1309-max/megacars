// Opening film (customer request, KARAR-DEFTERI 28.10 and 29.10.2026): the same frames as the film
// of the previous Mega Cars website (main branch, public/hero/hero-main.mp4), cut again from the
// 4K original on YouTube (VibeOnDriveOfficial, "Blacked-Out AMG GT Black Series", yhcDe-59P18,
// frames 495–1083 with the first frame held for 3 frames, exactly as in the old file); used with
// the author's permission. Not graded, cropped or retimed. 1920×1080 desktop file, 540×960 portrait
// file (same crop as before: x 656–1264 of the 1920-wide frame) and WebP posters of the first frame;
// sizes and quality checks are in KARAR-DEFTERI.md.
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
  origin: 'youtube.com/watch?v=yhcDe-59P18 (VibeOnDriveOfficial, 4K), same frames as main branch public/hero/hero-main.mp4',
  desktop: '/hero/gt2/desktop.mp4',
  mobile: '/hero/gt2/mobile.mp4',
  posterDesktop: '/hero/gt2/poster-desktop.webp',
  posterMobile: '/hero/gt2/poster-mobile.webp',
}
