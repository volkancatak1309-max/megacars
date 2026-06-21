// Real dealer contact (provided by user). Used by hero CTA + footer.
const PHONE_DISPLAY = '+43 660 1999472'
const PHONE_E164 = '+436601999472'
const WA_NUMBER = '436601999472'
const EMAIL = 'office@meral.at'

const WA_TEXT = encodeURIComponent(
  'Hallo MEGACARS, ich interessiere mich für ein Fahrzeug und möchte eine Beratung vereinbaren.',
)

export const CONTACT = {
  phoneDisplay: PHONE_DISPLAY,
  tel: `tel:${PHONE_E164}`,
  email: EMAIL,
  mailto: `mailto:${EMAIL}`,
  whatsapp: `https://wa.me/${WA_NUMBER}`,
  whatsappBeratung: `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`,
  // AutoScout24 dealer profile (URL provided by user — confirm it resolves).
  autoscout24: 'https://www.autoscout24.de/haendler/mega-cars',
  // Verified address (user-provided).
  address: 'Radetzkystraße 80, 6845 Hohenems',
  addressFull: 'Radetzkystraße 80, 6845 Hohenems, Vorarlberg, Österreich',
  mapsEmbed:
    'https://www.google.com/maps?q=' +
    encodeURIComponent('Radetzkystraße 80, 6845 Hohenems, Österreich') +
    '&z=15&output=embed',
  mapsLink:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Radetzkystraße 80, 6845 Hohenems, Österreich'),
}
