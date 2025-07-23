/**
 * AI Image Generator for Organizational Charts
 * Supports OpenAI DALL-E 3 and Midjourney-style image generation
 * 
 * @version 1.0.0
 * @author Enhanced AI Report System
 */

interface OrgChartImageOptions {
  orgChart?: any;
  institutionName: string;
  organizationType: string;
  style?: 'professional' | 'modern' | 'minimal' | 'executive';
  theme?: 'corporate' | 'education' | 'healthcare' | 'nonprofit';
  includeMetrics?: boolean;
}

interface AIImageResult {
  success: boolean;
  imageUrl?: string;
  imageData?: string; // base64 encoded
  error?: string;
  fallbackSVG?: string;
}

export class AIImageGenerator {
  private openaiApiKey: string;

  constructor() {
    this.openaiApiKey = process.env.OPENAI_API_KEY || '';
  }

  /**
   * Generate AI-powered organizational chart image
   */
  async generateOrgChartImage(options: OrgChartImageOptions): Promise<AIImageResult> {
    try {
      console.log(`🎨 Generating AI org chart image for ${options.institutionName}...`);

      // Analyze org chart structure if available
      const chartAnalysis = this.analyzeOrgChartStructure(options.orgChart);
      
      // Generate AI image using DALL-E 3
      const aiImageResult = await this.generateWithDALLE3(options, chartAnalysis);
      
      if (aiImageResult.success) {
        return aiImageResult;
      }

      // Fallback to SVG generation
      console.log('🔄 AI image generation failed, creating SVG fallback...');
      return this.generateFallbackSVG(options, chartAnalysis);

    } catch (error) {
      console.error('❌ AI image generation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        fallbackSVG: this.generateBasicSVG(options)
      };
    }
  }

  /**
   * Generate professional org chart using DALL-E 3
   */
  private async generateWithDALLE3(
    options: OrgChartImageOptions, 
    analysis: any
  ): Promise<AIImageResult> {
    if (!this.openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const prompt = this.createOrgChartPrompt(options, analysis);
    
    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: prompt,
          n: 1,
          size: '1792x1024', // Wide format for org charts
          quality: 'hd',
          response_format: 'b64_json',
          style: options.style === 'executive' ? 'natural' : 'vivid'
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`DALL-E API error: ${error.error?.message || 'Unknown error'}`);
      }

      const result = await response.json();
      const imageData = result.data[0]?.b64_json;

      if (imageData) {
        console.log('✅ DALL-E 3 org chart generated successfully');
        return {
          success: true,
          imageData: imageData
        };
      }

      throw new Error('No image data returned from DALL-E');

    } catch (error) {
      console.error('DALL-E 3 generation failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'DALL-E generation failed'
      };
    }
  }

  /**
   * Create detailed prompt for AI image generation
   */
  private createOrgChartPrompt(options: OrgChartImageOptions, analysis: any): string {
    const { institutionName, organizationType, style = 'professional', theme = 'corporate' } = options;
    
    let basePrompt = `Create a professional organizational chart diagram for "${institutionName}", a ${organizationType}.`;
    
    // Add structure details
    if (analysis.totalRoles > 0) {
      basePrompt += ` The organization has approximately ${analysis.totalRoles} key roles`;
      if (analysis.levels > 0) {
        basePrompt += ` across ${analysis.levels} hierarchical levels`;
      }
      basePrompt += '.';
    }

    // Style specifications
    const styleSpecs = {
      professional: 'Clean, corporate style with blue and gray color scheme. Rectangular boxes with clean lines.',
      modern: 'Modern flat design with vibrant colors and rounded corners. Contemporary typography.',
      minimal: 'Minimalist design with simple lines and muted colors. Focus on clarity and whitespace.',
      executive: 'Premium executive style with sophisticated colors and elegant typography.'
    };

    const themeSpecs = {
      corporate: 'Corporate blue and gray colors, professional fonts',
      education: 'Academic colors with navy blue and gold accents',
      healthcare: 'Medical theme with clean blues and greens',
      nonprofit: 'Warm, community-focused colors with earth tones'
    };

    basePrompt += ` Design style: ${styleSpecs[style]} Theme: ${themeSpecs[theme]}.`;
    
    // Add specific requirements
    basePrompt += ` Include:
    - Clear hierarchy with CEO/President at top
    - Department heads in middle tier
    - Staff and individual contributors at bottom
    - Professional titles in each box
    - Clean connecting lines showing reporting relationships
    - ${institutionName} logo area or header
    - Professional color coding by department or level`;

    if (options.includeMetrics) {
      basePrompt += `
    - FTE counts and cost metrics where appropriate
    - Performance indicators or status badges`;
    }

    basePrompt += `
    
    Technical requirements:
    - High resolution, professional quality
    - Suitable for executive presentations
    - Clear, readable text even when scaled
    - Balanced composition with good use of whitespace
    - Export-ready for PDF inclusion
    
    Avoid: 
    - Cartoon or clip-art style
    - Overly complex designs
    - Unreadable small text
    - Cluttered layouts
    - Unprofessional color schemes`;

    return basePrompt;
  }

  /**
   * Analyze org chart structure for AI prompt generation
   */
  private analyzeOrgChartStructure(orgChart: any): any {
    if (!orgChart || !orgChart.data) {
      return {
        totalRoles: 5, // Default assumption
        levels: 3,
        departments: ['Leadership', 'Operations', 'Support'],
        hasMetrics: false
      };
    }

    try {
      const chartData = typeof orgChart.data === 'string' ? JSON.parse(orgChart.data) : orgChart.data;
      
      if (Array.isArray(chartData)) {
        return {
          totalRoles: chartData.length,
          levels: Math.max(...chartData.map(role => role.level || 1)),
          departments: Array.from(new Set(chartData.map(role => role.department || 'General'))),
          hasMetrics: chartData.some(role => role.fte || role.annualCost),
          roles: chartData.map(role => ({
            title: role.roleTitle,
            level: role.level,
            department: role.department
          }))
        };
      }

      return {
        totalRoles: 5,
        levels: 3,
        departments: ['Leadership', 'Operations', 'Support'],
        hasMetrics: false
      };

    } catch (error) {
      console.error('Error analyzing org chart structure:', error);
      return {
        totalRoles: 5,
        levels: 3,
        departments: ['Leadership', 'Operations', 'Support'],
        hasMetrics: false
      };
    }
  }

  /**
   * Generate high-quality SVG fallback
   */
  private generateFallbackSVG(options: OrgChartImageOptions, analysis: any): AIImageResult {
    const svg = this.createProfessionalSVGOrgChart(options, analysis);
    return {
      success: true,
      fallbackSVG: svg
    };
  }

  /**
   * Create professional SVG org chart
   */
  private createProfessionalSVGOrgChart(options: OrgChartImageOptions, analysis: any): string {
    const { institutionName, organizationType, style = 'professional' } = options;
    
    // Color schemes based on style
    const colorSchemes = {
      professional: {
        primary: '#1a2b51',
        secondary: '#4169e1',
        accent: '#228b22',
        text: '#212529',
        background: '#ffffff',
        border: '#dee2e6'
      },
      modern: {
        primary: '#2563eb',
        secondary: '#3b82f6',
        accent: '#06d6a0',
        text: '#1f2937',
        background: '#ffffff',
        border: '#e5e7eb'
      },
      minimal: {
        primary: '#374151',
        secondary: '#6b7280',
        accent: '#059669',
        text: '#111827',
        background: '#ffffff',
        border: '#d1d5db'
      },
      executive: {
        primary: '#1e293b',
        secondary: '#475569',
        accent: '#0f766e',
        text: '#0f172a',
        background: '#ffffff',
        border: '#cbd5e1'
      }
    };

    const colors = colorSchemes[style];
    
    return `
    <svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.1)"/>
        </filter>
      </defs>
      
      <!-- Background -->
      <rect width="1200" height="800" fill="${colors.background}"/>
      
      <!-- Header -->
      <rect x="0" y="0" width="1200" height="80" fill="url(#headerGradient)"/>
      <text x="60" y="30" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white">
        ${institutionName}
      </text>
      <text x="60" y="55" font-family="Arial, sans-serif" font-size="16" fill="rgba(255,255,255,0.9)">
        Organizational Structure - ${organizationType}
      </text>
      
      <!-- CEO/President Level -->
      <g transform="translate(500, 120)">
        <rect x="-100" y="-30" width="200" height="60" rx="8" fill="${colors.primary}" filter="url(#shadow)"/>
        <text x="0" y="-5" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white">
          President/CEO
        </text>
        <text x="0" y="15" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="rgba(255,255,255,0.9)">
          Executive Leadership
        </text>
      </g>
      
      <!-- Connecting Lines -->
      <line x1="500" y1="180" x2="500" y2="220" stroke="${colors.border}" stroke-width="2"/>
      <line x1="200" y1="220" x2="800" y2="220" stroke="${colors.border}" stroke-width="2"/>
      <line x1="200" y1="220" x2="200" y2="240" stroke="${colors.border}" stroke-width="2"/>
      <line x1="400" y1="220" x2="400" y2="240" stroke="${colors.border}" stroke-width="2"/>
      <line x1="600" y1="220" x2="600" y2="240" stroke="${colors.border}" stroke-width="2"/>
      <line x1="800" y1="220" x2="800" y2="240" stroke="${colors.border}" stroke-width="2"/>
      
      <!-- Department Heads Level -->
      <g transform="translate(200, 270)">
        <rect x="-80" y="-25" width="160" height="50" rx="6" fill="${colors.secondary}" filter="url(#shadow)"/>
        <text x="0" y="-5" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white">
          Academic Affairs
        </text>
        <text x="0" y="10" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="rgba(255,255,255,0.9)">
          VP Academic Affairs
        </text>
      </g>
      
      <g transform="translate(400, 270)">
        <rect x="-80" y="-25" width="160" height="50" rx="6" fill="${colors.secondary}" filter="url(#shadow)"/>
        <text x="0" y="-5" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white">
          Operations
        </text>
        <text x="0" y="10" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="rgba(255,255,255,0.9)">
          VP Operations
        </text>
      </g>
      
      <g transform="translate(600, 270)">
        <rect x="-80" y="-25" width="160" height="50" rx="6" fill="${colors.secondary}" filter="url(#shadow)"/>
        <text x="0" y="-5" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white">
          Finance
        </text>
        <text x="0" y="10" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="rgba(255,255,255,0.9)">
          CFO
        </text>
      </g>
      
      <g transform="translate(800, 270)">
        <rect x="-80" y="-25" width="160" height="50" rx="6" fill="${colors.secondary}" filter="url(#shadow)"/>
        <text x="0" y="-5" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white">
          Student Services
        </text>
        <text x="0" y="10" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="rgba(255,255,255,0.9)">
          VP Student Affairs
        </text>
      </g>
      
      <!-- More connecting lines -->
      <line x1="200" y1="295" x2="200" y2="320" stroke="${colors.border}" stroke-width="2"/>
      <line x1="400" y1="295" x2="400" y2="320" stroke="${colors.border}" stroke-width="2"/>
      <line x1="600" y1="295" x2="600" y2="320" stroke="${colors.border}" stroke-width="2"/>
      <line x1="800" y1="295" x2="800" y2="320" stroke="${colors.border}" stroke-width="2"/>
      
      <!-- Staff Level -->
      <g transform="translate(150, 350)">
        <rect x="-60" y="-20" width="120" height="40" rx="4" fill="${colors.accent}" filter="url(#shadow)"/>
        <text x="0" y="-2" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="white">
          Faculty
        </text>
        <text x="0" y="12" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" fill="rgba(255,255,255,0.9)">
          Department Chairs
        </text>
      </g>
      
      <g transform="translate(250, 350)">
        <rect x="-60" y="-20" width="120" height="40" rx="4" fill="${colors.accent}" filter="url(#shadow)"/>
        <text x="0" y="-2" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="white">
          Curriculum
        </text>
        <text x="0" y="12" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" fill="rgba(255,255,255,0.9)">
          Program Directors
        </text>
      </g>
      
      <g transform="translate(350, 350)">
        <rect x="-60" y="-20" width="120" height="40" rx="4" fill="${colors.accent}" filter="url(#shadow)"/>
        <text x="0" y="-2" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="white">
          IT Services
        </text>
        <text x="0" y="12" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" fill="rgba(255,255,255,0.9)">
          IT Director
        </text>
      </g>
      
      <g transform="translate(450, 350)">
        <rect x="-60" y="-20" width="120" height="40" rx="4" fill="${colors.accent}" filter="url(#shadow)"/>
        <text x="0" y="-2" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="white">
          Facilities
        </text>
        <text x="0" y="12" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" fill="rgba(255,255,255,0.9)">
          Facilities Manager
        </text>
      </g>
      
      <g transform="translate(550, 350)">
        <rect x="-60" y="-20" width="120" height="40" rx="4" fill="${colors.accent}" filter="url(#shadow)"/>
        <text x="0" y="-2" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="white">
          Accounting
        </text>
        <text x="0" y="12" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" fill="rgba(255,255,255,0.9)">
          Controller
        </text>
      </g>
      
      <g transform="translate(650, 350)">
        <rect x="-60" y="-20" width="120" height="40" rx="4" fill="${colors.accent}" filter="url(#shadow)"/>
        <text x="0" y="-2" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="white">
          Budget
        </text>
        <text x="0" y="12" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" fill="rgba(255,255,255,0.9)">
          Budget Director
        </text>
      </g>
      
      <g transform="translate(750, 350)">
        <rect x="-60" y="-20" width="120" height="40" rx="4" fill="${colors.accent}" filter="url(#shadow)"/>
        <text x="0" y="-2" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="white">
          Admissions
        </text>
        <text x="0" y="12" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" fill="rgba(255,255,255,0.9)">
          Director
        </text>
      </g>
      
      <g transform="translate(850, 350)">
        <rect x="-60" y="-20" width="120" height="40" rx="4" fill="${colors.accent}" filter="url(#shadow)"/>
        <text x="0" y="-2" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="white">
          Registrar
        </text>
        <text x="0" y="12" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" fill="rgba(255,255,255,0.9)">
          Registrar
        </text>
      </g>
      
      <!-- Footer -->
      <text x="60" y="760" font-family="Arial, sans-serif" font-size="12" fill="${colors.text}">
        Generated: ${new Date().toLocaleDateString()} | AI-Enhanced Organizational Analysis
      </text>
      <text x="60" y="780" font-family="Arial, sans-serif" font-size="10" fill="${colors.secondary}">
        Professional org chart with ${analysis.totalRoles} roles across ${analysis.levels} levels
      </text>
    </svg>`;
  }

  /**
   * Generate basic fallback SVG
   */
  private generateBasicSVG(options: OrgChartImageOptions): string {
    return `
    <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="400" fill="#f8f9fa"/>
      <text x="400" y="200" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#6c757d">
        Organizational Chart for ${options.institutionName}
      </text>
      <text x="400" y="230" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#868e96">
        ${options.organizationType}
      </text>
    </svg>`;
  }
}

/**
 * Helper function for easy integration
 */
export async function generateOrgChartImage(options: OrgChartImageOptions): Promise<AIImageResult> {
  const generator = new AIImageGenerator();
  return await generator.generateOrgChartImage(options);
}
