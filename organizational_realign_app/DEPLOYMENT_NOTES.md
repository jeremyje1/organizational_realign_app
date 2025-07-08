# NorthPath Strategies Deployment Notes

## Repository and Deployment Structure

### GitHub Repository
- **Repository**: organizational-realign-app
- **Branch Structure**:
  - `main`: Primary branch for production deployments
  - `clean`: Development branch used for implementing new features

### Vercel Deployment
- **Project Name**: organizational-realign-app
- **Connected Domains**:
  - northpathstrategies.org
  - www.northpathstrategies.org
  - app.northpathstrategies.org

## PDF Downloads and Static Assets

### File Structure
- PDF files and other static downloads should be placed in: `/public/downloads/`
- Images and other media should be placed in: `/public/images/`

### Important Notes
1. **Browser Caching**: When deploying updates to static files (like PDFs):
   - Users may need to clear their browser cache to see the updated files
   - Testing should be done in multiple browsers or in private/incognito mode
   - Use cache-busting techniques when needed (e.g., adding query parameters to URLs)

2. **Deployment Verification**:
   - After deployment, verify that all static files are accessible by directly navigating to their URLs
   - Example: `https://www.northpathstrategies.org/downloads/NorthPath_Strategies_Profile.pdf`
   - Use `curl -I [URL]` to check HTTP response codes without browser cache interference

3. **Redirects**:
   - The `/resources/overview` path redirects to `/downloads/NorthPath_Strategies_Profile.pdf`
   - Any changes to file paths require corresponding updates to redirect pages

## Deployment Process

1. **Generate/Update Assets**:
   - For PDF generation, run: `python3 scripts/generate_pdf.py`
   - Verify the PDF is correctly generated in the `/public/downloads/` directory

2. **Commit Changes**:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin clean  # or main for direct production updates
   ```

3. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

4. **Verify Deployment**:
   - Check static file URLs work correctly
   - Test the "Download Overview" button functionality
   - Verify redirects are working properly
   ```bash
   curl -I https://www.northpathstrategies.org/resources/overview
   curl -I https://www.northpathstrategies.org/downloads/NorthPath_Strategies_Profile.pdf
   ```

5. **Troubleshooting**:
   - If files appear to be missing despite being included in the deployment:
     - Check for browser caching issues
     - Verify file permissions and paths
     - Examine the Vercel build logs for any errors
   - If redirects aren't working:
     - Verify the Next.js configuration in `next.config.js`
     - Check the implementation of the redirect page

## Maintenance

When updating the PDF or other static files:

1. Generate/replace the file in the appropriate directory
2. Test locally using `npm run dev`
3. Deploy and verify on production
4. Communicate to team members that they may need to clear cache to see changes
