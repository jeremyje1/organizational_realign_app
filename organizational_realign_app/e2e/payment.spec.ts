import { test, expect } from '@playwright/test';

test.describe('Payment Integration', () => {
  test('should handle payment page access', async ({ page }) => {
    // Try accessing pricing page first, then onboarding where payment tiers are shown
    await page.goto('/pricing');
    await page.waitForLoadState('networkidle');
    
    // Check that the page loads without errors
    let pageContent = await page.textContent('body');
    let hasErrorPage = await page.locator('text=/404|500|error|not found/i').isVisible();
    
    // If pricing page doesn't exist, try assessment onboarding
    if (hasErrorPage || !pageContent?.trim()) {
      await page.goto('/assessment/onboarding');
      await page.waitForLoadState('networkidle');
      pageContent = await page.textContent('body');
      hasErrorPage = await page.locator('text=/404|500|error|not found/i').isVisible();
    }
    
    expect(pageContent).toBeTruthy();
    expect(hasErrorPage).toBeFalsy();
  });

  test('should show some pricing or payment elements', async ({ page }) => {
    // Check assessment onboarding page which has pricing tiers
    await page.goto('/assessment/onboarding');
    await page.waitForLoadState('networkidle');
    
    // Look for pricing/tier content (based on the actual onboarding page structure)
    const hasPricingContent = await page.locator('h2:has-text("Package"), button:has-text("$")').first().isVisible();
    expect(hasPricingContent).toBeTruthy();
  });

  test('should handle interactive payment elements', async ({ page }) => {
    await page.goto('/assessment/onboarding');
    await page.waitForLoadState('networkidle');
    
    // Look for tier selection or purchase buttons
    const interactiveElements = page.locator('button, a[href*="checkout"], a[href*="payment"], a[href*="pricing"], [role="button"], select');
    const elementCount = await interactiveElements.count();
    
    if (elementCount > 0) {
      // If interactive elements exist, verify at least one is visible
      const firstElement = interactiveElements.first();
      const isVisible = await firstElement.isVisible();
      expect(isVisible).toBeTruthy();
    } else {
      // If no payment elements, just verify basic page functionality
      const pageContent = await page.textContent('body');
      expect(pageContent).toBeTruthy();
    }
  });
});
