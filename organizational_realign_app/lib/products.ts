export const ASSESSMENT_PRODUCTS = [
  {
    id: 'basic-assessment',
    name: 'Basic Assessment',
    description: 'Essential assessment for small teams',
    features: [
      'Core assessment modules',
      'Basic reporting',
      'Email support',
      'Single user access'
    ],
    price: 99,
    recommended: false
  },
  {
    id: 'standard-assessment',
    name: 'Standard Assessment',
    description: 'Complete assessment for growing organizations',
    features: [
      'All Basic features',
      'Detailed AI analysis',
      'Action plan generation',
      'Up to 5 team members',
      'Priority support'
    ],
    price: 249,
    recommended: true
  },
  {
    id: 'premium-assessment',
    name: 'Premium Assessment',
    description: 'Advanced assessment with consultative support',
    features: [
      'All Standard features',
      'Advanced data visualization',
      'Unlimited team members',
      'Dedicated support',
      'Quarterly reassessments',
      'Executive summary'
    ],
    price: 499,
    recommended: false
  }
];
