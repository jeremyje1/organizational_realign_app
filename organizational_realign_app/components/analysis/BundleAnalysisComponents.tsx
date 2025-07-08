/* filepath: /components/analysis/BundleAnalysisComponents.tsx */

'use client';

import React, { useState, useMemo } from 'react';
import { 
  bundleAnalyzer, 
  BundleStats, 
  BundleAsset, 
  BundleChunk, 
  OptimizationRecommendation 
} from '@/lib/analysis/bundle-analyzer';

interface BundleDashboardProps {
  stats?: BundleStats;
}

interface AssetTableProps {
  assets: BundleAsset[];
  maxItems?: number;
}

interface ChunkTableProps {
  chunks: BundleChunk[];
  maxItems?: number;
}

interface OptimizationPanelProps {
  recommendations: OptimizationRecommendation[];
}

interface SizeChartProps {
  data: Array<{ name: string; size: number; type: string }>;
  title: string;
}

/**
 * Bundle Analysis Hook
 */
export function useBundleAnalysis() {
  const [stats, setStats] = useState<BundleStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeBundle = async (webpackStats: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const analysis = bundleAnalyzer.analyzeStats(webpackStats);
      setStats(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const generateReport = () => {
    return bundleAnalyzer.generateReport();
  };

  const exportData = () => {
    return bundleAnalyzer.exportAnalysis();
  };

  return {
    stats,
    loading,
    error,
    analyzeBundle,
    generateReport,
    exportData,
  };
}

/**
 * Size Chart Component
 */
function SizeChart({ data, title }: SizeChartProps) {
  const maxSize = Math.max(...data.map(item => item.size));
  
  return (
    <div className="bg-white p-4 rounded-lg border">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-2">
        {data.slice(0, 10).map((item, index) => {
          const percentage = (item.size / maxSize) * 100;
          const color = getTypeColor(item.type);
          
          return (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-32 text-sm truncate" title={item.name}>
                {item.name}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                <div
                  className={`${color} h-4 rounded-full transition-all duration-300`}
                  style={{ width: `${percentage}%` }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                  {formatBytes(item.size)}
                </span>
              </div>
              <div className="w-16 text-xs text-gray-600">
                {percentage.toFixed(1)}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Asset Table Component
 */
function AssetTable({ assets, maxItems = 20 }: AssetTableProps) {
  const [sortBy, setSortBy] = useState<'name' | 'size' | 'type'>('size');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedAssets = useMemo(() => {
    const sorted = [...assets].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      
      return sortOrder === 'asc' 
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });
    
    return sorted.slice(0, maxItems);
  }, [assets, sortBy, sortOrder, maxItems]);

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Assets ({assets.length})</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('size')}
              >
                Size {sortBy === 'size' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('type')}
              >
                Type {sortBy === 'type' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gzipped
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Chunks
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedAssets.map((asset, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 truncate max-w-xs" title={asset.name}>
                    {asset.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatBytes(asset.size)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadgeClass(asset.type)}`}>
                    {asset.type.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {asset.gzippedSize ? formatBytes(asset.gzippedSize) : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {asset.chunks.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * Chunk Table Component
 */
function ChunkTable({ chunks, maxItems = 15 }: ChunkTableProps) {
  const [sortBy, setSortBy] = useState<'name' | 'size'>('size');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedChunks = useMemo(() => {
    const sorted = [...chunks].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      
      return sortOrder === 'asc' 
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });
    
    return sorted.slice(0, maxItems);
  }, [chunks, sortBy, sortOrder, maxItems]);

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Chunks ({chunks.length})</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('size')}
              >
                Size {sortBy === 'size' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Modules
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Parents
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedChunks.map((chunk, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {chunk.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    ID: {chunk.id}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatBytes(chunk.size)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-1">
                    {chunk.isEntry && (
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        Entry
                      </span>
                    )}
                    {chunk.isAsync && (
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Async
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {chunk.modules.length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {chunk.parents.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * Optimization Panel Component
 */
function OptimizationPanel({ recommendations }: OptimizationPanelProps) {
  const groupedRecommendations = useMemo(() => {
    return recommendations.reduce((groups, rec) => {
      if (!groups[rec.category]) {
        groups[rec.category] = [];
      }
      groups[rec.category].push(rec);
      return groups;
    }, {} as Record<string, OptimizationRecommendation[]>);
  }, [recommendations]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'warning': return '⚠️';
      case 'suggestion': return '💡';
      case 'info': return 'ℹ️';
      default: return '📝';
    }
  };

  return (
    <div className="bg-white rounded-lg border">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Optimization Recommendations ({recommendations.length})</h3>
      </div>
      
      <div className="p-6 space-y-6">
        {Object.entries(groupedRecommendations).map(([category, recs]) => (
          <div key={category}>
            <h4 className="text-md font-medium text-gray-900 mb-3 capitalize">
              {category} ({recs.length})
            </h4>
            <div className="space-y-3">
              {recs.map((rec, index) => (
                <div key={index} className={`p-4 rounded-lg border-2 ${getImpactColor(rec.impact)}`}>
                  <div className="flex items-start space-x-3">
                    <span className="text-lg">{getTypeIcon(rec.type)}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium">{rec.description}</h5>
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${getImpactColor(rec.impact)}`}>
                          {rec.impact.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm mt-1 opacity-75">{rec.solution}</p>
                      {rec.estimatedSavings && (
                        <p className="text-sm mt-1 font-medium">
                          Estimated savings: {formatBytes(rec.estimatedSavings)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {recommendations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <span className="text-4xl">🎉</span>
            <p className="mt-2">No optimization recommendations!</p>
            <p className="text-sm">Your bundle is well optimized.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Bundle Dashboard Component
 */
export function BundleDashboard({ stats }: BundleDashboardProps) {
  if (!stats) {
    return (
      <div className="bg-white rounded-lg border p-8 text-center">
        <p className="text-gray-500">No bundle analysis data available</p>
      </div>
    );
  }

  const { totalSize, gzippedSize, assets, chunks, optimization } = stats;
  const compressionRatio = (gzippedSize / totalSize) * 100;

  // Prepare chart data
  const assetsByType = assets.reduce((acc, asset) => {
    acc[asset.type] = (acc[asset.type] || 0) + asset.size;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(assetsByType).map(([type, size]) => ({
    name: type.toUpperCase(),
    size,
    type,
  }));

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
                <span className="text-white text-sm font-bold">📦</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Size</dt>
                <dd className="text-lg font-medium text-gray-900">{formatBytes(totalSize)}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                <span className="text-white text-sm font-bold">🗜️</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Gzipped</dt>
                <dd className="text-lg font-medium text-gray-900">{formatBytes(gzippedSize)}</dd>
                <dd className="text-sm text-green-600">{compressionRatio.toFixed(1)}% of original</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                <span className="text-white text-sm font-bold">📄</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Assets</dt>
                <dd className="text-lg font-medium text-gray-900">{assets.length}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                <span className="text-white text-sm font-bold">🧩</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Chunks</dt>
                <dd className="text-lg font-medium text-gray-900">{chunks.length}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Optimization Status */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Optimization Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Tree Shaking', enabled: optimization.treeshaking.enabled },
            { name: 'Minification', enabled: optimization.minification.enabled },
            { name: 'Code Splitting', enabled: optimization.codesplitting.enabled },
            { name: 'Compression', enabled: optimization.compression.enabled },
          ].map((opt, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className={`w-3 h-3 rounded-full ${opt.enabled ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm">{opt.name}</span>
              <span className="text-xs text-gray-500">{opt.enabled ? '✓' : '✗'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SizeChart data={chartData} title="Bundle Composition by Type" />
        <SizeChart 
          data={assets.slice(0, 10).map(asset => ({
            name: asset.name.split('/').pop() || asset.name,
            size: asset.size,
            type: asset.type,
          }))} 
          title="Largest Assets" 
        />
      </div>

      <OptimizationPanel recommendations={optimization.recommendations} />
      
      <div className="grid grid-cols-1 gap-6">
        <AssetTable assets={assets} />
        <ChunkTable chunks={chunks} />
      </div>
    </div>
  );
}

/**
 * Bundle Analysis Tool
 */
export function BundleAnalysisTool() {
  const { stats, loading, error, analyzeBundle, generateReport, exportData } = useBundleAnalysis();
  const [reportText, setReportText] = useState<string>('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const webpackStats = JSON.parse(e.target?.result as string);
        analyzeBundle(webpackStats);
      } catch (err) {
        console.error('Failed to parse webpack stats:', err);
      }
    };
    reader.readAsText(file);
  };

  const handleGenerateReport = () => {
    const report = generateReport();
    setReportText(report);
  };

  const handleExportData = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bundle-analysis.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-white p-6 rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">Bundle Analysis Tool</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Webpack Stats JSON
            </label>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            <p className="text-xs text-gray-500 mt-1">
              Generate webpack stats with: webpack --json {'>'} stats.json
            </p>
          </div>

          {stats && (
            <div className="flex space-x-3">
              <button
                onClick={handleGenerateReport}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Generate Report
              </button>
              <button
                onClick={handleExportData}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Export Data
              </button>
            </div>
          )}
        </div>

        {loading && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-indigo-500 bg-indigo-100">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing bundle...
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
            <p className="text-red-600">{error}</p>
          </div>
        )}
      </div>

      {/* Report Text */}
      {reportText && (
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Analysis Report</h3>
          <pre className="text-sm bg-gray-100 p-4 rounded overflow-auto max-h-96 whitespace-pre-wrap">
            {reportText}
          </pre>
        </div>
      )}

      {/* Dashboard */}
      {stats && <BundleDashboard stats={stats} />}
    </div>
  );
}

// Utility functions
function formatBytes(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

function getTypeColor(type: string): string {
  const colors = {
    js: 'bg-blue-500',
    css: 'bg-green-500',
    image: 'bg-purple-500',
    font: 'bg-yellow-500',
    other: 'bg-gray-500',
  };
  return colors[type as keyof typeof colors] || colors.other;
}

function getTypeBadgeClass(type: string): string {
  const classes = {
    js: 'bg-blue-100 text-blue-800',
    css: 'bg-green-100 text-green-800',
    image: 'bg-purple-100 text-purple-800',
    font: 'bg-yellow-100 text-yellow-800',
    other: 'bg-gray-100 text-gray-800',
  };
  return classes[type as keyof typeof classes] || classes.other;
}

export default BundleDashboard;
