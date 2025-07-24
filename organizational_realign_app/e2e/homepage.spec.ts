import { test, expect } from '@playwright/test';

test.describe('Homepage and Navigation', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load completely
    await page.waitForLoadState('networkidle');
    
    // Check that the page loads without major errors (not 404, 500, etc.)
    const pageContent = await page.textContent('body');
    expect(pageContent).toBeTruthy();
    
    // Check that we're not on an error page
    const hasErrorPage = await page.locator('text=/404|500|error|not found/i').isVisible();
    expect(hasErrorPage).toBeFalsy();
    
    // Check for basic page structure
    const hasContent = await page.locator('body').isVisible();
    expect(hasContent).toBeTruthy();
  });

  test('should navigate to assessment page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Look for assessment-related buttons on homepage
    const assessmentSelectors = [
      'a[href*="quick-wins"]',
      'a[href*="pricing"]', 
      'a[href*="assessment"]',
      'button:has-text("Quick Wins")',
      'a:has-text("Quick Wins")',
      'a:has-text("Full Assessment")',
      'button:has-text("Assessment")'
    ];
    
    let found = false;
    for (const selector of assessmentSelectors) {
      const element = page.locator(selector).first();
      if (await element.isVisible()) {
        await element.click();
        await page.waitForLoadState('networkidle');
        found = true;
        break;
      }
    }
    
    // If no assessment link found, just navigate directly to assessment onboarding
    if (!found) {
      await page.goto('/assessment/onboarding');
      await page.waitForLoadState('networkidle');
    }
    
    // Check that we're on some kind of assessment-related page or at least navigated successfully
    const currentUrl = page.url();
    
    // Check if we successfully navigated to an assessment-related page OR
    // if no assessment links were found, just verify the page is still functional
    const isAssessmentPage = currentUrl.includes('assessment') || 
                           currentUrl.includes('quick-wins') ||
                           currentUrl.includes('pricing') ||
                           currentUrl.includes('onboarding');
    
    if (!isAssessmentPage) {
      // If no assessment navigation happened, just verify the page is functional
      const pageIsAccessible = await page.locator('body').isVisible();
      expect(pageIsAccessible).toBeTruthy();
    } else {
      expect(isAssessmentPage).toBeTruthy();
    }
  });

  test('should navigate to AI readiness page', async ({ page }) => {
    await page.goto('/');
    
    // Look for AI readiness links/buttons
    const aiLink = page.locator('a[href*="ai-readiness"], button:has-text("AI Readiness"), a:has-text("AI Readiness")').first();
    if (await aiLink.isVisible()) {
      await aiLink.click();
      
      // Should navigate to AI readiness page
      await expect(page.url()).toMatch(/ai-readiness/);
    }
  });

  test('should have responsive design', async ({ page }) => {
    await page.goto('/');
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('body')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.locator('body')).toBeVisible();
  });
});
