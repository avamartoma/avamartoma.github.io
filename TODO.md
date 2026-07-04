# ✅ TODO — personal-website

Ordered by priority / the sequence they should be tackled in. Check items off as
you go. (Deeper context for any item lives in [`HANDOVER.md`](./HANDOVER.md).)

---

## 🟢 Now / next

- [ ] **1. Serve at the root `https://avamartoma.github.io/`** (renaming from the
      `/personal-website/` project URL).
  - On GitHub: repo **Settings → General → Repository name** → rename to
    **`avamartoma.github.io`**.
  - Update the local remote:
    `git remote set-url origin git@github.com:avamartoma/avamartoma.github.io.git`
  - `git push` (config already switched to root paths — `base` removed).
  - Pages settings + workflow carry over; site goes live at
    **https://avamartoma.github.io/** in ~1–2 min.
  - ✅ Already deployed once at the project URL; this just moves it to the root.

- [ ] **2. Add your real projects.**
  - Each project = one Markdown file in `src/content/projects/`.
  - Replace the 3 samples (`aurora`, `plotter-poems`, `ledger`).
  - Give the details to Kiro and it'll write them, or copy the template in
    `README.md`.

- [ ] **3. Turn on real resume delivery (Web3Forms).**
  - Go to https://web3forms.com, enter **ava.martoma@gmail.com**, get a free
    Access Key by email.
  - Paste it into `WEB3FORMS_ACCESS_KEY` in **both**
    `src/components/ResumeModal.astro` and `src/pages/resume.astro`.
  - Until then the popup shows "Sent ✦" but nothing is actually delivered
    (intentional placeholder — not urgent).

---

## 🟡 Personality & polish

- [ ] **4. Hand-write your name** and swap it in.
  - Write "ava martoma" on paper / tablet, send the photo to Kiro → it becomes
    a crisp SVG signature (can animate as if being drawn). Replaces the current
    bubble font in the hero + nav.

- [ ] **4b. Make a personal logo.**
  - Design your own mark to replace the placeholder ◐ glyph (nav + favicon).
    Can be hand-drawn (Procreate → SVG) or code-generated. Would also become
    the browser tab icon and social-share image.

- [ ] **5. Add personality sections.**
  - An Elly-style **"iFAQ"** (playful Q&A) — high impact, low effort.
  - A first-person voice pass across the About/hero copy.

- [ ] **6. Your own drawings / illustration pass.**
  - Bring your art; Kiro builds an original interactive layer around it
    (Koberger *spirit*, not a clone). Keep the clean grid as a fallback.

---

## 🔵 Later / infrastructure

- [ ] **7. Buy a custom domain and host there** (planned).
  - ✅ Fully supported. Buy a domain (e.g. from Namecheap/Cloudflare/Google).
  - Point it at GitHub Pages (repo → Settings → Pages → Custom domain) **or**
    at Netlify.
  - Then in `astro.config.mjs` set `site: 'https://yourdomain.com'` and
    `base: '/'` (or delete `base`). Links use `BASE_URL`, so nothing else
    needs to change.

- [ ] **8. Consider switching hosting to Netlify** (optional).
  - Pros: nicer dashboard, built-in Netlify Forms, easy previews. Free tier.
  - `netlify.toml` is already in the repo. If you switch, you can move the
    resume form back to Netlify Forms, or keep Web3Forms (works anywhere).

- [ ] **9. AI "bot"** trained on your content (Ignacio-style) — *much later*.
  - Needs a serverless function + an LLM API key (not pure static). Your
    project Markdown becomes its knowledge base.

- [ ] **10. Optional: upgrade to Astro 7** when ready to handle breaking changes
  (currently pinned to patched 5.x; fine for a static site).

---

## ✔️ Done

- [x] Scaffold Astro site + artsy-engineer design system
- [x] Interactive hero (Holi color-powder cursor dots), custom cursor, grain
- [x] Project grid + per-project pages + playful 404
- [x] Real headshot (auto-optimized) in About
- [x] Resume popup (anchored, minimalist) + LinkedIn; email kept private
- [x] Holi purple→blue palette with pink/green/yellow hints
- [x] Big bubbly one-line name "ava martoma"
- [x] Web3Forms wired + configured for GitHub Pages deploy
