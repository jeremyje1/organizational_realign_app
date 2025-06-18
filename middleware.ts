import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Example middleware logic: redirect to /realignment if root is accessed
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/realignment", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};