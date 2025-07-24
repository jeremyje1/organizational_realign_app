/**
 * Test script to create a sample AI readiness assessment
 */
const testAIReadinessAssessment = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/ai-readiness/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        responses: {
          q1: "We have a basic AI policy in place",
          q2: "Our team is moderately prepared for AI implementation",
          q3: "We use some AI tools occasionally"
        },
        tier: 'ai-readiness-basic',
        industry: 'Technology',
        institutionName: 'Test Organization',
        contactEmail: 'test@example.com',
        contactName: 'Test User',
        testMode: true
      })
    });

    const result = await response.json();
    console.log('AI Readiness assessment created:', result);
  } catch (error) {
    console.error('Error creating test assessment:', error);
  }
};

testAIReadinessAssessment();
