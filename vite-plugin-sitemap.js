import { execSync } from 'child_process';
import { resolve } from 'path';

export default function sitemapPlugin() {
  return {
    name: 'vite-plugin-sitemap',
    buildStart() {
      try {
        console.log('🔄 Generating sitemap before build...');
        execSync('node scripts/generate-sitemap.js', { 
          stdio: 'inherit',
          cwd: resolve(process.cwd())
        });
        console.log('✅ Sitemap generated successfully');
      } catch (error) {
        console.error('❌ Error generating sitemap:', error.message);
        // Don't fail the build if sitemap generation fails
      }
    },
    buildEnd() {
      // Optionally regenerate after build to ensure latest content
      try {
        console.log('🔄 Regenerating sitemap after build...');
        execSync('node scripts/generate-sitemap.js', { 
          stdio: 'inherit',
          cwd: resolve(process.cwd())
        });
      } catch (error) {
        console.error('❌ Error regenerating sitemap:', error.message);
      }
    }
  };
}
