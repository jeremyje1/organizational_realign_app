import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function GET(
  _req: NextRequest,
  { params }: { params: { orgId: string } }
) {
  const session = await getSession()
  if (!session || !session.user)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const org = await prisma.organization.findUnique({
    where: { id: params.orgId }
  })
  if (!org) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(org)
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { orgId: string } }
) {
  const session = await getSession()
  if (!session || !session.user)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await req.json()

  try {
    const org = await prisma.organization.update({
      where: { id: params.orgId },
      data
    })
    return NextResponse.json(org)
  } catch (err) {
    return NextResponse.json(
      { error: 'Update failed' },
      { status: 500 }
    )
  }
}