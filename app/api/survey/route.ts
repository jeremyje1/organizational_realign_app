// app/api/survey/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import type { Database } from "@/types/supabase";

/**
 * Factory so we don’t repeat the boilerplate for every handler.
 */
function supabase() {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    { cookies }      // pass the cookies helper itself
  );
}

/* -------------------------------------------------------------------------- */
/* POST /api/survey  – save or update the current user’s survey data          */
/* -------------------------------------------------------------------------- */
export async function POST(req: NextRequest) {
  const payload = await req.json();
  if (!payload) {
    return NextResponse.json({ error: "Missing request body" }, { status: 400 });
  }

  const db = supabase();
  const {
    data: { user },
    error: authError,
  } = await db.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await db
    .from("surveys")
    .upsert({ id: user.id, data: payload })
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

/* -------------------------------------------------------------------------- */
/* GET /api/survey  – return the stored survey JSON for the logged-in user    */
/* -------------------------------------------------------------------------- */
export async function GET() {
  const db = supabase();
  const {
    data: { user },
  } = await db.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await db
    .from("surveys")
    .select("data")
    .eq("user_id", user.id)
    .single();

  if (error && error.code !== "PGRST116" /* no rows */) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // If no survey yet, return null so the UI can branch appropriately
  return NextResponse.json(data?.data ?? null, { status: 200 });
}