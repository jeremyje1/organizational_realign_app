'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Clock, 
  DollarSign, 
  Target, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  BarChart3,
  Gift
} from 'lucide-react';
import QuickWinsAssessment from '@/components/QuickWinsAssessment';
import { QuickWinsResult } from '@/data/quickWinsQuestions';

export default function QuickWinsLandingPage() {
  const [showAssessment, setShowAssessment] = useState(false);

  const handleStartAssessment = () => {
    setShowAssessment(true);
  };

  const handleAssessmentComplete = (_results: QuickWinsResult[]) => {
    // Results are handled within the assessment component
  };

  const handleUpgrade = () => {
    // Redirect to pricing page where users can choose their assessment plan
    window.location.href = '/pricing';
  };

  if (showAssessment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50">
        <div className="container mx-auto py-8">
          <QuickWinsAssessment 
            onComplete={handleAssessmentComplete}
            onUpgrade={handleUpgrade}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-20"></div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-full mb-6 border border-white/30">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Free Quick Wins Assessment
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover immediate opportunities to save money and improve efficiency in your organization
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                onClick={handleStartAssessment}
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg"
              >
                <Gift className="mr-2 h-6 w-6" />
                Start Free Assessment
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Takes 5 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>No email required</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span>Instant results</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 -mt-8">
        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8 mb-12"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              What You&apos;ll Get in 5 Minutes
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our Quick Wins Assessment analyzes your organization across four critical areas and provides 
              immediate actionable recommendations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Target,
                title: 'Organizational Structure',
                description: 'Identify management layers and decision-making bottlenecks',
                color: 'from-blue-500 to-indigo-500'
              },
              {
                icon: Zap,
                title: 'Process Efficiency',
                description: 'Find duplicate work and manual process automation opportunities',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: BarChart3,
                title: 'Technology & Systems',
                description: 'Assess system integration and automation potential',
                color: 'from-purple-500 to-violet-500'
              },
              {
                icon: DollarSign,
                title: 'Cost Management',
                description: 'Uncover hidden costs and resource optimization opportunities',
                color: 'from-orange-500 to-red-500'
              }
            ].map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className={`w-12 h-12 bg-gradient-to-r ${area.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                      <area.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{area.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600">{area.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 mb-16"
        >
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              Immediate Value You&apos;ll Receive
            </h3>
            <div className="space-y-4">
              {[
                'Personalized cost-saving recommendations',
                'Efficiency improvement opportunities',
                'Technology optimization insights',
                'Process streamlining suggestions',
                'Estimated annual savings potential',
                'Priority areas for immediate action'
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-slate-700">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-800">Average Savings Identified</h4>
                </div>
                <p className="text-3xl font-bold text-green-600 mb-2">$50,000 - $200,000</p>
                <p className="text-sm text-slate-600">Annual cost reduction opportunities</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-800">Time Savings Potential</h4>
                </div>
                <p className="text-3xl font-bold text-blue-600 mb-2">10-25 hours</p>
                <p className="text-sm text-slate-600">Per week across your organization</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="text-center"
        >
          <Card className="border-2 border-blue-300 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-4">Ready to Discover Your Quick Wins?</h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join hundreds of organizations that have unlocked immediate cost savings and efficiency improvements.
              </p>
              <Button
                onClick={handleStartAssessment}
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 px-12 py-4 text-xl font-semibold rounded-xl shadow-lg"
              >
                <Sparkles className="mr-3 h-6 w-6" />
                Start Your Free Assessment
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-blue-200">
                <Badge variant="outline" className="bg-white/10 border-white/30 text-white">
                  ✓ 100% Free
                </Badge>
                <Badge variant="outline" className="bg-white/10 border-white/30 text-white">
                  ✓ No Email Required
                </Badge>
                <Badge variant="outline" className="bg-white/10 border-white/30 text-white">
                  ✓ Instant Results
                </Badge>
                <Badge variant="outline" className="bg-white/10 border-white/30 text-white">
                  ✓ 5 Minutes
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
