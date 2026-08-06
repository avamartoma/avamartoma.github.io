// Turn raw camera files (straight off a phone / a photographer's card) into the
// web-ready assets the site actually ships. This is the recipe used for every
// Communities photo modal — keep using it so the assets stay consistent.
//
// Photos: auto-rotate by EXIF (then strip the tag), cap the long edge at
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
//   <slug>    folder under public/images/communities/
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
import { readdirSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, basename, extname } from 'node:path';
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
const outDir = join(root, 'public/images/communities', slug);
const fromFlag = rest.indexOf('--from');
const srcDir = fromFlag === -1 ? outDir : join(root, rest[fromFlag + 1]);

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
let n = 0;
const skipped = [];
for (const file of images) {
  const input = join(srcDir, file);
  const next = String(n + 1).padStart(2, '0');
  const out = join(outDir, `${prefix}-${next}.jpg`);
  try {
    const before = await sharp(input).metadata();
    await sharp(input)
      .rotate() // honor EXIF orientation, then strip it
      .resize({
        width: MAX_IMAGE_EDGE,
        height: MAX_IMAGE_EDGE,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toFile(out);
    const after = await sharp(out).metadata();
    n += 1;
    console.log(
      `${next}  ${file.padEnd(44)} ${before.width}x${before.height} -> ` +
        `${after.width}x${after.height}  ${mb(out)}`,
    );
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
    ` -> public/images/communities/${slug}/`,
);
if (skipped.length) console.log(`Skipped: ${skipped.join(', ')}`);
console.log('Raw originals were left in place — remove them once the output looks right.');
