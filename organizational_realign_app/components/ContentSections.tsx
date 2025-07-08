'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronRight, BarChart3, UsersRound, TrendingUp } from 'lucide-react';

// Define the content section items
const contentItems = [
  {
    icon: <BarChart3 className="h-10 w-10 text-blue-500" />,
    title: "Strategy & Systems Design",
    description: "At NorthPath Strategies, we don't coach individuals—we design the systems that support them. Our work lives at the intersection of strategy and execution across diverse sectors.",
    link: "/solutions/strategy-systems",
  },
  {
    icon: <UsersRound className="h-10 w-10 text-indigo-500" />,
    title: "Institutional Transformation",
    description: "Whether you're leading a strategic plan, responding to shifting accreditation or industry demands, or reimagining student success, patient care, or customer service from the ground up, we help align structures, people, and outcomes to your mission.",
    link: "/solutions/institutional-transformation",
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-green-500" />,
    title: "Mission-Driven Solutions",
    description: "With deep experience in institutional transformation across education, healthcare, nonprofits, and businesses, we bring clarity to complexity—and momentum to what matters most.",
    link: "/solutions/mission-driven-solutions",
  },
];

// Individual content item component
const ContentItem = ({ item, index }: { item: typeof contentItems[0], index: number }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        delay: index * 0.2,
      } 
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={itemVariants}
      className="glass-emerald rounded-xl p-8 border border-emerald-200/50 hover:glass-blue transition-all duration-500 group hover:scale-105"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-lg mb-6 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
        {item.icon}
      </div>
      <h3 className="text-xl font-bold text-enhanced-dark mb-4 group-hover:text-professional-blue transition-colors duration-300">{item.title}</h3>
      <p className="text-enhanced-dark opacity-80 leading-relaxed pb-2">{item.description}</p>
    </motion.div>
  );
};

// Main component
export default function ContentSections() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className="py-20 section-gradient-emerald relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-emerald-400/20 to-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-green-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-gradient-to-br from-pink-400/20 to-emerald-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-6000"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.h2 
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="text-3xl font-bold mb-4 text-enhanced-dark"
          >
            Let's Build Better Systems
          </motion.h2>
          <motion.p 
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.6, delay: 0.2 } }
            }}
            className="text-enhanced-dark opacity-80 max-w-3xl mx-auto text-lg"
          >
            Our expertise is designed to help organizations across education, healthcare, nonprofit, and business sectors 
            solve the root causes of misalignment, fragmentation, and underperformance—not just the symptoms.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {contentItems.map((item, index) => (
            <ContentItem key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
