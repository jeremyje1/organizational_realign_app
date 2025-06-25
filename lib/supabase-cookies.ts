import { cookies } from 'next/headers';
import type { CookieMethodsServerDeprecated, CookieOptions } from '@supabase/ssr';

export const cookieMethods: CookieMethodsServerDeprecated = {
  get: (name: string) => cookies().get(name)?.value,
  set: (name: string, value: string, options?: CookieOptions) => {
    cookies().set({ name, value, ...(options ?? {}) });
  },
  remove: (name: string, options?: CookieOptions) => {
    cookies().delete({ name, ...(options ?? {}) });
  },
};