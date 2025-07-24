import { test, expect } from '@playwright/test';

test.describe('Organizational Assessment Flow', () => {
  test('should display assessment landing page', async ({ page }) => {
    // Go to assessment onboarding page directly since /assessment redirects
    await page.goto('/assessment/onboarding');
    await page.waitForLoadState('networkidle');
    
    // Check that the page loads without errors
    const pageContent = await page.textContent('body');
    expect(pageContent).toBeTruthy();
    
    // Check that we're not on an error page
    const hasErrorPage = await page.locator('text=/404|500|error|not found/i').isVisible();
    expect(hasErrorPage).toBeFalsy();
    
    // Look for assessment-related content (based on actual page content)
    const hasAssessmentContent = await page.locator('h1:has-text("Diagnostic"), h2:has-text("Package")').first().isVisible();
    expect(hasAssessmentContent).toBeTruthy();
  });

  test('should show some form of assessment interface', async ({ page }) => {
    await page.goto('/assessment/onboarding');
    await page.waitForLoadState('networkidle');
    
    // Look for pricing tiers or selection interface (based on actual onboarding page)
    const hasTierSelection = await page.locator('h2:has-text("Selected Package"), button[class*="NorthPath"]').first().isVisible();
    expect(hasTierSelection).toBeTruthy();
    
    // Look for any interactive elements
    const hasInteractiveContent = await page.locator('button:has-text("Diagnostic")').first().isVisible();
    expect(hasInteractiveContent).toBeTruthy();
  });

  test('should display pricing information', async ({ page }) => {
    await page.goto('/assessment/onboarding');
    await page.waitForLoadState('networkidle');
    
    // Look for pricing or tier information (which should be on the onboarding page)
    const hasPricingContent = await page.locator('h3:has-text("Diagnostic"), button:has-text("$")').first().isVisible();
    expect(hasPricingContent).toBeTruthy();
  });
});
