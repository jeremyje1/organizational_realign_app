"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function DashboardPage() {
  if (typeof window === "undefined") return null;

  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <main className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to NorthPath</h1>

      {isAuthenticated && session?.user ? (
        <>
          <p className="text-lg font-medium mb-2">{session.user.name}</p>
          <p className="text-sm text-gray-500 mb-4">{session.user.email}</p>
          <button
            className="bg-gray-800 text-white px-6 py-2 rounded"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <p className="mb-4 text-sm text-gray-600">Sign in or continue as guest</p>
          <button
            className="bg-black text-white px-6 py-2 rounded mb-2"
            onClick={() => signIn("github")}
          >
            Sign in with GitHub
          </button>
          <br />
          <button
            className="text-blue-600 underline text-sm"
            onClick={() => (window.location.href = "/survey")}
          >
            Continue as Guest
          </button>
        </>
      )}
    </main>
  );
}