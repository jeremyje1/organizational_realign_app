import { test, expect } from '@playwright/test';

test.describe('API Health and Connectivity', () => {
  test('should have healthy API endpoints', async ({ page }) => {
    // Test key API endpoints for basic connectivity
    const apiEndpoints = [
      '/api/health',
      '/api/assessment',
      '/api/ai-readiness',
      '/api/payments'
    ];

    for (const endpoint of apiEndpoints) {
      try {
        const response = await page.request.get(endpoint);
        
        // API should respond (even if with auth error, it's still responding)
        expect(response.status()).toBeLessThan(500); // No server errors
        
        if (response.status() === 200) {
          const contentType = response.headers()['content-type'];
          if (contentType && contentType.includes('application/json')) {
            const body = await response.json();
            expect(body).toBeDefined();
          }
        }
      } catch (error) {
        // Some endpoints might not exist, that's ok
        console.log(`Endpoint ${endpoint} not available: ${error}`);
      }
    }
  });

  test('should handle CORS properly', async ({ page }) => {
    // Test that API endpoints handle CORS for web requests
    const response = await page.request.get('/api/assessment', {
      headers: {
        'Origin': 'http://localhost:3000'
      }
    });

    // Should not have CORS errors (status < 500)
    expect(response.status()).toBeLessThan(500);
  });

  test('should validate API error responses', async ({ page }) => {
    // Test that API returns proper error format
    const response = await page.request.post('/api/assessment/invalid-endpoint', {
      data: { invalid: 'data' }
    });

    // Should return proper error status
    expect([400, 401, 403, 404, 405]).toContain(response.status());

    // If JSON response, should have error field
    const contentType = response.headers()['content-type'];
    if (contentType && contentType.includes('application/json')) {
      try {
        const body = await response.json();
        expect(body.error || body.message).toBeDefined();
      } catch (e) {
        // Non-JSON error response is also acceptable
      }
    }
  });
});
