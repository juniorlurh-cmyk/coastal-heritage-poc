# Coastal Heritage — Website Concept

A multi-page marketing website for Coastal Heritage, a construction and property
services business listed in Sunnyside, Pretoria. Built as a prospecting
prototype — not yet an approved or production-ready company website.

## Structure

```
├── web/                    React + Vite application (the website)
│   ├── src/
│   │   ├── components/     Layout, nav, footer, cards, forms, analytics
│   │   ├── pages/          Home, About, Services, Projects, Contact, 404
│   │   ├── data/           Site details, services, projects, ratings
│   │   └── styles/         Global design system (single stylesheet)
│   └── index.html          Entry + SEO meta + LocalBusiness JSON-LD
├── deploy/                 Free-VPS deployment package
│   ├── DEPLOYMENT.md       Oracle Always Free + nginx + domain + analytics guide
│   ├── nginx/              SPA-routing site config + analytics proxy
│   ├── umami/              Self-hosted, cookie-free analytics (docker compose)
│   └── deploy.sh           Build + upload script
├── legacy/                 Original single-file static prototype (reference)
├── EVALUATION.md           Competitor benchmark, rubric, self-critique
├── PROSPECT_NOTES.md       First-call positioning and discovery questions
└── *_template.csv          Blank registers for verified projects/reviews
```

## Run locally

```bash
cd web
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → web/dist/
npm run preview    # serve the build locally
```

Routing is handled by React Router (`/`, `/about`, `/services`, `/projects`,
`/contact`). On a static host, requests to those paths must fall back to
`index.html` — the nginx config in `deploy/` already does this.

## What is included

- Five real pages with client-side routing and a mobile menu.
- Dark utility topbar (phone, hours, area) and WhatsApp-first contact paths.
- Service detail sections with per-service quote links (`/contact?service=…`).
- Filterable project portfolio (representative Pretoria case studies).
- Reputation dashboard showing each rating source separately — Google 5.0
  (1 review) and Cybo 4.8 (4 reviews) are never blended.
- Enquiry form that composes a WhatsApp message; nothing is stored server-side.
- Optional self-hosted Umami analytics — enabled only when
  `VITE_UMAMI_URL` and `VITE_UMAMI_WEBSITE_ID` are set at build time.
- `noindex` protection and a single footer note flagging preview-stage content.

## Deploy

See `deploy/DEPLOYMENT.md` — covers a free Oracle Cloud Always Free VPS, nginx
configuration for SPA routing, domain options (including free subdomains),
free HTTPS via certbot, and self-hosted analytics.

## Still required before publication

All verification items from the original research still apply: confirm the
trading name, address (220 Robert Sobukwe St vs 89 Vos St conflict), real
services and credentials, real project photos, owner-approved copy, and the
actual review profiles. Project photos, case-study details, email and hours on
the current site are representative placeholders pending owner approval — see
the footer note on the site and the checklist in `deploy/DEPLOYMENT.md`.

## Legacy

`legacy/index.html` preserves the original single-file prototype for reference.
