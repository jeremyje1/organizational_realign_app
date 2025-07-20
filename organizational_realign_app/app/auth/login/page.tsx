import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { AuthForm } from '@/components/auth/AuthForm';

async function LoginPageContent() {
  const cookieStore = await cookies();
  const supabase = createServerComponentClient({ 
    cookies: () => Promise.resolve(cookieStore) 
  });

  // Check if user is already authenticated
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session) {
    redirect('/teams');
  }

  return <AuthForm />;
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  );
}
