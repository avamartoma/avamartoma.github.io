# If the site hasn't deployed — recovery plan

Written 2026-08-06 23:00. Everything below can be done **from a browser on any
device**, including a phone. Nothing requires the machine this was built on.

## The situation

All work is committed and pushed. `main` on GitHub is at the latest commit and
nothing is stranded locally. The only outstanding step is the **deploy**, which
did not run because of a **GitHub-wide Actions + Pages outage** that began
2026-08-06 15:22 UTC (incident: https://stspg.io/rcz3fcm83sff).

Symptoms of that outage, all expected and none caused by this repo:
- workflow runs stuck in `Queued` for hours,
- "failed to cancel" when trying to cancel them,
- a push creating **no run at all** (GitHub deliberately throttled push webhooks
  to aid recovery).

The live site is therefore serving an older successful build. It is **stale, not
broken**, and no work is at risk.

## Option A — wait, then trigger it (preferred)

1. Check https://www.githubstatus.com until **Actions** and **Pages** both read
   *operational*.
2. Go to the repo → **Actions** tab.
3. If a run for the latest commit appeared and succeeded, you're done — check
   https://avamartoma.com.
4. If not: cancel any runs still stuck in `Queued` (this will work once Actions
   is healthy), then in the left sidebar click **Deploy to GitHub Pages** →
   **Run workflow** → branch `main` → **Run workflow**.
5. A healthy run takes about 45s–2m30s. Then hard-refresh the site.

Also confirm **Settings → Pages → Source** is still **GitHub Actions** (not
"Deploy from a branch"). If it was switched, `deploy-pages` hangs exactly like
an outage.

## Option B — deploy without GitHub Actions (if A stays broken)

`netlify.toml` is already committed and correct (`npm run build` → publish
`dist`, Node 20), so Netlify can build the site on its own infrastructure with
**no dependency on GitHub Actions**.

1. https://app.netlify.com → **Add new site** → **Import an existing project** →
   GitHub → pick `avamartoma/avamartoma.github.io`.
2. Netlify reads `netlify.toml`; accept the defaults and deploy.
3. It gives you a `*.netlify.app` URL immediately — enough to confirm the build
   is good.
4. To move the custom domain across: in Netlify add `avamartoma.com` as a custom
   domain, then in **Cloudflare → DNS** replace the four GitHub Pages `A` records
   with what Netlify specifies. Keep records **"DNS only" (grey cloud)** — an
   orange-cloud proxy conflicts with the host's own HTTPS.
5. ⚠️ Only do step 4 if Pages is going to stay broken. Pointing DNS elsewhere and
   back is more disruptive than waiting.

Vercel works the same way and auto-detects Astro if you'd rather.

## Nothing is lost by losing the machine

- Working tree was clean and `main` was fully pushed (verified 0 ahead / 0 behind).
- **322 raw camera files are in git history on GitHub**, so a fresh
  `git clone` recovers every original photo — none of them existed only locally.
- `HANDOVER.md`, `TODO.md` and `NEXT-CHAT-SPOTIFY.md` are all committed, so the
  context and the remaining backlog travel with the repo.

To pick up on a new machine:

```bash
git clone git@github.com:avamartoma/avamartoma.github.io.git
cd avamartoma.github.io && npm install && npm run dev
```

Note the clone is large (history is ~1.3 GB because raws were committed). Use
`git clone --depth 1 <url>` for a fast shallow copy if you only want to work on
the site rather than recover old photos.

## What was left unfinished (not blocking)

- **NCWIT Aspirations in Computing** and **Davidson Young Scholars** chips have
  no photos, so they stay as plain tags until photos exist.
- `afe-02.jpg` is processed but not yet wired into the Amazon Future Engineer
  modal — it needs a caption written from the photo (TODO 3c).
- `TODO.md` #24 (Wix content: Stranded board game, the CAD Bridge FEA detail,
  KidsMates) and #24a (accuracy pass over every project and community).
- Spotify "Lately": see `NEXT-CHAT-SPOTIFY.md`. Its rate limit was due to expire
  ~13:42 on Fri 7 Aug, after which Spotify's own recently-played list takes over
  automatically. The Cloudflare Worker is **already deployed** and unaffected by
  the GitHub outage.
- Repo-size cleanup: the `.gitignore` raw-blocking rules are commented out on
  purpose until the photo import is finished (see the notes in that file).
