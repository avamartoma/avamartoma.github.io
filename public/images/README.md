# Images

Drop your images in this folder and reference them from anywhere on the site
with a **leading slash** (the `public/` part is dropped in the URL):

| File on disk                     | Reference in code / frontmatter |
|----------------------------------|---------------------------------|
| `public/images/me.jpg`           | `/images/me.jpg`                |
| `public/images/projects/foo.jpg` | `/images/projects/foo.jpg`      |

## Photos of yourself

- **About-section portrait:** the real headshot lives at
  `src/assets/ava-headshot.jpeg` and is wired into `src/pages/index.astro` via
  Astro's `<Image>` component, which **auto-optimizes** it at build time
  (resizes + converts to WebP; the 3 MB original ships as ~20–56 KB).
- To swap it: replace `src/assets/ava-headshot.jpeg` (keep the name) or update
  the `import headshot from '../assets/...'` line in `index.astro`.
- Big source files are fine here — Astro optimizes them. Aim for a portrait
  orientation photo at least ~1200px on the short side.

> **public/ vs src/assets/:** images in `src/assets/` (imported + used with
> `<Image>`) are optimized automatically. Images in `public/` (below) are
> served as-is with **no** optimization — use `public/` only for things that
> must keep an exact path/filename (favicons, social share images, PDFs).

## Project cover images

- Add the file here (e.g. `projects/aurora.jpg`), then set
  `cover: "/images/projects/aurora.jpg"` in that project's Markdown frontmatter.
- Recommended size: **1600×1000px** (16:10) — that's the card aspect ratio.
- Omit `cover` entirely to use the auto-generated accent-color artwork instead.

## Tips

- **Format:** use `.jpg` for photos, `.png`/`.svg` for graphics/logos, and
  `.webp` if you want smaller files (all modern browsers support it).
- **Optimize before committing** so the repo stays light — [Squoosh](https://squoosh.app/)
  (drag, drop, download) is the easiest way. Target < 300 KB per photo.
- Your own drawings/scans work great here too — this is where the
  "artsy" half of artsy-engineer lives.
