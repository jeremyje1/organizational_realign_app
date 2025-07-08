import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  LineChart,
  Line,
  Area,
  AreaChart,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface VisualizationProps {
  data: any;
  type: 'bar' | 'pie' | 'radar' | 'scatter' | 'line' | 'area';
  title: string;
  description?: string;
  height?: number;
  className?: string;
}

const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d0',
  '#ffb347', '#87ceeb', '#98fb98', '#f0e68c', '#ff6347', '#40e0d0'
];

const CustomTooltip = ({ active, payload, label, formatter }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.dataKey}: ${formatter ? formatter(entry.value) : entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const DataVisualization: React.FC<VisualizationProps> = ({
  data,
  type,
  title,
  description,
  height = 300,
  className = ''
}) => {
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
              <Bar dataKey="benchmark" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'radar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <RadarChart data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Current State"
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Radar
                name="Target State"
                dataKey="B"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        );

      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <ScatterChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="AI Readiness" />
              <YAxis type="number" dataKey="y" name="Transformation Priority" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Departments" data={data} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="current" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="target" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="value" stackId="1" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        );

      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {renderChart()}
      </CardContent>
    </Card>
  );
};

// Specific chart components for common use cases
export const SectionScoresChart: React.FC<{ scores: any[] }> = ({ scores }) => {
  const chartData = scores.map(score => ({
    name: score.section,
    current: score.currentScore,
    target: score.targetScore,
    gap: score.targetScore - score.currentScore
  }));

  return (
    <DataVisualization
      data={chartData}
      type="bar"
      title="Section Performance Analysis"
      description="Current vs Target Scores by Organizational Section"
      height={400}
    />
  );
};

export const AIReadinessRadar: React.FC<{ readiness: any[] }> = ({ readiness }) => {
  const radarData = readiness.map(item => ({
    subject: item.dimension,
    A: item.currentLevel,
    B: item.targetLevel,
    fullMark: 100
  }));

  return (
    <DataVisualization
      data={radarData}
      type="radar"
      title="AI Readiness Assessment"
      description="Current vs Target AI Readiness Across Key Dimensions"
      height={400}
    />
  );
};

export const TransformationPriorityMatrix: React.FC<{ departments: any[] }> = ({ departments }) => {
  const scatterData = departments.map(dept => ({
    x: dept.aiReadiness,
    y: dept.transformationPriority,
    name: dept.name,
    z: dept.impact
  }));

  return (
    <DataVisualization
      data={scatterData}
      type="scatter"
      title="Transformation Priority Matrix"
      description="Department positioning by AI Readiness vs Transformation Priority"
      height={400}
    />
  );
};

export const ImplementationTimeline: React.FC<{ phases: any[] }> = ({ phases }) => {
  const timelineData = phases.map(phase => ({
    name: phase.name,
    duration: phase.duration,
    effort: phase.effort,
    risk: phase.risk
  }));

  return (
    <DataVisualization
      data={timelineData}
      type="area"
      title="Implementation Timeline"
      description="Phased approach to organizational transformation"
      height={300}
    />
  );
};

export const OrganizationalHealthMetrics: React.FC<{ metrics: any }> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Object.entries(metrics).map(([key, value]: [string, any]) => (
        <Card key={key}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{value.score}%</div>
            <Progress value={value.score} className="mt-2" />
            <div className="flex items-center justify-between mt-2">
              <Badge variant={value.trend === 'up' ? 'default' : 'secondary'}>
                {value.trend === 'up' ? '↑' : '↓'} {value.change}%
              </Badge>
              <span className="text-sm text-muted-foreground">{value.benchmark}% avg</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export const RiskAssessmentChart: React.FC<{ risks: any[] }> = ({ risks }) => {
  const riskData = risks.map(risk => ({
    name: risk.category,
    probability: risk.probability,
    impact: risk.impact,
    risk: risk.probability * risk.impact
  }));

  return (
    <DataVisualization
      data={riskData}
      type="scatter"
      title="Risk Assessment Matrix"
      description="Risk probability vs impact analysis"
      height={350}
    />
  );
};
