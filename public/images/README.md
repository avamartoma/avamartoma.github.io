# Images

Drop your images in this folder and reference them from anywhere on the site
with a **leading slash** (the `public/` part is dropped in the URL):

| File on disk                     | Reference in code / frontmatter |
|----------------------------------|---------------------------------|
| `public/images/me.jpg`           | `/images/me.jpg`                |
| `public/images/projects/foo.jpg` | `/images/projects/foo.jpg`      |

## Photos of yourself

- **About-section portrait:** replace `ava-portrait.svg` here (or add
  `ava-portrait.jpg`) and update the `src` in `src/pages/index.astro`
  (search for `ava-portrait`). One line to change.
- Aim for roughly **1200×1440px**, portrait orientation, for the about photo.

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
