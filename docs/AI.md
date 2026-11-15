# AI component

Two AI-powered features, one provider layer (`web/src/ai/provider.js`):

1. **Website assistant** (`ChatWidget.jsx`) — floating chat, bottom-left.
   Answers questions about services, areas, quotes and contact; hands off to
   WhatsApp for anything that needs a person.
2. **Market briefing** (`Insights.jsx`, `/insights`) — sends the modelled
   demand matrix to the model and renders an internal market briefing on
   demand hotspots, priority suburbs per trade, gaps and recommendations.
   Result is cached in `localStorage` (`ch-ai-brief`).

## Free provider — Groq (recommended)

Groq's free tier hosts Llama-class models with a generous rate limit — no card
needed.

1. Sign up at **https://console.groq.com** → API Keys → create key (`gsk_…`)
2. **Local dev** — create `web/.env.local`:
   ```
   VITE_AI_API_KEY=gsk_your_key_here
   VITE_AI_MODEL=llama-3.3-70b-versatile
   ```
3. **Deployed site** — repo → Settings → Secrets and variables → Actions:
   - **Secret** `VITE_AI_API_KEY` = the key
   - **Variable** `VITE_AI_MODEL` = `llama-3.3-70b-versatile` (optional; this is the default)
   - Re-run the Pages workflow (push a commit or Actions → re-run).

Other free OpenAI-compatible endpoints work too — set `VITE_AI_ENDPOINT`
(e.g. OpenRouter `https://openrouter.ai/api/v1/chat/completions` with a
`:free` model, or a local Ollama instance on your own machine).

## Keyless fallback (default)

With no key configured both features still work:

- The assistant answers from a built-in rule set (services, areas, quote
  flow, hours, contact) — the header shows "Quick answers" instead of
  "AI-assisted answers".
- The Insights page shows a hand-written static briefing where the AI
  briefing would be.

## Security note — important

GitHub Pages is **static hosting**: a `VITE_AI_API_KEY` baked into the build
ships inside the public JS bundle. For this POC on a free, rate-limited key
that is an acceptable risk — worst case is someone borrows your free quota.
For production, proxy through a free **Cloudflare Worker** so the key stays
server-side:

```js
// worker.js (Cloudflare Workers — free tier, 100k req/day)
export default {
  async fetch(request, env) {
    if (request.method !== 'POST') return new Response('POST only', { status: 405 });
    return fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.GROQ_API_KEY}`, // set via wrangler secret
      },
      body: await request.text(),
    });
  },
};
```

Then set `VITE_AI_ENDPOINT=https://your-worker.workers.dev` (Variable) and
drop the secret from the build. Add a shared-secret header if you want to
block public abuse of the worker endpoint.

## Conversation limits & behaviour

- System prompt constrains the assistant to business facts — it will not
  invent prices, guarantee availability, or discuss unrelated topics.
- Last 10 messages are sent per request; `temperature 0.4`, `max_tokens 400`.
- Errors fall back to a WhatsApp hand-off message — the user always has a
  human escape route.
