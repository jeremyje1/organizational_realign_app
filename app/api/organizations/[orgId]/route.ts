import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';   // Uncomment when DB is ready

/**
 * GET /api/organizations/:orgId
 * Fetch a single organization by ID.
 */
export async function GET(
  _req: Request,
  { params }: { params: { orgId: string } },
) {
  const { orgId } = params;
  const org = await prisma.organization.findUnique({ where: { id: orgId } });
  return NextResponse.json(org ?? { error: 'Not found' }, { status: org ? 200 : 404 });
}