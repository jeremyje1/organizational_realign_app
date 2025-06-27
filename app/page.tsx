'use client';

import Link from 'next/link';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function HomePage() {
  const supabase = useSupabaseClient();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4">
      {/* ---------- Top nav ---------- */}
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between py-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-midnight">
          NorthPath
        </h1>

        <nav className="space-x-6 text-sm font-medium">
          <Link href="/dashboard" className="hover:text-gold">
            Dashboard
          </Link>
          <Link href="/survey" className="hover:text-gold">
            Survey
          </Link>
          <Link href="/realignment" className="hover:text-gold">
            Realignment
          </Link>
          <Link href="/results" className="hover:text-gold">
            Results
          </Link>
          <Link href="/workspaces" className="hover:text-gold">
            Workspaces
          </Link>
        </nav>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="text-center">
        <h2 className="mb-4 text-4xl font-bold md:text-5xl">
          Organizational&nbsp;Realignment&nbsp;Tool
        </h2>
        <p className="mb-8 max-w-xl text-lg text-slate-600">
          Guide your institution through smart restructuring&nbsp;&amp;
          AI‑ready design — in weeks, not months.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={handleLogin}
            className="rounded-md bg-midnight px-6 py-3 font-semibold text-white transition hover:bg-midnight/90"
          >
            Sign in with GitHub
          </button>

          <Link
            href="/survey"
            className="rounded-md border border-midnight px-6 py-3 font-medium text-midnight transition hover:bg-midnight hover:text-white"
          >
            Explore as guest
          </Link>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="mt-auto w-full py-6 text-center text-xs text-slate-500">
        Organizational&nbsp;Realignment&nbsp;Tool&nbsp;v1.0&nbsp;—{' '}
        <Link
          href="mailto:jeremy@northpathstrategies.org"
          className="underline hover:text-gold"
        >
          Send&nbsp;Feedback
        </Link>
      </footer>
    </main>
  );
}