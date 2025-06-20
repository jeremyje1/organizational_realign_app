// Simple echo route for `/api/organizations/:orgId`
// Returns the orgId provided in the URL. Expand later with DB lookup.

export async function GET(
  _req: Request,
  { params }: { params: { orgId: string } }
) {
  return Response.json({ orgId: params.orgId });
}