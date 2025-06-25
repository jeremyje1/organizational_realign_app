import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * GET /api/organizations/[orgId]
 * Returns the organization (or 404) based on the dynamic route param.
 */
export async function GET(
  _req: Request,
  { params }: { params: { orgId: string } }
) {
  const org = await prisma.organization.findUnique({
    where: { id: params.orgId },
  });

  if (!org) {
    return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
  }

  return NextResponse.json(org);
}