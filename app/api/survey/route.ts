import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookieStore } from "@/lib/supabase-cookies";
import type { Database } from "@/types/supabase";

const supabase = createServerClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
  { cookies: cookieStore }
);

/* ---------- POST /api/survey ---------- */
export async function POST(request: Request) {
  const { data, userId } = await request.json();

  const { error } = await supabase
    .from("surveys")
    .insert({ user_id: userId, data });

  if (error) return NextResponse.json({ error }, { status: 400 });

  return NextResponse.json({ ok: true });
}

/* ---------- GET /api/survey?userId=... ---------- */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  const { data, error } = await supabase
    .from("surveys")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) return NextResponse.json({ error }, { status: 400 });

  return NextResponse.json({ survey: data });
}