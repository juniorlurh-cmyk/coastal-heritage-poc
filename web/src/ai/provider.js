// AI provider layer.
//
// Default provider: Groq free tier (OpenAI-compatible chat completions).
// Get a free API key at https://console.groq.com — no card required.
// Configure via build-time env vars (see docs/AI.md):
//   VITE_AI_API_KEY  — Groq (or any OpenAI-compatible endpoint) key
//   VITE_AI_MODEL    — default 'llama-3.3-70b-versatile'
//   VITE_AI_ENDPOINT — default 'https://api.groq.com/openai/v1/chat/completions'
//
// NOTE: GitHub Pages is static hosting, so a key set here ships inside the
// public bundle. For a POC on a free-tier key that is acceptable; for
// production, proxy requests through a free Cloudflare Worker (see docs/AI.md).
// With no key configured the assistant falls back to a local rule-based
// responder, so the feature works fully offline/demo.

import { SITE, SERVICE_AREAS } from '../data/site';

const API_KEY = import.meta.env.VITE_AI_API_KEY || '';
const MODEL = import.meta.env.VITE_AI_MODEL || 'llama-3.3-70b-versatile';
const ENDPOINT =
  import.meta.env.VITE_AI_ENDPOINT ||
  'https://api.groq.com/openai/v1/chat/completions';

export const AI_ENABLED = Boolean(API_KEY);
export const AI_MODEL = AI_ENABLED ? MODEL : null;

const SYSTEM_PROMPT = `You are the website assistant for ${SITE.name}, a construction and property-services business based in ${SITE.suburb}, ${SITE.city}. You help visitors and, when analysing market data, internal staff.

Business facts you may use:
- Services: building work (extensions, boundary walls, plastering), renovations (bathrooms, kitchens, office fit-outs), plumbing (geysers, leaks, blocked drains, new installations), electrical (DB boards, rewiring, CoC certificates, lighting).
- Contact: ${SITE.phoneDisplay} (phone/WhatsApp), ${SITE.email}
- Hours: ${SITE.hours} (${SITE.hoursNote})
- Service areas: ${SERVICE_AREAS.join(', ')} and surrounds in Pretoria, Gauteng.

Rules:
- Be concise, warm and practical. Plain text only — no markdown, no bullet symbols, no emojis.
- Never invent prices, discounts or guarantees. For pricing, say we assess each job and quote in writing.
- If asked for a quote, booking or urgent job, tell the visitor the fastest route is WhatsApp or a call on ${SITE.phoneDisplay}.
- If asked something unrelated to construction, home maintenance or our services, politely redirect.
- Keep answers under 120 words unless the user asks for detail.`;

export async function askAI(history) {
  if (!AI_ENABLED) return localReply(history);

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.4,
      max_tokens: 400,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history],
    }),
  });

  if (!res.ok) throw new Error(`AI request failed (${res.status})`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || 'Sorry, I did not catch that — please try again.';
}

export async function analyseMarket(marketSummary) {
  if (!AI_ENABLED) return null;

  const prompt = `You are a market analyst for ${SITE.name}, a Pretoria building, plumbing and electrical contractor. Below is a modelled demand matrix for Pretoria suburbs (scores 0-100 per service line, derived from housing-stock age, dwelling type and development activity — directional estimates, not measured sales).

${marketSummary}

Write a tight internal briefing (plain text, 180-250 words):
1. Where demand is strongest overall and why.
2. The 2-3 suburbs we should prioritise per trade.
3. One gap or risk we are not covering.
4. One concrete marketing/action recommendation.`;

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.3,
      max_tokens: 600,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!res.ok) throw new Error(`AI request failed (${res.status})`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || null;
}

// --- Keyless fallback -------------------------------------------------------
// Deterministic rule-based responder so the assistant still helps visitors
// when no API key is configured (local dev, demos, key rotation gaps).

const RULES = [
  {
    match: /(price|cost|quote|quotation|how much|charge)/i,
    reply:
      'Every job is different, so we assess the scope first and then send a written quote — no guessing over text. Tell us what you need done and the suburb, and we will arrange a look. Fastest is WhatsApp on ' +
      SITE.phoneDisplay +
      '.',
  },
  {
    match: /(book|appointment|schedule|come out|site visit)/i,
    reply:
      'We can arrange a site visit — just share your suburb and what you need done. Message us on WhatsApp (' +
      SITE.phoneDisplay +
      ') or use the enquiry form on the contact page and we will get back to you with a slot.',
  },
  {
    match: /(plumb|geyser|leak|drain|pipe|tap|toilet|burst)/i,
    reply:
      'Yes — we handle geyser replacements, leak and burst-pipe repairs, blocked drains, tap and toilet repairs, and new plumbing installations. For urgent leaks, WhatsApp or call ' +
      SITE.phoneDisplay +
      ' for the fastest response.',
  },
  {
    match: /(electric|coc|db board|rewire|wiring|lights|solar|inverter|generator|power)/i,
    reply:
      'We do electrical work: DB board upgrades, house rewiring, fault-finding, lighting and compliance certificates (CoC). Tell us the suburb and what the problem is and we will quote it.',
  },
  {
    match: /(build|extension|wall|brick|pave|paving|plaster)/i,
    reply:
      'Our building work covers extensions, boundary walls, brickwork, plastering, paving and small structural work. Share the scope or a photo on WhatsApp and we will scope and quote it.',
  },
  {
    match: /(renovat|bathroom|kitchen|fit[- ]?out|remodel|tiling|paint)/i,
    reply:
      'Renovations are a big part of what we do — bathrooms, kitchens, office fit-outs, tiling, flooring and repainting. Send photos of the space on WhatsApp and we will talk through options.',
  },
  {
    match: /(area|where|suburb|location|cover|centurion|sunnyside|hatfield|brooklyn|menlyn|mamelodi|faerie|garsfontein|montana|waterkloof|arcadia|muckleneuk|cbd)/i,
    reply:
      'We work across Pretoria — Sunnyside, Arcadia, Hatfield, Brooklyn, Menlyn, Faerie Glen, Garsfontein, Waterkloof, Muckleneuk, the CBD, Mamelodi, Montana and into Centurion. If you are outside that list, ask anyway — we will tell you honestly if we can get there.',
  },
  {
    match: /(hour|open|close|when|weekend|saturday|sunday)/i,
    reply:
      'We run ' +
      SITE.hours +
      ', and after-hours callouts can be arranged — useful for burst geysers and electrical faults.',
  },
  {
    match: /(whatsapp|call|phone|contact|email|speak|talk)/i,
    reply:
      'You can reach the team on ' +
      SITE.phoneDisplay +
      ' (calls and WhatsApp) or email ' +
      SITE.email +
      '. The WhatsApp button is floating at the bottom of the screen.',
  },
  {
    match: /(who|about|company|registered|insured|trust|review)/i,
    reply:
      'Coastal Heritage is a Pretoria-based construction and property-services business covering building, renovations, plumbing and electrical work — one team for the whole job, quoted clearly and finished cleanly. You can see our ratings and service details on the About page.',
  },
  {
    match: /(hi|hello|hey|morning|afternoon|sawubona|dumela)/i,
    reply:
      'Hello — welcome to Coastal Heritage. We handle building, renovations, plumbing and electrical work across Pretoria. What can I help you with?',
  },
];

const FALLBACK_REPLY =
  'I can help with our services (building, renovations, plumbing, electrical), quotes, service areas and contact details. For anything urgent, the team is one tap away on WhatsApp: ' +
  SITE.phoneDisplay +
  '.';

function localReply(history) {
  const last = [...history].reverse().find((m) => m.role === 'user');
  const text = last?.content || '';
  for (const rule of RULES) {
    if (rule.match.test(text)) return Promise.resolve(rule.reply);
  }
  return Promise.resolve(FALLBACK_REPLY);
}
