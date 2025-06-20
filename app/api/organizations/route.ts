import { NextResponse } from "next/server";

/**
 * GET /api/organizations/:orgId
 *
 * Next 15 App‑Router route.  The second argument **must** be the context
 * object shaped as `{ params: … }` – see:
 * https://nextjs.org/docs/app/building-your-application/routing/route-handlers
 */
export async function GET(
  _req: Request,
  { params }: { params: { orgId: string } }
) {
  const { orgId } = params;

  // TODO: replace with real lookup once Prisma models are wired up.
  return NextResponse.json({ orgId });
}