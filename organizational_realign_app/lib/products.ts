export const ASSESSMENT_PRODUCTS = [
  {
    id: 'one-time-diagnostic',
    name: 'One‑Time Diagnostic',
    description: 'Ideal for a single‑campus college, small hospital unit, or departmental pilot.',
    tagline: 'Best for Pilots',
    features: [
      '100‑item survey + secure file upload',
      '12‑page PDF executive brief',
      'OCI / HOCI / JCI scores',
      '30‑min Q&A call with analyst',
      'One‑Click Org‑Chart + 3 cost scenarios'
    ],
    price: 4995,
    recommended: false,
    stripeUrl: 'https://organizational-realign-app.vercel.app/api/stripe/create-tier-checkout?tier=one-time-diagnostic'
  },
  {
    id: 'monthly-subscription',
    name: 'Monthly Subscription',
    description: 'For programs or departments that refine operations every term.',
    tagline: 'Iteration Friendly',
    features: [
      'Unlimited assessments each month',
      'CSV dashboard refreshes',
      '60‑min office‑hours call / month',
      'One‑Click Org‑Chart + 3 cost scenarios',
      'Cancel or upgrade anytime'
    ],
    price: 2995,
    isMonthly: true,
    recommended: true,
    stripeUrl: 'https://organizational-realign-app.vercel.app/api/stripe/create-tier-checkout?tier=monthly-subscription'
  },
  {
    id: 'comprehensive-package',
    name: 'Comprehensive Package',
    description: 'For mid‑sized institutions needing a narrative report and deep scenario work.',
    tagline: 'Board‑Ready',
    features: [
      'Everything in Monthly tier',
      'One‑Click Org‑Chart + 3 cost scenarios',
      '25–30 page board‑ready report',
      '90‑min strategy session'
    ],
    price: 9900,
    recommended: false,
    stripeUrl: 'https://organizational-realign-app.vercel.app/api/stripe/create-tier-checkout?tier=comprehensive-package'
  },
  {
    id: 'enterprise-transformation',
    name: 'Enterprise Transformation',
    description: 'Designed for multi‑campus systems, hospital networks, or public agencies.',
    tagline: 'System‑Wide',
    features: [
      'Everything in Comprehensive tier',
      'One‑Click Org‑Chart + 3 cost scenarios',
      'Unlimited scenarios & API export',
      'Power BI embedded dashboard + API connectors',
      'On‑site facilitation & quarterly audits'
    ],
    price: 24000,
    recommended: false,
    stripeUrl: 'https://organizational-realign-app.vercel.app/api/stripe/create-tier-checkout?tier=enterprise-transformation'
  }
];
