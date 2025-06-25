/**
 * Lightweight browser client – used in the “/app” layer.
 * The server-side client (with cookies) already lives in src/lib/supabase-cookies.ts
 */
import { createBrowserClient } from '@supabase/ssr';

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);
