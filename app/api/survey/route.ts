import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies as nextCookies } from 'next/headers';
import {
  createServerClient,
  type CookieOptions,
} from '@supabase/ssr';

// Build a server‑side Supabase client that can read & write cookies
const cookieStore = nextCookies();

const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      get: (name) => cookieStore.get(name)?.value,
      set: (name: string, value: string, options?: CookieOptions) => {
        cookieStore.set({ name, value, ...(options ?? {}) });
      },
      remove: (name: string, options?: CookieOptions) => {
        cookieStore.delete({ name, ...(options ?? {}) });
      },
    },
  },
);

/** POST /survey – persists survey answers */
export async function POST(req: NextRequest) {
  const body = await req.json();

  const { error } = await supabase
    .from('surveys')
    .insert([{ answers: body }]);

  if (error) {
    console.error('[survey POST]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}