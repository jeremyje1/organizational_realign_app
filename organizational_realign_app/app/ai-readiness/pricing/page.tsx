'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  ArrowRight,
  Star,
  Users,
  FileText,
  TrendingUp,
  Shield,
  Headphones,
  Brain,
  Zap
} from 'lucide-react';
import { AI_READINESS_PRODUCTS } from '@/lib/ai-readiness-products';
import Link from 'next/link';

export default function AIReadinessPricingPage() {
  const handleSelectPlan = (product: any) => {
    // Redirect to the tier-based assessment with AI readiness mode
    window.location.href = `/assessment/tier-based?tier=${product.id}&assessment_type=ai-readiness`;
  };

  const getFeatureIcon = (feature: string) => {
    if (feature.includes('team') || feature.includes('members')) return <Users className="h-4 w-4" />;
    if (feature.includes('support') || feature.includes('advisory')) return <Headphones className="h-4 w-4" />;
    if (feature.includes('report') || feature.includes('summary') || feature.includes('slides')) return <FileText className="h-4 w-4" />;
    if (feature.includes('analysis') || feature.includes('benchmarking')) return <TrendingUp className="h-4 w-4" />;
    if (feature.includes('session') || feature.includes('strategy')) return <Brain className="h-4 w-4" />;
    return <CheckCircle2 className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              NorthPath Strategies
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Organizational Assessment</Link>
              <Link href="/ai-readiness/pricing" className="text-indigo-600 font-medium">AI Readiness</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white py-16">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-6">
              <Brain className="h-4 w-4 mr-2" />
              AI Readiness Assessment
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your AI Readiness Assessment
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Affordable options designed for departmental budgets with clear upgrade paths for comprehensive support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 py-16 -mt-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {AI_READINESS_PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className={`relative h-full ${
                product.isPopular 
                  ? 'border-2 border-indigo-500 shadow-xl scale-105' 
                  : 'border border-slate-200 shadow-lg'
              }`}>
                {product.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-indigo-500 text-white px-4 py-1 text-sm font-medium">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl font-bold text-slate-800 mb-2">
                    {product.name}
                  </CardTitle>
                  <p className="text-sm font-medium text-indigo-600 mb-4">
                    {product.description}
                  </p>
                  <div className="text-4xl font-bold text-slate-900 mb-2">
                    ${product.price.toLocaleString()}
                  </div>
                  <p className="text-sm text-slate-600">
                    {product.duration}
                  </p>
                  <p className="text-sm text-slate-600 mt-2">
                    {product.questionCount} Questions • AI Analysis • Detailed Insights
                  </p>
                </CardHeader>
                
                <CardContent className="pt-2">
                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="text-indigo-500 mt-0.5">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <span className="text-sm text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={() => handleSelectPlan(product)}
                    className={`w-full font-semibold py-3 ${
                      product.isPopular
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    {index === 0 ? 'Start Assessment' : 'Get Custom Analysis'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* ROI Promise */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-indigo-600 mr-2" />
              <h3 className="text-xl font-bold text-slate-800">ROI Promise</h3>
            </div>
            <p className="text-slate-700 text-lg">
              For less than the cost of a single adjunct course release, you'll get a full AI maturity roadmap 
              that saves months of strategic planning time.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-slate-500 text-sm">
              © 2025 NorthPath Strategies. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
