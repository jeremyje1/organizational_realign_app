import type { Metadata } from 'next';
import { ChevronRight, Calendar, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageWrapper } from '@/components/ui/page-wrapper';
import { PagesBackground } from '@/components/ui/pages-background';
import StableNavbar from '@/components/StableNavbar';
import EnhancedFooter from '@/components/EnhancedFooter';

export const metadata: Metadata = {
  title: 'News | NorthPath Strategies',
  description: 'The latest news, press releases, and updates from NorthPath Strategies. Stay informed about our company growth, client success stories, and industry insights.',
};

export default function NewsPage() {
  // News article data
  const newsArticles = [
    {
      id: 1,
      title: 'NorthPath Strategies Expands Operations with New Office in Chicago',
      excerpt: 'NorthPath Strategies continues its growth with the opening of a new office in Chicago to better serve clients in the Midwest region. The expansion marks a significant milestone in the company\'s strategic growth plan.',
      date: 'July 15, 2023',
      author: 'NorthPath Communications',
      category: 'Company News',
      image: '/images/news/chicago-office.jpg'
    },
    {
      id: 2,
      title: 'CEO Jeremy Estrella Named to "Top 40 Under 40" Business Leaders List',
      excerpt: 'NorthPath Strategies founder and CEO Jeremy Estrella has been recognized among the "Top 40 Under 40" business leaders by Business Journal for his contributions to organizational transformation and strategic consulting.',
      date: 'May 22, 2023',
      author: 'NorthPath Communications',
      category: 'Awards',
      image: '/images/news/jeremy-award.jpg'
    },
    {
      id: 3,
      title: 'NorthPath Strategies Partners with Leading AI Research Institution',
      excerpt: 'NorthPath Strategies announces a strategic partnership with the Institute for Advanced Analytics to enhance its AI-powered organizational assessment platform with cutting-edge machine learning capabilities.',
      date: 'April 8, 2023',
      author: 'NorthPath Communications',
      category: 'Partnerships',
      image: '/images/news/ai-partnership.jpg'
    },
    {
      id: 4,
      title: 'NorthPath Strategies Achieves Record Growth in Q1 2023',
      excerpt: 'NorthPath Strategies reports 127% year-over-year growth in Q1 2023, driven by increased demand for organizational transformation services across healthcare, higher education, and financial services sectors.',
      date: 'April 2, 2023',
      author: 'NorthPath Communications',
      category: 'Financial News',
      image: '/images/news/growth-chart.jpg'
    },
    {
      id: 5,
      title: 'NorthPath Strategies Launches Enhanced Assessment Platform',
      excerpt: 'NorthPath Strategies unveils significant updates to its proprietary assessment platform, featuring advanced analytics capabilities, improved user interface, and expanded organizational benchmarking data.',
      date: 'March 15, 2023',
      author: 'NorthPath Communications',
      category: 'Product News',
      image: '/images/news/platform-update.jpg'
    },
    {
      id: 6,
      title: 'NorthPath Strategies Welcomes Sarah Chen as New Chief Operating Officer',
      excerpt: 'NorthPath Strategies announces the appointment of Sarah Chen as Chief Operating Officer. Chen brings over 15 years of experience in operational excellence and organizational transformation.',
      date: 'February 7, 2023',
      author: 'NorthPath Communications',
      category: 'Leadership',
      image: '/images/news/sarah-chen.jpg'
    },
  ];

  // Press release data
  const pressReleases = [
    {
      title: 'NorthPath Strategies Acquires DataOptimize, Expanding Data Analytics Capabilities',
      date: 'June 12, 2023',
      link: '#'
    },
    {
      title: 'NorthPath Strategies Selected by Fortune 500 Healthcare Provider for Organization-Wide Transformation',
      date: 'May 5, 2023',
      link: '#'
    },
    {
      title: 'NorthPath Strategies Announces Strategic Partnership with Global HR Technology Leader',
      date: 'April 18, 2023',
      link: '#'
    },
    {
      title: 'NorthPath Strategies Launches Initiative to Help Higher Education Institutions Optimize Operations',
      date: 'March 22, 2023',
      link: '#'
    }
  ];

  // Categories
  const categories = [
    'Company News',
    'Leadership',
    'Product News',
    'Partnerships',
    'Awards',
    'Financial News',
    'Industry Insights'
  ];

  return (
    <>
      <StableNavbar />
      <PagesBackground>
        <PageWrapper>
          <main className="min-h-screen">
            {/* Hero Section */}
            <div className="relative w-full py-20 md:py-28 px-6 flex items-center justify-center mb-[-4rem]">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gray-900/60 z-10"></div>
                <img
                  src="/images/news-hero.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-20 max-w-5xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                NorthPath News & Updates
              </h1>
              <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
                Stay informed about our company, client successes, and industry developments
              </p>
            </div>
          </div>

      {/* Featured News */}
      <section className="py-16 px-6 md:py-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-blue-50 to-gray-100 p-1 rounded-2xl">
            <div className="relative h-[400px] w-full rounded-xl overflow-hidden">
              <img 
                src={newsArticles[0].image || '/images/news/default.jpg'} 
                alt={newsArticles[0].title} 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          
          <div className="flex flex-col justify-center">
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 mb-4 w-fit">Featured</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">{newsArticles[0].title}</h2>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{newsArticles[0].date}</span>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>{newsArticles[0].author}</span>
              </div>
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                <span>{newsArticles[0].category}</span>
              </div>
            </div>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {newsArticles[0].excerpt}
            </p>
            
            <Button className="bg-blue-600 hover:bg-blue-700 w-fit">Read Full Article</Button>
          </div>
        </div>
      </section>

      {/* Latest News Articles */}
      <section className="py-16 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-between items-baseline mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Latest News</h2>
            <Button variant="outline" className="flex items-center">
              View All News
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.slice(1, 7).map((article) => (
              <div key={article.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48 w-full bg-gray-200">
                  <img
                    src={article.image || '/images/news/default.jpg'}
                    alt={article.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="outline" className="text-xs">{article.category}</Badge>
                    <span className="text-sm text-gray-500">{article.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                  <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium">
                    Read More
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Press Releases</h2>
              <p className="text-gray-600 mb-8">
                Official announcements from NorthPath Strategies regarding company updates, 
                strategic partnerships, and significant client engagements.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">Media Kit</Button>
            </div>
            
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-8">
                <ul className="divide-y divide-gray-100">
                  {pressReleases.map((release, index) => (
                    <li key={index} className={`${index === 0 ? 'pb-6' : index === pressReleases.length - 1 ? 'pt-6' : 'py-6'}`}>
                      <div className="text-sm text-gray-500 mb-2">{release.date}</div>
                      <a href={release.link} className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors">
                        {release.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories and Press Contact */}
      <section className="py-16 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Categories</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-200"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Press Contact</h2>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-gray-800 font-medium mb-1">Media Relations Team</p>
              <p className="text-gray-600 mb-4">For press inquiries, interview requests, and media resources</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <span className="text-gray-600">press@northpathstrategies.com</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <span className="text-gray-600">+1 (800) 555-1234 ext. 2</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">Request Press Kit</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-blue-100 mb-8 max-w-lg mx-auto">
              Subscribe to our newsletter to receive the latest news, updates, and insights from NorthPath Strategies directly to your inbox.
            </p>
            
            <form className="flex flex-col sm:flex-row max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-white/20 border border-blue-300/30 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-blue-100 w-full"
                required
              />
              <button
                type="submit"
                className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none hover:bg-blue-50 transition-colors"
              >
                Subscribe
              </button>
            </form>
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
