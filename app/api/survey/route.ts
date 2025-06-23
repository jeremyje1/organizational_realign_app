import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/types/supabase";
import { cookieStore } from "@/lib/supabase-cookies";   // <- NEW

const supabase = createServerClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
  { cookies: cookieStore }                              // <- NEW
);

/* ---------- POST /api/survey ---------- */
export async function POST(request: Request) {
  const { data, userId } = await request.json();

  if (!userId) {
    return NextResponse.json(
      { error: "Missing userId in request body" },
      { status: 400 },
    );
  }

  const { error } = await supabase
    .from("surveys")
    .insert(
      [{ user_id: userId, data }] as Database["public"]["Tables"]["surveys"]["Insert"][]
    );

  if (error) return NextResponse.json({ error }, { status: 400 });
  return NextResponse.json({ ok: true });
}

/* ---------- GET /api/survey?userId=... ---------- */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "Missing userId query param" },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("surveys")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) return NextResponse.json({ error }, { status: 400 });
  return NextResponse.json({ survey: data });
}