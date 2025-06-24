"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;
  if (!session)
    return (
      <button
        onClick={() => signIn("github")}
        className="rounded bg-black px-3 py-1 text-white"
      >
        Sign in with GitHub
      </button>
    );

  return (
    <div className="flex items-center gap-2">
      <img
        src={session.user?.image ?? ""}
        alt="avatar"
        className="h-6 w-6 rounded-full"
      />
      <span className="text-sm">{session.user?.name}</span>
      <button
        onClick={() => signOut()}
        className="rounded border px-2 py-1 text-xs"
      >
        Sign out
      </button>
    </div>
  );
}