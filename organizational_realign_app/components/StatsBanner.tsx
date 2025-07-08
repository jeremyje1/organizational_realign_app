/**
 * Premium Animated Stats Banner - Enterprise design with floating effects
 */
'use client';

import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Users, Award, Target } from 'lucide-react';

interface StatItem {
  value: string;
  label: string;
  suffix?: string;
  icon: React.ComponentType<any>;
  description: string;
}

const stats: StatItem[] = [
  { 
    value: "15", 
    label: "Years of Excellence", 
    suffix: "+", 
    icon: Award,
    description: "Proven track record of organizational transformation"
  },
  { 
    value: "500", 
    label: "Organizations Transformed", 
    suffix: "+", 
    icon: Users,
    description: "Across healthcare, education, and enterprise sectors"
  },
  { 
    value: "95", 
    label: "Success Rate", 
    suffix: "%", 
    icon: Target,
    description: "Measurable improvements and client satisfaction"
  },
  { 
    value: "2.4", 
    label: "Average Cost Savings", 
    suffix: "M", 
    icon: TrendingUp,
    description: "Million dollars saved per organization annually"
  }
];

export default function StatsBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      const target = stat.value.includes('.') ? parseFloat(stat.value) * 10 : parseInt(stat.value);
      const duration = 2500; // 2.5 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        
        setCounts(prev => {
          const newCounts = [...prev];
          if (stat.value.includes('.')) {
            newCounts[index] = Math.floor(current) / 10;
          } else {
            newCounts[index] = Math.floor(current);
          }
          return newCounts;
        });
      }, 16);
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="py-32 bg-gradient-to-br from-slate-900 via-blue-950 to-purple-950 text-white relative overflow-hidden"
    >
      {/* Premium background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl animate-pulse-glow"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-8 py-4 glass-dark text-cyan-300 rounded-full text-sm font-bold mb-8 shadow-xl border border-cyan-500/20">
            PROVEN RESULTS
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
            Delivering Measurable
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mt-2">
              Transformation
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            Our proprietary methodologies consistently deliver exceptional results across diverse organizational contexts
          </p>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="glass-premium rounded-3xl p-8 text-center hover-lift group border border-white/10 shadow-2xl"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Animated Number */}
                <div className="text-5xl md:text-6xl font-bold font-serif mb-4">
                  <span 
                    className="inline-block tabular-nums bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                    data-count={stat.value}
                  >
                    {stat.value.includes('.') ? counts[index].toFixed(1) : counts[index]}{stat.suffix}
                  </span>
                </div>

                {/* Label */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed">
                  {stat.description}
                </p>

                {/* Decorative elements */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Trust Section */}
        <div className="text-center mt-20">
          <div className="glass-dark rounded-3xl p-10 max-w-4xl mx-auto border border-white/10 shadow-2xl">
            <p className="text-2xl text-slate-200 leading-relaxed font-light mb-8">
              &quot;NorthPath Strategies has consistently delivered transformational results across our diverse client portfolio, 
              from Fortune 500 companies to major healthcare systems and educational institutions.&quot;
            </p>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                SOC 2 Type II Certified
              </span>
              <span className="hidden md:block">•</span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                Patent-Pending Algorithms
              </span>
              <span className="hidden md:block">•</span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                Industry-Leading Methodologies
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
