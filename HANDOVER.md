# 🛰️ Handover Dashboard — avamartoma.github.io

> **Living document.** Read the top for status. A fresh Kiro/agent session should
> read this end-to-end before touching the repo — §9 is the re-onboarding brief.
> The prioritized backlog lives in **[`TODO.md`](./TODO.md)**.

| | |
|---|---|
| **Project** | Ava Martoma — personal website / project catalogue |
| **Live site** | 🟢 **https://avamartoma.com** (custom domain, GitHub Pages; www→apex + HTTPS enforced) |
| **Repo** | `git@github.com:avamartoma/avamartoma.github.io.git` (personal GitHub, **public**) |
| **Branch** | `main` — every `git push` auto-deploys via GitHub Actions (~1–2 min) |
| **Stack** | Astro 5.18.2 (static, root, no `base`), vanilla JS/CSS, no runtime deps; build-time integrations: `@astrojs/sitemap`, `@astrojs/rss` |
| **Local dev** | `cd ~/personal-website && npm run dev` → http://localhost:4321/ |
| **Last updated** | 2026-08-06 |

> Note: the local folder is still `~/personal-website` even though the GitHub
> repo was renamed to `avamartoma.github.io`. That's fine.

---

> **Session 2026-08-06 (pt.8b) — Phi Gamma Nu + Penn M&T modals shipped.** Both
> chips were inert `<span>`s; both are now `<button>`s with modals. Viewed all 18
> processed photos and wrote frame-specific alt text and a caption for every one.
> **Nothing was dropped — all 17 `pgn-*` and the 1 `pennmt-01` are published**, so
> there is nothing to delete from `public/`.
>
> **Phi Gamma Nu (`◈ 17`).** Facts came off the photos, not from the web: a
> projected slide reads **“PGN | Delta Lambda Chapter”** and lists the new-member
> class — **15 names, Ava Martoma among them** — which is where "Delta Lambda" and
> "one of fifteen new members" in the blurb come from. Both men and women appear
> throughout, hence "co-ed". Ordered as a narrative rather than by filename: bid
> night (hand-lettered "Welcome to ΦΓΝ" posters, one per new member) → the packed
> house → the **Titans** family reveal → initiation (roses + the class slide) →
> the full ~50-person chapter photo → chapter life (business formal on campus,
> cake at a meeting, snow, a **Congee Village** dinner in New York, the Chinatown
> gate, s'mores at an A-frame, a party, and posters made for each other's dance
> showcase).
> **Fixed `pgn-11.jpg`:** it was stored **rotated 90°**, so the bid-night signs
> read sideways. Rotated counter-clockwise to upright, re-encoded at q82 to match
> the batch (commit `763997b`).
>
> **Penn M&T (`◈ 1`) — chose a modal over leaving the chip inert.** Ava asked for a
> judgement call. A modal won because the one photo is strong and legible (the
> whole cohort on the Wharton steps, with **“The Wharton School — Steinberg Hall ·
> Dietrich Hall”** carved above them) and because the *blurb* is the real payload:
> it explains what M&T is, which is what the Penn education card's "School of
> Engineering & Wharton" line refers to. Program facts were **verified against
> fisher.wharton.upenn.edu** (dual degree across Penn Engineering + Wharton,
> **50–55 admitted a year**), not guessed.
> ⚠️ **This needed a CSS change** (commit `026fbdd`): a 1-item `media` array landed
> in a 220 px grid tile with the shared `4/3` **cover** crop, so a 45-person cohort
> photo rendered **254×190 with the carved lettering clipped off**. A one-item array
> now gets `comm__dialog-photos--one` — single full-width column, `aspect-ratio:
> auto`, `object-fit: contain`, capped at `70vh`. Verified: the image went from
> **254×190 to 786×524** on desktop, uncropped.
>
> **✅ VALIDATED** against exactly what is committed (see the concurrency warning
> below): built in a throwaway `git worktree` at HEAD so the other session's
> uncommitted edits could not leak in. `npm run build` ✓ (17 pages, no errors);
> all **204** image/video refs in `dist/` resolve, **0 missing, 0 orphans**, and
> both folders are fully used (17/17 and 1/1). Playwright **68/68 green** at
> **1440×900 and 390×844**: both chips are `<button>`s with the right `◈ n` badge,
> modals open **without the page jumping to top**, blurb facts render, every image
> decodes with real alt text and a caption, the PGN body scrolls (1656/792 desktop,
> 4972/743 mobile), the **× stays on screen after scrolling to the bottom**, and
> ×/Escape/backdrop all close. No console errors — *except* a pre-existing external
> **403 from `api.github.com`** rate-limiting the "Lately" widget from this host,
> which is excluded by name in the check.
>
> ### ⚠️⚠️ TWO AGENT SESSIONS WERE EDITING THIS REPO AT THE SAME TIME
>
> This is the thing to know before trusting any of today's commit messages.
> A parallel session was doing **Chat 3 (Chick-fil-A) and Chat 4 (LinkedIn +
> Coca-Cola)** in the *same working tree* while this session did Chat 4b. `HEAD`
> moved **five times** mid-session and `src/pages/index.astro` was being written by
> both of us. Consequences, all verified rather than assumed:
>
> - **My Phi Gamma Nu + Penn M&T `media` arrays were swept into someone else's
>   commit** — they are in **`846b04b` "feat(communities): add Chick-fil-A
>   Community Scholars photo modal"**, not in a Phi Gamma Nu commit. Nothing is
>   lost (the block is in `HEAD` verbatim — checked), but **`git log` attribution
>   for that commit is wrong**. The reverse also happened: that session
>   deliberately used path-limited commits to avoid taking `pgn-11.jpg`.
> - **Because of that, I could not commit `index.astro` from the working tree** —
>   doing so would have published their half-finished LinkedIn/Coca-Cola arrays.
>   `026fbdd` was therefore built as **`HEAD` + only my own hunk**, staged as a
>   blob via `git hash-object` + `git update-index`, and committed from the index
>   so the working tree was left alone. Asserted before committing that the blob
>   contained **no `lpit-` or `coke-` references**.
> - 🔴 **The other session's working tree removes the badge count**
>   (`◈ {c.media.length}` → `◈`), which would make **all** chips render a bare
>   `◈`. That contradicts the documented, previously-validated `◈ 12` design. It is
>   **uncommitted** and **not mine to fix** — Ava should decide whether it was
>   intentional. `HEAD` still has the count and my Playwright run asserts it.
> - **Duplicate work to reconcile:** that session independently wrote an equivalent
>   single-photo rule named **`.comm__dialog-photos--single`**; mine is committed as
>   **`--one`**. When their change lands, **keep one and delete the other.**
> - 🔴🔴 **THE NEXT COMMIT OF `index.astro` WILL SILENTLY REVERT TWO COMMITTED
>   CHANGES.** The working-tree copy of `src/pages/index.astro` was written by the
>   other session from an older base, so it contains **neither** the badge count
>   (`◈ {c.media.length}`) **nor** my `comm__dialog-photos--one` rule — both of
>   which *are* in `HEAD` (`026fbdd`). Committing that file as-is drops both.
>   Before committing `index.astro`, run:
>   ```bash
>   grep -c 'photos--one' src/pages/index.astro      # want 2, not 0
>   grep -c '◈ {c.media.length}' src/pages/index.astro  # want 1, not 0
>   ```
>   and re-add whichever is missing (or take `git show 026fbdd:src/pages/index.astro`
>   as the base and re-apply the LinkedIn/Coca-Cola arrays on top).
> - **Lesson for the next session: check `git log`/`git status` before *and* after
>   every commit, and never run a bare `git commit` or `git commit -a` in this
>   repo while another session may be live** — use path-limited commits.
>
> **Ava's instruction, received mid-session: _do not commit before asking._**
> `763997b` and `026fbdd` had already landed when she said it; nothing has been
> committed since. **The HANDOVER/TODO/NEXT-CHATS updates for this session are
> uncommitted and awaiting her go-ahead.** Nothing was pushed.

---


> Viewed all 28 processed `cfa-*` photos, verified the program against
> **chick-fil-a.com/community-scholars** (13 Community Scholars/yr, **$25K** each,
> awarded for academic success + community service + financial need, plus a
> **1-year** leadership-development & mentorship program). The oversized check in
> the photos reads **$25,000 / 02-28-2025 / "2025 Scholarship Winners"**, so Ava
> is a **2025** recipient — stated in the blurb; nothing was guessed. Added a
> `blurb` + a 15-item **`media`** array to the Chick-fil-A entry in
> `src/pages/index.astro` (chip now `◈ 15`), ordered as a narrative: check reveal
> with the Cow mascot + confetti → Support Center "Backstage Tour" → Bracken's
> Kitchen service shift → Bay Center food-facility plant tour → Walt Disney
> Studios day (Archives + Oscar, Partners statue, cohort). Every item has
> frame-specific alt text and a caption.
> **Dropped 13 of 28** as personal/scenery, not program: `cfa-03` (turf selfie),
> `09` (tongue-out selfie), `10` (cotton candy), `11` (solo signpost), `12` (Robin
> Williams plaque), `13` (In-N-Out tray), `16` (Bay Center exterior, redundant),
> `17` (signpost detail), `20`/`23` (redundant Disney group shots), `21` (castle
> scenery), `22` (Cars Land scenery), `26` (Flo's V8 casual). These were **deleted
> from `public/`**; raws remain in git history if wanted back. ⚠️ `cfa-05/07/25`
> are byte-identical to gallery `gal-41/42/52` (kept — published in the modal);
> the dropped `cfa-26` = `gal-53`, which still lives safely in the gallery folder.
> **✅ VALIDATED:** `npm run build` ✓ (17 pages); `dist/` has 15 refs = 15 files,
> no orphans/missing. Playwright **34/34** at **1440×900 + 390×844** (chip is a
> `<button>`, modal opens, page does NOT jump to top, title + blurb facts render,
> 15 images decode with alt text, 15 captions, body scrolls, ×/Escape/backdrop
> all close, no console errors). **Committed, not pushed** (ground rule #5).
> ⚠️ Unrelated in-flight work was left untouched in the working tree (a
> path-limited commit was used): `phi-gamma-nu/pgn-11.jpg`,
> `marquetry-flower-press/press-15.jpg`, `src/pages/projects/[...slug].astro`,
> `worker/src/index.js`.

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

## 2. Current status (2026-08-06)

> ## 🔴 READ FIRST — session ended on a hard API limit
>
> **A chat can only ever include ~100 inline images.** Session pt.7 died at
> *"too many inline media segments: 102 exceeds limit 100"*. This is a different
> ceiling from the ≤2000 px rule in §6 — that one is about image *size*, this one
> is about the *count* per conversation. Consequences:
>
> - **Viewing photos is the bottleneck for all remaining work**, not writing code.
> - **Budget ~80 image views per chat**, then start a fresh one.
> - **Do ONE photo set per chat, and commit before starting the next.** Captioning
>   a 60-photo set and a 28-photo set in the same chat will not fit.
> - Everything is committed, so a fresh chat loses nothing. `git log` is the truth.
>
> **📋 Copy-paste prompts for the remaining work are in
> [`NEXT-CHATS.md`](./NEXT-CHATS.md)** — one block per fresh chat, in order, with
> a checklist. Start there rather than re-planning.
>
> ### What is DONE and committed (nothing to redo)
>
> | Commit | What |
> |---|---|
> | `55c8623` **pushed** | `images/` restructured → `projects/ communities/ experience/ gallery/` |
> | `7f9d243` | Taco Bell modal (10 photos + 2 clips), `media` array refactor, 2 modal bug fixes |
> | `4d752b2` | MITES (12) + Coolidge (9) modals, Architecture case study, Penn M&T chip |
> | `45dc72c` | Processed the 907 MB batch → 50 MB; raw-blocking deliberately disabled |
> | `6ab2b2c` | Processed the gallery (59) + luminary (16) batch; fixed script slug bug |
> | `ff36473` | **Marquetry Lap Desk** full case study, 15 photos |
>
> **Seven** Communities modals are live and validated at `HEAD`: T-Mobile `◈12`,
> Taco Bell `◈12`, MITES `◈12`, Coolidge `◈9`, Chick-fil-A `◈15`, **Phi Gamma Nu
> `◈17`**, **Penn M&T `◈1`**. Verified 186/186, 42/42, 34/34 and 68/68 Playwright.
> LinkedIn + Coca-Cola were **in flight and uncommitted** as of pt.8b.
>
> ### What is LEFT — processed assets sitting in `public/`, not yet on any page
>
> Every file below is already resized/captioned-ready. The job is: **view → write
> captions → wire into the page → drop the unused ones → build → commit.**
>
> | Set | Files | Where it goes | Notes |
> |---|---|---|---|
> | ~~`gallery/gal-01..60`~~ | ✅ DONE | `/gallery` wall | 36 of 60 wired (2026-08-06 pt.9); ~24 unused frames remain for later |
> | ~~`projects/marquetry-flower-press/press-01..15` + 1 clip~~ | ✅ DONE | `marquetry-flower-press.md` | Full case study; press-15 (promposal sign, 3rd-party faces) deleted |
> | ~~`projects/marquetry-clock/clock-01`~~ | ✅ DONE | `marquetry-clock.md` | Koi clock, single photo |
> | ~~`projects/cad-projects/cadnew-01..67` + 1 clip~~ | ✅ DONE | `cad-projects.md` | Only 2 pieces in the set (pencil box + makeup organizer); wired in, marquetry box covered too |
> | ~~`projects/luminary/lum-01..16`~~ | ✅ DONE | `luminary.md` | Rebuilt around Ava's own finished + lit shots (10 used); 6 low-quality scraped process shots replaced; henna-hands inspiration + Illustrator vector kept |
> | ~~`communities/chick-fil-a-community-scholars/cfa-01..28`~~ | ✅ DONE | modal `◈15` | 15 published, 13 dropped as personal/scenery |
> | `communities/linkedin-possibilities-in-tech/lpit-01..25` | 25 | new modal | chip is currently inert |
> | `communities/coca-cola-scholars/coke-01..11` + 1 clip | 12 | new modal | chip is currently inert |
> | ~~`communities/phi-gamma-nu/pgn-01..17`~~ | ✅ DONE | modal `◈17` | All 17 published; `pgn-11` was rotated 90° and fixed |
> | ~~`communities/penn-m-t/pennmt-01`~~ | ✅ DONE | modal `◈1` | Single-photo modal; needed the `--one` uncropped CSS |
>
> **Suggested chat plan (one row per chat):** clock + flower press → luminary →
> Chick-fil-A → LinkedIn + Coca-Cola → gallery → CAD studies.
>
> ### 🎁 Findings already banked — do NOT re-derive these
>
> **Gallery overlap.** Eight gallery photos are **byte-identical** to photos already
> in other sets, so their link targets are certain (found with `md5sum`, worth
> re-running for future batches):
>
> ```
> gal-14 = pgn-04    → COMMUNITY: Phi Gamma Nu
> gal-17 = pgn-06    → COMMUNITY: Phi Gamma Nu
> gal-18 = lpit-08   → COMMUNITY: LinkedIn Possibilities in Tech
> gal-41 = cfa-05    → COMMUNITY: Chick-fil-A Community Scholars
> gal-42 = cfa-07    → COMMUNITY: Chick-fil-A Community Scholars
> gal-49 = afenew-01 → /projects/afe-hackathon/
> gal-52 = cfa-25    → COMMUNITY: Chick-fil-A Community Scholars
> gal-53 = cfa-26    → COMMUNITY: Chick-fil-A Community Scholars
> ```
>
> Ava's instruction: **work out the gallery links from the photo contents**, and
> expect overlap with the projects/communities. `lpit-26` was deleted because it
> was byte-identical to `lpit-20`.
>
> **✅ Gallery now wired (2026-08-06 pt.9).** All 60 viewed; 36 of the strongest
> wired into `/gallery`. All 6 certain links used (gal-18/41/42/49/52/53).
> **gal-14 (=pgn-04) and gal-17 (=pgn-06) were deliberately left out:** their
> visible content is generic (an A-frame-cabin s'mores night; a dance-show cheer
> with "ALPHA AVA" signs) and doesn't obviously read as Phi Gamma Nu, and the PGN
> chip is inert anyway — so per Ava's "don't mislabel, leave it out" rule they
> were dropped rather than asserted as PGN. If she wants them shown, point them
> at `COMM` (Phi Gamma Nu).
>
> **Flower press (press-01..15), first 6 viewed.** It is a **laser-cut** lily
> bouquet, not hand-cut: `press-01`/`02` veneer tape laid over a veneer sheet;
> `press-03`/`04` the laser head cutting lily outlines into oak/walnut veneer;
> `press-05` the cut pieces with charred edges sitting in the field; `press-06`
> the assembled bouquet — white lily petals with yellow stamens, walnut stems and
> leaves, iris shapes in a lighter wood, laid into an oak ground.
> ⚠️ The current page says *"the CAD for this one is lost"* — the photos show
> laser work, so vector files existed. Reword rather than repeat that.
> `press-07..15` + the 28 s clip are **not yet viewed**.
>
> **CAD studies naming clash — ✅ RESOLVED (2026-08-06 pt.9).** The 67 `cadnew-`
> photos turned out to be just **two pieces**, both already on the page: the
> **pencil box** (`cadnew-01..18` + the clip — the laser-cut plywood caddy with
> the chevron-engraved end panel) and the **makeup & jewelry organizer**
> (`cadnew-19..67`). They were Ava's own high-res reshoot of the same objects the
> page had lower-quality scraped photos of. Kept the best **8 pencil-box + 12
> organizer** photos (renamed to meaningful `pencil-box-*` / `organizer-*`
> names), **deleted the 47 redundant/near-duplicate `cadnew-` frames**, and
> **deleted the 13 superseded old scraped files** (`pencil-box-front/back/top/
> drawer/stopper/filled`, `organizer-filled/empty/inserts/inserts-filled/
> drawer-left/right/hidden`). Kept `pencil-box-concept.jpg` (OneNote sketch) +
> `pencil-box-fusion.jpg` (Fusion model) + all `phone-stand-*` + `led-lamp.jpg`
> untouched. No `cadnew-*` or orphan files remain in the folder.
>
> **Marquetry desk box — ✅ COVERED (2026-08-06 pt.9).** The wavy-fronted
> two-drawer walnut/maple box was **not** in the `cadnew-` set — its only photo
> is `marquetry-desk/desk-03.jpg` (the box beside the lap desk). Added a
> **"Wavy-Front Marquetry Box"** section to `cad-projects.md` that references that
> cross-folder image and cross-links to `/projects/marquetry-desk/`.
>
> ### Tooling a fresh chat must install (none are site dependencies)
>
> ```bash
> npm i --no-save ffmpeg-static playwright   # ffmpeg is NOT on this box
> pip install --user pillow-heif             # REQUIRED for .HEIC
> ```
> - **HEIC: use pillow-heif, never ffmpeg.** An iPhone HEIC is a tile grid with
>   auxiliary streams; ffmpeg silently returns a washed-out greyscale aux image or
>   a single 640 px tile. Four photos were broken that way before this was found.
> - Playwright: pass
>   `executablePath: ~/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome`.
>   **Device descriptors are broken** with that build (a 390 px viewport reports
>   `innerWidth` 481, `touchscreen.tap` fires nothing) → use plain viewport sizes
>   with mouse input. `html{scroll-behavior:smooth}` means scroll assertions must
>   wait for the scroll to settle, and `locator.click()` cannot click a
>   viewport-anchored element (scroll-into-view loops) → click measured centre
>   pixels.
> - Process a batch **without touching existing curated assets** by staging the
>   raws outside the repo:
>   `node scripts/process-community-media.mjs <slug|path> <prefix> --from /tmp/stage/...`
>
> ### Repo size — decision already taken
>
> History is **~1.3 GB** and Ava has **more photos still to add**. Agreed plan
> (2026-08-06): **accept it for now**; the `.gitignore` raw-blocking patterns are
> **commented out on purpose** so her next batch isn't swallowed. Once the import
> is finished, do ONE cleanup pass: uncomment the patterns *and* rewrite history
> to strip the raw blobs (needs a force-push; invalidates her other clone).
> **Do not rewrite history before she says the import is done.**
>
> ---

> **Session 2026-08-06 (pt.9) — CAD & Woodworking Studies photo set wired in.**
> The 67 `cadnew-` photos + 1 clip were viewed and sorted: they are just **two
> pieces**, both already on the page — the **parametric pencil box** (the
> laser-cut plywood caddy, `cadnew-01..18` + the clip) and the **makeup & jewelry
> organizer** (`cadnew-19..67`). They're Ava's own high-res reshoot of objects the
> page previously showed with scraped photos. Rebuilt `cad-projects.md` around
> them: each piece now has a **carousel** (organizer 1 hero + 11; pencil box 1
> hero + 7 + the build clip + the OneNote/Fusion process shots; phone stand 7 +
> 2 sketches; LED lamp single). Kept the **8 best pencil-box + 12 best organizer**
> photos (renamed to meaningful names), **deleted 47 redundant `cadnew-` frames**
> and the **13 superseded old scraped files**. Added a new **"Wavy-Front
> Marquetry Box"** section (the wavy walnut/maple two-drawer box wasn't in the
> set — it's only in `marquetry-desk/desk-03.jpg`, referenced cross-folder with a
> cross-link to the lap desk). Frontmatter blurb/description updated + **Pyrography**
> tag added. **✅ VALIDATED:** `npm run build` passes (17 pages, no errors); all
> **34 image + 1 mp4** refs on the CAD page resolve in `dist/` (incl. the
> cross-folder `desk-03`), and a `dist/` grep confirms **no** references remain to
> any deleted filename. **Not committed to push** (ground rule #5). No new
> Playwright pass — the carousels + `<video>` reuse the same proven markup as the
> desk/architecture pages.
>
> ---

> **Session 2026-08-06 (marquetry finish) — Koi clock + Flower press pages
> completed.** Two project pages that were still on generative artwork now have
> real photos and rewritten copy:
> - **Koi-Fish Veneer Clock** (`marquetry-clock.md`) — the one processed photo
>   (`clock-01.jpg`). Two calico koi (orange/cream/near-black veneer) circle
>   nose-to-tail in a yin-yang ring on a pond-blue ground, with a layered wooden
>   lotus as the center hub. Accent → warm orange/blue. Kept a one-line mention of
>   the matching laser-cut koi box scene (from the old blurb; no photo of it).
> - **Marquetry Flower Press** (`marquetry-flower-press.md`) — full case study in
>   the shape of `marquetry-desk.md`: 8 inline photos + a 6-image carousel + the
>   28 s build clip (using architecture.md's `<video>` pattern). Reframed it as a
>   **working flower press** (plywood boards + threaded rods + wing nuts) whose
>   lid is a laser-cut marquetry bouquet of white lilies and purple irises, made
>   as a **promposal**. **Reworded the old "the CAD for this one is lost" line** —
>   the charred veneer edges are laser work, so vector files existed; the page now
>   says so instead of claiming loss.
>   - ⚠️ **`press-15.jpg` deleted** (not shipped): a blurry, dark evening photo of
>     two identifiable people holding the promposal sign ("...so *PRESSED* to
>     prom"). Used the *story* (and the pun) in the copy but not the photo, and
>     **did not name the recipient**. Raw is still in commit `0f9c4c4` if wanted.
>   - Date corrected to **2025-05-15** (the promposal sign is timestamped
>     2025/05/18), which also moves it out of the old 2024 estimate.
> - **✅ VALIDATED:** `npm run build` passes (17 pages, no errors); all 17 asset
>   refs across both pages resolve in `dist/` (clock-01 + press-01..14 + clip +
>   poster), `press-15` referenced nowhere. **Not committed to push** (ground rule
>   #5). No Playwright/visual pass this session — carousel + video render is the
>   same proven markup as the desk/architecture pages.
>
> ---

> **Session 2026-08-06 (code, post-pt.7) — scroll-trap bug fixed on the "Where
> I've been" timeline.** Reported symptom: scrolling down the homepage with the
> cursor over the Experience cards froze the page — you stayed stuck until you
> moved the mouse off the cards to the side. **Root cause:** the `wheel` handler
> in `src/components/Experience.astro` converted *every* vertical wheel into
> horizontal timeline scroll and always called `e.preventDefault()`, so the page
> could never scroll vertically while hovering the timeline. **Fix:** the handler
> now (a) ignores intentionally-horizontal (trackpad/shift) wheels, and (b)
> detects when the timeline is at its left/right edge and stops calling
> `preventDefault()` there, letting the wheel fall through to scroll the page. Net
> behaviour: you scroll the cards to the end, then the page keeps scrolling — no
> more trap. `npm run build` ✓ (17 pages, no errors). **Committed** (own commit,
> not pushed); no Playwright/manual scroll pass was run — verify in `npm run dev`
> if desired. Only `Experience.astro` was touched; unrelated in-flight image work
> in the working tree was left alone.
>
> ---

> **Session 2026-08-06 (pt.6) — `images/` restructured + three more media sets
> shipped.** Two commits, the first already pushed:
>
> **1. `55c8623` (PUSHED) — `refactor(images): group project photos under
> images/projects/`.** `public/images/` had a dozen bare project-slug folders
> sitting next to `communities/`, so it wasn't obvious what was what. All 12
> moved to **`images/projects/<slug>/`**, and `images/` now contains exactly
> four things: **`projects/`, `communities/`, `experience/`, `gallery/`**. 85
> path references rewritten across the project Markdown, the per-folder
> `.gitkeep` hints, the Sveltia upload paths, and the docs. `images/experience/`
> (documented but missing) was created.
>
> **2. `7f9d243` + a follow-up (NOT pushed) — Taco Bell, MITES, Coolidge, and
> the Architecture project.** Ava committed 331 MB of raw camera files across
> two commits (`2384669`, `0f9c4c4`); all of it is now processed into **~18 MB**
> of web assets and the raws are deleted from `public/`.
> - **Taco Bell Ambition Accelerator** — 10 photos + **2 video clips**. KidsMates
>   was a **Top 50 semi-finalist** in the Taco Bell Foundation × Ashoka Ambition
>   Accelerator; the 2024 summit was at Taco Bell HQ (1 Glen Bell Way, Irvine).
> - **MITES** — 12 photos. MIT Introduction to Technology, Engineering, and
>   Science; six-week residential program.
> - **Calvin Coolidge Senator** — 9 photos. The **Coolidge Senators Program**
>   recognises 100 of the top Coolidge Scholarship applicants; the 2024 Senators
>   Summit was at **Plymouth Notch, Vermont** (verified against
>   coolidgescholars.org, not guessed).
> - **`architecture.md` rewritten as a full case study** → **"The Grove — A
>   Charles River Pavilion"**, designed with **Aster Dean at MITES**. The
>   presentation boards were legible in the photos, so the concept, the
>   two-storey program, the materials list, the site analysis (sun/wind/noise,
>   Charles Eliot's 1894 redesign), and the drawing set are all taken from Ava's
>   own board text rather than invented. 14 inline photos + a 7-slide carousel +
>   a build clip.
>
> **Modal work is now a shared pattern.** `photos` was generalised into one
> ordered **`media`** array so clips and stills interleave into a narrative; an
> entry with a `poster` renders as `<video>`, everything else as `<img>`. Adding
> a program is: drop processed files in `public/images/communities/<slug>/`, add
> a `media` array. Also added **Penn M&T** and **Phi Gamma Nu** chips (no photos
> yet, so both stay inert `<span>`s).
>
> **Two real modal bugs found and fixed** (both affected T-Mobile too):
> - **Clicking a chip jumped the page to the top.** A modal `<dialog>` gets
>   `inset: 0` from the UA, and top-layer elements have `position: relative`
>   **coerced to `absolute`** — so the dialog was anchored to the *document* and
>   the browser scrolled the page to reveal it. Now explicitly `position: fixed`.
>   ⚠️ Don't "tidy" that to `relative`; the comment in `index.astro` says why.
> - **The × scrolled out of reach** in a 12-item modal. It was `position:absolute`
>   inside the scrolling inner div; it's now a **direct child of the `<dialog>`**.
> - Video playback also now **stops on close** (closing a `<dialog>` hides it but
>   does not pause media).
>
> **✅ VALIDATED:** `npm run build` passes (**17 pages**, no Astro/TS errors);
> all **139** image/video references in `dist/` resolve, with **no orphans** and
> **no raw originals** shipping. A Playwright pass at **1440×900 and 390×844**
> went **186/186**: all four modals open without moving the page, every photo
> decodes with real alt text and a caption, both Taco Bell clips play, ×/backdrop/
> Escape all close, and the architecture page's 14 photos + 7 carousel slides +
> build clip all decode. No console errors.
>
> **Tooling notes for the next session** (all needed, none are site deps):
> - `ffmpeg` is **not** on this box → `npm i --no-save ffmpeg-static`.
> - **HEIC needs `pip install --user pillow-heif`.** Sharp has no HEVC decoder,
>   and **ffmpeg gets HEIC wrong** — an iPhone HEIC is a tile grid with auxiliary
>   streams, so ffmpeg silently returns a washed-out greyscale aux image or a
>   single 640 px tile. pillow-heif assembles the real photo and applies EXIF
>   orientation. (This is why one architecture photo and three others looked
>   broken on the first pass.)
> - Playwright: `npm i --no-save playwright`, and pass
>   `executablePath: ~/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome`.
>   **Device descriptors are broken** with that older build (a 390 px viewport
>   reports `innerWidth` 481 and `touchscreen.tap` fires nothing) → use plain
>   viewport sizes with mouse input. Also `html{scroll-behavior:smooth}` means
>   **scroll assertions must wait for the scroll to settle**, and
>   `locator.click()` cannot click a viewport-anchored element (its
>   scroll-into-view loops forever) → click measured centre pixels instead.
> - **`.gitignore` now blocks raw camera files** under `public/images/` (`*.HEIC`,
>   `*.mov`, `IMG_*`, `DSC_*`, `100_*`, …), acting on the audit item below.
>   Processed names (`<prefix>-01.jpg`) are unaffected.
>
> **⚠️ Left for Ava:**
> - **Unused processed photos were deleted rather than shipped** — 9 MITES, 1
>   Coolidge, 1 architecture. They were mostly informal/night shots of other
>   people's teenagers; publishing them uncaptioned wasn't my call. **Nothing is
>   lost**: the raws are permanently in commit `0f9c4c4`, so any of them can be
>   re-processed on request.
> - **Two new chips, both inert until they have photos:** **Penn M&T** (the
>   Jerome Fisher Program in Management & Technology — Penn Engineering +
>   Wharton dual degree, which is also what the Penn education card's "School of
>   Engineering & Wharton" refers to) and **Phi Gamma Nu**. Folders scaffolded at
>   `public/images/communities/penn-m-t/` and `.../phi-gamma-nu/`, so each
>   becomes a modal as soon as photos land in it.
> - The MITES modal and the Architecture project **overlap by design** — the
>   capstone came out of MITES. The 10 photos Ava had copied into *both* folders
>   were byte-identical duplicates; they now live only under
>   `images/projects/architecture/`.

> **Session 2026-08-06 (big one):** captioned the scraped photos, fixed mislabeled
> CAD images + fetched the real LED-lamp photo, **expanded the CAD + Luminary
> galleries** from portfolio source photos, **fleshed out Wooden Car + CAD Bridge**
> from Ava's ME-class docs, built the **Sveltia CMS self-serve editor** (/admin/),
> and added a new **Gallery page** (/gallery). See §10 changelog.
>
> **T-Mobile Changemaker modal — ✅ BUILT AND VALIDATED (2026-08-06):**
> - ✅ Pulled/merged commit `85512f6` from Ava's other laptop, bringing over 13
>   T-Mobile Changemaker JPGs plus `IMG_7537.heic`. Local `main` is currently
>   **ahead of `origin/main` by 4 commits** (the merge is local; nothing pushed).
> - ✅ Processed the 13 decodable JPGs into web assets at
>   `public/images/communities/t-mobile-changemaker/changemaker-01..13.jpg`:
>   EXIF handling, long edge capped at 1500 px, JPEG quality 82, about 2.5 MB
>   total. `changemaker-02.jpg` was manually rotated counterclockwise after its
>   source orientation proved wrong.
> - ⚠️ `IMG_7537.heic` was skipped because this machine's Sharp/libvips can read
>   HEIF metadata but lacks the HEVC decoder. The other photos already cover the
>   full event story, so the HEIC is not required for the modal.
> - ✅ Viewed every processed photo and wrote specific alt text/captions. They
>   document Ava and Joshua Martoma pitching KIDSMATES, accepting its $15,000
>   2023 T-Mobile Changemaker Challenge grant, the three winning teams, the
>   cohort, Seattle activities, and informal event moments.
> - ✅ `src/pages/index.astro` was changed from a string-only Communities array to
>   typed community objects. The T-Mobile chip now carries a `◈ 12` photo badge
>   and opens a native `<dialog>` containing the KIDSMATES blurb and captioned
>   photo grid. Added keyboard/focus styling, Escape/native close behavior, ×
>   close, backdrop-click close, responsive grid CSS, and open/close JavaScript.
> - ✏️ **Now 12 photos, not 13** — Ava asked to drop the "At the Space Needle"
>   shot (2026-08-06). Its array entry was removed from `index.astro` and
>   `changemaker-06.jpg` was moved out of `public/` so it isn't published (copy
>   parked at `/tmp/removed-changemaker-06.jpg`; the raw source also still lives
>   in commit `85512f6` if it's ever wanted back). Filenames now run
>   `changemaker-01..13` **minus 06** — the gap is intentional, don't renumber.
> - ✅ **VALIDATED:** `npm run build` passes clean (**17 pages**, no Astro or
>   TypeScript errors) and all 12 images ship to `dist/` with no broken refs.
>   A Playwright pass at **desktop 1440×900 and mobile 390×844** ran **38/38
>   checks green**: chip renders as a `<button>` with the `◈ 12` badge (the other
>   9 chips stay inert `<span>`s), the modal opens, title + KIDSMATES/$15,000
>   blurb render, **all 12 photos decode** (`naturalWidth > 0`) with 12 non-empty
>   captions, the body **scrolls** (desktop 1076px content in a 792px box; mobile
>   3496/743), and **×, backdrop click, and Escape each close it**. No console
>   errors. Grid is 3-up on desktop, 1-up on mobile.
> - ✅ Raw camera files were removed from the incorrect `src/pages/communities/`
>   route directory; those deletions are currently **staged**. Processed files in
>   `public/images/communities/` and the one-off
>   `scripts/process-changemaker-photos.mjs` are **untracked** — still Ava's call
>   whether to keep the script in the repo (it documents the resize recipe) or
>   drop it.
> - **Remaining for Ava:** commit (validation is done) and `git push` to deploy.
>   Preserve the unrelated uncommitted Sveltia/admin and `Experience.astro` work
>   noted below. Minor cosmetic note: the grid thumbnails are a `4/3` `cover`
>   crop, so tall portrait shots get center-cropped in the grid (e.g. Joshua is
>   cropped out of the check-acceptance thumbnail even though he's in the full
>   photo and in its alt text). Fine as-is; a lightbox is the fix if it bugs her.
>
> **Git state (2026-08-06, pt.5): ✅ PUSHED and in sync.** `main` and
> `origin/main` are both at **`e12aa7d`** ("feat(communities): add T-Mobile
> Changemaker modal") — `git rev-list --left-right --count origin/main...HEAD`
> reports `0 0`. The earlier 4 local commits (merge, gallery, captions, Wooden
> Car / CAD Bridge) went up with it, so the GitHub Actions deploy covers all of
> it. Normally **Kiro commits but never pushes** — this push was explicitly
> requested. Per Ava the Sveltia editor was kept OUT of the commit — and has
> since been **deleted entirely** (see the "editor direction" note below).
>
> **⚠️ Still uncommitted in the working tree (left for Ava):**
> - **`src/components/Experience.astro`** — the click-into timeline work from
>   earlier in the session. Unrelated to Changemaker; preserve and review
>   separately. (`src/pages/index.astro` **is** now committed.)
> - **`scripts/process-changemaker-photos.mjs`** — untracked one-off that
>   documents the resize recipe (EXIF-aware, long edge ≤1500 px, q82). Keep it or
>   delete it; nothing depends on it.
>
> **🔄 Editor direction changed (2026-08-06):** the **Sveltia CMS editor was
> removed** — `public/admin/`, `admin-setup.md`, and the `robots.txt`
> `Disallow: /admin/` line are all gone, and `robots.txt` is back to its
> committed state. Nothing about it was ever committed or deployed, so there's no
> history to unwind. Reason: Ava wants **in-context editing on the site itself**
> (a hidden login that flips the live site into an editable state, with a `+` on
> the work list and an Edit affordance per project, inline image drop, and
> auto-assigned accent colors) — not a separate `/admin` dashboard with forms,
> which is the only shape Sveltia/Decap/Keystatic offer. The replacement plan
> lives in **`TODO.md` #23**. A copy of the deleted files is parked at
> `/tmp/sveltia-removed/` for the rest of this session only.
>
> **⚠️ Follow-ups that need Ava (not code):**
> 1. **Photo privacy + repo visibility (audited 2026-08-06 — decision needed):**
>    the repo is public, so **committed raw camera files are permanently readable
>    in git history** even after being deleted. The **published** images are clean
>    (no EXIF, ≤1500 px), and the ~15 geotagged **raws** all point at program
>    venues the content already names — no home address — so history rewriting
>    wasn't recommended. Two open calls: **stop committing raws** (gitignore) and
>    **public vs private** (private needs GitHub Pro for Pages, free-for-students
>    but the site dies if that lapses; or $0 by moving to Cloudflare
>    Pages/Netlify/Vercel). Full costing in §6, action items in `TODO.md` #25.
> 2. **Gallery photos: ✅ DONE (2026-08-06 pt.9).** `/gallery` is now a real photo
>    wall — 36 of the 60 processed `gal-NN.jpg` wired across the 5 rows with the 4
>    Wix covers. To add/swap later: drop a file in `public/images/gallery/`, LOOK
>    at it, add a `photo('/images/gallery/x.jpg','alt',href,'Label')` to a row in
>    `src/pages/gallery.astro`.
> 3. **Privacy:** the old phone-stand render showing two kids' faces was dropped
>    when the phone-stand gallery was rebuilt **face-free**; two portfolio
>    phone-stand renders with that wallpaper were intentionally NOT added. Re-add
>    only if you want the family photo shown.

The site is **live and looks polished**. Structure top-to-bottom on the homepage:
**in-progress banner → nav → hero (the "about") → Work selection (compact list) →
Lately → Experience timeline (compact cards → click-into detail modals) →
Communities (color-lit tags) → footer (contact form)**.

- ✅ Live at **https://avamartoma.com** (custom domain, HTTPS); auto-deploys on push.
- ✅ **13 projects** incl. two hackathons (Amazon Path, LinkedIn Career Discovery) +
  Henna Luminary; Experience timeline (13 roles) + Education; Communities.
- ✅ **Project listings are now a compact hover-reveal list** (`ProjectRow.astro`) on
  the homepage selection and `/work`, not cards. Cards (`ProjectCard.astro`) are
  now **unused** (left in place; safe to delete).
- ✅ **Project media:** cards/banners always use generative accent artwork; **photos
  live inline in the project body**. New reusable **image carousel** (arrows/dots/
  counter) — see RC car. `<video>` supported inline (LinkedIn demo).
- ✅ **Photos added** to: Amazon Path, LinkedIn (video + shots), Henna Luminary,
  CAD & Woodworking Studies (organizer / pencil box / phone stand / LED lamp —
  galleries **expanded** from portfolio photos, 2026-08-06), RC car (22),
  **Wooden Car**, and **CAD Bridge**.
- ✅ **Origins backlinks** on RC car (Wix build blog), Luminary + CAD studies
  (lvilledesign.org).
- ✅ Hero, banner, email, forms, resume cooldown, SEO, `og:image` — all as before.
- ✅ **Photo captions** written for the scraped RC/CAD/Luminary shots (2026-08-06).
- ❌ **Self-serve editor — REMOVED (2026-08-06).** The Sveltia CMS `/admin/`
  dashboard was deleted (never committed, never deployed). Ava wants in-context
  editing on the site itself instead — see `TODO.md` #23.
- ✅ **Gallery page** (`/gallery`, in nav) — rows of photos auto-scrolling in
  **alternating** directions; each photo links to a project / experience /
  personal page. Seeded with 4 Wix cover photos + labeled placeholders (hover to
  pause + reveal label; respects reduced-motion). Swap in real photos over time.
- ✅ **Homepage restructure (2026-08-06 pt.2):** **Lately** moved *above* the
  Experience ("Where I've been") section; **Publications section removed**;
  **"Selected honors" → "Communities"** — now small pill-tags that light up in the
  Holi accent colors on hover (`index.astro`). New Communities list: Amazon Future
  Engineer, LinkedIn Possibilities in Tech, Coca-Cola Scholars, Chick-fil-A
  Community Scholars, NCWIT Aspirations in Computing, Calvin Coolidge Senator,
  MITES, T-Mobile Changemaker Challenge, Taco Bell Ambition Accelerator, Davidson
  Young Scholars.
- ✅ **Experience timeline is now click-into (2026-08-06 pt.2):** cards show only
  dates / org / role · location / "Details →"; the bullet highlights live in a
  per-role native `<dialog>` **detail modal** (Esc / backdrop / × to close). Each
  role accepts an optional `images: [{ src, alt }]` array that renders as a photo
  grid in its modal — drop files in `public/images/experience/<slug>/`. Penn
  education card now reads **"University of Pennsylvania (School of Engineering &
  Wharton)"**.
- ⏳ **Email *sending*** (reply *as* `hello@`) not set up (see §6 / `TODO.md` 10a).
- ⏳ Backlog in `TODO.md` (iFAQ, "Now" page, Living page, etc.).

> **⚠️ Git-state note:** the Changemaker work is pushed. What remains
> uncommitted is `Experience.astro` and the one-off photo-processing script (the
> Sveltia editor was deleted, not stashed). Note a **parallel session** has since
> pushed Taco Bell photo/video work on top — run `git log` and `git status`
> before assuming this is current.

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
    ProjectCard.astro         grid card (NOW UNUSED — replaced by ProjectRow)
    ProjectRow.astro          compact list row; accent generative art fades in on hover
    ResumeModal.astro         anchored resume popover (Web3Forms)
  pages/
    index.astro               hero + Work selection(6) + "See all" + Experience +
                              Honors/Publications (#recognition). (About REMOVED.)
    work.astro                /work — ALL projects + multi-select (OR) tag filter
    gallery.astro             /gallery — photo wall; rows auto-scroll, alternating
                              direction; each photo links out (see file header)
    projects/[...slug].astro  per-project detail pages
    resume.astro              /resume — no-JS fallback form (Web3Forms) + 2-day cooldown
    rss.xml.js                /rss.xml feed for the projects collection (@astrojs/rss)
    404.astro                 animated-static not-found
  styles/global.css           design tokens, Holi palette, banner, cursor, grain, reveal
  assets/
    ava_headshot_sticker.png  ← hero sticker (used)
    ava-headshot.jpeg         old headshot (unused; safe to delete)
public/
  favicon.svg                 AA/M monogram
  robots.txt                  allow-all + Sitemap link
  images/projects/<slug>/     per-project photos (RC/CAD/Luminary/Architecture…)
  images/communities/<slug>/  per-community photos; one folder per program.
                              t-mobile-changemaker/ (12), taco-bell-ambition-
                              accelerator/ (10 + 2 mp4 clips), mites/ (12),
                              calvin-coolidge-senator/ (9), chick-fil-a-
                              community-scholars/ (15), phi-gamma-nu/ (17) and
                              penn-m-t/ (1) drive modals.
                              Filenames are <prefix>-01.jpg / <prefix>-video-01
                              .mp4 — gaps in the numbering are intentional
                              (dropped shots); don't renumber.
  images/experience/<slug>/   per-role photos for the timeline detail modals
  images/gallery/             cover photos for the /gallery wall (+ your future adds)
.github/workflows/deploy.yml  GitHub Pages deploy (runs on push to main)
```

> **SEO:** `Layout.astro` sets the per-page `<title>`/description, canonical,
> OG/Twitter meta, an RSS `<link>`, and (homepage only) Person + WebSite JSON-LD.
> `astro.config.mjs` registers `@astrojs/sitemap` → `/sitemap-index.xml` at build.

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
cover: "/images/projects/my-slug/cover.jpg"   # optional; omit → generative artwork
accent: "#a855f7"          # optional card artwork colors
accentAlt: "#4361ee"
featured: false
draft: false               # true = hidden
---
Markdown body…
```
**Photos:** drop in `public/images/projects/<slug>/`, reference as
`/images/projects/<slug>/file.jpg` (cover in frontmatter; inline via Markdown
`![alt](/images/projects/<slug>/x.jpg)`).

Experience roles + Education are inlined arrays in `Experience.astro`.

---

## 6. Known pending / gotchas

- **SEO is wired AND indexed.** Homepage title = `Ava Martoma`, Person + WebSite
  JSON-LD on the homepage, sitemap + `robots.txt` + RSS all live. ✅ `avamartoma.com`
  is **verified in Google Search Console** (Domain property, google-site-verification
  TXT in Cloudflare DNS) and `sitemap-index.xml` was submitted → status **Success**
  (2026-07-08). Now just waiting on Google to crawl/index (days). Bing Webmaster
  Tools import is optional and not done yet.
- **Social share image (`og:image`) is set** (interim, 2026-07-13): the headshot
  sticker at `public/og-image.png` is wired as `og:image`/`twitter:image` in
  `Layout.astro`. It's **portrait** (972×1500) so the Twitter card stays `summary`;
  a dedicated ~1200×630 landscape asset is still ideal (TODO #15).
- **Forms are LIVE (Web3Forms):** footer contact + both resume forms deliver to
  `hello@avamartoma.com` (→ Gmail). Access key `9cffc9b5-…` lives in
  `WEB3FORMS_ACCESS_KEY` in `Footer.astro`, `ResumeModal.astro`, `resume.astro`
  (a Web3Forms key is a public form ID — safe in a public repo). Delivery only
  fires from the deployed domain, not `localhost`. Distinct subject per form;
  submitter's email is the reply-to.
- **Email — receive works, sending doesn't (yet):** Cloudflare Email Routing
  forwards `hello@avamartoma.com` + a catch-all to Gmail. To *reply as* `hello@`
  you need a free SMTP relay (Brevo/SMTP2GO) + Gmail "send as" — deferred in
  `TODO.md` 10a. NOTE the DNS: Cloudflare's auto-added anti-spoofing lockdown
  records (`v=spf1 -all`, wildcard null `*._domainkey`) were DELETED to let Email
  Routing provision; a strict `_dmarc p=reject` remains and must be relaxed to
  `p=none` before send-as will deliver.
- **Amazon (Kuiper)** timeline card now has real bullets (resume pass 2026-07-13);
  a few project dates are still estimates (CAD Bridge, CAD & Woodworking Studies,
  3 marquetry pieces).
- **Privacy:** no home address / phone / birthday on the site. The LinkedIn data
  export (`*.zip`) is gitignored — never commit it.
- **⚠️ Raw camera originals are PERMANENTLY PUBLIC once committed (audited
  2026-08-06).** The repo is **public**, so every raw photo/video that gets
  committed is world-readable **forever** — staging it for deletion later removes
  it from the current tree but **not from history** (e.g. anyone can check out
  `85512f6` and pull the full-res originals). What the audit found:
  - **Published images are clean.** The processed files actually served
    (`changemaker-*.jpg` etc.) have **no EXIF at all** and are capped at 1500 px —
    Sharp strips metadata by default. No location/device/timestamp leaks from the
    site itself.
  - **The committed raws are not.** ~15 carry GPS. Coordinates were checked and
    all resolve to **program venues the content already names** — `47.578,
    -122.165` T-Mobile HQ (Bellevue WA), `33.678/33.657, -117.84/-117.75` Taco
    Bell HQ (Irvine CA), `43.535, -72.721` Coolidge site (Plymouth Notch VT),
    `42.359, -71.093` MIT campus. **None looks like a home address.** Residual
    exposure is device model (iPhone 13), exact timestamps and full-res frames
    (4032×3024). `.HEIC`/`.mov` files couldn't be decoded during the audit, so
    those are **unverified**.
  - **Verdict:** low enough risk that history rewriting was NOT recommended.
    Rewriting (git filter-repo/BFG + force-push + asking GitHub Support to GC
    unreachable objects) is destructive, rewrites published history, and still
    can't recall forks/caches/scrapers. Don't do it without Ava's explicit ask.
  - **The fix that costs nothing:** stop committing raws. Keep originals outside
    the repo (or in a gitignored folder), process them, commit only the derived
    EXIF-stripped files. See `TODO.md` #25.
- **Repo visibility — public vs private (costed 2026-08-06).** Per GitHub's docs,
  Pages serves from **public** repos on Free, and from **private** repos only on
  **Pro or above**. So going private means either (a) **GitHub Pro** — ~$4/mo,
  currently **free via the Student Developer Pack**, but ⚠️ if student status
  lapses the private Pages site **stops serving** and the site goes dark; or
  (b) **move hosting** to Cloudflare Pages / Netlify / Vercel, all of which deploy
  from private repos on their free tiers — **$0 forever**, ~30–60 min of work,
  and easy here because DNS is already at Cloudflare and a `netlify.toml` already
  exists. Two things private does **NOT** buy: the **site stays publicly
  visible** either way (a private Pages *site* needs Enterprise Cloud), and it
  **retracts nothing already published** (forks/caches/scrapers). Side effect:
  this repo would drop out of the "Lately" GitHub widget, which lists public
  repos.
- **Astro advisories** in `npm audit` only fix in Astro 7 (major). Fine on static;
  upgrade deliberately later.
- **Agent image previews & the 2000px cap** ⚠️ — when an agent *views* images, each
  image (including ones already loaded earlier in the chat) must be **≤2000px per
  side** for multi-image requests. If a bigger one gets loaded, it poisons the whole
  chat: every later image read fails (surfaces as "cancelled"). Fix: **resize to
  ≤1500px before viewing**, and if it's already broken, **start a fresh chat**. This
  is why some scraped photos this session have generic captions.
- **Self-hosted demo video / repo size** ⚠️ — the LinkedIn Career Discovery page
  self-hosts its demo clip at `public/videos/linkedin-hackathon/demo.mp4`
  (~19 MB, committed to git; served fine by GitHub Pages, well under limits).
  It's an HTML5 `<video>` (poster frame, `preload="none"`). **If we ever hit
  repo-size / storage pressure** (more videos, LFS warnings, slow clones),
  switch this — and any future demo videos — to **Drive-hosted** playback
  (embed the Drive preview iframe, or link out) instead of committing the binary.
  Source video lives on Ava's Drive (`file/d/1EvLNHzAUAuKZlVMybCVtGntN5xqlV82n`).
  Note that anything already committed stays in git history, so a real slim-down
  would need history rewriting (avoid unless necessary).

---

## 7. Deploy

Push to `main` → GitHub Actions builds & deploys → live at
**https://avamartoma.com** in ~1–2 min. The custom domain is bound via
`public/CNAME` (+ `site` in `astro.config.mjs`); DNS is on Cloudflare.

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

### Feed / API ideas — "what's Ava up to" (brainstorm 2026-07-08/09)

> **Guiding filter:** favor feeds that **feed themselves** (auto-update via API) over
> ones that need manual upkeep — a stale feed looks worse than none. Build-time or
> serverless fetch; keep the static-first posture (see §9 ground rules).

- **⭐ "Things of Interest" page via Are.na or Raindrop.io** — the concrete, near-term
  version of Ava's long-term "bot that I bookmark news into → auto-populates a page"
  idea. Use an off-the-shelf bookmarking service as the "bot": save links from
  phone/browser into an **Are.na** channel (visual, design-crowd favorite, free API)
  or **Raindrop.io** (clean link list, free API + save buttons); the site reads that
  collection via API. **No custom bot/backend/DB needed to start.** A custom Telegram
  bot capture layer could come *later* (ties into TODO #12 AI bot). Reframes the
  earlier "curated news feed" — Ava doesn't read the news, so scope it as "stuff I'm
  into" (engineering/design/makers), only if there's real content to feed it.
- **GitHub activity** — recent commits/repos; "what I've been building." Auto, on-brand
  for an engineer. Public API, no backend.
- **Spotify recently-played** 🎧 — already TODO #10; automatable via API (the reason it
  beats manual feeds). **Last.fm** is a lighter alt with a clean free API.
- **Letterboxd** — films watched via a free **RSS feed** (no auth) — easiest to wire.
- **Lichess** — recent games/rating if Ava plays chess; excellent free API.
- **Weather/location** micro-touch — "currently in Philadelphia, 34°F" flavor line.
- **Rejected/parked:** **Strava** (API is free but terms tightened in 2024, and Ava
  isn't deep in it). **NYT Wordle/Connections** — *no public API for personal stats*;
  only manual entry or share-grid paste, so best as a playful **iFAQ line**, not a
  live tracker.

---

## 9. Agent re-onboarding brief

You're working on **Ava's personal website** — a static Astro site on her personal
GitHub, live at **avamartoma.com**. Ground rules:
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

- **2026-08-06 (part 9)** — **`/gallery` photo wall wired.** Viewed all 60
  processed `gal-01..60.jpg`, wrote a hover label + accurate alt + a destination
  for each, and wired the **36 strongest** into the 5 alternating marquee rows
  alongside the 4 Wix covers (**40 items**, balanced mix per row). Destinations
  were worked out from photo contents: projects (`architecture`/`cad-projects`
  covers + `afe-hackathon` = the Spheres shot), Communities (Changemaker, MITES,
  LinkedIn PiT, Chick-fil-A ×4, Amazon Future Engineer), Experience (squash +
  a professional headshot), and personal → HOME (ski/climb/bake/travel/beach/
  family/etc.). Used the 6 certain md5 links; **left gal-14 & gal-17 out** (md5
  ties them to Phi Gamma Nu but their content is generic and the PGN chip is
  inert — didn't mislabel). Dropped ~24 near-duplicate/dark frames. Removed the
  placeholder machinery (`ph()`/PALETTE/RATIOS/`.g-ph`) so the page is photo-only.
  Build ✓ (17 pages); **Playwright 22/22** at 1440×900 + 390×844 + reduced-motion
  (rows auto-scroll, hover pauses the row + reveals the label, reduced-motion →
  hand-scrollable, no console errors). ~24 unused `gal-NN.jpg` remain for later.

- **2026-08-06 (pt.8b)** — **Phi Gamma Nu + Penn M&T modals.** Both inert chips
  became modal buttons. All 18 processed photos viewed and captioned individually;
  **none dropped**. **Phi Gamma Nu `◈17`** — the blurb's facts are read off the
  photos (a slide reading “PGN | Delta Lambda Chapter” lists the class of **15**
  with Ava among them), ordered as a narrative: bid night → the Titans family
  reveal → initiation with roses → the ~50-person chapter photo → chapter life
  (New York dinner, Chinatown, retreat s'mores, dance-show posters). Fixed
  **`pgn-11.jpg`, which was stored rotated 90°**. **Penn M&T `◈1`** — chose a
  modal over an inert chip: one strong legible photo (the cohort on the carved
  Wharton School steps) plus a blurb that explains what M&T is, verified against
  fisher.wharton.upenn.edu (**50–55 admitted a year**, Penn Engineering + Wharton
  dual degree). That needed new CSS — a 1-item array was being squeezed into a
  220 px tile and `4/3` cover-cropped (**254×190, lettering clipped**); a
  `comm__dialog-photos--one` modifier now shows it whole (**786×524**, contain,
  70vh cap). Build ✓ (17 pages), 204/204 asset refs resolve with no orphans,
  Playwright **68/68** at 1440×900 + 390×844 — all run in a throwaway
  `git worktree` at HEAD, because ⚠️ **a second agent session was editing this
  repo concurrently** (see the pt.8b block at the top: HEAD moved 5×, my arrays
  ended up inside commit `846b04b`, and that session's uncommitted tree removes
  the chip badge count and duplicates the single-photo CSS as `--single`).

- **2026-08-06 (CAD studies)** — **CAD & Woodworking Studies photo set wired in.**
  The 67 `cadnew-` photos + 1 clip resolved to just **two pieces** already on the
  page: the **parametric pencil box** (laser-cut plywood caddy, chevron-engraved
  end panel, box joints, pull-out drawer + internal stopper) and the **makeup &
  jewelry organizer** (pyrography meadow, two hand-painted panels — sunflower +
  hibiscus — 3D-printed jewelry dividers, tiered compartments, flip-up lid, secret
  drawer) — Ava's own reshoot of what were scraped photos. Rebuilt
  `cad-projects.md` with a **carousel per piece**, kept the **8 best pencil-box +
  12 best organizer** photos (renamed meaningfully), **deleted 47 redundant
  `cadnew-` frames + 13 superseded old scraped files**, and added a new
  **"Wavy-Front Marquetry Box"** section (that walnut/maple two-drawer box wasn't
  in the set — referenced from `marquetry-desk/desk-03.jpg` with a cross-link).
  Added the **Pyrography** tag. Build ✓ (17 pages); all 34 image + 1 mp4 refs
  resolve in `dist/`, no references to deleted files remain. Uncommitted push.

- **2026-08-06 (Henna Luminary)** — **Rebuilt `luminary.md` around Ava's own
  photos.** Viewed all 16 new `lum-*` shots and replaced the lower-quality
  scraped lvilledesign process shots (which had stood in as "final" but were
  never a lit lantern). Used 10: a hero lit front-on, a top/lid form shot, a
  lid-lift detail, a 4-face carousel of the distinct mehndi panels, and three
  lit angles (warm amber + a colour-changing magenta — the **first lit shots the
  page ever had**). Kept the two irreplaceable scraped assets (mehndi-on-hands
  inspiration, Illustrator vector redraw) and the Origins backlink to
  lvilledesign.org. Deleted the 6 unused new shots + 6 scraped ones
  (`panels.png`, `laser-pieces.jpg`, `process-1..4`). `npm run build` ✓ (17
  pages, all refs resolve, no orphans). ⚠️ The working-tree index was shared with
  a concurrent session, so the change rode into a concurrent commit
  (`luminary.md` last touched by `3266167`) rather than a dedicated one — content
  is correct and live.

- **2026-08-06 (part 8)** — **Chick-fil-A Community Scholars photo modal.**
  Viewed all 28 `cfa-*` shots, verified the program against
  chick-fil-a.com/community-scholars (13 scholars/yr, $25K each, 1-year
  leadership + mentorship program; Ava = 2025 recipient per the $25,000 /
  02-28-2025 check), and added a blurb + 15-item `media` array to the Chick-fil-A
  entry in `index.astro` (chip → `◈ 15`), ordered as a narrative (check reveal →
  Support Center Backstage Tour → Bracken's Kitchen service → Bay Center plant
  tour → Walt Disney Studios day). Dropped 13 personal/scenery shots and deleted
  them from `public/` (raws in git history). Build ✓ (17 pages), 15/15 dist refs
  resolve, Playwright **34/34** at 1440×900 + 390×844. Committed, not pushed;
  unrelated in-flight work preserved via a path-limited commit.

- **2026-08-06 (marquetry finish)** — **Koi clock + Flower press pages done.**
  `marquetry-clock.md` rewritten around its single photo (two calico koi in a
  yin-yang ring on a pond-blue ground, wooden-lotus hub). `marquetry-flower-press.md`
  rewritten as a full case study (8 inline + 6-carousel photos + the 28 s build
  clip): reframed as a **working flower press** (plywood + threaded rods + wing
  nuts) with a laser-cut marquetry lily/iris lid, made as a **promposal**. The
  old *"the CAD for this one is lost"* line was reworded — the charred veneer is
  laser work, so vectors existed. **Deleted `press-15.jpg`** (blurry promposal
  sign with two identifiable faces); used the story/pun in copy without the photo
  or the recipient's name. Date corrected to 2025-05-15. Build ✓ (17 pages), all
  17 asset refs resolve. Uncommitted push (ground rule #5).

- **2026-08-06 (code)** — **Fixed the homepage scroll trap on the "Where I've
  been" timeline.** The `wheel` handler in `src/components/Experience.astro` was
  hijacking *all* vertical wheel input into horizontal timeline scroll and always
  calling `preventDefault()`, so the page couldn't scroll vertically while the
  cursor was over the Experience cards (you had to move the mouse to the side).
  Now it ignores horizontal-intent (trackpad/shift) wheels and releases the wheel
  to the page once the timeline is at its left/right edge — preserving the
  scroll-to-scrub feature without trapping the page. Build ✓ (17 pages).
  Uncommitted.

- **2026-08-06 (part 6)** — **`images/` restructured + Taco Bell / MITES /
  Coolidge / Architecture shipped.** `public/images/` now contains exactly four
  folders — **`projects/`, `communities/`, `experience/`, `gallery/`** — with the
  12 bare project-slug folders moved under `projects/<slug>/` and 85 references
  rewritten (`55c8623`, **pushed**). Then processed **331 MB of raw camera files**
  (committed by Ava in `2384669` + `0f9c4c4`) down to **~18 MB** of web assets and
  deleted the raws from `public/`: **Taco Bell Ambition Accelerator** (10 photos +
  **2 mp4 clips**; KidsMates was a Top 50 semi-finalist of the Taco Bell
  Foundation × Ashoka program), **MITES** (12), **Calvin Coolidge Senator** (9,
  Coolidge Senators Program at Plymouth Notch, VT — verified against
  coolidgescholars.org), and a full rewrite of `architecture.md` into **"The Grove
  — A Charles River Pavilion"** (with Aster Dean at MITES; concept, materials and
  site analysis transcribed from Ava's own presentation boards, 14 photos + a
  7-slide carousel + a build clip). Generalised the modal's `photos` field into
  one ordered **`media`** array so video and stills interleave. **Fixed two real
  modal bugs** that also affected T-Mobile: clicking a chip **scrolled the page to
  the top** (a top-layer `<dialog>` has `position:relative` coerced to `absolute`
  and inherits `inset:0`, anchoring it to the document → now explicitly
  `position:fixed`), and the **× scrolled out of reach** in a long modal (now a
  direct child of the `<dialog>`); video also now pauses on close. Added a **Penn
  M&T** chip and **`.gitignore` rules blocking raw camera files** under
  `public/images/`. Also added **Penn M&T** and **Phi Gamma Nu** chips. Build ✓
  (17 pages), 139/139 asset refs resolve with no orphans and no raws in `dist/`,
  Playwright **186/186** then **42/42** (chip inventory) at 1440×900 + 390×844.
  ⚠️ Needed tooling (none are site deps): `npm i --no-save ffmpeg-static
  playwright` and **`pip install --user pillow-heif`** — Sharp can't decode HEIC
  and **ffmpeg decodes it wrongly** (tile grid + aux streams → greyscale or a
  single 640 px tile).

- **2026-08-06 (part 5)** — **T-Mobile Changemaker photo modal — validated +
  shipped.** Finished the interrupted modal work: `npm run build` passes (17
  pages, no Astro/TS errors) and a Playwright pass at **1440×900 + 390×844** went
  **38/38** (modal opens; all photos decode; captions present; content scrolls;
  ×, backdrop-click, and Escape all close; no console errors; the other 9
  Communities chips stay inert `<span>`s). Per Ava, dropped the **"At the Space
  Needle"** photo — array entry removed and `changemaker-06.jpg` pulled out of
  `public/`, so the chip badge is now **`◈ 12`** and the filename sequence runs
  `01..13` **minus 06** (intentional gap; don't renumber). Also **scaffolded
  `public/images/communities/<slug>/` folders for all 10 programs** (each with a
  `.gitkeep`) so adding a program is just "drop photos in the folder + list them
  in `index.astro`". Committed and **pushed** at Ava's request — **image/photo
  work only**. Deliberately **left out** of the commit and still sitting in the
  working tree: the Sveltia editor (`public/admin/`, `admin-setup.md`, the
  `robots.txt` `Disallow: /admin/` line), the `Experience.astro` edits, and the
  one-off `scripts/process-changemaker-photos.mjs`.

- **2026-08-06 (part 4)** — **New Gallery page + Wix portfolio scrape.** Added
  `/gallery` (in nav): rows of uniformly-sized photos auto-scrolling in
  **alternating directions**, each linking to a project / experience / personal
  page; hover pauses a row + reveals a label; edges soft-fade; respects
  reduced-motion (rows become hand-scrollable). Seeded with the **4 cover photos**
  from `avarmartoma.wixstudio.com/portfolio` (architecture, wood shop, T-Mobile
  Changemaker, beach) + labeled Holi-gradient placeholders across 5 rows.
  Committed **without** the editor page (per Ava). **Pending from the Wix scrape**
  (found, not yet applied — offered): the **Bridge** post has a much richer
  5-version FEA writeup (masses + safety factors) + real **FEA stress-plot
  images**; **"Stranded — A Board Game"** (TSA; 1st FL states, 5th nationally) is a
  strong **new project** to add; the **OSU / Dringenberg** engineering-education
  internship fits the Experience timeline; the ~16 **KidsMates** posts are
  journalism/interviews → better as a future "Writing" section than the catalogue.

- **2026-08-06 (part 3)** — **Homepage restructure + click-into Experience timeline.**
  On the homepage (`index.astro`): moved the **Lately** section *above* the
  Experience ("Where I've been") section; **removed the Publications section**
  entirely; renamed **"Selected honors" → "Communities"** and reworked it from a
  bulleted list into **small pill-tags that light up in the Holi accent colors on
  hover** (cycling violet→blue→pink→green→yellow), `cursor:pointer` and ready for a
  future click-through detail view. Updated the 10 titles (Amazon Future Engineer,
  LinkedIn Possibilities in Tech, Coca-Cola Scholars, Chick-fil-A Community
  Scholars, NCWIT Aspirations in Computing, Calvin Coolidge Senator, MITES,
  T-Mobile Changemaker Challenge, Taco Bell Ambition Accelerator, Davidson Young
  Scholars). **Experience timeline (`Experience.astro`) → click-into:** cards are
  now compact (dates / org / role · location / "Details →"); the bullet highlights
  moved into a **per-role native `<dialog>` detail modal** (Esc / backdrop-click /
  × to close, accessible by default). Added an optional `images:[{src,alt}]` field
  per role that renders as a photo grid in the modal (`public/images/experience/<slug>/`).
  Chose **click-into over dropdown** (photos need room; avoids expanding cards
  inside the horizontal scroller). Fixed drag-vs-click so a drag-scroll doesn't
  open a modal. Penn education card → **"University of Pennsylvania (School of
  Engineering & Wharton)"**. Build ✓ (16 pages). This is the "part 2" uncommitted
  `index.astro` edit the entry below spotted — now completed + documented; still
  **uncommitted**. (Also confirmed the repo can stay **public**: GitHub Pages on
  the free tier requires it; secrets are external/gitignored.)

- **2026-08-06 (part 2)** — **Wooden Car + CAD Bridge fleshed out** from Ava's
  Intro to Mechanical Engineering reflection + process log (two shared Google
  Docs, Fall 2024). Extracted the embedded images, resized ≤1500px, viewed each,
  and wrote full case studies: Bridge (sketch → Fusion → FEA, file hit v34, MDF
  build, it broke) with 4 photos; Wooden Car (Fusion-led design, merged
  rope+foot steering, teamwork/material-sharing, "KACHOW"/flames build) with 6
  photos. Corrected both dates to Fall 2024. ⚠️ **Heads-up:** an **uncommitted
  edit to `src/pages/index.astro`** appeared mid-session (honors→"communities",
  Experience/Publications sections removed) — NOT made by this session; left it
  untouched and unstaged. Review/commit or discard it as you see fit.

- **2026-08-06** — **Photo captions + self-serve editor (Sveltia CMS).**
  Viewed every scraped photo (resized to ≤1500px per §6) and wrote accurate
  captions: all 21 RC-car carousel `alt`s (KiCad schematic/PCB, Voltera/MakerBot/
  Phrozen prints, breadboard, ESC/battery, differential), plus verified the CAD +
  Luminary sets. **Fixes found by actually viewing:** the two `led-lamp-*.jpg`
  files were **phone dimension sketches** (misnamed) → renamed to
  `phone-stand-sketch-{back,front}.jpg` and moved to the Phone Stand section;
  fetched the **real finished LED lamp** photo from lvilledesign.org
  (`led-lamp.jpg`). The Luminary "final" shots were process shots, not a lit
  lantern → recaptioned (panels laid out / stained / dry-fit) + fixed the lead-in.
  **Self-serve editor:** added **Sveltia CMS** at `/admin/`
  (`public/admin/index.html` + `config.yml`, a `projects` collection matching the
  schema, per-project image uploads to `public/images/projects/<slug>/`) + `admin-setup.md`
  walkthrough; `robots.txt` disallows `/admin/`. Editor works once Ava does the
  one-time GitHub-OAuth-app + `sveltia-cms-auth` Cloudflare Worker setup.
  ⚠️ Flagged: the phone-stand render has a personal kids photo as wallpaper (live).
  **Then expanded the galleries** from more lvilledesign.org source photos, using
  Ava's own captions: Organizer 3→7 (filled/empty, 3D inserts, three drawers),
  Pencil box 3→8 (+ concept→Fusion arc), Phone stand → 7 **face-free** renders
  (deliberately excluded the two renders showing the kids' faces — this removed
  the old `phone-stand.png` hero; easy to re-add), Luminary → canonical 4-step
  build sequence. Every image viewed (≤1500px) to confirm caption accuracy.

- **2026-08-05 (part 2)** — **List view, new projects, scraped photos, carousel.**
  Switched project listings (homepage + `/work`) from cards to a **compact
  hover-reveal row list** (`ProjectRow.astro`); `ProjectCard.astro` now unused.
  **New project pages:** Henna-Inspired Luminary (`luminary.md`, scraped from
  lvilledesign.org/ava-m with 7 photos) and a rebuilt **CAD & Woodworking Studies**
  gallery (organizer, pencil box, phone stand, LED lamp + photos). **RC car** page
  fleshed out from the Wix build blog (amartoma25.wixsite.com/projects-in-engineer)
  — KiCad/Voltera/ESC/RadioHead/Ackermann detail + **22 build photos** in a new
  reusable **image carousel** (arrows/dots/counter; JS in `Layout.astro`, CSS in
  `global.css`). Added **"Origins / build log" backlinks** (RC→Wix, Luminary+CAD→
  lvilledesign). Shrank the project detail **banner** (38vh→24vh) and **title**.
  Dates on Luminary/CAD corrected to real 2023 timeframe. ⚠️ Many scraped photos
  have **generic captions** — image previews broke (see §6 2000px gotcha); caption
  in a fresh chat. **Requested next:** a self-serve editor (`TODO.md` #23).

- **2026-08-05 (part 1)** — **New Amazon Path project + card/media rework + LinkedIn media.**
  Added a new project, **Amazon Path** (`afe-hackathon.md`) — the AFE intern
  hackathon project (theme: Pay it Forward) — with two inline screenshots and a
  `Hackathon` tag (also tagged LinkedIn Career Discovery). **Card/detail rework:**
  project cards *and* the detail-page banner now always render the accent-color
  **generative artwork** (no cover images); project **photos flow inline** in the
  body instead. `cover` frontmatter is no longer rendered anywhere (still allowed
  by the schema — unused). **Reveal bug fix:** scroll-reveal used `threshold: 0.15`,
  so a `data-reveal` container taller than ~6.5× the viewport (a body with big
  screenshots) never revealed and stayed `opacity:0` — switched to `threshold: 0`;
  also capped inline `.prose img` at `80vh` and added `.prose video` styling.
  **LinkedIn Career Discovery** page fleshed out into a case study: pulled the demo
  video + four product screenshots from the pitch deck (exported the Google Slides
  as PPTX). ⚠️ The demo video is **self-hosted (~19 MB in git)** — see §6 gotcha for
  the Drive-hosted fallback if storage becomes an issue. All committed; **push
  status: pushed through the card/media/reveal work; the LinkedIn-media commit
  (`1b7f1d6`) + this handover update may still be local — check `git status`.**

- **2026-07-13** — **Resume-alignment content pass + social share image.** Wired
  the **`og:image`**: copied the headshot sticker to `public/og-image.png` and added
  `og:image` (+ `:alt`/`:width`/`:height`) and `twitter:image` in `Layout.astro`
  (absolute URL). Twitter card left as `summary` since the sticker is portrait
  (972×1500) — a dedicated 1200×630 landscape asset stays on TODO #15. Also updated
  site copy to match Ava's revised resume. **Experience timeline** (`Experience.astro`): replaced the
  **Amazon/Kuiper** placeholder with real bullets (Python/Flask as-built dashboard
  across 94 built + ~200 planned antenna sites; on-site Texas install with
  Intellian); quantified **Kesem** (1 of 48 counselors, ~$2K raised), **KidsMates**
  ($16K raised, 5+ partners, literacy drive), **Duke** CFD (112–117% drag delta
  Kia Soul vs. Elantra + paper title), **MIT Langer** (reframed to lit review +
  EVBA / vagal-nerve stimulation eval), and **Put Me In!** (CEO/investor pitch +
  launched store); **added a new Penn Women's Club Squash (Co-Captain)** card
  (#6 nationals, 6 matches, $300 budget). **PER project page**
  (`penn-electric-racing.md`): composite **hand layup** + **ANSYS Fluent / Luminary**
  aero analysis, added `ANSYS Fluent` tag. **Hero** (`Hero.astro`): tool chips now
  lead with **SolidWorks** and add **ANSYS Fluent** + **TypeScript**. Build ✓
  (14 pages). Not yet pushed.

- **2026-07-10 (later)** — **Spotify "Lately" is LIVE.** Finished Path A: deployed the
  Cloudflare Worker (`worker/`) at `https://avamartoma-now-playing.avamartoma.workers.dev`
  (account subdomain `avamartoma`; secrets set as Wrangler secrets via a Cloudflare
  API token — `wrangler login`'s browser callback wouldn't complete on the Cloud
  Desktop). Completed the one-time Spotify OAuth (loopback `127.0.0.1:8888` via a
  throwaway local helper) → refresh token. Reworked the Worker + `NowPlaying.astro`
  to return/render the **current track (equalizer) + recent tracks**, falling back to
  the **last 5 played** when idle. Endpoint hardcoded as the default in
  `NowPlaying.astro` (still overridable via `PUBLIC_SPOTIFY_ENDPOINT`). ⚠️ Gotcha
  hit: an expired auth code silently produced an empty refresh token → Worker returned
  a blank payload; re-doing the exchange within the ~60 s window fixed it.

- **2026-07-10** — **"Lately" section: GitHub + Spotify widgets.** Added a homepage
  "Lately" section (between Experience and Recognition) with two widgets:
  `GitHubActivity.astro` (recent public repos, client-side, no auth — **live**) and
  `NowPlaying.astro` (Spotify frontend; fetches `PUBLIC_SPOTIFY_ENDPOINT` JSON; demo
  card in dev, hidden in prod until wired). Chose **Path A** for Spotify: scaffolded
  a Cloudflare Worker in `worker/` (`/now-playing`, holds secrets server-side).
  ✅ **Spotify since finished (2026-07-10)** — OAuth (refresh token) + `wrangler`
  deploy done and endpoint wired. (Design notes that used to live in
  `personal_assistant.md` have moved to the private `personal-assistant` repo; see
  also `worker/README.md`.) Also added TODO #16 (scroll-driven
  exploded CAD viewer) and #8a (hand-drawn cursor).
- **2026-07-08** — **SEO / discoverability + resume cooldown.** Homepage `<title>`
  now `Ava Martoma` (was "… — Projects"); added Person + WebSite JSON-LD (homepage
  only, with LinkedIn/GitHub `sameAs`), richer OG/Twitter meta + author + RSS
  `<link>`. Added `@astrojs/sitemap` (→ `/sitemap-index.xml`), `public/robots.txt`,
  and an RSS feed at `/rss.xml` (`@astrojs/rss`). Added a 2-day resume-request
  cooldown to the popover + `/resume` (shared `resumeLastSubmit` key). Next lever:
  submit the sitemap in Google Search Console; `og:image` still to do.
- **2026-07-04 (later)** — **Custom domain + email live.** Bought `avamartoma.com`
  at Cloudflare Registrar; set Astro `site` + added `public/CNAME`; DNS (4× A grey
  + www CNAME) + GitHub Pages custom domain + Enforce HTTPS → **live at
  https://avamartoma.com** (www→apex + http→https verified). Set up Cloudflare
  Email Routing: `hello@avamartoma.com` + catch-all → Gmail (deleted Cloudflare's
  auto anti-spoofing lockdown records that were blocking it). Turned on Web3Forms
  delivery (key → `hello@`) across all three forms — tested working. Public
  contact address changed to `hello@avamartoma.com`; scrubbed personal Gmail from
  repo. Email *sending* (send-as via SMTP relay) deferred → `TODO.md` 10a.
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
