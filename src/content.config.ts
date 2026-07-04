import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Each project is a Markdown file in src/content/projects/.
// Frontmatter is validated against this schema at build time.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    // Short one-liner shown on cards and in the hero list.
    blurb: z.string(),
    // Longer description used for meta tags / intro on the detail page.
    description: z.string().optional(),
    // ISO date — used for sorting (newest first).
    date: z.coerce.date(),
    // Free-form tags: languages, tools, themes.
    tags: z.array(z.string()).default([]),
    // Optional external links.
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    // Optional cover image path (relative to /public) e.g. "/images/foo.jpg".
    cover: z.string().optional(),
    // A two-color accent pair drives the card's generative artwork.
    accent: z.string().default('#ff5c39'),
    accentAlt: z.string().default('#3d5afe'),
    // Set true to feature prominently / hide from the grid.
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
