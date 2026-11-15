# Build playbook — small-business marketing site

Everything used to take this project from a single-file HTML concept to a
live, AI-assisted, auto-deploying website — written so it can be repeated for
the next business. Order matches how it was actually done.

---

## 1. Toolchain

| Tool | Version | Role | Install |
|---|---|---|---|
| Node.js | 24.20.0 LTS | Runtime + npm for Vite/build | `winget install OpenJS.NodeJS.LTS` |
| npm | 11.19.0 | Package manager | ships with Node |
| Git | — | Source control + push | — |
| Python | 3.12 | One-off API scripting (secrets, JSON checks) | `winget install Python.Python.3.12` |
| PyNaCl | — | Encrypts secrets for the GitHub API (libsodium sealed box) | `pip install pynacl` |
| GitHub account | — | Repo + free hosting | github.com |

No paid tools. No Docker, no server, no database.

## 2. Packages (all in `web/`)

Runtime dependencies — deliberately minimal:

| Package | Version | Purpose |
|---|---|---|
| `react` | ^19.3.1 | UI |
| `react-dom` | ^19.3.1 | DOM renderer |
| `react-router-dom` | ^7.18.5 | Client-side routing (real URLs per page) |

Dev dependencies:

| Package | Version | Purpose |
|---|---|---|
| `vite` | ^8.3.x | Dev server + production build |
| `@vitejs/plugin-react` | ^6.1.x | React transform in Vite |
| `oxlint` | ^1.9x | Fast linting (replaceable with eslint) |
| `@types/react`, `@types/react-dom` | ^19 | Type hints in editors |

**Not installed and deliberately so:** no CSS framework (one hand-written
`global.css` design system), no chart library (charts are inline SVG), no
state library (URL params + useState are enough), no backend.

External services (free tiers):

| Service | Used for | Cost |
|---|---|---|
| GitHub Pages + Actions | Hosting, HTTPS, deploy pipeline | R0 |
| Groq API (`qwen/qwen3.8-27b`) | Chat assistant, AI briefing, chart planning | R0 — console.groq.com, no card |
| Wikimedia Commons | Real suburb photography, CC-licensed | R0 — attribution required |
| Google Fonts (Fraunces, DM Sans) | Typography | R0 |
| Umami Cloud (optional) | Cookie-free analytics | R0 tier |

## 3. End-to-end workflow

### Step 0 — Environment

```powershell
winget install OpenJS.NodeJS.LTS        # Node 24 LTS
winget install Python.Python.3.12        # only needed for the secrets script
pip install pynacl                        # GitHub secret encryption
```

### Step 1 — Scaffold

```bash
cd <project-root>
npx cva web --template react             # Vite + React app in web/
cd web && npm install
npm install react-router-dom oxlint -D   # routing + lint
```

Keep research/legacy/docs at repo root; the app lives in `web/`.

### Step 2 — App structure

```
web/src/
├── data/        site.js, services.js, projects.js, ratings.js, areas.js, market.js
├── ai/          provider.js (LLM + fallback), viz.js (spec + eval), report.js (export)
├── components/  Layout, ChatWidget, ServiceSlideshow, AreasGallery, VizBoard, …
├── pages/       Home, About, Services, Projects, Contact, Insights, NotFound
└── styles/global.css    single design system, CSS vars in :root
```

Rule that kept it clean: **content lives in `data/`, components only render
it.** Changing business facts = edit one data file.

### Step 3 — Routing that survives GitHub Pages

Three pieces — all required:

1. `web/vite.config.js` → `base: process.env.VITE_BASE || '/'`
2. `web/src/main.jsx` → `<BrowserRouter basename={import.meta.env.VITE_BASE}>`
3. `web/scripts/spa-404.mjs` (postbuild) → copies `dist/index.html` to
   `dist/404.html`. Pages serves it for unknown paths; the SPA boots and
   client-side routing renders the right page. Refresh on `/services` works.

```json
"scripts": { "build": "vite build", "postbuild": "node scripts/spa-404.mjs" }
```

### Step 4 — GitHub repo + Pages

```bash
git init && git add -A && git commit -m "..."
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

**Repo must be public** — free GitHub Pages doesn't work on private repos
(API returns `422: plan does not support Pages`). Enable Pages:

```bash
# one-liner via API (or repo Settings → Pages → Source: GitHub Actions)
curl -X POST -H "Authorization: Bearer $TOKEN" \
  https://api.github.com/repos/<user>/<repo>/pages -d '{"build_type":"workflow"}'
```

### Step 5 — Deploy workflow (`.github/workflows/deploy.yml`)

The reusable parts:

```yaml
permissions: { contents: read, pages: write, id-token: write }
steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
    with: { node-version: 22, cache: npm, cache-dependency-path: web/package-lock.json }
  - name: Compute base path                    # handles project pages vs custom domain
    working-directory: web
    run: |
      REPO="${{ github.event.repository.name }}"
      OWNER_SITE="${{ github.repository_owner }}.github.io"
      [ "$REPO" = "$OWNER_SITE" ] && echo "VITE_BASE=/" > .env.production \
        || echo "VITE_BASE=/$REPO/" > .env.production
  - run: npm ci && npm run build               # build step
    working-directory: web
    env:                                        # secrets flow in here
      VITE_AI_API_KEY: ${{ secrets.VITE_AI_API_KEY }}
      VITE_AI_MODEL: ${{ vars.VITE_AI_MODEL }}
  - uses: actions/configure-pages@v5
  - uses: actions/upload-pages-artifact@v3
    with: { path: web/dist }
  # separate deploy job: actions/deploy-pages@v4
```

Every push to `main` → auto-build → auto-deploy. That's the whole pipeline.

### Step 6 — Secrets the right way

- **Local dev**: `web/.env.local` (gitignored) with `VITE_AI_API_KEY`, `VITE_AI_MODEL`, `VITE_AI_ENDPOINT`.
- **Production**: repo → Settings → Secrets and variables → Actions → secret `VITE_AI_API_KEY`. Never commit the key — repo is public.
- Setting it via API (what was automated here): GET repo public key → libsodium sealed-box encrypt the value → `PUT /repos/<user>/<repo>/actions/secrets/<name>`.

**Honest caveat**: a `VITE_` key is baked into the public JS bundle. Fine for
free-tier/POC keys; for production proxy through a free Cloudflare Worker
(sample in `docs/AI.md`).

### Step 7 — Verify (don't skip)

```bash
cd web && VITE_BASE=/<repo>/ npm run build   # must emit dist/index.html + dist/404.html
node serve.mjs                              # local SPA-fallback server :4173
# after push:
curl -s https://api.github.com/repos/<user>/<repo>/actions/runs?per_page=1   # wait for "success"
curl -s https://<user>.github.io/<repo>/ | grep 'src="'                      # base-pathed assets
```

## 4. The AI pattern (reusable)

`src/ai/provider.js` is a three-line contract:

- `VITE_AI_*` env vars configured → real LLM (any OpenAI-compatible endpoint: Groq, OpenRouter, Ollama).
- Not configured → rule-based local fallback → feature never breaks.
- System prompt carries business facts + hard rules (no invented prices, WhatsApp hand-off).

**Reflection + eval loop** (`viz.js`): model outputs a JSON chart spec →
`evalSpec()` validates types/labels/values → errors are fed back for ONE
correction pass → only validated specs render; double-fail → defaults. Same
pattern applies to any model-generated structure (forms, filters, tables).

## 5. Media sourcing

- **Real place photos**: Wikimedia Commons API (`action=query&generator=search&gsrnamespace=6&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=1280`) — returns URL + license + author. Requires a `User-Agent` header or it 403s. Record `credit`, `license`, `source` per image and render attribution.
- **Trade/stock photos**: Unsplash URLs — always verify each URL returns 200 before shipping.

## 6. Gotchas that cost time (learned the hard way)

- **Private repo + free Pages = 422.** Make it public or pay for Pro.
- **Windows + OneDrive**: builds/lints randomly stall on file sync; retry, kill stale `node.exe`, or move the project off OneDrive.
- **Groq model names change** — list `/v1/models` on the account before hardcoding. Reasoning models (gpt-oss) spend tokens on `reasoning`; dense chat models (qwen) answer directly.
- **git-bash CRLF** corrupts looped URL lists — strip `\r`.
- **Wikimedia blocks default HTTP clients** — always send User-Agent.
- **GitHub Pages deep links return status 404** by design (it serves your `404.html`) — verify the body is the SPA, not the status code.

## 7. Reuse checklist for the next site

- [ ] `npx cva web --template react` + `react-router-dom` + `oxlint`
- [ ] `data/` layer first (site facts, services, content) — components render it
- [ ] `vite.config.js` VITE_BASE + `main.jsx` basename + `spa-404.mjs` postbuild
- [ ] `.github/workflows/deploy.yml` (copy this repo's, it's generic)
- [ ] Public repo → enable Pages via API → push → confirm run "success"
- [ ] Groq key → repo secret `VITE_AI_API_KEY` + local `.env.local`
- [ ] Copy `ai/provider.js` + swap the system prompt for the new business
- [ ] Commons API for real local photography + attribution
- [ ] `noindex` until content is owner-approved; robots.txt blocked
- [ ] Content checklist before go-live (name/address/phone/hours/services)
