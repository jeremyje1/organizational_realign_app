// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Very light example – returns every request untouched.
export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

/**
 * Optional matcher — prevents middleware from running on static assets.
 * Adjust or remove if you need different behaviour.
 */
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};