// Organization Type Selection Component
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  GraduationCap, 
  Building2, 
  Hospital, 
  University, 
  School, 
  Heart, 
  Building, 
  Briefcase 
} from 'lucide-react';
import { OrganizationType } from '@/data/northpathQuestionBank';

interface OrganizationTypeSelectProps {
  onSelect: (type: OrganizationType) => void;
  selectedType?: OrganizationType;
}

const organizationTypes = [
  {
    id: 'community_college' as OrganizationType,
    title: 'Community Colleges',
    description: 'Two-year institutions serving local communities with academic and workforce programs',
    icon: GraduationCap,
    examples: 'District colleges, technical colleges, junior colleges',
    color: 'blue'
  },
  {
    id: 'trade_technical' as OrganizationType,
    title: 'Trade & Technical Schools',
    description: 'Specialized institutions focused on hands-on skills and industry certifications',
    icon: Building2,
    examples: 'Trade schools, technical institutes, vocational colleges',
    color: 'orange'
  },
  {
    id: 'hospital_healthcare' as OrganizationType,
    title: 'Hospitals & Healthcare Systems',
    description: 'Healthcare delivery organizations including hospitals, clinics, and health systems',
    icon: Hospital,
    examples: 'Academic medical centers, hospital systems, health networks',
    color: 'red'
  },
  {
    id: 'public_university' as OrganizationType,
    title: 'Public Universities',
    description: 'State-funded four-year institutions with research and teaching missions',
    icon: University,
    examples: 'State universities, research universities, flagship institutions',
    color: 'green'
  },
  {
    id: 'private_university' as OrganizationType,
    title: 'Private Universities',
    description: 'Independent higher education institutions with diverse funding sources',
    icon: School,
    examples: 'Private colleges, liberal arts colleges, research universities',
    color: 'purple'
  },
  {
    id: 'nonprofit' as OrganizationType,
    title: 'Nonprofits',
    description: 'Mission-driven organizations serving public benefit with tax-exempt status',
    icon: Heart,
    examples: 'Foundations, charities, social service organizations',
    color: 'pink'
  },
  {
    id: 'government_agency' as OrganizationType,
    title: 'Government Agencies',
    description: 'Public sector organizations at federal, state, or local levels',
    icon: Building,
    examples: 'Federal agencies, state departments, municipal services',
    color: 'indigo'
  },
  {
    id: 'company_business' as OrganizationType,
    title: 'Companies & Businesses',
    description: 'For-profit organizations across various industries and sectors',
    icon: Briefcase,
    examples: 'Corporations, startups, small businesses, enterprises',
    color: 'gray'
  }
];

const colorVariants = {
  blue: 'border-blue-200 hover:border-blue-400 hover:bg-blue-50 bg-blue-25',
  orange: 'border-orange-200 hover:border-orange-400 hover:bg-orange-50 bg-orange-25',
  red: 'border-red-200 hover:border-red-400 hover:bg-red-50 bg-red-25',
  green: 'border-green-200 hover:border-green-400 hover:bg-green-50 bg-green-25',
  purple: 'border-purple-200 hover:border-purple-400 hover:bg-purple-50 bg-purple-25',
  pink: 'border-pink-200 hover:border-pink-400 hover:bg-pink-50 bg-pink-25',
  indigo: 'border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 bg-indigo-25',
  gray: 'border-gray-200 hover:border-gray-400 hover:bg-gray-50 bg-gray-25'
};

const selectedVariants = {
  blue: 'border-blue-500 bg-blue-100 ring-2 ring-blue-500',
  orange: 'border-orange-500 bg-orange-100 ring-2 ring-orange-500',
  red: 'border-red-500 bg-red-100 ring-2 ring-red-500',
  green: 'border-green-500 bg-green-100 ring-2 ring-green-500',
  purple: 'border-purple-500 bg-purple-100 ring-2 ring-purple-500',
  pink: 'border-pink-500 bg-pink-100 ring-2 ring-pink-500',
  indigo: 'border-indigo-500 bg-indigo-100 ring-2 ring-indigo-500',
  gray: 'border-gray-500 bg-gray-100 ring-2 ring-gray-500'
};

export default function OrganizationTypeSelect({ onSelect, selectedType }: OrganizationTypeSelectProps) {
  const [hoveredType, setHoveredType] = useState<OrganizationType | null>(null);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Select Your Organization Type</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Choose the category that best describes your organization to receive 
          tailored questions and analysis specific to your sector.
        </p>
        <div className="mt-4 inline-block px-4 py-2 bg-blue-100 rounded-lg">
          <span className="text-sm text-blue-800 font-medium">
            🔒 All data processed using SOC 2 compliant, AES-256 encrypted systems
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {organizationTypes.map((orgType) => {
          const Icon = orgType.icon;
          const isSelected = selectedType === orgType.id;
          const isHovered = hoveredType === orgType.id;
          
          return (
            <Card 
              key={orgType.id}
              className={`cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? selectedVariants[orgType.color]
                  : colorVariants[orgType.color]
              }`}
              onMouseEnter={() => setHoveredType(orgType.id)}
              onMouseLeave={() => setHoveredType(null)}
              onClick={() => onSelect(orgType.id)}
            >
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-2">
                  <Icon 
                    className={`h-12 w-12 ${
                      isSelected || isHovered 
                        ? `text-${orgType.color}-600` 
                        : `text-${orgType.color}-500`
                    }`} 
                  />
                </div>
                <CardTitle className="text-lg">{orgType.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-center mb-3">
                  {orgType.description}
                </CardDescription>
                <div className="text-xs text-gray-500 text-center">
                  <strong>Examples:</strong> {orgType.examples}
                </div>
                {isSelected && (
                  <div className="mt-3 text-center">
                    <div className={`inline-block px-3 py-1 bg-${orgType.color}-200 text-${orgType.color}-800 rounded-full text-xs font-medium`}>
                      Selected
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedType && (
        <div className="mt-8 text-center">
          <Button 
            size="lg" 
            onClick={() => {
              // Navigate to the assessment with selected type
              window.location.href = `/assessment/start?type=${selectedType}`;
            }}
            className="px-8 py-3"
          >
            Continue with {organizationTypes.find(t => t.id === selectedType)?.title}
          </Button>
        </div>
      )}

      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-center">What happens next?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-600 font-semibold">1</span>
            </div>
            <p><strong>Universal Assessment:</strong> Complete 11 core sections covering organizational structure, processes, and culture</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-600 font-semibold">2</span>
            </div>
            <p><strong>Sector-Specific Module:</strong> Answer 10 additional questions tailored to your organization type</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-600 font-semibold">3</span>
            </div>
            <p><strong>AI Analysis:</strong> Receive DSCH, CRF, and LEI analysis with actionable recommendations</p>
          </div>
        </div>
      </div>
    </div>
  );
}
