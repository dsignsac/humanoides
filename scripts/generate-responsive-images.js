import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const SIZES = {
    small: 400,
    medium: 800,
    large: 1200
};

async function generateResponsiveImages() {
    const projectsDir = './public/proyectos';
    const folders = await fs.readdir(projectsDir);

    for (const folder of folders) {
        const folderPath = path.join(projectsDir, folder);
        const stat = await fs.stat(folderPath);

        if (!stat.isDirectory()) continue;

        const files = await fs.readdir(folderPath);
        const images = files.filter(f =>
            /\.(jpg|jpeg|png|webp)$/i.test(f) &&
            !/-(small|medium|large)\.webp$/i.test(f)
        );

        for (const image of images) {
            const imagePath = path.join(folderPath, image);
            const ext = path.extname(image);
            const basename = path.basename(image, ext);

            console.log(`Processing ${folder}/${image}...`);

            // Generate different sizes
            for (const [sizeName, width] of Object.entries(SIZES)) {
                try {
                    const outputPath = path.join(folderPath, `${basename}-${sizeName}.webp`);

                    await sharp(imagePath)
                        .resize(width, null, {
                            withoutEnlargement: true,
                            fit: 'inside'
                        })
                        .webp({ quality: 80 })
                        .toFile(outputPath);

                    console.log(`  ✓ Generated ${sizeName} (${width}px)`);
                } catch (err) {
                    console.error(`  ✗ Error generating ${sizeName}:`, err.message);
                }
            }
        }
    }

    console.log('\n✅ Done! Responsive images generated.');
}

generateResponsiveImages().catch(console.error);
