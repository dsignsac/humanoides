// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  // Output directory for Hostinger deployment
  outDir: './dist',

  vite: {
    plugins: [tailwindcss()]
  }
});