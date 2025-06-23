import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies,
  });

  const { data, error } = await supabase.from("surveys").upsert(body).select();
  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json(data, { status: 200 });
}

export async function GET() {
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies,
  });

  const { data, error } = await supabase.from("surveys").select("*");
  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json(data, { status: 200 });
}