const https = require('https');

const options = {
  hostname: 'app.northpathstrategies.org',
  path: '/api/admin/assessments/list',
  method: 'GET',
  headers: {
    'Authorization': 'Bearer admin-token stardynamics1124*',
    'Content-Type': 'application/json'
  }
};

console.log('🔍 Checking current assessments in database...\n');

const req = https.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      console.log('📊 ASSESSMENT DATABASE STATUS:');
      console.log('================================');
      console.log(`✅ API Response: ${res.statusCode}`);
      console.log(`📈 Total Assessments: ${result.count || 0}`);
      
      if (result.assessments && result.assessments.length > 0) {
        console.log('\n📋 RECENT ASSESSMENTS:');
        console.log('=====================');
        result.assessments.forEach((assessment, index) => {
          console.log(`${index + 1}. ID: ${assessment.id}`);
          console.log(`   Institution: ${assessment.institution_name}`);
          console.log(`   Email: ${assessment.contact_email}`);
          console.log(`   Tier: ${assessment.tier}`);
          console.log(`   Status: ${assessment.status}`);
          console.log(`   Created: ${assessment.created_at}`);
          console.log('');
        });
      } else {
        console.log('\n⚠️  NO ASSESSMENTS FOUND');
        console.log('=======================');
        console.log('This could mean:');
        console.log('• TEST 1 was not submitted successfully');
        console.log('• Assessment submission failed');
        console.log('• Database connection issues');
        console.log('• API authentication problems');
      }
      
    } catch (error) {
      console.log('❌ ERROR parsing response:', error.message);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (error) => {
  console.log('❌ REQUEST ERROR:', error.message);
});

req.end();
