const React = require('react');
const { render } = require('@testing-library/react');
const { axe, toHaveNoViolations } = require('jest-axe');
const { AssessmentWizard } = require('../../../components/wizard/AssessmentWizard');
const { NotificationProvider } = require('../../../components/ui/notification-system');

expect.extend(toHaveNoViolations);

describe('AssessmentWizard accessibility', () => {
  it('should have no basic accessibility violations', async () => {
    const { container } = render(
      React.createElement(NotificationProvider, {},
        React.createElement(AssessmentWizard, { 
          assessmentId: "test", 
          onComplete: () => {} 
        })
      )
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
