import { useTranslation } from 'react-i18next'
import type { Car } from '../lib/cars'
import { carYear } from '../lib/cars'
import { scrollMemory } from '../lib/router'

// Inventory card (DESIGN.md §5): 4:3 photo, model (Geist), year·km (mono faint),
// price (mono accent). Hover = subtle scale 1.03 + crossfade to 2nd photo.
// No rotating/flip card. Click is passive until detail page (Phase 3).
export default function CarCard({ car }: { car: Car }) {
  const { t } = useTranslation()
  const img1 = '/' + car.fotograflar[0]
  const img2 = '/' + (car.fotograflar[1] ?? car.fotograflar[0])

  return (
    <a
      href={`#/fahrzeug/${car.id}`}
      onClick={() => scrollMemory.remember()}
      aria-label={`${car.marka} ${car.model}`}
      className="car-card reveal group block w-full cursor-pointer text-left focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
    >
      <div className="skewable relative aspect-[4/3] overflow-hidden bg-surface">
        <img
          src={img1}
          alt={`${car.marka} ${car.model}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-[transform,opacity] duration-[800ms] ease-out group-hover:scale-[1.03] group-hover:opacity-0"
        />
        <img
          src={img2}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-[transform,opacity] duration-[800ms] ease-out group-hover:scale-[1.03] group-hover:opacity-100"
        />
      </div>

      <div className="mt-3.5">
        <h3 className="text-[0.95rem] font-medium leading-snug text-text">
          {car.marka} {car.model}
        </h3>
        <p className="spec mt-1.5 text-[0.66rem] text-faint">
          {carYear(car)} · {car.km.toLocaleString('de-DE')} {t('card.km')}
        </p>
        <p className="spec mt-2 text-[0.8rem] text-accent">€{car.fiyat.toLocaleString('de-DE')}</p>
      </div>
    </a>
  )
}
