'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { LayoutDashboard, FileText, GitBranch, BarChart3, Briefcase } from 'lucide-react';

export default function HomePage() {
  const supabase = useSupabaseClient();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 elegant-bg">
      {/* ---------- Top nav ---------- */}
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between py-6 px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg border border-white/20">
            <span className="text-white font-bold text-lg">NP</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-100">
            NorthPath
          </h1>
        </div>

        <nav className="flex items-center gap-2 sm:gap-4" role="navigation" aria-label="Main navigation">
          <Link href={"/dashboard" as Route} className="nav-button" aria-label="Go to Dashboard">
            <LayoutDashboard className="w-4 h-4 mr-2" aria-hidden="true" />
            <span>Dashboard</span>
          </Link>
          <Link href={"/survey" as Route} className="nav-button" aria-label="Go to Survey">
            <FileText className="w-4 h-4 mr-2" aria-hidden="true" />
            <span>Survey</span>
          </Link>
          <Link href={"/realignment" as Route} className="nav-button" aria-label="Go to Realignment">
            <GitBranch className="w-4 h-4 mr-2" aria-hidden="true" />
            <span>Realignment</span>
          </Link>
          <Link href={"/results" as Route} className="nav-button" aria-label="Go to Results">
            <BarChart3 className="w-4 h-4 mr-2" aria-hidden="true" />
            <span>Results</span>
          </Link>
          <Link href={"/workspaces" as Route} className="nav-button" aria-label="Go to Workspaces">
            <Briefcase className="w-4 h-4 mr-2" aria-hidden="true" />
            <span>Workspaces</span>
          </Link>
        </nav>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="text-center animate-fade-in px-4" role="main" aria-labelledby="main-heading">
        <div className="card card-hover p-8 sm:p-12 mb-8 max-w-4xl">
          <h2 id="main-heading" className="mb-8 text-3xl sm:text-4xl md:text-5xl font-bold" 
              style={{
                lineHeight: '1.1', 
                color: '#f1f5f9', 
                fontWeight: '700'
              }}>
            Organizational&nbsp;Realignment&nbsp;Tool
          </h2>
          <p className="mb-8 max-w-xl mx-auto text-lg sm:text-xl" 
             style={{
               lineHeight: '2', 
               color: '#cbd5e1',
               fontWeight: '500'
             }}>
            Guide your institution through smart restructuring&nbsp;&amp;
            AI‑ready design.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={handleLogin}
              className="btn btn-primary"
            >
              Sign in with GitHub
            </button>

            <Link
              href={"/survey" as Route}
              className="btn btn-outline"
            >
              Explore as guest
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="mt-auto w-full py-8 text-center">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg py-4 px-6 mx-auto max-w-md shadow-sm">
          <p className="text-sm font-medium text-slate-200">
            Organizational&nbsp;Realignment&nbsp;Tool&nbsp;v1.0&nbsp;—{' '}
            <Link
              href="mailto:jeremy@northpathstrategies.org"
              className="text-purple-300 hover:text-purple-100 underline underline-offset-2 transition-colors font-semibold"
            >
              Send&nbsp;Feedback
            </Link>
          </p>
        </div>
      </footer>
    </main>
  );
}
