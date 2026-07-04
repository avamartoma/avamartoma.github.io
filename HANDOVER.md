# 🛰️ Handover Dashboard — personal-website

> **Living document.** Read the top for status. Scroll for full context.
> A fresh Kiro/agent session should read this end-to-end before touching the repo —
> §9 "Agent Re-Onboarding Brief" is written specifically for that.

| | |
|---|---|
| **Project** | Ava Martoma — personal project catalogue |
| **Status** | 🟢 Building clean · dev server verified · committed, **not pushed** |
| **Repo** | `git@github.com:avamartoma/personal-website.git` (personal GitHub) |
| **Branch** | `main` |
| **Last commit** | `69b355e` — feat: Build artsy-engineer project catalogue site |
| **Stack** | Astro 5.18.2 (static), vanilla JS/CSS, no runtime deps |
| **Local dev** | http://localhost:4321/ |
| **Last updated** | 2026-07-04 |

---

## 1. TL;DR / Current status

A complete static site is built and working. It catalogues personal projects,
each authored as a Markdown file, with an "artsy-engineer" aesthetic
(interactive canvas hero, custom cursor, film grain, generative artwork).

- ✅ Scaffolded, designed, and fully built (`npm run build` → 5 pages, exit 0)
- ✅ Dev server verified (home/project = 200, unknown = 404)
- ✅ Committed on `main` as `69b355e`
- ⏳ **Not pushed** to GitHub yet (waiting on you: `git push`)
- ⏳ `site:` in `astro.config.mjs` is still the placeholder `https://example.com`
- ⏳ No deploy connected yet (Netlify/Vercel/Pages configs are ready)

---

## 2. Command dashboard

```bash
npm run dev      # local dev server → http://localhost:4321/
npm run build    # production build → dist/
npm run preview  # serve the built dist/ locally
```

Dev server is currently running in the background (log: `/tmp/astro-dev.log`).
To stop it: find the astro process (`pgrep -f "astro dev"`) and kill it, or
just close the terminal/session that owns it.

---

## 3. What it does

- **Homepage** (`/`) — interactive hero, a grid of project cards, an about
  section, and a contact footer.
- **Project pages** (`/projects/<slug>/`) — generated one-per-Markdown-file,
  with a banner, metadata, external links, and styled Markdown body.
- **404** (`/404`) — playful "lost signal" page with animated static.

Projects are sorted newest-first and `draft: true` entries are hidden.

---

## 4. Architecture & file map

```
astro.config.mjs            site URL (PLACEHOLDER), static output, dir-style URLs
src/
  content.config.ts         projects collection + frontmatter schema (Zod)
  content/projects/*.md      ← THE CONTENT. one file = one project = one page
  layouts/Layout.astro      <head>, fonts, custom cursor JS, scroll-reveal JS
  components/
    Nav.astro               sticky blurred nav, spinning glyph
    Footer.astro            contact + socials (github.com/avamartoma)
    Hero.astro              cursor-reactive dot-field <canvas> (vanilla)
    ProjectCard.astro       grid card + generative accent-color artwork
  pages/
    index.astro             homepage: loads collection, renders Hero + grid + about
    projects/[...slug].astro project detail; getStaticPaths + Markdown render
    404.astro               animated-static not-found page
  styles/global.css         design tokens, palette, type, grain, cursor, reveal
public/favicon.svg          brand mark (half-moon)
netlify.toml                Netlify deploy config
.github/workflows/deploy.yml GitHub Pages deploy workflow
```

---

## 5. Design system (source of truth: `src/styles/global.css`)

- **Palette** — near-black warm bg (`--bg:#0d0c0f`), off-white ink
  (`--ink:#f4f1ea`), signal accents: orange `#ff5c39`, blue `#3d5afe`,
  acid green `#b6ff3c`.
- **Type** — Space Grotesk (display) + JetBrains Mono (body), via Google Fonts
  in `Layout.astro`.
- **Signature touches** — film-grain overlay (`body::after`, inline SVG noise),
  custom cursor (dot + lerped ring), scroll-reveal via `IntersectionObserver`,
  generative per-project artwork from `accent`/`accentAlt`.
- **Accessibility** — everything honors `prefers-reduced-motion`; custom cursor
  disabled on touch/coarse pointers.

---

## 6. Content model — how to add a project

Create `src/content/projects/<slug>.md`. Filename → URL slug. Frontmatter is
validated at build (`src/content.config.ts`); an invalid field fails the build
with a clear error.

```markdown
---
title: "My New Thing"
blurb: "One punchy sentence for card + hero."
description: "Optional longer text for SEO."   # optional
date: 2026-01-15                                 # sorts newest first
tags: ["TypeScript", "WebGL"]
repo: "https://github.com/avamartoma/thing"     # optional
demo: "https://example.com/thing"               # optional
cover: "/images/thing.jpg"                       # optional; omit → generative art
accent: "#ff5c39"
accentAlt: "#3d5afe"
featured: false
draft: false
---

## Markdown body here
```

Cover images go in `public/images/` and are referenced as `/images/name.jpg`.

**Current sample projects** (replace with your real ones):
`aurora.md`, `plotter-poems.md`, `ledger.md`.

---

## 7. Decisions log (why things are the way they are)

- **Astro, static output** — content-heavy catalogue; no backend needed; free
  hosting; Markdown-per-project keeps adding work trivial.
- **Vanilla JS/CSS for interactivity** (no GSAP/Three.js) — keeps the site
  dependency-light and robust; the canvas hero and cursor are hand-rolled.
- **Pinned Astro 5.18.2, NOT Astro 7** — `npm audit` flags advisories only
  fixed in the Astro 7 major (breaking). The site is fully static with only
  self-authored content, so the flagged SSR/dev-server/XSS-via-untrusted-input
  issues don't apply to the deployed output. Upgrade to 7 deliberately later.
- **Handover doc separate from README** — README serves GitHub visitors; this
  file is the living dashboard + agent re-onboarding brief.

---

## 8. Open items / backlog

- [ ] `git push` to publish the commit to GitHub (owner action)
- [ ] Set real `site:` URL in `astro.config.mjs` before deploying
- [ ] Connect a deploy (Netlify recommended — `netlify.toml` is ready)
- [ ] Replace sample projects with real ones
- [ ] Add real cover images (or keep generative artwork)
- [ ] Optional: Figma moodboard → refine palette/type/layout
- [ ] Optional: decide on Astro 7 upgrade
- [ ] If deploying to a GitHub *project* page, set `base: '/personal-website'`

---

## 9. Agent Re-Onboarding Brief

> Read this if you are a fresh Kiro/agent session picking up this project.

**You are working on Ava's personal website** — a static Astro site that
catalogues her personal projects, with an "artsy-engineer" aesthetic. It is a
**personal** project on **personal GitHub** (`avamartoma`), kept separate from
any Amazon internal tooling. Treat it as a normal open-source-style repo.

**Ground rules:**
1. It's a **static** site (`output: "static"`). No SSR, no server code, no
   backend. Don't introduce them without asking.
2. **Keep dependencies minimal.** Interactivity is vanilla JS/CSS by choice.
   Don't add heavy libraries (GSAP, Three.js, React) unless Ava asks.
3. **Content lives in `src/content/projects/*.md`.** Adding/editing a project
   means editing Markdown, not components.
4. **Always `npm run build` to verify** before claiming a change works.
5. **Commit, but do NOT `git push`** unless Ava explicitly asks in that turn.
6. Respect the **design system** in `global.css` — reuse tokens, don't hardcode
   colors. Keep `prefers-reduced-motion` support intact.
7. **Update this dashboard** (§1 status, §8 backlog, §10 changelog) whenever you
   make a meaningful change, so the next reader/agent stays in sync.

**Fastest path to context:** read this file, then `src/content.config.ts`
(the data model), then `src/pages/index.astro` (how it's assembled), then
`src/styles/global.css` (the look).

---

## 10. Changelog

- **2026-07-04** — Initial build. Scaffolded Astro site; design system; hero
  canvas; project cards + detail pages; 404; sample projects; Netlify + Pages
  deploy configs; README. Bumped Astro 5.13.0 → 5.18.2. Committed `69b355e`.
  Dev server verified. This handover doc created.
