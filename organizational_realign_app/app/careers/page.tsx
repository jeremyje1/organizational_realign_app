import type { Metadata } from 'next';
import { ChevronRight, Briefcase, BarChart, Users, Globe, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageWrapper } from '@/components/ui/page-wrapper';
import { PagesBackground } from '@/components/ui/pages-background';
import EnhancedFooter from '@/components/EnhancedFooter';

export const metadata: Metadata = {
  title: 'Careers at NorthPath Strategies | Join Our Team',
  description: 'Explore career opportunities at NorthPath Strategies. Join our team of organizational transformation experts and make a significant impact on Fortune 500 companies.',
};

export default function CareersPage() {
  // Current openings
  const openings = [
    {
      title: 'Senior Transformation Consultant',
      location: 'Seattle (Hybrid)',
      type: 'Full-time',
      description: 'Lead client engagements, developing and implementing strategic transformation initiatives that drive measurable ROI.',
      requirements: [
        'MBA or equivalent advanced degree',
        '8+ years of management consulting experience',
        'Track record of delivering organizational transformation projects',
        'Exceptional client relationship management skills',
        'Strong analytical and problem-solving abilities'
      ]
    },
    {
      title: 'Data Scientist - Organizational Analysis',
      location: 'Remote (US)',
      type: 'Full-time',
      description: 'Leverage advanced analytics to identify organizational optimization opportunities and develop data-driven recommendations.',
      requirements: [
        'Masters or PhD in Statistics, Mathematics, Computer Science or related field',
        '5+ years experience in data science with focus on organizational data',
        'Expertise in Python, R, and machine learning',
        'Experience with natural language processing and unstructured data analysis',
        'Strong communication skills for translating complex analysis into actionable insights'
      ]
    },
    {
      title: 'Implementation Project Manager',
      location: 'Chicago (Hybrid)',
      type: 'Full-time',
      description: 'Lead the execution of transformation initiatives, ensuring on-time, on-budget delivery with measurable client results.',
      requirements: [
        'PMP certification preferred',
        '6+ years of project management experience',
        'Experience managing organizational change initiatives',
        'Strong stakeholder management skills',
        'Ability to navigate complex organizational environments'
      ]
    },
    {
      title: 'Business Development Associate',
      location: 'Remote (US)',
      type: 'Full-time',
      description: 'Identify and develop new business opportunities, building relationships with potential clients across industries.',
      requirements: [
        'Bachelor\'s degree in Business, Marketing, or related field',
        '3+ years of B2B sales or business development experience',
        'Strong understanding of organizational consulting services',
        'Exceptional communication and relationship-building skills',
        'Self-motivated with ability to work independently'
      ]
    }
  ];

  // Benefits
  const benefits = [
    {
      icon: BarChart,
      title: 'Competitive Compensation',
      description: 'Base salary, performance bonuses, and equity opportunities'
    },
    {
      icon: Users,
      title: 'Comprehensive Healthcare',
      description: 'Premium medical, dental, and vision coverage for you and dependents'
    },
    {
      icon: Clock,
      title: 'Work-Life Balance',
      description: 'Flexible scheduling, remote work options, and generous PTO'
    },
    {
      icon: Globe,
      title: 'Professional Development',
      description: 'Continuous learning opportunities, conferences, and training stipends'
    },
    {
      icon: Award,
      title: 'Recognition',
      description: 'Performance-based promotions and regular recognition programs'
    }
  ];

  return (
    <>
      <PagesBackground>
        <PageWrapper>
          <main className="min-h-screen">
            {/* Hero Section */}
            <div className="relative w-full py-20 md:py-28 px-6 flex items-center justify-center mb-[-4rem]">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gray-900/60 z-10"></div>
                <img
                  src="/images/careers-hero.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-20 max-w-5xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                Join Our Team
              </h1>
              <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
                Help transform organizations and build impactful careers at NorthPath Strategies
              </p>
            </div>
          </div>

      {/* Why Join Section */}
      <section className="py-16 px-6 md:py-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Why Join NorthPath?</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              At NorthPath Strategies, we're building a team of exceptional talent dedicated to transforming 
              organizations through strategic expertise and measurable results. Our team members enjoy:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mt-1 mr-3 bg-blue-100 rounded-full p-1">
                  <ChevronRight className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Impactful Work</p>
                  <p className="text-gray-600">Drive significant, measurable changes for Fortune 500 companies and major institutions</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mt-1 mr-3 bg-blue-100 rounded-full p-1">
                  <ChevronRight className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Rapid Growth</p>
                  <p className="text-gray-600">Be part of a fast-growing company with exceptional career advancement opportunities</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mt-1 mr-3 bg-blue-100 rounded-full p-1">
                  <ChevronRight className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Innovation</p>
                  <p className="text-gray-600">Work with cutting-edge technologies and methodologies that are reshaping industries</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mt-1 mr-3 bg-blue-100 rounded-full p-1">
                  <ChevronRight className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Collaborative Culture</p>
                  <p className="text-gray-600">Join a team that values diverse perspectives, collaboration, and mutual support</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-gray-100 p-1 rounded-2xl">
            <div className="relative h-[400px] w-full rounded-xl overflow-hidden">
              <img 
                src="/images/careers/team-collaboration.jpg" 
                alt="NorthPath team collaborating" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Benefits & Perks</h2>
            <p className="text-lg text-gray-600">
              We believe in taking care of our team with comprehensive benefits that support your health,
              wealth, and professional growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Current Openings Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Current Openings</h2>
            <p className="text-lg text-gray-600">
              Join our team of experts and make a significant impact on organizations across industries.
              We're always looking for exceptional talent to help us grow.
            </p>
          </div>

          <div className="space-y-8">
            {openings.map((job, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="p-8">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-800">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <div className="flex items-center text-gray-600">
                          <Briefcase className="w-4 h-4 mr-2" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Globe className="w-4 h-4 mr-2" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Apply Now
                    </Button>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{job.description}</p>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Requirements</h4>
                    <ul className="space-y-2">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="flex items-start">
                          <div className="mt-1 mr-2 bg-blue-100 rounded-full p-1">
                            <ChevronRight className="w-3 h-3 text-blue-600" />
                          </div>
                          <span className="text-gray-600">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="py-16 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Our Application Process</h2>
            <p className="text-lg text-gray-600">
              We've designed a thorough but efficient hiring process to ensure we find the best talent
              who align with our values and mission.
            </p>
          </div>

          <div className="relative">
            {/* Process Timeline */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-blue-200 -translate-x-1/2 z-0"></div>
            
            <div className="space-y-12 relative z-10">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Application Review</h3>
                  <p className="text-gray-600">Our talent team reviews your application and evaluates your experience against role requirements.</p>
                </div>
                <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10 my-4 md:my-0 md:mx-4">1</div>
                <div className="md:w-1/2 md:pl-12">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="text-gray-600 text-sm italic">
                      "We look for candidates who demonstrate clear impact and results in their previous roles."
                    </p>
                    <p className="font-medium text-gray-800 mt-2">— NorthPath Talent Team</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="order-2 md:order-1 md:w-1/2 md:pr-12 md:text-right">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="text-gray-600 text-sm italic">
                      "The initial call helps us understand your motivations and how you might fit with our team culture."
                    </p>
                    <p className="font-medium text-gray-800 mt-2">— NorthPath Recruiting Manager</p>
                  </div>
                </div>
                <div className="order-1 md:order-2 bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10 my-4 md:my-0 md:mx-4">2</div>
                <div className="order-3 md:w-1/2 md:pl-12 mb-8 md:mb-0">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Phone Interview</h3>
                  <p className="text-gray-600">A 30-minute call to discuss your background, interests, and answer initial questions.</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Case Study & Technical Assessment</h3>
                  <p className="text-gray-600">Demonstrate your problem-solving abilities and technical skills through relevant exercises.</p>
                </div>
                <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10 my-4 md:my-0 md:mx-4">3</div>
                <div className="md:w-1/2 md:pl-12">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="text-gray-600 text-sm italic">
                      "Our case studies reflect real client challenges we've faced, giving candidates insight into our work."
                    </p>
                    <p className="font-medium text-gray-800 mt-2">— NorthPath Senior Consultant</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center">
                <div className="order-2 md:order-1 md:w-1/2 md:pr-12 md:text-right">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="text-gray-600 text-sm italic">
                      "The final interview is as much about you evaluating us as it is about us evaluating you."
                    </p>
                    <p className="font-medium text-gray-800 mt-2">— NorthPath Leadership Team</p>
                  </div>
                </div>
                <div className="order-1 md:order-2 bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10 my-4 md:my-0 md:mx-4">4</div>
                <div className="order-3 md:w-1/2 md:pl-12 mb-8 md:mb-0">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Final Interview & Offer</h3>
                  <p className="text-gray-600">Meet with leadership team members and discuss next steps. Successful candidates receive our offer promptly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Don't See the Right Role?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            We're always looking for exceptional talent. Submit your resume for future opportunities, 
            and we'll reach out when there's a match for your skills and experience.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
              Submit Your Resume
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              Join Talent Network
            </Button>
          </div>
        </div>
      </section>
    </main>
        <EnhancedFooter />
      </PageWrapper>
    </PagesBackground>
    </>
  );
}
