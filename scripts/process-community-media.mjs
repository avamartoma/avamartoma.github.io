// Turn raw camera files (straight off a phone / a photographer's card) into the
// web-ready assets the site actually ships. This is the recipe used for every
// Communities photo modal — keep using it so the assets stay consistent.
//
// Photos: .HEIC needs `pip install --user pillow-heif` (see below).
//         Otherwise: auto-rotate by EXIF (then strip the tag), cap the long edge at
//         1500px, re-encode as mozjpeg q82. The 1500px cap also keeps the files
//         viewable by an AI agent — see HANDOVER.md §6, images over 2000px per
//         side break image previews for the rest of a chat session.
// Videos: H.264/AAC MP4 (the only combination that plays everywhere), capped at
//         1280px wide and 30fps, plus a JPEG poster frame so nothing downloads
//         until the visitor presses play. Needs ffmpeg; without it the videos
//         are skipped and the photos still process. ffmpeg is resolved from
//         $FFMPEG, then PATH, then the `ffmpeg-static` npm package. This box has
//         no system ffmpeg, so grab the static build on demand — it is a
//         build-time tool, NOT a site dependency, so keep --no-save:
//           npm i --no-save ffmpeg-static
//
// Usage:
//   node scripts/process-community-media.mjs <slug> <prefix> [--from <dir>]
//
//   <slug>    folder under public/images/communities/, or a path relative to
//             public/images/ if it contains a slash (e.g. projects/architecture)
//   <prefix>  output basename, numbered per type: <prefix>-01.jpg, -02.jpg …
//   --from    where the raw files live (default: the slug folder itself, i.e.
//             raws were committed straight into their destination)
//
// Example:
//   node scripts/process-community-media.mjs taco-bell-ambition-accelerator taco-bell
//
// Raw originals are never deleted by this script — check the output looks right,
// then remove them yourself (`git rm`) so they don't ship in the build.

import sharp from 'sharp';
import { readdirSync, mkdirSync, existsSync, statSync, readFileSync, rmSync } from 'node:fs';
import { join, dirname, isAbsolute } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { execFileSync, spawnSync } from 'node:child_process';

const MAX_IMAGE_EDGE = 1500;
const MAX_VIDEO_EDGE = 1280;
const JPEG_QUALITY = 82;

const [slug, prefix, ...rest] = process.argv.slice(2);
if (!slug || !prefix) {
  console.error('Usage: node scripts/process-community-media.mjs <slug> <prefix> [--from <dir>]');
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
// A bare name means a community folder, EXCEPT for the reserved top-level
// groupings under public/images/ (see public/images/README.md). A path with a
// slash is taken as relative to public/images/, so project galleries work too,
// e.g. `projects/architecture`.
const TOP_LEVEL = ['gallery', 'experience', 'projects', 'communities'];
const outDir = slug.includes('/') || TOP_LEVEL.includes(slug)
  ? join(root, 'public/images', slug)
  : join(root, 'public/images/communities', slug);
const fromFlag = rest.indexOf('--from');
const fromArg = fromFlag === -1 ? null : rest[fromFlag + 1];
// Absolute --from paths are used as-is; relative ones resolve against the repo
// root so `--from public/raw/...` works from anywhere.
const srcDir = !fromArg ? outDir : isAbsolute(fromArg) ? fromArg : join(root, fromArg);

if (!existsSync(srcDir)) {
  console.error(`No such source directory: ${srcDir}`);
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });

const isProcessedName = (f) => new RegExp(`^${prefix}-\\d+\\.(jpg|mp4)$`).test(f);
const entries = readdirSync(srcDir)
  .filter((f) => !isProcessedName(f)) // don't re-process our own output
  .sort();

const images = entries.filter((f) => /\.(jpe?g|png|heic|heif|tiff?|webp)$/i.test(f));
const videos = entries.filter((f) => /\.(mov|mp4|m4v|avi)$/i.test(f));

// Resolve ffmpeg: explicit override, then PATH, then the static npm build.
async function resolveFfmpeg() {
  if (process.env.FFMPEG) return process.env.FFMPEG;
  if (spawnSync('ffmpeg', ['-version']).status === 0) return 'ffmpeg';
  try {
    const mod = await import('ffmpeg-static');
    const bin = mod.default ?? mod;
    if (typeof bin === 'string' && spawnSync(bin, ['-version']).status === 0) return bin;
  } catch {
    /* not installed — videos get skipped below */
  }
  return null;
}
const ffmpeg = videos.length ? await resolveFfmpeg() : null;
const mb = (p) => (statSync(p).size / 1048576).toFixed(1) + 'MB';

// ---------------------------------------------------------------- photos ----
// Sharp on this box has no HEVC decoder, so it cannot decode iPhone .HEIC. It
// *can* read the container header, so a metadata check passes and only the
// pixel decode fails — the fallback therefore has to wrap the whole pipeline,
// not just the metadata read.
//
// HEIC is decoded through Python's pillow-heif, NOT ffmpeg. An iPhone HEIC is
// often a tile grid with extra auxiliary streams (depth/alpha), and ffmpeg
// happily picks the wrong one: you get a washed-out greyscale aux image, or a
// single 640px tile, instead of the photo. pillow-heif assembles the real image
// and applies the EXIF orientation. Install once with:
//   pip install --user pillow-heif
const HEIC_DECODER = `
import sys
try:
    import pillow_heif
except ImportError:
    sys.exit("pillow-heif not installed: pip install --user pillow-heif")
from PIL import Image
pillow_heif.register_heif_opener()
Image.open(sys.argv[1]).convert("RGB").save(sys.argv[2])
`;

const shrink = (img, out) =>
  img
    .rotate() // honor EXIF orientation, then strip it
    .resize({
      width: MAX_IMAGE_EDGE,
      height: MAX_IMAGE_EDGE,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toFile(out);

async function processImage(input, out) {
  try {
    return await shrink(sharp(input), out);
  } catch (err) {
    if (!/\.(heic|heif)$/i.test(input)) throw err;
    const tmp = join(tmpdir(), `pcm-${Date.now()}-${Math.random().toString(36).slice(2)}.png`);
    try {
      execFileSync('python3', ['-c', HEIC_DECODER, input, tmp], {
        stdio: ['ignore', 'ignore', 'inherit'],
      });
      const res = await shrink(sharp(readFileSync(tmp)), out);
      console.log(`    (decoded ${input.split('/').pop()} via pillow-heif)`);
      return res;
    } finally {
      rmSync(tmp, { force: true });
    }
  }
}

// --------------------------------------------------------- location guard ----
// Belt-and-suspenders: the pipeline already strips metadata (sharp drops it by
// default; ffmpeg runs `-map_metadata -1`), but a raw's home/venue GPS must
// NEVER reach a shipped file. After processing we re-open every output and hard
// fail if any still carries EXIF GPS (JPEG) or a QuickTime location atom (MP4),
// since this repo is public and committed files are world-readable forever.

// Detect an EXIF GPS IFD (tag 0x8825) in sharp's raw EXIF buffer. sharp prefixes
// the buffer with "Exif\0\0" before the TIFF header, so all IFD offsets are
// relative to that TIFF start, not to byte 0.
function jpegHasGps(exif) {
  if (!exif || exif.length < 8) return false;
  let base = 0;
  if (exif.toString('ascii', 0, 6) === 'Exif\u0000\u0000') base = 6;
  if (base + 8 > exif.length) return false;
  const bo = exif.toString('ascii', base, base + 2);
  const le = bo === 'II';
  if (!le && bo !== 'MM') return false;
  const u16 = (o) => (le ? exif.readUInt16LE(o) : exif.readUInt16BE(o));
  const u32 = (o) => (le ? exif.readUInt32LE(o) : exif.readUInt32BE(o));
  try {
    const ifd0 = base + u32(base + 4);
    const count = u16(ifd0);
    for (let i = 0; i < count; i++) {
      const entry = ifd0 + 2 + i * 12;
      if (entry + 2 > exif.length) break;
      if (u16(entry) === 0x8825) return true; // GPS Info IFD pointer
    }
  } catch {
    /* truncated/odd EXIF — treat as no parseable GPS */
  }
  return false;
}

// QuickTime/ISO location markers in an MP4 container.
const MP4_LOCATION = [
  /com\.apple\.quicktime\.location/,
  /\xa9xyz/,
  /[+\-]\d{2,3}\.\d{3,}[+\-]\d{2,3}\.\d{3,}[+/]/, // ISO 6709 coordinate string
];

async function findLeakedLocation(files) {
  const bad = [];
  for (const f of files) {
    if (!existsSync(f)) continue;
    if (/\.jpg$/i.test(f)) {
      const md = await sharp(f).metadata();
      if (md.exif && jpegHasGps(md.exif)) bad.push(`${f} (EXIF GPS)`);
    } else if (/\.mp4$/i.test(f)) {
      const buf = readFileSync(f).toString('latin1');
      if (MP4_LOCATION.some((re) => re.test(buf))) bad.push(`${f} (QuickTime location)`);
    }
  }
  return bad;
}

let n = 0;
const skipped = [];
const produced = [];
for (const file of images) {
  const input = join(srcDir, file);
  const next = String(n + 1).padStart(2, '0');
  const out = join(outDir, `${prefix}-${next}.jpg`);
  try {
    await processImage(input, out);
    const after = await sharp(out).metadata();
    n += 1;
    produced.push(out);
    console.log(`${next}  ${file.padEnd(44)} -> ${after.width}x${after.height}  ${mb(out)}`);
  } catch (err) {
    skipped.push(file);
    console.log(`--  SKIP ${file}  (${err.message.split('\n')[0]})`);
  }
}

// ---------------------------------------------------------------- videos ----
let v = 0;
for (const file of videos) {
  const input = join(srcDir, file);
  const next = String(v + 1).padStart(2, '0');
  const out = join(outDir, `${prefix}-video-${next}.mp4`);
  const poster = join(outDir, `${prefix}-video-${next}-poster.jpg`);
  if (!ffmpeg) {
    skipped.push(`${file} (ffmpeg unavailable)`);
    console.log(`--  SKIP ${file}  (ffmpeg not found — see the header of this script)`);
    continue;
  }
  try {
    execFileSync(
      ffmpeg,
      [
        '-y', '-loglevel', 'error',
        '-i', input,
        // Cap the LONG edge, not the width: phone clips are portrait behind a
        // rotation matrix, so a width-only cap silently does nothing to them.
        // -2 lets the other edge follow the aspect ratio and land on an even
        // number, which H.264 requires. min() prevents upscaling small clips.
        '-vf',
        `scale='if(gte(iw,ih),min(iw,${MAX_VIDEO_EDGE}),-2)':` +
          `'if(gte(iw,ih),-2,min(ih,${MAX_VIDEO_EDGE}))',fps=30`,
        '-c:v', 'libx264', '-profile:v', 'high', '-level', '4.0',
        '-crf', '25', '-preset', 'slow', '-pix_fmt', 'yuv420p',
        '-c:a', 'aac', '-b:a', '128k',
        '-map_metadata', '-1', // drop camera/location metadata
        '-movflags', '+faststart', // metadata up front so playback can start early
        out,
      ],
      { stdio: ['ignore', 'ignore', 'inherit'] },
    );
    // Poster: let ffmpeg pick a representative frame from the opening seconds
    // rather than frame 0, which is often a blurry mid-motion shot.
    execFileSync(
      ffmpeg,
      [
        '-y', '-loglevel', 'error',
        '-i', out,
        '-vf', 'thumbnail=60',
        '-frames:v', '1', '-q:v', '4',
        poster,
      ],
      { stdio: ['ignore', 'ignore', 'inherit'] },
    );
    v += 1;
    produced.push(out, poster);
    console.log(
      `v${next} ${file.padEnd(44)} ${mb(input)} -> ${mb(out)}  (+poster ${mb(poster)})`,
    );
  } catch (err) {
    skipped.push(file);
    console.log(`--  SKIP ${file}  (${err.message.split('\n')[0]})`);
  }
}

console.log(
  `\nDone: ${n} photo${n === 1 ? '' : 's'}` +
    (videos.length ? `, ${v} video${v === 1 ? '' : 's'}` : '') +
    ` -> ${outDir.replace(root + '/', '')}/`,
);
if (skipped.length) console.log(`Skipped: ${skipped.join(', ')}`);
console.log('Raw originals were left in place — remove them once the output looks right.');

// Hard gate: never let a shipped asset carry location data.
const leaked = await findLeakedLocation(produced);
if (leaked.length) {
  console.error(
    `\n✗ LOCATION METADATA DETECTED in ${leaked.length} output(s) — NOT safe to commit:`,
  );
  for (const l of leaked) console.error(`    ${l}`);
  console.error(
    'Re-encode these before committing (the repo is public; committed GPS is permanent).',
  );
  process.exit(1);
}
console.log(`✓ Location check passed — ${produced.length} output(s) carry no GPS/location metadata.`);
