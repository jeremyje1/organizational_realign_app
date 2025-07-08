/**
 * Modern Testimonials Section
 */
'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Star, TrendingUp, DollarSign, Clock } from 'lucide-react';

const testimonials = [
  {
    quote: "NorthPath's assessment revealed $2.3M in annual savings we didn't even know existed. The ROI was immediate and substantial.",
    author: "Sarah Chen",
    title: "CFO",
    company: "Regional Healthcare System",
    results: "$2.3M Annual Savings",
    timeframe: "90 Days",
    rating: 5
  },
  {
    quote: "Their AI analysis identified redundancies across 12 departments. We reduced operational costs by 28% while improving efficiency.",
    author: "Michael Rodriguez",
    title: "Operations Director", 
    company: "State University System",
    results: "28% Cost Reduction",
    timeframe: "6 Months",
    rating: 5
  },
  {
    quote: "The implementation was seamless and the results exceeded all expectations. Our organization is now running at peak efficiency.",
    author: "Jennifer Park",
    title: "VP of Operations",
    company: "Fortune 500 Technology",
    results: "$4.1M Saved",
    timeframe: "First Year",
    rating: 5
  }
];

const stats = [
  {
    icon: DollarSign,
    number: "$2.4M",
    label: "Average Annual Savings",
    color: "text-emerald-600"
  },
  {
    icon: TrendingUp, 
    number: "95%",
    label: "Client Success Rate",
    color: "text-blue-600"
  },
  {
    icon: Clock,
    number: "90",
    label: "Days to See Results",
    color: "text-purple-600"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5" />
      
      <div className="container mx-auto px-6 relative">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Real Results from
              <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Real Organizations
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it. See how we've helped organizations save millions 
              while improving operational efficiency.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color.replace('text-', 'from-')}/10 to-slate-100 flex items-center justify-center`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 mb-6 text-lg leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                {/* Results */}
                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-emerald-700 font-bold text-lg">
                        {testimonial.results}
                      </div>
                      <div className="text-gray-600 text-sm">
                        Achieved in {testimonial.timeframe}
                      </div>
                    </div>
                    <TrendingUp className="w-8 h-8 text-emerald-600" />
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.author}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {testimonial.title}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Join Our Success Stories?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Start your risk-free assessment today and discover your organization's hidden savings potential.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a 
                  href="/assessment/start"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-2xl hover:bg-slate-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get My Savings Report - FREE
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.a>
                <motion.a 
                  href="https://calendly.com/jeremyestrella/30min" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-emerald-600 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule Strategy Call
                </motion.a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 rounded-full blur-xl animate-float-delayed" />
    </section>
  );
}
