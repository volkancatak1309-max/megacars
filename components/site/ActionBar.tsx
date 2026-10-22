'use client'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { SITE, whatsappHref } from '@/lib/site'
import { Icon } from '@/components/ui/Icon'
import { lockScroll } from '@/components/motion/SmoothScroll'
import { TestDriveForm, type VehicleRef } from '@/components/vehicle/TestDriveForm'
import { Faces, ShutterA, ShutterButton } from './Shutter'

/** Lets the vehicle page open the same test-drive sheet from its own buttons. */
export const TEST_DRIVE_EVENT = 'testdrive:open'

/**
 * Mobile action bar: Anrufen · WhatsApp · Probefahrt (Mobbin: Realtor.com pair +
 * Agoda placement). On a vehicle page WhatsApp carries name, price and link, and
 * Probefahrt opens the request form in a sheet. It steps aside while the keyboard
 * is open.
 */
export function ActionBar({ vehicle }: { vehicle?: VehicleRef }) {
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

  useEffect(() => {
    if (!vehicle) return
    const onOpen = () => setSheet(true)
    window.addEventListener(TEST_DRIVE_EVENT, onOpen)
    return () => window.removeEventListener(TEST_DRIVE_EVENT, onOpen)
  }, [vehicle])

  const waText = vehicle ? td('whatsappMessage', vehicle) : tc('whatsappGeneric')

  return (
    <>
      <div className="ab" data-away={(keyboard && !sheet) || undefined} role="region" aria-label={tc('quickContact')}>
        <ShutterA href={SITE.phoneHref} kind="line">
          <Icon name="phone" size={17} />
          {tc('call')}
        </ShutterA>
        <ShutterA href={whatsappHref(waText)} target="_blank" rel="noopener" kind="line">
          <Icon name="whatsapp" size={17} />
          {tc('whatsapp')}
        </ShutterA>
        {vehicle ? (
          <ShutterButton kind="solid" onClick={() => setSheet(true)} aria-haspopup="dialog">
            <Icon name="calendar" size={17} />
            {tc('testDriveShort')}
          </ShutterButton>
        ) : (
          <ShutterA href={whatsappHref(tc('whatsappTestDriveGeneric'))} target="_blank" rel="noopener" kind="solid">
            <Icon name="calendar" size={17} />
            {tc('testDriveShort')}
          </ShutterA>
        )}
      </div>

      {vehicle && (
        <dialog ref={dialog} onClose={() => setSheet(false)} aria-label={td('testDrive')} className="sheet sheet-center">
          <div className="sheet-head">
            <span className="label">{td('testDrive')}</span>
            <button type="button" onClick={() => setSheet(false)} className="sh sh--line sh--sm">
              <Faces>
                <Icon name="close" size={16} />
                {tc('close')}
              </Faces>
            </button>
          </div>
          <div className="sheet-body" data-lenis-prevent>
            <TestDriveForm vehicle={vehicle} headingLevel="h2" />
          </div>
        </dialog>
      )}
    </>
  )
}

/** Desktop button on the vehicle page that opens the same test-drive form. */
export function TestDriveButton({ label }: { label: string }) {
  return (
    <ShutterButton kind="solid" aria-haspopup="dialog" onClick={() => window.dispatchEvent(new Event(TEST_DRIVE_EVENT))}>
      <Icon name="calendar" size={18} />
      {label}
    </ShutterButton>
  )
}
