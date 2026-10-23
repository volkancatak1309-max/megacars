// Browser-side photo preparation for the admin panel: the picture is decoded with its
// EXIF orientation applied, scaled to 1600 / 800 / 240 px and re-encoded as WebP (JPEG
// where the browser cannot write WebP). Re-encoding through a canvas drops every EXIF
// field, so location and device data never leave the phone (Volkan, 23.10.2026).

export type PhotoExt = 'webp' | 'jpg'
export const PHOTO_SIZES = [1600, 800, 240] as const
export type PhotoSize = (typeof PHOTO_SIZES)[number]

export interface PreparedPhoto {
  ext: PhotoExt
  mime: 'image/webp' | 'image/jpeg'
  width: number
  height: number
  blur: string
  files: Record<PhotoSize, Blob>
}

async function decode(file: Blob): Promise<ImageBitmap> {
  try {
    return await createImageBitmap(file, { imageOrientation: 'from-image' })
  } catch {
    return createImageBitmap(file)
  }
}

function draw(bmp: ImageBitmap, maxWidth: number): HTMLCanvasElement {
  const ratio = Math.min(1, maxWidth / bmp.width)
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(bmp.width * ratio))
  canvas.height = Math.max(1, Math.round(bmp.height * ratio))
  const ctx = canvas.getContext('2d')!
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height)
  return canvas
}

const toBlob = (canvas: HTMLCanvasElement, type: string, quality: number) =>
  new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality))

export async function preparePhoto(file: Blob): Promise<PreparedPhoto> {
  const bmp = await decode(file)
  try {
    const large = draw(bmp, 1600)
    // WebP where the browser can encode it; the first attempt decides the format for all sizes
    let mime: PreparedPhoto['mime'] = 'image/webp'
    let ext: PhotoExt = 'webp'
    let big = await toBlob(large, 'image/webp', 0.82)
    if (!big || big.type !== 'image/webp') {
      mime = 'image/jpeg'
      ext = 'jpg'
      big = await toBlob(large, 'image/jpeg', 0.86)
    }
    if (!big) throw new Error('encode')
    const quality = mime === 'image/webp' ? 0.8 : 0.84
    const medium = (await toBlob(draw(bmp, 800), mime, quality)) ?? big
    const small = (await toBlob(draw(bmp, 240), mime, mime === 'image/webp' ? 0.74 : 0.8)) ?? medium
    const tiny = draw(bmp, 16)
    const blur = tiny.toDataURL(mime, 0.4)
    return { ext, mime, width: large.width, height: large.height, blur, files: { 1600: big, 800: medium, 240: small } }
  } finally {
    bmp.close()
  }
}
