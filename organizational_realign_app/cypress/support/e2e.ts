// cypress/support/e2e.ts
import './commands'

// Hide fetch/XHR requests in command log
Cypress.on('window:before:load', (win) => {
  const originalFetch = win.fetch
  win.fetch = (...args) => {
    const url = args[0]
    if (typeof url === 'string' && (url.includes('/api/') || url.includes('/_next/'))) {
      // Don't log API calls in Cypress command log
      return originalFetch.apply(win, args)
    }
    return originalFetch.apply(win, args)
  }
})

// Ensure Cypress doesn't fail on uncaught exceptions from the app
Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false here prevents Cypress from failing the test
  // on uncaught exceptions that might come from third-party libraries
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false
  }
  if (err.message.includes('Non-Error promise rejection captured')) {
    return false
  }
  return true
})
