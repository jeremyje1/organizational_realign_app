"use client";

import Link from "next/link";

export default function HomePage() {
  const handleLogin = () => {
    const githubClientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const redirectUri = encodeURIComponent(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`
    );
    const scope = "read:user user:email";

    window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4">
      {/* ---------- Top nav ---------- */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between py-6">
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
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Organizational&nbsp;Realignment&nbsp;Tool
        </h2>
        <p className="max-w-xl text-lg text-slate-600 mb-8">
          Guide your institution through smart restructuring&nbsp;&amp;
          AI‑ready design — in weeks, not months.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleLogin}
            className="bg-midnight text-white font-semibold px-6 py-3 rounded-md hover:bg-midnight/90 transition"
          >
            Sign in with GitHub
          </button>

          <Link
            href="/survey"
            className="border border-midnight text-midnight font-medium px-6 py-3 rounded-md hover:bg-midnight hover:text-white transition"
          >
            Explore as guest
          </Link>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="w-full mt-auto py-6 text-center text-xs text-slate-500">
        Organizational&nbsp;Realignment&nbsp;Tool&nbsp;v1.0&nbsp;—{" "}
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