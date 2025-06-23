import { cookies } from "next/headers";
import type { CookieMethodsServer } from "@supabase/ssr";

/**
 * Minimal bridge that turns Next.js `cookies()` into the
 * `CookieMethodsServer` interface expected by @supabase/ssr 0.6.x
 */
export const cookieStore: CookieMethodsServer = {
  /* ---------- read ---------- */
  get: (name) => cookies().get(name)?.value,
  getAll: () =>
    cookies()
      .getAll()
      .map(({ name, value }) => ({ name, value })),

  /* ---------- write ---------- */
  set: (name, value, options) => {
    cookies().set({ name, value, ...options });
  },

  /* ---------- delete ---------- */
  remove: (name, options) => {
    cookies().delete(name, options);
  },
};