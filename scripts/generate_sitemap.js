
import fs from 'node:fs';
import path from 'node:path';

const BASE_URL = 'https://humanoidesyasociados.com';
const PROJECTS_DIR = path.resolve('public/proyectos');
const PUBLIC_DIR = path.resolve('public');

// Static pages
const staticPages = [
    '',
    '/privacidad'
];

// Get projects
const getProjects = () => {
    if (!fs.existsSync(PROJECTS_DIR)) return [];

    return fs.readdirSync(PROJECTS_DIR)
        .map(folder => {
            const infoPath = path.join(PROJECTS_DIR, folder, 'info.json');
            if (fs.existsSync(infoPath)) {
                try {
                    const data = JSON.parse(fs.readFileSync(infoPath, 'utf-8'));
                    // Only include if showOnLanding is not explicitly false, or if it has a direct page (assuming all have pages)
                    // The user recently enabled 'la-carniceria', so we should include all valid projects.
                    return data.id;
                } catch (e) {
                    return null;
                }
            }
            return null;
        })
        .filter(Boolean);
};

const generateSitemap = () => {
    const projects = getProjects();

    const urls = [
        ...staticPages.map(url => `${BASE_URL}${url}`),
        ...projects.map(id => `${BASE_URL}/projects/${id}`)
    ];

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `    <url>
        <loc>${url}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${url === BASE_URL ? '1.0' : '0.8'}</priority>
    </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapContent);
    console.log('Sitemap generated successfully at public/sitemap.xml');
};

generateSitemap();
