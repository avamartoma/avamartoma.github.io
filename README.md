# personal-website

Ava's personal website — a catalogue of projects with an **artsy-engineer**
aesthetic. Static site built with [Astro](https://astro.build), no backend.

Projects are just Markdown files, so adding to the catalogue is quick and the
whole thing deploys for free.

> 📋 **Project status & full context:** see [`HANDOVER.md`](./HANDOVER.md) — a
> living dashboard of current state, decisions, and backlog (also used to
> re-onboard a fresh Kiro/agent session).

---

## Quick start

```bash
npm install      # install dependencies
npm run dev      # local dev server at http://localhost:4321
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

Requires Node 18+ (developed on Node 20/24).

---

## Adding a project

Create a new Markdown file in `src/content/projects/`. The filename becomes
the URL slug (e.g. `aurora.md` → `/projects/aurora/`).

```markdown
---
title: "My New Thing"
blurb: "One punchy sentence for the card and hero."
description: "Optional longer text for SEO / social previews."
date: 2026-01-15          # controls sort order (newest first)
tags: ["TypeScript", "WebGL"]
repo: "https://github.com/avamartoma/my-thing"   # optional
demo: "https://example.com/my-thing"             # optional
cover: "/images/projects/my-thing/cover.jpg"  # optional; omit for generative artwork
accent: "#ff5c39"        # drives the generated artwork + hover color
accentAlt: "#3d5afe"
featured: false          # optional
draft: false             # set true to hide from the site
---

## Write freely

Standard Markdown below the frontmatter — headings, code blocks, lists,
images, blockquotes are all styled.
```

- **No cover image?** Leave `cover` off and the card/banner draws a generative
  gradient from your `accent`/`accentAlt` colors.
- **With a cover image?** Drop the file in `public/images/projects/<slug>/` and
  reference it as `/images/projects/<slug>/filename.jpg`.
- **Multiple photos?** Group them into a swipeable carousel with a
  `<div class="carousel" data-carousel>…<img>…</div>` block (prev/next arrows and
  dots are generated automatically). See `src/content/projects/marquetry-desk.md`.

Save the file, and it appears in the grid automatically. Frontmatter is
validated at build time (see `src/content.config.ts`) — a typo'd field will
fail the build with a clear message.

---

## Project structure

```
src/
  components/    Nav, Footer, Hero (bio + interactive canvas), Experience,
                 NowPlaying, GitHubActivity, ProjectRow, ProjectCard, ResumeModal
  content/
    projects/    ← your project Markdown lives here
  lib/
    categories.ts            maps project tags → discipline filters on /work
  layouts/       Layout.astro (fonts, custom cursor, scroll reveals)
  pages/
    index.astro              homepage (hero + work + lately + experience + communities)
    work.astro               full project catalogue with tag filters
    gallery.astro            image gallery
    resume.astro             resume page
    projects/[...slug].astro project detail page
    rss.xml.js               RSS feed
    404.astro                playful not-found page
  styles/global.css          design system (palette, type, grain, cursor)
public/          static assets (favicon, images)
```

### Where the site copy lives

- **Bio / intro** (eyebrow, tagline, lede, tools list) — `src/components/Hero.astro`
- **Projects** — one Markdown file each in `src/content/projects/`
- **Communities** — the `communities` array in the frontmatter of
  `src/pages/index.astro` (name + blurb + optional photo/video media)
- **Experience timeline** — `src/components/Experience.astro`

### The "artsy-engineer" touches

- Custom cursor (dot + lerped ring) — `Layout.astro`
- Cursor-reactive dot-field canvas in the hero — `Hero.astro`
- Film-grain overlay + acid/ink palette — `global.css`
- Scroll-reveal animations via `IntersectionObserver`
- Generative per-project artwork from accent colors — `ProjectCard.astro`
- All motion respects `prefers-reduced-motion`.

---

## Deploying

Pick one. Update `site` in `astro.config.mjs` to your final URL first (used for
canonical tags).

### Netlify (recommended, zero-config)
`netlify.toml` is already set up. In Netlify: **Add new site → Import from
Git**, pick this repo, done. Build command `npm run build`, publish `dist/`.

### Vercel
Import the repo at vercel.com — it auto-detects Astro. No config needed.

### GitHub Pages
A workflow is included at `.github/workflows/deploy.yml`. Enable it via
**Settings → Pages → Source: GitHub Actions**.

> ⚠️ If you deploy to a GitHub *project* page
> (`https://avamartoma.github.io/personal-website/`), the site lives under a
> sub-path. Set `base: '/personal-website'` and
> `site: 'https://avamartoma.github.io'` in `astro.config.mjs`. If you use a
> custom domain or a user page (`avamartoma.github.io`), leave `base` unset.

---

## A note on dependencies

`npm audit` currently flags Astro advisories whose only fix is a jump to
**Astro 7** (a breaking major release). This project pins the latest patched
**5.x** (`5.18.2`). Because the site is fully static — no SSR, no middleware,
no server islands, and all content is self-authored (no untrusted input) — the
flagged issues don't apply to the deployed output. Upgrade to Astro 7
deliberately when you're ready to handle its breaking changes.
