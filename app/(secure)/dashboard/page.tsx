// app/(secure)/dashboard/page.tsx
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  return (
    <main className="min-h-screen bg-neutral-50 p-8">
      <h1 className="text-2xl font-semibold">
        Welcome, {session.user?.name ?? 'user'}!
      </h1>
      {/* …your dashboard content… */}
    </main>
  )
}