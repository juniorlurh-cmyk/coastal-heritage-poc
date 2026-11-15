// Modelled demand view — NOT measured sales data.
// Scores are directional estimates built from public signals: housing-stock
// age (older stock -> renovation/plumbing/electrical demand), dwelling type
// (flats vs freestanding), development activity and property turnover in
// each node. The AI analyst on the Insights page interprets this matrix.
// Replace with real enquiry/quote data as the business collects it.

export const MARKET_DATA = [
  {
    id: 'sunnyside',
    name: 'Sunnyside',
    type: 'High-density flats',
    profile: 'Ageing apartment blocks, high tenant turnover',
    demand: { plumbing: 92, electrical: 78, renovation: 55, building: 30 },
    signal: 'Constant plumbing failures in older blocks; landlords fund repairs',
  },
  {
    id: 'arcadia',
    name: 'Arcadia',
    type: 'Flats + heritage homes',
    profile: 'Mixed heritage housing near CBD',
    demand: { plumbing: 85, electrical: 74, renovation: 60, building: 35 },
    signal: 'Old pipework and wiring; heritage restorations',
  },
  {
    id: 'hatfield',
    name: 'Hatfield',
    type: 'Student accommodation',
    profile: 'Sectional titles & communes around UP',
    demand: { plumbing: 80, electrical: 70, renovation: 58, building: 40 },
    signal: 'High-wear rental stock; landlords refresh between leases',
  },
  {
    id: 'brooklyn',
    name: 'Brooklyn',
    type: 'Established suburb',
    profile: 'Older family homes, strong property values',
    demand: { plumbing: 65, electrical: 62, renovation: 82, building: 55 },
    signal: 'Kitchen/bathroom modernisation; sellers renovate before listing',
  },
  {
    id: 'muckleneuk',
    name: 'Muckleneuk',
    type: 'Older family homes',
    profile: 'Pre-war and mid-century housing stock',
    demand: { plumbing: 78, electrical: 76, renovation: 66, building: 45 },
    signal: 'Rewiring and roof work on ageing properties',
  },
  {
    id: 'waterkloof',
    name: 'Waterkloof',
    type: 'Prestige residential',
    profile: 'Large stands, high-income households',
    demand: { plumbing: 55, electrical: 60, renovation: 88, building: 70 },
    signal: 'Premium renovations, additions and smart-home upgrades',
  },
  {
    id: 'groenkloof',
    name: 'Groenkloof',
    type: 'Established premium',
    profile: 'Embassy belt, mature properties',
    demand: { plumbing: 52, electrical: 58, renovation: 84, building: 62 },
    signal: 'High-spec maintenance and sympathetic additions',
  },
  {
    id: 'faerie-glen',
    name: 'Faerie Glen',
    type: 'Family suburb',
    profile: '1980s–90s homes, active family market',
    demand: { plumbing: 66, electrical: 72, renovation: 76, building: 60 },
    signal: 'Solar/backup power, waterproofing, garage conversions',
  },
  {
    id: 'menlyn',
    name: 'Menlyn',
    type: 'Commercial node',
    profile: 'Retail/offices + new residential towers',
    demand: { plumbing: 60, electrical: 68, renovation: 64, building: 75 },
    signal: 'Office fit-outs and commercial maintenance contracts',
  },
  {
    id: 'garsfontein',
    name: 'Garsfontein',
    type: 'Family suburb',
    profile: 'Townhouses and freestanding homes',
    demand: { plumbing: 64, electrical: 74, renovation: 70, building: 58 },
    signal: 'Gate motors, DB upgrades, security-linked electrical work',
  },
  {
    id: 'montana',
    name: 'Montana',
    type: 'Newer suburb',
    profile: 'Recent estates north of the N1',
    demand: { plumbing: 58, electrical: 60, renovation: 62, building: 78 },
    signal: 'Extensions, boundary walls, paving on newer stands',
  },
  {
    id: 'centurion',
    name: 'Centurion',
    type: 'Growth corridor',
    profile: 'Estates & complexes between PTA and JHB',
    demand: { plumbing: 62, electrical: 65, renovation: 68, building: 82 },
    signal: 'Active building market; body-corporate maintenance work',
  },
  {
    id: 'mamelodi',
    name: 'Mamelodi',
    type: 'High-volume residential',
    profile: 'Densely populated township east of city',
    demand: { plumbing: 84, electrical: 80, renovation: 48, building: 66 },
    signal: 'Household repairs, boundary walls and room additions',
  },
  {
    id: 'cbd',
    name: 'Pretoria CBD',
    type: 'Commercial core',
    profile: 'Offices, retail and flats above shops',
    demand: { plumbing: 72, electrical: 70, renovation: 74, building: 50 },
    signal: 'Fit-outs, partitioning and reactive maintenance',
  },
];

export const SERVICES = [
  { id: 'plumbing', label: 'Plumbing' },
  { id: 'electrical', label: 'Electrical' },
  { id: 'renovation', label: 'Renovations' },
  { id: 'building', label: 'Building' },
];

export function topAreas(serviceId, count = 5) {
  return [...MARKET_DATA]
    .sort((a, b) => b.demand[serviceId] - a.demand[serviceId])
    .slice(0, count);
}
