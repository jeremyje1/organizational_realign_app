import ModernPricing from '@/components/modern/ModernPricing';
import EnhancedFooter from '@/components/EnhancedFooter';
import { PageWrapper } from '@/components/ui/page-wrapper';
import { PagesBackground } from '@/components/ui/pages-background';

export default function PricingPage() {
  return (
    <PagesBackground>
      <PageWrapper>
        <main>
          <ModernPricing />
        </main>
        <EnhancedFooter />
      </PageWrapper>
    </PagesBackground>
  );
}
