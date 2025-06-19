import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Example middleware — adjust logic as needed
export function middleware(request: NextRequest) {
  return NextResponse.next();
}