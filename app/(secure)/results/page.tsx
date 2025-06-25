// app/(secure)/results/page.tsx
import { Suspense } from 'react';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

/** ----------------------------------------------------------------
 *  SEO / social metadata
 * ----------------------------------------------------------------*/
export const metadata = {
  title: 'Results | NorthPath',
  description: 'See your organizational realignment results',
};

/** ----------------------------------------------------------------
 *  Async server component that fetches session + summary
 * ----------------------------------------------------------------*/
async function ResultsContent() {
  const session = await auth();
  if (!session) redirect('/login');

  // Simulate async generation of summary
  await new Promise((res) => setTimeout(res, 800));
  const summary = 'Your realignment results are ready!';

  return (
    <main className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Results</h1>

      <p className="mb-4">
        Welcome back, {session.user?.email ?? 'user'}
      </p>

      <div className="text-lg text-gray-700">{summary}</div>
    </main>
  );
}

/** ----------------------------------------------------------------
 *  Wrapper component with Suspense + loading fallback
 * ----------------------------------------------------------------*/
export default function ResultsPage() {
  return (
    <Suspense fallback={<p className="p-6 text-center">Loading results…</p>}>
      <ResultsContent />
    </Suspense>
  );
}