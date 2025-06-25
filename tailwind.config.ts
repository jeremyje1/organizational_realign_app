import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Helper to find a single org by ID (string param from the URL)
async function findOrg(id: string) {
  return prisma.organization.findUnique({ where: { id } });
}

/**
 * GET /api/organizations/[orgId]
 * Returns the organization with the given ID.
 */
export async function GET(
  _req: Request,
  { params }: { params: { orgId: string } },
) {
  const org = await findOrg(params.orgId);
  if (!org) return new NextResponse('Not found', { status: 404 });
  return NextResponse.json(org);
}

/**
 * PATCH /api/organizations/[orgId]
 * Accepts JSON body with partial fields to update.
 */
export async function PATCH(
  req: Request,
  { params }: { params: { orgId: string } },
) {
  const data = await req.json();
  const updated = await prisma.organization.update({
    where: { id: params.orgId },
    data,
  });
  return NextResponse.json(updated);
}

/**
 * DELETE /api/organizations/[orgId]
 */
export async function DELETE(
  _req: Request,
  { params }: { params: { orgId: string } },
) {
  await prisma.organization.delete({ where: { id: params.orgId } });
  return new NextResponse(null, { status: 204 });
}