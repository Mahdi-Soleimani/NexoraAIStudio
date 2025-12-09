import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Route {
    path: string;
    priority: number;
    changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

// Define your routes with their priorities and change frequencies
const routes: Route[] = [
    { path: '/', priority: 1.0, changefreq: 'weekly' },
    { path: '/#/services', priority: 0.9, changefreq: 'monthly' },
    { path: '/#/portfolio', priority: 0.8, changefreq: 'weekly' },
    { path: '/#/academy', priority: 0.8, changefreq: 'weekly' },
    { path: '/#/about', priority: 0.7, changefreq: 'monthly' },
    { path: '/#/careers', priority: 0.7, changefreq: 'weekly' },
    { path: '/#/contact', priority: 0.6, changefreq: 'monthly' },
];

const BASE_URL = 'https://nexoraaistudio.tech';

function generateSitemap(): string {
    const today = new Date().toISOString().split('T')[0];

    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    routes.forEach(route => {
        sitemap += '  <url>\n';
        sitemap += `    <loc>${BASE_URL}${route.path}</loc>\n`;
        sitemap += `    <lastmod>${today}</lastmod>\n`;
        sitemap += `    <changefreq>${route.changefreq}</changefreq>\n`;
        sitemap += `    <priority>${route.priority}</priority>\n`;
        sitemap += '  </url>\n';
        if (route !== routes[routes.length - 1]) {
            sitemap += '  \n';
        }
    });

    sitemap += '</urlset>\n';

    return sitemap;
}

function saveSitemap(): void {
    const sitemap = generateSitemap();
    const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');

    fs.writeFileSync(outputPath, sitemap, 'utf-8');
    console.log('✅ Sitemap generated successfully at:', outputPath);
    console.log(`📊 Total URLs: ${routes.length}`);
}

// Run the script
try {
    saveSitemap();
} catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
}
