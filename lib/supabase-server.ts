import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { Database } from "@/types/supabase";

/**
 * Return a typed Supabase client that works inside **Server Components** /
 * **Route Handlers** while safely persisting the auth session via cookies.
 */
export function createSupabaseServerClient() {
  // `cookies()` is synchronous in the App‑Router and returns a mutable cookie store.
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        /**
         * Supabase occasionally calls `get(name)` directly, so we expose it.
         */
        get: (name: string) => cookieStore.get(name),

        /**
         * Called by Supabase every request to parse its own auth cookies.
         */
        getAll: () => cookieStore.getAll(),

        /**
         * When Supabase signs in / refreshes a session it needs to *set*
         * the auth cookies.  We delegate to Next.js’ cookie store.
         */
        set: (name: string, value: string, options?: CookieOptions) => {
          cookieStore.set(name, value, { path: "/", ...options });
        },

        /**
         * Clearing a cookie is just `set` with `maxAge: -1`.
         */
        remove: (name: string, options?: CookieOptions) => {
          cookieStore.set(name, "", { path: "/", maxAge: -1, ...options });
        },
      },
    }
  );
}