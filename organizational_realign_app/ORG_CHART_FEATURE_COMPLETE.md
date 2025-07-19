# Org Chart Generator - Feature Documentation

## Overview

The Org Chart Generator is a comprehensive feature that transforms assessment data into interactive organizational charts with scenario-based cost modeling. This feature provides a complete solution for visualizing organizational structures, analyzing costs, and exploring different organizational scenarios.

## 🏗️ Architecture

### Data Flow

```
Assessment Data → Role Extraction → Hierarchy Building → Cost Modeling → Visualization
```

### Core Components

#### 1. **Data Layer**

- **Prisma Models**: `OrgChart`, `PositionCost`
- **Database Operations**: `lib/org-chart-db.ts`
- **Assessment Integration**: Extracts role data from assessment responses

#### 2. **Business Logic**

- **Costing Engine**: `lib/costing.ts` - Tree building, cost estimation, scenario generation
- **Chart Builder**: `lib/chart-builder.ts` - SVG generation, layout optimization, export functions

#### 3. **API Layer**

- **Generate Endpoint**: `POST /api/chart/generate` - Creates new org charts
- **Retrieval Endpoint**: `GET /api/chart/[assessmentId]` - Fetches existing charts
- **Format Support**: JSON, SVG, CSV exports

#### 4. **Frontend Components**

- **OrgChartGenerator**: Main generation interface with export options
- **OrgChartViewer**: Interactive D3-powered chart visualization
- **ScenarioSidebar**: Cost comparison and scenario modeling
- **OrgChartPage**: Complete integrated experience

## 🚀 Features

### Chart Generation

- **One-Click Generation**: Automatically extracts roles from assessment data
- **Hierarchical Structure**: Builds proper org tree with reporting relationships
- **Cost Estimation**: Applies industry-standard salary ranges and benefits
- **Issue Detection**: Identifies structural problems and inconsistencies

### Visualization

- **Interactive Chart**: D3-powered org chart with zoom, pan, and node selection
- **Color Coding**: Visual hierarchy representation by organizational level
- **Node Details**: Click-to-view detailed role information
- **Responsive Design**: Works on desktop and mobile devices

### Scenario Modeling

- **Current State**: Baseline organizational cost and structure
- **Optimized Scenario**: Cost-reduced version with efficiency improvements
- **Expanded Scenario**: Growth-oriented organizational structure
- **Custom Scenarios**: User-defined multipliers for cost projection

### Export Options

- **SVG Export**: High-quality vector graphics for presentations
- **CSV Export**: Spreadsheet-compatible data for further analysis
- **JSON Export**: Machine-readable format for integration

## 📊 Data Models

### OrgChart Model

```typescript
{
  id: string;
  assessmentId: string;
  chartData: string; // JSON serialized org tree
  svgContent: string; // Generated SVG content
  scenarios: string; // JSON serialized scenarios
  metadata: any; // Generation metadata and stats
  createdAt: Date;
  updatedAt: Date;
}
```

### PositionCost Model

```typescript
{
  id: string;
  positionTitle: string;
  baseAnnualSalary: number;
  benefits: number;
  totalCost: number;
  level: number;
  department: string;
  region: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🛠️ Implementation Details

### Role Extraction

The system intelligently extracts role information from assessment responses:

- Parses structured role arrays from question responses
- Handles various response formats and question types
- Creates fallback structure when no role data is found
- Validates role relationships and hierarchy

### Cost Calculation

Cost estimation uses a sophisticated multi-factor approach:

- **Base Salary**: Industry-standard ranges by role level
- **Benefits Multiplier**: 1.3x base salary (health, retirement, etc.)
- **Regional Adjustments**: Location-based cost scaling
- **Custom Rates**: User-defined overrides for specific roles

### Scenario Generation

Three built-in scenarios provide different organizational perspectives:

- **Current**: Actual costs based on existing structure
- **Optimized**: 15-25% cost reduction through efficiency
- **Expanded**: 20-50% increase for growth scenarios

### SVG Generation

Server-side SVG creation provides:

- **Scalable Graphics**: Vector-based charts for any size
- **Professional Output**: Print-ready quality for presentations
- **Custom Styling**: Branded colors and typography
- **Layout Optimization**: Automatic node positioning and spacing

## 🧪 Testing

### Automated Testing

```bash
# Run the comprehensive test suite
./test-org-chart-system.sh
```

Tests cover:

- TypeScript compilation
- ESLint validation
- Database schema validation
- File existence checks
- Import/export verification
- Component structure validation

### Manual Testing

1. **Generate Chart**: Create new org chart from assessment
2. **View Chart**: Interact with D3 visualization
3. **Scenarios**: Compare different cost models
4. **Export**: Download SVG and CSV formats
5. **Error Handling**: Test with invalid assessment data

## 📱 Usage Guide

### For Administrators

1. Navigate to assessment details page
2. Click "Generate Org Chart" button
3. Review generated structure and scenarios
4. Export charts for stakeholder presentations
5. Use scenario data for budget planning

### For Users

1. Complete organizational assessment
2. Access org chart from assessment results
3. Explore interactive visualization
4. Compare different organizational scenarios
5. Download charts for team discussions

## 🔧 Configuration

### Environment Variables

```bash
# Database connection (required for persistence)
DATABASE_URL="postgresql://..."

# Optional: Custom cost rates
DEFAULT_SALARY_MULTIPLIER=1.3
REGIONAL_COST_ADJUSTMENT=1.0
```

### Customization Options

- **Cost Rates**: Modify salary ranges in `lib/costing.ts`
- **Colors**: Update theme in `components/OrgChartViewer.tsx`
- **Layout**: Adjust spacing and sizing in chart builder
- **Scenarios**: Add custom scenario types in costing engine

## 🚨 Error Handling

### Common Issues

- **No Role Data**: Assessment contains no extractable role information
- **Invalid Hierarchy**: Circular references or orphaned roles
- **Database Errors**: Connection issues or schema mismatches
- **Generation Failures**: Malformed data or processing errors

### Recovery Strategies

- **Fallback Structure**: Creates default CEO role when no data found
- **Issue Reporting**: Detailed error messages with corrective actions
- **Graceful Degradation**: Continues operation with warnings
- **Manual Intervention**: Admin tools for data correction

## 🔮 Future Enhancements

### Planned Features

- **Real-time Collaboration**: Multi-user chart editing
- **Advanced Analytics**: Cost trend analysis and forecasting
- **Integration APIs**: Connect with HRIS and financial systems
- **Custom Templates**: Industry-specific org chart templates
- **Performance Metrics**: Role efficiency and cost optimization suggestions

### Technical Improvements

- **Caching Layer**: Redis cache for faster chart generation
- **Background Processing**: Queue-based chart generation for large orgs
- **Version Control**: Track org chart changes over time
- **Advanced Export**: PowerPoint and PDF generation
- **Mobile App**: Native iOS/Android org chart viewer

## 📞 Support

For technical issues or feature requests:

1. Check the automated test results
2. Review error logs in browser console
3. Verify database connectivity and schema
4. Contact development team with reproduction steps

---

**Version**: 1.0.0  
**Last Updated**: December 2024  
**Author**: NorthPath Strategies
