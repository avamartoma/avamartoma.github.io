// Cloudflare Worker — Spotify "Now Playing" proxy for avamartoma.com
//
// Holds the Spotify secrets server-side (as Wrangler secrets, NOT in this repo)
// and returns a small JSON payload the site's NowPlaying widget consumes:
//   { isPlaying, title, artist, album, albumImageUrl, songUrl }
//
// Secrets are read from `env` (set with `wrangler secret put` — see README):
//   SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENT_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

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
      let track = await getCurrentlyPlaying(token);
      if (!track) track = await getRecentlyPlayed(token);
      const body = track ?? { isPlaying: false, title: '', artist: '' };
      return new Response(JSON.stringify(body), { headers });
    } catch (err) {
      // Fail soft — the widget shows an idle state on a non-track payload.
      return new Response(
        JSON.stringify({ isPlaying: false, title: '', artist: '' }),
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

function mapTrack(item, isPlaying) {
  if (!item) return null;
  return {
    isPlaying,
    title: item.name ?? '',
    artist: (item.artists || []).map((a) => a.name).join(', '),
    album: item.album?.name ?? '',
    albumImageUrl: item.album?.images?.[0]?.url ?? '',
    songUrl: item.external_urls?.spotify ?? '',
  };
}

async function getCurrentlyPlaying(token) {
  const res = await fetch(NOW_PLAYING_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // 204 = nothing playing; anything >=400 = fall back to recently played.
  if (res.status === 204 || res.status >= 400) return null;
  const data = await res.json();
  if (!data || !data.item) return null;
  return mapTrack(data.item, Boolean(data.is_playing));
}

async function getRecentlyPlayed(token) {
  const res = await fetch(RECENT_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return mapTrack(data?.items?.[0]?.track, false);
}
