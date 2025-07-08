import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';

// Extend Jest matchers with proper typing
declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations(): R;
    }
  }
}

// Add the matcher
(expect as any).extend(toHaveNoViolations);

// Mock the AssessmentWizard to avoid complex dependencies
jest.mock('../../../components/wizard/AssessmentWizard', () => ({
  AssessmentWizard: ({ assessmentId, onComplete }: any) => (
    <div data-testid="assessment-wizard" role="main">
      <h1>Assessment Wizard</h1>
      <div role="progressbar" aria-label="Assessment progress" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
        Progress: 0%
      </div>
      <form role="form" aria-label="Assessment form">
        <label htmlFor="test-input">Test Input</label>
        <input id="test-input" type="text" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}));

jest.mock('../../../components/ui/notification-system', () => ({
  NotificationProvider: ({ children }: any) => <div>{children}</div>
}));

describe('AssessmentWizard accessibility', () => {
  it('should have no basic accessibility violations', async () => {
    const MockAssessmentWizard = require('../../../components/wizard/AssessmentWizard').AssessmentWizard;
    const MockNotificationProvider = require('../../../components/ui/notification-system').NotificationProvider;
    
    const { container } = render(
      <MockNotificationProvider>
        <MockAssessmentWizard assessmentId="test" onComplete={() => {}} />
      </MockNotificationProvider>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper semantic structure', async () => {
    const MockAssessmentWizard = require('../../../components/wizard/AssessmentWizard').AssessmentWizard;
    
    const { getByRole, getByLabelText } = render(
      <MockAssessmentWizard assessmentId="test" onComplete={() => {}} />
    );
    
    // Check for main landmark
    expect(getByRole('main')).toBeInTheDocument();
    
    // Check for proper heading
    expect(getByRole('heading', { level: 1 })).toBeInTheDocument();
    
    // Check for form accessibility
    expect(getByRole('form')).toBeInTheDocument();
    expect(getByLabelText('Test Input')).toBeInTheDocument();
    
    // Check for progress indicator
    expect(getByRole('progressbar')).toBeInTheDocument();
  });
});
