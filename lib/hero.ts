// Opening film candidates (KARAR-DEFTERI 23.10.2026: red car, real camera footage).
// The site shows HERO_ACTIVE; Volkan's choice is a one-line change of that key.
// Every candidate has a 1920×1080 desktop file (≤ 6 MB), a 540×960 portrait file
// (≤ 2.5 MB) and WebP posters; sources, licences and checks are in KARAR-DEFTERI.md.

type Text = { de: string; tr: string }

export interface HeroFilm {
  key: string
  /** what the film shows, where it comes from and under which licence */
  car: Text
  note: Text
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

const files = (key: string) => ({
  desktop: `/hero/${key}/desktop.mp4`,
  mobile: `/hero/${key}/mobile.mp4`,
  posterDesktop: `/hero/${key}/poster-desktop.webp`,
  posterMobile: `/hero/${key}/poster-mobile.webp`,
})

const MIXKIT = { licence: 'Mixkit Stock Video Free License', licenceUrl: 'https://mixkit.co/license/#videoFree' }

export const HERO_CANDIDATES = {
  a: {
    key: 'a',
    ...files('a'),
    ...MIXKIT,
    car: { de: 'Roter Sportwagen in Nahaufnahme (Mazda MX-5)', tr: 'Yakın planda kırmızı spor otomobil (Mazda MX-5)' },
    note: {
      de: 'Echte Aufnahme in einer dunklen Garage, langsame Kamerafahrt am roten Lack entlang; kein Premium-Modell.',
      tr: 'Karanlık bir garajda gerçek çekim, kamera kırmızı boyanın üzerinde yavaşça kayıyor; premium bir model değil.',
    },
    label: { de: 'Der rote Lack eines Sportwagens im Licht einer dunklen Garage.', tr: 'Karanlık bir garajın ışığında bir spor otomobilin kırmızı boyası.' },
    source: 'https://mixkit.co/free-stock-video/close-up-of-red-sports-car-63/',
    author: 'marcolopez',
  },
  b: {
    key: 'b',
    ...files('b'),
    ...MIXKIT,
    car: { de: 'Roter Sportwagen in der Garage (Mazda MX-5)', tr: 'Garajda kırmızı spor otomobil (Mazda MX-5)' },
    note: {
      de: 'Echte Aufnahme, dunkel und langsam, von unten gefilmt; das Felgenemblem liegt außerhalb des Bildausschnitts; kein Premium-Modell.',
      tr: 'Gerçek çekim, karanlık ve yavaş, alttan çekilmiş; jant göbeğindeki amblem kadrajın dışında bırakıldı; premium bir model değil.',
    },
    label: { de: 'Ein roter Sportwagen in einer dunklen Garage, von unten gefilmt.', tr: 'Karanlık bir garajda alttan çekilmiş kırmızı bir spor otomobil.' },
    source: 'https://mixkit.co/free-stock-video/red-sports-car-74/',
    author: 'franklandgrave',
  },
  c: {
    key: 'c',
    ...files('c'),
    licence: 'Pexels License',
    licenceUrl: 'https://www.pexels.com/license/',
    car: { de: 'Chevrolet Corvette C8 in Rot', tr: 'Kırmızı Chevrolet Corvette C8' },
    note: {
      de: 'Echte Aufnahme eines Premium-Sportwagens ohne sichtbares Emblem; aber Tageslicht, feste Kamera und Verkehr im Hintergrund.',
      tr: 'Görünür amblemi olmayan premium bir spor otomobilin gerçek çekimi; ama gün ışığı, sabit kamera ve arka planda trafik var.',
    },
    label: { de: 'Die Seite eines roten Sportwagens an einer Straße in der Stadt.', tr: 'Şehirde bir caddede duran kırmızı bir spor otomobilin yan tarafı.' },
    source: 'https://www.pexels.com/video/luxurious-red-sports-car-on-urban-street-33374869/',
    author: 'Igor Vieira',
  },
} satisfies Record<string, HeroFilm>

export type HeroKey = keyof typeof HERO_CANDIDATES

export const HERO_ACTIVE: HeroKey = 'a'

export const HERO: HeroFilm = HERO_CANDIDATES[HERO_ACTIVE]
