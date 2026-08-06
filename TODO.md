# ✅ TODO — personal-website

Ordered by priority. (Deeper context lives in [`HANDOVER.md`](./HANDOVER.md).)

---

## 🟢 Now / next

- [x] **0. ✅ Enforce HTTPS enabled (2026-07-04).** DNS verified, GitHub issued
      the TLS cert, Enforce HTTPS on; https://avamartoma.com serves over HTTPS.

- [~] **1. Add project photos.** *(In progress — 2026-08-05.)* Photos now on:
      Amazon Path, LinkedIn (video + shots), Henna Luminary, CAD & Woodworking
      Studies, and RC car (22, in a carousel), plus **Wooden Car** and **CAD
      Bridge** (from Ava's ME-class docs, 2026-08-06). **Remaining:**
      **`architecture` is now a full case study** ("The Grove", 14 photos +
      carousel + build clip, 2026-08-06). Still on generative artwork only:
      `penn-electric-racing` and `marquetry-*`. Drop images in `public/images/projects/<slug>/` and reference inline
      in the body (Markdown `![alt](/images/projects/<slug>/x.jpg)`), or use a
      `<div class="carousel"
      data-carousel>…</div>` block for a slideshow (see `rc-car.md`).
  - [x] **1a. ✅ Captioned the scraped photos (2026-08-05).** Viewed every RC-car
        carousel photo (build-02..22), CAD-studies, and Luminary shot (resized to
        ≤1500px per HANDOVER §6) and wrote accurate captions. Fixed two
        mislabeled CAD files (the "led-lamp" images were phone dimension sketches
        → renamed + moved to the Phone Stand section) and fetched the real
        finished **LED lamp** photo from lvilledesign.org. Corrected the Luminary
        "final" shots (they're process shots, not a finished lit lantern).

- [~] **1b. Gallery page (`/gallery`) — LIVE with placeholders (2026-08-06).**
      Rows of photos auto-scroll in alternating directions; each photo links to a
      project / experience / personal page. Seeded with 4 Wix cover photos +
      labeled placeholders. **To finish:** drop real photos into
      `public/images/gallery/` and swap `ph('Label', href)` →
      `photo('/images/gallery/x.jpg','alt',href,'Label')` in
      `src/pages/gallery.astro`. Personal photos could later point at a dedicated
      `/living` page (#8b).

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

- [~] **3c. Communities + Experience click-through content (2026-08-06).**
      Click-into infrastructure now exists for both sections; content is being
      added program by program:
      - **✅ FOUR modals live + validated (2026-08-06 pt.6):** **T-Mobile
        Changemaker Challenge** (`◈ 12`), **Taco Bell Ambition Accelerator**
        (`◈ 12` — 10 photos + **2 video clips**), **MITES** (`◈ 12`), and
        **Calvin Coolidge Senator** (`◈ 9`). Every item has specific alt text and
        a caption. Playwright **186/186** at 1440×900 + 390×844.
      - **Pattern to copy for the next program:** the `photos` field became one
        ordered **`media`** array in `src/pages/index.astro` — an entry with a
        `poster` renders as a `<video>`, everything else as an `<img>`, so clips
        and stills interleave into a narrative. Process raws first with
        `node scripts/process-community-media.mjs <slug> <prefix>`, then list
        them. Any chip with `media` automatically becomes a modal button.
      - **Remaining chips with no media yet (8):** Amazon Future Engineer,
        LinkedIn Possibilities in Tech, Coca-Cola Scholars, Chick-fil-A Community
        Scholars, **Penn M&T**, **Phi Gamma Nu**, NCWIT Aspirations in
        Computing, Davidson Young Scholars. All have scaffolded folders under
        `public/images/communities/<slug>/`.
      - **Photos deliberately NOT published (Ava's call to reverse):** 9 MITES,
        1 Coolidge and 1 architecture processed shot were dropped rather than
        shipped — mostly informal night shots of other participants. The raws
        are permanently in commit `0f9c4c4`, so any can be re-processed on ask.
      - **Experience modals** already open (native `<dialog>`) and render bullets;
        add **photos** per role via the optional `images:[{src,alt}]` field in
        `Experience.astro` (drop files in `public/images/experience/<slug>/`).
      - **T-Mobile Changemaker Challenge — ✅ DONE, built + validated
        (2026-08-06).** The homepage chip shows a `◈ 12` badge and opens a native        `<dialog>` with a KIDSMATES/$15,000 grant blurb plus 12 captioned photos
        from `public/images/communities/t-mobile-changemaker/`. Photos were
        resized to ≤1500 px; photo 02's orientation was corrected. Ava asked to
        drop the "At the Space Needle" shot, so `changemaker-06.jpg` was pulled
        out of `public/` — filenames run `01..13` **minus 06**; don't renumber.
        `npm run build` passes (17 pages, no errors) and a Playwright pass at
        **1440×900 + 390×844** went **38/38**: 12 photos decode, 12 captions,
        content scrolls, and ×, backdrop-click, and Escape all close the modal.
        No console errors. The raw files under `src/pages/communities/` are
        staged for deletion. One HEIC was never converted (local Sharp lacks HEVC
        decoding) and isn't needed.
      - **Photo folders scaffolded (2026-08-06):** `public/images/communities/`
        now has a slugified, `.gitkeep`-ed folder per community, so adding a
        program is just "drop photos in the folder + list them in `index.astro`".

- [ ] **3d. Resume/LinkedIn reconciliation (flagged 2026-08-06).** The LinkedIn
      export on hand is only a *Basic* profile (headline only), so a full diff
      needs Ava's actual resume. Open items spotted:
      - **Publications were removed** from the homepage — real credentials (JAMA
        Network 2024 measles outbreak, 2× AAP *Pediatrics in Review* graphics,
        *Prison Legal News*, *Rise News*, + the in-progress Duke CFD paper).
        Decide: re-add in a subtler "Writing & Research" form, fold into project
        pages, or leave off intentionally.
      - **Award framing lost** when honors → Communities tags (dropped "MITES
        Director's Award", "NCWIT — NJ Affiliate Winner", "T-Mobile — Grand
        Prize"). Fine if intentional.
      - **Skills gaps** in the Hero chips: **KiCad** (RC car) and **Flask**
        (Amazon role) aren't listed; add if desired.
      - ✅ Wharton naming fixed (Penn card now says School of Engineering & Wharton).

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

- [ ] **23. ⭐ In-context editor — "edit the site from the site" (planned
      2026-08-06; replaces the deleted Sveltia dashboard).**
      **Decision:** the Sveltia CMS `/admin/` build was **removed** — Ava doesn't
      want a separate dashboard with forms. She wants a small, unobvious trigger
      that logs her in with GitHub and flips the *live site* into an editable
      state: same design, but a `+` on the work list and an Edit affordance on
      each project, editing inline in the site's own UI, inline image uploads,
      and **accent colors auto-assigned** rather than chosen. Ruled out
      **TinaCMS** (the only real off-the-shelf option for in-context editing): it
      needs an **SSR adapter** for its per-keystroke island re-render endpoint —
      so we'd have to leave GitHub Pages — plus a generated GraphQL client, an
      island registry, rewiring content collections, and either TinaCloud or a
      self-hosted backend **with a database adapter**. Way past "static site, no
      backend, minimal deps," and its UX is still an iframe-in-a-dashboard.
      **Planned architecture (4 parts):**
      1. **Trigger + session** — `?edit=1` or a key sequence sets a session flag
         and `import()`s the editor chunk, so normal visitors download **zero**
         editor bytes. Obscurity is UX, not security — the real gate is (2).
      2. **Auth** — GitHub OAuth through a Cloudflare Worker (same pattern as the
         Spotify worker, which already exists). Worker holds the client secret,
         verifies the authenticated login is Ava's, returns a short-lived token
         held in `sessionStorage`. Prefer a **GitHub App** (user tokens expire in
         8h) over an OAuth App. Quick-and-dirty alternative: paste a fine-grained
         PAT — revocable and repo-scoped, but exposed to any XSS.
      3. **Edit surfaces** — `+ New project` on the work list; per-project Edit;
         editable regions on the detail page. **Scope v1 to the `projects`
         collection only** — Communities/Experience are arrays inside `.astro`
         files, so editing them means rewriting source and is riskier.
      4. **Save** — one commit via the GitHub **Trees API** (Markdown + any new
         images together) → Actions rebuild → live. Toast should say "live in
         ~90s" and link the Actions run; optimistically update the DOM.
      **The hard part / main risk:** true inline WYSIWYG. Editing rendered HTML
      and converting back to Markdown mangles exactly the content we have
      (rc-car's hand-written carousel `<div>`, captions, code blocks). Mitigation:
      make only block-level *text* nodes contenteditable, keep a DOM→source range
      map, and **patch only the touched ranges** in the original Markdown so
      untouched blocks survive byte-for-byte. Structural blocks stay opaque
      (click → small source panel).
      **Nice win:** image drop resizes client-side on a canvas to ≤1500px / q82 —
      automating the convention currently done by hand (see HANDOVER §6).
      **Accent auto-assign:** derive `accent`/`accentAlt` deterministically from a
      slug hash into the 5 Holi accents; make both **optional** in
      `content.config.ts` with a computed fallback so new posts don't set them.
      **Suggested staging:** (0) accent auto-derivation + optional schema fields —
      independently useful, zero risk; (1) trigger + auth + edit one existing
      project body via source panel + save → proves the pipeline; (2) inline text
      editing with range patching; (3) `+ New project` + inline image drop;
      (4) optional: Communities/Experience.
      **Explicitly not building:** instant publish (a rebuild is ~1–2 min; going
      instant would mean client-side content rendering and losing static+SEO),
      multi-user, editorial workflow (the `draft: true` flag already hides posts),
      a media library. Authoring is desktop-first — mobile `contenteditable` is
      rough.
      **Open decision before starting:** Worker OAuth vs. paste-a-PAT for v1.

- [ ] **25. ⚠️ Stop committing raw camera originals + decide repo visibility
      (audited 2026-08-06; full detail in HANDOVER §6).**
      The repo is public, so **every committed raw is world-readable forever** —
      deleting it in a later commit does NOT remove it from history. Audit result:
      the **published** images are clean (no EXIF, ≤1500 px — Sharp strips it),
      but ~15 **raws in history** carry GPS. All coordinates resolve to program
      venues the content already names (T-Mobile HQ Bellevue, Taco Bell HQ Irvine,
      Coolidge site Plymouth Notch VT, MIT campus) — **no home address** — so
      history rewriting was judged **not worth it**. `.HEIC`/`.mov` remain
      unverified.
      - [ ] **25a. Add gitignore rules so raws stop accumulating.** Ignore
            camera-pattern files under `public/images/**` (`IMG_*`, `DSC_*`,
            `*_Original*`, `*.HEIC`, `*.heic`, `*.mov`, `100_*`) or better, keep
            originals in a gitignored `raw/` folder outside `public/`. Commit only
            the processed, EXIF-stripped derivatives. ⚠️ Note a parallel session
            has been committing raws for MITES / architecture / Coolidge / Taco
            Bell — this keeps growing until the habit changes.
      - [ ] **25b. Decide public vs private.** Private needs **GitHub Pro** for
            Pages (~$4/mo; **free via Student Developer Pack**, but the site
            **goes dark if student status lapses**) — or **$0** by moving to
            Cloudflare Pages / Netlify / Vercel (all deploy from private repos on
            free tiers; DNS is already at Cloudflare and `netlify.toml` exists;
            ~30–60 min). Private does **not** hide the site itself and does
            **not** retract anything already public.
      - [ ] **25c. Optional: verify the HEIC/MOV files** for GPS with a tool that
            can decode them (`exiftool`) — the audit couldn't read those.

- [ ] **24. Fold in the Wix portfolio content** (scraped 2026-08-06 from
      `avarmartoma.wixstudio.com/portfolio`).
      - **Stranded — A Board Game** (TSA; 1st at FL states, 5th nationally) → add
        as a NEW project. Photos available: board, risky/chance card decks,
        volcano dice centerpiece. ⚠️ Skip the team-group photos (minors' faces).
      - **CAD Bridge** → the Wix post has a far richer **5-version FEA** writeup
        (per-version mass + safety factor, sliding-vs-bonded contacts, slice-plane
        analysis, caliper MDF thickness) + real **FEA stress-plot images**. Upgrade
        `cad-bridge.md` and add the FEA screenshots.
      - **OSU / Prof. Emily Dringenberg** engineering-education internship (BERG
        Lab, summer 2023) → **Experience timeline** entry (research), not a project.
      - **KidsMates** (~16 Chronicle posts + Miami Herald / Forbes features / Taco
        Bell) → consider a separate **"Writing"** section rather than the project
        catalogue.

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
