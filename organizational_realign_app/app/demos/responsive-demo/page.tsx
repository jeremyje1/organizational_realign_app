'use client';

import React, { useState, useRef } from 'react';
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
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { MobileBottomNav } from '@/components/ui/mobile-bottom-nav';
import { 
  Home, 
  LayoutDashboard, 
  Loader2, 
  AlertCircle, 
  Wifi, 
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useSwipe, useTouchDevice } from '@/components/ui/responsive-utils';

export default function MobileResponsiveDemoPage() {
  const [shouldFail, setShouldFail] = useState(false);
  const [activeTab, setActiveTab] = useState('spinners');
  const [currentSwipeCard, setCurrentSwipeCard] = useState(1);
  const swipeContainerRef = useRef<HTMLDivElement>(null);
  const isTouch = useTouchDevice();
  
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
  
  // Register swipe handlers for the carousel
  useSwipe(swipeContainerRef, {
    onSwipeLeft: () => {
      if (currentSwipeCard < 3) {
        setCurrentSwipeCard(prev => prev + 1);
      }
    },
    onSwipeRight: () => {
      if (currentSwipeCard > 1) {
        setCurrentSwipeCard(prev => prev - 1);
      }
    }
  });

  const navItems = [
    { label: 'Spinners', icon: <Loader2 className="h-6 w-6" />, active: activeTab === 'spinners', onClick: () => setActiveTab('spinners') },
    { label: 'Skeletons', icon: <LayoutDashboard className="h-6 w-6" />, active: activeTab === 'skeletons', onClick: () => setActiveTab('skeletons') },
    { label: 'Progress', icon: <FileSpreadsheet className="h-6 w-6" />, active: activeTab === 'progressive', onClick: () => setActiveTab('progressive') },
    { label: 'Errors', icon: <AlertCircle className="h-6 w-6" />, active: activeTab === 'errors', onClick: () => setActiveTab('errors') },
    { label: 'Network', icon: <Wifi className="h-6 w-6" />, active: activeTab === 'network', onClick: () => setActiveTab('network') },
  ];

  return (
    <div className="container mx-auto py-4 sm:py-8 px-4 sm:px-6 md:px-8 pb-32 md:pb-12">
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-8">Mobile-First Loading States</h1>
      <p className="text-sm sm:text-lg mb-6 sm:mb-12">
        This demo showcases the loading components with enhanced mobile-first responsive design including:
        touch-friendly targets, mobile-optimized layouts, and swipe gesture support.
      </p>

      {/* Desktop tabs */}
      <div className="hidden md:block mb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="mb-6">
            <TabsTrigger value="spinners">Spinners</TabsTrigger>
            <TabsTrigger value="skeletons">Skeletons</TabsTrigger>
            <TabsTrigger value="progressive">Progressive Loading</TabsTrigger>
            <TabsTrigger value="errors">Error States</TabsTrigger>
            <TabsTrigger value="network">Network Aware</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Content based on active tab */}
      {activeTab === 'spinners' && (
        <section>
          <h2 className="text-xl font-bold mb-4">Mobile-Friendly Spinners</h2>
          <p className="mb-4">
            All spinner components have touch-friendly targets (44px minimum) 
            and responsive sizing.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
              <h3 className="text-lg font-medium mb-4">Small Spinner</h3>
              <Spinner size="sm" text="Loading comments..." ariaLabel="Loading comments" />
            </Card>
            
            <Card className="p-6 flex flex-col items-center justify-center">
              <h3 className="text-lg font-medium mb-4">Large Spinner</h3>
              <Spinner size="lg" ariaLabel="Loading large content" />
            </Card>
          </div>
        </section>
      )}
      
      {activeTab === 'skeletons' && (
        <section>
          <h2 className="text-xl font-bold mb-4">Responsive Skeletons</h2>
          <p className="mb-4">
            Skeleton loaders are fully responsive and adapt to screen sizes.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Dashboard Skeleton</h3>
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 md:p-6">
                <SkeletonDashboard />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Card Skeletons</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <SkeletonCard lines={3} />
                <SkeletonCard lines={2} />
                <SkeletonCard lines={4} />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Table Skeletons (Responsive Variants)</h3>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-base font-medium mb-2">Horizontal Scroll Mode</h4>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="p-4">
                      <SkeletonTable rows={3} columns={5} responsiveMode="scroll" />
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">
                    Tables in scroll mode maintain their structure but allow horizontal scrolling.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-base font-medium mb-2">Stack Mode (Mobile Optimized)</h4>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="p-4">
                      <SkeletonTable rows={3} columns={4} responsiveMode="stack" />
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">
                    Tables in stack mode rearrange into a vertical layout on mobile devices.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-base font-medium mb-2">Auto-Responsive Mode</h4>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="p-4">
                      <SkeletonTable rows={3} columns={4} responsiveMode="auto" />
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">
                    Tables in auto mode choose the best presentation based on screen size.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {activeTab === 'progressive' && (
        <section>
          <h2 className="text-xl font-bold mb-4">Progressive Loading</h2>
          <p className="mb-4">
            Content loads progressively with mobile-optimized spacing.
          </p>
          
          <div className="space-y-4 mt-8">
            <ProgressiveLoading items={demoItems} />
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Async Content</h3>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center space-x-2 mb-4">
                <Button 
                  variant={shouldFail ? 'default' : 'outline'} 
                  onClick={() => setShouldFail(false)}
                  className="min-h-[44px]"
                >
                  Success Mode
                </Button>
                <Button 
                  variant={shouldFail ? 'outline' : 'default'} 
                  onClick={() => setShouldFail(true)}
                  className="min-h-[44px]"
                >
                  Error Mode
                </Button>
              </div>
              
              <AsyncContent
                loader={fetchData}
                loadingFallback={<Spinner text="Loading content..." />}
              >
                {(data) => (
                  <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <h3 className="font-medium">Content loaded successfully!</h3>
                    <pre className="mt-2 text-sm">{JSON.stringify(data, null, 2)}</pre>
                  </div>
                )}
              </AsyncContent>
            </div>
          </div>
        </section>
      )}
      
      {activeTab === 'errors' && (
        <section>
          <h2 className="text-xl font-bold mb-4">Error States</h2>
          <p className="mb-4">
            Error components with touch-friendly buttons and clear messages.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Error Variants</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ErrorState 
                  title="Network Error" 
                  description="Could not connect to the server. Please check your connection." 
                  onRetry={() => alert('Retrying...')}
                  retryText="Try Again"
                  severity="error"
                />
                
                <ErrorState 
                  title="Warning" 
                  description="Some data might be outdated or incomplete." 
                  onRetry={() => alert('Refreshing...')}
                  retryText="Refresh"
                  severity="warning"
                />
                
                <ErrorState 
                  title="Info" 
                  description="The system is currently in maintenance mode." 
                  severity="info"
                />
                
                <ErrorState 
                  title="Dismissable Error" 
                  description="This error can be dismissed." 
                  dismissable
                  onDismiss={() => alert('Dismissed')}
                  severity="error"
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">State Indicators</h3>
              <div className="flex flex-wrap gap-3">
                <StateIndicator state="loading" />
                <StateIndicator state="success" />
                <StateIndicator state="error" />
                <StateIndicator state="empty" />
                <StateIndicator state="partial" />
              </div>
            </div>
          </div>
        </section>
      )}
      
      {activeTab === 'network' && (
        <section>
          <h2 className="text-xl font-bold mb-4">Network Aware Component</h2>
          <p className="mb-4">
            Component that handles online/offline states with appropriate messaging.
          </p>
          
          <div className="space-y-6">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Network Status</h3>
              <NetworkAware>
                <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <p className="flex items-center gap-2">
                    <span className="h-3 w-3 bg-green-500 rounded-full"></span>
                    You are online. Content can load normally.
                  </p>
                </div>
              </NetworkAware>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Simulated Offline State</h3>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <p className="mb-4">This would show an offline state message:</p>
                <ErrorState
                  title="No Internet Connection"
                  description="We can't reach our servers. Please check your network connection."
                  severity="warning"
                  retryText="Try Again"
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Swipe Gesture Support</h3>
              <p className="mb-4">
                Swipe left or right to navigate between cards. 
                {isTouch ? ' Swipe detected on your touch device.' : ' Touch simulation available.'}
              </p>
              
              <div 
                ref={swipeContainerRef}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg touch-pan-y"
              >
                <div className="flex items-center justify-between mb-4">
                  <Button 
                    onClick={() => setCurrentSwipeCard(prev => Math.max(1, prev - 1))}
                    disabled={currentSwipeCard === 1}
                    className="min-h-[44px] min-w-[44px]"
                    variant="outline"
                    size="icon"
                    aria-label="Previous card"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">
                    Card {currentSwipeCard} of 3
                  </span>
                  <Button 
                    onClick={() => setCurrentSwipeCard(prev => Math.min(3, prev + 1))}
                    disabled={currentSwipeCard === 3}
                    className="min-h-[44px] min-w-[44px]"
                    variant="outline"
                    size="icon"
                    aria-label="Next card"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="overflow-hidden rounded-lg">
                  <div 
                    className="transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(${(currentSwipeCard - 1) * -100}%)` }}
                  >
                    <div className="flex">
                      {[
                        { title: "Swipe Support", content: "This card has swipe gesture support." },
                        { title: "Mobile Optimized", content: "The cards are fully optimized for mobile devices with touch targets." },
                        { title: "Accessibility", content: "Buttons provide alternative navigation for keyboard and screen reader users." }
                      ].map((card, i) => (
                        <div 
                          key={i} 
                          className="min-w-full p-6 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 last:border-0"
                          aria-hidden={currentSwipeCard !== i + 1}
                        >
                          <h4 className="text-lg font-medium mb-2">{card.title}</h4>
                          <p>{card.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center mt-4 gap-2">
                  {[1, 2, 3].map(i => (
                    <button
                      key={i}
                      onClick={() => setCurrentSwipeCard(i)}
                      className={`h-2 w-2 rounded-full ${
                        currentSwipeCard === i 
                          ? 'bg-primary-500' 
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                      aria-label={`Go to card ${i}`}
                      aria-current={currentSwipeCard === i}
                    />
                  ))}
                </div>
              </div>
              
              <p className="text-sm text-slate-500 mt-2">
                The swipe gesture component includes accessible buttons for non-touch devices
                and uses a minimum touch target size of 44x44 pixels.
              </p>
            </div>
          </div>
        </section>
      )}
      
      {/* Mobile Bottom Navigation - Touch-friendly with minimum 44px targets */}
      <MobileBottomNav items={navItems} />
      
      {/* Instructions for mobile users */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-blue-50 dark:bg-blue-900/50 border-t border-blue-200 dark:border-blue-800 text-center text-sm md:hidden">
        <p>
          Swipe between tabs or use the bottom navigation
        </p>
      </div>
    </div>
  );
}
