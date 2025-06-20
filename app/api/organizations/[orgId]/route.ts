// app/api/organizations/[orgId]/route.ts
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { orgId: string } }
) {
  // ⬅️ swap in real DB/service call later
  return NextResponse.json({ orgId: params.orgId });
}