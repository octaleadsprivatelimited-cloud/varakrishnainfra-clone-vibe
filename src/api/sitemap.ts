// API route handler for dynamic sitemap generation
// This can be used with serverless functions or API routes

import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { demoProjects } from '@/data/demoProjects';

const BASE_URL = 'https://varakrishnainfra.com';

const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/projects', priority: '0.9', changefreq: 'weekly' },
  { path: '/services', priority: '0.8', changefreq: 'monthly' },
  { path: '/gallery', priority: '0.7', changefreq: 'weekly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
];

function formatDate(date: Date | any): string {
  if (!date) return new Date().toISOString().split('T')[0];
  if (date instanceof Date) return date.toISOString().split('T')[0];
  if (date?.toDate) return date.toDate().toISOString().split('T')[0];
  return new Date().toISOString().split('T')[0];
}

function generateSitemapXML(urls: Array<{
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}>): string {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  return xml;
}

export async function generateSitemap(): Promise<string> {
  const urls: Array<{
    loc: string;
    lastmod: string;
    changefreq: string;
    priority: string;
  }> = [];
  
  const today = new Date().toISOString().split('T')[0];

  // Add static pages
  staticPages.forEach(page => {
    urls.push({
      loc: `${BASE_URL}${page.path}`,
      lastmod: today,
      changefreq: page.changefreq,
      priority: page.priority
    });
  });

  // Fetch projects from Firebase
  try {
    const projectsRef = collection(db, 'projects');
    const q = query(projectsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      urls.push({
        loc: `${BASE_URL}/projects/${doc.id}`,
        lastmod: formatDate(data.updatedAt || data.createdAt),
        changefreq: 'monthly',
        priority: '0.6'
      });
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
  }

  // Add demo projects
  demoProjects.forEach(project => {
    urls.push({
      loc: `${BASE_URL}/projects/${project.id}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.6'
    });
  });

  // Generate XML
  return generateSitemapXML(urls);
}
