'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, BarChart3, UsersRound, TrendingUp } from 'lucide-react';

// Define the content section items
const contentItems = [
  {
    icon: <BarChart3 className="h-10 w-10 text-blue-200" />,
    title: "Strategy & Systems Design",
    description: "At NorthPath Strategies, we don't coach individuals—we design the systems that support them. Our work lives at the intersection of strategy and execution across diverse sectors.",
    link: "/solutions/strategy-systems",
  },
  {
    icon: <UsersRound className="h-10 w-10 text-indigo-200" />,
    title: "Institutional Transformation",
    description: "Whether you're leading a strategic plan, responding to shifting accreditation or industry demands, or reimagining student success, patient care, or customer service from the ground up, we help align structures, people, and outcomes to your mission.",
    link: "/solutions/institutional-transformation",
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-green-200" />,
    title: "Mission-Driven Solutions",
    description: "With deep experience in institutional transformation across education, healthcare, nonprofits, and businesses, we bring clarity to complexity—and momentum to what matters most.",
    link: "/solutions/mission-driven-solutions",
  },
];

// Individual content item component
const ContentItem = ({ item, index }: { item: typeof contentItems[0], index: number }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-8 hover:shadow-xl hover:bg-white/15 transition-all duration-300 border border-white/20">
      <div className="flex items-center mb-4">
        <div className="text-white">{item.icon}</div>
        <h3 className="text-xl font-semibold text-white ml-4">{item.title}</h3>
      </div>
      <p className="text-white/90 mb-6 leading-relaxed">{item.description}</p>
      <Link 
        href={item.link}
        className="inline-flex items-center text-blue-200 hover:text-blue-100 font-medium transition-colors"
      >
        Learn More
        <ChevronRight className="h-4 w-4 ml-1" />
      </Link>
    </div>
  );
};

export default function ContentSections() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How We Transform Organizations
          </h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            We partner with mission-driven institutions to solve root causes of misalignment, 
            fragmentation, and underperformance—not just the symptoms.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contentItems.map((item, index) => (
            <ContentItem key={index} item={item} index={index} />
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <Link 
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-lg font-semibold hover:bg-white/30 transition-all"
          >
            Start Your Transformation
            <ChevronRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
