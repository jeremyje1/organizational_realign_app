"use client";

import { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart
} from 'recharts';
import { TrendingUp, TrendingDown, Minus, Target } from 'lucide-react';

interface DataPoint {
  name: string;
  value: number;
  label?: string;
  target?: number;
  status?: 'excellent' | 'good' | 'needs-improvement' | 'critical';
}

interface ChartProps {
  data: DataPoint[];
  type: 'bar' | 'radar' | 'pie' | 'line' | 'area';
  title: string;
  description?: string;
  height?: number;
  showTarget?: boolean;
  colorScheme?: 'purple' | 'emerald' | 'amber' | 'red' | 'blue';
}

const colorSchemes = {
  purple: {
    primary: '#0EA5E9',
    secondary: '#0284C7',
    gradient: 'from-primary-500 to-primary-600',
    light: '#38BDF8'
  },
  emerald: {
    primary: '#10B981',
    secondary: '#059669',
    gradient: 'from-emerald-500 to-emerald-600',
    light: '#6EE7B7'
  },
  amber: {
    primary: '#EAB308',
    secondary: '#CA8A04',
    gradient: 'from-secondary-500 to-secondary-600',
    light: '#FDE047'
  },
  red: {
    primary: '#EF4444',
    secondary: '#DC2626',
    gradient: 'from-red-500 to-red-600',
    light: '#F87171'
  },
  blue: {
    primary: '#0EA5E9',
    secondary: '#0284C7',
    gradient: 'from-primary-500 to-primary-600',
    light: '#38BDF8'
  }
};

const statusColors = {
  excellent: '#10B981',
  good: '#0EA5E9',
  'needs-improvement': '#EAB308',
  critical: '#EF4444'
};

export function EnhancedChart({ 
  data, 
  type, 
  title, 
  description, 
  height = 300, 
  showTarget = false,
  colorScheme = 'purple' 
}: ChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const colors = colorSchemes[colorScheme];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-600/50 rounded-lg p-3 shadow-xl">
          <p className="text-slate-200 font-medium">{label}</p>
          <p className="text-purple-300">
            Value: <span className="font-semibold">{data.value}</span>
            {data.payload.target && (
              <span className="text-slate-400 ml-2">
                (Target: {data.payload.target})
              </span>
            )}
          </p>
          {data.payload.status && (
            <div className="flex items-center gap-2 mt-1">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: statusColors[data.payload.status as keyof typeof statusColors] || statusColors.good }}
              />
              <span className="text-xs text-slate-400 capitalize">
                {data.payload.status?.replace('-', ' ') || 'good'}
              </span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const getTrendIcon = (value: number, target?: number) => {
    if (!target) return <Minus className="h-4 w-4 text-slate-400" />;
    
    if (value >= target) {
      return <TrendingUp className="h-4 w-4 text-emerald-400" />;
    } else if (value >= target * 0.8) {
      return <Target className="h-4 w-4 text-amber-400" />;
    } else {
      return <TrendingDown className="h-4 w-4 text-red-400" />;
    }
  };

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="name" 
                stroke="#9CA3AF" 
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                fill={colors.primary}
                radius={[4, 4, 0, 0]}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              />
              {showTarget && (
                <Bar 
                  dataKey="target" 
                  fill="rgba(156, 163, 175, 0.3)"
                  radius={[2, 2, 0, 0]}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        );

      case 'radar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <RadarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 5]} 
                tick={{ fill: '#9CA3AF', fontSize: 10 }}
              />
              <Radar
                name="Score"
                dataKey="value"
                stroke={colors.primary}
                fill={colors.primary}
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={Math.min(height * 0.35, 120)}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.status ? statusColors[entry.status] : colors.primary}
                    stroke={activeIndex === index ? '#FFFFFF' : 'none'}
                    strokeWidth={activeIndex === index ? 2 : 0}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={colors.primary}
                strokeWidth={3}
                dot={{ fill: colors.primary, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: colors.primary, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={colors.primary}
                fill={colors.primary}
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  // Calculate summary stats
  const avgValue = data.length > 0 ? data.reduce((sum, item) => sum + item.value, 0) / data.length : 0;
  const maxValue = Math.max(...data.map(item => item.value));
  const minValue = Math.min(...data.map(item => item.value));

  return (
    <div className="card p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
          {description && (
            <p className="text-sm text-slate-400">{description}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          <div className="text-center">
            <div className="text-slate-400 text-xs">Average</div>
            <div className="font-semibold text-slate-200">{avgValue.toFixed(1)}</div>
          </div>
          <div className="text-center">
            <div className="text-slate-400 text-xs">Range</div>
            <div className="font-semibold text-slate-200">{minValue} - {maxValue}</div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        {renderChart()}
      </div>

      {/* Data Summary for larger datasets */}
      {data.length > 0 && type !== 'pie' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-600/30">
          {data.slice(0, 4).map((item, index) => (
            <div key={index} className="text-center space-y-1">
              <div className="flex items-center justify-center gap-1">
                {getTrendIcon(item.value, item.target)}
                <span className="text-xs text-slate-400 truncate">{item.name}</span>
              </div>
              <div className="font-semibold text-slate-200">{item.value}</div>
              {item.target && (
                <div className="text-xs text-slate-500">Target: {item.target}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Status Legend for pie charts */}
      {type === 'pie' && data.some(item => item.status) && (
        <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-600/30">
          {Object.entries(statusColors).map(([status, color]) => (
            <div key={status} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-slate-400 capitalize">
                {status.replace('-', ' ')}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
