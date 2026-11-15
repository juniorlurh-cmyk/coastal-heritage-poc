# Architecture & project documentation

What this repo is, how it's built, and the decisions behind it.

## What it is

A public-facing marketing website for **Coastal Heritage**, a construction and
property-services business in Sunnyside, Pretoria (building, renovations,
plumbing, electrical). Started as a single-file HTML prototype; now a
maintainable React application deployed on GitHub Pages.

**Live:** https://juniorlurh-cmyk.github.io/coastal-heritage-poc/

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | React 19 + Vite | Component structure, fast builds, huge ecosystem |
| Routing | React Router 7 (`BrowserRouter`) | Real URLs per page, deep links (`/services#plumbing`, `/contact?service=…`) |
| Styling | Single `src/styles/global.css` design system | No framework weight; consistent tokens (`--ink`, `--moss`, `--clay`, `--paper`) |
| Fonts | Fraunces (headings) + DM Sans (body) | Editorial serif reads "designed", not "generated" |
| Hosting | GitHub Pages + Actions | Free hosting, free HTTPS, free `github.io` domain, zero servers |
| AI | Groq free tier (OpenAI-compatible) + local fallback | Free real LLM; site still works with no key |
| Analytics | Optional Umami (cookie-free) | Only injected when env vars set — zero trackers by default |

## Repository layout

```
├── web/                        The application
│   ├── index.html              Entry: SEO meta, LocalBusiness JSON-LD, fonts, noindex (preview)
│   ├── vite.config.js          Reads VITE_BASE → asset base path
│   ├── serve.mjs               Local static server with SPA fallback (:4173)
│   ├── scripts/spa-404.mjs     Postbuild: copies dist/index.html → dist/404.html
│   ├── public/                 favicon, robots.txt (blocked while previewing)
│   └── src/
│       ├── main.jsx            Router + basename from VITE_BASE
│       ├── App.jsx             Route table
│       ├── data/               Content as data — edit here, not in components
│       │   ├── site.js         Business facts, phone/WhatsApp, service areas
│       │   ├── services.js     Four trade services + includes lists
│       │   ├── projects.js     Representative case studies (placeholders)
│       │   ├── ratings.js      Google + Cybo snapshots — kept separate, never blended
│       │   ├── areas.js        14 real suburb photos (Wikimedia Commons) + credits
│       │   └── market.js       Modelled demand matrix (estimates, clearly labelled)
│       ├── ai/
│       │   └── provider.js     AI calls (Groq) + keyless rule-based fallback + system prompt
│       ├── components/         Layout, ChatWidget, ServiceSlideshow, AreasGallery,
│       │                       Reputation, EnquiryForm, FadeIn, Icons, …
│       └── pages/              Home, About, Services, Projects, Contact, Insights, NotFound
├── .github/workflows/deploy.yml  Build → deploy to Pages on push to main
├── deploy/DEPLOYMENT.md        Hosting + domain + analytics + go-live checklist
├── docs/AI.md                  AI component: setup, providers, security
├── legacy/index.html           Original single-file prototype (reference)
└── README.md                   Overview + quickstart
```

## Routing & GitHub Pages specifics

- `VITE_BASE` env var → Vite `base` + React Router `basename`, so the app
  works under `/<repo>/` project paths and `/` custom domains alike.
- `postbuild` copies `index.html` to `404.html` — Pages serves it for unknown
  paths (status 404, but the SPA boots and client-side routing renders the
  right page). Direct refresh on `/services` works in a real browser.
- Deploy is automatic: `git push` → Actions → `npm ci` → `npm run build` →
  `upload-pages-artifact` → `deploy-pages`.

## Content-integrity rules (important)

- Ratings stay **per-source** (Google 5.0/1, Cybo 4.8/4) — never averaged.
- Case studies are labelled representative; stock photos are never presented
  as completed Coastal Heritage jobs.
- Suburb photos are **real photographs** of the named places (Wikimedia
  Commons, CC licences, attribution on each card) — not renders.
- The demand matrix is a **modelled estimate**, labelled as such; it is not
  measured sales data.
- `noindex, nofollow` stays until the owner approves content (see
  `deploy/DEPLOYMENT.md` checklist for the full go-live list).

## Components worth knowing

- `Layout.jsx` — topbar, nav, footer, WhatsApp FAB, ChatWidget mount point.
- `ServiceSlideshow.jsx` — auto-advancing service showcase (6s, ken-burns,
  pause-on-hover, reduced-motion aware).
- `AreasGallery.jsx` — real suburb photos grid with licence credits.
- `ChatWidget.jsx` — floating assistant (bottom-left; WhatsApp stays right).
- `Insights.jsx` — internal-facing demand dashboard + AI briefing generator.
- `EnquiryForm.jsx` — composes a WhatsApp message; nothing stored server-side.

## Verification

```bash
cd web
npm run build    # must produce dist/ + dist/404.html
npm run lint     # oxlint — style warnings only are acceptable
node serve.mjs   # :4173 with SPA fallback — same behaviour as Pages
```
