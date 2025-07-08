/**
 * A/B Testing Analytics Dashboard
 * Comprehensive dashboard for monitoring and analyzing A/B test performance
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  abTestingManager, 
  ABTestConfig, 
  ABTestResults 
} from '@/lib/ab-testing';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Main Dashboard Component
export function ABTestingDashboard() {
  const [activeTests, setActiveTests] = useState<ABTestConfig[]>([]);
  const [results, setResults] = useState<Map<string, ABTestResults>>(new Map());
  const [loading, setLoading] = useState(true);
  const [_selectedTest, _setSelectedTest] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would fetch from an API
      const mockTests: ABTestConfig[] = [
        {
          testId: 'homepage_hero_v1',
          name: 'Homepage Hero Section',
          description: 'Testing different hero section designs',
          variants: [
            { id: 'control', name: 'Original Hero', weight: 50, isControl: true },
            { id: 'focused', name: 'Focused Value Prop', weight: 50 }
          ],
          trafficAllocation: 1.0,
          status: 'active',
          targetMetrics: ['assessment_start', 'consultation_request'],
          startDate: new Date('2024-01-01'),
          minSampleSize: 1000,
          confidenceLevel: 95
        },
        {
          testId: 'pricing_page_v1',
          name: 'Pricing Page Layout',
          description: 'Testing different pricing presentations',
          variants: [
            { id: 'control', name: 'Standard Pricing', weight: 33, isControl: true },
            { id: 'value_focused', name: 'Value-Focused', weight: 33 },
            { id: 'social_proof', name: 'Social Proof Heavy', weight: 34 }
          ],
          trafficAllocation: 1.0,
          status: 'active',
          targetMetrics: ['service_tier_checkout'],
          startDate: new Date('2024-01-15'),
          minSampleSize: 800,
          confidenceLevel: 95
        },
        {
          testId: 'cta_buttons_v1',
          name: 'Call-to-Action Buttons',
          description: 'Testing different CTA button copy',
          variants: [
            { id: 'control', name: 'Start Assessment', weight: 25, isControl: true },
            { id: 'urgency', name: 'Get Your Score Now', weight: 25 },
            { id: 'benefit', name: 'Discover Your Potential', weight: 25 },
            { id: 'action', name: 'Begin Analysis', weight: 25 }
          ],
          trafficAllocation: 1.0,
          status: 'completed',
          targetMetrics: ['assessment_start'],
          startDate: new Date('2023-12-01'),
          endDate: new Date('2023-12-31'),
          minSampleSize: 500,
          confidenceLevel: 95
        }
      ];

      setActiveTests(mockTests);

      // Load results for each test
      const resultsMap = new Map<string, ABTestResults>();
      for (const test of mockTests) {
        const testResults = await abTestingManager.getTestResults(test.testId);
        if (testResults) {
          resultsMap.set(test.testId, testResults);
        }
      }
      setResults(resultsMap);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const summaryStats = useMemo(() => {
    const totalTests = activeTests.length;
    const activeCount = activeTests.filter(t => t.status === 'active').length;
    const completedCount = activeTests.filter(t => t.status === 'completed').length;
    const winnersCount = Array.from(results.values()).filter(r => r.winner).length;

    return { totalTests, activeCount, completedCount, winnersCount };
  }, [activeTests, results]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">A/B Testing Dashboard</h1>
          <p className="text-gray-600">Monitor and analyze your A/B test performance</p>
        </div>
        <Button onClick={loadDashboardData}>Refresh Data</Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard
          title="Total Tests"
          value={summaryStats.totalTests}
          icon="🧪"
          color="blue"
        />
        <SummaryCard
          title="Active Tests"
          value={summaryStats.activeCount}
          icon="🟢"
          color="green"
        />
        <SummaryCard
          title="Completed Tests"
          value={summaryStats.completedCount}
          icon="✅"
          color="gray"
        />
        <SummaryCard
          title="Tests with Winners"
          value={summaryStats.winnersCount}
          icon="🏆"
          color="yellow"
        />
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="active">Active Tests</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab tests={activeTests} results={results} />
        </TabsContent>

        <TabsContent value="active">
          <ActiveTestsTab tests={activeTests} results={results} />
        </TabsContent>

        <TabsContent value="results">
          <ResultsTab tests={activeTests} results={results} />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsTab tests={activeTests} results={results} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Summary Card Component
interface SummaryCardProps {
  title: string;
  value: number;
  icon: string;
  color: 'blue' | 'green' | 'gray' | 'yellow';
}

function SummaryCard({ title, value, icon, color }: SummaryCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    gray: 'bg-gray-50 border-gray-200',
    yellow: 'bg-yellow-50 border-yellow-200'
  };

  return (
    <Card className={colorClasses[color]}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <span className="text-2xl">{icon}</span>
        </div>
      </CardContent>
    </Card>
  );
}

// Overview Tab
function OverviewTab({ 
  tests, 
  results 
}: { 
  tests: ABTestConfig[], 
  results: Map<string, ABTestResults> 
}) {
  const recentTests = tests.slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Tests */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTests.map(test => {
              const testResults = results.get(test.testId);
              return (
                <div key={test.testId} className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <div className="font-medium">{test.name}</div>
                    <div className="text-sm text-gray-600">{test.variants.length} variants</div>
                  </div>
                  <div className="text-right">
                    <Badge variant={test.status === 'active' ? 'default' : 'secondary'}>
                      {test.status}
                    </Badge>
                    {testResults?.winner && (
                      <div className="text-sm text-green-600 mt-1">Winner found</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Performance Overview Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Rate Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ConversionOverviewChart tests={tests} results={results} />
        </CardContent>
      </Card>
    </div>
  );
}

// Active Tests Tab
function ActiveTestsTab({ 
  tests, 
  results 
}: { 
  tests: ABTestConfig[], 
  results: Map<string, ABTestResults> 
}) {
  const activeTests = tests.filter(t => t.status === 'active');

  return (
    <div className="space-y-4">
      {activeTests.map(test => (
        <TestCard key={test.testId} test={test} results={results.get(test.testId)} />
      ))}
      {activeTests.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center text-gray-500">
            No active tests found
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Results Tab
function ResultsTab({ 
  tests, 
  results 
}: { 
  tests: ABTestConfig[], 
  results: Map<string, ABTestResults> 
}) {
  return (
    <div className="space-y-6">
      {tests.map(test => {
        const testResults = results.get(test.testId);
        if (!testResults) return null;

        return (
          <Card key={test.testId}>
            <CardHeader>
              <CardTitle>{test.name}</CardTitle>
              {testResults.winner && (
                <Badge className="w-fit">
                  Winner: {testResults.variants.find(v => v.variantId === testResults.winner)?.name}
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <TestResultsChart results={testResults} />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

// Analytics Tab
function AnalyticsTab({ 
  tests, 
  results 
}: { 
  tests: ABTestConfig[], 
  results: Map<string, ABTestResults> 
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Test Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <TestStatusChart tests={tests} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statistical Significance</CardTitle>
        </CardHeader>
        <CardContent>
          <StatisticalSignificanceChart results={results} />
        </CardContent>
      </Card>
    </div>
  );
}

// Test Card Component
function TestCard({ test, results }: { test: ABTestConfig, results?: ABTestResults }) {
  const progress = results ? Math.min(
    (results.variants.reduce((sum, v) => sum + v.participants, 0) / (test.minSampleSize || 1000)) * 100,
    100
  ) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{test.name}</CardTitle>
              <p className="text-sm text-gray-600 mt-1">{test.description}</p>
            </div>
            <Badge variant={test.status === 'active' ? 'default' : 'secondary'}>
              {test.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Progress */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Sample Size Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Variants */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {test.variants.map(variant => {
              const variantResults = results?.variants.find(v => v.variantId === variant.id);
              return (
                <div key={variant.id} className="border rounded p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-sm">{variant.name}</span>
                    {variant.isControl && <Badge variant="outline" className="text-xs">Control</Badge>}
                  </div>
                  {variantResults && (
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>Participants: {variantResults.participants}</div>
                      <div>Conversions: {variantResults.conversions}</div>
                      <div>Rate: {(variantResults.conversionRate * 100).toFixed(1)}%</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Target Metrics */}
          <div>
            <span className="text-sm font-medium">Target Metrics:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {test.targetMetrics.map(metric => (
                <Badge key={metric} variant="outline" className="text-xs">
                  {metric.replace('_', ' ')}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Chart Components
function ConversionOverviewChart({ 
  tests, 
  results 
}: { 
  tests: ABTestConfig[], 
  results: Map<string, ABTestResults> 
}) {
  const data = {
    labels: tests.map(t => t.name),
    datasets: [
      {
        label: 'Control Conversion Rate',
        data: tests.map(test => {
          const testResults = results.get(test.testId);
          const control = testResults?.variants.find(v => v.isControl);
          return control ? control.conversionRate * 100 : 0;
        }),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      },
      {
        label: 'Best Variant Rate',
        data: tests.map(test => {
          const testResults = results.get(test.testId);
          if (!testResults) return 0;
          const best = testResults.variants.reduce((max, v) => 
            v.conversionRate > max.conversionRate ? v : max
          );
          return best.conversionRate * 100;
        }),
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return value + '%';
          }
        }
      }
    }
  };

  return <Bar data={data} options={options} />;
}

function TestResultsChart({ results }: { results: ABTestResults }) {
  const data = {
    labels: results.variants.map(v => v.name),
    datasets: [
      {
        label: 'Conversion Rate (%)',
        data: results.variants.map(v => v.conversionRate * 100),
        backgroundColor: results.variants.map(v => 
          v.isControl ? 'rgba(107, 114, 128, 0.5)' : 
          results.winner === v.variantId ? 'rgba(34, 197, 94, 0.5)' : 'rgba(59, 130, 246, 0.5)'
        ),
        borderColor: results.variants.map(v => 
          v.isControl ? 'rgb(107, 114, 128)' : 
          results.winner === v.variantId ? 'rgb(34, 197, 94)' : 'rgb(59, 130, 246)'
        ),
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return value + '%';
          }
        }
      }
    }
  };

  return <Bar data={data} options={options} />;
}

function TestStatusChart({ tests }: { tests: ABTestConfig[] }) {
  const statusCounts = tests.reduce((acc, test) => {
    acc[test.status] = (acc[test.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = {
    labels: Object.keys(statusCounts).map(status => 
      status.charAt(0).toUpperCase() + status.slice(1)
    ),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: [
          'rgba(34, 197, 94, 0.5)',
          'rgba(59, 130, 246, 0.5)',
          'rgba(249, 115, 22, 0.5)',
          'rgba(107, 114, 128, 0.5)'
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(59, 130, 246)',
          'rgb(249, 115, 22)',
          'rgb(107, 114, 128)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const
      }
    }
  };

  return <Doughnut data={data} options={options} />;
}

function StatisticalSignificanceChart({ results }: { results: Map<string, ABTestResults> }) {
  const allVariants = Array.from(results.values()).flatMap(r => r.variants);
  const significantCount = allVariants.filter(v => v.isStatisticallySignificant).length;
  const totalCount = allVariants.length;

  const data = {
    labels: ['Statistically Significant', 'Not Significant'],
    datasets: [
      {
        data: [significantCount, totalCount - significantCount],
        backgroundColor: [
          'rgba(34, 197, 94, 0.5)',
          'rgba(107, 114, 128, 0.5)'
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(107, 114, 128)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const
      }
    }
  };

  return <Doughnut data={data} options={options} />;
}
