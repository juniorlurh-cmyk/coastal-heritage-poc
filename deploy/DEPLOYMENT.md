# Deployment guide — GitHub Pages

The site is a static React SPA. GitHub Pages hosts it **free forever**, with
free HTTPS and a free `github.io` domain — no server, no maintenance.

Live URL once enabled:

```
https://juniorlurh-cmyk.github.io/coastal-heritage-poc/
```

---

## 1. How it's wired

| Piece | How it works on Pages |
|---|---|
| Hosting | `.github/workflows/deploy.yml` builds `web/` on every push to `main` and publishes `web/dist` via the official Pages actions |
| Routing | `npm run postbuild` copies `dist/index.html` → `dist/404.html`; Pages serves it for unknown paths, so `/about`, `/services`, `/projects`, `/contact` work as real URLs |
| Base path | The workflow writes `VITE_BASE=/coastal-heritage-poc/` into `web/.env.production`; `vite.config.js` reads it and React Router uses it as `basename` |
| HTTPS | Automatic on `github.io` — nothing to configure |
| Analytics | Optional Umami (cloud free tier) via repo Variables — see section 4 |

## 2. Enable Pages (one-time, ~1 min)

1. Repo → **Settings → Pages**
2. **Source: GitHub Actions** (not "Deploy from a branch")
3. Push to `main` (or **Actions → Deploy to GitHub Pages → Run workflow**)
4. The workflow runs → site is live at the URL above.

## 3. Free domain

`https://juniorlurh-cmyk.github.io/coastal-heritage-poc/` is the free domain —
no registration needed.

For a real domain later (`coastalheritage.co.za`, ~R99–R199/yr):

1. At the registrar, add DNS `A` records for `@` → `185.199.108.153`,
   `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, plus `CNAME` for
   `www` → `juniorlurh-cmyk.github.io`
2. Repo → Settings → Pages → **Custom domain** → enter it → **Enforce HTTPS**
3. Commit a `CNAME` file in `web/public/` containing the domain — that's all.

## 4. Analytics (optional)

Umami Cloud has a free tier — cookie-free, no personal data, consistent with
the site's privacy note:

1. Sign up at `cloud.umami.is` → add the site → copy the **website ID**
2. Repo → **Settings → Secrets and variables → Actions → Variables** → add:
   - `VITE_UMAMI_URL` = `https://cloud.umami.is`
   - `VITE_UMAMI_WEBSITE_ID` = `<your-website-id>`
3. Re-run the workflow — the tracking script is only injected when both are set
   (`web/src/components/Analytics.jsx`). Unset = zero trackers.

## 5. AI component (optional)

The site ships an AI assistant (floating chat) and an AI market briefing on
`/insights`. Both work **without a key** (rule-based fallback + static
briefing). To enable the real model — free Groq tier:

1. Get a key at `console.groq.com` (free, no card)
2. Repo → **Settings → Secrets and variables → Actions**:
   - Secret `VITE_AI_API_KEY`
   - Variable `VITE_AI_MODEL` = `llama-3.3-70b-versatile` (optional)
3. Re-run the workflow.

Full details, alternate providers and the production key-proxy pattern are in
`docs/AI.md`.

## 6. Everyday workflow

```bash
git add -A && git commit -m "..." && git push   # site redeploys automatically
```

Local check before pushing:

```bash
cd web
VITE_BASE=/coastal-heritage-poc/ npm run build   # matches Pages exactly
node serve.mjs                                  # http://localhost:4173
```

## 7. Pre-go-live checklist

The site is currently a **preview for the owner**. Before sharing widely:

- [ ] Owner approves (trading name, address, services, hours, email)
- [ ] Replace representative photos with real job photos
- [ ] Confirm the real email address (currently `info@coastalheritage.co.za`)
- [ ] Remove `<meta name="robots" content="noindex, nofollow">` from `web/index.html`
- [ ] Change `web/public/robots.txt` to `Allow: /`
- [ ] Remove the preview footnote in `src/components/Layout.jsx`
- [ ] Point the Google Business Profile website field at the Pages URL
- [ ] Submit to Google Search Console
