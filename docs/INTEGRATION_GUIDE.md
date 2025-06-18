# Integration with northpathstrategies.org

1. **Sub‑domain:** Configure DNS `app.northpathstrategies.org` to point to Vercel deployment.  
2. **Shared Branding:** Import global CSS/Tailwind config from `@northpath‑ui/theme`.  
3. **Auth:**  
   * Use **Auth0** connection shared with CMS (`northpath‑cms`).  
   * Configure Application Callback URL: `https://app.northpathstrategies.org/api/auth/callback`.  
4. **Embed Widgets:**  
   * Use iframe or web components to embed dashboard cards back into the main marketing site.  
   * Expose public JSON feed `/api/status` for lightweight stats.  
5. **Analytics:** Send custom events to Google Analytics 4 property `UA‑NPSTRAT‑1`.  
