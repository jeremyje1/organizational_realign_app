import { NextResponse } from "next/server";

export async function GET() {
  // TODO: real auth callback logic
  return NextResponse.redirect(new URL("/dashboard", process.env.NEXT_PUBLIC_URL));
}