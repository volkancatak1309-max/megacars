'use client'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { SITE, whatsappHref } from '@/lib/site'
import { Icon } from '@/components/ui/Icon'
import { lockScroll } from '@/components/motion/SmoothScroll'
import { TestDriveForm, type VehicleRef } from '@/components/vehicle/TestDriveForm'

/**
 * Fixed mobile action bar: Anrufen · WhatsApp · Probefahrt (DESIGN.md §7.9).
 * On a vehicle page WhatsApp carries name, price and link, and Probefahrt (primary)
 * opens the request form in a bottom sheet. Hidden while the keyboard is open.
 */
export function MobileActionBar({ vehicle }: { vehicle?: VehicleRef }) {
  const tc = useTranslations('common')
  const td = useTranslations('detail')
  const [keyboard, setKeyboard] = useState(false)
  const [sheet, setSheet] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const vv = window.visualViewport
    if (!vv) return
    const onResize = () => setKeyboard(window.innerHeight - vv.height > 150)
    vv.addEventListener('resize', onResize)
    return () => vv.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (sheet && !d.open) d.showModal()
    if (!sheet && d.open) d.close()
    lockScroll(sheet)
  }, [sheet])

  const waText = vehicle ? td('whatsappMessage', vehicle) : tc('whatsappGeneric')
  const cell = 'flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full text-[0.9375rem] font-medium transition-transform duration-300 active:scale-[0.98]'

  return (
    <>
      <div
        className={`fixed inset-x-0 bottom-0 z-[200] border-t border-line bg-night/92 pb-[env(safe-area-inset-bottom)] shadow-[var(--shadow-float)] transition-transform duration-[450ms] ease-[var(--ease)] lg:hidden ${
          keyboard && !sheet ? 'translate-y-full' : ''
        }`}
      >
        <div className="flex h-[var(--bar-h)] items-center gap-2 px-3">
          <a href={SITE.phoneHref} className={`${cell} border border-line-strong text-ink`}>
            <Icon name="phone" size={18} />
            {tc('call')}
          </a>
          <a href={whatsappHref(waText)} target="_blank" rel="noopener" className={`${cell} border border-line-strong text-ink`}>
            <Icon name="whatsapp" size={18} />
            {tc('whatsapp')}
          </a>
          {vehicle ? (
            <button type="button" onClick={() => setSheet(true)} aria-haspopup="dialog" className={`${cell} bg-ink text-night`}>
              <Icon name="calendar" size={18} />
              {tc('testDriveShort')}
            </button>
          ) : (
            <a href={whatsappHref(tc('whatsappTestDriveGeneric'))} target="_blank" rel="noopener" className={`${cell} border border-line-strong text-ink`}>
              <Icon name="calendar" size={18} />
              {tc('testDriveShort')}
            </a>
          )}
        </div>
      </div>

      {vehicle && (
        <dialog ref={dialog} onClose={() => setSheet(false)} aria-label={td('testDrive')} className="sheet lg:hidden">
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <span className="h-1 w-10 rounded-full bg-line" aria-hidden="true" />
            <button type="button" onClick={() => setSheet(false)} className="btn btn-secondary btn-sm gap-2">
              <Icon name="close" size={16} />
              {tc('close')}
            </button>
          </div>
          <div className="overflow-y-auto px-5 pt-5 pb-[calc(24px+env(safe-area-inset-bottom))]" data-lenis-prevent>
            <TestDriveForm vehicle={vehicle} />
          </div>
        </dialog>
      )}
    </>
  )
}
