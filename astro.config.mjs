// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build
export default defineConfig({
  // Served at the ROOT of a GitHub user page: https://avamartoma.github.io/
  // (requires the repo to be named "avamartoma.github.io"). No base path.
  //
  // ⮕ If you later use a custom domain, just change `site` to it; because
  //   internal links use import.meta.env.BASE_URL (= '/'), nothing else changes.
  site: 'https://avamartoma.github.io',
  build: {
    // Emit clean, directory-style URLs: /projects/foo/ instead of /projects/foo.html
    format: 'directory',
  },
});
