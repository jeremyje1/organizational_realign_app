'use client';

import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Clock, CheckCircle2 } from 'lucide-react';

const benefits = [
  {
    icon: DollarSign,
    title: "$2.4M",
    subtitle: "Average Annual Savings",
    description: "Organizations reduce operational costs by 15-30% within 90 days",
    color: "text-emerald-600"
  },
  {
    icon: Clock,
    title: "15 Minutes",
    subtitle: "To Complete Assessment",
    description: "Get instant insights into your organizational efficiency gaps",
    color: "text-blue-600"
  },
  {
    icon: TrendingUp,
    title: "95%",
    subtitle: "Success Rate",
    description: "Clients achieve measurable ROI within first quarter of implementation",
    color: "text-purple-600"
  },
  {
    icon: CheckCircle2,
    title: "500+",
    subtitle: "Organizations Optimized",
    description: "Fortune 500 companies trust our proven methodology",
    color: "text-orange-600"
  }
];

export default function ValueProposition() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Why Organizations Choose 
            <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              NorthPath Strategies
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We deliver measurable results fast. Our AI-powered methodology identifies cost savings 
            and efficiency gains that traditional consulting misses.
          </p>
        </motion.div>

        {/* Value Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${benefit.color.replace('text-', 'from-')}/10 to-slate-100 flex items-center justify-center`}>
                <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
              </div>
              
              <div className={`text-4xl font-bold ${benefit.color} mb-2`}>
                {benefit.title}
              </div>
              
              <div className="text-lg font-semibold text-slate-700 mb-3">
                {benefit.subtitle}
              </div>
              
              <p className="text-slate-600 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Unlock Your Organization's Potential?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join 500+ organizations that have saved millions with our proven methodology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/assessment/start"
                className="bg-white text-emerald-600 font-semibold px-8 py-4 rounded-2xl hover:bg-slate-50 transition-all duration-300 inline-flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Free Assessment
              </motion.a>
              <motion.a
                href="mailto:jeremy@northpathstrategies.com"
                className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white hover:text-emerald-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Strategy Call
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
