# Routing & UI Implementation

This document describes the routing structure and UI components with tier-based access control for the organizational realignment application.

## 7. Routing & UI Overview

### Implemented Routes

#### 1. `/enterprise/dashboard`

**Purpose**: Enterprise-tier dashboard with Power BI integration
**Access Level**: Enterprise tier only
**Component**: Shows PowerBIDashboard component with comprehensive analytics

**Features:**

- Real-time organizational metrics
- Interactive Power BI reports
- Performance indicators dashboard
- Export capabilities
- Enterprise-level analytics

#### 2. `/scenario/[id]`

**Purpose**: Dynamic scenario analysis with detailed diff view and savings calculations
**Access Level**: Team and Enterprise tiers
**Component**: Scenario comparison with savings table and implementation timeline

**Features:**

- Scenario overview and summary
- Detailed organizational structure diff (baseline vs. proposed)
- Comprehensive savings analysis table
- Implementation timeline with phases
- Financial impact projections

### Access Gating System

#### Middleware Implementation (`middleware.ts`)

The middleware checks `session.tier` and enforces access control based on user subscription level.

**Tier Levels:**

- `INDIVIDUAL`: Basic access to assessment tools
- `TEAM`: Access to collaboration features and scenario modeling
- `ENTERPRISE`: Full access including Power BI dashboard and advanced analytics

**Access Control Matrix:**

```typescript
const TIER_ACCESS_CONTROL = {
  "/enterprise": ["ENTERPRISE"],
  "/enterprise/dashboard": ["ENTERPRISE"],
  "/scenario": ["TEAM", "ENTERPRISE"],
  "/advanced-analytics": ["ENTERPRISE"],
  "/bulk-upload": ["TEAM", "ENTERPRISE"],
  "/collaboration": ["TEAM", "ENTERPRISE"],
};
```

#### Flow Control:

1. **Authentication Check**: Verify user is logged in
2. **Tier Validation**: Check if user's tier allows access to requested route
3. **Redirect Logic**:
   - Unauthenticated users → `/auth`
   - Insufficient tier → `/upgrade` with tier information
   - Valid access → Allow request to proceed

## File Structure

### Pages

```
app/
├── enterprise/
│   └── dashboard/
│       └── page.tsx              # Enterprise dashboard with Power BI
├── scenario/
│   └── [id]/
│       └── page.tsx              # Dynamic scenario analysis
├── upgrade/
│   └── page.tsx                  # Tier upgrade page
└── middleware.ts                 # Access control middleware
```

### Components Used

- `PowerBIEmbed`: Existing Power BI integration component
- `PageHero`: Consistent page header component
- `next-auth/react`: Session management
- Custom UI components for tables and visualizations

## Enterprise Dashboard (`/enterprise/dashboard`)

### Features

- **Access Control**: Enterprise tier validation with fallback UI
- **Power BI Integration**: Embedded interactive reports
- **Performance Metrics**: Real-time organizational statistics
- **Export Capabilities**: Data export functionality
- **Responsive Design**: Optimized for desktop and mobile

### Component Structure

```tsx
// Main dashboard with tier checking
<EnterpriseDashboard>
  <PageHero title="Enterprise Dashboard" />
  <PowerBIEmbed reportId={...} />
  <QuickStats />
</EnterpriseDashboard>
```

### Environment Variables

```env
NEXT_PUBLIC_POWERBI_REPORT_ID=your_report_id
NEXT_PUBLIC_POWERBI_WORKSPACE_ID=your_workspace_id
```

## Scenario Analysis (`/scenario/[id]`)

### Tab Navigation System

1. **Overview**: Scenario summary and key metrics
2. **Scenario Diff**: Visual comparison of organizational structures
3. **Savings Analysis**: Detailed financial breakdown table
4. **Implementation**: Timeline and phases

### Savings Table Features

- **Category Breakdown**: Personnel, operational, technology costs
- **Baseline vs. Proposed**: Side-by-side comparison
- **Savings Calculation**: Automatic calculation with percentages
- **Color Coding**: Green for savings, red for increases
- **Totals**: Summary row with overall impact

### Data Structure

```typescript
interface SavingsBreakdown {
  category: string;
  baseline: number;
  variant: number;
  savings: number;
  percentage: number;
}
```

### Mock Data Example

```typescript
const mockSavingsData: SavingsBreakdown[] = [
  {
    category: "Personnel Costs",
    baseline: 2500000,
    variant: 2200000,
    savings: 300000,
    percentage: 12,
  },
  // ... additional categories
];
```

## Access Control Implementation

### Middleware Logic

```typescript
async function checkTierAccess(request: NextRequest, pathname: string) {
  const requiredTiers = TIER_ACCESS_CONTROL[pathname];
  if (!requiredTiers) return null;

  const token = await getToken({ req: request });
  if (!token) return redirectToAuth();

  const userTier = token.tier || "INDIVIDUAL";
  if (!requiredTiers.includes(userTier)) {
    return redirectToUpgrade();
  }

  return null; // Access granted
}
```

### Session Integration

Uses NextAuth.js for session management:

- Token contains user tier information
- Middleware accesses session data securely
- Client-side components also check session state

## Upgrade Page (`/upgrade`)

### Features

- **Current vs. Required Tier**: Clear comparison
- **Pricing Cards**: All available tiers with features
- **Feature Comparison Table**: Detailed capability matrix
- **Call-to-Action**: Upgrade buttons and contact information

### Query Parameters

- `requiredTier`: The tier needed for access
- `currentTier`: User's current subscription level

### Pricing Structure

```typescript
const tierFeatures = {
  INDIVIDUAL: { name: 'Individual', price: '$49', features: [...] },
  TEAM: { name: 'Team', price: '$149', features: [...] },
  ENTERPRISE: { name: 'Enterprise', price: '$399', features: [...] }
};
```

## Security Considerations

### Authentication

- JWT token validation in middleware
- Secure session storage
- CSRF protection through NextAuth

### Authorization

- Role-based access control (RBAC)
- Tier-based feature gating
- Graceful degradation for insufficient permissions

### Data Protection

- No sensitive data exposed in client-side routing
- Server-side validation of access permissions
- Secure redirect handling

## Performance Optimizations

### Code Splitting

- Dynamic imports for heavy components
- Route-based code splitting
- Lazy loading of Power BI components

### Caching

- Static generation where possible
- API response caching
- CDN optimization for assets

### Loading States

- Skeleton screens for dashboard loading
- Progressive enhancement
- Error boundaries for graceful failure

## Testing Strategy

### Unit Tests

- Component rendering tests
- Access control logic validation
- Tier checking functions

### Integration Tests

- End-to-end routing scenarios
- Authentication flow testing
- Cross-tier access validation

### Manual Testing Scenarios

1. **Individual Tier User**:
   - Cannot access `/enterprise/dashboard`
   - Cannot access `/scenario/[id]`
   - Redirected to upgrade page

2. **Team Tier User**:
   - Can access `/scenario/[id]`
   - Cannot access `/enterprise/dashboard`
   - Redirected to upgrade for enterprise features

3. **Enterprise Tier User**:
   - Full access to all routes
   - Dashboard loads correctly
   - Scenario analysis available

## Future Enhancements

### Planned Features

1. **Role-Based Permissions**: Beyond tier-based access
2. **Custom Dashboard Creation**: User-configurable dashboards
3. **Advanced Scenario Modeling**: More complex financial projections
4. **API Rate Limiting**: Per-tier API usage limits
5. **Audit Logging**: Track feature usage by tier

### Scalability Considerations

- Database optimization for large datasets
- Caching strategies for frequently accessed data
- Load balancing for enterprise users
- CDN integration for global performance

This routing and UI implementation provides a robust foundation for tier-based access control while maintaining excellent user experience and security.
