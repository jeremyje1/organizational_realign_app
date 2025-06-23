'use client';

import { createBrowserClient } from '@supabase/ssr';   // ⬅️ new helper from supabase-js v2
// If you don't have @supabase/ssr installed yet:
///  pnpm add @supabase/ssr

export const createSupabaseBrowser = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: { persistSession: true },
    },
  );