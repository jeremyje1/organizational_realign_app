# Loading States Documentation

This document outlines the usage of the comprehensive loading states component system designed for the Organizational Realignment App.

## Overview

The loading states component system provides a unified solution for handling various loading scenarios:

- **Skeleton loaders**: For content-heavy pages like dashboards and team views
- **Spinner animations**: For shorter loading processes where users are actively waiting
- **Progressive loading**: For dynamic content that loads incrementally
- **Error and retry states**: For clearly communicating issues and recovery options

## Component Usage

### Spinner Animations

Use for shorter processes where the user is actively waiting.

```tsx
import { Spinner } from '@/components/ui/loading-states';

// Default spinner
<Spinner />

// With options
<Spinner 
  size="md" // 'sm', 'md', 'lg'
  variant="gradient" // 'default', 'gradient', 'pulse'
  text="Loading..." // Optional text below spinner
  className="my-4" // Additional CSS classes
/>
```

### Skeleton Loaders

Use for content-heavy pages to indicate the layout before data loads.

```tsx
import { SkeletonCard, SkeletonTable, SkeletonDashboard } from '@/components/ui/loading-states';

// Card skeleton
<SkeletonCard />

// Table skeleton
<SkeletonTable rows={5} columns={4} />

// Full dashboard skeleton
<SkeletonDashboard />

// With options
<SkeletonCard
  lines={3} // Number of text lines
  height="h-60" // Overall height
  showImage={true} // Whether to show image placeholder
  imageHeight="h-40" // Height of image placeholder
  rounded={true} // Rounded corners
  animation="shimmer" // 'pulse', 'wave', 'shimmer'
/>
```

### Progressive Loading

Use for content that loads incrementally to improve perceived performance.

```tsx
import { ProgressiveLoading } from '@/components/ui/loading-states';

<ProgressiveLoading
  items={[<Component1 />, <Component2 />, <Component3 />]}
  loadingInterval={300} // ms between loading each item
  className="space-y-4" // Additional CSS classes
/>
```

### AsyncContent Component

Handles all states of asynchronous content loading (loading, error, success).

```tsx
import { AsyncContent } from '@/components/ui/loading-states';

<AsyncContent
  loader={() => fetchData()} // Promise returning function
  loadingFallback={<Spinner />} // Custom loading UI
  errorFallback={(error, retry) => ( // Custom error UI with retry function
    <div>
      <p>Error: {error.message}</p>
      <button onClick={retry}>Try Again</button>
    </div>
  )}
  onError={(error) => console.error(error)} // Optional error handler
  onSuccess={(data) => console.log('Loaded:', data)} // Optional success handler
  loadOnMount={true} // Whether to load immediately on mount
  deps={[someValue]} // Dependencies to trigger reload
>
  {(data) => (
    // Render successful data here
    <div>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
    </div>
  )}
</AsyncContent>
```

### Error States

For clearly communicating errors with recovery options.

```tsx
import { ErrorState } from '@/components/ui/loading-states';

<ErrorState
  title="Failed to Load Data" // Error title
  description="We couldn't load your profile data. Please try again." // Error details
  onRetry={() => fetchData()} // Retry function
  retryText="Try Again" // Custom retry button text
  dismissable={true} // Whether error can be dismissed
  onDismiss={() => closeError()} // Dismiss handler
  severity="error" // 'error', 'warning', 'info'
/>
```

### NetworkAware Component

Handles offline/online status automatically.

```tsx
import { NetworkAware } from '@/components/ui/loading-states';

<NetworkAware
  fallback={<CustomOfflineUI />} // Optional custom offline UI
  retryInterval={5000} // How often to retry connection
  onOffline={() => console.log('Went offline')} // Optional offline handler
  onOnline={() => console.log('Back online')} // Optional online handler
>
  <YourComponent /> {/* Only shown when online */}
</NetworkAware>
```

### StateIndicator

Small indicators for different states.

```tsx
import { StateIndicator } from '@/components/ui/loading-states';

<StateIndicator
  state="loading" // 'loading', 'success', 'error', 'empty', 'partial'
  loadingText="Processing..." // Custom text for loading state
/>
```

### LoadingHandler

All-in-one component for handling loading, error, empty and success states.

```tsx
import { LoadingHandler } from '@/components/ui/loading-states';

<LoadingHandler
  loading={isLoading} // Boolean loading state
  error={error} // Error object or null
  data={data} // Data to check if empty
  loadingFallback={<Spinner />} // Custom loading UI
  errorFallback={<CustomErrorUI />} // Custom error UI
  emptyFallback={<EmptyState />} // Custom empty state UI
  onRetry={() => fetchData()} // Retry function
  isEmpty={(data) => !data || data.length === 0} // Custom empty check
>
  {/* Content to show on success */}
  <DataTable data={data} />
</LoadingHandler>
```

## Demo Page

Visit `/demos/loading-states` to see all components in action.
