# 🛰️ Handover Dashboard — avamartoma.github.io

> **Living document.** Read the top for status. A fresh Kiro/agent session should
> read this end-to-end before touching the repo — §9 is the re-onboarding brief.
> The prioritized backlog lives in **[`TODO.md`](./TODO.md)**.

| | |
|---|---|
| **Project** | Ava Martoma — personal website / project catalogue |
| **Live site** | 🟢 **https://avamartoma.github.io/** (GitHub Pages) |
| **Repo** | `git@github.com:avamartoma/avamartoma.github.io.git` (personal GitHub, **public**) |
| **Branch** | `main` — every `git push` auto-deploys via GitHub Actions (~1–2 min) |
| **Stack** | Astro 5.18.2 (static, root, no `base`), vanilla JS/CSS, no runtime deps |
| **Local dev** | `cd ~/personal-website && npm run dev` → http://localhost:4321/ |
| **Last updated** | 2026-07-04 |

> Note: the local folder is still `~/personal-website` even though the GitHub
> repo was renamed to `avamartoma.github.io`. That's fine.

---

## 1. Start-of-session checklist

```bash
cd ~/personal-website        # (i.e. /local/home/martomaa/personal-website)
git pull                     # get anything merged remotely
npm install                  # only if node_modules is missing
npm run dev                  # → http://localhost:4321/  (Ctrl+C to stop)
```
- Stuck port? `pkill -f "astro dev"` then `npm run dev`.
- Build check anytime: `npm run build` (output in `dist/`).
- To publish: commit, then **`git push`** (Kiro will commit but never pushes).

---

## 2. Current status (2026-07-04)

The site is **live and looks polished**. Structure top-to-bottom on the homepage:
**in-progress banner → nav → hero (the "about") → Work selection → Experience
timeline → Honors + Publications → footer (contact form)**.

- ✅ Live at the root domain; auto-deploys on push.
- ✅ 10 real projects; Experience timeline (12 roles) + Education; Honors + Publications.
- ✅ Hero: AA/M logo, overlapping bubbly name, headshot **sticker**, tagline, bio, tools.
- ✅ "Website in progress" banner (below the nav).
- ⏳ **Project photos** not added yet (generative artwork stands in).
- ⏳ **Forms don't deliver yet** — need a Web3Forms key (see §6).
- ⏳ Backlog in `TODO.md` (photos, iFAQ, Spotify-live, Living page, etc.).

---

## 3. Architecture & file map

```
src/
  content.config.ts          projects collection + frontmatter schema (Zod)
  content/projects/*.md       ← 10 real projects (3 old samples have draft:true)
  layouts/Layout.astro        <head>, fonts, cursor, reveal JS, in-progress banner,
                              Nav, ResumeModal
  components/
    Nav.astro                 AA/M gradient logo + wordmark; links + Resume(modal)
    Footer.astro              #contact — Web3Forms contact form + LinkedIn/GitHub/Email
    Hero.astro                two-column: credential eyebrow, overlapping bubble name,
                              "Half designer…" tagline, bio, Tools chips, CTAs,
                              headshot sticker, cursor-reactive Holi dot canvas
    Experience.astro          #experience — horizontal-scroll timeline (drag/wheel)
                              of 12 roles + Education boxes (Penn, Lawrenceville)
    ProjectCard.astro         grid card: data-tags, full dates, generative artwork
    ResumeModal.astro         anchored resume popover (Web3Forms)
  pages/
    index.astro               hero + Work selection(6) + "See all" + Experience +
                              Honors/Publications (#recognition). (About REMOVED.)
    work.astro                /work — ALL projects + multi-select (OR) tag filter
    projects/[...slug].astro  per-project detail pages
    resume.astro              /resume — no-JS fallback form (Web3Forms)
    404.astro                 animated-static not-found
  styles/global.css           design tokens, Holi palette, banner, cursor, grain, reveal
  assets/
    ava_headshot_sticker.png  ← hero sticker (used)
    ava-headshot.jpeg         old headshot (unused; safe to delete)
public/
  favicon.svg                 AA/M monogram
  images/<project-slug>/      per-project photo folders (empty, awaiting uploads)
.github/workflows/deploy.yml  GitHub Pages deploy (runs on push to main)
```

---

## 4. Design system (`src/styles/global.css`)

- **Palette (Holi):** bg `#0d0c0f`, ink `#f4f1ea`; accents — violet `--signal:#a855f7`,
  blue `--signal-2:#4361ee`, pink `--signal-3:#ff5cc4`, green `--signal-4:#5ce6a0`,
  yellow `--signal-5:#ffd23f`.
- **Type:** Fredoka (`--font-bubble`, the name/logo/wordmark), Space Grotesk
  (`--font-display`, headings), JetBrains Mono (`--font-mono`, body/labels).
- **Signatures:** cursor-reactive multi-color hero dots, custom cursor, film grain,
  overlapping bubble name (per-letter spans, bg-stroke carve), AA/M gradient logo,
  generative per-project artwork. All motion respects `prefers-reduced-motion`.

---

## 5. Content model — add / edit a project

Each project = one file in `src/content/projects/<slug>.md`. Schema in
`content.config.ts`. It appears on `/work` and gets a detail page automatically.

```markdown
---
title: "My Project"
blurb: "One punchy line."
date: 2025-08-01            # newest first; shown as "Month Day, Year"
tags: ["Arduino", "3D Printing"]
repo: "https://…"          # optional
demo: "https://…"          # optional
cover: "/images/my-slug/cover.jpg"   # optional; omit → generative artwork
accent: "#a855f7"          # optional card artwork colors
accentAlt: "#4361ee"
featured: false
draft: false               # true = hidden
---
Markdown body…
```
**Photos:** drop in `public/images/<slug>/`, reference as `/images/<slug>/file.jpg`
(cover in frontmatter; inline via Markdown `![alt](/images/<slug>/x.jpg)`).

Experience roles + Education are inlined arrays in `Experience.astro`.

---

## 6. Known pending / gotchas

- **Forms need a key:** resume popup + footer contact post to **Web3Forms** but
  won't deliver until a free key is pasted into `WEB3FORMS_ACCESS_KEY` in THREE
  files: `ResumeModal.astro`, `resume.astro`, `Footer.astro`. Get it at
  web3forms.com (enter ava.martoma@gmail.com). Until then they show "Sent ✦".
- **Amazon (Kuiper)** timeline card has placeholder bullets; a few project dates
  are estimates (CAD Bridge, CAD & Woodworking Studies, 3 marquetry pieces).
- **Privacy:** no home address / phone / birthday on the site. The LinkedIn data
  export (`*.zip`) is gitignored — never commit it.
- **Astro advisories** in `npm audit` only fix in Astro 7 (major). Fine on static;
  upgrade deliberately later.

---

## 7. Deploy

Push to `main` → GitHub Actions builds & deploys → live at
https://avamartoma.github.io/ in ~1–2 min. Custom domain later: set `site` +
`base:'/'` in `astro.config.mjs` (links use `BASE_URL`, so nothing else changes).

### Custom domain plan — **Cloudflare Registrar** (decided 2026-07-04)

Rationale: buy the domain *at* Cloudflare so a future self-hosted form/API
backend (Cloudflare Workers/Pages Functions, free serverless) lives in the same
account — no migration. Site stays on GitHub Pages for now. (The contact form is
independent of this — it uses Web3Forms and works regardless of registrar.)

Steps when Ava buys the domain:
1. **Buy** at dash.cloudflare.com → Domain Registration → Register Domains
   (auto WHOIS privacy + auto-renew; DNS already on Cloudflare nameservers).
2. **DNS → Records** (apex primary + www redirect):
   - 4× `A` `@` → `185.199.108.153`, `.109.153`, `.110.153`, `.111.153`
   - 1× `CNAME` `www` → `avamartoma.github.io`
   - ⚠️ Set all to **"DNS only" (grey cloud)**, NOT proxied (orange) — orange-cloud
     proxy conflicts with GitHub Pages' own HTTPS cert (redirect loops).
3. **Code (agent):** set `site:'https://<domain>'` in `astro.config.mjs`; create
   `public/CNAME` containing `<domain>`; `npm run build`; commit.
4. **GitHub → Settings → Pages → Custom domain** → enter `<domain>` → Save.
5. Tick **Enforce HTTPS** once the cert provisions (mins–~1h).

---

## 8. Design directions & inspiration

> **Guiding principle:** *synthesize, don't clone.* Draw from these; stay uniquely Ava.

- **gkoberger.com** — explorable, hand-drawn homepage feeling (Ava will draw her own art).
- **ellypeng.com** — personality density: an **iFAQ**, warm voice, big type. (iFAQ is
  planned for where the old About section was.)
- **ignaciofigueroa.dev** — a terminal-style **AI bot** trained on her content (later; needs backend).
- **riasaheta.com** / **sirobles.com** — clean structure, build logs, journal, timeline.

---

## 9. Agent re-onboarding brief

You're working on **Ava's personal website** — a static Astro site on her personal
GitHub, live at **avamartoma.github.io**. Ground rules:
1. **Static site**, no backend. Don't add SSR/servers without asking.
2. **Keep deps minimal** — interactivity is vanilla JS/CSS by choice.
3. **Content = Markdown** in `src/content/projects/`; experience/education are arrays
   in `Experience.astro`.
4. **Always `npm run build` to verify** before claiming success.
5. **Commit, but NEVER `git push`** unless Ava explicitly asks that turn.
6. Respect the **Holi palette + fonts**; reuse tokens; keep reduced-motion support.
7. **No PII** on the site; never commit the LinkedIn `.zip`.
8. **Update this file + `TODO.md`** after meaningful changes.

Fastest context: read this → `TODO.md` → `src/pages/index.astro` → `Hero.astro`
→ `global.css`.

---

## 10. Changelog (condensed, newest first)

- **2026-07-04** — Big session: renamed repo → root domain (live);
  two-column hero (AA/M logo, overlapping bubble name, headshot sticker, credential
  eyebrow, "Half designer…" tagline, first-person bio, Tools chips); moved About
  content into hero & **removed the About section** (iFAQ planned there);
  added Experience horizontal timeline (12 roles incl. Kesem) + Education boxes;
  Honors + Publications; 10 real projects (samples → draft); `/work` page with
  multi-select tag filter + homepage selection & "See all"; full-date formatting;
  footer contact form; Holi palette; "in-progress" banner; personal AA/M logo +
  favicon. Prototyped then removed a Spotify embed (live version is a later TODO).
- **Earlier** — Initial Astro scaffold, design system, hero canvas, project grid +
  detail pages, 404, resume popup, headshot, Web3Forms + GitHub Pages setup,
  HANDOVER + TODO created. (Full detail in git history.)
