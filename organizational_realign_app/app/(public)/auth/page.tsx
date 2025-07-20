'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AuthForm } from '@/components/auth/AuthForm';

export default function AuthPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/teams');
      }
    };
    
    checkSession();
  }, [router, supabase.auth]);

  return <AuthForm />;
}