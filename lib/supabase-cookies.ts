// lib/supabase-cookies.ts
import { cookies } from "next/headers";
import type {
  CookieMethodsServer,
  CookieOptionsWithName,
} from "@supabase/ssr";

/**
 * Adapter that lets @supabase/ssr read & write cookies
 * using Next.js' built-in headers() helpers.
 */
export const cookieStore: CookieMethodsServer = {
  /* ---------- read ---------- */
  get(name) {
    const c = cookies().get(name);
    return c ? c.value : undefined;
  },

  getAll() {
    return cookies()
      .getAll()
      .map(({ name, value }) => ({ name, value }));
  },

  /* ---------- write ---------- */
  set(name, value, options = {}) {
    const opts: CookieOptionsWithName = {
      name,
      value,
      path: "/",
      ...options,
    };
    cookies().set(opts);
  },

  /* ---------- delete ---------- */
  remove(name, options = {}) {
    const opts: CookieOptionsWithName = {
      name,
      path: "/",
      ...options,
    };
    cookies().delete(opts);
  },
};