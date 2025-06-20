import { NextRequest, NextResponse } from "next/server";

const mockOrganizations = {
  "northpath-hcc": {
    id: "northpath-hcc",
    name: "Northpath at HCC",
    departments: [
      { id: "dept-1", name: "Academic Affairs" },
      { id: "dept-2", name: "Student Services" },
    ],
    createdAt: "2024-01-01T00:00:00Z",
  },
  "northpath-demo": {
    id: "northpath-demo",
    name: "Demo College Org",
    departments: [],
    createdAt: "2024-02-01T00:00:00Z",
  },
};

export async function GET(
  request: NextRequest,
  context: { params: { orgId: string } }
) {
  const orgId = context.params.orgId;
  const org = (mockOrganizations as Record<string, any>)[orgId];

  if (!org) {
    return NextResponse.json({ error: "Organization not found" }, { status: 404 });
  }

  return NextResponse.json(org);
}