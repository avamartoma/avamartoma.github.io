# raw/ — unprocessed camera originals (NOT committed)

Drop unprocessed photo/video originals here (`IMG_*.HEIC`, `DSC*.jpg`, `*.mov`,
`*_Original*`, etc.). **Everything in this folder except this README is
gitignored** — see the `/raw/*` rule in `.gitignore`.

## Why

The site repo is **public**. Anything committed is world-readable *forever* —
deleting a file in a later commit does **not** remove it from history, and
camera originals carry **EXIF GPS**. So originals never go into git; only the
processed, EXIF-stripped web derivatives do.

## Workflow

1. Copy originals into `raw/<slug>/` (e.g. `raw/mites/`).
2. Process them into web assets (resized ≤1500 px, q82, EXIF stripped):

   ```bash
   node scripts/process-community-media.mjs <slug> <prefix> --from raw/<slug>
   ```

3. Commit only the generated `public/images/.../<prefix>-01.jpg` /
   `<prefix>-video-01.mp4` files. The originals stay here, local-only.

Keep raws on disk (or a backup) if you want to re-process later — they are not
in version control.
