# ✅ TODO — personal-website

Ordered by priority. **This file tracks OPEN work only.**

## How to maintain this file (for future agents)

- **Open work only.** When a task (or a sub-item) is finished, do **not** leave
  it here marked `[x]`. Move it to [`decisions-log.md`](./decisions-log.md) so
  this file stays a short, honest list of what's actually left.
- **How to move a completed item:**
  1. Add a dated `- [x]` entry to `decisions-log.md` — newest work under a
     `## <date> — <summary>` heading (or under the matching topic section) —
     capturing the outcome and any decision/rationale, verbatim enough to be
     useful later.
  2. Delete that item's body from this file.
  3. If only *part* of an item is done, move the done part to the log and leave
     a **slim stub** here with just the remaining work.
- **Decisions count as "done."** A settled choice (even "not doing X") belongs in
  the log, not here.
- **Don't renumber existing items** — HANDOVER and other notes reference them by
  number. Give genuinely new work the next free number (currently **#26+**), or a
  letter suffix on a parent (e.g. `8a`).
- Deeper narrative / session history lives in [`HANDOVER.md`](./HANDOVER.md);
  completed work + the reasoning behind it lives in `decisions-log.md`.

---

## 🟢 Now / next

- [ ] **3. Fill in a few real details / confirm estimates.** *(Done parts —
      Amazon Kuiper bullets, Wharton naming — are archived in the log; these
      remain:)*
  - **LinkedIn Hackathon** — add a demo/live link if one exists.
  - Confirm estimated dates: **CAD Bridge**, **CAD & Woodworking Studies**, and
    **Koi Clock** (still an estimate at 2024-11-01). Cross-check the Wix posts,
    which carry better dates (overlaps #24 "Dates and copy").

- [ ] **3c. Remaining Communities chips.** *(All 10 built modals are done +
      archived; only these are left:)*
  - [ ] **`afe-02.jpg` needs a caption + wiring.** A 2nd Amazon Future Engineer
    photo was processed, but the modal still lists only `afe-01.jpg`. View
    `afe-02.jpg`, write alt text + a caption, and add it to that programme's
    `media` array in `src/pages/index.astro`.
  - [ ] **NCWIT Aspirations in Computing** and **Davidson Young Scholars** —
    chips exist with scaffolded `public/images/communities/<slug>/` folders but
    no media yet.

- [ ] **3d. Resume/LinkedIn reconciliation (needs Ava's full resume).** The
      export on hand is only a *Basic* profile (headline only). Open items:
  - **Publications were removed** from the homepage (JAMA Network 2024 measles
    outbreak, 2× AAP *Pediatrics in Review* graphics, *Prison Legal News*,
    *Rise News*, + the in-progress Duke CFD paper). Decide: re-add in a subtler
    "Writing & Research" form, fold into project pages, or leave off.
  - **Award framing lost** when honors → Communities tags (dropped "MITES
    Director's Award", "NCWIT — NJ Affiliate Winner", "T-Mobile — Grand Prize").
    Fine if intentional.
  - **Skills gaps** in the Hero chips: **KiCad** (RC car) and **Flask** (Amazon
    role) aren't listed; add if desired.

- [ ] **24. Wix portfolio — remaining copy/date pass.** *(Stranded, CAD Bridge
      FEA, and KidsMates are done + archived; this is what's left:)* Ava notes
      the Wix posts (`avarmartoma.wixstudio.com/portfolio`) carry **better dates
      and wording** than several entries here — use them to correct project dates
      (many are still estimates, see #3) and tighten copy.

- [ ] **24a. Accuracy pass over every project and community.** *(Ava, 2026-08-06
      pt.8.)* A lot of content landed fast across several parallel sessions —
      13+ project pages and 10 Communities modals, much of it written from photos.
      Go through **all of them** and confirm each is accurate and reads the way
      she wants:
      - Titles, dates, collaborator credits and any claimed result/award.
      - Photo captions and alt text actually match the image (two mislabelled CAD
        files were caught this way once already, and one photo's orientation was
        wrong).
      - Programme facts in the Communities blurbs — verify against the programme's
        own site rather than inferring from the photos, as was done for the
        Coolidge Senators blurb.
      - Anything written by an agent from photos alone, which is most of the
        recent project copy, should be read once by Ava.
      - Flag anything that should be cut rather than corrected.

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

---

## 🔵 Later / infrastructure

- [ ] **10a. Email SENDING — send-as `hello@avamartoma.com` via free SMTP relay.**
      ✅ RECEIVING done: Cloudflare Email Routing live — `hello@avamartoma.com`
      + catch-all forward to Ava's personal Gmail (tested, working). Cloudflare
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
