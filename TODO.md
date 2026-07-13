# ✅ TODO — personal-website

Ordered by priority. (Deeper context lives in [`HANDOVER.md`](./HANDOVER.md).)

---

## 🟢 Now / next

- [x] **0. ✅ Enforce HTTPS enabled (2026-07-04).** DNS verified, GitHub issued
      the TLS cert, Enforce HTTPS on; https://avamartoma.com serves over HTTPS.

- [ ] **1. Add project photos.** Every project currently uses generative
      artwork. Pull images from your Google Docs (File → Download → Web Page
      .html, zipped), drop them in the matching `public/images/<slug>/` folder,
      and tell Kiro the filenames — it wires the cover + inline shots.
      Slugs: `rc-car`, `penn-electric-racing`, `wooden-car`, `cad-bridge`,
      `cad-projects`, `marquetry-desk`, `marquetry-flower-press`,
      `marquetry-clock`, `architecture`, `linkedin-hackathon`.

- [x] **2. ✅ Real resume/contact delivery live (Web3Forms, 2026-07-04).** Access
      key registered to `hello@avamartoma.com` (→ forwards to Gmail) and set in all
      three forms (`Footer.astro`, `ResumeModal.astro`, `resume.astro`). Contact +
      both resume forms tested working on the live site. Distinct subject lines
      per form; submitter's email is the reply-to.

- [ ] **3. Fill in real details for a few entries.**
  - [x] **Amazon (Kuiper)** experience — ✅ real bullets added from resume
    (2026-07-13): Flask dashboard across 94 built / ~200 planned antenna sites +
    on-site Texas install with Intellian. Placeholder gone.
  - **LinkedIn Hackathon** — add a demo/live link if there is one.
  - Confirm estimated dates: **CAD Bridge**, **CAD & Woodworking Studies**, and
    the 3 marquetry pieces.

- [x] **3b. ✅ Indexed by Google (2026-07-08).** On-site SEO done + `avamartoma.com`
      verified in **Google Search Console** (Domain property, DNS TXT) and
      `sitemap-index.xml` submitted → status **Success**. Now waiting on Google to
      crawl/index (days). Bing import optional/not done yet.

---

## 🟡 Personality & polish

- [ ] **4. iFAQ section** (Elly-style playful Q&A) — **goes where the old About
      section was** (About now lives in the hero). High impact, low effort.

- [ ] **5. Highlight the volunteering / service.** Options brainstormed: a
      dedicated "Service & Impact" section, an impact-stats strip, or
      color-coding the service roles in the timeline. (Kesem is already in the
      timeline.)

- [ ] **6. Hand-write your name** → Kiro turns the photo into a crisp SVG
      signature (can animate as if drawn); replaces the bubble font.

- [ ] **7. Make a personal logo** to replace the placeholder ◐ (nav + favicon +
      social share image).

- [ ] **8. Your own drawings / illustration pass** — bring your art; Kiro builds
      an original interactive layer around it (Koberger *spirit*, not a clone).

- [ ] **8a. Hand-drawn custom cursor** 🖌️ — swap the current geometric cursor
      (dot + lerped ring in `Layout.astro`) for one of your own hand-drawn cursors
      (e.g. a little pen/marker, or a doodle that trails the pointer). Part of the
      art pass (#8) — needs the drawing. Keep the reduced-motion + touch fallbacks.

- [ ] **8b. "Living" page 📷** — a `/living` photo gallery of you out living life;
      hovering a photo reveals a new place / experience (caption swap). Add
      annotations + animation later. A more personal, non-work counterpart to
      the work grid.

- [ ] **9. Restore leftover About bits (optional)** — the nonprofit/justice
      paragraph and off-the-clock interests (skiing, squash, golf, running,
      woodworking) were removed with the About section; fold into the iFAQ or
      elsewhere if wanted.

- [x] **10. ✅ Spotify "Lately" 🎧 — LIVE (2026-07-10, Path A).** Cloudflare Worker
      (`worker/`) deployed at `https://avamartoma-now-playing.avamartoma.workers.dev`
      (secrets — client id/secret + refresh token — stored as Wrangler secrets;
      account subdomain `avamartoma`). `NowPlaying.astro` shows the **current track
      (with equalizer) + recent tracks**, and falls back to the **last 5 played**
      when nothing's on. Endpoint hardcoded as the default in `NowPlaying.astro`
      (still overridable via `PUBLIC_SPOTIFY_ENDPOINT`). GitHub half of "Lately"
      (`GitHubActivity.astro`) also DONE + live.
- [ ] **11. "Clubs & activities at Penn" strip** — showcase the things you do at
      Penn: Women's Club Squash (Co-Captain), Penn Electric Racing, Kesem, etc.
      Could be a small tag/badge row, a mini-card strip, or folded into the
      Experience section. (PER is also a project; Kesem is in the timeline.)
      - Partial (2026-07-13): **Penn Women's Club Squash (Co-Captain)** added as
        its own Experience timeline card (#6 national finish, 6 matches, $300
        budget). A dedicated clubs strip is still open if wanted.

---

## 💡 New feature ideas (brainstorm 2026-07-10)

> Sparked after finishing the Spotify "Lately" widget. Several of these are now
> cheap because the site has a **Cloudflare Worker + KV** (the Spotify backend) —
> KV can be edited from the Cloudflare dashboard with no code change / no deploy.

- [ ] **17. ⭐ "Now" page (KV-backed) — NEXT UP (Ava wants this).** A
      nownownow.com-style `/now` page: "what I'm focused on right now" — current
      classes, projects, what I'm building/reading. Content stored in KV so Ava
      edits it straight from the Cloudflare dashboard (same no-deploy workflow as
      the blocked-songs list). Low effort, personal, self-serve to update.

- [ ] **18. Guestbook (KV-backed).** Visitors leave a short note; stored in KV,
      rendered on the page. Warm + personal; infra already exists. (Needs light
      spam handling — length cap + basic profanity filter, reuse the Spotify one.)

- [ ] **19. Project reactions / view counts (KV-backed).** A little ♥ or "N
      views" per project, counted in KV. Cheap social proof.

- [ ] **20. Case-study project pages.** Turn the strongest 2–3 projects from a
      blurb into problem → approach → build process → result → what I learned.
      Highest recruiter value (shows *process*, not just outcome).

- [ ] **21. Build-log / "workshop" view.** Show CAD → prototype → final photos in
      sequence for hardware projects. The exploded-CAD viewer (#16) is the flashy
      version of this.

- [ ] **22. Privacy-friendly analytics.** Cloudflare Web Analytics (free, one
      snippet, no cookies) to see which pages people visit.

## 🔵 Later / infrastructure

- [x] **10. Custom domain — `avamartoma.com`** (bought via Cloudflare Registrar,
      2026-07-04). `astro.config.mjs` `site` + `public/CNAME` set; DNS (4× A grey +
      www CNAME) added; GitHub Pages custom domain + Enforce HTTPS on. **Live at
      https://avamartoma.com** (www → apex + http → https redirects verified).

- [ ] **10a. Email SENDING — send-as `hello@avamartoma.com` via free SMTP relay.**
      ✅ RECEIVING done: Cloudflare Email Routing live — `hello@avamartoma.com`
      + catch-all forward to `ava.martoma@gmail.com` (tested, working). Cloudflare
      manages/locks the MX + SPF + DKIM records.
      ⏳ REMAINING (deferred) — reply *from* `hello@` inside Gmail. Cloudflare
      can't send (receive/forward only), so this needs a free SMTP relay:
        1. Create free relay: **Brevo** (300/day) or **SMTP2GO** (1,000/mo).
        2. Authenticate `avamartoma.com` in the relay → add its **DKIM** records in
           Cloudflare DNS; if it needs SPF, MERGE into one record
           (`v=spf1 include:_spf.mx.cloudflare.net include:spf.brevo.com ~all`).
        3. **Relax the existing DMARC** first: `_dmarc` is currently
           `p=reject; sp=reject; adkim=s; aspf=s` (strict) — set to
           `v=DMARC1; p=none; rua=mailto:hello@avamartoma.com` until DKIM/SPF
           alignment is confirmed, then tighten back up.
        4. Gmail → Settings → Accounts → **"Send mail as"** → add
           `hello@avamartoma.com` with the relay's SMTP host/port/login/key; click
           the verification link (arrives via Email Routing).
      Note: during domain onboarding Cloudflare auto-added anti-spoofing lockdown
      records (`v=spf1 -all`, wildcard null `*._domainkey`) that blocked Email
      Routing — both were DELETED 2026-07-04. Strict `_dmarc p=reject` still lives
      in DNS and must be loosened (step 3) before send-as will deliver reliably.

- [ ] **11. Maybe switch hosting to Netlify** (optional; `netlify.toml` ready).

- [ ] **12. AI "bot"** trained on your content (Ignacio-style) — needs a
      serverless function + LLM key. Your project Markdown is its knowledge base.

- [ ] **13. Optional: upgrade to Astro 7** (currently on patched 5.x).

- [ ] **14. Animated hand-drawn sprites** (Elly-style hover animation) — draw
      2–4 frames in Procreate; Kiro wires the frame-swap on hover.

- [ ] **15. Social share image (`og:image`).** ⏳ Interim done (2026-07-13):
      headshot sticker copied to `public/og-image.png` and wired as
      `og:image` + `twitter:image` in `Layout.astro` (absolute URL; Twitter card
      kept as `summary` because the asset is **portrait** 972×1500). ✅ Links
      shared to LinkedIn/iMessage/Slack now show the headshot.
      **Still ideal:** a dedicated **~1200×630 landscape** asset (headshot + name,
      or AA/M logo) so wide `summary_large_image` cards don't center-crop it —
      then bump `og:image:width`/`height` and switch the Twitter card. Overlaps
      the logo work in #7.

- [ ] **16. Scroll-driven exploded CAD viewer** 🛠️ (signature feature, involved) —
      a 3D model on a project page that breaks into its components as you scroll
      (exploded assembly view). Killer differentiator for a MechE portfolio.
      - **NOT anime.js** (that's 2D SVG). This is 3D → **three.js/WebGL**, or the
        pre-rendered trick below.
      - **"Just upload the CAD file" isn't possible** — browsers can't read native
        CAD (STEP/`.sldasm`/`.f3d`/IGES). Always a conversion step. Make it a
        repeatable **recipe** instead: CAD → web asset → drop into the project.
      - **Approach A — real 3D (three.js):** export assembly to **glTF/GLB** with
        components as *separate meshes*; map scroll progress → each part's explode
        offset + camera. Interactive/rotatable; more build work; adds three.js
        (bigger runtime dep).
      - **Approach B — pre-rendered frames (Apple-AirPods trick):** render the
        explode animation in CAD/Blender as an image sequence; swap frames on
        scroll (reuses existing IntersectionObserver, zero 3D lib). Gorgeous baked
        renders; fixed camera; heavier image payload. **Recommended for the first
        pilot** (less risk).
      - **Integration:** add optional `model:` (or `frames:`) field to the project
        frontmatter schema; `[...slug].astro` renders the viewer when present
        (keeps `.md` simple — avoids needing MDX). Pilot on ONE project first.
      - **Caveats:** mobile perf (provide a static fallback image); gate behind
        `prefers-reduced-motion`.

---

## ✔️ Done

- [x] Scaffold Astro site + artsy-engineer design system; Holi palette
- [x] Interactive hero (Holi color-powder cursor dots), custom cursor, grain
- [x] **Live at root** https://avamartoma.github.io/ (GitHub Pages, auto-deploy)
- [x] Bubbly overlapping one-line name + headshot **sticker** in a two-column hero
- [x] Hero carries the "about" (tagline, bio, Tools I reach for, credential)
- [x] **10 real projects** added (samples hidden as drafts)
- [x] Work: homepage selection + `/work` page with multi-select tag filter
- [x] Full "Month Day, Year" dates on cards + detail pages
- [x] **Experience** horizontal-scroll timeline (12 roles incl. Kesem) + Education boxes
- [x] **Honors** + **Publications** sections
- [x] Resume popup + footer contact form (Web3Forms, pending key); LinkedIn linked
- [x] Email kept private; LinkedIn data export gitignored
- [x] **Custom domain live** — https://avamartoma.com (Cloudflare Registrar +
      GitHub Pages, HTTPS enforced, www→apex redirect)
- [x] **Email receiving** — `hello@avamartoma.com` + catch-all → Gmail (Cloudflare
      Email Routing)
- [x] **Forms deliver** — Web3Forms key live in all three forms (→ hello@)
- [x] **Resume-request cooldown** — 2-day soft-lock on the popover + `/resume`
      (shared `resumeLastSubmit` localStorage key); "You already submitted!" note
- [x] **On-site SEO** — homepage title `Ava Martoma`, Person + WebSite JSON-LD,
      `@astrojs/sitemap` (`/sitemap-index.xml`), `robots.txt`, RSS (`/rss.xml`),
      richer OG/Twitter meta (indexing via Search Console still TODO — see 3b)
