'use client';

import { createBrowserClient } from '@supabase/ssr';

/** Singleton browser-side Supabase client */
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: true } },
);

/** Optional factory if you want a fresh client instance */
export const createSupabaseBrowser = () => supabase;