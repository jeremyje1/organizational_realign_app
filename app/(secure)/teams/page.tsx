// app/(secure)/teams/page.tsx
import { TeamDashboard } from '@/components/collaboration/TeamDashboard';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Team Dashboard',
  description: 'Collaborate with your team on organizational realignment assessments',
};

export default async function TeamsDashboardPage() {
  const supabase = createServerComponentClient({ cookies });
  
  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/auth/login?redirectTo=/teams');
  }
  
  return (
    <div className="container mx-auto py-6">
      <TeamDashboard userId={session.user.id} />
    </div>
  );
}
