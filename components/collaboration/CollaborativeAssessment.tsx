// components/collaboration/CollaborativeAssessment.tsx
'use client';

import React, { useState } from 'react';
import { CollaborativeEditor } from './CollaborativeEditor';
import { AssessmentComments } from './AssessmentComments';
import { ActiveCollaborators } from './ActiveCollaborators';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { History } from 'lucide-react';
import { useSocket } from '@/lib/socket-client';

interface CollaborativeAssessmentProps {
  assessmentId: string;
  initialSections: { [key: string]: string };
  readOnly?: boolean;
}

export function CollaborativeAssessment({ 
  assessmentId, 
  initialSections,
  readOnly = false
}: CollaborativeAssessmentProps) {
  const [activeTab, setActiveTab] = useState<string>(Object.keys(initialSections)[0] || 'overview');
  const [sections, setSections] = useState(initialSections);
  const { connected } = useSocket();

  const saveSection = async (section: string, content: string) => {
    try {
      // Update locally
      setSections(prev => ({
        ...prev,
        [section]: content
      }));
      
      // Save to server
      const response = await fetch(`/api/assessments/${assessmentId}/real-time`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section,
          content,
          version: 1 // In a real implementation, you'd track this properly
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to save section');
      }
    } catch (error) {
      console.error('Error saving section:', error);
      // Handle error (revert changes, show notification, etc.)
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Collaborative Assessment</h1>
          <p className="text-gray-500">
            {connected ? 'Real-time collaboration is active' : 'Working offline'}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main content area */}
        <div className="lg:col-span-3 space-y-6">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                {Object.keys(sections).map(section => (
                  <TabsTrigger key={section} value={section} className="capitalize">
                    {section}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {Object.entries(sections).map(([section, content]) => (
              <TabsContent key={section} value={section}>
                <CollaborativeEditor
                  assessmentId={assessmentId}
                  section={section}
                  initialContent={content}
                  readOnly={readOnly}
                  onSave={(content) => saveSection(section, content)}
                />
                
                <div className="mt-6">
                  <AssessmentComments
                    assessmentId={assessmentId}
                    section={section}
                    isReadOnly={readOnly}
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <ActiveCollaborators assessmentId={assessmentId} />
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <History className="h-5 w-5" />
                Version History
              </CardTitle>
              <CardDescription>
                Track changes to this assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-center py-2 text-sm text-gray-500">
                  Version history will appear here as changes are made
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
