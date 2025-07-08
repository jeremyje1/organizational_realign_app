import ImprovedModernNavbar from '@/components/modern/ImprovedModernNavbar';
import EnhancedFooter from '@/components/EnhancedFooter';
import EnhancedHero from '@/components/EnhancedHero';
import ContentSections from '@/components/ContentSections';
import SimplifiedTestimonials from '@/components/SimplifiedTestimonials';
import CallToActionSection from '@/components/CallToActionSection';
import { SafeLink as Link } from '@/components/client-wrappers/DynamicClientImports';
import EnhancedSEO from '@/components/seo/EnhancedSEO';
import StructuredData from '@/components/seo/StructuredData';
import ReadProgress from '@/components/seo/ReadProgress';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import type { Metadata } from 'next';

// Define metadata for this page (static metadata)
export const metadata: Metadata = {
  title: "NorthPath Strategies - Higher Education & Nonprofit Transformation",
  description: "NorthPath Strategies partners with mission-driven colleges, universities, and nonprofits to solve the root causes of misalignment, fragmentation, and underperformance.",
  keywords: "higher education transformation, institutional alignment, nonprofit strategy, systems design, university consulting, strategic planning",
  openGraph: {
    title: "NorthPath Strategies - Redesign the Systems. Align the Strategy. Transform the Institution.",
    description: "We help mission-driven colleges, universities, and nonprofits align structures, people, and outcomes to your mission.",
    url: "https://northpathstrategies.org",
    siteName: "NorthPath Strategies",
    images: [
      {
        url: '/og-homepage.png',
        width: 1200,
        height: 630,
        alt: "NorthPath Strategies - Higher Education & Nonprofit Transformation",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NorthPath Strategies - Higher Education & Nonprofit Transformation",
    description: "We design the systems that support mission-driven institutions at the intersection of strategy, equity, and execution.",
    creator: "@northpathstrat",
    images: ["/og-homepage.png"],
  },
};

export default function HomePage() {
  return (
    <>
      <ImprovedModernNavbar />
      
      {/* Client-side additional SEO enhancements */}
      <EnhancedSEO 
        title="NorthPath Strategies - Redesign the Systems. Align the Strategy. Transform the Institution."
        description="We partner with mission-driven colleges, universities, and nonprofits to solve the root causes of misalignment, fragmentation, and underperformance."
        keywords={["higher education transformation", "institutional alignment", "nonprofit strategy", "systems design", "university consulting", "strategic planning"]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "NorthPath Strategies",
          "description": "Higher Education and Nonprofit Transformation Services",
          "url": "https://app.northpathstrategies.org",
        }}
      />
      
      {/* Add structured data for the organization */}
      <StructuredData
        type="Organization"
        data={{
          name: "NorthPath Strategies",
          description: "Partners with mission-driven colleges, universities, and nonprofits to solve root causes of institutional misalignment",
          foundingDate: "2020",
          url: "https://app.northpathstrategies.org",
          areaServed: "United States",
        }}
      />
      
      <main id="main-content">
        {/* Add read progress indicator */}
        <ReadProgress 
          position="top" 
          height={3} 
          threshold={50} 
          color="#3b82f6"
        />
        
        {/* Add breadcrumbs for better navigation and SEO */}
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' }
          ]}
          className="container mx-auto px-4 pt-2"
        />
        
        <EnhancedHero />
        <ContentSections />
        <SimplifiedTestimonials />
        <CallToActionSection />
      </main>
      
      <EnhancedFooter />
    </>
  );
}