'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export default function AuthButton() {
  const { data: session, status } = useSession()
  if (status === 'loading') return null

  return session ? (
    <button
      onClick={() => signOut()}
      className="rounded bg-neutral-800 px-3 py-2 text-xs font-medium text-white hover:bg-neutral-700"
    >
      Sign out
    </button>
  ) : (
    <button
      onClick={() => signIn()}
      className="rounded border px-3 py-2 text-xs font-medium hover:bg-neutral-100"
    >
      Sign in
    </button>
  )
}