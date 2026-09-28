# 🗂️ Decisions & Completed Work Log — personal-website

Archive of **completed** TODO items and the decisions behind them. Moved out of
[`TODO.md`](./TODO.md) on 2026-08-06 to keep that file focused on open work.
Nothing here is outstanding — it's kept verbatim for context and history. Deeper
narrative lives in [`HANDOVER.md`](./HANDOVER.md).

---

## 2026-09-28 — Hero cursor-tracking eyes: scoped, and deferred to the illustration pass

- [x] **Decision: the tracking eyes ride on a portrait Ava draws herself, not
      the current photo sticker.** Sparked by an Instagram reel (an illustrated
      portfolio hero whose eyes follow the pointer). The photo route was scoped
      first and is workable, but it fights one problem the drawn route doesn't
      have: **the real irises stay in the photo**, so a moving overlay reads as
      two sets of eyes unless it fully covers them. A drawn portrait can have
      eyes drawn *without* pupils, leaving the pupils as separate elements the
      script owns — which is what the source reel actually did. Ava wants to
      draw it herself rather than commission or generate it, so this is now
      gated on **#8** (illustration pass) and parked as a side project rather
      than near-term work. *(First-pass iris measurements for the photo route,
      should it ever be revisited: centres near 49.4%/16.1% and 61.9%/16.3% of
      the 972×1500 source, iris ≈2.5% of width.)*

- [x] **Decision: desktop-only.** At the mobile render size the sticker is
      `clamp(120px, 34vw, 168px)` wide, which puts the eyes at roughly **6px**
      across — the effect can't read at that scale and the travel clamp would be
      sub-pixel. Not worth the code or the payload on touch devices.

- [x] **Decision: tooling is an open question, deliberately not settled now.**
      Ava raised **Framer** and **Google Labs** as possibilities. Neither is
      vetted. Kept as two separate questions in #27 — *making the art* vs
      *shipping the interaction* — because the site is Astro + vanilla TS with
      no runtime dependencies, and adopting a design tool for one hero effect is
      a much bigger commitment than drawing in one.

- [x] **✅ HackMIT project stub added** —
      `src/content/projects/hackmit.md`, `draft: true`, with a scaffolded
      `public/images/projects/hackmit/` (kept by a `.gitkeep` so the folder
      survives a clone — the equivalent folder for #ballpoint-pen-cad is empty
      and therefore untracked). Follows the ballpoint-pen-cad precedent: the
      page exists to fill in later and stays out of the grid, home page, RSS,
      and sitemap until `draft` is flipped. Build verified at 18 pages with no
      `hackmit` string anywhere in `dist/`. Section headings mirror the two
      existing hackathon write-ups (idea → what we built → my role → stack).
      Accent pair `#ff5cc4` / `#5ce6a0`, the one palette combination not
      already in use. Title and date are placeholders — the date is just the
      day the stub was created.

- [x] **Decision: private application drafts are ignored by FOLDER, not by
      filename.** The uncommitted `.gitignore` change ignored `hackmit.md` and
      `calhacks.md` by bare name to keep personal essays and financial-need
      statements out of this **public** repo. Two problems: unanchored patterns
      match **at any depth**, so the rule silently swallowed the new public
      project page at `src/content/projects/hackmit.md` (it would have worked
      locally, then vanished on a fresh clone); and filename-based privacy fails
      open — name a future draft anything else and it's committable. Replaced
      both lines with `/applications/`, and drafts now live in that folder.
      Verified both directions: the project stub is no longer ignored, and
      arbitrary filenames under `applications/` are. **No leak occurred** —
      nothing matching `hackmit`/`calhacks` was ever committed on any branch,
      and no draft files existed on disk yet; the rule was pre-emptive. The
      folder holds a local-only README repeating this, which is itself ignored.

---

## 2026-09-01 — Resume forms require a name; Kesem photos published

- [x] **✅ Both resume request forms now ask for a name.** The nav popup
      (`ResumeModal.astro`) collected an email and nothing else, so requests
      arrived anonymous. It now has a **required** name field above the email row
      (new `.rm__stack` grid: name on its own line, email + `→` below), and the
      heading reads *"Drop your name & email — I'll send it over."* The `/resume`
      page already had a name field marked **(optional)** — now `required`, with
      the "(optional)" tag dropped and the lede updated to match.
      **Decision:** the **Note** field on `/resume` stays optional — it's a bonus
      ("where did you find me / what are you hiring for?"), and requiring it would
      only cost submissions. Both forms use Web3Forms' standard `name` key, so the
      sender's name appears in the delivered email rather than just a reply-to.
      Note the popup's focus-on-open targets the first `.rm__input`, which is now
      the name field — intentional.

- [x] **✅ Kesem at Penn photo grid — 9 photos live on the experience card.**
      Processed with the standard recipe
      (`node scripts/process-community-media.mjs experience/kesem-at-penn kesem`):
      19 MB → 2.3 MB, EXIF stripped, ≤1500px, q82, and the script's location check
      confirmed **no GPS on any output**. Wired into the `images` array on the
      Kesem entry in `Experience.astro` as a narrative: counselors at The Hill →
      cabin → colour games → the evening Camp Kesem sign → the full unit photo.

- [x] **Decision: raw originals are moved, not deleted.** The `IMG_*` files had
      been dropped straight into `public/images/experience/kesem-at-penn/`, where
      (although gitignored, so never committable) **every build copied 19 MB of
      untouched originals into `dist/`**. They were moved to `raw/kesem-at-penn/`
      — the folder `.gitignore` already reserves for exactly this — rather than
      deleted, since they may be the only copies.

- [x] **Decision: publish all 9 Kesem frames, including the ones with campers.**
      5 of the 9 (`kesem-02/03/05/07/09`; `05` and `09` are full cabin/unit group
      shots) show identifiable campers. They were **flagged and held back** in the
      first commit (`272138f` shipped only the 4 counselor-only frames): Kesem
      serves children affected by a parent's cancer, so publishing an identifiable
      camper on a public site implies something private about that child's family,
      and the campers are minors. Precedent existed — `press-15` was dropped for
      third-party faces. **Ava reviewed that and asked for all 9 to be published**,
      so they are. Only Ava is named in any alt text, matching the MITES / Taco
      Bell / Coca-Cola caption convention. ⚠️ Reminder for any future reversal:
      the repo is public and **committed images persist in git history**, so
      unpublishing means pulling them off the page, not off GitHub.

- [x] **`instructions.md` is deliberately gitignored.** A handoff guide written
      for Ava's brother to hand to *his* Claude — setting up Git and GitHub,
      hosting options, buying and linking a domain, and options for a squash
      recruiting site with a private video section. **Decision:** it's written as
      a *guide with decision points and prompt inspiration, explicitly not a
      clone of this site*, and it is **not part of this website** — hence the
      `.gitignore` entry alongside `CONTENT-GUIDE.md`.

---

## 2026-08-07 (pt.2) — Mobile-responsive overhaul + PER page + carousel fix

- [x] **26. ✅ Penn Electric Racing photos — DONE.** The 6 aero-subteam photos are
      on `/projects/penn-electric-racing/` (project page, not the gallery): 4
      SolidWorks production drawings (front-wing outer flap rear/front, side-wing
      end rib, AISI-4130 waterjet tab) in a `data-carousel` under Overview, and 2
      composite hand-layup photos (carbon-fiber drape + vacuum bag) as inline
      images in "Composite airfoils". Copied full-res to
      `public/images/projects/penn-electric-racing/per-01..06.jpg`, set frontmatter
      `cover: per-05.jpg`, deleted the temp `public/images/_per-candidates/`. This
      was the last project on generative artwork — **every project now has real
      photos.**

- [x] **✅ Carousel controls fixed site-wide** (`Layout.astro`). The JS wired
      prev/next + dots only if they already existed in the DOM, but no project
      markup includes them, so every `data-carousel` showed only slide 1. The JS
      now **creates** the arrows + dots for any carousel with >1 slide (real
      `<button>`s + aria-labels). Fixes PER, marquetry-desk, cad-projects, rc-car,
      architecture, luminary, flower-press — no per-page markup needed.

- [x] **✅ Mobile-responsive overhaul (breakpoint 860px throughout).**
      - **Nav** (`Nav.astro`): links collapse to a hamburger dropdown ≤860px
        (accessible: `aria-expanded`/`aria-controls`, Escape, close-on-link, resize
        reset; dispatches `nav:close`). Added **Home** and **Communities**
        (`#recognition`) links → 7 total.
      - **Resume popover** (`ResumeModal.astro`): on mobile it's relocated inside
        the nav menu after the Resume link and rendered **inline** (`.rm--in-menu`,
        no card/box), **toggles** on repeat taps, keeps the menu open, collapses on
        `nav:close`, and moves the menu divider under the box (`.nav__link.resume-open`)
        so it reads as part of Resume. Desktop still floats (unchanged).
      - **Hero** (`Hero.astro`): `.hero__inner` rebuilt with `grid-template-areas`
        (eyebrow/photo/name/body). Desktop unchanged; mobile puts the photo **beside**
        the name, with `ava`/`martoma` on two lines tilted opposite (mobile-only),
        center-aligned. Removed `white-space: nowrap`.
      - **Horizontal-overflow "black bar" on zoom-out** (`global.css`):
        `overflow-x: hidden` → **`overflow-x: clip`** on `html`+`body` (doesn't break
        the sticky nav).
      - **Section spacing** (`global.css`): `.section` padding
        `clamp(4rem,12vh,9rem)` → `clamp(2rem,6vh,6rem)`.
      - **Gallery** (`gallery.astro`): desktop keeps its 5 rows (in a
        `marquee-rows--desktop` container, untouched); a `marquee-rows--mobile`
        container (≤860 only) renders **10 round-robin rows** (`mobileRows`, ~4-5
        photos each) at `--row-h: clamp(118px,33vw,155px)` (~2-3 visible, scroll
        still obvious). Editors only touch the desktop `rows` array — mobile derives.
      - **Banner** (`Layout.astro`/`global.css`): one centered line, em dash kept,
        `white-space: nowrap` + viewport-scaled font so it fits one line on phones;
        shows on desktop and mobile.

- [x] **✅ Removed gallery photo `gal-35`** ("Family") — entry removed from the
      `rows` array **and** the file deleted from `public/images/gallery/`.

- [x] **✅ Docs + gitignore hygiene.** Created `CONTENT-GUIDE.md` (git-ignored,
      local-only cheatsheet mapping each content type → file/path). Removed stale
      `.gitignore` entries for files that no longer exist (`whiskers.md`,
      `REV 12 Aero Notes.pdf`, `hackmit.md`, `hackharvard.md`).

- [x] **✅ Spotify "Lately" confirmed back to normal.** `…/now-playing?debug=1`
      returns `recentSource: "spotify"`, `recentError: null` — the 429 penalty has
      cleared (the optional post-13:42 check from the §2 note).

---

## 2026-08-07 — Wix content, raw-history purge, homepage polish

- [x] **1. ✅ Add project photos — COMPLETE.** Every project page now carries
      real photos (LinkedIn, Coca-Cola, Marquetry Lap Desk, Architecture / "The
      Grove", Henna Luminary, CAD & Woodworking Studies, RC car carousel, Wooden
      Car, CAD Bridge, Marquetry Clock, Flower Press, Stranded). The only page
      left on generative artwork is **Penn Electric Racing**, carried forward as
      open item **#26**. Full per-project history is in the older log entries +
      HANDOVER §6.

- [x] **24. ✅ Wix portfolio content folded in — Stranded, CAD Bridge FEA,
      KidsMates.**
      - **Stranded — A Board Game:** new project `stranded.md` (TSA competition,
        1st at FL states / 5th nationally). Downloaded the Wix photos, viewed
        each, wrote alt text, and wired in the box lid, the open-box components
        (volcano dice centerpiece, gem pouches), and the Risk/Chance card decks.
        Team/group photos (minors' faces) deliberately skipped.
      - **CAD Bridge FEA:** `cad-bridge.md` now has the 5-version breakdown
        (per-version mass + min. safety factor, sliding-vs-bonded contacts,
        Slice-Plane analysis, caliper-measured 0.1230″ MDF) with the real FEA
        stress-plot images wired into each version bullet (`fea-v2…v5`,
        `fea-v4-slice`, `fea-final`). The 5 plots are ~596 px — the max Wix
        stored. ⚠️ The previous session misfiled these as sidebar thumbnails;
        they are the actual per-version plots (min SF 2.198 → 0.91 → 1.267 →
        0.698, final 1.741).
      - **KidsMates writing:** distilled to a line on the existing KidsMates
        Experience card (Ava's preference — not a separate Writing section).
      - *Still open (tracked under #24 / #3 / #24a):* correcting estimated dates
        + copy from the Wix posts, and the full accuracy pass.

- [x] **25. ✅ Stopped committing raw originals + purged history (repo stays
      public).**
      - **25a — gitignore + workflow:** `.gitignore` now blocks camera-pattern
        files under `public/images/**` (`IMG_*`, `DSC*`, `*_Original*`,
        `*.HEIC/heif`, `*.mov`, `*.tif/tiff`, `100_*`, `DCIM*`) and adds a
        gitignored `/raw/` folder (tracked `raw/README.md` documents the
        raw → `process-community-media.mjs` → commit-derivatives-only flow).
        Added a **location guard** to that script: it fails if any produced
        `.jpg` carries EXIF GPS or any `.mp4` a QuickTime/ISO-6709 location atom
        (unit-validated with corrected `Exif\0\0`-offset parsing).
      - **25c — verification:** decoded all 40 HEIC/HEIF/MOV blobs in history
        with `pillow-heif`/`piexif`. The earlier "no home address" finding was
        **wrong** (that audit couldn't read HEIC/MOV): `gallery/IMG_0536.HEIC`
        and `marquetry-flower-press/IMG_8973.MOV` geolocated to a **residential
        address (Lawrence Township, NJ)**. All 7 published `.mp4`s were clean.
      - **Rewrite executed (Ava-authorized):** `git-filter-repo` stripped **all
        raw originals** from every commit. Backup mirror kept at
        `~/rwa-backup-20260807-070457.git` (pre-rewrite tip `7a52cc19`). HEAD
        tree verified byte-identical, force-pushed `main` `7a52cc19` → `3c6ea93`,
        `.git` 1.9 GB → 209 MB, 0 raws remain in history.
      - **Caveat:** a rewrite does NOT retract already-public copies
        (forks/clones/GitHub cache). Fork count checked = **0**. GitHub Support
        can purge cached old blob SHAs if ever needed.
      - **25b — Decision: staying public for now** (per Ava). Revisit the
        private-repo move (Cloudflare/Netlify/Vercel free tier, or GitHub Pro)
        later if desired.

- [x] **✅ Homepage: removed the hero "scroll" cue (2026-08-07).** Deleted the
      animated scroll indicator (markup + CSS + `@keyframes drop`) from
      `Hero.astro`, per Ava.

---

## Infrastructure & delivery

- [x] **0. ✅ Enforce HTTPS enabled (2026-07-04).** DNS verified, GitHub issued
      the TLS cert, Enforce HTTPS on; https://avamartoma.com serves over HTTPS.

- [x] **10. Custom domain — `avamartoma.com`** (bought via Cloudflare Registrar,
      2026-07-04). `astro.config.mjs` `site` + `public/CNAME` set; DNS (4× A grey +
      www CNAME) added; GitHub Pages custom domain + Enforce HTTPS on. **Live at
      https://avamartoma.com** (www → apex + http → https redirects verified).

- [x] **2. ✅ Real resume/contact delivery live (Web3Forms, 2026-07-04).** Access
      key registered to `hello@avamartoma.com` (→ forwards to Gmail) and set in all
      three forms (`Footer.astro`, `ResumeModal.astro`, `resume.astro`). Contact +
      both resume forms tested working on the live site. Distinct subject lines
      per form; submitter's email is the reply-to.

- [x] **3b. ✅ Indexed by Google (2026-07-08).** On-site SEO done + `avamartoma.com`
      verified in **Google Search Console** (Domain property, DNS TXT) and
      `sitemap-index.xml` submitted → status **Success**. Now waiting on Google to
      crawl/index (days). Bing import optional/not done yet.

---

## Content & pages

- [x] **1a. ✅ Captioned the scraped photos (2026-08-05).** Viewed every RC-car
      carousel photo (build-02..22), CAD-studies, and Luminary shot (resized to
      ≤1500px per HANDOVER §6) and wrote accurate captions. Fixed two
      mislabeled CAD files (the "led-lamp" images were phone dimension sketches
      → renamed + moved to the Phone Stand section) and fetched the real
      finished **LED lamp** photo from lvilledesign.org. Corrected the Luminary
      "final" shots (they're process shots, not a finished lit lantern).

- [x] **1b. ✅ Gallery page (`/gallery`) — 60 REAL PHOTOS WIRED (2026-08-06 pt.9).**
      Viewed all `gal-01..60`, wrote a hover label + accurate alt text + a
      destination for each, and wired the **36 strongest** into the 5 marquee
      rows alongside the 4 Wix covers (**40 items total**). Dropped 24
      (near-duplicate graduation/group shots, a few dark or ambiguous frames).
      Destinations worked out from photo contents: **P** (`architecture`,
      `cad-projects` covers + `afe-hackathon` = gal-49 "the Spheres"), **COMM**
      (Changemaker cover, MITES gal-08, LinkedIn gal-18, Chick-fil-A
      gal-41/42/52/53, Amazon Future Engineer gal-48), **EXP** (10 squash +
      professional-headshot frames), **HOME** (19 personal: ski, climb, bake,
      travel, concerts, beaches, family, etc.). Used the 6 certain md5 links
      (gal-18/41/42/49/52/53). **gal-14 & gal-17 were initially left out** — the
      `HANDOVER` md5 note ties them to Phi Gamma Nu, but their visible content is
      generic on its own (cabin s'mores / a dance-show cheer) and the PGN chip was
      inert, so labelling them a program wasn't defensible then.
      **✅ NOW WIRED IN (2026-08-06, at Ava's request) — all 8 certain md5 links are
      used and 38 photos are in the wall.** The PGN chip is a live modal publishing
      both photos, so the link holds: `gal-17` → row 1, label "Phi Gamma Nu";
      `gal-14` → row 5, label "Chapter retreat"; both → `COMM`. Rows 1 and 5 were
      the only ones with a single community photo, so every row now has two. md5
      identity re-checked before wiring. Verified **54/54** Playwright at 1440×900 +
      390×844 + reduced-motion (all 84 rendered images decode with real alt text,
      both new photos present twice for the loop, hrefs → `#recognition`, labels
      correct, hover pauses the row and reveals the label, no console errors or
      failed requests).
      ⚠️ Doing that check surfaced a trap now recorded in HANDOVER §6: on
      `/gallery`, **`locator.hover()`/`.click()` hang** because the rows animate
      forever — use `page.mouse.move()` to coordinates measured *after* scrolling
      the row into view. Build ✓ (17 pages); the earlier Playwright
      22/22 at 1440×900 + 390×844 + reduced-motion still holds (rows scroll, hover pauses +
      reveals the label, reduced-motion → hand-scrollable, no console errors).
      **~22 unused gal-NN.jpg remain** in `public/images/gallery/` if Ava wants
      to swap any in later.

- [x] **1c. ✅ Gallery page — placeholders replaced (done in 1b, 2026-08-06).**
      Rows of photos auto-scroll in alternating directions; each links to a
      project / experience / community / personal destination. The seeded Holi
      placeholders are gone — all cells are now real photos. Personal photos
      could later re-point at a dedicated `/living` page (#8b).

- [x] **Amazon (Kuiper) experience** — ✅ real bullets added from resume
      (2026-07-13): Flask dashboard across 94 built / ~200 planned antenna sites +
      on-site Texas install with Intellian. Placeholder gone. *(was a sub-item of
      TODO #3.)*

- [x] **Wharton naming fixed** — Penn card now says School of Engineering &
      Wharton. *(was a sub-item of TODO #3d.)*

- [x] **OSU / Dr. Emily Dringenberg** (BERG Lab, Jun–Jul 2023) → ✅ **DONE**,
      it is in the Experience timeline as "OSU Belief in Engineering Groups Lab
      — Research Intern". *(was a sub-item of TODO #24, Wix reconciliation.)*

---

## Communities modals (completed; TODO #3c remains open for the un-done chips)

These programme modals are DONE, built, and validated. The parent TODO item
(3c) stays open only for `afe-02.jpg` wiring and the two remaining chips
(NCWIT Aspirations, Davidson Young Scholars).

- **✅ FOUR modals live + validated (2026-08-06 pt.6):** **T-Mobile Changemaker
  Challenge** (`◈ 12`), **Taco Bell Ambition Accelerator** (`◈ 12` — 10 photos +
  **2 video clips**), **MITES** (`◈ 12`), and **Calvin Coolidge Senator** (`◈ 9`).
  Every item has specific alt text and a caption. Playwright **186/186** at
  1440×900 + 390×844.

- **✅ LinkedIn Possibilities in Tech + Coca-Cola Scholars — DONE, built +
  validated (2026-08-06, `5bc8c9b`).** LinkedIn shows `◈ 25` (25 photos,
  narrative order, hackathon `lpit-17` as the climax); Coca-Cola shows `◈ 12`
  (11 photos + 1 banquet-stage clip). Alt text + captions written from the
  photos; program facts verified against the LinkedIn and Coca-Cola Scholars
  Foundation sites. 80/80 Playwright at 1440×900 + 390×844.

- **✅ Phi Gamma Nu + Penn M&T — DONE, built + validated (2026-08-06 pt.8b).**
  **Phi Gamma Nu** shows `◈ 17`: all 17 photos published with individual alt text
  and captions, ordered as a narrative (bid night → Titans family reveal →
  initiation with roses → the ~50-person chapter photo → chapter life). The blurb
  is read off the photos — a slide reading “PGN | Delta Lambda Chapter” lists the
  class of **15** with Ava among them — not from the web. `pgn-11.jpg` **was
  stored rotated 90°** and was fixed. **Penn M&T** shows `◈ 1`: kept as a modal
  rather than an inert chip because the single photo is strong and legible (the
  cohort on the carved Wharton School steps) and the blurb explains what M&T is,
  which is what the education card's "School of Engineering & Wharton" refers to
  (verified against fisher.wharton.upenn.edu: 50–55 admitted a year). That
  required a **`comm__dialog-photos--one`** CSS modifier — a lone item was being
  `4/3` cover-cropped into a 220 px tile (254×190 with the carved lettering
  clipped); it now renders whole at 786×524. Build ✓ (17 pages), 204/204 asset
  refs resolve, Playwright **68/68** at 1440×900 + 390×844. ✅ Re-verified after
  the other terminals finished: the duplicate `--single` rule a parallel session
  had written is gone (mine, `--one`, survived), nothing of this work was reverted
  by the merge, and a pass over **all 10** Communities modals went **220/220** at
  both viewports with 293/293 asset refs resolving.

- **✅ Chick-fil-A Community Scholars — DONE, built + validated (2026-08-06
  pt.8).** Chip now shows `◈ 15` and opens a modal with a blurb (verified against
  chick-fil-a.com/community-scholars: 13 scholars/yr, $25K each, 1-year
  leadership + mentorship program; Ava is a 2025 recipient per the $25,000 /
  02-28-2025 check in the photos) plus 15 captioned photos telling the story: the
  check reveal with the Cow mascot and confetti, the Support Center Backstage
  Tour, a Bracken's Kitchen service shift, a food-facility plant tour, and a Walt
  Disney Studios day. **13 of the 28 processed shots were dropped**
  (personal/scenery: Disney selfies, cotton candy, In-N-Out, castle/Cars-Land
  scenery, redundant group shots) and deleted from `public/`; raws are in git
  history if wanted back. `npm run build` ✓ (17 pages), Playwright **34/34** at
  1440×900 + 390×844.

- **✅ T-Mobile Changemaker Challenge — DONE, built + validated (2026-08-06).**
  The homepage chip shows a `◈ 12` badge and opens a native `<dialog>` with a
  KIDSMATES/$15,000 grant blurb plus 12 captioned photos from
  `public/images/communities/t-mobile-changemaker/`. Photos were resized to
  ≤1500 px; photo 02's orientation was corrected. Ava asked to drop the "At the
  Space Needle" shot, so `changemaker-06.jpg` was pulled out of `public/` —
  filenames run `01..13` **minus 06**; don't renumber. `npm run build` passes
  (17 pages, no errors) and a Playwright pass at **1440×900 + 390×844** went
  **38/38**: 12 photos decode, 12 captions, content scrolls, and ×,
  backdrop-click, and Escape all close the modal. No console errors.

- **Photos deliberately NOT published (Ava's call to reverse):** 9 MITES, 1
  Coolidge and 1 architecture processed shot were dropped rather than shipped —
  mostly informal night shots of other participants. The raws are permanently in
  commit `0f9c4c4`, so any can be re-processed on ask.

---

## Spotify "Lately" 🎧

- [x] **10. ✅ Spotify "Lately" 🎧 — LIVE (2026-07-10, Path A).** Cloudflare Worker
      (`worker/`) deployed at `https://avamartoma-now-playing.avamartoma.workers.dev`
      (secrets — client id/secret + refresh token — stored as Wrangler secrets;
      account subdomain `avamartoma`). `NowPlaying.astro` shows the **current track
      (with equalizer) + recent tracks**, and falls back to the **last 5 played**
      when nothing's on. Endpoint hardcoded as the default in `NowPlaying.astro`
      (still overridable via `PUBLIC_SPOTIFY_ENDPOINT`). GitHub half of "Lately"
      (`GitHubActivity.astro`) also DONE + live.

- **Decision (2026-08-06): NOT adding a Cloudflare Cron Trigger / extra
  self-history resilience.** A one-song symptom turned out to be a Spotify **429
  rate limit** on `recently-played` (from calling it uncached on every request;
  likely tripped by a dev session hammering the page). Fixed by edge-caching
  `recently-played` (120s) so Spotify sees ≤1 call / 2 min regardless of traffic;
  a KV `play_history` self-history serves as a fallback while rate-limited. The
  cron only mattered in the narrow "rate-limited AND self-history must stay
  complete while the site is closed" case, which resolves itself once the 429
  clears (~13:42 Fri 7 Aug 2026) — after which Spotify's own server-side list is
  authoritative again. Not worth the complexity. Full detail in `HANDOVER.md`.

---

## Original foundational build (the old "✔️ Done" section)

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
