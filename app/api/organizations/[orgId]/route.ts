// app/api/organizations/[orgId]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { orgId: string } },
) {
  // TODO: swap in real DB/service call later
  return NextResponse.json({ orgId: params.orgId });
}