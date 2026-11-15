// Real suburb photography — all images are genuine photographs of the named
// Pretoria suburbs, sourced from Wikimedia Commons under free licences.
// Attribution is rendered next to each photo and consolidated in the footer.
// Replace with the company's own field photography when available.

export const AREAS = [
  {
    id: 'sunnyside',
    name: 'Sunnyside',
    image:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/Esselenstraat_tot_Bronbergkerk%2C_Sunnyside.jpg/1280px-Esselenstraat_tot_Bronbergkerk%2C_Sunnyside.jpg',
    imageAlt: 'Esselen Street towards the Bronberg church, Sunnyside, Pretoria',
    credit: 'JMK',
    license: 'CC BY-SA 3.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Esselenstraat_tot_Bronbergkerk,_Sunnyside.jpg',
    note: 'Dense flats and older apartment blocks — steady maintenance and repair work.',
  },
  {
    id: 'hatfield',
    name: 'Hatfield',
    image:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/Park_%26_Glyn%2C_Pretoria%2C_South_Africa.jpg/1280px-Park_%26_Glyn%2C_Pretoria%2C_South_Africa.jpg',
    imageAlt: 'Corner of Park and Glyn streets, Hatfield, Pretoria',
    credit: 'Gsalamander',
    license: 'CC BY-SA 4.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Park_%26_Glyn,_Pretoria,_South_Africa.jpg',
    note: 'Student accommodation and sectional titles near the university precinct.',
  },
  {
    id: 'brooklyn',
    name: 'Brooklyn & Nieuw Muckleneuk',
    image:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/Nieuw_Muckleneuk-Brooklyn%2C_Pretoria.jpg/1280px-Nieuw_Muckleneuk-Brooklyn%2C_Pretoria.jpg',
    imageAlt: 'View over Nieuw Muckleneuk and Brooklyn, Pretoria',
    credit: 'JMK',
    license: 'CC BY-SA 3.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Nieuw_Muckleneuk-Brooklyn,_Pretoria.jpg',
    note: 'Established suburb — renovations, upgrades and bathroom/kitchen modernisation.',
  },
  {
    id: 'arcadia',
    name: 'Arcadia',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/f/f6/Jacaranda_Trees_Pretoria.jpg',
    imageAlt: 'Jacaranda-lined street in Pretoria’s older suburbs',
    credit: 'Hein waschefort',
    license: 'CC BY-SA 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Jacaranda_Trees_Pretoria.jpg',
    note: 'Jacaranda-lined streets of heritage homes — restoration and sympathetic upgrades.',
  },
  {
    id: 'faerie-glen',
    name: 'Faerie Glen',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/0/0e/Faerie_Glen%2C_Pretoria%2C_South_Africa.jpg',
    imageAlt: 'View over Faerie Glen, Pretoria East',
    credit: 'Ossewa',
    license: 'CC BY-SA 4.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Faerie_Glen,_Pretoria,_South_Africa.jpg',
    note: 'Family homes in Pretoria East — electrical upgrades, waterproofing and extensions.',
  },
  {
    id: 'menlyn',
    name: 'Menlyn',
    image:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/Menlyn%2C_Pretoria.jpg/1280px-Menlyn%2C_Pretoria.jpg',
    imageAlt: 'Menlyn node with shopping and office development, Pretoria East',
    credit: 'M J Hurter',
    license: 'CC0 (public domain)',
    source: 'https://commons.wikimedia.org/wiki/File:Menlyn,_Pretoria.jpg',
    note: 'Commercial and high-density residential node — fit-outs and maintenance.',
  },
  {
    id: 'garsfontein',
    name: 'Garsfontein',
    image:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b8/Centurion_D5_Evo_gate_motor_installation%2C_Garsfontein_Pretoria.jpg/1280px-Centurion_D5_Evo_gate_motor_installation%2C_Garsfontein_Pretoria.jpg',
    imageAlt: 'Gate motor installation on a residential property in Garsfontein, Pretoria',
    credit: 'Felix chidanyika',
    license: 'CC BY-SA 4.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Centurion_D5_Evo_gate_motor_installation,_Garsfontein_Pretoria.jpg',
    note: 'Freestanding homes and townhouses — gates, electrical work and general repairs.',
  },
  {
    id: 'centurion',
    name: 'Centurion',
    image:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/Centurion_2_Boulogne_Luc_Viatour.jpg/1280px-Centurion_2_Boulogne_Luc_Viatour.jpg',
    imageAlt: 'Residential rooftops in Centurion',
    credit: 'Luc Viatour',
    license: 'CC BY-SA 3.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Centurion_2_Boulogne_Luc_Viatour.jpg',
    note: 'Fast-growing estates between Pretoria and Johannesburg — building and roofing work.',
  },
  {
    id: 'waterkloof',
    name: 'Waterkloof',
    image:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/Waterkloof_Village%2C_Waterkloof%2C_Pretoria.jpg/1280px-Waterkloof_Village%2C_Waterkloof%2C_Pretoria.jpg',
    imageAlt: 'Waterkloof Village shopping node, Pretoria',
    credit: 'JMK',
    license: 'CC BY-SA 3.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Waterkloof_Village,_Waterkloof,_Pretoria.jpg',
    note: 'Prestige homes on the ridge — high-spec renovations and additions.',
  },
  {
    id: 'mamelodi',
    name: 'Mamelodi',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/3/30/Mamelodi.JPG',
    imageAlt: 'View over Mamelodi township, east of Pretoria',
    credit: 'Wikimedia Commons contributor',
    license: 'CC BY-SA 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Mamelodi.JPG',
    note: 'High-volume residential area — building work, walls and household repairs.',
  },
  {
    id: 'cbd',
    name: 'Pretoria CBD',
    image:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/Pretoria_CBD.jpg/1280px-Pretoria_CBD.jpg',
    imageAlt: 'Pretoria central business district',
    credit: 'Mishkoko',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Pretoria_CBD.jpg',
    note: 'Offices and shops — fit-outs, partitioning and commercial plumbing.',
  },
  {
    id: 'muckleneuk',
    name: 'Muckleneuk',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/0/0f/Telkom_Tower_view_from_Muckleneuk.jpg',
    imageAlt: 'View across Muckleneuk towards the Telkom tower, Pretoria',
    credit: 'Ossewa',
    license: 'CC BY-SA 4.0',
    source:
      'https://commons.wikimedia.org/wiki/File:Telkom_Tower_view_from_Muckleneuk.jpg',
    note: 'Older family homes near the city — rewiring, roof repairs and repainting.',
  },
  {
    id: 'groenkloof',
    name: 'Groenkloof',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/9/9e/White_jacarandas_in_Groenkloof%2C_Pretoria.jpg',
    imageAlt: 'White jacarandas flowering in Groenkloof, Pretoria',
    credit: 'Ossewa',
    license: 'CC BY-SA 4.0',
    source:
      'https://commons.wikimedia.org/wiki/File:White_jacarandas_in_Groenkloof,_Pretoria.jpg',
    note: 'Leafy embassy-belt suburb — property maintenance and premium renovation work.',
  },
  {
    id: 'montana',
    name: 'Montana',
    image:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d6/View_of_Montana%2C_Pretoria.jpg/1280px-View_of_Montana%2C_Pretoria.jpg',
    imageAlt: 'View over Montana, northern Pretoria',
    credit: 'M J Hurter',
    license: 'CC0 (public domain)',
    source: 'https://commons.wikimedia.org/wiki/File:View_of_Montana,_Pretoria.jpg',
    note: 'Newer northern suburbs — extensions, paving and boundary walls.',
  },
];
