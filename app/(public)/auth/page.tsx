

'use client';

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';
import { useState } from 'react';

/**
 * Public Auth page – allows users to sign‑in either
 * with a magic‑link email or their Google account.
 */
export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // ───────── helpers ──────────────────────────────────────────
  const signInWithEmail = async () => {
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Check your inbox for a magic sign‑in link.');
    }
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) {
      setMessage(error.message);
      setLoading(false);
    }
    // On success, Supabase will redirect back to the site automatically
  };

  // ───────── UI ───────────────────────────────────────────────
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow">
        <h1 className="text-center text-2xl font-semibold text-gray-800">
          Sign in to Organizational&nbsp;Realign
        </h1>

        {/* Email sign‑in */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Work email
          </label>
          <input
            type="email"
            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            placeholder="you@company.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button
            onClick={signInWithEmail}
            disabled={loading || !email}
            className="w-full rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Sending…' : 'Send magic link'}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center">
          <span className="flex-grow border-t border-gray-200" />
          <span className="mx-3 text-xs uppercase text-gray-400">Or</span>
          <span className="flex-grow border-t border-gray-200" />
        </div>

        {/* Google sign‑in */}
        <button
          onClick={signInWithGoogle}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="h-5 w-5"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.43 0 6.25 1.18 8.5 3.5l6.3-6.3C35.08 3.14 29.88.5 24 .5 14.52.5 6.43 5.96 2.64 13.12l7.54 5.85C13.16 12.19 18.11 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.5 24.5c0-1.5-.13-2.93-.38-4.33H24v8.17h12.5c-.54 3.02-2.19 5.57-4.67 7.3l7.3 5.66c4.31-3.98 6.87-9.85 6.87-16.8z"
            />
            <path
              fill="#FBBC05"
              d="M10.18 28.97A14.99 14.99 0 0 1 9 24c0-1.73.3-3.4.85-4.97l-7.54-5.85A24 24 0 0 0 0 24c0 3.91.9 7.61 2.46 10.87l7.72-5.9z"
            />
            <path
              fill="#34A853"
              d="M24 47.5c6.48 0 11.94-2.14 15.92-5.82l-7.3-5.66c-2.04 1.4-4.66 2.23-8.62 2.23-5.89 0-10.84-3.69-12.68-8.85l-7.54 5.85C6.43 42.04 14.52 47.5 24 47.5z"
            />
            <path fill="none" d="M0 0h48v48H0z" />
          </svg>
          Continue with Google
        </button>

        {message && (
          <p className="rounded bg-yellow-50 px-3 py-2 text-xs text-yellow-800">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}