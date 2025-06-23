import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { Database } from "@/types/supabase";

/**
 * Return a typed Supabase client that works inside **Server Components** /
 * **Route Handlers** while safely persisting the auth session via cookies.
 */
export async function createSupabaseServerClient() {
  // `cookies()` is synchronous in the App‑Router and returns a mutable cookie store.
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookie = cookieStore.get(name);
          return cookie ? cookie.value : null;
        },
        set(name: string, value: string, options?: CookieOptions) {
          cookieStore.set(name, value, { path: "/", ...options });
        },
        remove(name: string, options?: CookieOptions) {
          cookieStore.set(name, "", { path: "/", maxAge: -1, ...options });
        },
      },
    }
  );
}