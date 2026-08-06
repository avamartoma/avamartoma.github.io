// Cloudflare Worker — Spotify "Lately" proxy for avamartoma.com
//
// Holds the Spotify secrets server-side (as Wrangler secrets, NOT in this repo)
// and returns what Ava is playing now + recently played:
//
// If `recent` is always empty while `current` works, the refresh token is
// probably missing the `user-read-recently-played` scope (a different scope from
// currently-playing). Check with:
//   curl -s '<worker-url>/now-playing?debug=1' | jq .debug
//   {
//     isPlaying: boolean,
//     current:   { title, artist, album, albumImageUrl, songUrl } | null,
//     recent:    [ { title, artist, album, albumImageUrl, songUrl, playedAt }, ... ]  // up to 5
//   }
//
// Content filtering (see CONFIG below) happens HERE, server-side, so anything
// explicit or hand-blocked never reaches the website at all.
//
// Secrets are read from `env` (set with `wrangler secret put` — see README):
//   SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENT_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=10';

// ---- CONFIG: content filtering ---------------------------------------------
// The `explicit` flag alone is too broad (lots of fine songs are flagged), so
// it's OFF by default. Instead we auto-hide only tracks whose TITLE contains
// genuinely crass language — that catches the really-crass ones while letting
// ordinary explicit songs through. (This is title-based; a clean-titled song
// with filthy lyrics won't be auto-caught — add those to BLOCKED_SONGS.)
const HIDE_EXPLICIT = false;
const HIDE_CRASS_TITLES = true;
// Only show music (skip podcast episodes / ads as the "now playing").
const MUSIC_ONLY = true;
// ============================================================================
// SONGS TO ALWAYS HIDE — the easy list to grow over time.
//
// To add more later, just add one line to BLOCKED_SONGS below, in any of these
// forms:
//   - 'song title'       — matched as a whole phrase in the title
//                          (e.g. 'wap' hides "WAP" and "WAP (feat. …)" but NOT "Swap Meet")
//   - 'title | artist'   — when you need to disambiguate two songs with the same title
//   - a Spotify track ID — the most precise (exact one track)
//
// Then redeploy once:  cd worker && npx wrangler@latest deploy
// Each addition is just a line + a redeploy — no logic to touch.
//
// NO-CODE / NO-REDEPLOY OPTION: entries added to the Cloudflare KV "list" key are
// merged in at request time, so you can add songs straight from the Cloudflare
// dashboard with no code edit and no deploy. Same three entry formats as above.
// One-time setup + how to edit it is documented in worker/wrangler.toml.
const BLOCKED_SONGS = [
  'slut me out',
  'slut me out 2',
  'wap',
  'blick sum',
];
// ============================================================================
// ARTISTS TO ALWAYS HIDE — blocks EVERY track by these artists, regardless of
// title. Matched as a whole word against the track's artist(s), so a
// collaboration/feature also counts (e.g. "Latto" hides both her own songs and
// any track where she's a featured artist). Case-insensitive.
//
// Add a line per artist name, then redeploy once (or add to the Cloudflare KV
// "artists" key for the no-code / no-redeploy option — see wrangler.toml).
const BLOCKED_ARTISTS = [
  'latto',
];
// ============================================================================
// ============================================================================

// Strong terms that, in a TITLE, mark a track as too crass for the site.
// Includes common self-censored spellings (f*ck, sh*t). Matched as whole tokens
// so "class"/"assassin" etc. don't false-positive.
const STRONG_TERMS = [
  'fuck', 'f*ck', 'f**k', 'fuckin', 'motherfucker', 'shit', 'sh*t',
  'bitch', 'b*tch', 'cunt', 'pussy', 'whore', 'slut', 'dick',
  'cock', 'nigga', 'n*gga', 'nigger', 'faggot',
];

// Whole-token match (treats * literally) so lookalikes don't false-positive.
function wholeMatch(haystack, term) {
  const esc = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(^|[^a-z0-9])${esc}([^a-z0-9]|$)`, 'i').test(haystack);
}

function hasStrongLanguage(title) {
  const s = (title || '').toLowerCase();
  return STRONG_TERMS.some((term) => wholeMatch(s, term.toLowerCase()));
}

function isBlockedSong(t, songs) {
  const title = (t.title || '').toLowerCase();
  const artist = (t.artist || '').toLowerCase();
  const id = (t.id || '').toLowerCase();
  return songs.some((raw) => {
    const entry = String(raw).trim().toLowerCase();
    if (!entry) return false;
    if (/^[a-z0-9]{22}$/.test(entry)) return entry === id;       // Spotify track ID
    if (entry.includes('|')) {                                    // "title | artist"
      const [ti, ar] = entry.split('|').map((s) => s.trim());
      return (!ti || wholeMatch(title, ti)) && (!ar || artist.includes(ar));
    }
    return wholeMatch(title, entry);                              // title phrase
  });
}

function isBlockedArtist(t, artists) {
  const artist = (t.artist || '').toLowerCase();
  if (!artist) return false;
  return artists.some((raw) => {
    const entry = String(raw).trim().toLowerCase();
    if (!entry) return false;
    return wholeMatch(artist, entry);
  });
}

function isAllowed(t, blockedSongs, blockedArtists) {
  if (!t) return false;
  if (HIDE_EXPLICIT && t.explicit) return false;
  if (HIDE_CRASS_TITLES && hasStrongLanguage(t.title)) return false;
  if (isBlockedSong(t, blockedSongs)) return false;
  if (isBlockedArtist(t, blockedArtists || [])) return false;
  return true;
}

// Read extra blocked entries from a Cloudflare KV key, if a KV namespace is
// bound (binding name BLOCKED_SONGS_KV — see wrangler.toml). Lets the lists be
// edited in the Cloudflare dashboard with no code change and no redeploy.
// Accepts a JSON array or plain newline/comma-separated text. Fails soft.
async function getExtraFromKV(env, key) {
  try {
    if (!env || !env.BLOCKED_SONGS_KV) return [];
    const raw = await env.BLOCKED_SONGS_KV.get(key);
    if (!raw) return [];
    let arr;
    try { arr = JSON.parse(raw); } catch { arr = raw.split(/[\n,]+/); }
    return Array.isArray(arr) ? arr.map((s) => String(s).trim()).filter(Boolean) : [];
  } catch {
    return [];
  }
}

// "list" key = blocked songs; "artists" key = blocked artists.
const getExtraBlockedSongs = (env) => getExtraFromKV(env, 'list');
const getExtraBlockedArtists = (env) => getExtraFromKV(env, 'artists');

// Strip internal-only fields (id, explicit, isPlaying) before sending to the client.
function publicTrack(t) {
  if (!t) return null;
  const { id, explicit, isPlaying, ...rest } = t;
  return rest;
}

export default {
  async fetch(request, env, ctx) {
    const headers = {
      'Content-Type': 'application/json',
      // Public, read-only data (what Ava is playing). '*' avoids CORS friction
      // between the prod site and local dev; lock to the site origin if desired.
      'Access-Control-Allow-Origin': '*',
      // Cache briefly so we don't hammer Spotify (widget polls ~60s).
      'Cache-Control': 'public, max-age=30',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: { ...headers, 'Access-Control-Allow-Methods': 'GET, OPTIONS' },
      });
    }

    try {
      const token = await getAccessToken(env);
      const [current, recent, extraBlocked, extraBlockedArtists] = await Promise.all([
        getCurrentlyPlaying(token),
        getRecentlyPlayedCached(token, env, ctx),
        getExtraBlockedSongs(env),
        getExtraBlockedArtists(env),
      ]);
      const blockedSongs = [...BLOCKED_SONGS, ...extraBlocked];
      const blockedArtists = [...BLOCKED_ARTISTS, ...extraBlockedArtists];

      // Surface `current` only when actively playing AND allowed by the filter.
      const playing = current && current.isPlaying && isAllowed(current, blockedSongs, blockedArtists) ? current : null;

      // Filter the recent list, drop the live track from it, then cap at 5.
      let recentList = recent.filter((t) => isAllowed(t, blockedSongs, blockedArtists));
      if (playing) recentList = recentList.filter((t) => t.songUrl !== playing.songUrl);
      recentList = recentList.slice(0, 5);

      const body = {
        isPlaying: Boolean(playing),
        current: publicTrack(playing),
        recent: recentList.map(publicTrack),
      };
      // ?debug=1 explains an empty recent list: whether Spotify refused the
      // call, or the filters/de-dupe emptied it. No track data beyond what the
      // normal payload already exposes.
      if (new URL(request.url).searchParams.get('debug') === '1') {
        body.debug = {
          recentFetched: recent.length,
          recentAfterFilters: recentList.length,
          recentError: lastRecentError,
          recentSource: lastRecentSource,
          droppedByFilters: recent.length - recentList.length,
        };
      }
      return new Response(JSON.stringify(body), { headers });
    } catch (err) {
      // Fail soft — the widget shows an idle state on an empty payload.
      return new Response(
        JSON.stringify({ isPlaying: false, current: null, recent: [] }),
        { status: 200, headers }
      );
    }
  },
};

async function getAccessToken(env) {
  const basic = btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`);
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: env.SPOTIFY_REFRESH_TOKEN,
    }),
  });
  if (!res.ok) throw new Error(`token ${res.status}`);
  const data = await res.json();
  return data.access_token;
}

function mapTrack(item) {
  if (!item) return null;
  return {
    id: item.id ?? '',
    title: item.name ?? '',
    artist: (item.artists || []).map((a) => a.name).join(', '),
    album: item.album?.name ?? '',
    albumImageUrl: item.album?.images?.[0]?.url ?? '',
    songUrl: item.external_urls?.spotify ?? '',
    explicit: Boolean(item.explicit),
  };
}

async function getCurrentlyPlaying(token) {
  const res = await fetch(NOW_PLAYING_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // 204 = nothing playing; anything >=400 = treat as nothing playing.
  if (res.status === 204 || res.status >= 400) return null;
  const data = await res.json();
  if (!data || !data.item) return null;
  // Skip podcasts/ads if MUSIC_ONLY — only surface actual tracks as "now playing".
  if (MUSIC_ONLY && data.currently_playing_type && data.currently_playing_type !== 'track') return null;
  const t = mapTrack(data.item);
  return t ? { ...t, isPlaying: Boolean(data.is_playing) } : null;
}

// Records why the recent list came back empty, so /now-playing?debug=1 can say
// so instead of the widget silently showing a single track. Module scope is fine
// here: a Worker isolate handles one request at a time through this path.
let lastRecentError = null;
let lastRecentSource = 'spotify';

// Recently-played is the endpoint Spotify rate-limits hardest, and the widget
// polls every 60s for EVERY visitor. A Cache-Control header alone doesn't stop
// that — Workers don't cache their own subrequests — so each poll was a fresh
// Spotify call and the endpoint started returning 429 Too Many Requests. Cache
// the result at the edge so Spotify sees roughly one call per FRESH_MS no matter
// how much traffic arrives, and keep a longer-lived KV copy so a 429 (which can
// persist for a while) shows the last known list instead of nothing.
const RECENT_CACHE_KEY = 'https://internal.cache/recently-played';
const RECENT_FRESH_MS = 120_000;   // edge cache window
const RECENT_BACKUP_KEY = 'recent_backup';
const RECENT_BACKUP_MIN_WRITE_MS = 900_000; // >= 15 min between KV writes

async function readRecentBackup(env) {
  try {
    if (!env || !env.BLOCKED_SONGS_KV) return null;
    const raw = await env.BLOCKED_SONGS_KV.get(RECENT_BACKUP_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed?.tracks) ? parsed : null;
  } catch {
    return null;
  }
}

// Throttled so this stays well inside the KV free-tier write allowance.
async function writeRecentBackup(env, tracks, previous) {
  try {
    if (!env || !env.BLOCKED_SONGS_KV || !tracks.length) return;
    const age = previous?.at ? Date.now() - previous.at : Infinity;
    if (age < RECENT_BACKUP_MIN_WRITE_MS) return;
    await env.BLOCKED_SONGS_KV.put(
      RECENT_BACKUP_KEY,
      JSON.stringify({ at: Date.now(), tracks }),
    );
  } catch {
    /* fails soft — the backup is a nicety, not required */
  }
}

async function getRecentlyPlayedCached(token, env, ctx) {
  const cache = caches.default;
  const cacheReq = new Request(RECENT_CACHE_KEY);

  const hit = await cache.match(cacheReq);
  if (hit) {
    try {
      lastRecentSource = 'edge-cache';
      lastRecentError = null;
      return await hit.json();
    } catch {
      /* corrupt entry — fall through and refetch */
    }
  }

  const fresh = await getRecentlyPlayed(token); // sets lastRecentError on failure
  if (fresh.length) {
    lastRecentSource = 'spotify';
    const body = JSON.stringify(fresh);
    const store = new Response(body, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `max-age=${Math.floor(RECENT_FRESH_MS / 1000)}`,
      },
    });
    const put = cache.put(cacheReq, store);
    const backup = readRecentBackup(env).then((prev) => writeRecentBackup(env, fresh, prev));
    if (ctx && typeof ctx.waitUntil === 'function') {
      ctx.waitUntil(Promise.all([put, backup]));
    } else {
      await Promise.all([put, backup]).catch(() => {});
    }
    return fresh;
  }

  // Spotify refused (usually 429). Show the last known list rather than nothing.
  const backup = await readRecentBackup(env);
  if (backup?.tracks?.length) {
    lastRecentSource = 'kv-backup';
    return backup.tracks;
  }
  lastRecentSource = 'none';
  return [];
}


async function getRecentlyPlayed(token) {
  lastRecentError = null;
  const res = await fetch(RECENT_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    // 403 here almost always means the refresh token was issued WITHOUT the
    // `user-read-recently-played` scope — currently-playing uses a different
    // scope, so the live track keeps working while recent stays empty forever.
    // Re-run the consent URL in worker/README.md and update the secret.
    // Spotify sends Retry-After (seconds) on a 429; surfacing it turns "it is
    // broken" into "it is rate-limited for N more seconds".
    const retryAfter = res.headers.get('retry-after');
    lastRecentError =
      `spotify ${res.status} ${res.statusText}`.trim() +
      (retryAfter ? ` (retry-after ${retryAfter}s)` : '');
    return [];
  }
  const data = await res.json();
  const seen = new Set();
  const out = [];
  for (const it of data?.items || []) {
    const t = mapTrack(it.track);
    if (!t || !t.songUrl || seen.has(t.songUrl)) continue; // de-dupe repeats
    seen.add(t.songUrl);
    out.push({ ...t, playedAt: it.played_at || null });
  }
  return out;
}
