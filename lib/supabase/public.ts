import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { hasSupabase, SUPABASE_KEY, SUPABASE_URL } from './env'

let client: SupabaseClient | null = null

/**
 * Anonymous client for the public site (reads only what Row Level Security allows:
 * visible, non-archived vehicles). Null when the connection data is missing.
 */
export function publicClient(): SupabaseClient | null {
  if (!hasSupabase()) return null
  client ??= createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  })
  return client
}
