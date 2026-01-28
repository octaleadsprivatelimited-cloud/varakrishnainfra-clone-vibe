# Google Search Console Setup Guide

This guide will help you set up Google Search Console for the Vara Krishna Infra website.

## Steps to Set Up Google Search Console

### 1. Access Google Search Console
- Go to [Google Search Console](https://search.google.com/search-console)
- Sign in with your Google account

### 2. Add Property
- Click "Add Property"
- Choose "URL prefix" method
- Enter: `https://varakrishnainfra.com`

### 3. Verify Ownership
You have several verification options:

#### Option A: HTML File Upload (Recommended)
1. Download the verification HTML file from Google Search Console
2. Upload it to the `public/` folder
3. Ensure it's accessible at: `https://varakrishnainfra.com/google1234567890.html` (or similar)
4. Click "Verify" in Google Search Console

#### Option B: HTML Tag
1. Copy the meta tag provided by Google
2. Add it to `index.html` in the `<head>` section
3. Example: `<meta name="google-site-verification" content="YOUR_CODE_HERE" />`

#### Option C: Domain Name Provider
1. Add a TXT record to your domain's DNS settings
2. Follow Google's instructions for your specific domain provider

### 4. Submit Sitemap
After verification:
1. Go to "Sitemaps" in the left menu
2. Enter: `https://varakrishnainfra.com/sitemap.xml`
3. Click "Submit"

### 5. Request Indexing (Optional)
- Use "URL Inspection" tool to request indexing for important pages
- Submit your homepage and key pages manually

## Important Files

- **Sitemap**: `public/sitemap.xml` - Automatically generated
- **Robots.txt**: `public/robots.txt` - Configured to allow all search engines
- **Verification File**: `public/google-site-verification.html` - Placeholder (replace with actual file from Google)

## SEO Features Implemented

✅ Structured Data (JSON-LD) for Organization
✅ Meta tags (title, description, keywords)
✅ Open Graph tags for social sharing
✅ Twitter Card tags
✅ Canonical URLs
✅ Robots.txt configuration
✅ XML Sitemap
✅ Custom 404 page with proper SEO
✅ Logo as default social sharing image

## Monitoring

After setup, regularly check:
- Coverage reports
- Performance metrics
- Mobile usability
- Core Web Vitals
- Indexing status

## Troubleshooting

If pages aren't being indexed:
1. Check robots.txt isn't blocking
2. Verify sitemap is accessible
3. Ensure pages have proper meta tags
4. Check for duplicate content issues
5. Verify canonical URLs are correct
