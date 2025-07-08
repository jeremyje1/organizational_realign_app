'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { 
  Award, 
  Building, 
  CheckCircle2, 
  Globe, 
  GraduationCap, 
  TrendingUp, 
  Users, 
  Zap,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

// Company stats with animations
function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Company stats section
function CompanyStats() {
  const stats = [
    { icon: Users, value: 500, suffix: '+', label: 'Organizations Transformed' },
    { icon: Globe, value: 50, suffix: '+', label: 'Countries Served' },
    { icon: TrendingUp, value: 95, suffix: '%', label: 'Client Satisfaction' },
    { icon: Award, value: 25, suffix: '+', label: 'Industry Awards' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white mb-4 shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <stat.icon className="w-8 h-8" />
          </motion.div>
          
          <motion.div 
            className="text-4xl font-bold text-neutral-900 dark:text-white mb-2"
            whileInView={{ scale: [0.8, 1.1, 1] }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
          >
            <AnimatedCounter end={stat.value} suffix={stat.suffix} />
          </motion.div>
          
          <p className="text-neutral-600 dark:text-neutral-300 text-sm">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

// Timeline component with scroll-triggered animations
function Timeline() {
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0.3, 0.9], [0, 1]);

  const milestones = [
    {
      year: '2010',
      title: 'Company Founded',
      description: 'Started with a vision to revolutionize organizational consulting through data-driven insights.',
      icon: Building,
    },
    {
      year: '2015',
      title: 'AI Integration',
      description: 'Pioneered the integration of artificial intelligence in organizational assessment tools.',
      icon: Zap,
    },
    {
      year: '2018',
      title: 'Global Expansion',
      description: 'Expanded operations to serve Fortune 500 companies across 50+ countries worldwide.',
      icon: Globe,
    },
    {
      year: '2020',
      title: 'Platform Launch',
      description: 'Launched our comprehensive AI-powered assessment platform with real-time analytics.',
      icon: GraduationCap,
    },
    {
      year: '2023',
      title: 'Industry Leadership',
      description: 'Recognized as the leading provider of organizational transformation solutions.',
      icon: Award,
    },
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
          Our Journey
        </motion.h3>
        <motion.p
          className="text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Over a decade of innovation in organizational transformation
        </motion.p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-neutral-200 dark:bg-neutral-700">
          <motion.div
            className="w-full bg-gradient-to-b from-primary-500 to-secondary-500"
            style={{ height: pathLength }}
          />
        </div>

        {milestones.map((milestone, index) => (
          <motion.div
            key={index}
            className={`relative flex items-center mb-16 ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            {/* Content card */}
            <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
              <motion.div
                className="glass rounded-2xl p-6 backdrop-blur-sm bg-white/80 dark:bg-neutral-900/80 shadow-elegant hover:shadow-premium transition-all duration-300"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  {index % 2 === 0 ? (
                    <>
                      <h4 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        {milestone.year}
                      </h4>
                      <milestone.icon className="w-6 h-6 text-primary-500" />
                    </>
                  ) : (
                    <>
                      <milestone.icon className="w-6 h-6 text-primary-500" />
                      <h4 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        {milestone.year}
                      </h4>
                    </>
                  )}
                </div>
                <h5 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                  {milestone.title}
                </h5>
                <p className="text-neutral-600 dark:text-neutral-300">
                  {milestone.description}
                </p>
              </motion.div>
            </div>

            {/* Timeline dot */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 border-4 border-white dark:border-neutral-900 shadow-lg z-10"
              whileInView={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Team showcase with 3D effects
function TeamShowcase() {
  const team = [
    {
      name: 'Jeremy Estrella',
      role: 'Founder & CEO',
      image: '/images/jeremy-estrella-founder.jpg',
      bio: '15+ years leading organizational transformation initiatives',
      linkedin: '#',
    },
    // Add more team members as needed
  ];

  return (
    <div className="py-20">
      <div className="text-center mb-16">
        <motion.h3
          className="text-4xl font-bold text-neutral-900 dark:text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Meet Our Leadership
        </motion.h3>
        <motion.p
          className="text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Experienced leaders driving organizational transformation worldwide
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {team.map((member, index) => (
          <motion.div
            key={index}
            className="group perspective-1000"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 shadow-elegant hover:shadow-premium transition-all duration-500"
              whileHover={{ 
                scale: 1.02,
                rotateY: 5,
                rotateX: 2,
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Image container */}
              <div className="relative overflow-hidden">
                <motion.div
                  className="relative h-80 bg-gradient-to-br from-primary-500 to-secondary-500"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {member.image && (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  )}
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h4 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                  {member.name}
                </h4>
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  {member.bio}
                </p>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-700">
                    View Profile
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-3 h-3 bg-primary-500 rounded-full animate-ping" />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Values section with animated icons
function CompanyValues() {
  const values = [
    {
      icon: CheckCircle2,
      title: 'Excellence',
      description: 'We deliver exceptional results through meticulous attention to detail and continuous improvement.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of partnership and work closely with our clients to achieve shared success.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We leverage cutting-edge technology and methodologies to stay ahead of industry trends.',
    },
    {
      icon: TrendingUp,
      title: 'Growth',
      description: 'We are committed to driving sustainable growth for our clients and our own organization.',
    },
  ];

  return (
    <div className="py-20 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-3xl">
      <div className="text-center mb-16">
        <motion.h3
          className="text-4xl font-bold text-neutral-900 dark:text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Values
        </motion.h3>
        <motion.p
          className="text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          The principles that guide everything we do
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((value, index) => (
          <motion.div
            key={index}
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white mb-6 shadow-lg"
              whileHover={{ 
                scale: 1.1, 
                rotate: [0, -10, 10, 0],
                transition: { duration: 0.3 }
              }}
            >
              <value.icon className="w-10 h-10" />
            </motion.div>
            
            <h4 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
              {value.title}
            </h4>
            
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {value.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Main About component
export default function ModernAbout() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-20 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-secondary-500/5 rounded-full blur-3xl" />
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
            className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 rounded-full px-6 py-3 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Building className="w-4 h-4" />
            About Us
          </motion.div>

          <h2 className="text-5xl lg:text-6xl font-black text-neutral-900 dark:text-white mb-6">
            Transforming Organizations
            <br />
            <span className="gradient-text">Worldwide</span>
          </h2>
          
          <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-4xl mx-auto leading-relaxed">
            For over a decade, we&apos;ve been at the forefront of organizational transformation, 
            combining strategic expertise with cutting-edge AI technology to deliver 
            measurable results for our clients.
          </p>
        </motion.div>

        {/* Company stats */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <CompanyStats />
        </motion.div>

        {/* Timeline */}
        <Timeline />

        {/* Team showcase */}
        <TeamShowcase />

        {/* Company values */}
        <CompanyValues />

        {/* CTA Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="glass rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Ready to Partner With Us?
            </h3>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
              Join hundreds of organizations that have transformed their operations with our expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="gradient-primary text-white font-semibold px-8 py-4 rounded-2xl shadow-elegant hover:shadow-premium hover:scale-105 transition-all duration-300">
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/case-studies">
                <Button variant="outline" size="lg" className="border-2 border-primary-500 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 font-semibold px-8 py-4 rounded-2xl">
                  View Case Studies
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
