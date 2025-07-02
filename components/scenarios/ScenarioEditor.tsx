
'use client';

import { useState, useMemo } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AssessmentResponse, OrganizationalRealignmentEngine } from '@/lib/realignment-engine';

interface ScenarioEditorProps {
  baselineAssessment: {
    responses: AssessmentResponse[];
  };
}

export function ScenarioEditor({ baselineAssessment }: ScenarioEditorProps) {
  const [scenarioName, setScenarioName] = useState('My First Scenario');
  const [budgetAdjustment, setBudgetAdjustment] = useState(0); // Percentage change
  const [headcountAdjustment, setHeadcountAdjustment] = useState(0); // Percentage change
  const [techInvestment, setTechInvestment] = useState(50); // 0-100 scale

  const modifiedResponses = useMemo(() => {
    // Simulate impact of adjustments on assessment responses
    return baselineAssessment.responses.map(response => {
      let newValue = response.value;

      // Tech investment boosts AI and IT scores
      if ((response.tags && response.tags.includes('AI')) || 
          (response.section && response.section.includes('Information Technology'))) {
        newValue = Math.min(5, response.value + (techInvestment / 100) * 1.5);
      }

      // Budget cuts negatively impact most areas
      if (budgetAdjustment < -10 && !(response.tags && response.tags.includes('AI'))) {
        newValue = Math.max(1, response.value + (budgetAdjustment / 100) * 0.5);
      }

      return { ...response, value: newValue };
    });
  }, [baselineAssessment.responses, budgetAdjustment, techInvestment]); // Removed headcountAdjustment as it's not used in the calculation

  const handleRunAnalysis = () => {
    const engine = new OrganizationalRealignmentEngine();
    const results = engine.analyzeOrganization(modifiedResponses);
    // In a real app, you'd pass this to the ScenarioViewer, e.g., via a state management solution or callback
    console.log('Scenario Analysis Results:', results);
    alert('Scenario analysis complete! Check the console for results. In a real app, the viewer would update.');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a New Scenario</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="scenario-name" className="font-medium">Scenario Name</label>
          <Input id="scenario-name" value={scenarioName} onChange={(e) => setScenarioName(e.target.value)} placeholder="e.g., Q3 Budget Cuts" />
        </div>

        <div className="space-y-2">
          <label className="font-medium">Budget Adjustment: {budgetAdjustment}%</label>
          <Slider defaultValue={[0]} min={-50} max={50} step={5} onValueChange={(val: number[]) => setBudgetAdjustment(val[0])} />
        </div>

        <div className="space-y-2">
          <label className="font-medium">Headcount Adjustment: {headcountAdjustment}%</label>
          <Slider defaultValue={[0]} min={-50} max={50} step={5} onValueChange={(val: number[]) => setHeadcountAdjustment(val[0])} />
        </div>

        <div className="space-y-2">
          <label className="font-medium">Strategic Tech Investment Level: {techInvestment}</label>
          <Slider defaultValue={[50]} min={0} max={100} step={10} onValueChange={(val: number[]) => setTechInvestment(val[0])} />
        </div>

        <Button onClick={handleRunAnalysis} className="w-full">Run Scenario Analysis</Button>
      </CardContent>
    </Card>
  );
}
