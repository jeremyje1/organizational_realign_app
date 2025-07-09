/**
 * Contact Page - Professional Contact Information and CTAs
 */
import React from 'react';
import { Metadata } from 'next';
import ImprovedModernContact from '@/components/modern/ImprovedModernContact';
import EnhancedFooter from '@/components/EnhancedFooter';
import { PageWrapper } from '@/components/ui/page-wrapper';

export const metadata: Metadata = {
  title: 'Contact - NorthPath Strategies',
  description: 'Get in touch with NorthPath Strategies. Schedule a consultation, start your assessment, or contact Jeremy Estrella directly for strategic consulting.',
  keywords: [
    'contact northpath strategies',
    'schedule consultation',
    'jeremy estrella contact',
    'strategic consulting contact',
    'organizational assessment',
    'business consulting contact'
  ],
};

export default function ContactPage() {
  return (
    <PageWrapper>
      <main>
        <ImprovedModernContact />
      </main>
      <EnhancedFooter />
    </PageWrapper>
  );
}
