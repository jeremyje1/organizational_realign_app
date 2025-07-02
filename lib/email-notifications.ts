// lib/email-notifications.ts
// Email notification system for organizational assessment platform

interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

interface EmailRecipient {
  email: string;
  name?: string;
}

class EmailNotifications {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.SENDGRID_API_KEY || '';
    this.baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://app.northpathstrategies.org';
  }

  /**
   * Send premium upgrade confirmation email
   */
  async sendPremiumUpgradeConfirmation(
    recipient: EmailRecipient,
    plan: string,
    assessmentId: string
  ): Promise<boolean> {
    const template = this.getPremiumUpgradeTemplate(plan, assessmentId);
    
    return this.sendEmail({
      to: recipient,
      subject: template.subject,
      html: template.html,
      text: template.text,
      category: 'premium-upgrade'
    });
  }

  /**
   * Send AI analysis completion notification
   */
  async sendAIAnalysisReady(
    recipient: EmailRecipient,
    assessmentId: string,
    analysisType: string = 'AI-Enhanced'
  ): Promise<boolean> {
    const template = this.getAIAnalysisReadyTemplate(assessmentId, analysisType);
    
    return this.sendEmail({
      to: recipient,
      subject: template.subject,
      html: template.html,
      text: template.text,
      category: 'ai-analysis-ready'
    });
  }

  /**
   * Send consultation booking confirmation
   */
  async sendConsultationConfirmation(
    recipient: EmailRecipient,
    consultationDetails: {
      assessmentId: string;
      type: string;
      date: string;
      time: string;
      timezone: string;
      isPremium: boolean;
    }
  ): Promise<boolean> {
    const template = this.getConsultationConfirmationTemplate(consultationDetails);
    
    return this.sendEmail({
      to: recipient,
      subject: template.subject,
      html: template.html,
      text: template.text,
      category: 'consultation-booking'
    });
  }

  /**
   * Send assessment completion reminder
   */
  async sendAssessmentReminder(
    recipient: EmailRecipient,
    assessmentId: string,
    daysElapsed: number
  ): Promise<boolean> {
    const template = this.getAssessmentReminderTemplate(assessmentId, daysElapsed);
    
    return this.sendEmail({
      to: recipient,
      subject: template.subject,
      html: template.html,
      text: template.text,
      category: 'assessment-reminder'
    });
  }

  /**
   * Send collaboration invitation email
   */
  async sendCollaborationInvite(params: {
    assessmentId: string;
    inviterName: string;
    inviterEmail: string;
    recipientEmail: string;
    role: string;
  }): Promise<boolean> {
    const { assessmentId, inviterName, recipientEmail, role } = params;
    
    const template = this.getCollaborationInviteTemplate(
      inviterName,
      assessmentId,
      role
    );
    
    return this.sendEmail({
      to: { email: recipientEmail },
      subject: template.subject,
      html: template.html,
      text: template.text,
      category: 'collaboration-invite'
    });
  }

  /**
   * Core email sending function
   */
  private async sendEmail(params: {
    to: EmailRecipient;
    subject: string;
    html: string;
    text: string;
    category?: string;
  }): Promise<boolean> {
    if (!this.apiKey) {
      console.log('Email would be sent:', params);
      return true; // Mock success for development
    }

    try {
      // This would integrate with SendGrid, AWS SES, or your preferred email service
      // For now, we'll log the email details
      console.log('📧 Email notification:', {
        to: params.to.email,
        subject: params.subject,
        category: params.category,
        timestamp: new Date().toISOString()
      });

      // TODO: Implement actual email sending
      // const response = await sendGridClient.send({
      //   to: params.to.email,
      //   from: 'no-reply@northpathstrategies.org',
      //   subject: params.subject,
      //   html: params.html,
      //   text: params.text,
      //   categories: [params.category || 'general']
      // });

      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  }

  /**
   * Premium upgrade email template
   */
  private getPremiumUpgradeTemplate(plan: string, assessmentId: string): EmailTemplate {
    const planNames = {
      'ai-enhanced': 'AI-Enhanced Analysis',
      'comprehensive': 'Comprehensive Professional',
      'enterprise': 'Enterprise Transformation'
    };

    const planName = planNames[plan as keyof typeof planNames] || plan;

    const subject = `🚀 Your ${planName} is Being Prepared!`;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #fff; padding: 30px; border: 1px solid #e0e0e0; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
          .btn { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
          .feature { padding: 10px 0; border-bottom: 1px solid #eee; }
          .premium-badge { background: #ffd700; color: #333; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Premium Analysis Activated!</h1>
            <p>Your ${planName} package is being prepared</p>
          </div>
          
          <div class="content">
            <p>Dear Valued Client,</p>
            
            <p>Thank you for upgrading to our <strong>${planName}</strong> package! Your enhanced organizational analysis is now being processed by our advanced AI systems and expert consultants.</p>
            
            <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>🔮 What's Happening Next:</h3>
              <ul>
                <li>AI analysis generation (5-15 minutes)</li>
                <li>Expert review and validation (1-2 hours)</li>
                <li>Professional report compilation (2-4 hours)</li>
                <li>Premium insights delivered to your dashboard</li>
              </ul>
            </div>
            
            <p>Your results will be available at:</p>
            <a href="${this.baseUrl}/secure/results?assessmentId=${assessmentId}" class="btn">View Your Analysis</a>
            
            <p>Assessment ID: <code>${assessmentId}</code></p>
            
            <div style="margin-top: 30px;">
              <h3>✨ Premium Features Included:</h3>
              ${this.getPremiumFeaturesList(plan)}
            </div>
          </div>
          
          <div class="footer">
            <p>Questions? Reply to this email or contact us at <a href="mailto:support@northpathstrategies.org">support@northpathstrategies.org</a></p>
            <p style="font-size: 12px; color: #666;">North Path Strategies | Transforming Higher Education</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
Premium Analysis Activated!

Thank you for upgrading to our ${planName} package! Your enhanced organizational analysis is being processed.

Your results will be available at: ${this.baseUrl}/secure/results?assessmentId=${assessmentId}

Assessment ID: ${assessmentId}

Questions? Contact us at support@northpathstrategies.org

North Path Strategies | Transforming Higher Education
    `;

    return { subject, html, text };
  }

  /**
   * AI analysis ready email template
   */
  private getAIAnalysisReadyTemplate(assessmentId: string, analysisType: string): EmailTemplate {
    const subject = `🧠 Your ${analysisType} Analysis is Ready!`;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #fff; padding: 30px; border: 1px solid #e0e0e0; }
          .btn { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
          .highlight { background: #e8f4fd; padding: 15px; border-radius: 8px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 Analysis Complete!</h1>
            <p>Your ${analysisType} insights are ready for review</p>
          </div>
          
          <div class="content">
            <p>Great news! Your advanced organizational analysis has been completed and is now available in your dashboard.</p>
            
            <div class="highlight">
              <h3>📊 What's Inside Your Analysis:</h3>
              <ul>
                <li>Executive summary with key findings</li>
                <li>Strategic recommendations with implementation timelines</li>
                <li>Risk assessment and mitigation strategies</li>
                <li>ROI projections and cost-benefit analysis</li>
                <li>Industry benchmarking and best practices</li>
              </ul>
            </div>
            
            <a href="${this.baseUrl}/secure/results?assessmentId=${assessmentId}" class="btn">View Your Analysis</a>
            
            <p>Ready to take the next step? Schedule a consultation with our experts to discuss your results and implementation strategy.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
Your ${analysisType} Analysis is Ready!

Your advanced organizational analysis has been completed and is now available in your dashboard.

View your analysis: ${this.baseUrl}/secure/results?assessmentId=${assessmentId}

Contact us at support@northpathstrategies.org for questions.
    `;

    return { subject, html, text };
  }

  /**
   * Consultation confirmation email template
   */
  private getConsultationConfirmationTemplate(details: any): EmailTemplate {
    const subject = `📅 Consultation Confirmed - ${details.type}`;
    
    const priorityBadge = details.isPremium ? 
      '<span style="background: #ffd700; color: #333; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold;">PREMIUM PRIORITY</span>' : '';

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #fff; padding: 30px; border: 1px solid #e0e0e0; }
          .calendar-block { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Consultation Booked!</h1>
            ${priorityBadge}
          </div>
          
          <div class="content">
            <p>Your consultation has been confirmed. Our team will be in touch within 24 hours to finalize the details.</p>
            
            <div class="calendar-block">
              <h3>📅 Consultation Details</h3>
              <p><strong>Type:</strong> ${details.type}</p>
              <p><strong>Preferred Date:</strong> ${details.date}</p>
              <p><strong>Preferred Time:</strong> ${details.time} (${details.timezone})</p>
              <p><strong>Assessment ID:</strong> ${details.assessmentId}</p>
            </div>
            
            <p>We'll send you a calendar invitation with the video conference link 24 hours before your session.</p>
            
            ${details.isPremium ? 
              '<p><strong>As a premium client, you receive priority scheduling and extended session time.</strong></p>' : 
              ''
            }
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
Consultation Confirmed!

Your consultation has been booked for ${details.date} at ${details.time} (${details.timezone}).

Type: ${details.type}
Assessment ID: ${details.assessmentId}

Our team will contact you within 24 hours to confirm details.
    `;

    return { subject, html, text };
  }

  /**
   * Assessment reminder email template
   */
  private getAssessmentReminderTemplate(assessmentId: string, daysElapsed: number): EmailTemplate {
    const subject = `⏰ Complete Your Organizational Assessment`;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #fff; padding: 30px; border: 1px solid #e0e0e0; }
          .btn { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📋 Assessment Waiting</h1>
            <p>Complete your organizational transformation assessment</p>
          </div>
          
          <div class="content">
            <p>You started your organizational assessment ${daysElapsed} days ago. Complete it now to unlock your personalized insights and recommendations!</p>
            
            <a href="${this.baseUrl}/secure/results?assessmentId=${assessmentId}" class="btn">Complete Assessment</a>
            
            <p>Assessment ID: ${assessmentId}</p>
            
            <p><strong>What you'll get:</strong></p>
            <ul>
              <li>Comprehensive organizational analysis</li>
              <li>Strategic recommendations</li>
              <li>Implementation roadmap</li>
              <li>Benchmarking insights</li>
            </ul>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
Complete Your Organizational Assessment

You started your assessment ${daysElapsed} days ago. Complete it now to get your personalized insights!

Continue assessment: ${this.baseUrl}/secure/results?assessmentId=${assessmentId}

Assessment ID: ${assessmentId}
    `;

    return { subject, html, text };
  }

  /**
   * Generate collaboration invitation email template
   */
  private getCollaborationInviteTemplate(
    inviterName: string,
    assessmentId: string,
    role: string
  ): EmailTemplate {
    const assessmentUrl = `${this.baseUrl}/assessment/${assessmentId}`;
    const roleDisplay = role.charAt(0) + role.slice(1).toLowerCase();
    
    const subject = `${inviterName} has invited you to collaborate on an Organizational Assessment`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="${this.baseUrl}/logo.png" alt="North Path Strategies" style="max-width: 200px;">
        </div>
        
        <div style="background-color: #f9f9f9; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">You've Been Invited to Collaborate</h1>
          
          <p style="color: #555; font-size: 16px; line-height: 1.5;">
            <strong>${inviterName}</strong> has invited you to collaborate on an organizational assessment as a <strong>${roleDisplay}</strong>.
          </p>
          
          <p style="color: #555; font-size: 16px; line-height: 1.5;">
            This assessment uses North Path Strategies' comprehensive framework to analyze organizational alignment and identify opportunities for improvement.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${assessmentUrl}" style="background-color: #4a6cf7; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
              View Assessment
            </a>
          </div>
          
          <p style="color: #555; font-size: 16px; line-height: 1.5;">
            <strong>As a ${roleDisplay}, you will be able to:</strong>
          </p>
          
          <ul style="color: #555; font-size: 16px; line-height: 1.5;">
            ${role === 'ADMIN' ? '<li>Invite additional collaborators</li>' : ''}
            ${role === 'ADMIN' || role === 'COLLABORATOR' ? '<li>Edit assessment responses</li>' : ''}
            <li>View assessment results</li>
            <li>Add comments and feedback</li>
            ${role === 'ADMIN' || role === 'COLLABORATOR' ? '<li>Participate in setting action priorities</li>' : ''}
          </ul>
        </div>
        
        <div style="text-align: center; color: #888; font-size: 14px;">
          <p>If you have any questions, please contact us at <a href="mailto:support@northpathstrategies.org" style="color: #4a6cf7;">support@northpathstrategies.org</a></p>
          <p>&copy; ${new Date().getFullYear()} North Path Strategies. All rights reserved.</p>
        </div>
      </div>
    `;
    
    const text = `
      You've Been Invited to Collaborate

      ${inviterName} has invited you to collaborate on an organizational assessment as a ${roleDisplay}.

      This assessment uses North Path Strategies' comprehensive framework to analyze organizational alignment and identify opportunities for improvement.

      View the assessment at: ${assessmentUrl}

      As a ${roleDisplay}, you will be able to:
      ${role === 'ADMIN' ? '- Invite additional collaborators\n' : ''}
      ${role === 'ADMIN' || role === 'COLLABORATOR' ? '- Edit assessment responses\n' : ''}
      - View assessment results
      - Add comments and feedback
      ${role === 'ADMIN' || role === 'COLLABORATOR' ? '- Participate in setting action priorities\n' : ''}

      If you have any questions, please contact us at support@northpathstrategies.org

      © ${new Date().getFullYear()} North Path Strategies. All rights reserved.
    `;
    
    return { subject, html, text };
  }

  /**
   * Get premium features list HTML
   */
  private getPremiumFeaturesList(plan: string): string {
    const features = {
      'ai-enhanced': [
        'AI-powered insights and recommendations',
        'Advanced implementation roadmap',
        'Cost-benefit analysis with ROI projections',
        'Industry benchmarking comparison',
        'Risk assessment and mitigation strategies',
        'Priority consultation scheduling'
      ],
      'comprehensive': [
        'Everything in AI-Enhanced',
        'Executive-ready branded PDF report',
        'Custom organizational branding',
        '60-minute strategy consultation',
        'Implementation support and guidance',
        'Follow-up assessment in 6 months'
      ],
      'enterprise': [
        'Everything in Comprehensive',
        'Multi-stakeholder assessment support',
        'Team collaboration features',
        'Ongoing consultation support (3 months)',
        'Custom integration and API access',
        'Dedicated success manager'
      ]
    };

    const planFeatures = features[plan as keyof typeof features] || [];
    
    return planFeatures.map(feature => 
      `<div class="feature">✅ ${feature}</div>`
    ).join('');
  }
}

const emailNotifications = new EmailNotifications();
export default emailNotifications;
export const sendCollaborationInvite = emailNotifications.sendCollaborationInvite.bind(emailNotifications);