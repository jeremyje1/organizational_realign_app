'use server';

import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

/**
 * Lazy-initialised, typed Supabase client for Server Components / Route Handlers.
 * Keeps auth session in App-Router cookies without exposing credentials.
 */
let _supabase: ReturnType<typeof createServerClient> | undefined;

function createSupabaseServer() {
  if (_supabase) return _supabase;

  const cookieStore = cookies(); // sync accessor in Next 14+

  _supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookie = cookieStore.get(name);
          return cookie?.value ?? null;
        },
        set(name: string, value: string, options?: CookieOptions) {
          cookieStore.set(name, value, { path: '/', ...options });
        },
        remove(name: string, options?: CookieOptions) {
          cookieStore.set(name, '', { path: '/', maxAge: -1, ...options });
        },
      },
    },
  );

  return _supabase;
}

/** Typed singleton Supabase client for server-side use */
export const supabase = createSupabaseServer();