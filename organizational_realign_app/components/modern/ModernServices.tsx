'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { 
  BarChart3, 
  Brain, 
  Lightbulb, 
  Rocket, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle2,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ServiceCard {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  features: string[];
  color: string;
  gradient: string;
  delay: number;
}

const services: ServiceCard[] = [
  {
    icon: Brain,
    title: "15-Minute Cost Analysis",
    description: "AI identifies hidden inefficiencies and provides instant savings roadmap worth $100K+ annually.",
    features: ["Instant ROI Calculation", "Hidden Cost Detection", "Efficiency Scoring", "Action Priorities"],
    color: "from-emerald-500 to-emerald-700",
    gradient: "bg-gradient-to-br from-emerald-500/20 to-emerald-700/20",
    delay: 0.1
  },
  {
    icon: BarChart3,
    title: "Strategic Consulting",
    description: "Fortune 500 expertise that delivers 15-30% cost reductions within 90 days of implementation.",
    features: ["Executive Strategy", "Change Management", "Performance Optimization", "Leadership Development"],
    color: "from-blue-500 to-blue-700",
    gradient: "bg-gradient-to-br from-blue-500/20 to-blue-700/20",
    delay: 0.2
  },
  {
    icon: Rocket,
    title: "Guaranteed Implementation",
    description: "End-to-end execution with ROI guarantee. Pay only after you see measurable results.",
    features: ["Project Management", "Team Training", "Progress Tracking", "Success Metrics"],
    color: "from-purple-500 to-purple-700",
    gradient: "bg-gradient-to-br from-purple-500/20 to-purple-700/20",
    delay: 0.3
  },
  {
    icon: Shield,
    title: "Risk-Free Optimization",
    description: "Zero-risk transformation with built-in safeguards and contingency plans for every scenario.",
    features: ["Risk Assessment", "Contingency Planning", "Compliance Monitoring", "Quality Assurance"],
    color: "from-orange-500 to-orange-700", 
    gradient: "bg-gradient-to-br from-orange-500/20 to-orange-700/20",
    delay: 0.4
  },
  {
    icon: Lightbulb,
    title: "Future-Ready Solutions",
    description: "Technology integration that scales with growth and adapts to market changes automatically.",
    features: ["Emerging Technologies", "Scalable Systems", "Future-Proofing", "Digital Transformation"],
    color: "from-purple-500 to-purple-700",
    gradient: "bg-gradient-to-br from-purple-500/20 to-purple-700/20",
    delay: 0.5
  },
  {
    icon: Zap,
    title: "90-Day Results",
    description: "See measurable cost savings and efficiency gains within first quarter or money back.",
    features: ["Agile Methodology", "Quick Wins", "Iterative Improvement", "Fast Results"],
    color: "from-cyan-500 to-cyan-700",
    gradient: "bg-gradient-to-br from-cyan-500/20 to-cyan-700/20",
    delay: 0.6
  }
];

// 3D Card Component with advanced hover effects
function ServiceCard3D({ service, _index }: { service: ServiceCard; _index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    setMousePosition({
      x: (e.clientX - centerX) / rect.width,
      y: (e.clientY - centerY) / rect.height
    });
  };

  const transform3D = {
    rotateX: mousePosition.y * -10,
    rotateY: mousePosition.x * 10,
    scale: isHovered ? 1.05 : 1,
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: service.delay }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className={`relative p-8 rounded-3xl border border-neutral-200/50 backdrop-blur-sm bg-white/80 dark:bg-neutral-900/80 dark:border-neutral-700/50 overflow-hidden shadow-elegant hover:shadow-premium transition-all duration-500 ${service.gradient}`}
        style={{
          transform: `perspective(1000px) rotateX(${transform3D.rotateX}deg) rotateY(${transform3D.rotateY}deg) scale(${transform3D.scale})`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
        
        {/* Floating icon */}
        <motion.div
          className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.color} text-white mb-6 shadow-lg`}
          whileHover={{ 
            scale: 1.1, 
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.3 }
          }}
        >
          <service.icon className="w-8 h-8" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            {service.title}
          </h3>
          
          <p className="text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
            {service.description}
          </p>

          {/* Features list */}
          <ul className="space-y-3 mb-8">
            {service.features.map((feature, idx) => (
              <motion.li
                key={idx}
                className="flex items-center text-neutral-700 dark:text-neutral-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: service.delay + idx * 0.1 }}
              >
                <CheckCircle2 className="w-5 h-5 text-success-500 mr-3 flex-shrink-0" />
                {feature}
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="ghost"
              className="group font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400"
            >
              Learn More
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Star className="w-6 h-6 text-current" />
        </div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
        </div>
      </motion.div>
    </motion.div>
  );
}

// Process visualization component
function ProcessVisualization() {
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);

  const steps = [
    { title: "Assess", description: "Comprehensive organizational analysis" },
    { title: "Analyze", description: "AI-powered insights and recommendations" },
    { title: "Act", description: "Strategic implementation and execution" },
    { title: "Achieve", description: "Measurable results and continuous optimization" }
  ];

  return (
    <div className="relative py-20">
      <div className="text-center mb-16">
        <motion.h3
          className="text-4xl font-bold text-neutral-900 dark:text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Proven Process
        </motion.h3>
        <motion.p
          className="text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Four strategic phases that guarantee transformation success
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
        {/* Connecting line */}
        <svg
          className="absolute top-1/2 left-0 w-full h-2 hidden md:block"
          style={{ transform: 'translateY(-50%)' }}
        >
          <motion.path
            d="M 0 1 L 100% 1"
            stroke="url(#gradient)"
            strokeWidth="2"
            fill="none"
            style={{ pathLength }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>

        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="relative text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <motion.div
              className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-xl shadow-lg`}
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              {index + 1}
            </motion.div>
            <h4 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
              {step.title}
            </h4>
            <p className="text-neutral-600 dark:text-neutral-300">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Main Services component
export default function ModernServices() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={sectionRef}
      className="py-24 section-gradient-blue relative overflow-hidden"
    >
      {/* Enhanced Background decorations with creative gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-amber-400/15 to-orange-400/15 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-6000"></div>
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
            <Zap className="w-4 h-4" />
            Proven Results
          </motion.div>

          <h2 className="text-5xl lg:text-6xl font-black text-neutral-900 dark:text-white mb-6">
            How We Save Your Organization
            <br />
            <span className="gradient-text bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              $100K+ Annually
            </span>
          </h2>
          
          <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Our Fortune 500 methodology identifies hidden inefficiencies and delivers measurable ROI 
            within 90 days. No risks, just results.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <ServiceCard3D key={index} service={service} _index={index} />
          ))}
        </div>

        {/* Process visualization */}
        <ProcessVisualization />

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="glass rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Ready to Transform Your Organization?
            </h3>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
              Let&apos;s discuss how our services can drive measurable results for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/assessment/start">
                <Button size="lg" className="gradient-primary text-white font-semibold px-8 py-4 rounded-2xl shadow-elegant hover:shadow-premium hover:scale-105 transition-all duration-300">
                  Start Assessment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-2 border-primary-500 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 font-semibold px-8 py-4 rounded-2xl">
                  Schedule Consultation
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
