export const SITE = {
  name: 'Coastal Heritage',
  tagline: 'Building · Plumbing · Electrical',
  descriptor: 'Construction & property services — Pretoria, Gauteng',
  phoneDisplay: '078 742 8887',
  phoneTel: '+27787428887',
  whatsappNumber: '27787428887',
  email: 'info@coastalheritage.co.za',
  suburb: 'Sunnyside',
  city: 'Pretoria, Gauteng',
  hours: 'Mon–Sat · 07:00–17:00',
  hoursNote: 'After-hours callouts by arrangement',
  mapsUrl:
    'https://www.google.com/maps/place/Coastal+Heritage/@-25.7528376,28.2037632,331m/data=!3m1!1e3!4m10!1m2!2m1!1sconstruction+company!3m6!1s0x1e9561593f14c827:0xf91a5209d283113c!8m2!3d-25.7524744!4d28.206044!15sChRjb25zdHJ1Y3Rpb24gY29tcGFueZIBFGNvbnN0cnVjdGlvbl9jb21wYW554AEA!16s%2Fg%2F11pkcrz5t4?entry=ttu',
};

export const SERVICE_AREAS = [
  'Sunnyside',
  'Arcadia',
  'Hatfield',
  'Brooklyn',
  'Pretoria CBD',
  'Muckleneuk',
  'Faerie Glen',
  'Garsfontein',
  'Centurion',
  'Mamelodi',
  'Silverton',
  'Menlyn',
];

export function whatsappUrl(message) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_DEFAULT = whatsappUrl(
  'Hello Coastal Heritage, I would like to discuss a project.'
);
