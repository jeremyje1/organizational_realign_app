"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <main className="px-4 py-6 sm:px-6 max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-2">Welcome to NorthPath</h1>
      <p className="text-sm text-gray-600 mb-6">
        Streamline, structure, and save your organizational realignment scenarios.
      </p>

      {isAuthenticated && session?.user ? (
        <>
          {session.user.image && (
            <img
              src={session.user.image}
              alt={session.user.name || session.user.email || "User"}
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
          )}
          <p className="mb-1 text-lg font-medium">{session.user.name || session.user.email}</p>
          <p className="mb-4 text-sm text-gray-600">{session.user.email}</p>
          <button
            onClick={() => signOut()}
            className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <h2 className="text-lg font-semibold mb-2">Login or start as guest</h2>
          <div className="mb-4 space-y-3">
            <button
              onClick={() => signIn("github")}
              className="bg-black text-white px-6 py-3 rounded w-full hover:bg-gray-900 transition"
            >
              Sign in with GitHub
            </button>
            <button
              onClick={() => signIn("google")}
              className="bg-red-600 text-white px-6 py-3 rounded w-full hover:bg-red-700 transition"
            >
              Sign in with Google
            </button>
            <button
              onClick={() => signIn("email")}
              className="bg-blue-600 text-white px-6 py-3 rounded w-full hover:bg-blue-700 transition"
            >
              Sign in with Email
            </button>
          </div>
          <hr className="my-6" />
          <button
            onClick={() => window.location.href = "/survey"}
            className="text-gray-600 underline text-sm hover:text-gray-800"
          >
            Continue as Guest
          </button>
        </>
      )}
    </main>
  );
}