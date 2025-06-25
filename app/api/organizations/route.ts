import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getSession } from '@/lib/auth'

/**
 * POST /api/organizations
 * Body: { name: string; description?: string }
 */
export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // NextAuth’s default Session type doesn’t include id; cast for now
  const ownerId = (session.user as any).id as string | undefined
  if (!ownerId) {
    return NextResponse.json(
      { error: 'User id missing on session' },
      { status: 400 }
    )
  }

  const { name, description = '' } = await req.json()

  try {
    const org = await prisma.organization.create({
      data: { name, description, ownerId }
    })
    return NextResponse.json(org, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: 'Could not create organization' },
      { status: 500 }
    )
  }
}