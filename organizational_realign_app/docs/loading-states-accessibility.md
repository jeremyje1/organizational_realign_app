# Accessible Loading States Components

The loading states components provide a comprehensive solution for various loading scenarios in web applications, with a strong focus on accessibility.

## Table of Contents
1. [Accessibility Features](#accessibility-features)
2. [Component Types](#component-types)
3. [Usage Examples](#usage-examples)
4. [Keyboard Navigation](#keyboard-navigation)
5. [Screen Reader Support](#screen-reader-support)
6. [High Contrast Mode](#high-contrast-mode)

## Accessibility Features

All loading state components include the following accessibility features:

### ARIA Roles and Attributes
- `role="status"` for non-critical loading states
- `role="alert"` for critical states like errors
- `aria-live="polite"` for most status updates
- `aria-live="assertive"` for important error messages
- `aria-busy="true"` during loading states
- `aria-label` with descriptive context

### Keyboard Navigation
- Tab navigation to all interactive elements
- Enter/Space to trigger actions (retry, dismiss)
- Arrow keys for navigating between items in progressive loading
- Focus management that automatically moves focus to newly loaded content

### Visual Accessibility
- High contrast mode support via `forced-colors` media queries
- Clear focus indicators with visible rings
- Text alternatives for visual indicators
- Support for reduced motion preferences

### Screen Reader Support
- Hidden text for context (`sr-only` class)
- Meaningful announcements for state changes
- Progress updates for multi-step processes
- Clear error messages with instructions

## Component Types

### Spinner Components
```jsx
// Basic spinner with accessibility
<Spinner ariaLabel="Loading user data" />

// With custom text
<Spinner text="Loading dashboard..." ariaLabel="Loading dashboard data" />

// Variant and size options
<Spinner variant="gradient" size="lg" ariaLabel="Processing payment" />
```

### Skeleton Loaders
```jsx
// Card skeleton
<SkeletonCard ariaLabel="Loading article" />

// Table skeleton
<SkeletonTable 
  rows={5} 
  columns={4} 
  ariaLabel="Loading data table with 5 rows" 
/>

// Dashboard skeleton
<SkeletonDashboard ariaLabel="Loading analytics dashboard" />
```

### Progressive Loading
```jsx
<ProgressiveLoading
  items={items}
  loadingInterval={300}
  ariaLabel="Loading content items"
  ariaLiveRegion={true}
/>
```

### Async Content
```jsx
<AsyncContent
  loader={fetchData}
  ariaLabel="User profile data"
  focusOnContentLoad={true}
>
  {(data) => <UserProfile user={data} />}
</AsyncContent>
```

### Error States
```jsx
<ErrorState
  title="Failed to load data"
  description="There was a problem connecting to the server"
  severity="error" // or "warning" or "info"
  onRetry={handleRetry}
/>
```

### Network Aware
```jsx
<NetworkAware
  fallback={<OfflineMessage />}
  retryInterval={5000}
>
  {children}
</NetworkAware>
```

### Loading Handler
```jsx
<LoadingHandler
  loading={isLoading}
  error={error}
  data={data}
  onRetry={fetchData}
>
  <DataDisplay data={data} />
</LoadingHandler>
```

## Keyboard Navigation

The components implement consistent keyboard navigation:

1. **Tab**: Move focus between interactive elements
2. **Enter/Space**: Activate buttons (retry, dismiss)
3. **Arrow Keys**: Navigate between loaded items in progressive loading
4. **Escape**: Close dismissible error states

Focus is automatically managed:
- Focus moves to newly loaded content when appropriate
- Focus shifts to error messages when they appear
- Focus returns to the triggering element when actions are completed

## Screen Reader Support

Components announce their state changes to screen readers:
- Loading start and completion
- Progress updates during multi-step operations
- Error states with clear descriptions
- Success confirmations

Example announcements:
- "Loading content. Please wait..."
- "Loading in progress. 50% complete. 3 of 6 items loaded."
- "Content loaded successfully"
- "Error loading data: Network connection failed"
- "You are currently offline. Retry attempt: 2"

## High Contrast Mode

All components support Windows high contrast mode through:
- `forced-colors:border-[CanvasText]` ensures visible borders
- `forced-colors:bg-[CanvasText]` ensures visible backgrounds/icons
- Additional text context for non-visual indicators

This ensures that users with visual impairments can still perceive the loading states even when custom colors are overridden by the operating system's high contrast settings.
