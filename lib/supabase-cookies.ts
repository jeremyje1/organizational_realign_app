import { cookies } from "next/headers";
import type { CookieMethodsServer } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";

/**
 * Adapter that satisfies `CookieMethodsServer` for @supabase/ssr 0.6.x
 * using the async Next.js 14/15 `cookies()` API.
 */
export const cookieStore: CookieMethodsServer = {
  /* ---------- read ---------- */
  async getAll() {
    const c = await cookies();
    return c.getAll().map(({ name, value }) => ({ name, value }));
  },

  /* ---------- write ---------- */
  async setAll(cookiesToSet: {
    name: string;
    value: string;
    options?: CookieOptions;
  }[]) {
    const c = await cookies();
    cookiesToSet.forEach(({ name, value, options }) =>
      c.set({ name, value, ...options })
    );
  },
};