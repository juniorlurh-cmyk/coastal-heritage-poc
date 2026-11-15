import { useState } from 'react';
import { planCharts, DEFAULT_SPEC } from '../ai/viz';
import { AI_ENABLED, AI_MODEL } from '../ai/provider';
import { Icon } from './Icons';

const PALETTE = ['#c4703f', '#536b5b', '#c9a06d', '#8fa79a', '#a2572f', '#2f463a'];

function HBar({ items }) {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <div className="viz-hbar">
      {items.map((it, i) => (
        <div className="viz-hbar-row" key={it.label}>
          <span className="viz-label">{it.label}</span>
          <span className="viz-track">
            <i style={{ width: `${(it.value / max) * 100}%`, background: PALETTE[i % PALETTE.length] }} />
          </span>
          <b>{it.value}</b>
        </div>
      ))}
    </div>
  );
}

function VBar({ items }) {
  const max = Math.max(...items.map((i) => i.value), 1);
  const H = 150;
  const W = 100;
  return (
    <div className="viz-vbar" role="img" aria-label="Column chart">
      {items.map((it, i) => (
        <div className="viz-col" key={it.label}>
          <svg viewBox={`0 0 ${W} ${H + 22}`}>
            <rect
              x="18"
              y={H - (it.value / max) * (H - 18)}
              width={W - 36}
              height={(it.value / max) * (H - 18)}
              rx="3"
              fill={PALETTE[i % PALETTE.length]}
            />
            <text x={W / 2} y={H - (it.value / max) * (H - 18) - 6} textAnchor="middle" className="viz-val">
              {it.value}
            </text>
            <text x={W / 2} y={H + 15} textAnchor="middle" className="viz-cat">
              {it.label.length > 10 ? it.label.slice(0, 9) + '…' : it.label}
            </text>
          </svg>
        </div>
      ))}
    </div>
  );
}

function Donut({ items }) {
  const total = items.reduce((n, i) => n + i.value, 0) || 1;
  const R = 54;
  const C = 2 * Math.PI * R;
  const offsets = [];
  items.reduce((acc, it) => {
    offsets.push(acc);
    return acc + it.value / total;
  }, 0);
  return (
    <div className="viz-donut">
      <svg viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={R} fill="none" stroke="#edece4" strokeWidth="22" />
        {items.map((it, i) => (
          <circle
            key={it.label}
            cx="70" cy="70" r={R} fill="none"
            stroke={PALETTE[i % PALETTE.length]}
            strokeWidth="22"
            strokeDasharray={`${(it.value / total) * C} ${C}`}
            strokeDashoffset={-offsets[i] * C}
            transform="rotate(-90 70 70)"
          />
        ))}
        <text x="70" y="75" textAnchor="middle" className="viz-donut-total">
          {Math.round(total / items.length)}
        </text>
      </svg>
      <ul className="viz-legend">
        {items.map((it, i) => (
          <li key={it.label}>
            <i style={{ background: PALETTE[i % PALETTE.length] }} />
            {it.label} <b>{it.value}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Line({ items }) {
  const W = 320;
  const H = 150;
  const max = Math.max(...items.map((i) => i.value), 1);
  const min = Math.min(...items.map((i) => i.value), 0);
  const x = (i) => 14 + (i / (items.length - 1)) * (W - 28);
  const y = (v) => H - 16 - ((v - min) / (max - min || 1)) * (H - 34);
  const pts = items.map((it, i) => `${x(i)},${y(it.value)}`).join(' ');
  return (
    <div className="viz-line">
      <svg viewBox={`0 0 ${W} ${H}`}>
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line key={f} x1="14" x2={W - 14} y1={H - 16 - f * (H - 34)} y2={H - 16 - f * (H - 34)} className="viz-gridline" />
        ))}
        <polyline points={pts} fill="none" stroke={PALETTE[0]} strokeWidth="2.5" strokeLinejoin="round" />
        {items.map((it, i) => (
          <g key={it.label}>
            <circle cx={x(i)} cy={y(it.value)} r="4" fill={PALETTE[0]} />
            <text x={x(i)} y={H - 2} textAnchor="middle" className="viz-cat">
              {it.label.length > 8 ? it.label.slice(0, 7) + '…' : it.label}
            </text>
            <text x={x(i)} y={y(it.value) - 9} textAnchor="middle" className="viz-val">
              {it.value}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

const RENDERERS = { hbar: HBar, vbar: VBar, donut: Donut, line: Line };

export default function VizBoard() {
  const [spec, setSpec] = useState(DEFAULT_SPEC);
  const [reflected, setReflected] = useState(false);
  const [busy, setBusy] = useState(false);
  const [usedAI, setUsedAI] = useState(false);

  async function generate() {
    setBusy(true);
    try {
      const { spec: s, reflected: r } = await planCharts();
      setSpec(s);
      setReflected(r);
      setUsedAI(s !== DEFAULT_SPEC);
    } catch {
      setSpec(DEFAULT_SPEC);
      setUsedAI(false);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="viz-board">
      <div className="viz-board-head">
        <div>
          <h3>Demand visuals</h3>
          <p>
            {AI_ENABLED
              ? `Chart selection is decided by ${AI_MODEL}, then validated by an eval gate before rendering${reflected ? ' (spec corrected via reflection)' : ''}.`
              : 'Default charts — add a Groq key to let the model choose the best visuals.'}
          </p>
        </div>
        {AI_ENABLED && (
          <button className="btn" onClick={generate} disabled={busy}>
            <Icon name="chart" /> {busy ? 'Planning…' : usedAI ? 'Re-plan visuals' : 'Plan visuals with AI'}
          </button>
        )}
      </div>
      <div className="viz-grid">
        {spec.charts.map((chart, i) => {
          const Renderer = RENDERERS[chart.type] || HBar;
          return (
            <figure className="viz-card" key={`${chart.type}-${i}`}>
              <figcaption>
                <strong>{chart.title}</strong>
                {chart.caption && <span>{chart.caption}</span>}
              </figcaption>
              <Renderer items={chart.items} />
            </figure>
          );
        })}
      </div>
      <p className="viz-note">
        {usedAI
          ? 'Spec generated by the model and passed eval validation (allowed types, known labels, 0-100 values).'
          : 'Static default layout. Values from the modelled demand matrix — directional estimates.'}
      </p>
    </div>
  );
}
