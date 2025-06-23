import { cookies as nextCookies } from "next/headers";
import type {
  CookieOptionsWithName,
  CookieMethodsServer,
} from "@supabase/ssr";

export const cookieStore: CookieMethodsServer = {
  /**
   * Read a cookie value (or undefined)
   */
  get(name: string) {
    return nextCookies().get(name)?.value;
  },

  /**
   * Set / overwrite a cookie
   */
  set(
    name: string,
    value: string,
    options?: CookieOptionsWithName /* path, maxAge, etc. */
  ) {
    nextCookies().set({ name, value, ...options });
  },

  /**
   * Delete a cookie
   */
  remove(name: string, options?: CookieOptionsWithName) {
    nextCookies().delete({ name, ...options });
  },
};