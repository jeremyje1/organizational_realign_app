'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { 
  CheckCircle, 
  Clock, 
  Users, 
  Brain, 
  Target, 
  FileText,
  Settings,
  BarChart3,
  Lightbulb,
  TrendingUp,
  Shield,
  Zap,
  Building2,
  ArrowRight,
  PlayCircle,
  Lock
} from 'lucide-react';
import PublicNavigation from '@/components/PublicNavigation';
import OrganizationTypeSelect from '@/components/OrganizationTypeSelect';
import { OrganizationType } from '@/data/northpathQuestionBank';

interface AssessmentInfo {
  id: string;
  tier: string;
  status: string;
  instructions: string[];
}

function AssessmentStartContent() {
  const [assessment, setAssessment] = useState<AssessmentInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrgType, setSelectedOrgType] = useState<OrganizationType | null>(null);
  const [showTypeSelection, setShowTypeSelection] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');
  const orgType = searchParams.get('type') as OrganizationType;

  // Check authorization on mount
  useEffect(() => {
    const checkAuthorization = () => {
      try {
        const authorized = sessionStorage.getItem('assessment_authorized');
        console.log('Authorization check:', authorized); // Debug log
        
        if (authorized === 'true') {
          setIsAuthorized(true);
          setCheckingAuth(false);
        } else {
          // Redirect to secure access page
          console.log('Not authorized, redirecting...'); // Debug log
          router.push('/assessment/secure-access');
          return;
        }
      } catch (error) {
        console.error('Authorization check error:', error);
        setCheckingAuth(false);
        setIsAuthorized(false);
      }
    };

    // Add a small delay to ensure sessionStorage is available
    const timer = setTimeout(checkAuthorization, 100);
    return () => clearTimeout(timer);
  }, [router]);

  useEffect(() => {
    if (!isAuthorized || checkingAuth) return;
    
    // If org type is provided in URL, skip selection
    if (orgType) {
      setSelectedOrgType(orgType);
      setShowTypeSelection(false);
    }

    if (sessionId) {
      fetchAssessment(sessionId);
    } else {
      // Set default assessment info
      setAssessment({
        id: 'northpath',
        tier: 'COMPREHENSIVE',
        status: 'active',
        instructions: [
          "Complete the NorthPath Organizational Realignment & Optimization Suite",
          "Answer universal questions plus your sector-specific module", 
          "Upload required data files (org charts, financials, system inventories)",
          "The comprehensive assessment typically takes 2-3 hours to complete",
          "You can save your progress and return to complete it later",
          "Receive DSCH, CRF, and LEI analysis with actionable recommendations"
        ]
      });
      setLoading(false);
    }
  }, [sessionId, orgType, isAuthorized, checkingAuth]);

  // Failsafe timeout to prevent indefinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (checkingAuth) {
        console.log('Authorization check timeout, setting defaults...');
        setCheckingAuth(false);
        setIsAuthorized(false);
      }
    }, 5000); // 5 second timeout

    return () => clearTimeout(timeout);
  }, [checkingAuth]);

  const fetchAssessment = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/assessment/by-session/${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        setAssessment(data);
      }
    } catch (error) {
      console.error('Error fetching assessment:', error);
    } finally {
      setLoading(false);
    }
  };

  // Show authorization check loading
  if (checkingAuth) {
    return (
      <div className="min-h-screen elegant-bg flex items-center justify-center">
        <motion.div 
          className="card p-12 text-center max-w-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-6">
            <Lock className="w-8 h-8 text-blue-400 mr-3" />
            <LoadingSpinner size="lg" variant="gradient" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Verifying Access</h2>
          <p className="text-slate-300">Checking your assessment platform authorization...</p>
        </motion.div>
      </div>
    );
  }

  // Redirect if not authorized (this shouldn't be reached due to useEffect redirect)
  if (!isAuthorized) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen elegant-bg flex items-center justify-center">
        <motion.div 
          className="card p-12 text-center max-w-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-6">
            <LoadingSpinner size="lg" variant="gradient" />
          </div>
          <motion.h2 
            className="text-2xl font-semibold text-slate-100 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Setting Up Your Assessment
          </motion.h2>
          <motion.p 
            className="text-slate-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Preparing your personalized organizational evaluation...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  const getInstructionsByTier = (tier: string) => {
    const baseInstructions = [
      "Complete the comprehensive organizational assessment survey",
      "Answer all questions honestly and thoroughly for accurate results",
      "The assessment typically takes 45-90 minutes to complete",
      "You can save your progress and return to complete it later",
      "Once submitted, AI analysis will generate your professional report",
    ];

    const tierSpecificInstructions = {
      BASIC: [
        "Access to basic organizational assessment questions",
        "Receive a summary report with key insights",
      ],
      INDIVIDUAL: [],
      TEAM: [
        "Invite team members to collaborate on sections relevant to their areas",
        "Coordinate with your team to ensure comprehensive coverage",
        "Use the discussion features to align on responses",
      ],
      ENTERPRISE: [
        "Invite unlimited team members and external consultants",
        "Upload organizational charts and supporting documents",
        "Schedule your included 2-hour strategy consultation after completion",
      ],
    };

    return [...baseInstructions, ...(tierSpecificInstructions[tier as keyof typeof tierSpecificInstructions] || [])];
  };

  const handleOrganizationTypeSelect = (type: OrganizationType) => {
    setSelectedOrgType(type);
    setShowTypeSelection(false);
  };

  // Show organization type selection screen first
  if (showTypeSelection && !selectedOrgType) {
    return (
      <div className="min-h-screen elegant-bg">
        <PublicNavigation />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
            >
              <Building2 className="h-10 w-10 text-white" />
            </motion.div>
            <motion.h1 
              className="text-4xl font-bold text-slate-100 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Select Your Organization Type
            </motion.h1>
            <motion.p 
              className="text-xl text-slate-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Choose the option that best describes your organization to receive customized assessment questions 
              and sector-specific insights tailored to your industry.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <OrganizationTypeSelect onSelect={handleOrganizationTypeSelect} />
          </motion.div>
        </div>
      </div>
    );
  }

  // Safety check - should not happen with new logic
  if (!assessment) {
    return (
      <div className="min-h-screen elegant-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading assessment...</p>
        </div>
      </div>
    );
  }

  const assessmentAreas = [
    { name: 'Organizational Structure', icon: Target },
    { name: 'Role Definition & Redundancy', icon: Users },
    { name: 'Decision-Making Processes', icon: Settings },
    { name: 'Curriculum Planning', icon: FileText },
    { name: 'Course Scheduling', icon: Clock },
    { name: 'Technology Integration', icon: Zap },
    { name: 'Financial Operations', icon: TrendingUp },
    { name: 'Student Services', icon: Shield },
    { name: 'Faculty Relations', icon: Users },
    { name: 'External Relations', icon: Target },
    { name: 'AI Automation Opportunities', icon: Brain },
    { name: 'Cost-Saving Recommendations', icon: Lightbulb }
  ];

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800">
      <section className="max-w-2xl mx-auto py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-white drop-shadow-2xl mb-6 tracking-tight">
          Start Your Organizational Assessment
        </h1>
        <p className="text-lg md:text-2xl text-slate-200 font-light mb-8">
          Unlock actionable insights and drive transformation with <span className="font-semibold text-emerald-300">NorthPath Strategies</span>
        </p>
      </section>
      <section className="w-full max-w-3xl mx-auto bg-white/90 rounded-3xl shadow-2xl p-8 mb-16">
        {/* Enhanced Success Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
          >
            <CheckCircle className="h-10 w-10 text-white" />
          </motion.div>
          {assessment.tier === 'BASIC' ? (
            <>
              <motion.h1 
                className="text-4xl font-bold text-slate-100 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Start Your Assessment
              </motion.h1>
              <motion.p 
                className="text-xl text-slate-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Begin your <span className="text-emerald-400 font-semibold">organizational realignment assessment</span> to identify improvement opportunities.
              </motion.p>
            </>
          ) : (
            <>
              <motion.h1 
                className="text-4xl font-bold text-slate-100 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Payment Successful!
              </motion.h1>
              <motion.p 
                className="text-xl text-slate-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Your <span className="text-emerald-400 font-semibold">{assessment.tier.toLowerCase()}</span> assessment is ready to begin.
              </motion.p>
            </>
          )}
        </motion.div>

        {/* Enhanced Instructions Card */}
        <motion.div 
          className="card p-8 mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Brain className="h-5 w-5 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-slate-100">Getting Started</h2>
          </div>
          
          <div className="space-y-6">
            <p className="text-slate-300 text-lg leading-relaxed">
              Welcome to your Organizational Realignment Assessment. This comprehensive evaluation 
              will analyze your institution&apos;s structure, identify inefficiencies, and provide 
              AI-powered recommendations for improvement.
            </p>

            <div>
              <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-400" />
                Instructions
              </h3>
              <div className="grid gap-4">
                {getInstructionsByTier(assessment.tier).map((instruction, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-lg border border-slate-600/20 hover:border-purple-500/30 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {index + 1}
                    </div>
                    <span className="text-slate-200">{instruction}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Assessment Areas */}
        <motion.div 
          className="card p-8 mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <h3 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-purple-400" />
            Assessment Areas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assessmentAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <motion.div 
                  key={index} 
                  className="flex items-center p-4 bg-slate-800/30 border border-slate-600/30 rounded-lg hover:border-slate-500/50 transition-all duration-300 group cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div 
                    className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center mr-3"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="h-4 w-4 text-white" />
                  </motion.div>
                  <span className="text-slate-200 text-sm font-medium group-hover:text-slate-100 transition-colors">{area.name}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Enhanced Key Benefits */}
        <motion.div 
          className="card p-8 mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <h3 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-400" />
            What You&apos;ll Receive
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {[
                { icon: Brain, title: "AI-Powered Analysis", desc: "Advanced algorithms analyze your responses for deep insights", color: "purple" },
                { icon: FileText, title: "Comprehensive Report", desc: "Detailed PDF with actionable recommendations", color: "blue" }
              ].map((benefit, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start gap-3 p-4 bg-slate-800/20 rounded-lg border border-slate-600/20 hover:border-purple-500/30 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <benefit.icon className={`h-6 w-6 text-${benefit.color}-400 mt-1`} />
                  <div>
                    <h4 className="font-semibold text-slate-100">{benefit.title}</h4>
                    <p className="text-slate-300 text-sm">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="space-y-4">
              {[
                { icon: TrendingUp, title: "ROI Projections", desc: "Expected returns on recommended changes", color: "emerald" },
                { icon: Lightbulb, title: "Implementation Roadmap", desc: "Step-by-step guide to transformation", color: "amber" }
              ].map((benefit, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start gap-3 p-4 bg-slate-800/20 rounded-lg border border-slate-600/20 hover:border-purple-500/30 transition-all duration-300"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <benefit.icon className={`h-6 w-6 text-${benefit.color}-400 mt-1`} />
                  <div>
                    <h4 className="font-semibold text-slate-100">{benefit.title}</h4>
                    <p className="text-slate-300 text-sm">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Action Buttons */}
        <motion.div 
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => {
                  const surveyUrl = selectedOrgType 
                    ? `/survey?orgType=${selectedOrgType}&sessionId=${sessionId || 'default'}`
                    : '/survey';
                  window.location.href = surveyUrl;
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 group"
              >
                <PlayCircle className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                Begin Assessment
                <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            
            {assessment.tier !== 'INDIVIDUAL' && assessment.tier !== 'BASIC' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                <Button
                  onClick={() => window.location.href = '/assessment/team'}
                  variant="outline"
                  className="bg-slate-700/30 hover:bg-slate-600/50 text-slate-200 border-slate-600/50 hover:border-slate-500/50 px-8 py-3 ml-4 group"
                >
                  <Users className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  Manage Team Access
                </Button>
              </motion.div>
            )}
          </div>
          
          <motion.div 
            className="bg-slate-800/30 rounded-lg p-4 border border-slate-600/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <p className="text-sm text-slate-400">
              Need help? Contact our support team at{' '}
              <a href="mailto:support@northpathstrategies.org" className="text-purple-400 hover:text-purple-300 transition-colors">
                support@northpathstrategies.org
              </a>
            </p>
          </motion.div>
        </motion.div>
      </section>
      <footer className="w-full py-8 border-t-2 border-slate-800 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-center text-slate-400 text-xs font-serif shadow-inner mt-auto">
        <span>Organizational Realignment Tool v1.0 © {new Date().getFullYear()} NorthPath Strategies</span>
        <span className="mx-2">|</span>
        <a href="mailto:feedback@northpathstrategies.org" className="text-emerald-400 hover:underline font-medium">Send Feedback</a>
      </footer>
    </main>
  );
}

export default function AssessmentStartPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen elegant-bg flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <LoadingSpinner size="lg" variant="gradient" className="mx-auto mb-4" />
          <motion.p 
            className="text-slate-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Loading assessment...
          </motion.p>
        </motion.div>
      </div>
    }>
      <AssessmentStartContent />
    </Suspense>
  );
}