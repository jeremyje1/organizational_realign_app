import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { Database } from "@/types/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { data: surveyData } = body as { data: unknown };

  const supabase = createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    { cookies }
  );

  const {
    data,
    error,
  } = await supabase.from("surveys").upsert(
    {
      user_id: body.userId,          // make sure your payload includes this
      data: surveyData,
    },
    { onConflict: "user_id" }        // keeps one row per user
  );

  if (error) return NextResponse.json({ error }, { status: 400 });
  return NextResponse.json({ data });
}

export async function GET() {
  const supabase = createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    { cookies }
  );

  const {
    data,
    error,
  } = await supabase
    .from("surveys")
    .select("data")
    .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
    .single();

  if (error) return NextResponse.json({ error }, { status: 400 });
  return NextResponse.json({ data: data?.data ?? null });
}