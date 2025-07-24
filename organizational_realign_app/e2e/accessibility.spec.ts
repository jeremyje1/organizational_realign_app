import { test, expect } from '@playwright/test';

test.describe('Accessibility and Performance', () => {
  test('should meet basic accessibility requirements', async ({ page }) => {
    await page.goto('/');

    // Check for basic accessibility elements
    await expect(page.locator('html[lang]')).toBeVisible(); // Language attribute
    
    // Check for headings hierarchy
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1); // Should have at least one h1
    
    // Check for alt text on images
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const hasAlt = await img.getAttribute('alt') !== null;
        const hasAriaLabel = await img.getAttribute('aria-label') !== null;
        const isDecorative = await img.getAttribute('role') === 'presentation';
        
        // Images should have alt text, aria-label, or be marked as decorative
        expect(hasAlt || hasAriaLabel || isDecorative).toBeTruthy();
      }
    }
    
    // Check for form labels
    const inputs = page.locator('input[type="text"], input[type="email"], input[type="password"], textarea');
    const inputCount = await inputs.count();
    
    if (inputCount > 0) {
      for (let i = 0; i < inputCount; i++) {
        const input = inputs.nth(i);
        const hasLabel = await page.locator(`label[for="${await input.getAttribute('id')}"]`).isVisible();
        const hasAriaLabel = await input.getAttribute('aria-label') !== null;
        const hasAriaLabelledBy = await input.getAttribute('aria-labelledby') !== null;
        
        // Inputs should be properly labeled
        expect(hasLabel || hasAriaLabel || hasAriaLabelledBy).toBeTruthy();
      }
    }
  });

  test('should have reasonable page load performance', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Page should load within reasonable time (5 seconds)
    expect(loadTime).toBeLessThan(5000);
    
    // Check for key performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
      };
    });
    
    // Basic performance expectations
    expect(performanceMetrics.domContentLoaded).toBeLessThan(2000); // 2 seconds
    expect(performanceMetrics.loadComplete).toBeLessThan(3000); // 3 seconds
  });

  test('should handle slow network conditions', async ({ page }) => {
    // Simulate slow 3G network
    await page.route('**/*', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 100)); // Add 100ms delay
      await route.continue();
    });

    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;
    
    // Should still load within reasonable time even with network delay
    expect(loadTime).toBeLessThan(10000); // 10 seconds with simulated delay
    
    // Key content should still be visible
    await expect(page.locator('body')).toBeVisible();
  });

  test('should work with keyboard navigation', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Test that the page is keyboard accessible by checking for focusable elements
    const focusableElements = await page.locator('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])').count();
    expect(focusableElements).toBeGreaterThan(0);
    
    // Test basic tab navigation
    await page.keyboard.press('Tab');
    
    // Check if any element received focus (some elements might be visible)
    const focusedElement = page.locator(':focus');
    const hasFocusedElement = await focusedElement.count() > 0;
    
    if (hasFocusedElement) {
      // If an element is focused, verify it's visible and interactive
      await expect(focusedElement.first()).toBeVisible();
    } else {
      // If no focus detected, at least verify the page has interactive elements
      const interactiveElements = await page.locator('button, a, input').count();
      expect(interactiveElements).toBeGreaterThan(0);
    }
  });
});
