import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

/**
 * Browser‑side Supabase client.
 * (On the server we use `@/lib/supabase‑cookies` so auth cookies are forwarded.)
 */
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)