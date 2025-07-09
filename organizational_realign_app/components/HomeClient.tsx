'use client';

import dynamic from 'next/dynamic';
import EnhancedFooter from '@/components/EnhancedFooter';
import ContentSections from '@/components/ContentSections';
import SimplifiedTestimonials from '@/components/SimplifiedTestimonials';
import CallToActionSection from '@/components/CallToActionSection';
import { SafeLink as Link } from '@/components/client-wrappers/DynamicClientImports';
import EnhancedSEO from '@/components/seo/EnhancedSEO';
import StructuredData from '@/components/seo/StructuredData';
import ReadProgress from '@/components/seo/ReadProgress';
import Breadcrumbs from '@/components/ui/breadcrumbs';

// Dynamically import EnhancedHero without SSR
const EnhancedHero = dynamic(
  () => import('@/components/EnhancedHero'),
  { ssr: false }
);

export default function HomeClient() {
  return (
    <>
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
        <ReadProgress 
          position="top" 
          height={3} 
          threshold={50} 
          color="#3b82f6"
        />
        <Breadcrumbs 
          items={[{ label: 'Home', href: '/' }]} 
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
