import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import crypto from 'crypto';

// Import security middleware
import './middleware/security';

// Define which paths should redirect to the app subdomain
const APP_PATHS = [
  '/assessment/start',
  '/assessment/results', 
  '/dashboard',
  '/survey',
  '/assessment',
  '/secure',
  '/workspaces',
  '/teams'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host');
  
  // Skip redirects for local development
  if (hostname?.includes('localhost') || hostname?.includes('127.0.0.1')) {
    return NextResponse.next();
  }
  
  // If we're on the main domain and trying to access app-specific paths
  if (hostname === 'northpathstrategies.org' || hostname === 'www.northpathstrategies.org') {
    // Check if the path should redirect to app subdomain
    const shouldRedirectToApp = APP_PATHS.some(path => 
      pathname.startsWith(path)
    );
    
    if (shouldRedirectToApp) {
      return NextResponse.redirect(
        new URL(`https://app.northpathstrategies.org${pathname}${request.nextUrl.search}`)
      );
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};