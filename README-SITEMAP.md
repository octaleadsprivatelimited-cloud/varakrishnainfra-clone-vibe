# Dynamic Sitemap Generation

This project includes an automatic sitemap generation system that updates whenever new content is added to the website.

## How It Works

The sitemap is automatically generated in two ways:

### 1. **Build-Time Generation** (Automatic)
- The sitemap is automatically generated before each build
- Runs via Vite plugin during `npm run build`
- Includes all static pages, Firebase projects, and demo projects

### 2. **Manual Generation** (On-Demand)
You can manually regenerate the sitemap at any time:

```bash
npm run generate-sitemap
```

## What's Included in the Sitemap

The sitemap automatically includes:

1. **Static Pages:**
   - Homepage (/)
   - About (/about)
   - Projects (/projects)
   - Services (/services)
   - Gallery (/gallery)
   - Contact (/contact)

2. **Firebase Projects:**
   - All projects from Firestore collection 'projects'
   - Automatically fetched and included
   - Uses project ID for URLs: `/projects/{projectId}`

3. **Demo Projects:**
   - All demo projects (demo-1 through demo-22)
   - Always included for reference

## Automatic Updates

### During Build
The sitemap is automatically regenerated:
- Before each production build (`npm run build`)
- Ensures latest content is included in the sitemap

### After Content Changes
When you add new projects via the admin panel:
1. The project is saved to Firebase
2. On the next build, the sitemap will automatically include it
3. Or run `npm run generate-sitemap` manually to update immediately

## Deployment Considerations

### Static Hosting (Netlify, Vercel, etc.)
- The sitemap is generated during build
- The `public/sitemap.xml` file is included in the build output
- No additional configuration needed

### Server-Side Rendering
If you need dynamic sitemap generation at runtime:
- Use the `src/api/sitemap.ts` module
- Create an API route that calls `generateSitemap()`
- Serve the XML response with proper headers

## Google Search Console

1. Submit your sitemap URL: `https://varakrishnainfra.com/sitemap.xml`
2. Google will automatically crawl and index new URLs
3. The sitemap updates automatically on each build

## Troubleshooting

### Sitemap not updating?
1. Check Firebase connection in `scripts/generate-sitemap.js`
2. Verify Firebase credentials are correct
3. Run `npm run generate-sitemap` manually to see errors

### Missing projects?
- Ensure projects are saved to Firestore collection 'projects'
- Check that projects have proper `createdAt` or `updatedAt` fields
- Verify Firebase permissions allow reading the projects collection

## File Structure

```
├── scripts/
│   └── generate-sitemap.js    # Node.js script for sitemap generation
├── src/
│   └── api/
│       └── sitemap.ts          # API module for dynamic generation
├── public/
│   └── sitemap.xml             # Generated sitemap file
└── vite-plugin-sitemap.js      # Vite plugin for build-time generation
```

## Customization

To add more URLs to the sitemap, edit `scripts/generate-sitemap.js`:

```javascript
// Add custom static pages
const staticPages = [
  // ... existing pages
  { path: '/new-page', priority: '0.7', changefreq: 'monthly' },
];
```

## Notes

- The sitemap uses `https://varakrishnainfra.com` as the base URL
- All dates are formatted as ISO 8601 (YYYY-MM-DD)
- Priority values range from 0.0 to 1.0
- Change frequency can be: always, hourly, daily, weekly, monthly, yearly, never
