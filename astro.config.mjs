// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build
export default defineConfig({
  // GitHub Pages (project site): served from https://avamartoma.github.io/personal-website/
  // Internal links use import.meta.env.BASE_URL so they respect this sub-path.
  //
  // ⮕ When you move to a custom domain (e.g. https://avamartoma.com):
  //     set `site: 'https://avamartoma.com'` and `base: '/'` (or delete base).
  //     Because links use BASE_URL, nothing else needs to change.
  site: 'https://avamartoma.github.io',
  base: '/personal-website',
  build: {
    // Emit clean, directory-style URLs: /projects/foo/ instead of /projects/foo.html
    format: 'directory',
  },
});
