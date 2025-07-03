/**
 * @generated from HOMEPAGE_INSTRUCTIONS.md – do not delete.
 * Homepage built according to NorthPath brand specifications
 */
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import StatsBanner from '@/components/StatsBanner';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'NorthPath Strategies - Organizational Realignment & Optimization Suite',
  description: 'Transform your organization with NorthPath\'s proprietary optimization engine featuring Dynamic Span-of-Control Heuristic (DSCH), Monte-Carlo Cultural Resilience Factor (CRF), and License Efficiency Index (LEI). Expert consulting for universities, hospitals, nonprofits, and businesses.',
  keywords: [
    'organizational realignment',
    'span of control optimization',
    'cultural resilience analysis',
    'license efficiency',
    'organizational restructuring',
    'higher education consulting',
    'hospital systems optimization',
    'nonprofit efficiency',
    'government agency optimization',
    'business process optimization',
    'AI-powered analytics',
    'cost savings analysis',
    'dynamic organizational heuristics'
  ],
  openGraph: {
    title: 'NorthPath Strategies - Organizational Realignment & Optimization Suite',
    description: 'Proprietary optimization engine with DSCH, CRF, and LEI algorithms. Transform your organization with data-driven insights and proven methodologies.',
    type: 'website',
    url: 'https://app.northpathstrategies.org',
    images: [
      {
        url: 'https://app.northpathstrategies.org/og-homepage.png',
        width: 1200,
        height: 630,
        alt: 'NorthPath Strategies - Organizational Optimization Suite',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NorthPath Strategies - Proprietary Organizational Optimization',
    description: 'Patent-pending algorithms for organizational realignment. DSCH, CRF, and LEI methodologies for measurable transformation.',
    images: ['https://app.northpathstrategies.org/twitter-homepage.png'],
  },
  alternates: {
    canonical: 'https://app.northpathstrategies.org',
  },
};

export default function HomePage() {
  // Structured data for homepage
  const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'NorthPath Organizational Realignment & Optimization Suite',
    description: 'Proprietary optimization engine featuring Dynamic Span-of-Control Heuristic (DSCH), Monte-Carlo Cultural Resilience Factor (CRF), and License Efficiency Index (LEI) for organizational transformation',
    provider: {
      '@type': 'Organization',
      name: 'NorthPath Strategies',
      url: 'https://app.northpathstrategies.org',
      founder: {
        '@type': 'Person',
        name: 'Jeremy Estrella',
        jobTitle: 'Founder & Organizational Optimization Strategist',
        description: '15+ years of experience in organizational transformation across multiple sectors',
      },
    },
    serviceType: 'Organizational Consulting',
    areaServed: 'United States',
    audience: [
      {
        '@type': 'Audience',
        audienceType: 'Higher Education Institutions',
      },
      {
        '@type': 'Audience', 
        audienceType: 'Healthcare Systems',
      },
      {
        '@type': 'Audience',
        audienceType: 'Nonprofit Organizations',
      },
      {
        '@type': 'Audience',
        audienceType: 'Government Agencies',
      },
      {
        '@type': 'Audience',
        audienceType: 'Private Companies',
      }
    ],
    offers: [
      {
        '@type': 'Offer',
        name: 'Basic Diagnostic',
        description: 'Rapid organizational insights with DSCH scenario analysis',
        price: '1999',
        priceCurrency: 'USD'
      },
      {
        '@type': 'Offer', 
        name: 'Comprehensive Analysis',
        description: 'Multi-scenario optimization with interactive dashboard and workshop',
        price: '3999',
        priceCurrency: 'USD'
      },
      {
        '@type': 'Offer',
        name: 'Enterprise Optimization', 
        description: 'Full integration with API access and unlimited scenarios',
        price: '8999',
        priceCurrency: 'USD'
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
      
      {/* Page Sections */}
      <Navbar />
      <Hero />
      <About />
      <Services />
      <StatsBanner />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
}