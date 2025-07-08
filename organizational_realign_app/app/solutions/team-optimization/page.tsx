import { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SafeLink } from '@/components/client-wrappers/DynamicClientImports';

export const metadata: Metadata = {
  title: 'Team Optimization Solutions - NorthPath Strategies',
  description: 'Transform your team performance with our strategic team optimization solutions. Enhance collaboration, productivity, and employee satisfaction with proven methodologies.',
};

export default function TeamOptimizationPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Optimize Your Team for Peak Performance
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Our team optimization solutions help organizations build high-performing teams through strategic 
                restructuring, enhanced collaboration frameworks, and leadership development - resulting in 
                increased productivity and employee satisfaction.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <SafeLink href="/assessment/start">
                  <Button size="lg" className="bg-primary-600 hover:bg-primary-700">
                    Start Your Assessment
                  </Button>
                </SafeLink>
                <SafeLink href="/contact">
                  <Button variant="outline" size="lg">
                    Schedule Consultation
                  </Button>
                </SafeLink>
              </div>
            </div>
            <div className="relative h-80 md:h-96 lg:h-full rounded-xl overflow-hidden">
              <Image 
                src="/images/optimized-hero-logo-60.jpg"
                alt="Team optimization strategies visualization"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Achieve Measurable Team Performance Improvements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">25% Productivity Increase</h3>
              <p className="text-gray-600">
                Our clients typically experience a 25% increase in team productivity within the first 
                quarter after implementing our team optimization strategies.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Improved Employee Satisfaction</h3>
              <p className="text-gray-600">
                Our approach focuses on creating an engaging work environment that leads to a 30% improvement 
                in employee satisfaction and reduced turnover.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Enhanced Collaboration</h3>
              <p className="text-gray-600">
                We implement frameworks that break down silos and enhance cross-functional collaboration, 
                resulting in more innovative solutions and faster problem-solving.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Approach */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Our Team Optimization Approach
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  <span className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
                  Comprehensive Team Assessment
                </h3>
                <p className="text-gray-600 pl-11">
                  We evaluate your team's current structure, roles, workflows, and culture to identify
                  strengths, challenges, and opportunities for improvement.
                </p>
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  <span className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
                  Strategic Restructuring
                </h3>
                <p className="text-gray-600 pl-11">
                  We design optimal team structures that align with your business objectives, ensuring 
                  clear roles, responsibilities, and reporting relationships.
                </p>
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  <span className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">3</span>
                  Collaboration Framework Implementation
                </h3>
                <p className="text-gray-600 pl-11">
                  We implement frameworks and tools that enhance communication, knowledge sharing,
                  and collaboration across teams and departments.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4 flex items-center">
                  <span className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">4</span>
                  Leadership Development
                </h3>
                <p className="text-gray-600 pl-11">
                  We provide targeted coaching and development for team leaders to enhance their ability
                  to inspire, motivate, and guide their teams to peak performance.
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-center">Case Study: Global Technology Firm</h3>
              <p className="text-gray-600 mb-6">
                A global technology company was experiencing siloed teams and inefficient workflows that were 
                impacting product development timelines and team morale.
              </p>
              <div className="border-l-4 border-primary-500 pl-4 mb-6">
                <p className="italic text-gray-600">
                  "NorthPath's team optimization strategies transformed our organization. By restructuring our teams 
                  and implementing new collaboration frameworks, we reduced project delivery times by 35% and saw a 
                  significant improvement in employee satisfaction scores."
                </p>
                <p className="mt-2 font-semibold">- CTO, Global Technology Firm</p>
              </div>
              <div className="flex justify-between text-sm text-gray-600 border-t border-gray-200 pt-4">
                <div>
                  <p className="font-semibold">Productivity Increase</p>
                  <p className="text-primary-600 text-xl font-bold">32%</p>
                </div>
                <div>
                  <p className="font-semibold">Employee Satisfaction</p>
                  <p className="text-primary-600 text-xl font-bold">+42%</p>
                </div>
                <div>
                  <p className="font-semibold">Time to Market</p>
                  <p className="text-primary-600 text-xl font-bold">-35%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Optimize Your Team's Performance?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Take the first step toward creating high-performing teams that drive innovation, 
            efficiency, and business results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SafeLink href="/assessment/start">
              <Button size="lg" variant="secondary">
                Start Your Free Assessment
              </Button>
            </SafeLink>
            <SafeLink href="/contact">
              <Button size="lg" variant="outline" className="border-white hover:bg-white hover:text-primary-700">
                Schedule a Consultation
              </Button>
            </SafeLink>
          </div>
        </div>
      </section>
    </div>
  );
}
