// AI-driven chart planner for the Insights page.
//
// Flow: model proposes a JSON chart spec -> evalSpec() validates it ->
// on failure the validation errors are reflected back to the model for ONE
// retry -> the passing spec is rendered. This is the reflection + eval loop:
// nothing reaches the UI that fails the eval gate.
//
// With no API key the board renders DEFAULT_SPEC (static charts).

import { AI_ENABLED, askAI } from './provider';
import { MARKET_DATA, SERVICES } from '../data/market';

const ALLOWED_TYPES = ['hbar', 'vbar', 'donut', 'line'];
const VALID_LABELS = new Set([
  ...MARKET_DATA.map((a) => a.name),
  ...SERVICES.map((s) => s.label),
]);

export const DEFAULT_SPEC = {
  source: 'default',
  charts: [
    {
      type: 'hbar',
      title: 'Plumbing demand — top suburbs',
      caption: 'Ageing flat stock drives reactive plumbing work',
      items: [...MARKET_DATA]
        .sort((a, b) => b.demand.plumbing - a.demand.plumbing)
        .slice(0, 6)
        .map((a) => ({ label: a.name, value: a.demand.plumbing })),
    },
    {
      type: 'donut',
      title: 'Demand mix across trades',
      caption: 'Average modelled score per service line',
      items: SERVICES.map((s) => ({
        label: s.label,
        value: Math.round(
          MARKET_DATA.reduce((n, a) => n + a.demand[s.id], 0) / MARKET_DATA.length
        ),
      })),
    },
    {
      type: 'vbar',
      title: 'Building demand — growth corridors',
      caption: 'New-build scores concentrate north and east',
      items: [...MARKET_DATA]
        .sort((a, b) => b.demand.building - a.demand.building)
        .slice(0, 6)
        .map((a) => ({ label: a.name, value: a.demand.building })),
    },
  ],
};

// --- eval gate --------------------------------------------------------------
// Returns { ok, errors }. A spec passes only if every chart uses an allowed
// type, 2-8 items, recognised labels and finite 0-100 values.

export function evalSpec(spec) {
  const errors = [];
  const charts = spec?.charts;
  if (!Array.isArray(charts) || charts.length < 1 || charts.length > 4) {
    return { ok: false, errors: ['spec must contain 1-4 charts'] };
  }
  charts.forEach((c, i) => {
    if (!ALLOWED_TYPES.includes(c?.type)) errors.push(`chart ${i}: type must be one of ${ALLOWED_TYPES.join('|')}`);
    if (typeof c?.title !== 'string' || c.title.length < 4 || c.title.length > 80)
      errors.push(`chart ${i}: title must be 4-80 chars`);
    const items = c?.items;
    if (!Array.isArray(items) || items.length < 2 || items.length > 8) {
      errors.push(`chart ${i}: items must contain 2-8 entries`);
      return;
    }
    items.forEach((it, j) => {
      if (typeof it?.label !== 'string' || !VALID_LABELS.has(it.label))
        errors.push(`chart ${i} item ${j}: label "${it?.label}" is not a known suburb or service`);
      if (typeof it?.value !== 'number' || !Number.isFinite(it.value) || it.value < 0 || it.value > 100)
        errors.push(`chart ${i} item ${j}: value must be 0-100`);
    });
  });
  return { ok: errors.length === 0, errors };
}

// --- model call -------------------------------------------------------------

const VIZ_PROMPT = `You decide which charts best report Pretoria suburb demand to a construction team.
Data: suburb names and demand scores (0-100) for four services: plumbing, electrical, renovation, building.
Suburbs: ${MARKET_DATA.map((a) => a.name).join(', ')}.

Reply with ONLY a JSON object (no prose, no code fence):
{"charts":[{"type":"hbar|vbar|donut|line","title":"short title","caption":"one-line takeaway","items":[{"label":"<exact suburb or service name>","value":<0-100>}]}]}

Rules: 2-3 charts; each chart 4-6 items; pick DIFFERENT chart types that genuinely fit the data (rankings -> hbar/vbar, composition -> donut, ordered trend -> line); labels must be exact names from the lists above; values must come from the demand data, not invented.`;

function extractJSON(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

function matrixSummary() {
  return MARKET_DATA.map(
    (a) =>
      `${a.name}: plumbing ${a.demand.plumbing}, electrical ${a.demand.electrical}, renovation ${a.demand.renovation}, building ${a.demand.building}`
  ).join('\n');
}

export async function planCharts() {
  if (!AI_ENABLED) return { spec: DEFAULT_SPEC, reflected: false, errors: [] };

  // Attempt 1
  let reply = await askAI([
    { role: 'user', content: `${VIZ_PROMPT}\n\nDemand matrix:\n${matrixSummary()}` },
  ]);
  let spec = extractJSON(reply);
  let result = evalSpec(spec);
  if (result.ok) return { spec, reflected: false, errors: [] };

  // Reflection: feed the eval failures back for one correction pass
  const feedback = spec
    ? `Your spec failed validation. Errors: ${result.errors.join('; ')}. Fix and reply with corrected JSON only.`
    : `Reply was not valid JSON. ${VIZ_PROMPT}`;
  reply = await askAI([
    { role: 'user', content: `${feedback}\n\nDemand matrix:\n${matrixSummary()}` },
  ]);
  spec = extractJSON(reply);
  result = evalSpec(spec);

  if (result.ok) return { spec, reflected: true, errors: [] };
  return { spec: DEFAULT_SPEC, reflected: true, errors: result.errors };
}
