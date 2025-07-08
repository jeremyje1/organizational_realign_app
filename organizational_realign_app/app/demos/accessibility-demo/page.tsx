'use client';

import React, { useState } from 'react';
import {
  Spinner,
  SkeletonCard,
  SkeletonTable,
  ProgressiveLoading,
  AsyncContent,
  ErrorState,
  NetworkAware,
  StateIndicator,
  LoadingHandler
} from '@/components/ui/loading-states';
import { Skeleton } from '@/components/ui/loading';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

export default function AccessibilityDemoPage() {
  const [shouldFail, setShouldFail] = useState(false);
  
  // Demo items for progressive loading
  const demoItems = [
    <Card key={1} className="p-4 mb-4">
      <h3 className="text-lg font-medium mb-2">First Item</h3>
      <p>This item loads first in the sequence.</p>
    </Card>,
    <Card key={2} className="p-4 mb-4">
      <h3 className="text-lg font-medium mb-2">Second Item</h3>
      <p>This item loads second in the sequence.</p>
    </Card>,
    <Card key={3} className="p-4 mb-4">
      <h3 className="text-lg font-medium mb-2">Third Item</h3>
      <p>This item loads third in the sequence.</p>
    </Card>
  ];

  // Sample data fetching function
  const fetchData = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (shouldFail) throw new Error('Failed to load data');
    return { name: 'Demo Data', items: ['Item 1', 'Item 2', 'Item 3'] };
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Accessible Loading States</h1>
      <p className="text-xl mb-12">
        This demo showcases the loading components with enhanced accessibility features including:
        keyboard navigation, ARIA attributes, high contrast mode support, focus indicators, and
        screen reader announcements.
      </p>

      <Tabs defaultValue="spinners" className="mb-12">
        <TabsList className="mb-6">
          <TabsTrigger value="spinners">Spinners</TabsTrigger>
          <TabsTrigger value="skeletons">Skeletons</TabsTrigger>
          <TabsTrigger value="progressive">Progressive Loading</TabsTrigger>
          <TabsTrigger value="async">Async Content</TabsTrigger>
          <TabsTrigger value="errors">Error States</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility Features</TabsTrigger>
        </TabsList>
        
        <TabsContent value="spinners">
          <h2 className="text-2xl font-bold mb-4">Spinner Components</h2>
          <p className="mb-6">
            Spinner components provide visual feedback for loading states.
            All spinners are accessible with ARIA roles and screen reader announcements.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 flex flex-col items-center justify-center">
              <h3 className="text-lg font-medium mb-4">Default Spinner</h3>
              <Spinner ariaLabel="Loading dashboard data" />
            </Card>
            
            <Card className="p-6 flex flex-col items-center justify-center">
              <h3 className="text-lg font-medium mb-4">Gradient Spinner</h3>
              <Spinner variant="gradient" ariaLabel="Loading profile" />
            </Card>
            
            <Card className="p-6 flex flex-col items-center justify-center">
              <h3 className="text-lg font-medium mb-4">Pulse Spinner</h3>
              <Spinner variant="pulse" ariaLabel="Processing request" />
            </Card>
            
            <Card className="p-6 flex flex-col items-center justify-center">
              <h3 className="text-lg font-medium mb-4">Small Spinner with Text</h3>
              <Spinner size="sm" text="Loading comments..." ariaLabel="Loading comments" />
            </Card>
            
            <Card className="p-6 flex flex-col items-center justify-center">
              <h3 className="text-lg font-medium mb-4">Large Spinner</h3>
              <Spinner size="lg" ariaLabel="Loading large content" />
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="skeletons">
          <h2 className="text-2xl font-bold mb-4">Skeleton Loaders</h2>
          <p className="mb-6">
            Skeleton loaders provide a placeholder representation of content before it loads.
            All skeleton components include proper ARIA roles and are compatible with high contrast mode.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Skeleton Card</h3>
              <SkeletonCard ariaLabel="Loading article card" />
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Skeleton Table</h3>
              <SkeletonTable rows={3} columns={3} ariaLabel="Loading data table" />
            </Card>
            
            <Card className="p-6 md:col-span-2">
              <h3 className="text-lg font-medium mb-4">Skeleton Dashboard</h3>
              <div className="h-[400px]">
                <SkeletonDashboard ariaLabel="Loading analytics dashboard" />
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="progressive">
          <h2 className="text-2xl font-bold mb-4">Progressive Loading</h2>
          <p className="mb-6">
            Progressive loading shows content incrementally as it becomes available.
            This component includes keyboard navigation between loaded items and screen reader announcements.
          </p>
          
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Progressive Item Loading</h3>
            <p className="mb-4">Items load one after another with keyboard navigation support:</p>
            <ProgressiveLoading 
              items={demoItems} 
              loadingInterval={1000}
              ariaLabel="Loading content items progressively"
            />
          </Card>
        </TabsContent>
        
        <TabsContent value="async">
          <h2 className="text-2xl font-bold mb-4">Async Content Loading</h2>
          <p className="mb-6">
            AsyncContent handles asynchronous loading with focus management and screen reader announcements.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Async Content Example</h3>
              <div className="flex mb-4">
                <Button 
                  onClick={() => setShouldFail(!shouldFail)} 
                  variant="outline" 
                  className="mr-2"
                >
                  {shouldFail ? "Set to Succeed" : "Set to Fail"}
                </Button>
              </div>
              <AsyncContent
                loader={fetchData}
                focusOnContentLoad={true}
                ariaLabel="Demo data content"
              >
                {(data) => (
                  <div className="p-4 border border-green-300 rounded-md">
                    <h4 className="font-medium text-green-600">{data.name} Loaded Successfully</h4>
                    <ul className="mt-2 list-disc list-inside">
                      {data.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </AsyncContent>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Loading Handler Example</h3>
              <LoadingHandler
                loading={false}
                error={null}
                data={{ items: ['Example 1', 'Example 2'] }}
                loadingFallback={<Spinner text="Loading data..." ariaLabel="Loading handler data" />}
              >
                <div className="p-4 border border-blue-300 rounded-md" tabIndex={0}>
                  <h4 className="font-medium text-blue-600">Data Loaded</h4>
                  <p>This content is shown when data is available.</p>
                </div>
              </LoadingHandler>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="errors">
          <h2 className="text-2xl font-bold mb-4">Error States</h2>
          <p className="mb-6">
            Error states provide user-friendly feedback when something goes wrong.
            All error components include proper ARIA alerts and keyboard navigation for retry actions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Error State with Retry</h3>
              <ErrorState
                title="Could not load data"
                description="There was a problem fetching your data. Please try again."
                onRetry={() => alert("Retry action triggered")}
                retryText="Try Again"
              />
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Warning State</h3>
              <ErrorState
                title="Limited Data Available"
                description="Some data could not be retrieved due to temporary issues."
                severity="warning"
                onRetry={() => alert("Refresh action triggered")}
                retryText="Refresh"
              />
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="accessibility">
          <h2 className="text-2xl font-bold mb-4">Accessibility Features</h2>
          <p className="mb-6">
            All loading components include a comprehensive set of accessibility features.
          </p>
          
          <div className="space-y-8">
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">ARIA Attributes</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><code>role="status"</code> - For loading states</li>
                <li><code>role="alert"</code> - For error states</li>
                <li><code>aria-live="polite"</code> - For non-critical updates</li>
                <li><code>aria-live="assertive"</code> - For critical updates like errors</li>
                <li><code>aria-busy="true"</code> - Indicates loading in progress</li>
                <li><code>aria-label</code> - Descriptive labels for screen readers</li>
              </ul>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Keyboard Navigation</h3>
              <p className="mb-4">Test keyboard navigation using Tab, Enter, Space, and Arrow keys:</p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <StateIndicator state="loading" />
                <StateIndicator state="success" />
                <StateIndicator state="error" />
              </div>
              
              <ProgressiveLoading 
                items={demoItems.slice(0, 2)} 
                loadingInterval={1500}
              />
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">High Contrast Mode</h3>
              <p className="mb-4">All components support Windows high contrast mode through:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><code>forced-colors:border-[CanvasText]</code> - Ensures visible borders</li>
                <li><code>forced-colors:bg-[CanvasText]</code> - Ensures visible backgrounds</li>
              </ul>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Focus Indicators</h3>
              <p className="mb-4">All interactive elements have visible focus indicators:</p>
              <div className="space-y-4">
                <Button>Tab to me</Button>
                <ErrorState
                  title="Focus Example"
                  description="This error state can receive focus"
                  onRetry={() => {}}
                  retryText="Focusable Button"
                />
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">Screen Reader Support</h3>
              <p className="mb-4">Try using VoiceOver (Mac), NVDA or JAWS (Windows), or TalkBack (Android) with these elements:</p>
              <div className="space-y-4">
                <Spinner text="This has screen reader announcements" />
                <div className="mt-4">
                  <AsyncContent
                    loader={async () => {
                      await new Promise(r => setTimeout(r, 2000));
                      return "Loaded";
                    }}
                  >
                    {(data) => (
                      <div className="p-4 border border-green-300 rounded-md">
                        <p>Content with load announcement</p>
                      </div>
                    )}
                  </AsyncContent>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SkeletonDashboard({ ariaLabel }: { ariaLabel?: string }) {
  return (
    <div 
      className="w-full space-y-6"
      role="status"
      aria-label={ariaLabel || "Loading dashboard"}
      aria-busy="true"
    >
      {/* Header section */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-64" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 forced-colors:border-[CanvasText]">
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-8 w-24" />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 forced-colors:border-[CanvasText]">
          <Skeleton className="h-6 w-48 mb-4" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4">
                {[...Array(3)].map((_, j) => (
                  <Skeleton key={j} className="h-6 w-full" />
                ))}
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 forced-colors:border-[CanvasText]">
          <Skeleton className="h-6 w-36 mb-4" />
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <span className="sr-only">Dashboard content is loading</span>
    </div>
  );
}
