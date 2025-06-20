// app/api/realignment/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json(); // RealignmentFormData

  // TODO: 1) validate, 2) persist to DB (Prisma), 3) email yourself, etc.
  console.log("New realignment submission", data);

  return NextResponse.json({ ok: true });
}