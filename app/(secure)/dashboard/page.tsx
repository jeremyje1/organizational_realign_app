import type { Session } from '@supabase/auth-helpers-nextjs';
import { Suspense } from 'react';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

/** ----------------------------------------------------------------
 *  ① SEO / social metadata
 * ----------------------------------------------------------------*/
export const metadata = {
  title: 'Dashboard | NorthPath',
  description: 'Your private organizational dashboard',
};

/** ----------------------------------------------------------------
 *  ② Re‑usable banner component
 * ----------------------------------------------------------------*/
function WelcomeBanner({ user }: { user: Session['user'] }) {
  const displayName = (user.user_metadata as any)?.name ?? user.email;
  return (
    <h1 className="text-2xl font-semibold">
      Welcome, {displayName}!
    </h1>
  );
}

/** ----------------------------------------------------------------
 *  ③ Async content wrapped in Suspense with loading fallback
 * ----------------------------------------------------------------*/
async function DashboardContent() {
  const session = await auth();
  if (!session) redirect('/login');

  return (
    <main className="min-h-screen bg-neutral-50 p-8">
      <WelcomeBanner user={session.user} />
      {/* …your dashboard content… */}
    </main>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<p className="p-8">Loading…</p>}>
      <DashboardContent />
    </Suspense>
  );
}