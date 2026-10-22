// Contact data: BRIEF.md and KARAR-DEFTERI.md (22.10.2026) are the only source.
export const SITE = {
  name: 'Mega Cars',
  legalName: 'Mega Cars Murat Demir e.U.',
  owner: 'Murat Demir',
  register: 'FN 447871 i',
  court: 'Landesgericht Feldkirch',
  phone: '+43 660 6877002',
  phoneHref: 'tel:+436606877002',
  whatsappNumber: '436606877002',
  email: 'megacars@live.at',
  street: 'Radetzkystraße 80',
  zip: '6845',
  city: 'Hohenems',
  region: 'Vorarlberg',
  country: 'AT',
  // OpenStreetMap way 307149900 ("Mega Cars")
  geo: { lat: 47.3727136, lng: 9.6940083 },
  facebook: 'https://www.facebook.com/Autohaus.MegaCars/',
  galzura: 'https://galzura.com',
  // Cylex + OpenStreetMap; lunch break still to be confirmed
  hours: [
    { days: ['Mo', 'Tu', 'We', 'Th', 'Fr'], opens: '08:00', closes: '18:00' },
    { days: ['Sa'], opens: '09:00', closes: '15:00' },
  ],
} as const

export const whatsappHref = (text?: string) =>
  `https://wa.me/${SITE.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export const mailHref = `mailto:${SITE.email}`

export const routeHref = `https://www.google.com/maps/dir/?api=1&destination=${SITE.geo.lat},${SITE.geo.lng}`

export const osmEmbedHref = (() => {
  const { lat, lng } = SITE.geo
  const d = 0.006
  const bbox = [lng - d * 1.6, lat - d, lng + d * 1.6, lat + d].map((n) => n.toFixed(5)).join('%2C')
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`
})()

/** Absolute origin of this deployment (preview, production or local). */
export function siteOrigin() {
  const host = process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL
  return host ? `https://${host}` : `http://localhost:${process.env.PORT || 3000}`
}
