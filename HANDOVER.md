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
| **Last commit** | `docs`/`feat` on 2026-07-04 — resume capture + photo setup (see §10) |
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
  (`--ink:#f4f1ea`). **Holi accents (mainly purple→blue, festive hints):**
  violet `--signal:#a855f7`, blue `--signal-2:#4361ee`, pink `--signal-3:#ff5cc4`,
  green `--signal-4:#5ce6a0`, yellow `--signal-5:#ffd23f`.
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

- [ ] **Add real projects** (replace samples aurora/plotter-poems/ledger)
- [ ] **Resume:** deploy to Netlify + set the "resume-request" Forms email
      notification to **ava.martoma@gmail.com** (Site settings → Forms →
      Notifications) so requests reach her inbox. Alt host: Formspree.
- [ ] Decide on illustration/interaction direction (see §11) — Ava to draw;
      synthesize, do NOT clone Koberger
- [ ] `git push` to publish commits to GitHub (owner action)
- [ ] Set real `site:` URL in `astro.config.mjs` before deploying
- [ ] Connect a deploy (Netlify recommended — `netlify.toml` is ready)
- [ ] Optional: iFAQ personality section (Elly-inspired)
- [ ] **LATER:** terminal-style AI bot trained on Ava's content (Ignacio-inspired;
      needs serverless function + LLM key — not pure static)
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

- **2026-07-04 (6)** — **Holi color theme.** Kept the black base; retuned accents
  from orange/blue to a purple→blue core with pink/green/yellow hints
  (`--signal`..`--signal-5` in `global.css`). Hero canvas dots now burst into
  multi-color "color powder" near the cursor (weighted toward purple/blue).
  Updated gradients (hero/resume accents), prose code → green, project sample
  accents, favicon → violet. Replaced footer line with "Let's make something."
  Build verified.
- **2026-07-04 (5)** — Resume popup reworked into an **anchored popover** (opens
  just under the nav "Resume" link, no dimming backdrop — page stays visible).
  Removed subtext; heading is now "Drop your email & I'll send it to you." +
  email field. Privacy: removed the big public email headline; email is now only
  a small footer link (mailto:ava.martoma@gmail.com) alongside LinkedIn + GitHub.
  Footer centerpiece is now a non-email line. Build verified.
  (Netlify free tier: hosting + 100 form submissions/month, no card needed.)
- **2026-07-04 (4)** — Reworked resume into a popup (native `<dialog>`); later
- **2026-07-04 (3)** — Added real headshot. Moved `ava_headshot.jpeg` →
  `src/assets/ava-headshot.jpeg`; wired into About via `astro:assets` `<Image>`
  (auto-resized responsive WebP, ~20–56 KB from 3.2 MB). Removed placeholder
  SVG; updated image guide. Build verified.
- **2026-07-04 (2)** — Added `/resume` email-capture page (Netlify Forms +
  progressive-enhancement AJAX inline success), added Resume to nav, added
  About-section portrait with on-brand placeholder (`public/images/ava-portrait.svg`)
  and `public/images/README.md` photo guide. Build verified.
- **2026-07-04** — Initial build. Scaffolded Astro site; design system; hero
  canvas; project cards + detail pages; 404; sample projects; Netlify + Pages
  deploy configs; README. Bumped Astro 5.13.0 → 5.18.2. Committed `69b355e`.
  Dev server verified. This handover doc created.

---

## 11. Design directions & inspiration

> **Guiding principle (Ava, 2026-07-04):** *Synthesize, don't copy.* These are
> inspirations to draw from — NOT templates to clone. Especially: do **not**
> build a Koberger clone. The goal is a site that's distinctly Ava's, blending
> what she likes from several places into one cohesive artsy-engineer identity.

Sites Ava likes, and the *specific ingredient* worth borrowing from each:
- **gkoberger.com** — the **explorable, hand-drawn homepage** feeling: content
  revealed by interacting with an illustration; whimsy; intensely personal
  microcopy. Borrow the *spirit* (playful, illustrated, exploratory), invent
  our own scene/interaction. Ava can draw her own art.
- **ellypeng.com** — **personality density**: the "iFAQ" playful Q&A, warm
  first-person voice, big-type name treatment, art gallery.
- **ignaciofigueroa.dev** — a **terminal-styled AI "bot"** that answers
  questions about the person/their work (LLM + retrieval over their content).
  ⏳ *LATER, not now.* Needs a backend/serverless function + LLM API key; feed
  it the project Markdown as its knowledge base. Terminal UI aesthetic fits.
- **riasaheta.com** — clean engineer structure (Work / Journal / About /
  Resume), project cards with status + year + tags, a build-notes "Journal".
- **sirobles.com** — maker energy: Projects, Build Logs, Download Resume, Hobbies.
- **ronaksuchindra.com** — JS SPA, couldn't scrape; revisit manually.

**Synthesis target (Ava's own blend, to evolve):**
- Keep the current *engineered* base (interactive canvas, custom cursor, grain).
- Add *personality* (Elly): first-person voice, an iFAQ, big-type name.
- Add *exploration/illustration* (Koberger spirit): Ava's own drawings as an
  interactive, playful layer — original scene, not a copy.
- Later: an *AI bot* (Ignacio) trained on her project content.

**Build-order thinking:** real content + photos first → personality (iFAQ,
voice) → illustration/interaction pass → bot (last, needs backend).
