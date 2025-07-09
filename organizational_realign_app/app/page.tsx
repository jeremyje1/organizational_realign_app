import EnhancedFooter from '@/components/EnhancedFooter';
import HomeClient from '@/components/HomeClient';
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

export default function RootPageWrapper() {
  return <HomeClient />;
}