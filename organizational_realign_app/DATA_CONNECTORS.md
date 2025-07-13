# Data Connectors Implementation

This document describes the data connectors implementation for the organizational realignment application.

## 5.1 Flat-file Import

### Overview

The flat-file import functionality allows users to upload CSV and XLSX files containing organizational data.

### API Endpoint

- **URL**: `/api/upload`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`

### Supported File Types

- CSV files (`.csv`)
- Excel files (`.xlsx`)

### File Mappings

#### positions.csv → Position Table

**Required Columns:**

- `Position_ID` or `positionId` - Unique position identifier
- `Title` - Position title

**Optional Columns:**

- `Unit_ID` or `unitId` - Associated organizational unit
- `FTE` - Full-time equivalent (decimal)
- `Salary` - Annual salary
- `Benefits_%` or `benefitsPercent` - Benefits percentage
- `Vacant_YN` or `vacant` - Whether position is vacant (Y/N, true/false)

**Example:**

```csv
Position_ID,Unit_ID,Title,FTE,Salary,Benefits_%,Vacant_YN
P001,U001,Software Engineer,1.0,95000,25,N
P002,U001,Senior Developer,1.0,120000,25,N
```

#### org_units.csv → OrgUnit Table

**Required Columns:**

- `Unit_ID` or `unitId` - Unique unit identifier
- `Name` - Unit name

**Optional Columns:**

- `Parent_ID` or `parentId` - Parent unit identifier
- `Type` - Unit type (Department, Team, etc.)
- `Location` - Physical location

**Example:**

```csv
Unit_ID,Parent_ID,Name,Type,Location
U001,,Engineering,Department,Building A
U002,U001,Software Development,Team,Building A - Floor 2
```

### Usage Example

```javascript
const formData = new FormData();
formData.append("file", file);

const response = await fetch("/api/upload", {
  method: "POST",
  body: formData,
});

const result = await response.json();
// Returns: { success: true, fileName: "positions.csv", recordsProcessed: 5, tables: ["Position"] }
```

### Library: parseUploads.ts

Located at `/lib/parseUploads.ts`, this utility handles:

- File parsing (CSV and XLSX)
- Column mapping and validation
- Data transformation
- Error handling

## 5.2 External API Integration (Workday)

### Overview

Integration with Workday HCM system to pull position and organizational unit data.

### Service: workday.ts

Located at `/services/integrations/workday.ts`

### Available Functions

#### pullWorkdayPositions(apiKey)

Fetches position data from Workday API.

**Parameters:**

- `apiKey` (string) - Workday API authentication key

**Returns:**

```typescript
{
  positions: WorkdayPosition[];
  totalCount: number;
  hasMore: boolean;
  nextPage?: string;
}
```

**Usage:**

```javascript
import { pullWorkdayPositions } from "@/services/integrations/workday";

const positions = await pullWorkdayPositions("your-api-key");
```

#### pullWorkdayOrgUnits(apiKey)

Fetches organizational unit data from Workday API.

#### testWorkdayConnection(apiKey)

Tests connectivity to Workday API.

### API Endpoint

- **URL**: `/api/integrations/workday`
- **Methods**: `GET`, `POST`

### GET Requests

**Query Parameters:**

- `apiKey` (required) - Workday API key
- `action` - Action to perform: `test`, `positions`, `org-units`

**Examples:**

```bash
# Test connection
GET /api/integrations/workday?action=test&apiKey=your-key

# Fetch positions
GET /api/integrations/workday?action=positions&apiKey=your-key

# Fetch org units
GET /api/integrations/workday?action=org-units&apiKey=your-key
```

### POST Requests

**Body:**

```json
{
  "apiKey": "your-api-key",
  "action": "sync-positions" | "sync-org-units"
}
```

**Example:**

```javascript
const response = await fetch("/api/integrations/workday", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    apiKey: "your-key",
    action: "sync-positions",
  }),
});
```

## Testing

### Test Files

Sample test files are provided:

- `test-positions.csv` - Sample position data
- `test-org_units.csv` - Sample organizational unit data
- `test-data-connectors.sh` - Test script

### Running Tests

```bash
# Make test script executable
chmod +x test-data-connectors.sh

# Run tests (requires development server to be running)
./test-data-connectors.sh
```

## Error Handling

### Upload Errors

- Invalid file type
- Missing required columns
- Empty files
- Parse errors

### API Integration Errors

- Invalid API key
- Network connectivity issues
- Rate limiting
- Invalid response format

All errors are returned in a consistent format:

```json
{
  "error": "Error message",
  "message": "Detailed error description"
}
```

## Dependencies

### Required NPM Packages

- `xlsx` - Excel file parsing
- `@types/xlsx` - TypeScript definitions

### Installation

```bash
npm install xlsx --legacy-peer-deps
npm install --save-dev @types/xlsx --legacy-peer-deps
```

## Security Considerations

1. **API Key Management**: Store Workday API keys securely (environment variables)
2. **File Validation**: Validate file types and content before processing
3. **Rate Limiting**: Implement rate limiting for API endpoints
4. **Input Sanitization**: Sanitize uploaded file content
5. **Authentication**: Ensure proper user authentication before allowing uploads

## Future Enhancements

1. **Database Persistence**: Store uploaded data in database tables
2. **Data Validation**: Enhanced validation rules and business logic
3. **Batch Processing**: Support for large file uploads
4. **Additional Integrations**: Support for other HR systems (SAP, Oracle, etc.)
5. **Data Mapping UI**: Visual interface for column mapping
6. **Scheduling**: Automated data sync on schedules
7. **Audit Trail**: Track data import/sync activities
