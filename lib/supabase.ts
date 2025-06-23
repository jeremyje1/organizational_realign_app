import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Server‑side Supabase client
 * ▸ uses the **service role key** so that Row‑Level Security (RLS) policies
 *   you added in Supabase are evaluated while still allowing inserts/updates.
 * ▸ sessions are **not** persisted in cookies because this file is only
 *   imported in server components / API routes.
 */
export const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});