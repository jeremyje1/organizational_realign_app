# Power BI Configuration for app.northpathstrategies.org

## Overview
This guide covers configuring Power BI to whitelist and allow embedding from the production domain `app.northpathstrategies.org`.

## Prerequisites
- Power BI Pro or Premium license
- Admin access to Power BI tenant
- Azure AD application registration
- Service principal configured

## Step 1: Power BI Admin Portal Configuration

### 1.1 Access Admin Portal
1. Go to [Power BI Admin Portal](https://app.powerbi.com/admin-portal)
2. Navigate to **Tenant Settings**

### 1.2 Enable Embed Content Settings
1. Scroll to **Developer settings**
2. Find **Embed content in apps**
3. Toggle to **Enabled**
4. Select **Specific security groups** or **Entire organization**
5. Add allowed domains:
   ```
   app.northpathstrategies.org
   https://app.northpathstrategies.org
   *.northpathstrategies.org
   ```

### 1.3 Configure Service Principal Settings
1. Find **Service principals can use Power BI APIs**
2. Toggle to **Enabled**
3. Select **Specific security groups**
4. Add your application's service principal

### 1.4 Additional Required Settings
Enable the following settings:
- **Allow service principals to use read-only admin APIs**
- **Enhance admin APIs responses with detailed metadata**
- **Enhance admin APIs responses with DAX and mashup expressions**

## Step 2: Azure AD App Registration

### 2.1 Update App Registration
1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory > App registrations**
3. Select your Power BI application

### 2.2 Configure Authentication
1. Go to **Authentication**
2. Add redirect URIs:
   ```
   https://app.northpathstrategies.org/api/auth/callback/powerbi
   https://app.northpathstrategies.org/dashboard
   https://app.northpathstrategies.org/enterprise/dashboard
   ```
3. Enable **Access tokens** and **ID tokens**

### 2.3 API Permissions
Ensure the following permissions are granted:
- **Power BI Service (Microsoft.PowerBI)**
  - `Dataset.Read.All`
  - `Report.Read.All` 
  - `Workspace.Read.All`
  - `Dashboard.Read.All`
- **Microsoft Graph**
  - `User.Read`

### 2.4 Generate Client Secret
1. Go to **Certificates & secrets**
2. Click **New client secret**
3. Add description: "Production Power BI Embed"
4. Set expiration: **24 months**
5. Copy the secret value (add to environment variables)

## Step 3: Power BI Workspace Configuration

### 3.1 Create/Configure Workspace
1. Create a dedicated workspace for the application
2. Set workspace name: **NorthPath Analytics Production**
3. Configure as **Premium** workspace if available

### 3.2 Add Service Principal
1. Go to workspace **Settings**
2. Click **Access**
3. Add service principal as **Admin** or **Member**
4. Use the Application ID from Azure AD

### 3.3 Upload Reports and Datasets
1. Upload your .pbix files to the workspace
2. Configure data refresh schedules
3. Test report rendering

## Step 4: Environment Variables

Add the following to Vercel environment variables:

```env
# Power BI Configuration
POWERBI_CLIENT_ID=<azure_app_client_id>
POWERBI_CLIENT_SECRET=<azure_app_client_secret>
POWERBI_TENANT_ID=<azure_tenant_id>
POWERBI_WORKSPACE_ID=<power_bi_workspace_id>
POWERBI_REPORT_ID=<main_report_id>

# Public URLs
NEXT_PUBLIC_POWERBI_EMBED_URL=https://app.powerbi.com/reportEmbed
```

## Step 5: Application Configuration

### 5.1 Update Power BI Component
Ensure your Power BI embed component includes the correct domain configuration:

```typescript
// components/PowerBIEmbed.tsx
const embedConfig = {
  type: 'report',
  id: process.env.POWERBI_REPORT_ID,
  embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${reportId}&groupId=${workspaceId}`,
  accessToken: accessToken,
  settings: {
    filterPaneEnabled: false,
    navContentPaneEnabled: false,
    background: models.BackgroundType.Transparent,
    layoutType: models.LayoutType.FitToWidth,
    // Whitelist the production domain
    allowedHosts: ['app.northpathstrategies.org']
  }
};
```

### 5.2 Update CORS Settings
Ensure your API routes include proper CORS headers for Power BI:

```typescript
// Headers in vercel.json already configured for:
"Access-Control-Allow-Origin": "https://app.northpathstrategies.org"
```

## Step 6: Testing and Validation

### 6.1 Test Embed Token Generation
```bash
# Test the Power BI API endpoint
curl -X POST https://app.northpathstrategies.org/api/powerbi/token \
  -H "Authorization: Bearer <session_token>" \
  -H "Content-Type: application/json"
```

### 6.2 Validate Report Embedding
1. Navigate to `https://app.northpathstrategies.org/enterprise/dashboard`
2. Check browser console for any CORS errors
3. Verify reports load correctly
4. Test interactive features

### 6.3 Check Network Requests
Monitor network tab for:
- Successful token requests to Power BI API
- Proper embed URL generation
- No blocked requests due to CORS

## Step 7: Troubleshooting

### Common Issues

#### 1. CORS Errors
```
Access to XMLHttpRequest at 'https://api.powerbi.com/...' from origin 'https://app.northpathstrategies.org' has been blocked
```
**Solution**: Ensure domain is added to Power BI admin settings

#### 2. Authentication Failures
```
Unauthorized access to Power BI API
```
**Solution**: Verify service principal permissions and client secret

#### 3. Report Not Found
```
Report with ID 'xxx' not found
```
**Solution**: Check workspace permissions and report ID

### Debug Commands
```bash
# Check Power BI service status
curl https://api.powerbi.com/v1.0/myorg/admin/workspaces

# Test authentication
curl -X POST https://login.microsoftonline.com/<tenant-id>/oauth2/v2.0/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials&client_id=<client-id>&client_secret=<client-secret>&scope=https://analysis.windows.net/powerbi/api/.default"
```

## Step 8: Security Considerations

### 8.1 Access Control
- Use row-level security (RLS) in Power BI
- Implement proper user authentication
- Generate tokens with limited scope

### 8.2 Token Management
- Set appropriate token expiration (1 hour recommended)
- Implement token refresh logic
- Never expose tokens in client-side code

### 8.3 Monitoring
- Set up alerts for failed embed requests
- Monitor token usage and regeneration
- Track unauthorized access attempts

## Step 9: Production Checklist

- [ ] Power BI admin settings updated with production domain
- [ ] Azure AD app registration configured
- [ ] Service principal added to workspace
- [ ] Environment variables set in Vercel
- [ ] Reports uploaded and tested
- [ ] CORS headers configured
- [ ] Embed tokens generating successfully
- [ ] Reports loading on production domain
- [ ] Interactive features working
- [ ] Error handling implemented
- [ ] Security measures in place
- [ ] Monitoring configured

## Support Resources

- [Power BI Embedding Documentation](https://docs.microsoft.com/en-us/power-bi/developer/embedded/)
- [Azure AD App Registration Guide](https://docs.microsoft.com/en-us/azure/active-directory/develop/)
- [Power BI REST API Reference](https://docs.microsoft.com/en-us/rest/api/power-bi/)
- [Power BI Admin Portal Guide](https://docs.microsoft.com/en-us/power-bi/admin/)
