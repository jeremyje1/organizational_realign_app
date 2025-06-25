'use client';

import { createBrowserClient } from '@supabase/ssr';

/** Singleton browser-side Supabase client */
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      // keep existing session persistence
      persistSession: true,
      // enable PKCE flow required for OAuth in Edge/RSC
      flowType: 'pkce',
    },
  },
);

/** Optional factory if you want a fresh client instance */
export const createSupabaseBrowser = () => supabase;