'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  TrendingUp, 
  Shield,
  Award,
  Clock,
  Lightbulb,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const stats = [
  { 
    number: "500+", 
    label: "Organizations Transformed",
    icon: Users,
    gradient: "from-blue-500 to-cyan-500"
  },
  { 
    number: "95%", 
    label: "Client Satisfaction Rate",
    icon: Target,
    gradient: "from-emerald-500 to-teal-500"
  },
  { 
    number: "$12M+", 
    label: "Cost Savings Generated",
    icon: TrendingUp,
    gradient: "from-purple-500 to-pink-500"
  },
  { 
    number: "90", 
    label: "Day Average ROI",
    icon: Clock,
    gradient: "from-amber-500 to-orange-500"
  }
];

const values = [
  {
    icon: Shield,
    title: "Proven Methodology",
    description: "Fortune 500 frameworks adapted for organizations of all sizes",
    color: "blue"
  },
  {
    icon: Lightbulb,
    title: "Innovation-Driven",
    description: "Cutting-edge AI technology meets strategic consulting expertise",
    color: "emerald"
  },
  {
    icon: Zap,
    title: "Results-Focused",
    description: "Measurable outcomes with guaranteed ROI or money back",
    color: "purple"
  },
  {
    icon: Award,
    title: "Excellence Standard",
    description: "Industry-leading practices backed by decades of experience",
    color: "amber"
  }
];

const colorClasses = {
  blue: {
    gradient: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50",
    text: "text-blue-700",
    glass: "glass-blue"
  },
  emerald: {
    gradient: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    glass: "glass-emerald"
  },
  purple: {
    gradient: "from-purple-500 to-pink-500",
    bg: "bg-purple-50",
    text: "text-purple-700",
    glass: "glass-purple"
  },
  amber: {
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    text: "text-amber-700",
    glass: "glass-amber"
  }
};

export default function EnhancedAbout() {
  return (
    <div className="relative">
      {/* Hero Section with Creative Background */}
      <section className="relative py-24 bg-creative-waves overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 text-professional-blue text-sm font-medium mb-6 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <Award className="w-4 h-4" />
              Transforming Organizations Since 2015
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-black text-enhanced-dark mb-6">
              Strategic Excellence
              <br />
              <span className="text-gradient-primary">
                Meets Innovation
              </span>
            </h1>
            
            <p className="text-xl text-professional-slate leading-relaxed mb-8">
              We combine Fortune 500 strategic consulting expertise with cutting-edge AI technology 
              to deliver measurable organizational transformation that drives real results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  Schedule Consultation
                </Button>
              </Link>
              <Link href="/assessment/start">
                <Button variant="outline" size="lg" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-2xl">
                  Start Assessment
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full filter blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 rounded-full filter blur-xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 section-gradient-emerald relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="card-enhanced text-center p-6"
              >
                <motion.div
                  className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${stat.gradient} text-white mb-4 shadow-lg`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <stat.icon className="w-6 h-6" />
                </motion.div>
                <div className="text-3xl font-bold text-enhanced-dark mb-2">{stat.number}</div>
                <div className="text-professional-slate font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 section-gradient-purple relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-enhanced-dark mb-6">
              Why Organizations Choose
              <br />
              <span className="text-gradient-secondary">NorthPath Strategies</span>
            </h2>
            <p className="text-xl text-professional-slate max-w-3xl mx-auto">
              Our commitment to excellence, innovation, and results sets us apart in the strategic consulting landscape.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className={`${colorClasses[value.color].glass} rounded-2xl p-8 backdrop-blur-lg`}
              >
                <motion.div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${colorClasses[value.color].gradient} text-white mb-6 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <value.icon className="w-8 h-8" />
                </motion.div>
                <h3 className="text-2xl font-bold text-enhanced-dark mb-4">{value.title}</h3>
                <p className="text-professional-slate leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 bg-subtle-pattern relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="card-enhanced p-12">
              <motion.div
                className="inline-flex p-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-8 shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                <Target className="w-8 h-8" />
              </motion.div>
              
              <h2 className="text-4xl font-bold text-enhanced-dark mb-6">Our Mission</h2>
              <p className="text-xl text-professional-slate leading-relaxed mb-8">
                "To empower organizations with the strategic insights and innovative solutions needed 
                to achieve sustainable growth, operational excellence, and measurable competitive advantage 
                in an ever-evolving business landscape."
              </p>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block"
              >
                <Link href="/services">
                  <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Explore Our Services
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full filter blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full filter blur-3xl" />
        </div>
      </section>

      {/* Founder Bio Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 bg-primary-100 rounded-full px-6 py-2 text-primary-700 text-sm font-medium mb-6">
                <Users className="w-4 h-4" />
                Leadership
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Meet Jeremy Estrella
              </h2>
              <div className="space-y-6 text-lg text-gray-700">
                <p>
                  With over 15 years of experience transforming Fortune 500 organizations, Jeremy Estrella 
                  founded NorthPath Strategies to democratize access to world-class organizational transformation 
                  methodologies.
                </p>
                <p>
                  Jeremy has led transformation initiatives at major healthcare systems, universities, 
                  and government agencies, consistently delivering 20-40% cost reductions while improving 
                  operational efficiency and employee satisfaction.
                </p>
                <p>
                  His unique approach combines data-driven analysis with human-centered design, ensuring 
                  that organizational changes are both financially impactful and culturally sustainable.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div>
                    <div className="text-2xl font-bold text-primary-600 mb-1">500+</div>
                    <div className="text-sm text-gray-600">Organizations Transformed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600 mb-1">$12M+</div>
                    <div className="text-sm text-gray-600">Client Savings Generated</div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link href="/contact">
                  <Button className="bg-primary-600 hover:bg-primary-700">
                    Schedule a Consultation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/images/jeremy-estrella-professional.jpg"
                    alt="Jeremy Estrella - Founder of NorthPath Strategies"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                  <div className="text-sm text-gray-600 mb-1">Founder & CEO</div>
                  <div className="font-semibold text-gray-900">Jeremy Estrella</div>
                  <div className="text-xs text-primary-600">MBA, Strategic Management</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
