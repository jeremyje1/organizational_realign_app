import { cookies } from 'next/headers';
import type { CookieMethodsServerDeprecated, CookieOptions } from '@supabase/ssr';

export const cookieMethods: CookieMethodsServerDeprecated = {
  get: (name) => cookies().get(name)?.value,
  set: (name, value, options) => {
    cookies().set({ name, value, ...(options ?? {}) });
  },
  remove: (name, options) => {
    cookies().delete({ name, ...(options ?? {}) });
  },
};