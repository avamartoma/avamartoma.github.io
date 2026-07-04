// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build
export default defineConfig({
  // Update `site` to your final deployed URL (e.g. https://avamartoma.com
  // or https://avamartoma.github.io). Used for canonical URLs & sitemaps.
  site: 'https://example.com',
  build: {
    // Emit clean, directory-style URLs: /projects/foo/ instead of /projects/foo.html
    format: 'directory',
  },
});
