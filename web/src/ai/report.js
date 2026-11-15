// Export the insights view as a self-contained HTML report — opens in any
// browser, printable to PDF. Includes the demand matrix, per-trade top
// suburbs, and the AI briefing if one has been generated this session.

import { MARKET_DATA, SERVICES } from '../data/market';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function downloadReport() {
  const brief = localStorage.getItem('ch-ai-brief');
  const date = new Date().toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const rows = MARKET_DATA.map(
    (a) => `<tr>
      <td>${esc(a.name)}</td><td>${esc(a.type)}</td>
      <td>${a.demand.plumbing}</td><td>${a.demand.electrical}</td>
      <td>${a.demand.renovation}</td><td>${a.demand.building}</td>
      <td>${esc(a.signal)}</td>
    </tr>`
  ).join('');

  const rankings = SERVICES.map((s) => {
    const top = [...MARKET_DATA]
      .sort((a, b) => b.demand[s.id] - a.demand[s.id])
      .slice(0, 5)
      .map((a, i) => `<li><b>${i + 1}. ${esc(a.name)}</b> — ${a.demand[s.id]}</li>`)
      .join('');
    return `<div class="rank"><h3>${esc(s.label)}</h3><ol>${top}</ol></div>`;
  }).join('');

  const html = `<!doctype html><html><head><meta charset="utf-8">
<title>Coastal Heritage — Demand report</title>
<style>
body{font-family:system-ui,Arial,sans-serif;max-width:960px;margin:40px auto;padding:0 24px;color:#1c2a24;line-height:1.6}
h1{font-family:Georgia,serif;font-size:28px;margin:0 0 4px}
.meta{color:#5a6a60;font-size:13px;margin-bottom:28px}
table{width:100%;border-collapse:collapse;font-size:12.5px;margin:14px 0 30px}
th,td{border:1px solid #d8dcd3;padding:7px 10px;text-align:left;vertical-align:top}
th{background:#f2f0e9;font-size:11px;text-transform:uppercase;letter-spacing:.05em}
.ranks{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:28px}
.rank{border:1px solid #d8dcd3;border-radius:6px;padding:14px 18px}
.rank h3{margin:0 0 8px;font-size:15px}.rank ol{margin:0;padding-left:0;list-style:none;font-size:13px}
.brief{border-left:4px solid #c4703f;background:#faf8f2;padding:16px 20px;white-space:pre-line;font-size:13.5px}
.note{color:#5a6a60;font-size:11px;margin-top:26px}
</style></head><body>
<h1>Coastal Heritage — Pretoria demand report</h1>
<p class="meta">Generated ${esc(date)} · modelled estimates, not measured sales data</p>
<h2>Demand matrix by suburb</h2>
<table><tr><th>Suburb</th><th>Profile</th><th>Plumbing</th><th>Electrical</th><th>Renovation</th><th>Building</th><th>Signal</th></tr>${rows}</table>
<h2>Top suburbs per trade</h2>
<div class="ranks">${rankings}</div>
${brief ? `<h2>AI market briefing</h2><div class="brief">${esc(brief)}</div>` : ''}
<p class="note">Scores are directional estimates modelled from housing-stock age, dwelling type, rental density and development activity. Source: coastal-heritage-poc insights page.</p>
</body></html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'coastal-heritage-demand-report.html';
  a.click();
  URL.revokeObjectURL(a.href);
}
