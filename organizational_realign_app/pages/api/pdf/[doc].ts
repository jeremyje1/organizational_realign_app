// NorthPath PDF Generator API — Algorithm v2.1 (see 00_master_overhaul_plan_v1.1.md)
// filepath: /pages/api/pdf/[doc].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { generatePDFReport } from '@/lib/pdf-report-generator';
import { calcScoreV21 } from '@/lib/algorithm/score';
import fs from 'fs';
import path from 'path';

type ContentTemplate = {
  title: string;
  content: string;
  metadata?: {
    author?: string;
    created?: string;
    type?: string;
  };
};

// Load MDX content templates
async function loadContentTemplate(docName: string): Promise<ContentTemplate | null> {
  try {
    const contentPath = path.join(process.cwd(), 'content', 'pdf', `${docName}.mdx`);
    if (!fs.existsSync(contentPath)) {
      return null;
    }
    
    const content = fs.readFileSync(contentPath, 'utf-8');
    
    // Extract frontmatter and content
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (frontmatterMatch) {
      const [, frontmatter, body] = frontmatterMatch;
      const metadata: any = {};
      
      frontmatter.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length) {
          metadata[key.trim()] = valueParts.join(':').trim();
        }
      });
      
      return {
        title: metadata.title || docName,
        content: body.trim(),
        metadata
      };
    }
    
    return {
      title: docName,
      content: content.trim()
    };
  } catch (error) {
    console.error('Error loading content template:', error);
    return null;
  }
}

// Generate assessment report with real data
async function generateAssessmentReport(req: NextApiRequest) {
  const { answers, segment } = req.body || {};
  
  // Use provided data or fallback to sample data
  const assessmentAnswers = answers || {
    'span_control_1': 2,
    'span_control_2': 3,
    'culture_1': 3,
    'culture_2': 3,
    'tech_fit_1': 2,
    'tech_fit_2': 3,
    'readiness_1': 3,
    'readiness_2': 3
  };
  
  const organizationSegment = segment || 'HIGHER_ED';
  const algoResult = await calcScoreV21({ answers: assessmentAnswers, segment: organizationSegment });
  
  // Prepare comprehensive report data
  const reportData = {
    analysis: {
      organizationalHealth: algoResult.score * 100,
      aiReadinessScore: (algoResult.score * 0.8 + 0.2) * 100, // Simulated AI readiness
      redundancyIndex: Math.max(0, 100 - algoResult.score * 120), // Simulated redundancy
      executiveSummary: {
        organizationalHealth: {
          status: algoResult.tier,
          score: Math.round(algoResult.score * 100),
          description: `Your organization demonstrates ${algoResult.tier.toLowerCase()} performance with a confidence interval of ±${(algoResult.ci * 100).toFixed(1)}%.`
        },
        aiReadiness: {
          level: algoResult.score > 0.7 ? 'High' : algoResult.score > 0.4 ? 'Medium' : 'Basic',
          score: Math.round((algoResult.score * 0.8 + 0.2) * 100),
          description: 'Assessment of organizational readiness for AI implementation and digital transformation.'
        },
        redundancyAssessment: {
          index: Math.round(Math.max(0, 100 - algoResult.score * 120)),
          description: 'Analysis of process efficiency and potential areas for optimization.'
        },
        actionRequired: {
          critical: algoResult.score < 0.5 ? 3 : algoResult.score < 0.7 ? 1 : 0,
          high: algoResult.score < 0.6 ? 5 : algoResult.score < 0.8 ? 2 : 1,
          description: 'Priority actions identified for organizational improvement.'
        }
      },
      recommendations: [
        {
          category: 'Process Optimization',
          priority: 'High',
          description: 'Streamline decision-making processes to improve organizational agility.',
          impact: 'High',
          timeframe: '3-6 months'
        },
        {
          category: 'Technology Integration',
          priority: 'Medium',
          description: 'Implement digital tools to enhance operational efficiency.',
          impact: 'Medium',
          timeframe: '6-12 months'
        }
      ],
      sectionsAnalysis: [
        {
          section: 'Span of Control',
          performance: algoResult.sectionScores.spanControl > 0.6 ? 'Strong' : 'Needs Improvement',
          averageScore: algoResult.sectionScores.spanControl * 5,
          consistency: Math.round(algoResult.sectionScores.spanControl * 100),
          strengthAreas: Math.round(algoResult.sectionScores.spanControl * 10),
          improvementAreas: Math.round((1 - algoResult.sectionScores.spanControl) * 10),
          totalQuestions: 10
        },
        {
          section: 'Culture & Communication',
          performance: algoResult.sectionScores.culture > 0.6 ? 'Strong' : 'Needs Improvement',
          averageScore: algoResult.sectionScores.culture * 5,
          consistency: Math.round(algoResult.sectionScores.culture * 100),
          strengthAreas: Math.round(algoResult.sectionScores.culture * 8),
          improvementAreas: Math.round((1 - algoResult.sectionScores.culture) * 8),
          totalQuestions: 8
        }
      ],
      aiImplementationPlan: {
        quickWins: [
          {
            section: 'Process Automation',
            title: 'Implement document workflow automation',
            expectedROI: 25,
            timeToImplement: 3
          },
          {
            section: 'Data Analytics',
            title: 'Deploy business intelligence dashboard',
            expectedROI: 30,
            timeToImplement: 4
          }
        ],
        strategicInitiatives: [
          {
            section: 'AI Integration',
            title: 'Deploy AI-powered decision support system',
            expectedROI: 45,
            estimatedCost: 150000
          },
          {
            section: 'Digital Transformation',
            title: 'Comprehensive digital platform migration',
            expectedROI: 60,
            estimatedCost: 250000
          }
        ]
      },
      transformationRoadmap: [
        {
          phase: 1,
          name: 'Foundation Building',
          duration: 6,
          expectedImpact: 'Establish baseline processes and measurement systems',
          recommendations: ['Process documentation', 'Staff training', 'Technology assessment']
        },
        {
          phase: 2,
          name: 'Implementation',
          duration: 12,
          expectedImpact: 'Deploy core improvements and monitor progress',
          recommendations: ['System deployment', 'Change management', 'Performance tracking']
        }
      ]
    },
    institutionName: req.body?.institutionName || 'Your Organization',
    assessmentDate: new Date().toISOString(),
    generatedBy: 'NorthPath Strategies AI Assessment',
    includeAI: true,
    peerPercentile: algoResult.peerPercentile
  };
  
  return await generatePDFReport(reportData);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { doc } = req.query;
    
    if (!doc || typeof doc !== 'string') {
      return res.status(400).json({ error: 'Document type is required' });
    }

    let pdfBlob: Blob;
    
    switch (doc) {
      case 'assessment-report':
        // Generate comprehensive assessment report
        pdfBlob = await generateAssessmentReport(req);
        break;
        
      case 'sample-report':
        // Generate sample report for marketing purposes
        const sampleData = {
          analysis: {
            organizationalHealth: 78,
            aiReadinessScore: 65,
            redundancyIndex: 23,
            executiveSummary: {
              organizationalHealth: {
                status: 'GROWING',
                score: 78,
                description: 'Your organization demonstrates growing performance with strong fundamentals and clear improvement opportunities.'
              },
              aiReadiness: {
                level: 'Medium',
                score: 65,
                description: 'Good foundation for AI implementation with moderate digital maturity.'
              },
              redundancyAssessment: {
                index: 23,
                description: 'Efficient operations with some optimization opportunities identified.'
              },
              actionRequired: {
                critical: 1,
                high: 2,
                description: 'Strategic improvements recommended for enhanced performance.'
              }
            },
            recommendations: [
              {
                category: 'Digital Excellence',
                priority: 'High',
                description: 'Accelerate digital transformation initiatives to improve competitive positioning.',
                impact: 'High',
                timeframe: '6-9 months'
              }
            ],
            sectionsAnalysis: [],
            aiImplementationPlan: { quickWins: [], strategicInitiatives: [] },
            transformationRoadmap: []
          },
          institutionName: 'Sample University',
          assessmentDate: new Date().toISOString(),
          generatedBy: 'NorthPath Strategies Sample Report',
          includeAI: true
        };
        pdfBlob = await generatePDFReport(sampleData);
        break;
        
      default:
        // Load content template for static documents
        const template = await loadContentTemplate(doc);
        if (!template) {
          return res.status(404).json({ error: 'Document not found' });
        }
        
        // For static content, create a simple text-based PDF
        const staticData = {
          analysis: {
            organizationalHealth: 0,
            aiReadinessScore: 0,
            redundancyIndex: 0,
            content: template.content
          },
          institutionName: template.title,
          assessmentDate: new Date().toISOString(),
          generatedBy: 'NorthPath Strategies',
          isStaticContent: true
        };
        pdfBlob = await generatePDFReport(staticData);
        break;
    }

    // Convert Blob to Buffer for Node.js response
    const arrayBuffer = await pdfBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${doc}.pdf"`);
    res.setHeader('Content-Length', buffer.length.toString());
    
    res.send(buffer);
    
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate PDF',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
