/**
 * AI Platform Recommendations Display Component
 * Shows platform recommendations with clear partnership disclosures
 * 
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Star, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  Shield, 
  ExternalLink, 
  Info,
  AlertTriangle,
  Award,
  CheckCircle
} from 'lucide-react';
import { PlatformPortfolio, PlatformRecommendation, SponsoredContent } from '@/lib/ai-partnership-service';

interface AIRecommendationsProps {
  recommendations: PlatformPortfolio;
  tier: 'basic' | 'professional' | 'enterprise';
  organizationType: string;
  onRequestDemo?: (platform: string) => void;
  onViewDetails?: (platform: string) => void;
}

export const AIRecommendationsDisplay: React.FC<AIRecommendationsProps> = ({
  recommendations,
  tier,
  organizationType,
  onRequestDemo,
  onViewDetails
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Very High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPartnershipBadge = (partnershipType?: string) => {
    if (!partnershipType || partnershipType === 'None') return null;
    
    const colors = {
      'Strategic Partner': 'bg-blue-100 text-blue-800',
      'Certified Partner': 'bg-purple-100 text-purple-800',
      'Implementation Partner': 'bg-green-100 text-green-800'
    };

    return (
      <Badge className={colors[partnershipType as keyof typeof colors]}>
        <Award className="w-3 h-3 mr-1" />
        {partnershipType}
      </Badge>
    );
  };

  const renderPlatformCard = (platform: PlatformRecommendation, isSponsored = false) => (
    <Card key={platform.name} className={`relative ${isSponsored ? 'border-2 border-blue-300 bg-blue-50' : ''}`}>
      {isSponsored && (
        <div className="absolute -top-2 -right-2">
          <Badge className="bg-blue-600 text-white">Sponsored</Badge>
        </div>
      )}
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">{platform.name}</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              {platform.category} • {platform.vendor}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">{(platform.confidence * 100).toFixed(0)}%</span>
            </div>
            {getPartnershipBadge(platform.partnershipType)}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Best For */}
          <div>
            <h4 className="font-medium text-sm text-gray-700">Best For:</h4>
            <p className="text-sm text-gray-600">{platform.bestFor}</p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <div>
                <p className="font-medium">Price Range</p>
                <p className="text-gray-600">{platform.priceRange}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <div>
                <p className="font-medium">Expected ROI</p>
                <p className="text-gray-600">{platform.expectedROI}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-orange-600" />
              <div>
                <p className="font-medium">Implementation</p>
                <p className="text-gray-600">{platform.implementationTime}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-purple-600" />
              <div>
                <p className="font-medium">Complexity</p>
                <Badge className={getComplexityColor(platform.complexity)}>
                  {platform.complexity}
                </Badge>
              </div>
            </div>
          </div>

          {/* Partnership Benefits */}
          {platform.partnerBenefits && platform.partnerBenefits.length > 0 && (
            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="font-medium text-sm text-green-800 mb-2">
                <CheckCircle className="w-4 h-4 inline mr-1" />
                Partnership Benefits
              </h4>
              <ul className="text-sm text-green-700 space-y-1">
                {platform.partnerBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1 h-1 bg-green-600 rounded-full mt-2 mr-2 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onViewDetails?.(platform.name)}
            >
              <Info className="w-4 h-4 mr-1" />
              View Details
            </Button>
            {tier !== 'basic' && (
              <Button 
                size="sm"
                onClick={() => onRequestDemo?.(platform.name)}
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Request Demo
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderSponsoredContent = (sponsored: SponsoredContent) => (
    <Card key={sponsored.sponsor} className="border-2 border-yellow-300 bg-yellow-50">
      <div className="absolute -top-2 -right-2">
        <Badge className="bg-yellow-600 text-white">Sponsored Spotlight</Badge>
      </div>
      
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{sponsored.solution}</CardTitle>
        <CardDescription>by {sponsored.sponsor}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {sponsored.specialOffer && (
            <div className="bg-yellow-100 p-3 rounded-lg">
              <h4 className="font-medium text-yellow-800">Special Offer</h4>
              <p className="text-sm text-yellow-700">{sponsored.specialOffer}</p>
            </div>
          )}
          
          {sponsored.caseStudy && (
            <div className="bg-white p-3 rounded-lg border">
              <h4 className="font-medium text-gray-800">Case Study</h4>
              <p className="text-sm text-gray-600">{sponsored.caseStudy}</p>
            </div>
          )}

          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">
                {(sponsored.clientMatch * 100).toFixed(0)}% match
              </span>
            </div>
            
            <Button size="sm">
              <ExternalLink className="w-4 h-4 mr-1" />
              Learn More
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Partnership Disclosure Alert */}
      <Alert className="border-blue-200 bg-blue-50">
        <Shield className="h-4 w-4" />
        <AlertTitle>Transparency Notice</AlertTitle>
        <AlertDescription className="text-sm">
          <p className="mb-2">
            This assessment includes recommendations from our platform partners. We maintain strict 
            ethical standards and always provide non-partner alternatives for comparison.
          </p>
          <div className="text-xs text-gray-600 space-y-1">
            <p>• Total Partners: {recommendations.disclosure.totalPartners}</p>
            <p>• Last Updated: {new Date(recommendations.disclosure.lastUpdated).toLocaleDateString()}</p>
            <p>• {recommendations.disclosure.methodology}</p>
          </div>
        </AlertDescription>
      </Alert>

      {/* Sponsored Content */}
      {recommendations.sponsoredContent.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Sponsored Recommendations</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {recommendations.sponsoredContent.map(renderSponsoredContent)}
          </div>
        </div>
      )}

      {/* Main Recommendations Tabs */}
      <Tabs defaultValue="primary" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="primary">
            Top Recommendations ({recommendations.primaryRecommendations.length})
          </TabsTrigger>
          <TabsTrigger value="alternatives">
            Alternatives ({recommendations.alternativeOptions.length})
          </TabsTrigger>
          {recommendations.industrySpecific.length > 0 && (
            <TabsTrigger value="industry">
              {organizationType} Specific ({recommendations.industrySpecific.length})
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="primary" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.primaryRecommendations.map(platform => renderPlatformCard(platform))}
          </div>
        </TabsContent>

        <TabsContent value="alternatives" className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              These alternatives don't have commercial partnerships with NorthPath Strategies, 
              providing you with unbiased comparison options.
            </AlertDescription>
          </Alert>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.alternativeOptions.map(platform => renderPlatformCard(platform))}
          </div>
        </TabsContent>

        {recommendations.industrySpecific.length > 0 && (
          <TabsContent value="industry" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recommendations.industrySpecific.map(platform => renderPlatformCard(platform))}
            </div>
          </TabsContent>
        )}
      </Tabs>

      {/* Ethical Framework Footer */}
      <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
        <h4 className="font-medium text-gray-800 mb-2">Our Recommendation Ethics</h4>
        <p>{recommendations.disclosure.ethicalFramework}</p>
        <div className="mt-2 pt-2 border-t border-gray-200">
          <p className="text-xs">
            Questions about our recommendation methodology? 
            <Button variant="link" size="sm" className="p-0 h-auto ml-1">
              Contact our ethics team
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendationsDisplay;
