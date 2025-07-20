import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import SubscriptionManager from './lib/subscription-manager';
import { PricingTier } from './lib/tierConfiguration';

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
  '/teams',
  '/enterprise',
  '/scenario'
];

// Define tier-based access control
const TIER_ACCESS_CONTROL = {
  '/enterprise': ['ENTERPRISE'],
  '/enterprise/dashboard': ['ENTERPRISE'],
  '/scenario': ['TEAM', 'ENTERPRISE'],
  '/advanced-analytics': ['ENTERPRISE'],
  '/bulk-upload': ['TEAM', 'ENTERPRISE'],
  '/collaboration': ['TEAM', 'ENTERPRISE']
};

// Define admin routes that require special authentication
const ADMIN_ROUTES = [
  '/admin',
  '/admin/assessment',
  '/admin/analytics',
  '/admin/testing'
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host');
  
  // Check for admin route access
  const isAdminRoute = ADMIN_ROUTES.some(route => pathname.startsWith(route));
  if (isAdminRoute && pathname !== '/admin/login') {
    // For admin routes, redirect to admin login if not authenticated
    const adminToken = request.cookies.get('admin-token')?.value;
    if (adminToken !== 'stardynamics1124*') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  // Skip redirects for local development
  if (hostname?.includes('localhost') || hostname?.includes('127.0.0.1')) {
    // Check access control for protected routes
    const accessControl = await checkTierAccess(request, pathname);
    if (accessControl) {
      return accessControl;
    }
    
    return NextResponse.next();
  }
  
  // Skip redirects for API routes
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }
  
  // For single domain deployment (Vercel app), skip domain redirects
  if (hostname?.includes('vercel.app')) {
    // Check access control for protected routes
    const accessControl = await checkTierAccess(request, pathname);
    if (accessControl) {
      return accessControl;
    }
    
    return NextResponse.next();
  }
  
  // If we're on the main domain and trying to access app-specific paths
  if (hostname === 'northpathstrategies.org' || hostname === 'www.northpathstrategies.org') {
    // Check if the path should redirect to app subdomain
    const shouldRedirectToApp = APP_PATHS.some(path => 
      pathname.startsWith(path)
    );
    
    if (shouldRedirectToApp) {
      // Use environment variable or fallback to app subdomain
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://organizational-realign-app.vercel.app';
      return NextResponse.redirect(
        new URL(`${appUrl}${pathname}${request.nextUrl.search}`)
      );
    }
  }
  
  return NextResponse.next();
}

async function checkTierAccess(request: NextRequest, pathname: string): Promise<NextResponse | null> {
  // Check if the path requires tier-based access control
  const requiredTiers = Object.entries(TIER_ACCESS_CONTROL).find(([path]) => 
    pathname.startsWith(path)
  )?.[1];

  if (!requiredTiers) {
    return null; // No access control needed
  }

  try {
    // Get the session token
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    });

    if (!token) {
      // Not authenticated, redirect to login
      const loginUrl = new URL('/auth', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check user tier
    const userTier = (token as any)?.tier || 'INDIVIDUAL';
    const userId = (token as any)?.sub || (token as any)?.id;
    
    if (!requiredTiers.includes(userTier)) {
      // Insufficient tier access
      const upgradeUrl = new URL('/upgrade', request.url);
      upgradeUrl.searchParams.set('requiredTier', requiredTiers[0]);
      upgradeUrl.searchParams.set('currentTier', userTier);
      return NextResponse.redirect(upgradeUrl);
    }

    // For subscription tiers, check subscription status
    if (userId && (userTier === 'monthly-subscription' || userTier === 'comprehensive-package' || userTier === 'enterprise-transformation')) {
      try {
        const subscriptionAccess = await SubscriptionManager.checkSubscriptionAccess(userId, userTier as PricingTier);
        
        if (subscriptionAccess.access === 'denied') {
          const expiredUrl = new URL('/subscription/expired', request.url);
          expiredUrl.searchParams.set('tier', userTier);
          expiredUrl.searchParams.set('reason', subscriptionAccess.reason || 'expired');
          return NextResponse.redirect(expiredUrl);
        }
        
        if (subscriptionAccess.access === 'limited') {
          // Allow access but show warning banner
          const response = NextResponse.next();
          response.headers.set('X-Subscription-Warning', subscriptionAccess.reason || 'grace-period');
          return response;
        }
      } catch (error) {
        console.error('Subscription check failed, allowing access:', error);
        // On error, allow access but log the issue
      }
    }

    return null; // Access granted
  } catch (error) {
    console.error('Error checking tier access:', error);
    // On error, redirect to auth
    return NextResponse.redirect(new URL('/auth', request.url));
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};