import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVbMgxL94eSyHrnks7gUdWK8kgaNSRUF4",
  authDomain: "varakrishnainfra.firebaseapp.com",
  projectId: "varakrishnainfra",
  storageBucket: "varakrishnainfra.firebasestorage.app",
  messagingSenderId: "428693020552",
  appId: "1:428693020552:web:a31d44439594ef9267243d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const BASE_URL = 'https://varakrishnainfra.com';
const SITEMAP_PATH = join(__dirname, '..', 'public', 'sitemap.xml');

// Static pages configuration
const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/projects', priority: '0.9', changefreq: 'weekly' },
  { path: '/services', priority: '0.8', changefreq: 'monthly' },
  { path: '/gallery', priority: '0.7', changefreq: 'weekly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
];

// Demo projects (always included)
const demoProjects = [
  'demo-1', 'demo-2', 'demo-3', 'demo-4', 'demo-5', 'demo-6',
  'demo-7', 'demo-8', 'demo-9', 'demo-10', 'demo-11', 'demo-12',
  'demo-13', 'demo-14', 'demo-15', 'demo-16', 'demo-17', 'demo-18',
  'demo-19', 'demo-20', 'demo-21', 'demo-22'
];

function formatDate(date) {
  if (!date) return new Date().toISOString().split('T')[0];
  if (date instanceof Date) return date.toISOString().split('T')[0];
  if (date.toDate) return date.toDate().toISOString().split('T')[0];
  return new Date().toISOString().split('T')[0];
}

function generateSitemapXML(urls) {
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

async function fetchProjects() {
  try {
    const projectsRef = collection(db, 'projects');
    const q = query(projectsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        updatedAt: data.updatedAt || data.createdAt || null,
      };
    });
  } catch (error) {
    console.error('⚠️  Error fetching projects from Firebase:', error.message);
    console.log('   Continuing with static pages and demo projects only...');
    return [];
  }
}

async function generateSitemap() {
  console.log('🚀 Generating sitemap...');
  
  const urls = [];
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
  const firebaseProjects = await fetchProjects();
  console.log(`📦 Found ${firebaseProjects.length} projects from Firebase`);

  // Add Firebase projects
  firebaseProjects.forEach(project => {
    urls.push({
      loc: `${BASE_URL}/projects/${project.id}`,
      lastmod: formatDate(project.updatedAt),
      changefreq: 'monthly',
      priority: '0.6'
    });
  });

  // Add demo projects
  demoProjects.forEach(projectId => {
    urls.push({
      loc: `${BASE_URL}/projects/${projectId}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.6'
    });
  });

  // Generate XML
  const xml = generateSitemapXML(urls);
  
  // Write to file
  writeFileSync(SITEMAP_PATH, xml, 'utf8');
  
  console.log(`✅ Sitemap generated successfully!`);
  console.log(`   Total URLs: ${urls.length}`);
  console.log(`   Static pages: ${staticPages.length}`);
  console.log(`   Firebase projects: ${firebaseProjects.length}`);
  console.log(`   Demo projects: ${demoProjects.length}`);
  console.log(`   Saved to: ${SITEMAP_PATH}`);
}

// Run the generator
generateSitemap().catch(error => {
  console.error('❌ Error generating sitemap:', error);
  // Don't exit with error code - allow build to continue even if sitemap fails
  // This ensures the build doesn't fail if Firebase is temporarily unavailable
  process.exit(0);
});
