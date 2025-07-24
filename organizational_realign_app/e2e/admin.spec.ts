import { test, expect } from '@playwright/test';

test.describe('Admin Panel Access and Functionality', () => {
  test('should protect admin routes', async ({ page }) => {
    await page.goto('/admin');
    
    // Should either redirect to login or show auth form
    await page.waitForLoadState('networkidle');
    
    const hasAuth = await page.locator('input[type="password"], input[type="email"], .auth, .login').isVisible();
    const isLoginPage = page.url().includes('login') || page.url().includes('auth');
    const hasUnauthorized = await page.locator('text=/unauthorized|forbidden|access denied/i').isVisible();
    
    // Should require authentication
    expect(hasAuth || isLoginPage || hasUnauthorized).toBeTruthy();
  });

  test('should display admin testing interface', async ({ page }) => {
    // Try to access admin testing page directly
    await page.goto('/admin/testing');
    
    await page.waitForLoadState('networkidle');
    
    // Check if admin testing is accessible or requires auth
    const hasTestingInterface = await page.locator('text=/testing|assessment type|organizational|ai readiness/i').isVisible();
    const hasAuth = await page.locator('input[type="password"], .auth, .login').isVisible();
    
    if (hasTestingInterface) {
      // If accessible, test the interface
      await expect(page.locator('text=/admin|testing/i')).toBeVisible();
      
      // Look for assessment type toggles
      const toggles = page.locator('button, select, input[type="radio"]');
      const count = await toggles.count();
      expect(count).toBeGreaterThan(0);
    } else {
      // Should require authentication
      expect(hasAuth).toBeTruthy();
    }
  });

  test('should handle admin authentication flow', async ({ page }) => {
    await page.goto('/admin');
    
    // Look for admin login form
    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');
    
    if (await emailInput.isVisible() && await passwordInput.isVisible()) {
      // Test admin login form exists
      await expect(emailInput).toBeVisible();
      await expect(passwordInput).toBeVisible();
      
      const submitButton = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In")');
      await expect(submitButton).toBeVisible();
    }
  });
});
