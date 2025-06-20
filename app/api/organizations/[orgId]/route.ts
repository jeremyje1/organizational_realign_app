// app/api/organizations/[orgId]/route.ts

import { NextResponse } from "next/server";

/**
 * Temporary stub that just echoes the orgId back.
 * Replace with a real DB/service call later.
 */
export async function GET(
  request: Request,
  context: any
) {
  const { orgId } = context.params;
  return NextResponse.json({ orgId });
}