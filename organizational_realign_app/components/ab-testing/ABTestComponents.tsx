/**
 * A/B Testing React Components
 * Provides easy-to-use components for implementing A/B tests
 */

'use client';

import React, { ReactNode } from 'react';
import { useABTest, useABTestConversion, abTestingManager } from '@/lib/ab-testing';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

// A/B Test Wrapper Component
export interface ABTestWrapperProps {
  testId: string;
  variants: Record<string, ReactNode>;
  fallback?: ReactNode;
  userId?: string;
  onVariantRender?: (variantId: string) => void;
}

export function ABTestWrapper({
  testId,
  variants,
  fallback = null,
  userId,
  onVariantRender
}: ABTestWrapperProps) {
  const variantId = useABTest(testId, userId);

  React.useEffect(() => {
    if (variantId && onVariantRender) {
      onVariantRender(variantId);
    }
  }, [variantId, onVariantRender]);

  if (!variantId) {
    return <>{fallback}</>;
  }

  const content = variants[variantId];
  if (!content) {
    console.warn(`[ABTest] Variant "${variantId}" not found for test "${testId}"`);
    return <>{fallback}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      data-ab-test={testId}
      data-ab-variant={variantId}
    >
      {content}
    </motion.div>
  );
}

// Homepage Hero Variants
export function HomepageHeroTest({ className }: { className?: string }) {
  const { trackConversion } = useABTestConversion('homepage_hero_v1');

  const handleCTAClick = () => {
    trackConversion('hero_cta_click');
  };

  const variants = {
    control: (
      <section className={`bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20 ${className}`}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Transform Your Organization
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Unlock your organization&apos;s potential with our AI-powered assessment platform. 
            Get actionable insights and strategic recommendations.
          </p>
          <Button 
            size="lg" 
            variant="outline"
            className="bg-white text-primary-600 hover:bg-gray-100"
            onClick={handleCTAClick}
          >
            Start Assessment
          </Button>
        </div>
      </section>
    ),

    focused: (
      <section className={`bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white py-24 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white">
              Trusted by 500+ Organizations
            </Badge>
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Get Your Organizational
              <span className="text-yellow-300"> Health Score</span>
            </h1>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              3-minute assessment. Instant results. Actionable recommendations 
              that drive real organizational transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-semibold"
                onClick={handleCTAClick}
              >
                Get My Score Now →
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary-600"
              >
                Watch Demo
              </Button>
            </div>
            <p className="text-sm text-white/70 mt-4">
              ✓ No email required  ✓ Instant results  ✓ Free analysis
            </p>
          </div>
        </div>
      </section>
    )
  };

  return (
    <ABTestWrapper
      testId="homepage_hero_v1"
      variants={variants}
      fallback={variants.control}
    />
  );
}

// CTA Button Variants
export interface CTAButtonTestProps {
  onClick?: () => void;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
}

export function CTAButtonTest({ 
  onClick, 
  size = 'default', 
  variant = 'default',
  className 
}: CTAButtonTestProps) {
  const { trackConversion } = useABTestConversion('cta_buttons_v1');

  const handleClick = () => {
    trackConversion('cta_click');
    onClick?.();
  };

  const variants = {
    control: (
      <Button 
        size={size} 
        variant={variant} 
        className={className}
        onClick={handleClick}
      >
        Start Assessment
      </Button>
    ),

    urgency: (
      <Button 
        size={size} 
        variant={variant} 
        className={`${className} animate-pulse`}
        onClick={handleClick}
      >
        Get Your Score Now!
      </Button>
    ),

    benefit: (
      <Button 
        size={size} 
        variant={variant} 
        className={className}
        onClick={handleClick}
      >
        Discover Your Potential
      </Button>
    ),

    action: (
      <Button 
        size={size} 
        variant={variant} 
        className={className}
        onClick={handleClick}
      >
        Begin Analysis →
      </Button>
    )
  };

  return (
    <ABTestWrapper
      testId="cta_buttons_v1"
      variants={variants}
      fallback={variants.control}
    />
  );
}

// Pricing Page Variants
export function PricingPageTest({ className }: { className?: string }) {
  const { trackConversion } = useABTestConversion('pricing_page_v1');

  const handlePlanSelect = (plan: string) => {
    trackConversion('plan_select', undefined, { plan });
  };

  const variants = {
    control: (
      <section className={`py-16 ${className}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard 
              title="Basic"
              price="Free"
              features={["Assessment Report", "Basic Insights", "Email Support"]}
              onSelect={() => handlePlanSelect('basic')}
              variant="basic"
            />
            <PricingCard 
              title="Professional"
              price="$199"
              features={["Everything in Basic", "AI Analysis", "Priority Support", "Team Collaboration"]}
              onSelect={() => handlePlanSelect('professional')}
              variant="professional"
              popular
            />
            <PricingCard 
              title="Enterprise"
              price="Custom"
              features={["Everything in Pro", "Custom Implementation", "Dedicated Support"]}
              onSelect={() => handlePlanSelect('enterprise')}
              variant="enterprise"
            />
          </div>
        </div>
      </section>
    ),

    value_focused: (
      <section className={`py-16 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Proven ROI in 30 Days</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your transformation goals</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard 
              title="Quick Wins"
              price="Free"
              subtitle="Perfect for immediate insights"
              features={["Assessment Report", "3 Key Recommendations", "Implementation Guide"]}
              onSelect={() => handlePlanSelect('basic')}
              variant="basic"
              roi="10x ROI typical"
            />
            <PricingCard 
              title="Transformation"
              price="$199"
              subtitle="Complete organizational upgrade"
              features={["Deep AI Analysis", "Custom Action Plan", "90-Day Roadmap", "Expert Consultation"]}
              onSelect={() => handlePlanSelect('professional')}
              variant="professional"
              popular
              roi="25x ROI average"
            />
            <PricingCard 
              title="Enterprise Scale"
              price="Custom"
              subtitle="Organization-wide transformation"
              features={["Multi-Department Analysis", "Change Management Support", "Executive Coaching"]}
              onSelect={() => handlePlanSelect('enterprise')}
              variant="enterprise"
              roi="50x ROI potential"
            />
          </div>
        </div>
      </section>
    ),

    social_proof: (
      <section className={`py-16 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Join 500+ Successful Organizations</h2>
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">94%</div>
                <div className="text-sm text-gray-600">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">$2.3M</div>
                <div className="text-sm text-gray-600">Avg. Value Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">30 Days</div>
                <div className="text-sm text-gray-600">To See Results</div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard 
              title="Starter Success"
              price="Free"
              features={["Used by 200+ teams", "Average 15% efficiency gain", "Fast implementation"]}
              onSelect={() => handlePlanSelect('basic')}
              variant="basic"
              testimonial="Perfect starting point - got results in week 1!"
            />
            <PricingCard 
              title="Proven Professional"
              price="$199"
              features={["Choice of 300+ companies", "Avg. $500K value created", "Expert-guided process"]}
              onSelect={() => handlePlanSelect('professional')}
              variant="professional"
              popular
              testimonial="Best investment we made this year - 25x ROI!"
            />
            <PricingCard 
              title="Enterprise Excellence"
              price="Custom"
              features={["Fortune 500 trusted", "Multi-million $ transformations", "Dedicated success team"]}
              onSelect={() => handlePlanSelect('enterprise')}
              variant="enterprise"
              testimonial="Transformed our entire organization in 6 months."
            />
          </div>
        </div>
      </section>
    )
  };

  return (
    <ABTestWrapper
      testId="pricing_page_v1"
      variants={variants}
      fallback={variants.control}
    />
  );
}

// Pricing Card Component
interface PricingCardProps {
  title: string;
  price: string;
  subtitle?: string;
  features: string[];
  onSelect: () => void;
  variant: 'basic' | 'professional' | 'enterprise';
  popular?: boolean;
  roi?: string;
  testimonial?: string;
}

function PricingCard({
  title,
  price,
  subtitle,
  features,
  onSelect,
  variant,
  popular,
  roi,
  testimonial
}: PricingCardProps) {
  return (
    <Card className={`relative ${popular ? 'border-primary-500 border-2 scale-105' : ''}`}>
      {popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary-500">
          Most Popular
        </Badge>
      )}
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{title}</CardTitle>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        <div className="text-3xl font-bold text-primary-600">{price}</div>
        {roi && <Badge variant="secondary" className="mt-2">{roi}</Badge>}
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm">
              <span className="text-green-500 mr-2">✓</span>
              {feature}
            </li>
          ))}
        </ul>
        {testimonial && (
          <blockquote className="text-xs italic text-gray-600 mb-4 border-l-2 border-gray-200 pl-2">
            &quot;{testimonial}&quot;
          </blockquote>
        )}
        <Button 
          className="w-full" 
          variant={popular ? 'default' : 'outline'}
          onClick={onSelect}
        >
          {variant === 'enterprise' ? 'Contact Sales' : 'Get Started'}
        </Button>
      </CardContent>
    </Card>
  );
}

// A/B Test Debug Panel (for development)
export function ABTestDebugPanel() {
  const [isVisible, setIsVisible] = React.useState(false);
  
  // Move hooks to top level to avoid conditional hook calls
  const homepageHeroVariant = useABTest('homepage_hero_v1');
  const ctaButtonsVariant = useABTest('cta_buttons_v1');
  const pricingPageVariant = useABTest('pricing_page_v1');

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 bg-gray-800 text-white px-3 py-2 rounded text-xs z-50"
      >
        A/B Debug
      </button>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed bottom-16 right-4 bg-white border shadow-lg rounded-lg p-4 max-w-sm z-50"
          >
            <h3 className="font-bold mb-2">Active A/B Tests</h3>
            <div className="space-y-2 text-xs">
              <div>
                <strong>Homepage Hero:</strong>
                <span className="ml-1" data-testid="homepage-hero-variant">
                  {homepageHeroVariant || 'Not assigned'}
                </span>
              </div>
              <div>
                <strong>CTA Buttons:</strong>
                <span className="ml-1" data-testid="cta-buttons-variant">
                  {ctaButtonsVariant || 'Not assigned'}
                </span>
              </div>
              <div>
                <strong>Pricing Page:</strong>
                <span className="ml-1" data-testid="pricing-page-variant">
                  {pricingPageVariant || 'Not assigned'}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// A/B Test Results Dashboard Component
export function ABTestResults({ testId }: { testId: string }) {
  const [results, setResults] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    abTestingManager.getTestResults(testId)
      .then(setResults)
      .finally(() => setLoading(false));
  }, [testId]);

  if (loading) {
    return <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full"></div>;
  }

  if (!results) {
    return <div>No results available for test {testId}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>A/B Test Results: {testId}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {results.variants.map((variant: any) => (
            <div key={variant.variantId} className="border rounded p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{variant.name}</span>
                {variant.isControl && <Badge variant="secondary">Control</Badge>}
                {results.winner === variant.variantId && <Badge>Winner</Badge>}
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Participants</div>
                  <div className="font-medium">{variant.participants}</div>
                </div>
                <div>
                  <div className="text-gray-600">Conversions</div>
                  <div className="font-medium">{variant.conversions}</div>
                </div>
                <div>
                  <div className="text-gray-600">Rate</div>
                  <div className="font-medium">{(variant.conversionRate * 100).toFixed(1)}%</div>
                </div>
              </div>
              {variant.isStatisticallySignificant && (
                <Badge variant="outline" className="mt-2">Statistically Significant</Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
