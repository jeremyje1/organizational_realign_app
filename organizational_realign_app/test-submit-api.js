// Simple test script to test the assessment submit API directly
const testAssessmentSubmit = async () => {
  const testData = {
    tier: 'enterprise-transformation',
    organizationType: 'government',
    institutionName: 'Test Government Agency',
    contactEmail: 'test@example.com',
    contactName: 'Test User',
    userId: 'test-user-123',
    responses: {
      leadership_vision_likert: 4,
      communication_effectiveness_likert: 3,
      public_satisfaction_likert: 3,
      budget_utilization_likert: 4,
      service_delivery_likert: 4
    },
    uploadedFiles: [],
    testMode: true
  };

  try {
    console.log('Testing assessment submit API...');
    console.log('Test data:', JSON.stringify(testData, null, 2));

    const response = await fetch('https://organizational-realign-e9q73nzn6-jeremys-projects-73929cad.vercel.app/api/assessment/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log('Raw response:', responseText.substring(0, 1000));

    if (response.ok) {
      try {
        const result = JSON.parse(responseText);
        console.log('✅ Success:', result);
      } catch (e) {
        console.log('✅ Success but non-JSON response:', responseText);
      }
    } else {
      console.log('❌ Error:', response.status, responseText);
    }

  } catch (error) {
    console.error('❌ Network error:', error);
  }
};

// Run the test
testAssessmentSubmit();
