'use client';

import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

/**
 * AuthButton — Supabase version
 * ● If user is signed in → shows avatar (if any), name, and “Sign out”
 * ● If not signed in → shows “Sign in with Google” button
 */
export default function AuthButton() {
  const supabase = useSupabaseClient();
  const user = useUser();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (user)
    return (
      <div className="flex items-center gap-2">
        {user.user_metadata?.avatar_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.user_metadata.avatar_url as string}
            alt="avatar"
            className="h-6 w-6 rounded-full"
          />
        )}
        <span className="text-sm">{user.user_metadata?.name ?? user.email}</span>
        <button onClick={handleSignOut} className="rounded border px-2 py-1 text-xs">
          Sign out
        </button>
      </div>
    );

  return (
    <button
      onClick={handleSignIn}
      className="rounded bg-black px-3 py-1 text-white"
    >
      Sign in with Google
    </button>
  );
}