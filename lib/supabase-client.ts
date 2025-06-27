import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/supabase';        // ← generate via `supabase gen types typescript --schema public`

export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Expose the client globally so we can inspect it in DevTools
if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.supabase = supabase;
}