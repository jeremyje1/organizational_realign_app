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

    // Mock tier performance data
    const mockTierPerformance = {
      '7d': [
        {
          tier: 'AI Blueprint Program',
          type: 'ai-readiness',
          completions: 12,
          revenue: 3000,
          avgScore: 75.2,
          conversionRate: 85.7
        },
        {
          tier: 'Comprehensive Package',
          type: 'organizational',
          completions: 8,
          revenue: 1996,
          avgScore: 69.8,
          conversionRate: 80.0
        },
        {
          tier: 'AI Pulse Check',
          type: 'ai-readiness',
          completions: 15,
          revenue: 750,
          avgScore: 68.4,
          conversionRate: 93.8
        }
      ],
      '30d': [
        {
          tier: 'AI Blueprint Program',
          type: 'ai-readiness',
          completions: 45,
          revenue: 11250,
          avgScore: 72.3,
          conversionRate: 81.2
        },
        {
          tier: 'Comprehensive Package',
          type: 'organizational',
          completions: 38,
          revenue: 9466,
          avgScore: 68.7,
          conversionRate: 75.4
        },
        {
          tier: 'Monthly Subscription',
          type: 'organizational',
          completions: 67,
          revenue: 6633,
          avgScore: 65.1,
          conversionRate: 72.1
        },
        {
          tier: 'Comprehensive AI Assessment',
          type: 'ai-readiness',
          completions: 32,
          revenue: 4800,
          avgScore: 70.9,
          conversionRate: 78.0
        },
        {
          tier: 'AI Pulse Check',
          type: 'ai-readiness',
          completions: 89,
          revenue: 4450,
          avgScore: 66.2,
          conversionRate: 89.0
        }
      ],
      '90d': [
        {
          tier: 'AI Blueprint Program',
          type: 'ai-readiness',
          completions: 134,
          revenue: 33500,
          avgScore: 73.1,
          conversionRate: 82.5
        },
        {
          tier: 'Comprehensive Package',
          type: 'organizational',
          completions: 112,
          revenue: 27888,
          avgScore: 69.3,
          conversionRate: 76.8
        },
        {
          tier: 'Monthly Subscription',
          type: 'organizational',
          completions: 189,
          revenue: 18711,
          avgScore: 64.8,
          conversionRate: 73.7
        },
        {
          tier: 'Enterprise Transformation',
          type: 'organizational',
          completions: 23,
          revenue: 11500,
          avgScore: 77.4,
          conversionRate: 92.0
        },
        {
          tier: 'Comprehensive AI Assessment',
          type: 'ai-readiness',
          completions: 97,
          revenue: 14550,
          avgScore: 71.2,
          conversionRate: 79.4
        }
      ]
    };

    const tiers = mockTierPerformance[timeframe as keyof typeof mockTierPerformance] || mockTierPerformance['30d'];

    return NextResponse.json({ tiers });
  } catch (error) {
    console.error('Tier performance error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tier performance' },
      { status: 500 }
    );
  }
}
