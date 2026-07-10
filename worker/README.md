# Spotify "Now Playing" Worker

A tiny Cloudflare Worker that returns Ava's current/recent Spotify track as JSON,
consumed by `src/components/NowPlaying.astro` on the site. Keeps the Spotify
secrets server-side (this repo is public — **never commit the client secret or
refresh token**).

Returns:
```json
{ "isPlaying": true, "title": "…", "artist": "…", "album": "…", "albumImageUrl": "…", "songUrl": "…" }
```

---

## One-time setup

### 1. Get a refresh token (run locally; your secret never leaves your machine)

**a. Authorize** — open this URL in a browser, log in, click **Agree**:

```
https://accounts.spotify.com/authorize?client_id=f00608feba734e3f941a505d5fd401de&response_type=code&redirect_uri=http://127.0.0.1:8888/callback&scope=user-read-currently-playing%20user-read-recently-played
```

The browser will redirect to `http://127.0.0.1:8888/callback?code=…` and show a
"can't connect" page — that's expected (nothing is running there). **Copy the
`code` value from the address bar.** (Use it within ~1 minute; codes expire fast.)

**b. Exchange the code for a refresh token** — fill in `YOUR_CLIENT_SECRET` and the
`code`, then run:

```bash
curl -X POST https://accounts.spotify.com/api/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code" \
  -d "code=PASTE_CODE_HERE" \
  -d "redirect_uri=http://127.0.0.1:8888/callback" \
  -u "f00608feba734e3f941a505d5fd401de:YOUR_CLIENT_SECRET"
```

Copy the `refresh_token` from the JSON response. (It's long-lived — reused forever.)

### 2. Deploy the Worker

```bash
cd worker
npx wrangler@latest login          # opens browser → authorize Cloudflare
npx wrangler@latest secret put SPOTIFY_CLIENT_ID       # paste f00608feba734e3f941a505d5fd401de
npx wrangler@latest secret put SPOTIFY_CLIENT_SECRET   # paste your client secret
npx wrangler@latest secret put SPOTIFY_REFRESH_TOKEN   # paste the refresh token from step 1b
npx wrangler@latest deploy
```

`deploy` prints your Worker URL, e.g. `https://avamartoma-now-playing.<subdomain>.workers.dev`.

### 3. Point the site at it

Give that URL to Kiro (or set it yourself): the site reads
`PUBLIC_SPOTIFY_ENDPOINT`. Once set, the `NowPlaying` widget goes live in prod.

Test the Worker directly in a browser — it should return the JSON above:
`https://avamartoma-now-playing.<subdomain>.workers.dev`

---

## Security notes

- The **Client ID** is not sensitive (it appears in the authorize URL). The
  **Client Secret** and **Refresh Token** are — they live only as Wrangler secrets,
  never in this repo or any client-side code.
- The refresh token grants read access to your playback data only (the two
  read-only scopes above). Revoke anytime at spotify.com → Account → Apps.
