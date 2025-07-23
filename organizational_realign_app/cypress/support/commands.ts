// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>
      uploadFixtures(): Chainable<void>
      createScenario(name: string): Chainable<void>
    }
  }
}

// Custom command to log in to the application
Cypress.Commands.add('login', () => {
  // Intercept NextAuth session calls
  cy.intercept('GET', '/api/auth/session', {
    statusCode: 200,
    body: {
      user: {
        id: 'test-user',
        email: 'test@example.com',
        name: 'Test User'
      },
      tier: 'enterprise',
      expires: new Date(Date.now() + 86400000).toISOString()
    }
  }).as('getSession')

  // Set session cookie
  cy.setCookie('next-auth.session-token', 'mock-session-token')
  
  // Set localStorage to simulate logged in state
  cy.window().then((win) => {
    win.localStorage.setItem('user', JSON.stringify({
      id: 'test-user',
      email: 'test@example.com',
      name: 'Test User',
      tier: 'enterprise'
    }))
  })
})

// Custom command to upload test fixtures
Cypress.Commands.add('uploadFixtures', () => {
  // Mock successful upload response directly without visiting upload page
  cy.intercept('POST', '/api/upload', {
    statusCode: 200,
    body: {
      success: true,
      data: {
        positions: [
          {
            id: 'pos1',
            title: 'Manager',
            department: 'Engineering',
            salary: 90000,
            reports: 5
          },
          {
            id: 'pos2',
            title: 'Developer',
            department: 'Engineering',
            salary: 75000,
            reports: 0
          }
        ],
        orgUnits: [
          {
            id: 'eng',
            name: 'Engineering',
            parentId: null,
            headCount: 25,
            budget: 2500000
          }
        ]
      }
    }
  }).as('uploadData')

  // Set localStorage to simulate uploaded data
  cy.window().then((win) => {
    win.localStorage.setItem('organizationData', JSON.stringify({
      positions: [
        {
          id: 'pos1',
          title: 'Manager',
          department: 'Engineering',
          salary: 90000,
          reports: 5
        },
        {
          id: 'pos2',
          title: 'Developer',
          department: 'Engineering',
          salary: 75000,
          reports: 0
        }
      ],
      orgUnits: [
        {
          id: 'eng',
          name: 'Engineering',
          parentId: null,
          headCount: 25,
          budget: 2500000
        }
      ],
      uploadedAt: new Date().toISOString()
    }))
  })
})

// Custom command to create a scenario
Cypress.Commands.add('createScenario', (name: string) => {
  // Mock scenario creation response
  cy.intercept('POST', '/api/scenarios', {
    statusCode: 200,
    body: {
      id: 'scenario-123',
      name: name,
      description: 'Test scenario',
      createdAt: new Date().toISOString(),
      currentState: {
        totalCost: 2500000,
        headCount: 25,
        departments: ['Engineering']
      },
      proposedState: {
        totalCost: 2200000,
        headCount: 22,
        departments: ['Engineering']
      },
      savings: {
        total: 300000,
        percentage: 12
      }
    }
  }).as('createScenario')

  // Click create scenario button
  cy.get('[data-testid="create-scenario"]').click()
  
  // Fill in scenario details
  cy.get('[data-testid="scenario-name-input"]').type(name)
  cy.get('[data-testid="scenario-description"]').type('Automated test scenario')
  
  // Configure scenario parameters
  cy.get('[data-testid="optimization-type"]').select('balanced')
  cy.get('[data-testid="target-reduction"]').type('10')
  
  // Submit scenario creation
  cy.get('[data-testid="create-scenario-submit"]').click()
  
  // Wait for scenario to be created
  cy.wait('@createScenario')
})

export {}
