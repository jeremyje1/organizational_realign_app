'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Star, 
  ArrowRight, 
  Calculator, 
  Zap, 
  Shield, 
  Crown,
  MessageCircle,
  ChevronDown,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Pricing calculator component
function PricingCalculator() {
  const [organizationSize, setOrganizationSize] = useState('medium');
  const [assessmentType, setAssessmentType] = useState('comprehensive');
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const sizeOptions = [
    { id: 'small', label: '1-100 employees', multiplier: 1 },
    { id: 'medium', label: '101-500 employees', multiplier: 1.5 },
    { id: 'large', label: '501-1000 employees', multiplier: 2.2 },
    { id: 'enterprise', label: '1000+ employees', multiplier: 3.5 },
  ];

  const assessmentOptions = [
    { id: 'basic', label: 'NorthPath Assessment — Single Use', basePrice: 899 },
    { id: 'comprehensive', label: 'Comprehensive Analysis & Strategy Package', basePrice: 3999 },
    { id: 'enterprise', label: 'Enterprise Transformation Package', basePrice: 8999 },
  ];

  const additionalOptions = [
    { id: 'consulting', label: 'Strategic Consulting', price: 2500 },
    { id: 'training', label: 'Team Training', price: 1500 },
    { id: 'implementation', label: 'Implementation Support', price: 5000 },
    { id: 'monitoring', label: 'Ongoing Monitoring', price: 1200 },
  ];

  const calculatePrice = () => {
    const sizeMultiplier = sizeOptions.find(s => s.id === organizationSize)?.multiplier || 1;
    const basePrice = assessmentOptions.find(a => a.id === assessmentType)?.basePrice || 0;
    const additionalPrice = additionalServices.reduce((sum, service) => {
      const option = additionalOptions.find(o => o.id === service);
      return sum + (option?.price || 0);
    }, 0);

    return Math.round((basePrice * sizeMultiplier) + additionalPrice);
  };

  const handleCalculate = () => {
    setIsCalculating(true);
    setTimeout(() => setIsCalculating(false), 1000);
  };

  useEffect(() => {
    handleCalculate();
  }, [organizationSize, assessmentType, additionalServices]);

  return (
    <motion.div
      className="glass rounded-3xl p-8 backdrop-blur-sm bg-white/80 dark:bg-neutral-900/80 shadow-premium"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
          Pricing Calculator
        </h3>
      </div>

      <div className="space-y-6">
        {/* Organization Size */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
            Organization Size
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sizeOptions.map((option) => (
              <motion.button
                key={option.id}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  organizationSize === option.id
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                    : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600'
                }`}
                onClick={() => setOrganizationSize(option.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-medium text-neutral-900 dark:text-white">
                  {option.label}
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                  {option.multiplier}x multiplier
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Assessment Type */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
            Assessment Package
          </label>
          <div className="space-y-3">
            {assessmentOptions.map((option) => (
              <motion.button
                key={option.id}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  assessmentType === option.id
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600'
                }`}
                onClick={() => setAssessmentType(option.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-neutral-900 dark:text-white">
                      {option.label}
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                      Starting at ${option.basePrice.toLocaleString()}
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    assessmentType === option.id
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-neutral-300 dark:border-neutral-600'
                  }`}>
                    {assessmentType === option.id && (
                      <motion.div
                        className="w-2 h-2 bg-white rounded-full m-0.5"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Additional Services */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
            Additional Services (Optional)
          </label>
          <div className="space-y-2">
            {additionalOptions.map((option) => (
              <motion.button
                key={option.id}
                className={`w-full p-3 rounded-lg border text-left transition-all duration-200 ${
                  additionalServices.includes(option.id)
                    ? 'border-success-300 bg-success-50 dark:bg-success-900/20'
                    : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
                }`}
                onClick={() => setAdditionalServices(prev => 
                  prev.includes(option.id)
                    ? prev.filter(s => s !== option.id)
                    : [...prev, option.id]
                )}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-neutral-900 dark:text-white">
                      {option.label}
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                      +${option.price.toLocaleString()}
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    additionalServices.includes(option.id)
                      ? 'border-success-500 bg-success-500'
                      : 'border-neutral-300 dark:border-neutral-600'
                  }`}>
                    {additionalServices.includes(option.id) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Price Display */}
        <motion.div
          className="p-6 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-center">
            <div className="text-sm text-white/80 mb-2">Estimated Total</div>
            <AnimatePresence mode="wait">
              {isCalculating ? (
                <motion.div
                  key="loading"
                  className="flex items-center justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="text-2xl font-bold">Calculating...</span>
                </motion.div>
              ) : (
                <motion.div
                  key="price"
                  className="text-4xl font-bold"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  ${calculatePrice().toLocaleString()}
                </motion.div>
              )}
            </AnimatePresence>
            <div className="text-sm text-white/80 mt-2">
              One-time investment • ROI typically 300-500%
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <div className="flex gap-3">
          <Button size="lg" className="flex-1 bg-white text-primary-600 hover:bg-neutral-50 font-semibold">
            Get Custom Quote
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
            <MessageCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// Pricing plan component
function PricingPlan({ 
  plan, 
  isPopular = false, 
  index 
}: { 
  plan: any; 
  isPopular?: boolean; 
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      id={plan.id}
      className={`relative ${isPopular ? 'scale-105 z-10' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isPopular && (
        <motion.div
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
            <Star className="w-4 h-4" />
            Most Popular
          </div>
        </motion.div>
      )}

      <motion.div
        className={`relative h-full p-8 rounded-3xl border-2 backdrop-blur-sm shadow-elegant hover:shadow-premium transition-all duration-500 ${
          isPopular
            ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20'
            : 'border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 hover:border-primary-300 dark:hover:border-primary-600'
        }`}
        whileHover={{ y: isPopular ? 0 : -5 }}
        animate={{
          scale: isHovered && !isPopular ? 1.02 : 1,
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg ${
              isPopular 
                ? 'bg-gradient-to-br from-primary-500 to-secondary-500' 
                : 'bg-gradient-to-br from-neutral-600 to-neutral-700'
            }`}
            whileHover={{ rotate: 5, scale: 1.1 }}
          >
            <plan.icon className="w-8 h-8 text-white" />
          </motion.div>

          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            {plan.name}
          </h3>
          
          <p className="text-neutral-600 dark:text-neutral-300 mb-6">
            {plan.description}
          </p>

          <div className="flex items-baseline justify-center gap-1">
            <span className="text-4xl font-bold text-neutral-900 dark:text-white">
              ${plan.price.toLocaleString()}
            </span>
            {plan.period && (
              <span className="text-neutral-500 dark:text-neutral-400">
                /{plan.period}
              </span>
            )}
          </div>
          
          {plan.originalPrice && (
            <div className="text-sm text-neutral-500 dark:text-neutral-400 line-through">
              ${plan.originalPrice.toLocaleString()}
            </div>
          )}
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          {plan.features.map((feature: any, idx: number) => (
            <motion.div
              key={idx}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + idx * 0.05 }}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                feature.included 
                  ? isPopular 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-success-500 text-white'
                  : 'bg-neutral-200 dark:bg-neutral-700'
              }`}>
                {feature.included ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <span className="w-2 h-2 bg-neutral-400 rounded-full" />
                )}
              </div>
              <span className={`${
                feature.included 
                  ? 'text-neutral-900 dark:text-white' 
                  : 'text-neutral-500 dark:text-neutral-400'
              }`}>
                {feature.name}
              </span>
              {feature.tooltip && (
                <div className="relative group">
                  <Info className="w-4 h-4 text-neutral-400 cursor-help" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-neutral-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {feature.tooltip}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {plan.isEnterprise ? (
            <Link href="https://buy.stripe.com/28o8xO8A33QC6Qg5kk" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="w-full font-semibold py-3 rounded-2xl transition-all duration-300 group border-2 border-primary-500 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20"
              >
                {plan.ctaText}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          ) : plan.name === 'Monthly Subscription' ? (
            <Link href="/checkout">
              <Button
                size="lg"
                className="w-full font-semibold py-3 rounded-2xl transition-all duration-300 group gradient-primary text-white shadow-lg hover:shadow-xl"
              >
                {plan.ctaText}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          ) : (
            <Link href="/checkout">
              <Button
                size="lg"
                className={`w-full font-semibold py-3 rounded-2xl transition-all duration-300 group ${
                  isPopular
                    ? 'gradient-primary text-white shadow-lg hover:shadow-xl'
                    : 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                }`}
              >
                {plan.ctaText}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          )}
        </motion.div>

        {/* Additional info */}
        {plan.additionalInfo && (
          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-4">
            {plan.additionalInfo}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

// FAQ Component
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What's included in the AI assessment?",
      answer: "Our AI assessment includes comprehensive organizational analysis, performance metrics evaluation, stakeholder feedback analysis, and strategic recommendations tailored to your specific needs."
    },
    {
      question: "How long does the assessment process take?",
      answer: "Typically 2-4 weeks depending on organization size and complexity. We provide regular updates throughout the process and can accommodate urgent timelines when needed."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day satisfaction guarantee. If you're not completely satisfied with our assessment, we'll refund your investment in full."
    },
    {
      question: "Can I upgrade my plan later?",
      answer: "Absolutely! You can upgrade to any higher-tier plan at any time. We'll credit your original investment towards the upgrade cost."
    },
    {
      question: "What kind of support do you provide?",
      answer: "All plans include email support. Comprehensive and Enterprise plans include dedicated success managers and priority phone support."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h3>
        <p className="text-neutral-600 dark:text-neutral-300">
          Get answers to common questions about our pricing and services
        </p>
      </motion.div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <motion.button
              className="w-full p-6 text-left flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              whileHover={{ x: 5 }}
            >
              <span className="font-semibold text-neutral-900 dark:text-white">
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-neutral-500" />
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Main Pricing component
export default function ModernPricing() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const plans = [
    {
      id: 'single-use',
      name: 'NorthPath Assessment — Single Use',
      description: 'Perfect for institutions wanting a quick organizational diagnostic',
      price: 899,
      period: null,
      icon: Zap,
      features: [
        { name: 'AI-powered Organizational Assessment Tool', included: true },
        { name: 'One institution-type-specific assessment', included: true },
        { name: 'Instant AI-generated report with recommendations', included: true },
        { name: 'Role alignment analysis & decision efficiency metrics', included: true },
        { name: 'Automation opportunities identification', included: true },
        { name: 'Exportable report (PDF) and dashboard access', included: true },
        { name: 'Optional: 1:1 expert consultation (+$399)', included: true },
        { name: 'Multiple assessments', included: false },
      ],
      ctaText: 'Start Assessment',
      additionalInfo: 'One-time use • Best for quick diagnostics'
    },
    {
      id: 'monthly',
      name: 'NorthPath Assessment — Monthly Access',
      description: 'Unlimited assessments with progress tracking capabilities',
      price: 899,
      period: 'month',
      icon: Star,
      features: [
        { name: 'Unlimited assessments during the month', included: true },
        { name: 'Multi-campus or multi-division diagnostics', included: true },
        { name: 'Repeat submissions to track progress over time', included: true },
        { name: 'Full report export (CSV, JSON, PDF)', included: true },
        { name: 'Early access to new report types and features', included: true },
        { name: 'Cancel anytime', included: true },
        { name: 'Progress monitoring dashboard', included: true },
        { name: 'Multi-team participation support', included: true },
      ],
      ctaText: 'Start Monthly Access',
      additionalInfo: 'Cancel anytime • Best for ongoing monitoring'
    },
    {
      id: 'comprehensive',
      name: 'Comprehensive Analysis & Strategy Package',
      description: 'Deep analysis with expert guidance and strategic planning',
      price: 3999,
      period: null,
      icon: Shield,
      features: [
        { name: 'Unlimited assessment access (30 days)', included: true },
        { name: 'Deep-dive AI report reviewed by NorthPath consultants', included: true },
        { name: 'Executive-ready summary with benchmarking data', included: true },
        { name: '1-hour virtual consultation included', included: true },
        { name: 'Strategic scenario recommendations & roadmap', included: true },
        { name: 'Assessment history access for 90 days', included: true },
        { name: 'Priority support', included: true },
        { name: 'Perfect for reorgs or strategic planning', included: true },
      ],
      ctaText: 'Get Comprehensive Analysis',
      additionalInfo: 'Most popular for strategic planning'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Transformation Package',
      description: 'Full system-wide transformation with dedicated support',
      price: 8999,
      period: null,
      icon: Crown,
      features: [
        { name: 'Full system-wide assessment access', included: true },
        { name: 'Multi-campus/multi-division support', included: true },
        { name: 'Unlimited submissions & custom module support', included: true },
        { name: 'API access to scenario builder & analytics', included: true },
        { name: 'Dedicated NorthPath strategist', included: true },
        { name: 'On-site or virtual workshops with leadership', included: true },
        { name: 'Customized presentations for board/cabinet use', included: true },
        { name: 'Change management toolkit & implementation support', included: true },
      ],
      ctaText: 'Contact Sales',
      additionalInfo: 'Custom pricing for large systems • 60-90 day engagement',
      isEnterprise: true
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full px-6 py-3 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Crown className="w-4 h-4" />
            Investment Options
          </motion.div>

          <h2 className="text-5xl lg:text-6xl font-black text-neutral-900 dark:text-white mb-6">
            Start Saving Today
            <br />
            <span className="gradient-text bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Pay After Results</span>
          </h2>
          
          <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Risk-free packages designed to deliver 10-30x ROI within 90 days. 
            Our clients typically save $100K+ in their first year.
          </p>
        </motion.div>

        {/* Pricing plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {plans.map((plan, index) => (
            <PricingPlan 
              key={plan.name} 
              plan={plan} 
              isPopular={index === 1} // Monthly subscription is popular
              index={index}
            />
          ))}
        </div>

        {/* Pricing calculator */}
        <div id="calculator" className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <motion.h3
              className="text-3xl font-bold text-neutral-900 dark:text-white mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              Need a Custom Quote?
            </motion.h3>
            <motion.p
              className="text-xl text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Every organization is unique. Use our calculator to get a personalized 
              estimate based on your specific needs and requirements.
            </motion.p>

            {/* Benefits */}
            <div className="space-y-4">
              {[
                'Customized to your organization size',
                'Flexible service combinations',
                'Volume discounts available',
                'ROI-focused pricing model'
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-success-500 to-success-600 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-neutral-700 dark:text-neutral-300">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <PricingCalculator />
        </div>

        {/* FAQ Section */}
        <FAQ />

        {/* Final CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="glass rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
              Join hundreds of organizations that have transformed their operations with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/assessment/start">
                <Button size="lg" className="gradient-primary text-white font-semibold px-8 py-4 rounded-2xl shadow-elegant hover:shadow-premium hover:scale-105 transition-all duration-300">
                  Start Free Assessment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-2 border-primary-500 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 font-semibold px-8 py-4 rounded-2xl">
                  Talk to Sales
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
