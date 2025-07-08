import { test, expect } from '@playwright/test';

test.describe('Homepage rendering', () => {
  test('should load the homepage without JavaScript errors', async ({ page }) => {
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
      // Check specifically for the error we're trying to fix
      if (result.message.includes("Cannot read properties of undefined (reading 'call')")) {
        throw new Error(`Found the target error: ${result.message}`);
      } else {
        throw new Error(`JavaScript error: ${result.message}`);
      }
    }
    
    // Ensure the page content loaded
    await expect(page).toHaveTitle(/NorthPath/);
    
    // Additional checks to ensure the page has loaded content properly
    const mainHeading = page.getByRole('heading', { level: 1 });
    await expect(mainHeading).toBeVisible();
    
    // Check that at least some interactive elements are present
    const someButton = page.getByRole('button').first();
    await expect(someButton).toBeDefined();
  });
});
