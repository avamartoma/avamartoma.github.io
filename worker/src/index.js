// Cloudflare Worker — Spotify "Lately" proxy for avamartoma.com
//
// Holds the Spotify secrets server-side (as Wrangler secrets, NOT in this repo)
// and returns what Ava is playing now + recently played:
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
// with filthy lyrics won't be auto-caught — add those to BLOCKLIST.)
const HIDE_EXPLICIT = false;
const HIDE_CRASS_TITLES = true;
// Only show music (skip podcast episodes / ads as the "now playing").
const MUSIC_ONLY = true;
// Manual hide-list for anything else you'd rather not show. Match by Spotify
// track ID, or by a lowercased substring of "artist + title".
const BLOCKLIST = [
  'slut',
  'whore',
  // '3n3Ppam7vgaVa1iaRUc9Lp',   // by exact track ID
  // 'some artist',              // by artist/title substring (case-insensitive)
];

// Strong terms that, in a TITLE, mark a track as too crass for the site.
// Includes common self-censored spellings (f*ck, sh*t). Matched as whole tokens
// so "class"/"assassin" etc. don't false-positive.
const STRONG_TERMS = [
  'fuck', 'f*ck', 'f**k', 'fuckin', 'motherfucker', 'shit', 'sh*t',
  'bitch', 'b*tch', 'cunt', 'pussy', 'whore', 'slut', 'dick',
  'cock', 'nigga', 'n*gga', 'nigger', 'faggot',
];

function hasStrongLanguage(text) {
  const s = (text || '').toLowerCase();
  return STRONG_TERMS.some((term) => {
    const esc = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // treat * as literal
    return new RegExp(`(^|[^a-z0-9])${esc}([^a-z0-9]|$)`, 'i').test(s);
  });
}

function isAllowed(t) {
  if (!t) return false;
  if (HIDE_EXPLICIT && t.explicit) return false;
  if (HIDE_CRASS_TITLES && hasStrongLanguage(t.title)) return false;
  const hay = `${t.id || ''} ${t.artist} ${t.title}`.toLowerCase();
  return !BLOCKLIST.some((b) => b && hay.includes(b.toLowerCase()));
}

// Strip internal-only fields (id, explicit, isPlaying) before sending to the client.
function publicTrack(t) {
  if (!t) return null;
  const { id, explicit, isPlaying, ...rest } = t;
  return rest;
}

export default {
  async fetch(request, env) {
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
      const [current, recent] = await Promise.all([
        getCurrentlyPlaying(token),
        getRecentlyPlayed(token),
      ]);

      // Surface `current` only when actively playing AND allowed by the filter.
      const playing = current && current.isPlaying && isAllowed(current) ? current : null;

      // Filter the recent list, drop the live track from it, then cap at 5.
      let recentList = recent.filter(isAllowed);
      if (playing) recentList = recentList.filter((t) => t.songUrl !== playing.songUrl);
      recentList = recentList.slice(0, 5);

      const body = {
        isPlaying: Boolean(playing),
        current: publicTrack(playing),
        recent: recentList.map(publicTrack),
      };
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

async function getRecentlyPlayed(token) {
  const res = await fetch(RECENT_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return [];
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
