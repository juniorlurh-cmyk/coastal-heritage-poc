# Coastal Heritage — web app

React 19 + Vite + React Router marketing site.

```bash
npm install
npm run dev       # dev server
npm run build     # production build → dist/
npm run preview   # serve the production build
npm run lint      # oxlint
```

## Conventions

- All business facts (phone, WhatsApp, areas, hours, email) live in
  `src/data/site.js` — change them once, they update everywhere.
- Services, projects and rating sources live in `src/data/`.
- The enquiry form opens WhatsApp with a pre-filled message; no data is stored.
- Optional analytics: set `VITE_UMAMI_URL` and `VITE_UMAMI_WEBSITE_ID` at build
  time to enable self-hosted Umami tracking (see `src/components/Analytics.jsx`).
- Deployment notes are in `../deploy/DEPLOYMENT.md`.
