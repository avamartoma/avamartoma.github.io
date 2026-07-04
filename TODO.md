# ✅ TODO — personal-website

Ordered by priority. (Deeper context lives in [`HANDOVER.md`](./HANDOVER.md).)

---

## 🟢 Now / next

- [ ] **1. Add project photos.** Every project currently uses generative
      artwork. Pull images from your Google Docs (File → Download → Web Page
      .html, zipped), drop them in the matching `public/images/<slug>/` folder,
      and tell Kiro the filenames — it wires the cover + inline shots.
      Slugs: `rc-car`, `penn-electric-racing`, `wooden-car`, `cad-bridge`,
      `cad-projects`, `marquetry-desk`, `marquetry-flower-press`,
      `marquetry-clock`, `architecture`, `linkedin-hackathon`.

- [ ] **2. Turn on real resume/contact delivery (Web3Forms).** Get a free key at
      web3forms.com (enter ava.martoma@gmail.com), paste into
      `WEB3FORMS_ACCESS_KEY` in **three** files: `ResumeModal.astro`,
      `resume.astro`, `Footer.astro`. Until then forms show "Sent ✦" but don't
      deliver.

- [ ] **3. Fill in real details for a few entries.**
  - **Amazon (Kuiper)** experience — real bullets (currently a neutral
    placeholder).
  - **LinkedIn Hackathon** — add a demo/live link if there is one.
  - Confirm estimated dates: **CAD Bridge**, **CAD & Woodworking Studies**, and
    the 3 marquetry pieces.

---

## 🟡 Personality & polish

- [ ] **4. iFAQ section** (Elly-style playful Q&A) — **goes where the old About
      section was** (About now lives in the hero). High impact, low effort.

- [ ] **5. Highlight the volunteering / service.** Options brainstormed: a
      dedicated "Service & Impact" section, an impact-stats strip, or
      color-coding the service roles in the timeline. (Kesem is already in the
      timeline.)

- [ ] **6. Hand-write your name** → Kiro turns the photo into a crisp SVG
      signature (can animate as if drawn); replaces the bubble font.

- [ ] **7. Make a personal logo** to replace the placeholder ◐ (nav + favicon +
      social share image).

- [ ] **8. Your own drawings / illustration pass** — bring your art; Kiro builds
      an original interactive layer around it (Koberger *spirit*, not a clone).

- [ ] **9. Restore leftover About bits (optional)** — the nonprofit/justice
      paragraph and off-the-clock interests (skiing, squash, golf, running,
      woodworking) were removed with the About section; fold into the iFAQ or
      elsewhere if wanted.

---

## 🔵 Later / infrastructure

- [ ] **10. Buy a custom domain** and point it at GitHub Pages (or Netlify).
      Then set `site` + `base: '/'` in `astro.config.mjs` — links use
      `BASE_URL`, so nothing else changes.

- [ ] **11. Maybe switch hosting to Netlify** (optional; `netlify.toml` ready).

- [ ] **12. AI "bot"** trained on your content (Ignacio-style) — needs a
      serverless function + LLM key. Your project Markdown is its knowledge base.

- [ ] **13. Optional: upgrade to Astro 7** (currently on patched 5.x).

- [ ] **14. Animated hand-drawn sprites** (Elly-style hover animation) — draw
      2–4 frames in Procreate; Kiro wires the frame-swap on hover.

---

## ✔️ Done

- [x] Scaffold Astro site + artsy-engineer design system; Holi palette
- [x] Interactive hero (Holi color-powder cursor dots), custom cursor, grain
- [x] **Live at root** https://avamartoma.github.io/ (GitHub Pages, auto-deploy)
- [x] Bubbly overlapping one-line name + headshot **sticker** in a two-column hero
- [x] Hero carries the "about" (tagline, bio, Tools I reach for, credential)
- [x] **10 real projects** added (samples hidden as drafts)
- [x] Work: homepage selection + `/work` page with multi-select tag filter
- [x] Full "Month Day, Year" dates on cards + detail pages
- [x] **Experience** horizontal-scroll timeline (12 roles incl. Kesem) + Education boxes
- [x] **Honors** + **Publications** sections
- [x] Resume popup + footer contact form (Web3Forms, pending key); LinkedIn linked
- [x] Email kept private; LinkedIn data export gitignored
