import type { Session } from '@supabase/auth-helpers-nextjs';
import { Suspense } from 'react';
import { auth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  FileText, 
  Users, 
  BarChart3, 
  Settings, 
  TrendingUp,
  Clock,
  Target,
  BookOpen,
  Download,
  Plus,
  ArrowRight
} from 'lucide-react';

/** ----------------------------------------------------------------
 *  ① SEO / social metadata
 * ----------------------------------------------------------------*/
export const metadata = {
  title: 'Dashboard | Northpath Strategies',
  description: 'Your private organizational dashboard',
};

/** ----------------------------------------------------------------
 *  ② Re‑usable banner component
 * ----------------------------------------------------------------*/
function WelcomeBanner({ user }: { user: Session['user'] }) {
  const displayName = (user.user_metadata as any)?.name ?? user.email;
  return (
    <div className="card p-8 mb-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">
            Welcome back, {displayName}!
          </h1>
          <p className="text-slate-300 text-lg">
            Ready to continue optimizing your organization?
          </p>
        </div>
        <div className="hidden lg:block">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
            <Brain className="h-10 w-10 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** ----------------------------------------------------------------
 *  ③ Quick Actions Section
 * ----------------------------------------------------------------*/
function QuickActions() {
  return (
    <div className="card p-6 mb-8">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-200 mb-4">
        <Target className="h-5 w-5 text-purple-400" />
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Button 
          className="h-20 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 flex flex-col items-center justify-center gap-2"
          onClick={() => window.location.href = '/survey'}
        >
          <Plus className="h-6 w-6" />
          <span>New Assessment</span>
        </Button>
        
        <Button 
          variant="outline"
          className="h-20 bg-slate-700/30 hover:bg-slate-600/50 text-slate-200 border-slate-600/50 flex flex-col items-center justify-center gap-2"
          onClick={() => window.location.href = '/secure/results'}
        >
          <BarChart3 className="h-6 w-6" />
          <span>View Results</span>
        </Button>
        
        <Button 
          variant="outline"
          className="h-20 bg-slate-700/30 hover:bg-slate-600/50 text-slate-200 border-slate-600/50 flex flex-col items-center justify-center gap-2"
          onClick={() => window.location.href = '/teams'}
        >
          <Users className="h-6 w-6" />
          <span>Team Dashboard</span>
        </Button>
        
        <Button 
          variant="outline"
          className="h-20 bg-slate-700/30 hover:bg-slate-600/50 text-slate-200 border-slate-600/50 flex flex-col items-center justify-center gap-2"
          onClick={() => window.location.href = '/secure/workspaces'}
        >
          <Users className="h-6 w-6" />
          <span>Team Workspace</span>
        </Button>
        
        <Button 
          variant="outline"
          className="h-20 bg-slate-700/30 hover:bg-slate-600/50 text-slate-200 border-slate-600/50 flex flex-col items-center justify-center gap-2"
          onClick={() => window.location.href = '/secure/settings'}
        >
          <Settings className="h-6 w-6" />
          <span>Settings</span>
        </Button>
      </div>
    </div>
  );
}

/** ----------------------------------------------------------------
 *  ④ Recent Activity Section
 * ----------------------------------------------------------------*/
function RecentActivity() {
  // Mock data for demonstration
  const activities = [
    {
      id: 1,
      type: 'assessment',
      title: 'Organizational Assessment Completed',
      description: 'Academic Affairs section completed with 85% efficiency score',
      time: '2 hours ago',
      status: 'completed',
      icon: FileText
    },
    {
      id: 2,
      type: 'analysis',
      title: 'AI Analysis Generated',
      description: 'Comprehensive analysis with 12 recommendations ready for review',
      time: '1 day ago',
      status: 'ready',
      icon: Brain
    },
    {
      id: 3,
      type: 'collaboration',
      title: 'Team Member Added Comment',
      description: 'Dr. Smith added insights to the redundancy analysis',
      time: '2 days ago',
      status: 'info',
      icon: Users
    }
  ];

  return (
    <div className="card p-6 mb-8">
      <h2 className="text-xl font-semibold text-slate-100 mb-6 flex items-center gap-2">
        <Clock className="h-5 w-5 text-purple-400" />
        Recent Activity
      </h2>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-lg border border-slate-600/20 hover:border-slate-500/30 transition-all duration-300">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-slate-100 font-medium">{activity.title}</h3>
                <p className="text-slate-300 text-sm mt-1">{activity.description}</p>
                <p className="text-slate-400 text-xs mt-2">{activity.time}</p>
              </div>
              <Button 
                variant="outline" 
                className="bg-slate-700/30 hover:bg-slate-600/50 text-slate-200 border-slate-600/50 px-2 py-1 text-xs"
              >
                View <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** ----------------------------------------------------------------
 *  ⑤ Stats Overview Section
 * ----------------------------------------------------------------*/
function StatsOverview() {
  const stats = [
    {
      label: 'Assessments Completed',
      value: '3',
      trend: '+2 this month',
      icon: FileText,
      color: 'from-blue-400 to-blue-500'
    },
    {
      label: 'Efficiency Score',
      value: '85%',
      trend: '+12% improvement',
      icon: TrendingUp,
      color: 'from-emerald-400 to-emerald-500'
    },
    {
      label: 'Recommendations',
      value: '12',
      trend: '4 high priority',
      icon: Target,
      color: 'from-purple-400 to-purple-500'
    },
    {
      label: 'Team Members',
      value: '8',
      trend: '2 new this week',
      icon: Users,
      color: 'from-pink-400 to-pink-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="card p-6 text-center animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-100 mb-1">{stat.value}</h3>
            <p className="text-slate-300 text-sm mb-2">{stat.label}</p>
            <p className="text-slate-400 text-xs">{stat.trend}</p>
          </div>
        );
      })}
    </div>
  );
}

/** ----------------------------------------------------------------
 *  ⑥ Async content wrapped in Suspense with loading fallback
 * ----------------------------------------------------------------*/
async function DashboardContent() {
  const session = await auth();
  if (!session) {
    // During development, show a mock dashboard instead of redirecting
    return (
      <main className="min-h-screen elegant-bg p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="card p-6 mb-8 bg-amber-900/20 border border-amber-500/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center">
                <span className="text-amber-900 text-sm">⚠️</span>
              </div>
              <div>
                <p className="font-medium text-amber-300">Development Mode</p>
                <p className="text-sm text-amber-200/70">Authentication not configured. Showing mock dashboard.</p>
              </div>
            </div>
          </div>
          
          <WelcomeBanner user={{ email: 'demo@example.com', user_metadata: { name: 'Demo User' } } as any} />
          <QuickActions />
          <StatsOverview />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RecentActivity />
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-slate-100 mb-6 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-400" />
                Getting Started
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="text-slate-100 font-medium">Complete Assessment</h3>
                    <p className="text-slate-300 text-sm">Take the organizational assessment to get started</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-lg">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="text-slate-300 font-medium">Review Results</h3>
                    <p className="text-slate-400 text-sm">Analyze AI-generated insights and recommendations</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-lg">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="text-slate-300 font-medium">Schedule Consultation</h3>
                    <p className="text-slate-400 text-sm">Book expert consultation for implementation planning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen elegant-bg p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <WelcomeBanner user={session.user} />
        <QuickActions />
        <StatsOverview />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentActivity />
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-slate-100 mb-6 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-400" />
              Next Steps
            </h2>
            <div className="space-y-4">
              <Button 
                className="w-full justify-start bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                onClick={() => window.location.href = '/survey'}
              >
                <Plus className="h-4 w-4 mr-2" />
                Start New Assessment
              </Button>
              <Button 
                variant="outline"
                className="w-full justify-start bg-slate-700/30 hover:bg-slate-600/50 text-slate-200 border-slate-600/50"
                onClick={() => window.location.href = '/secure/results'}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Review Latest Results
              </Button>
              <Button 
                variant="outline"
                className="w-full justify-start bg-slate-700/30 hover:bg-slate-600/50 text-slate-200 border-slate-600/50"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Reports
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen elegant-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading dashboard...</p>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}