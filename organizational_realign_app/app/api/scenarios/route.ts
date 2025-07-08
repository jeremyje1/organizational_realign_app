import { NextRequest, NextResponse } from 'next/server';

/**
 * Simple in‑memory store until we hook this route up to a real database.
 * Replace with Prisma / Drizzle / your preferred ORM once the DB layer is ready.
 */
interface Scenario {
  id: number;
  title: string;
  description: string;
}

let scenarios: Scenario[] = [
  {
    id: 1,
    title: 'Department Restructure',
    description: 'Realign departments into new functional units.'
  },
  {
    id: 2,
    title: 'Budget Reallocation',
    description: 'Shift recurring funds to the top three strategic priorities.'
  }
];

/**
 * GET /api/scenarios
 * Returns the full list of scenarios.
 */
export async function GET() {
  return NextResponse.json(scenarios, { status: 200 });
}

/**
 * POST /api/scenarios
 * Creates a new scenario.  
 * Expected JSON body: `{ "title": string, "description": string }`
 */
export async function POST(request: NextRequest) {
  try {
    const { title, description } = await request.json();

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Both title and description are required.' },
        { status: 400 }
      );
    }

    const newScenario: Scenario = {
      id: scenarios.length ? scenarios[scenarios.length - 1].id + 1 : 1,
      title,
      description
    };

    scenarios.push(newScenario);

    return NextResponse.json(newScenario, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON payload.' },
      { status: 400 }
    );
  }
}

/**
 * Mark this route as dynamic so Next.js doesn’t cache responses.
 */
export const dynamic = 'force-dynamic';
