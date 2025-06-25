import { cookies } from "next/headers"
import { createServerClient, type CookieOptions } from "@supabase/ssr"
import type { Database } from "@/types/supabase"  // adjust if you named it differently

export const cookieStore = () =>
  createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get: (name) => cookies().get(name)?.value,
        set: (name, value, opts: CookieOptions) => cookies().set({ name, value, ...opts }),
        remove: (name, opts: CookieOptions) => cookies().set({ name, value: "", ...opts, maxAge: -1 }),
      },
    },
  )