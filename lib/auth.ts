// lib/auth.ts
// ──────────────────────────────────────────────────────────────
// Server-side auth() helper for Server Components.
// Uses Supabase to get the current session and throws if unauthenticated.

import { supabase } from '@/lib/supabase-client';
import type { Session } from '@supabase/auth-helpers-nextjs';

/**
 * auth: retrieves the current Supabase session.
 * Throws an error if there is no session or on failure.
 */
export async function auth(): Promise<Session> {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error('Error fetching session:', error.message);
    throw new Error('Authentication error');
  }
  if (!session) {
    throw new Error('Unauthenticated');
  }
  return session;
}
