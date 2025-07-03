/**
 * @generated from HOMEPAGE_INSTRUCTIONS.md – do not delete.
 * Animated stats banner with scroll-triggered counters
 */
'use client';

import { useEffect, useRef, useState } from 'react';

interface StatItem {
  value: string;
  label: string;
  suffix?: string;
}

const stats: StatItem[] = [
  { value: "1", label: "spend modeled", suffix: "B+" },
  { value: "250", label: "employees optimized", suffix: "k" },
  { value: "97", label: "client satisfaction", suffix: "%" }
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
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      const target = parseInt(stat.value);
      const duration = 2000; // 2 seconds
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
          newCounts[index] = Math.floor(current);
          return newCounts;
        });
      }, 16);
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold font-serif">
                <span 
                  className="inline-block tabular-nums"
                  data-count={stat.value}
                >
                  ${counts[index]}{stat.suffix}
                </span>
              </div>
              <div className="text-blue-100 text-lg font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Context */}
        <div className="text-center mt-12 max-w-2xl mx-auto">
          <p className="text-blue-100 leading-relaxed">
            Trusted by organizations across sectors to deliver measurable transformation 
            through our proprietary optimization algorithms and proven methodologies.
          </p>
        </div>
      </div>
    </section>
  );
}
