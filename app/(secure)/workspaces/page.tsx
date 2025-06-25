// lib/supabase.ts
'use client';

import { createBrowserClient } from '@supabase/ssr';

/** Singleton browser-side Supabase client */
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: true } },
);

export default supabase; // optional default export for convenience