import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.includes('stardynamics1124*')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const timeframe = searchParams.get('timeframe') || '30d';

    // Mock data - in production, this would query your database
    const mockStats = {
      '7d': {
        totalAssessments: 47,
        completedAssessments: 38,
        activeUsers: 23,
        revenue: 3750,
        conversionRate: 80.8,
        avgCompletionTime: 28,
        topTier: 'AI Blueprint Program',
        growthRate: 15.2
      },
      '30d': {
        totalAssessments: 247,
        completedAssessments: 198,
        activeUsers: 143,
        revenue: 18750,
        conversionRate: 68.2,
        avgCompletionTime: 32,
        topTier: 'Comprehensive AI Assessment',
        growthRate: 23.4
      },
      '90d': {
        totalAssessments: 692,
        completedAssessments: 534,
        activeUsers: 387,
        revenue: 47850,
        conversionRate: 72.1,
        avgCompletionTime: 35,
        topTier: 'AI Blueprint Program',
        growthRate: 18.7
      }
    };

    const stats = mockStats[timeframe as keyof typeof mockStats] || mockStats['30d'];

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
