// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build
export default defineConfig({
  // Served at the custom apex domain https://avamartoma.com/ via GitHub Pages.
  // `public/CNAME` binds the domain; internal links use import.meta.env.BASE_URL
  // (= '/'), so no `base` path is needed.
  site: 'https://avamartoma.com',
  build: {
    // Emit clean, directory-style URLs: /projects/foo/ instead of /projects/foo.html
    format: 'directory',
  },
});
