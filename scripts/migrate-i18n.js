
import fs from 'node:fs';
import path from 'node:path';

const projectsDir = path.resolve('./public/proyectos');
const projects = fs.readdirSync(projectsDir);

projects.forEach(folder => {
    const infoPath = path.join(projectsDir, folder, 'info.json');
    if (!fs.existsSync(infoPath)) return;

    try {
        const data = JSON.parse(fs.readFileSync(infoPath, 'utf-8'));

        // Skip if already migrated
        if (data.es && data.en) {
            console.log(`Skipping ${folder}, already migrated.`);
            return;
        }

        const newData = {
            id: data.id,
            client: data.client,
            year: data.year,
            country: data.country,
            thumbnail: data.thumbnail,
            gallery: data.gallery,
            stack: data.stack,
            showOnLanding: data.showOnLanding, // Preserve if exists
            // i18n Fields
            es: {
                title: data.title || data.project, // specific fallback
                service: data.service,
                description: data.description
            },
            en: {
                title: data.title || data.project,
                service: data.service, // Todo: translate
                description: `[EN] ${data.description}` // Todo: translate
            }
        };

        fs.writeFileSync(infoPath, JSON.stringify(newData, null, 4));
        console.log(`Migrated ${folder}`);

    } catch (e) {
        console.error(`Error migrating ${folder}:`, e);
    }
});
