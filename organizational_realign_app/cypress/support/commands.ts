// cypress/support/commands.ts

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to set up authentication session
       */
      loginUser(email?: string): Chainable<void>
      
      /**
       * Custom command to fill assessment step
       */
      fillAssessmentStep(stepData: Record<string, any>): Chainable<void>
      
      /**
       * Custom command to check accessibility
       */
      checkA11y(): Chainable<void>
    }
  }
}

Cypress.Commands.add('loginUser', (email = 'test@example.com') => {
  // Mock authentication session
  cy.window().then((win) => {
    win.localStorage.setItem('user-session', JSON.stringify({
      user: { email, id: 'test-user-id' },
      expires: new Date(Date.now() + 86400000).toISOString()
    }))
  })
})

Cypress.Commands.add('fillAssessmentStep', (stepData) => {
  Object.entries(stepData).forEach(([key, value]) => {
    // Handle different input types
    if (typeof value === 'boolean') {
      cy.get(`[data-testid="${key}"]`).check()
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        cy.get(`[data-testid="${key}"]`).select(item)
      })
    } else {
      cy.get(`[data-testid="${key}"]`).type(value.toString())
    }
  })
})

Cypress.Commands.add('checkA11y', () => {
  // Basic accessibility checks
  cy.get('main').should('exist')
  cy.get('h1').should('exist')
  
  // Check for proper heading hierarchy
  cy.get('h1, h2, h3, h4, h5, h6').each(($heading) => {
    cy.wrap($heading).should('be.visible')
  })
  
  // Check for alt text on images
  cy.get('img').each(($img) => {
    cy.wrap($img).should('have.attr', 'alt')
  })
  
  // Check for aria-labels on buttons
  cy.get('button').each(($button) => {
    const hasText = $button.text().trim().length > 0
    const hasAriaLabel = $button.attr('aria-label')
    expect(hasText || hasAriaLabel).to.be.true
  })
})

export {}
