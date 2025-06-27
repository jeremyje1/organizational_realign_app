// lib/supabase-client.ts
// ──────────────────────────────────────────────────────────────
// Server‑side Supabase helper for **Server Components** / route handlers.
// It injects Next.js cookies & headers so Row‑Level Security sees the
// authenticated user, and it falls back to the env vars for URL + key.

import { cookies, headers } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase'; // generated – do not edit

// NOTE: Non‑null assertions (!) are OK here because they will
//       throw at boot if the env vars are missing.
export const supabase = createServerComponentClient<Database>({
  cookies,
  headers,
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
});