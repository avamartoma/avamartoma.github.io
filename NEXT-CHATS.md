# Copy-paste prompts to finish the photo work

Each block below is **one fresh chat**. Paste the whole block as your first
message. Do them in this order (smallest first) and let each one finish and
commit before starting the next.

**Why one set per chat:** a chat can only ever include ~100 inline images, and
every photo has to be looked at to be captioned. Session pt.7 died at
*"too many inline media segments: 102 exceeds limit 100"*. The image budget —
not the code — is the limit.

Progress: tick these off as they land.

- [ ] 1. Marquetry Clock + Flower Press (18 photos)
- [ ] 2. Henna Luminary (16 photos)
- [ ] 3. Chick-fil-A Community Scholars (28 photos)
- [ ] 4. LinkedIn Possibilities in Tech + Coca-Cola Scholars (38 photos)
- [ ] 5. Gallery wall (60 photos)
- [ ] 6. CAD & Woodworking Studies (69 photos — may need splitting)

---

## Chat 1 — Marquetry Clock + Flower Press

```
Read HANDOVER.md (start with the red block at the top) and finish the two
marquetry projects.

Do the Koi-Fish Veneer Clock first: there is one processed photo,
public/images/projects/marquetry-clock/clock-01.jpg. View it and rewrite
src/content/projects/marquetry-clock.md around it.

Then the Marquetry Flower Press: 15 photos (press-01..15) plus a 28-second clip
(press-video-01.mp4 + poster) in public/images/projects/marquetry-flower-press/.
HANDOVER already records what press-01..06 show, so you only need to view
press-07..15 and the poster. Rewrite
src/content/projects/marquetry-flower-press.md as a case study following the
shape of src/content/projects/marquetry-desk.md (which I did last session) —
inline photos plus a carousel, and use the <video> pattern from
src/content/projects/architecture.md for the clip.

Note: the current flower-press page says "the CAD for this one is lost". The
photos clearly show laser-cut veneer, so vector files existed — reword rather
than repeat that.

Delete any processed photo you don't end up using so nothing uncaptioned ships;
the raws are permanently in commit 0f9c4c4 if one is wanted back. Then
npm run build, update HANDOVER.md and TODO.md, and commit. Don't push.
```

---

## Chat 2 — Henna Luminary

```
Read HANDOVER.md (start with the red block at the top), then upgrade the Henna
Luminary project with Ava's own photos.

public/images/projects/luminary/ has 16 newly processed photos (lum-01..16)
alongside 8 older ones scraped from lvilledesign.org (design.png, panels.png,
laser-pieces.jpg, inspiration-henna.jpeg, process-1-cut.jpg,
process-2-stain.jpg, process-3-dry-assembly.jpg, process-4-drying.jpg).

View all 16 new photos and work out which of the existing scraped ones they
replace — the scraped set is lower quality and its captions were corrected once
already (they are process shots, not a finished lit lantern). Rewrite
src/content/projects/luminary.md around the best set. Keep the "Origins" backlink
to lvilledesign.org.

Delete the photos you don't use, npm run build, update HANDOVER.md and TODO.md,
and commit. Don't push.
```

---

## Chat 3 — Chick-fil-A Community Scholars

```
Read HANDOVER.md (start with the red block at the top), then build the
Chick-fil-A Community Scholars photo modal.

28 processed photos are in
public/images/communities/chick-fil-a-community-scholars/ as cfa-01..28.jpg.
View every one, then wire the modal in src/pages/index.astro by adding a `media`
array to that community's entry — copy the pattern from the MITES or Taco Bell
entry that is already there. Every item needs specific alt text describing what
is actually in the frame plus a short caption, and the array order should tell
the story rather than follow the file numbering.

Write the blurb from evidence in the photos (badges, banners, signage). If you
cannot establish a fact, leave it out rather than guessing — and verify the
program details against the web the way the Coolidge blurb was verified.

Note for the gallery later: cfa-05, cfa-07, cfa-25 and cfa-26 are byte-identical
to gal-41, gal-42, gal-52 and gal-53.

Some photos are informal shots of other participants; publish the ones that show
the program and leave the rest out, flagging what you dropped. Delete unused
processed photos. Then npm run build, run a Playwright check of the new modal at
1440x900 and 390x844 (HANDOVER has the required executablePath and the quirks to
work around), update HANDOVER.md and TODO.md, and commit. Don't push.
```

---

## Chat 4 — LinkedIn Possibilities in Tech + Coca-Cola Scholars

```
Read HANDOVER.md (start with the red block at the top), then build two
Communities photo modals in src/pages/index.astro, following the MITES / Taco
Bell pattern already in that file.

  LinkedIn Possibilities in Tech — 25 photos, lpit-01..25.jpg
  Coca-Cola Scholars — 11 photos (coke-01..11.jpg) plus a clip
    (coke-video-01.mp4 + coke-video-01-poster.jpg)

Both folders are under public/images/communities/. View every photo, write
specific alt text and a short caption for each, and order each array as a
narrative. An entry with a `poster` renders as a <video>, so the Coca-Cola clip
goes in the same `media` array as its photos.

Write each blurb from evidence visible in the photos and verify program facts
against the web rather than guessing. Note that lpit-08 is byte-identical to
gal-18 in the gallery.

Delete unused processed photos, npm run build, run a Playwright check of both
modals at 1440x900 and 390x844, update HANDOVER.md and TODO.md, and commit.
Don't push.
```

---

## Chat 5 — Gallery wall (60 photos)

```
Read HANDOVER.md (start with the red block at the top), then wire up the
/gallery photo wall. This is the whole chat — do nothing else.

public/images/gallery/ has 60 processed photos (gal-01..60.jpg) plus the 4
original cover-*.jpg. src/pages/gallery.astro currently shows the 4 covers and a
wall of ph('Label', href) placeholders; swap those for
photo('/images/gallery/gal-NN.jpg', 'alt', href, 'Label') entries. There is a
comment block at the top of that file explaining the helpers and the
destinations (P(), EXP, COMM, HOME).

Ava's instruction: work out each photo's link from what is actually in it, and
expect overlap with the projects and communities. Six destinations are already
CERTAIN because the files are byte-identical to photos in other sets — they are
listed in the gallery.astro comment, so use them rather than re-deriving:
gal-18, gal-41, gal-42, gal-49, gal-52, gal-53.

View all 60. For each, give a short hover label and a destination. Community
photos link to COMM (#recognition); project photos to P('slug'); job/role photos
to EXP; personal ones to HOME. If a photo genuinely doesn't fit anything, leave
it out rather than mislabelling it.

Balance the 5 rows so each has a mix, npm run build, check /gallery at 1440x900
and 390x844 (rows scroll, hover pauses and reveals the label, reduced-motion
still works), update HANDOVER.md and TODO.md, and commit. Don't push.
```

---

## Chat 6 — CAD & Woodworking Studies (69 files)

```
Read HANDOVER.md (start with the red block at the top), then extend the CAD &
Woodworking Studies project with the new photos.

public/images/projects/cad-projects/ holds 67 new photos (cadnew-01..67.jpg) and
a clip (cadnew-video-01.mp4 + poster), alongside the existing curated assets
(organizer-*, pencil-box-*, phone-stand-*, led-lamp*) that
src/content/projects/cad-projects.md already uses.

This is the biggest set — if you approach ~80 images viewed, stop, commit what is
finished, and say clearly which cadnew-NN files are still unreviewed so the next
chat can pick up from there.

View the new photos and work out which sub-project each belongs to. The page is
organised by piece (organizer, pencil box, phone stand, LED lamp) with a
carousel per piece. Expect at least one new piece: the marquetry desk photos show
a wavy-fronted two-drawer walnut and maple box that belongs here, and
marquetry-desk.md already links to this page for it.

RENAME cadnew-NN.jpg to something meaningful per piece (the cadnew- prefix only
existed to avoid colliding with the curated names) and update any references.
Write specific alt text and captions for everything you keep, delete the rest.
Then npm run build, verify every image reference in dist/ resolves, update
HANDOVER.md and TODO.md, and commit. Don't push.
```

---

## Still outstanding after all six

- **Amazon Future Engineer** has an empty photo folder — nothing was ever sent
  for it. Same for NCWIT Aspirations in Computing, Penn M&T, Phi Gamma Nu and
  Davidson Young Scholars. Those chips stay inert until photos arrive.
- **Repo size.** History is ~1.3 GB. The `.gitignore` raw-blocking patterns are
  commented out **on purpose** so Ava's remaining batches aren't swallowed. Once
  she says the import is done, do one cleanup pass: uncomment them *and* rewrite
  history to strip the raw blobs. Needs a force-push and invalidates her other
  clone — don't start it unprompted.
- **Nothing is pushed.** There are 10 local commits. Push when Ava asks.
