# jarrydaddinall.com (static)

Plain **HTML + CSS**. No React, no Node, no build step.

## Test it

**Option A:** double-click  
Open `index.html` in Finder, then double-click. Navigation works for local files.

**Option B:** tiny local server (helps with some embeds; optional):

```bash
cd "/path/to/My Personal Hub Site"
python3 -m http.server 8080
```

Then visit `http://localhost:8080` in your browser.

## Edit

| What | Where |
|------|--------|
| Home | `index.html` (Open Graph tags: set domain + add `og-image.jpg` if you use social previews) |
| Music (The 85 Sound) | `music.html` + **`music-config.js`** |
| Apps | `apps.html` + **`apps-config.js`** + mock detail pages `apps/mileage-tracker.html` (iOS style) & `apps/logreps.html` (web) |
| Writing + Substack | `writing.html` + **`writing-config.js`** |
| Each article | new file in `writing/`, then add a row in `writing.html` |
| Look & feel | `styles.css` |
| Site-wide defaults | `site-config.js` (reference for domain; meta tags are still in each HTML file today) |

## Go live (checklist)

1. **Domain:** Find-replace `https://jarrydaddinall.com` in `index.html` (OG tags), `robots.txt`, and `sitemap.xml` if your URL differs.
2. **Preview image:** Add a **1200×630** image as `og-image.jpg` next to `index.html` (or change paths in meta tags). Used when links are shared in iMessage, Slack, X.
3. **Music:** Complete **`music-config.js`** (see the GO LIVE block at the top of that file).
4. **Apps:** Fill **`apps-config.js`** with App Store, TestFlight, or site URLs; status badges update from `status`.
5. **Writing:** Set **`writing-config.js`** `substack` to your publication URL.
6. **Upload:** Deploy the whole folder: `.html`, `styles.css`, `*.js`, `favicon.svg`, `writing/`, plus `robots.txt` and `sitemap.xml`.
7. **404:** On Netlify / Vercel / Cloudflare Pages, point the host’s “custom 404” to **`404.html`**.
8. **Search:** In Google Search Console (optional), submit `sitemap.xml` after DNS is live.

That upload should include every `.html`, `styles.css`, all `*.js`, `favicon.svg`, the `writing/` folder, `robots.txt`, and `sitemap.xml`.
