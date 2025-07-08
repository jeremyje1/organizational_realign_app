'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { PagesBackground } from '@/components/ui/pages-background';

export default function AuthPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/');
      }
    };
    
    checkSession();
  }, [router, supabase.auth]);

  return (
    <PagesBackground>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Authentication
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Please sign in to continue
            </p>
          </div>
        </div>
      </div>
    </PagesBackground>
  );
}