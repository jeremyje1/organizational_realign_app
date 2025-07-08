// cypress/e2e/assessment-wizard.cy.ts
describe('Assessment Wizard End-to-End Tests', () => {
  beforeEach(() => {
    cy.loginUser()
    cy.visit('/assessment/start')
  })

  it('should load the assessment wizard', () => {
    cy.get('[data-testid="assessment-wizard"]').should('exist')
    cy.get('h1').should('contain', 'Assessment')
    cy.checkA11y()
  })

  it('should validate required fields on each step', () => {
    // Test step navigation without filling required fields
    cy.get('[data-testid="next-button"]').click()
    
    // Should show validation errors
    cy.get('[data-testid="validation-error"]').should('exist')
    cy.get('[role="alert"]').should('be.visible')
  })

  it('should auto-save progress with 3-second debounce', () => {
    // Fill in some data
    cy.get('[data-testid="organization-name"]').type('Test University')
    cy.get('[data-testid="organization-type"]').select('Higher Education')
    
    // Wait for auto-save (3 seconds + buffer)
    cy.wait(4000)
    
    // Check for auto-save indication
    cy.get('[aria-live="polite"]').should('contain', 'saved')
    
    // Reload page and verify data persists
    cy.reload()
    cy.get('[data-testid="organization-name"]').should('have.value', 'Test University')
  })

  it('should handle wizard navigation correctly', () => {
    // Fill first step
    cy.get('[data-testid="organization-name"]').type('Test University')
    cy.get('[data-testid="organization-type"]').select('Higher Education')
    cy.get('[data-testid="next-button"]').click()
    
    // Should be on step 2
    cy.get('[data-testid="step-indicator"]').should('contain', '2')
    cy.url().should('include', 'step=2')
    
    // Go back
    cy.get('[data-testid="back-button"]').click()
    cy.get('[data-testid="step-indicator"]').should('contain', '1')
    
    // Data should still be there
    cy.get('[data-testid="organization-name"]').should('have.value', 'Test University')
  })

  it('should show progress indicator correctly', () => {
    // Check initial progress
    cy.get('[data-testid="progress-bar"]').should('exist')
    cy.get('[data-testid="progress-percentage"]').should('contain', '0%')
    
    // Fill step and advance
    cy.get('[data-testid="organization-name"]').type('Test University')
    cy.get('[data-testid="organization-type"]').select('Higher Education')
    cy.get('[data-testid="next-button"]').click()
    
    // Progress should increase
    cy.get('[data-testid="progress-percentage"]').should('not.contain', '0%')
  })

  it('should handle branch logic correctly', () => {
    // Select organization type that triggers branch logic
    cy.get('[data-testid="organization-type"]').select('Higher Education')
    
    // Should show higher education specific questions
    cy.get('[data-testid="student-enrollment"]').should('exist')
    
    // Change to different type
    cy.get('[data-testid="organization-type"]').select('Corporate')
    
    // Higher ed questions should be hidden, corporate questions shown
    cy.get('[data-testid="student-enrollment"]').should('not.exist')
    cy.get('[data-testid="employee-count"]').should('exist')
  })

  it('should complete full assessment flow', () => {
    // Mock API responses
    cy.intercept('POST', '/api/assessments', { fixture: 'assessment-response.json' })
    cy.intercept('POST', '/api/assessments/*/submit', { fixture: 'submission-response.json' })
    
    // Fill all required steps
    fillAssessmentSteps()
    
    // Submit assessment
    cy.get('[data-testid="submit-button"]').click()
    
    // Should redirect to results
    cy.url().should('include', '/results')
    cy.get('[data-testid="assessment-results"]').should('exist')
  })

  it('should handle errors gracefully', () => {
    // Mock API failure
    cy.intercept('POST', '/api/assessments', { statusCode: 500 })
    
    // Try to save
    cy.get('[data-testid="organization-name"]').type('Test University')
    cy.wait(4000) // Wait for auto-save attempt
    
    // Should show error message
    cy.get('[data-testid="error-message"]').should('be.visible')
    cy.get('[role="alert"]').should('contain', 'error')
  })

  it('should be accessible throughout the flow', () => {
    // Check initial accessibility
    cy.checkA11y()
    
    // Navigate through steps and check accessibility
    cy.get('[data-testid="organization-name"]').type('Test University')
    cy.get('[data-testid="organization-type"]').select('Higher Education')
    cy.get('[data-testid="next-button"]').click()
    
    cy.checkA11y()
    
    // Check focus management
    cy.get('[data-testid="next-button"]').focus()
    cy.get('[data-testid="next-button"]').should('be.focused')
    
    // Check keyboard navigation
    cy.get('body').type('{tab}')
    cy.focused().should('have.attr', 'tabindex').and('not.equal', '-1')
  })

  function fillAssessmentSteps() {
    // Step 1: Organization Info
    cy.get('[data-testid="organization-name"]').type('Test University')
    cy.get('[data-testid="organization-type"]').select('Higher Education')
    cy.get('[data-testid="next-button"]').click()
    
    // Step 2: Demographics
    cy.get('[data-testid="student-enrollment"]').type('15000')
    cy.get('[data-testid="faculty-count"]').type('800')
    cy.get('[data-testid="next-button"]').click()
    
    // Step 3: Assessment Questions (sample)
    cy.get('[data-testid="question-1"]').click() // Assuming radio button
    cy.get('[data-testid="question-2"]').click()
    cy.get('[data-testid="next-button"]').click()
    
    // Continue for all steps...
    // (This would be expanded based on actual wizard structure)
  }
})

// Fixture data for mock responses
describe('Assessment Data Fixtures', () => {
  before(() => {
    // Create fixture files programmatically if they don't exist
    cy.writeFile('cypress/fixtures/assessment-response.json', {
      id: 'test-assessment-id',
      status: 'IN_PROGRESS',
      createdAt: new Date().toISOString()
    })
    
    cy.writeFile('cypress/fixtures/submission-response.json', {
      id: 'test-assessment-id',
      status: 'COMPLETED',
      results: {
        score: 0.75,
        tier: 'GROWING',
        sections: {}
      }
    })
  })
})
