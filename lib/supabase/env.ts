// Supabase connection data. The values come from Vercel's environment variables (preview
// and production) and from the local .env.local; nothing is written into the repo.
// A build without them still succeeds: the site then shows its empty state.

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export const hasSupabase = () => Boolean(SUPABASE_URL && SUPABASE_KEY)

export const PHOTO_BUCKET = 'vehicles'

/** Public address of a file in the photo bucket. */
export const storageUrl = (path: string) => `${SUPABASE_URL}/storage/v1/object/public/${PHOTO_BUCKET}/${path}`
