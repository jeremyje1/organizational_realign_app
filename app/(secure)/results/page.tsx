// app/results/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";

export default function ResultsPage() {
  const { data: session } = useSession();
  const [summary, setSummary] = useState<string | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      // Simulated results generation
      setSummary("Your realignment results are ready!");
    }
  }, []);

  return (
    <main className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Results</h1>
      {session ? (
        <p className="mb-4">Welcome back, {session.user?.email}</p>
      ) : (
        <p className="mb-4">You&apos;re viewing this as a guest.</p>
      )}
      <div className="text-lg text-gray-700">{summary}</div>
    </main>
  );
}