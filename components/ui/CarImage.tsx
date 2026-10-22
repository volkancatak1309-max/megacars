import type { CSSProperties } from 'react'
import type { Photo } from '@/lib/types'

/**
 * Original listing photo: only scaled and cropped, never filtered (DESIGN.md §5).
 * Blur-up comes from the wrapper background, so the image needs no JS to appear.
 * Portrait photos are shown whole (contain) on the panel colour.
 */
export function CarImage({
  photo,
  alt,
  sizes,
  priority = false,
  className = '',
  imgClassName = '',
  style,
}: {
  photo: Photo
  alt: string
  sizes: string
  priority?: boolean
  className?: string
  imgClassName?: string
  style?: CSSProperties
}) {
  const portrait = photo.height > photo.width
  const srcSet = [`${photo.src240} 240w`, photo.src800 && `${photo.src800} 800w`, `${photo.src} ${photo.width}w`].filter(Boolean).join(', ')
  return (
    <span
      className={`relative block overflow-hidden bg-panel ${className}`}
      style={{
        ...(portrait ? {} : { backgroundImage: `url(${photo.blur})`, backgroundSize: 'cover', backgroundPosition: 'center' }),
        ...style,
      }}
    >
      <img
        src={photo.src}
        srcSet={srcSet}
        sizes={sizes}
        width={photo.width}
        height={photo.height}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding={priority ? 'auto' : 'async'}
        className={`h-full w-full ${portrait ? 'object-contain' : 'object-cover'} ${imgClassName}`}
      />
    </span>
  )
}
