// app/dashboard/page.tsx
"use client";

import { useSession, signIn } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <main className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to NorthPath</h1>

      {session ? (
        <p className="mb-6">Signed in as {session.user?.email}</p>
      ) : (
        <button
          onClick={() => signIn("github")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sign in with GitHub
        </button>
      )}
    </main>
  );
}