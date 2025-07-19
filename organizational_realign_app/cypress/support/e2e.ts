// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.ts using ES2015 syntax:
import './commands'

// Configure Cypress
Cypress.on('uncaught:exception', (err, _runnable) => {
  // Returning false here prevents Cypress from failing the test
  // on uncaught exceptions that might occur during navigation
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false
  }
  if (err.message.includes('Non-Error promise rejection captured')) {
    return false
  }
  return true
})

// Global before hook for all tests
beforeEach(() => {
  // Clear any existing data
  cy.clearCookies()
  cy.clearLocalStorage()
  
  // Set up common intercepts
  cy.intercept('GET', '/api/auth/csrf', {
    statusCode: 200,
    body: { csrfToken: 'mock-csrf-token' }
  })
  
  // Mock health check endpoints
  cy.intercept('GET', '/api/health', {
    statusCode: 200,
    body: { status: 'ok' }
  })
})

// Configure viewport for consistent testing
Cypress.config('viewportWidth', 1280)
Cypress.config('viewportHeight', 720)
