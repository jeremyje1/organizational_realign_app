/* filepath: /components/performance/PerformanceComponents.tsx */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  performanceMonitor, 
  PerformanceMetric, 
  PerformanceReport 
} from '@/lib/performance/performance-monitor';

interface _PerformanceDashboardProps {
  showDebugInfo?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

interface MetricCardProps {
  metric: PerformanceMetric;
  budget?: number;
}

interface PerformanceChartProps {
  metrics: PerformanceMetric[];
  metricName: string;
  height?: number;
}

/**
 * Real-time Performance Monitoring Hook
 */
export function usePerformanceMonitoring(autoRefresh = true, interval = 5000) {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [report, setReport] = useState<PerformanceReport | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    setIsMonitoring(true);
    
    // Get initial metrics
    setMetrics(performanceMonitor.getMetrics());
    setReport(performanceMonitor.generateReport());

    // Subscribe to new metrics
    const unsubscribe = performanceMonitor.onMetric((metric) => {
      setMetrics(prev => [...prev.slice(-99), metric]); // Keep last 100 metrics
    });

    // Auto-refresh report
    let intervalId: NodeJS.Timeout | null = null;
    if (autoRefresh) {
      intervalId = setInterval(() => {
        setReport(performanceMonitor.generateReport());
      }, interval);
    }

    return () => {
      unsubscribe();
      if (intervalId) clearInterval(intervalId);
      setIsMonitoring(false);
    };
  }, [autoRefresh, interval]);

  return { metrics, report, isMonitoring };
}

/**
 * Performance Metric Card
 */
function MetricCard({ metric, budget }: MetricCardProps) {
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'needs-improvement':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'poor':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatValue = (name: string, value: number) => {
    if (name.includes('Time') || ['LCP', 'FCP', 'TTFB', 'FID'].includes(name)) {
      return `${Math.round(value)}ms`;
    }
    if (name === 'CLS') {
      return value.toFixed(3);
    }
    return Math.round(value).toLocaleString();
  };

  return (
    <div className={`p-4 rounded-lg border-2 ${getRatingColor(metric.rating)}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-sm">{metric.name}</h3>
          <p className="text-2xl font-bold mt-1">
            {formatValue(metric.name, metric.value)}
          </p>
          {budget && (
            <p className="text-xs mt-1 opacity-75">
              Budget: {formatValue(metric.name, budget)}
            </p>
          )}
        </div>
        <div className={`px-2 py-1 rounded text-xs font-medium ${getRatingColor(metric.rating)}`}>
          {metric.rating}
        </div>
      </div>
      <div className="mt-2 text-xs opacity-75">
        {new Date(metric.timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
}

/**
 * Performance Chart Component
 */
function PerformanceChart({ metrics, metricName, height = 200 }: PerformanceChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const filteredMetrics = metrics.filter(m => m.name === metricName).slice(-50);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || filteredMetrics.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height: canvasHeight } = canvas;
    ctx.clearRect(0, 0, width, canvasHeight);

    // Calculate chart dimensions
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = canvasHeight - padding * 2;

    // Find min/max values
    const values = filteredMetrics.map(m => m.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const valueRange = maxValue - minValue || 1;

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const x = padding + (chartWidth / 10) * i;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }

    // Draw performance line
    if (filteredMetrics.length > 1) {
      ctx.strokeStyle = '#4f46e5';
      ctx.lineWidth = 2;
      ctx.beginPath();

      filteredMetrics.forEach((metric, index) => {
        const x = padding + (chartWidth / (filteredMetrics.length - 1)) * index;
        const y = padding + chartHeight - ((metric.value - minValue) / valueRange) * chartHeight;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();

      // Draw data points
      ctx.fillStyle = '#4f46e5';
      filteredMetrics.forEach((metric, index) => {
        const x = padding + (chartWidth / (filteredMetrics.length - 1)) * index;
        const y = padding + chartHeight - ((metric.value - minValue) / valueRange) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
      });
    }

    // Draw labels
    ctx.fillStyle = '#374151';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${Math.round(maxValue)}`, 10, padding + 5);
    ctx.fillText(`${Math.round(minValue)}`, 10, height - padding - 5);
    
  }, [filteredMetrics, height]);

  return (
    <div className="bg-white p-4 rounded-lg border">
      <h4 className="font-semibold mb-2">{metricName} Trend</h4>
      <canvas
        ref={canvasRef}
        width={400}
        height={height}
        className="w-full"
        style={{ height: `${height}px` }}
      />
    </div>
  );
}

/**
 * Core Web Vitals Dashboard
 */
export function CoreWebVitalsDashboard() {
  const { metrics, report } = usePerformanceMonitoring();
  
  const coreVitals = [
    { name: 'LCP', budget: 2500, description: 'Largest Contentful Paint' },
    { name: 'FID', budget: 100, description: 'First Input Delay' },
    { name: 'CLS', budget: 0.1, description: 'Cumulative Layout Shift' },
    { name: 'FCP', budget: 1800, description: 'First Contentful Paint' },
    { name: 'TTFB', budget: 800, description: 'Time to First Byte' },
  ];

  const getLatestMetric = (name: string) => {
    const filtered = metrics.filter(m => m.name === name);
    return filtered[filtered.length - 1];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Core Web Vitals</h2>
        {report && (
          <div className="text-right">
            <div className="text-3xl font-bold text-indigo-600">{report.summary.overallScore}%</div>
            <div className="text-sm text-gray-600">Performance Score</div>
          </div>
        )}
      </div>

      {/* Core Vitals Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {coreVitals.map(vital => {
          const metric = getLatestMetric(vital.name);
          return metric ? (
            <MetricCard 
              key={vital.name} 
              metric={metric} 
              budget={vital.budget} 
            />
          ) : (
            <div key={vital.name} className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-sm text-gray-600">{vital.name}</h3>
              <p className="text-sm text-gray-500 mt-1">Measuring...</p>
            </div>
          );
        })}
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {coreVitals.slice(0, 4).map(vital => (
          <PerformanceChart
            key={vital.name}
            metrics={metrics}
            metricName={vital.name}
            height={150}
          />
        ))}
      </div>

      {/* Recommendations */}
      {report && report.summary.recommendations.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">Performance Recommendations</h3>
          <ul className="list-disc list-inside space-y-1">
            {report.summary.recommendations.map((rec, index) => (
              <li key={index} className="text-yellow-700 text-sm">{rec}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Critical Issues */}
      {report && report.summary.criticalIssues.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="font-semibold text-red-800 mb-2">Critical Issues</h3>
          <ul className="list-disc list-inside space-y-1">
            {report.summary.criticalIssues.map((issue, index) => (
              <li key={index} className="text-red-700 text-sm">{issue}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/**
 * Performance Monitor Widget
 */
export function PerformanceMonitorWidget() {
  const { metrics } = usePerformanceMonitoring();
  const [isExpanded, setIsExpanded] = useState(false);

  const latestMetrics = ['LCP', 'FID', 'CLS'].map(name => {
    const filtered = metrics.filter(m => m.name === name);
    return filtered[filtered.length - 1];
  }).filter(Boolean);

  if (latestMetrics.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </button>

      {isExpanded && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border p-4 w-80">
          <h3 className="font-semibold mb-3">Performance Monitor</h3>
          <div className="space-y-2">
            {latestMetrics.map(metric => (
              <div key={metric.name} className="flex justify-between items-center">
                <span className="text-sm font-medium">{metric.name}</span>
                <span className={`text-sm px-2 py-1 rounded ${
                  metric.rating === 'good' ? 'bg-green-100 text-green-800' :
                  metric.rating === 'needs-improvement' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {Math.round(metric.value)}{metric.name === 'CLS' ? '' : 'ms'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Performance Testing Component
 */
export function PerformanceTester() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<string | null>(null);

  const runPerformanceTest = async () => {
    setIsRunning(true);
    
    // Simulate heavy operations
    performanceMonitor.markTiming('test-start');
    
    // Simulate component render
    performanceMonitor.trackComponentRender('TestComponent', () => {
      // Simulate heavy computation
      const start = Date.now();
      while (Date.now() - start < 100) {
        // Busy wait
      }
    });
    
    performanceMonitor.markTiming('test-end');
    const _duration = performanceMonitor.measureTiming('test-duration', 'test-start', 'test-end');
    
    setTimeout(() => {
      const report = performanceMonitor.generateReport();
      setResults(JSON.stringify(report, null, 2));
      setIsRunning(false);
    }, 2000);
  };

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h3 className="text-lg font-semibold mb-4">Performance Testing</h3>
      
      <button
        onClick={runPerformanceTest}
        disabled={isRunning}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {isRunning ? 'Running Test...' : 'Run Performance Test'}
      </button>

      {results && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Test Results:</h4>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
            {results}
          </pre>
        </div>
      )}
    </div>
  );
}

/**
 * System Information Display
 */
export function SystemInfoDisplay() {
  const { report } = usePerformanceMonitoring();

  if (!report) return null;

  const { systemInfo } = report;

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold mb-3">System Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <h4 className="font-medium text-gray-700">Browser</h4>
          <p className="text-gray-600 break-all">{systemInfo.userAgent}</p>
        </div>
        
        {systemInfo.connection && (
          <div>
            <h4 className="font-medium text-gray-700">Connection</h4>
            <p className="text-gray-600">
              {systemInfo.connection.effectiveType} - {systemInfo.connection.downlink}Mbps
            </p>
          </div>
        )}
        
        {systemInfo.memory && (
          <div>
            <h4 className="font-medium text-gray-700">Memory</h4>
            <p className="text-gray-600">
              {Math.round(systemInfo.memory.usedJSHeapSize / 1024 / 1024)}MB / 
              {Math.round(systemInfo.memory.totalJSHeapSize / 1024 / 1024)}MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoreWebVitalsDashboard;
