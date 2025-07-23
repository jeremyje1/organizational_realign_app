// AI Report Reliability Monitor
// Add this to your monitoring/alerting system

export interface ReportGenerationMetrics {
  timestamp: string;
  success: boolean;
  reportType: 'enhanced-ai' | 'standard-ai' | 'fallback';
  fileSize: number;
  processingTime: number;
  error?: string;
  clientImpact: 'none' | 'minor' | 'major';
}

export class AIReportMonitor {
  private static metrics: ReportGenerationMetrics[] = [];
  
  static trackReportGeneration(metrics: ReportGenerationMetrics) {
    this.metrics.push(metrics);
    
    // Alert on fallback usage
    if (metrics.reportType === 'fallback') {
      this.alertFallbackUsed(metrics);
    }
    
    // Alert on high failure rate
    this.checkFailureRate();
  }
  
  private static alertFallbackUsed(metrics: ReportGenerationMetrics) {
    console.error('🚨 CRITICAL CLIENT IMPACT: Fallback report delivered!');
    console.error('📊 Report Quality Impact:');
    console.error(`   - Client received: ${Math.round(metrics.fileSize/1024)}KB report`);
    console.error(`   - Should have received: ~700KB AI-enhanced report`);
    console.error(`   - Quality reduction: ~93% less content`);
    console.error(`   - Error: ${metrics.error}`);
    
    // In production, send to your alerting system (Slack, email, etc.)
    this.sendCriticalAlert(metrics);
  }
  
  private static checkFailureRate() {
    const recent = this.metrics.slice(-10); // Last 10 reports
    const fallbackCount = recent.filter(m => m.reportType === 'fallback').length;
    const failureRate = fallbackCount / recent.length;
    
    if (failureRate > 0.1) { // More than 10% fallback rate
      console.error(`🚨 HIGH FALLBACK RATE: ${Math.round(failureRate * 100)}% of recent reports are fallbacks`);
      console.error('💡 Check OpenAI API status, billing, and quota limits');
    }
  }
  
  private static sendCriticalAlert(metrics: ReportGenerationMetrics) {
    // Integrate with your alerting system
    // Example implementations:
    
    // Slack webhook
    // fetch('YOUR_SLACK_WEBHOOK', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     text: `🚨 Client received fallback report (${Math.round(metrics.fileSize/1024)}KB instead of ~700KB AI report)`
    //   })
    // });
    
    // Email alert
    // sendEmail({
    //   to: 'admin@yourdomain.com',
    //   subject: 'URGENT: Client received fallback report',
    //   body: `Error: ${metrics.error}\nImpact: Major quality reduction`
    // });
  }
  
  static getReliabilityStats() {
    const total = this.metrics.length;
    const enhanced = this.metrics.filter(m => m.reportType === 'enhanced-ai').length;
    const fallback = this.metrics.filter(m => m.reportType === 'fallback').length;
    
    return {
      totalReports: total,
      enhancedAISuccess: Math.round((enhanced / total) * 100),
      fallbackRate: Math.round((fallback / total) * 100),
      reliability: Math.round(((total - fallback) / total) * 100)
    };
  }
}

// Usage in your API route:
// AIReportMonitor.trackReportGeneration({
//   timestamp: new Date().toISOString(),
//   success: true,
//   reportType: 'enhanced-ai',
//   fileSize: pdfBytes.byteLength,
//   processingTime: Date.now() - startTime,
//   clientImpact: 'none'
// });
