import { test, expect } from '@playwright/test';

test.describe('Navigation functionality', () => {
  test('should load the navigation without JavaScript errors', async ({ page }) => {
    // Create a promise that will resolve if a page error occurs
    const errorPromise = new Promise<Error>((resolve) => {
      page.on('pageerror', (error) => resolve(error));
    });
    
    // Add a race condition - either the page loads or an error occurs
    const result = await Promise.race([
      page.goto('/'),
      errorPromise.then(error => {
        // If an error is caught, return the error to fail the test
        return error;
      })
    ]);
    
    // If the result is an error, the test should fail
    if (result instanceof Error) {
      throw new Error(`JavaScript error: ${result.message}`);
    }
    
    // Check that the header exists and is visible
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Check that we can find the title on the page
    const title = await page.title();
    expect(title).toContain('NorthPath');
  });
});
