// Cloudflare Worker — Spotify "Lately" proxy for avamartoma.com
//
// Holds the Spotify secrets server-side (as Wrangler secrets, NOT in this repo)
// and returns what Ava is playing now + recently played:
//   {
//     isPlaying: boolean,
//     current:   { title, artist, album, albumImageUrl, songUrl } | null,
//     recent:    [ { title, artist, album, albumImageUrl, songUrl }, ... ]  // up to 5
//   }
//
// Secrets are read from `env` (set with `wrangler secret put` — see README):
//   SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENT_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=10';

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

      // Only surface `current` when actively playing (skip paused). Drop it from
      // the recent list to avoid showing the same song twice.
      const playing = current && current.isPlaying ? current : null;
      let recentList = recent;
      if (playing) {
        recentList = recent.filter((t) => t.songUrl !== playing.songUrl);
      }
      recentList = recentList.slice(0, 5);

      const body = {
        isPlaying: Boolean(playing),
        current: playing ? stripFlag(playing) : null,
        recent: recentList,
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
    title: item.name ?? '',
    artist: (item.artists || []).map((a) => a.name).join(', '),
    album: item.album?.name ?? '',
    albumImageUrl: item.album?.images?.[0]?.url ?? '',
    songUrl: item.external_urls?.spotify ?? '',
  };
}

function stripFlag(t) {
  const { isPlaying, ...rest } = t;
  return rest;
}

async function getCurrentlyPlaying(token) {
  const res = await fetch(NOW_PLAYING_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // 204 = nothing playing; anything >=400 = treat as nothing playing.
  if (res.status === 204 || res.status >= 400) return null;
  const data = await res.json();
  if (!data || !data.item) return null;
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
    out.push(t);
  }
  return out;
}
