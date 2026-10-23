import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import type { SupabaseClient, User } from '@supabase/supabase-js'
import { hasSupabase, SUPABASE_KEY, SUPABASE_URL } from './env'

/**
 * Client bound to the signed-in administrator's session cookies (admin panel, server
 * components and server actions). Row Level Security decides what the session may do.
 */
export async function sessionClient(): Promise<SupabaseClient | null> {
  if (!hasSupabase()) return null
  const store = await cookies()
  return createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) => store.set(name, value, options))
        } catch {
          // Server Components cannot write cookies; the proxy refreshes the session instead.
        }
      },
    },
  })
}

/** The signed-in administrator, or null (not signed in, not an administrator, no connection). */
export async function currentAdmin(): Promise<{ client: SupabaseClient; user: User } | null> {
  const client = await sessionClient()
  if (!client) return null
  const {
    data: { user },
  } = await client.auth.getUser()
  if (!user) return null
  const { data } = await client.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle()
  return data ? { client, user } : null
}
