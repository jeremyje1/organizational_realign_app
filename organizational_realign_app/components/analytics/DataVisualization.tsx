'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  RadialLinearScale,
  Filler,
} from 'chart.js'
import {
  Line,
  Bar,
  Radar,
  Scatter,
  Bubble,
} from 'react-chartjs-2'
import 'chartjs-adapter-date-fns'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  RadialLinearScale,
  Filler
)

// Chart color palettes
export const chartColors = {
  primary: [
    'rgba(59, 130, 246, 0.8)',   // blue-500
    'rgba(16, 185, 129, 0.8)',   // emerald-500
    'rgba(245, 158, 11, 0.8)',   // amber-500
    'rgba(239, 68, 68, 0.8)',    // red-500
    'rgba(139, 92, 246, 0.8)',   // violet-500
    'rgba(236, 72, 153, 0.8)',   // pink-500
    'rgba(6, 182, 212, 0.8)',    // cyan-500
    'rgba(34, 197, 94, 0.8)',    // green-500
  ],
  borders: [
    'rgba(59, 130, 246, 1)',
    'rgba(16, 185, 129, 1)',
    'rgba(245, 158, 11, 1)',
    'rgba(239, 68, 68, 1)',
    'rgba(139, 92, 246, 1)',
    'rgba(236, 72, 153, 1)',
    'rgba(6, 182, 212, 1)',
    'rgba(34, 197, 94, 1)',
  ],
  gradients: {
    blue: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.8) 100%)',
    green: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.8) 100%)',
    red: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.8) 100%)',
  }
}

// Common chart options
export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: 'index' as const,
  },
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12,
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      cornerRadius: 8,
      padding: 12,
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
      ticks: {
        font: {
          size: 11,
        },
      },
    },
    y: {
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
      ticks: {
        font: {
          size: 11,
        },
      },
    },
  },
}

interface ChartWrapperProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  loading?: boolean
  error?: string
  badge?: string
  height?: number
}

export function ChartWrapper({
  title,
  description,
  children,
  className,
  loading = false,
  error,
  badge,
  height = 400,
}: ChartWrapperProps) {
  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48" />
            {badge && <Skeleton className="h-6 w-16" />}
          </div>
          {description && <Skeleton className="h-4 w-64" />}
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full" style={{ height }} />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {title}
            {badge && <Badge variant="destructive">{badge}</Badge>}
          </CardTitle>
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </CardHeader>
        <CardContent>
          <div 
            className="flex items-center justify-center bg-red-50 text-red-600 rounded-lg"
            style={{ height }}
          >
            <p>Error loading chart: {error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {title}
            {badge && <Badge variant="secondary">{badge}</Badge>}
          </CardTitle>
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </CardHeader>
        <CardContent>
          <div style={{ height }}>
            {children}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Assessment Score Trend Chart
interface AssessmentTrendProps {
  data: Array<{
    date: string
    score: number
    category: string
  }>
  className?: string
}

export function AssessmentTrendChart({ data, className }: AssessmentTrendProps) {
  const chartData = {
    labels: data.map(item => new Date(item.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Overall Score',
        data: data.map(item => item.score),
        borderColor: chartColors.borders[0],
        backgroundColor: chartColors.primary[0],
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }

  const options = {
    ...defaultChartOptions,
    scales: {
      ...defaultChartOptions.scales,
      y: {
        ...defaultChartOptions.scales?.y,
        min: 0,
        max: 100,
        ticks: {
          ...defaultChartOptions.scales?.y?.ticks,
          callback: function(value: any) {
            return value + '%'
          },
        },
      },
    },
  }

  return (
    <ChartWrapper
      title="Assessment Score Trend"
      description="Track organizational alignment scores over time"
      badge={`${data.length} assessments`}
      className={className}
    >
      <Line data={chartData} options={options} />
    </ChartWrapper>
  )
}

// Category Breakdown Chart
interface CategoryBreakdownProps {
  data: Array<{
    category: string
    score: number
    maxScore: number
  }>
  className?: string
}

export function CategoryBreakdownChart({ data, className }: CategoryBreakdownProps) {
  const chartData = {
    labels: data.map(item => item.category),
    datasets: [
      {
        label: 'Current Score',
        data: data.map(item => item.score),
        backgroundColor: chartColors.primary.slice(0, data.length),
        borderColor: chartColors.borders.slice(0, data.length),
        borderWidth: 2,
      },
      {
        label: 'Maximum Score',
        data: data.map(item => item.maxScore),
        backgroundColor: 'rgba(156, 163, 175, 0.3)',
        borderColor: 'rgba(156, 163, 175, 0.8)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    ...defaultChartOptions,
    plugins: {
      ...defaultChartOptions.plugins,
      tooltip: {
        ...defaultChartOptions.plugins?.tooltip,
        callbacks: {
          label: function(context: any) {
            const percentage = ((context.raw / data[context.dataIndex].maxScore) * 100).toFixed(1)
            return `${context.dataset.label}: ${context.raw} (${percentage}%)`
          },
        },
      },
    },
  }

  return (
    <ChartWrapper
      title="Category Performance"
      description="Breakdown of scores by assessment category"
      badge={`${data.length} categories`}
      className={className}
    >
      <Bar data={chartData} options={options} />
    </ChartWrapper>
  )
}

// Organizational Health Radar
interface HealthRadarProps {
  data: {
    labels: string[]
    currentScore: number[]
    benchmarkScore?: number[]
  }
  className?: string
}

export function OrganizationalHealthRadar({ data, className }: HealthRadarProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Current Performance',
        data: data.currentScore,
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
      },
      ...(data.benchmarkScore ? [{
        label: 'Industry Benchmark',
        data: data.benchmarkScore,
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        borderColor: 'rgba(156, 163, 175, 0.8)',
        borderWidth: 1,
        borderDash: [5, 5],
        pointBackgroundColor: 'rgba(156, 163, 175, 0.8)',
        pointBorderColor: '#fff',
      }] : []),
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          callback: function(value: any) {
            return value + '%'
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        angleLines: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  }

  return (
    <ChartWrapper
      title="Organizational Health Overview"
      description="Multi-dimensional view of organizational performance"
      className={className}
      height={500}
    >
      <Radar data={chartData} options={options} />
    </ChartWrapper>
  )
}

// Department Performance Comparison
interface DepartmentComparisonProps {
  data: Array<{
    department: string
    metrics: {
      efficiency: number
      satisfaction: number
      alignment: number
    }
  }>
  className?: string
}

export function DepartmentComparisonChart({ data, className }: DepartmentComparisonProps) {
  const chartData = {
    labels: data.map(item => item.department),
    datasets: [
      {
        label: 'Efficiency',
        data: data.map(item => item.metrics.efficiency),
        backgroundColor: chartColors.primary[0],
        borderColor: chartColors.borders[0],
        borderWidth: 1,
      },
      {
        label: 'Satisfaction',
        data: data.map(item => item.metrics.satisfaction),
        backgroundColor: chartColors.primary[1],
        borderColor: chartColors.borders[1],
        borderWidth: 1,
      },
      {
        label: 'Alignment',
        data: data.map(item => item.metrics.alignment),
        backgroundColor: chartColors.primary[2],
        borderColor: chartColors.borders[2],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    ...defaultChartOptions,
    scales: {
      ...defaultChartOptions.scales,
      y: {
        ...defaultChartOptions.scales?.y,
        min: 0,
        max: 100,
        ticks: {
          ...defaultChartOptions.scales?.y?.ticks,
          callback: function(value: any) {
            return value + '%'
          },
        },
      },
    },
  }

  return (
    <ChartWrapper
      title="Department Performance Comparison"
      description="Compare key metrics across departments"
      badge={`${data.length} departments`}
      className={className}
    >
      <Bar data={chartData} options={options} />
    </ChartWrapper>
  )
}

// Progress Over Time Chart
interface ProgressTimelineProps {
  data: Array<{
    date: string
    initiatives: number
    completed: number
    inProgress: number
  }>
  className?: string
}

export function ProgressTimelineChart({ data, className }: ProgressTimelineProps) {
  const chartData = {
    labels: data.map(item => new Date(item.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Completed',
        data: data.map(item => item.completed),
        backgroundColor: chartColors.primary[1],
        borderColor: chartColors.borders[1],
        borderWidth: 1,
      },
      {
        label: 'In Progress',
        data: data.map(item => item.inProgress),
        backgroundColor: chartColors.primary[2],
        borderColor: chartColors.borders[2],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    ...defaultChartOptions,
    scales: {
      ...defaultChartOptions.scales,
      x: {
        ...defaultChartOptions.scales?.x,
        stacked: true,
      },
      y: {
        ...defaultChartOptions.scales?.y,
        stacked: true,
        title: {
          display: true,
          text: 'Number of Initiatives',
        },
      },
    },
  }

  return (
    <ChartWrapper
      title="Initiative Progress Timeline"
      description="Track completion of organizational initiatives over time"
      className={className}
    >
      <Bar data={chartData} options={options} />
    </ChartWrapper>
  )
}

// Risk Assessment Matrix
interface RiskMatrixProps {
  data: Array<{
    name: string
    probability: number
    impact: number
    category: string
  }>
  className?: string
}

export function RiskAssessmentMatrix({ data, className }: RiskMatrixProps) {
  const categories = [...new Set(data.map(item => item.category))]
  
  const chartData = {
    datasets: categories.map((category, index) => ({
      label: category,
      data: data
        .filter(item => item.category === category)
        .map(item => ({
          x: item.probability,
          y: item.impact,
          r: 8,
          label: item.name,
        })),
      backgroundColor: chartColors.primary[index % chartColors.primary.length],
      borderColor: chartColors.borders[index % chartColors.borders.length],
      borderWidth: 2,
    })),
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const point = context.raw
            return `${point.label}: Probability ${point.x}%, Impact ${point.y}%`
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Probability (%)',
        },
        min: 0,
        max: 100,
      },
      y: {
        title: {
          display: true,
          text: 'Impact (%)',
        },
        min: 0,
        max: 100,
      },
    },
  }

  return (
    <ChartWrapper
      title="Risk Assessment Matrix"
      description="Visualize risks by probability and impact"
      badge={`${data.length} risks`}
      className={className}
    >
      <Scatter data={chartData} options={options} />
    </ChartWrapper>
  )
}

// ROI Analysis Chart
interface ROIAnalysisProps {
  data: Array<{
    initiative: string
    investment: number
    return: number
    timeframe: number
  }>
  className?: string
}

export function ROIAnalysisChart({ data, className }: ROIAnalysisProps) {
  const chartData = {
    datasets: [{
      label: 'ROI vs Investment',
      data: data.map(item => ({
        x: item.investment,
        y: ((item.return - item.investment) / item.investment) * 100,
        r: Math.min(item.timeframe * 2, 20),
        label: item.initiative,
      })),
      backgroundColor: chartColors.primary[3],
      borderColor: chartColors.borders[3],
      borderWidth: 2,
    }],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const point = context.raw
            return [
              `${point.label}`,
              `Investment: $${point.x.toLocaleString()}`,
              `ROI: ${point.y.toFixed(1)}%`,
            ]
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Investment ($)',
        },
        ticks: {
          callback: function(value: any) {
            return '$' + value.toLocaleString()
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'ROI (%)',
        },
        ticks: {
          callback: function(value: any) {
            return value + '%'
          },
        },
      },
    },
  }

  return (
    <ChartWrapper
      title="ROI Analysis"
      description="Return on investment for organizational initiatives"
      badge={`${data.length} initiatives`}
      className={className}
    >
      <Bubble data={chartData} options={options} />
    </ChartWrapper>
  )
}
