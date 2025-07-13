# Cypress E2E Testing for Scenario Engine

This document describes the Cypress end-to-end testing setup for the organizational alignment application's scenario engine functionality.

## Overview

The Cypress test suite validates the scenario engine's core functionality including:

- Scenario creation and management
- Navigation between scenario views
- Application structure validation
- Error handling and edge cases

## Test Structure

### Test Files

- `cypress/e2e/scenario-engine.cy.ts` - Main test suite for scenario functionality
- `cypress/support/commands.ts` - Custom commands for login, data mocking, and scenario operations
- `cypress/support/e2e.ts` - Global configuration and setup
- `cypress/fixtures/test-data.json` - Test data fixtures

### Custom Commands

#### `cy.login()`

Mocks user authentication by:

- Setting up NextAuth session intercepts
- Creating session cookies
- Setting localStorage with user data

#### `cy.uploadFixtures()`

Simulates data upload by:

- Mocking API responses for upload endpoints
- Setting localStorage with organization data
- Preparing test data for scenario creation

### Test Cases

#### 1. Creates and Compares Scenarios

- Validates scenario creation workflow
- Tests API integration with mocked responses
- Verifies page navigation and routing

#### 2. Navigates to Existing Scenario Page

- Tests direct navigation to scenario detail pages
- Handles both existing and non-existing scenarios
- Validates page structure and elements

#### 3. Handles Navigation to Scenarios

- Tests navigation from home page to scenario sections
- Validates application routing structure
- Ensures proper URL handling

#### 4. Validates Basic Application Structure

- Verifies fundamental application elements
- Tests HTML structure and accessibility
- Ensures proper page rendering

## Configuration

### Cypress Config (`cypress.config.ts`)

```typescript
export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, _config) {
      // Event handlers
    },
  },
});
```

### Key Features

- **Mocked Authentication**: Uses intercepted API calls instead of real auth
- **Data Simulation**: LocalStorage and API mocking for test data
- **Flexible Assertions**: Tests adapt to actual DOM structure
- **Error Tolerance**: Graceful handling of missing elements

## Running Tests

### Prerequisites

1. Development server must be running (`npm run dev`)
2. All dependencies installed (`npm install`)

### Commands

```bash
# Run all tests headlessly
npx cypress run

# Run specific test file
npx cypress run --spec "cypress/e2e/scenario-engine.cy.ts"

# Open Cypress UI for interactive testing
npx cypress open

# Run tests with browser visible
npx cypress run --headed
```

## Test Data

The test suite uses mocked data including:

- Sample positions with titles, departments, and salaries
- Organization units with hierarchy and budget information
- Scenario configurations with current/proposed states
- Financial calculations and savings projections

## Mocking Strategy

### API Interception

```typescript
cy.intercept("POST", "/api/scenarios", {
  statusCode: 200,
  body: {
    /* mocked response */
  },
}).as("createScenario");
```

### LocalStorage Simulation

```typescript
cy.window().then((win) => {
  win.localStorage.setItem("organizationData", JSON.stringify(testData));
});
```

## Best Practices

1. **Resilient Selectors**: Tests use flexible selectors that adapt to UI changes
2. **Conditional Testing**: Tests check for element existence before interaction
3. **Mocked Dependencies**: External services and APIs are mocked for reliability
4. **Descriptive Logging**: Tests include logging for debugging failed assertions

## Continuous Integration

The test suite is designed to run in CI/CD environments with:

- Headless browser execution
- Screenshot capture on failures
- Configurable timeouts and retries
- Environment-specific base URLs

## Troubleshooting

### Common Issues

1. **Session Timeouts**: If login tests fail, check session mock configuration
2. **Missing Elements**: Tests use conditional logic to handle UI variations
3. **API Timeouts**: Increase timeout values in cypress.config.ts if needed
4. **Port Conflicts**: Ensure development server runs on expected port (3000)

### Debug Mode

Run tests with `--headed` flag to see browser interactions in real-time.

## Future Enhancements

Potential improvements to the test suite:

- Visual regression testing with percy.io
- Performance testing with Lighthouse integration
- Cross-browser testing configuration
- Database seeding for more realistic test scenarios
- Advanced user interaction workflows
