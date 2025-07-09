/**
 * About Page - Company Information and Founder Bio
 */
import React from 'react';
import { Metadata } from 'next';
import EnhancedAbout from '@/components/EnhancedAbout';
import EnhancedFooter from '@/components/EnhancedFooter';
import { PageWrapper } from '@/components/ui/page-wrapper';

export const metadata: Metadata = {
  title: 'About - NorthPath Strategies',
  description: 'Learn about NorthPath Strategies, our mission, approach, and founder Jeremy Estrella. Discover how we combine strategic expertise with AI-powered technology.',
  keywords: [
    'about northpath strategies',
    'jeremy estrella',
    'strategic consulting company',
    'organizational transformation',
    'company history',
    'consulting expertise'
  ],
};

export default function AboutPage() {
  return (
    <PageWrapper>
      <main>
        <EnhancedAbout />
      </main>
      <EnhancedFooter />
    </PageWrapper>
  );
}
