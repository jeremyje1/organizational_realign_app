// This route should NOT import any wizard components.
// If you don’t need custom logic yet, keep it minimal:

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "ok" });
}