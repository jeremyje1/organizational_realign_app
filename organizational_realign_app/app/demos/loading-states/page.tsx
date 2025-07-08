'use client';

import { useState, useEffect } from 'react';
import {
  Spinner,
  SkeletonCard,
  SkeletonTable,
  SkeletonDashboard,
  ProgressiveLoading,
  AsyncContent,
  ErrorState,
  NetworkAware,
  StateIndicator,
  LoadingHandler
} from '@/components/ui/loading-states';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

// Mock delay function to simulate loading
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data loading function
async function mockDataFetch<T>(data: T, delayMs = 1500, shouldFail = false): Promise<T> {
  await delay(delayMs);
  if (shouldFail) {
    throw new Error('Failed to load data');
  }
  return data;
}

export default function LoadingStatesDemo() {
  const [activeTab, setActiveTab] = useState('spinners');
  const [loadProgress, setLoadProgress] = useState(0);
  const [shouldFail, setShouldFail] = useState(false);

  // Simulate progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // Demo items for progressive loading
  const demoItems = [
    <Card key={1} className="p-4 mb-4">
      <h3 className="text-lg font-medium mb-2">First Item</h3>
      <p>This item loads first in the sequence.</p>
    </Card>,
    <Card key={2} className="p-4 mb-4">
      <h3 className="text-lg font-medium mb-2">Second Item</h3>
      <p>This item loads after the first item.</p>
    </Card>,
    <Card key={3} className="p-4 mb-4">
      <h3 className="text-lg font-medium mb-2">Third Item</h3>
      <p>This item loads after the second item.</p>
    </Card>,
    <Card key={4} className="p-4 mb-4">
      <h3 className="text-lg font-medium mb-2">Fourth Item</h3>
      <p>This item loads after the third item.</p>
    </Card>,
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Loading States Component Demo</h1>
      
      <Tabs defaultValue="spinners" onValueChange={setActiveTab} className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="spinners">Spinners</TabsTrigger>
          <TabsTrigger value="skeletons">Skeletons</TabsTrigger>
          <TabsTrigger value="progressive">Progressive Loading</TabsTrigger>
          <TabsTrigger value="async">Async Content</TabsTrigger>
          <TabsTrigger value="errors">Error States</TabsTrigger>
          <TabsTrigger value="combined">Combined Demo</TabsTrigger>
        </TabsList>
        
        <TabsContent value="spinners" className="space-y-8">
          <h2 className="text-2xl font-bold mb-4">Spinner Animations</h2>
          <p className="mb-6">
            Use spinner animations for shorter loading processes where the user is actively waiting.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 flex flex-col items-center justify-center">
              <h3 className="text-lg font-medium mb-4">Default Spinner</h3>
              <Spinner size="md" />
            </Card>
            
            <Card className="p-6 flex flex-col items-center justify-center">
              <h3 className="text-lg font-medium mb-4">Gradient Spinner</h3>
              <Spinner size="md" variant="gradient" />
            </Card>
            
            <Card className="p-6 flex flex-col items-center justify-center">
              <h3 className="text-lg font-medium mb-4">Pulse Spinner</h3>
              <Spinner size="md" variant="pulse" />
            </Card>
          </div>
          
          <h3 className="text-xl font-medium mt-8 mb-4">Spinner Sizes</h3>
          <div className="flex items-end gap-8">
            <div className="flex flex-col items-center">
              <span className="text-sm mb-2">Small</span>
              <Spinner size="sm" />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm mb-2">Medium</span>
              <Spinner size="md" />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm mb-2">Large</span>
              <Spinner size="lg" />
            </div>
          </div>
          
          <h3 className="text-xl font-medium mt-8 mb-4">With Text</h3>
          <div className="flex gap-8">
            <Spinner size="md" variant="gradient" text="Loading..." />
            <Spinner size="md" variant="gradient" text="Please wait" />
          </div>
        </TabsContent>
        
        <TabsContent value="skeletons" className="space-y-8">
          <h2 className="text-2xl font-bold mb-4">Skeleton Loaders</h2>
          <p className="mb-6">
            Use skeleton loaders for content-heavy pages like dashboards and team views.
            They provide a visual indication of the layout before the content loads.
          </p>
          
          <h3 className="text-xl font-medium mb-4">Card Skeletons</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SkeletonCard />
            <SkeletonCard lines={5} />
            <SkeletonCard showImage={false} />
          </div>
          
          <h3 className="text-xl font-medium mt-8 mb-4">Table Skeleton</h3>
          <Card className="p-6">
            <SkeletonTable rows={5} columns={4} />
          </Card>
          
          <h3 className="text-xl font-medium mt-8 mb-4">Dashboard Skeleton</h3>
          <Card className="p-6">
            <SkeletonDashboard />
          </Card>
          
          <h3 className="text-xl font-medium mt-8 mb-4">Animation Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">Shimmer</h4>
              <SkeletonCard animation="shimmer" />
            </div>
            <div>
              <h4 className="font-medium mb-2">Pulse</h4>
              <SkeletonCard animation="pulse" />
            </div>
            <div>
              <h4 className="font-medium mb-2">Wave</h4>
              <SkeletonCard animation="wave" />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="progressive" className="space-y-8">
          <h2 className="text-2xl font-bold mb-4">Progressive Loading</h2>
          <p className="mb-6">
            Progressive loading helps to improve the perceived performance by showing content as it becomes available.
          </p>
          
          <h3 className="text-xl font-medium mb-4">Loading Progress</h3>
          <Card className="p-6">
            <h4 className="text-lg mb-3">Current Progress: {loadProgress}%</h4>
            <Progress value={loadProgress} className="mb-4" />
            <Button onClick={() => setLoadProgress(0)}>Reset</Button>
          </Card>
          
          <h3 className="text-xl font-medium mt-8 mb-4">Progressive Item Loading</h3>
          <Card className="p-6">
            <h4 className="text-lg mb-4">Items load one by one</h4>
            <ProgressiveLoading items={demoItems} loadingInterval={800} />
            
            <Button 
              onClick={() => {
                // Force re-render of component
                setActiveTab('other');
                setTimeout(() => setActiveTab('progressive'), 0);
              }} 
              className="mt-4"
            >
              Reload Items
            </Button>
          </Card>
        </TabsContent>
        
        <TabsContent value="async" className="space-y-8">
          <h2 className="text-2xl font-bold mb-4">Async Content Loading</h2>
          <p className="mb-6">
            The AsyncContent component handles all states of asynchronous data loading: 
            loading, error, and success.
          </p>
          
          <div className="flex mb-4 gap-4">
            <Button
              onClick={() => setShouldFail(!shouldFail)}
              variant={shouldFail ? "destructive" : "outline"}
            >
              {shouldFail ? "Currently: Will Fail" : "Currently: Will Succeed"}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Default Loading</h3>
              <AsyncContent
                loader={() => mockDataFetch({ name: "Example Data" }, 2000, shouldFail)}
                loadOnMount={false}
                deps={[shouldFail]}
              >
                {(data) => (
                  <div>
                    <p className="mb-3">Data loaded successfully!</p>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                  </div>
                )}
              </AsyncContent>
              <Button onClick={() => setActiveTab('async')} className="mt-4">
                Load Data
              </Button>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Custom Loading States</h3>
              <AsyncContent
                loader={() => mockDataFetch({ name: "Custom States Example" }, 2000, shouldFail)}
                loadingFallback={
                  <div className="text-center p-8">
                    <Spinner variant="gradient" size="lg" text="Loading custom content..." />
                  </div>
                }
                errorFallback={(error, retry) => (
                  <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <h4 className="text-red-600 dark:text-red-400 font-medium mb-2">Custom Error UI</h4>
                    <p className="mb-4">{error.message}</p>
                    <Button onClick={retry} variant="outline" size="sm">Try Again</Button>
                  </div>
                )}
                loadOnMount={false}
                deps={[shouldFail]}
              >
                {(data) => (
                  <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                    <h4 className="text-green-600 dark:text-green-400 font-medium mb-2">
                      Custom Success UI
                    </h4>
                    <p>Data loaded successfully!</p>
                  </div>
                )}
              </AsyncContent>
              <Button onClick={() => setActiveTab('async')} className="mt-4">
                Load With Custom States
              </Button>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="errors" className="space-y-8">
          <h2 className="text-2xl font-bold mb-4">Error and Retry States</h2>
          <p className="mb-6">
            Clear error states with retry options help users recover from failures.
          </p>
          
          <h3 className="text-xl font-medium mb-4">Error Severities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ErrorState
              severity="error"
              title="Error Loading Data"
              description="We couldn't load your data. Please try again."
              onRetry={() => alert('Retry clicked')}
            />
            
            <ErrorState
              severity="warning"
              title="Connection Issues"
              description="Your connection seems unstable. Some data may not be current."
              onRetry={() => alert('Retry clicked')}
              retryText="Refresh"
            />
            
            <ErrorState
              severity="info"
              title="Update Available"
              description="A new version is available. Refresh to update."
              onRetry={() => alert('Refresh clicked')}
              retryText="Refresh"
            />
          </div>
          
          <h3 className="text-xl font-medium mt-8 mb-4">Network Status</h3>
          <Card className="p-6">
            <h4 className="text-lg mb-4">Network Aware Component</h4>
            <NetworkAware
              fallback={
                <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-center">
                  <h4 className="font-medium text-amber-600 dark:text-amber-400 mb-2">
                    Custom Offline UI
                  </h4>
                  <p className="mb-4">You are currently offline. Please check your connection.</p>
                  <Button onClick={() => window.location.reload()} variant="outline" size="sm">
                    Retry Connection
                  </Button>
                </div>
              }
            >
              <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">
                  You're Online
                </h4>
                <p>Your network connection is active.</p>
              </div>
            </NetworkAware>
          </Card>
          
          <h3 className="text-xl font-medium mt-8 mb-4">State Indicators</h3>
          <Card className="p-6">
            <div className="flex flex-wrap gap-4">
              <StateIndicator state="loading" />
              <StateIndicator state="success" />
              <StateIndicator state="error" />
              <StateIndicator state="empty" />
              <StateIndicator state="partial" />
            </div>
            <div className="mt-6">
              <h4 className="font-medium mb-2">Custom Text</h4>
              <div className="flex flex-wrap gap-4">
                <StateIndicator state="loading" loadingText="Fetching data..." />
                <StateIndicator state="success" successText="All done!" />
                <StateIndicator state="error" errorText="Something went wrong" />
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="combined" className="space-y-8">
          <h2 className="text-2xl font-bold mb-4">Combined Loading Handler</h2>
          <p className="mb-6">
            The LoadingHandler component combines all loading states into one easy-to-use component.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Loading State</h3>
              <LoadingHandler
                loading={true}
                error={null}
                data={null}
                loadingFallback={<Spinner variant="gradient" text="Loading data..." />}
              >
                <p>This content won't be shown while loading.</p>
              </LoadingHandler>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Error State</h3>
              <LoadingHandler
                loading={false}
                error={new Error("Failed to load data")}
                data={null}
                onRetry={() => alert('Retry clicked')}
              >
                <p>This content won't be shown due to error.</p>
              </LoadingHandler>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Empty State</h3>
              <LoadingHandler
                loading={false}
                error={null}
                data={[]}
                emptyFallback={
                  <div className="text-center p-6">
                    <h4 className="font-medium mb-2">No Items Found</h4>
                    <p className="text-gray-500">Try adjusting your filters</p>
                  </div>
                }
              >
                <p>This content won't be shown because data is empty.</p>
              </LoadingHandler>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Success State</h3>
              <LoadingHandler
                loading={false}
                error={null}
                data={["Item 1", "Item 2", "Item 3"]}
              >
                <div>
                  <p className="mb-3">Data loaded successfully!</p>
                  <ul className="list-disc list-inside">
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                  </ul>
                </div>
              </LoadingHandler>
            </Card>
          </div>
          
          <h3 className="text-xl font-medium mt-8 mb-4">Real-world Example</h3>
          <Card className="p-6">
            <h4 className="text-lg mb-4">Team Members Dashboard</h4>
            <AsyncContent
              loader={() => mockDataFetch([
                { id: 1, name: "John Doe", role: "CEO", avatar: "JD" },
                { id: 2, name: "Jane Smith", role: "CTO", avatar: "JS" },
                { id: 3, name: "Mike Johnson", role: "CFO", avatar: "MJ" }
              ], 2000, shouldFail)}
              loadingFallback={<SkeletonTable rows={3} columns={3} />}
              deps={[shouldFail]}
            >
              {(data) => (
                <div className="mt-4">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="text-left pb-3">Name</th>
                        <th className="text-left pb-3">Role</th>
                        <th className="text-left pb-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((member: any) => (
                        <tr key={member.id} className="border-t">
                          <td className="py-3">{member.name}</td>
                          <td className="py-3">{member.role}</td>
                          <td className="py-3">
                            <Button size="sm" variant="outline">View</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </AsyncContent>
            <div className="mt-4 flex gap-4">
              <Button
                onClick={() => setShouldFail(!shouldFail)}
                variant={shouldFail ? "destructive" : "outline"}
              >
                {shouldFail ? "Currently: Will Fail" : "Currently: Will Succeed"}
              </Button>
              <Button onClick={() => setActiveTab('combined')}>Reload Data</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
