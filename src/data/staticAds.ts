export type AdConcept =
  | 'Day-by-Day Diary'
  | 'Before / After'
  | 'UGC / Testimonial'
  | 'Price Offer'
  | 'Bundle Offer'
  | 'Ingredient Spotlight'
  | 'Benefits / Features'
  | 'Social Proof'
  | 'Myth Busting'
  | 'Problem Hook'
  | 'Problem / Solution'
  | 'Problem / Pain Hook'
  | 'Big Number / Hero Stat'
  | 'Infographic'
  | 'Lifestyle'

export interface Ad {
  brand: string
  src: string
  concept: AdConcept
}

export const CONCEPTS: AdConcept[] = [
  'Day-by-Day Diary',
  'Before / After',
  'UGC / Testimonial',
  'Price Offer',
  'Bundle Offer',
  'Ingredient Spotlight',
  'Benefits / Features',
  'Social Proof',
  'Myth Busting',
  'Problem Hook',
  'Problem / Solution',
  'Problem / Pain Hook',
  'Big Number / Hero Stat',
  'Infographic',
  'Lifestyle',
]

export const ADS: Ad[] = [
  // ── BARKLY ──────────────────────────────────
  { brand: 'Barkly', src: '/ads/barkly/01.webp', concept: 'Day-by-Day Diary' },
  { brand: 'Barkly', src: '/ads/barkly/02.webp', concept: 'Day-by-Day Diary' },
  { brand: 'Barkly', src: '/ads/barkly/03.webp', concept: 'Problem / Solution' },
  { brand: 'Barkly', src: '/ads/barkly/04.webp', concept: 'Big Number / Hero Stat' },
  { brand: 'Barkly', src: '/ads/barkly/05.webp', concept: 'Before / After' },
  { brand: 'Barkly', src: '/ads/barkly/06.webp', concept: 'Price Offer' },
  { brand: 'Barkly', src: '/ads/barkly/07.webp', concept: 'Price Offer' },
  { brand: 'Barkly', src: '/ads/barkly/08.webp', concept: 'Ingredient Spotlight' },
  { brand: 'Barkly', src: '/ads/barkly/09.webp', concept: 'Ingredient Spotlight' },
  { brand: 'Barkly', src: '/ads/barkly/10.webp', concept: 'UGC / Testimonial' },
  { brand: 'Barkly', src: '/ads/barkly/11.webp', concept: 'UGC / Testimonial' },

  // ── BIOHERBA ────────────────────────────────
  { brand: 'Bioherba', src: '/ads/bioherba/01.webp', concept: 'Ingredient Spotlight' },
  { brand: 'Bioherba', src: '/ads/bioherba/02.webp', concept: 'Ingredient Spotlight' },
  { brand: 'Bioherba', src: '/ads/bioherba/03.webp', concept: 'Ingredient Spotlight' },
  { brand: 'Bioherba', src: '/ads/bioherba/04.webp', concept: 'Ingredient Spotlight' },
  { brand: 'Bioherba', src: '/ads/bioherba/05.webp', concept: 'Day-by-Day Diary' },
  { brand: 'Bioherba', src: '/ads/bioherba/06.webp', concept: 'Infographic' },
  { brand: 'Bioherba', src: '/ads/bioherba/07.webp', concept: 'Ingredient Spotlight' },
  { brand: 'Bioherba', src: '/ads/bioherba/08.webp', concept: 'Ingredient Spotlight' },
  { brand: 'Bioherba', src: '/ads/bioherba/09.webp', concept: 'Ingredient Spotlight' },
  { brand: 'Bioherba', src: '/ads/bioherba/10.webp', concept: 'Social Proof' },
  { brand: 'Bioherba', src: '/ads/bioherba/11.webp', concept: 'Ingredient Spotlight' },

  // ── COFFEE DOSS ─────────────────────────────
  { brand: 'Coffee Doss', src: '/ads/coffee-doss/01.webp', concept: 'Social Proof' },
  { brand: 'Coffee Doss', src: '/ads/coffee-doss/02.webp', concept: 'Social Proof' },
  { brand: 'Coffee Doss', src: '/ads/coffee-doss/03.webp', concept: 'Social Proof' },
  { brand: 'Coffee Doss', src: '/ads/coffee-doss/04.webp', concept: 'Benefits / Features' },
  { brand: 'Coffee Doss', src: '/ads/coffee-doss/05.webp', concept: 'Benefits / Features' },

  // ── ДИВ БАЛКАН ──────────────────────────────
  { brand: 'Див Балкан', src: '/ads/div-balkan/01.webp', concept: 'Lifestyle' },
  { brand: 'Див Балкан', src: '/ads/div-balkan/02.webp', concept: 'Lifestyle' },
  { brand: 'Див Балкан', src: '/ads/div-balkan/03.webp', concept: 'Lifestyle' },
  { brand: 'Див Балкан', src: '/ads/div-balkan/04.webp', concept: 'Lifestyle' },
  { brand: 'Див Балкан', src: '/ads/div-balkan/05.webp', concept: 'Lifestyle' },
  { brand: 'Див Балкан', src: '/ads/div-balkan/06.webp', concept: 'Lifestyle' },
  { brand: 'Див Балкан', src: '/ads/div-balkan/07.webp', concept: 'Lifestyle' },
  { brand: 'Див Балкан', src: '/ads/div-balkan/08.webp', concept: 'Lifestyle' },

  // ── DR. FIT ─────────────────────────────────
  { brand: 'Dr. Fit', src: '/ads/dr-fit/01.webp', concept: 'Before / After' },
  { brand: 'Dr. Fit', src: '/ads/dr-fit/02.webp', concept: 'Before / After' },
  { brand: 'Dr. Fit', src: '/ads/dr-fit/03.webp', concept: 'Before / After' },
  { brand: 'Dr. Fit', src: '/ads/dr-fit/04.webp', concept: 'Before / After' },
  { brand: 'Dr. Fit', src: '/ads/dr-fit/05.webp', concept: 'Before / After' },
  { brand: 'Dr. Fit', src: '/ads/dr-fit/06.webp', concept: 'Price Offer' },
  { brand: 'Dr. Fit', src: '/ads/dr-fit/07.webp', concept: 'Price Offer' },
  { brand: 'Dr. Fit', src: '/ads/dr-fit/08.webp', concept: 'Myth Busting' },
  { brand: 'Dr. Fit', src: '/ads/dr-fit/09.webp', concept: 'Myth Busting' },
  { brand: 'Dr. Fit', src: '/ads/dr-fit/10.webp', concept: 'Problem / Pain Hook' },
  { brand: 'Dr. Fit', src: '/ads/dr-fit/11.webp', concept: 'Myth Busting' },
  { brand: 'Dr. Fit', src: '/ads/dr-fit/12.webp', concept: 'Myth Busting' },
  { brand: 'Dr. Fit', src: '/ads/dr-fit/13.webp', concept: 'Myth Busting' },
  { brand: 'Dr. Fit', src: '/ads/dr-fit/14.webp', concept: 'Infographic' },

  // ── LEYA ────────────────────────────────────
  { brand: 'Leya', src: '/ads/leya/01.webp', concept: 'Problem / Pain Hook' },
  { brand: 'Leya', src: '/ads/leya/02.webp', concept: 'Problem / Pain Hook' },
  { brand: 'Leya', src: '/ads/leya/03.webp', concept: 'Problem / Pain Hook' },
  { brand: 'Leya', src: '/ads/leya/04.webp', concept: 'Problem / Pain Hook' },
  { brand: 'Leya', src: '/ads/leya/05.webp', concept: 'Day-by-Day Diary' },
  { brand: 'Leya', src: '/ads/leya/06.webp', concept: 'Myth Busting' },
  { brand: 'Leya', src: '/ads/leya/07.webp', concept: 'Myth Busting' },
  { brand: 'Leya', src: '/ads/leya/08.webp', concept: 'Problem / Solution' },
  { brand: 'Leya', src: '/ads/leya/09.webp', concept: 'Problem / Pain Hook' },

  // ── MANICUREZONE ────────────────────────────
  { brand: 'ManicureZone', src: '/ads/manicurezone/01.webp', concept: 'Bundle Offer' },
  { brand: 'ManicureZone', src: '/ads/manicurezone/02.webp', concept: 'Benefits / Features' },
  { brand: 'ManicureZone', src: '/ads/manicurezone/03.webp', concept: 'Problem / Solution' },
  { brand: 'ManicureZone', src: '/ads/manicurezone/05.webp', concept: 'Benefits / Features' },
  { brand: 'ManicureZone', src: '/ads/manicurezone/06.webp', concept: 'Benefits / Features' },
  { brand: 'ManicureZone', src: '/ads/manicurezone/07.webp', concept: 'Social Proof' },
  { brand: 'ManicureZone', src: '/ads/manicurezone/08.webp', concept: 'Lifestyle' },
  { brand: 'ManicureZone', src: '/ads/manicurezone/09.webp', concept: 'Price Offer' },
  { brand: 'ManicureZone', src: '/ads/manicurezone/10.webp', concept: 'Social Proof' },
  { brand: 'ManicureZone', src: '/ads/manicurezone/11.webp', concept: 'Price Offer' },
  { brand: 'ManicureZone', src: '/ads/manicurezone/12.webp', concept: 'Social Proof' },
  { brand: 'ManicureZone', src: '/ads/manicurezone/13.webp', concept: 'Social Proof' },

  // ── NORDICS ─────────────────────────────────
  { brand: 'Nordics', src: '/ads/nordics/01.webp', concept: 'Day-by-Day Diary' },
  { brand: 'Nordics', src: '/ads/nordics/02.webp', concept: 'Day-by-Day Diary' },
  { brand: 'Nordics', src: '/ads/nordics/03.webp', concept: 'Big Number / Hero Stat' },
  { brand: 'Nordics', src: '/ads/nordics/04.webp', concept: 'Problem / Pain Hook' },
  { brand: 'Nordics', src: '/ads/nordics/05.webp', concept: 'Before / After' },
  { brand: 'Nordics', src: '/ads/nordics/06.webp', concept: 'Problem / Solution' },
  { brand: 'Nordics', src: '/ads/nordics/07.webp', concept: 'Problem / Pain Hook' },
  { brand: 'Nordics', src: '/ads/nordics/08.webp', concept: 'Lifestyle' },
  { brand: 'Nordics', src: '/ads/nordics/09.webp', concept: 'Problem / Pain Hook' },
  { brand: 'Nordics', src: '/ads/nordics/10.webp', concept: 'Problem / Pain Hook' },
  { brand: 'Nordics', src: '/ads/nordics/11.webp', concept: 'Problem / Pain Hook' },

  // ── PTG ENGINEERING ─────────────────────────
  { brand: 'PTG Engineering', src: '/ads/ptg-engineering/01.webp', concept: 'Lifestyle' },
  { brand: 'PTG Engineering', src: '/ads/ptg-engineering/02.webp', concept: 'Benefits / Features' },
  { brand: 'PTG Engineering', src: '/ads/ptg-engineering/03.webp', concept: 'Problem / Solution' },
  { brand: 'PTG Engineering', src: '/ads/ptg-engineering/04.webp', concept: 'Benefits / Features' },
  { brand: 'PTG Engineering', src: '/ads/ptg-engineering/05.webp', concept: 'Big Number / Hero Stat' },
  { brand: 'PTG Engineering', src: '/ads/ptg-engineering/06.webp', concept: 'Benefits / Features' },
  { brand: 'PTG Engineering', src: '/ads/ptg-engineering/07.webp', concept: 'Benefits / Features' },
  { brand: 'PTG Engineering', src: '/ads/ptg-engineering/08.webp', concept: 'Problem / Pain Hook' },

  // ── SO SIMPLE ───────────────────────────────
  { brand: 'So Simple', src: '/ads/so-simple/01.webp', concept: 'Problem / Pain Hook' },
  { brand: 'So Simple', src: '/ads/so-simple/02.webp', concept: 'Ingredient Spotlight' },
  { brand: 'So Simple', src: '/ads/so-simple/03.webp', concept: 'Benefits / Features' },
  { brand: 'So Simple', src: '/ads/so-simple/04.webp', concept: 'Social Proof' },
  { brand: 'So Simple', src: '/ads/so-simple/05.webp', concept: 'Social Proof' },
  { brand: 'So Simple', src: '/ads/so-simple/06.webp', concept: 'Social Proof' },
  { brand: 'So Simple', src: '/ads/so-simple/07.webp', concept: 'Social Proof' },
  { brand: 'So Simple', src: '/ads/so-simple/08.webp', concept: 'Lifestyle' },
  { brand: 'So Simple', src: '/ads/so-simple/09.webp', concept: 'Problem / Solution' },
  { brand: 'So Simple', src: '/ads/so-simple/10.webp', concept: 'Benefits / Features' },
  { brand: 'So Simple', src: '/ads/so-simple/11.webp', concept: 'Lifestyle' },
  { brand: 'So Simple', src: '/ads/so-simple/12.webp', concept: 'Social Proof' },
  { brand: 'So Simple', src: '/ads/so-simple/13.webp', concept: 'Lifestyle' },
  { brand: 'So Simple', src: '/ads/so-simple/14.webp', concept: 'UGC / Testimonial' },
  { brand: 'So Simple', src: '/ads/so-simple/15.webp', concept: 'Ingredient Spotlight' },
  { brand: 'So Simple', src: '/ads/so-simple/16.webp', concept: 'Big Number / Hero Stat' },
  { brand: 'So Simple', src: '/ads/so-simple/17.webp', concept: 'Lifestyle' },
  { brand: 'So Simple', src: '/ads/so-simple/18.webp', concept: 'Social Proof' },
  { brand: 'So Simple', src: '/ads/so-simple/19.webp', concept: 'Social Proof' },
  { brand: 'So Simple', src: '/ads/so-simple/20.webp', concept: 'Social Proof' },
  { brand: 'So Simple', src: '/ads/so-simple/21.webp', concept: 'Social Proof' },
  { brand: 'So Simple', src: '/ads/so-simple/22.webp', concept: 'Social Proof' },
  { brand: 'So Simple', src: '/ads/so-simple/23.webp', concept: 'Lifestyle' },
  { brand: 'So Simple', src: '/ads/so-simple/24.webp', concept: 'Lifestyle' },
  { brand: 'So Simple', src: '/ads/so-simple/25.webp', concept: 'Lifestyle' },
  { brand: 'So Simple', src: '/ads/so-simple/26.webp', concept: 'Ingredient Spotlight' },
  { brand: 'So Simple', src: '/ads/so-simple/27.webp', concept: 'Ingredient Spotlight' },
  { brand: 'So Simple', src: '/ads/so-simple/28.webp', concept: 'Ingredient Spotlight' },
  { brand: 'So Simple', src: '/ads/so-simple/29.webp', concept: 'Ingredient Spotlight' },
  { brand: 'So Simple', src: '/ads/so-simple/30.webp', concept: 'Ingredient Spotlight' },
  { brand: 'So Simple', src: '/ads/so-simple/31.webp', concept: 'Lifestyle' },
  { brand: 'So Simple', src: '/ads/so-simple/32.webp', concept: 'Lifestyle' },
  { brand: 'So Simple', src: '/ads/so-simple/33.webp', concept: 'Before / After' },
  { brand: 'So Simple', src: '/ads/so-simple/34.webp', concept: 'Big Number / Hero Stat' },
  { brand: 'So Simple', src: '/ads/so-simple/35.webp', concept: 'Problem / Pain Hook' },
  { brand: 'So Simple', src: '/ads/so-simple/36.webp', concept: 'Problem / Pain Hook' },
  { brand: 'So Simple', src: '/ads/so-simple/37.webp', concept: 'Benefits / Features' },
  { brand: 'So Simple', src: '/ads/so-simple/38.webp', concept: 'Social Proof' },
  { brand: 'So Simple', src: '/ads/so-simple/39.webp', concept: 'Bundle Offer' },
  { brand: 'So Simple', src: '/ads/so-simple/40.webp', concept: 'Bundle Offer' },
  { brand: 'So Simple', src: '/ads/so-simple/41.webp', concept: 'Bundle Offer' },
  { brand: 'So Simple', src: '/ads/so-simple/42.webp', concept: 'Bundle Offer' },
  { brand: 'So Simple', src: '/ads/so-simple/43.webp', concept: 'Bundle Offer' },
  { brand: 'So Simple', src: '/ads/so-simple/44.webp', concept: 'Bundle Offer' },
  { brand: 'So Simple', src: '/ads/so-simple/45.webp', concept: 'Bundle Offer' },

  // ── JUUN ────────────────────────────────────
  { brand: 'Juun', src: '/ads/juun/01.webp', concept: 'Bundle Offer' },
  { brand: 'Juun', src: '/ads/juun/02.webp', concept: 'Bundle Offer' },
  { brand: 'Juun', src: '/ads/juun/03.webp', concept: 'Bundle Offer' },
  { brand: 'Juun', src: '/ads/juun/04.webp', concept: 'Problem / Pain Hook' },
  { brand: 'Juun', src: '/ads/juun/05.webp', concept: 'UGC / Testimonial' },
  { brand: 'Juun', src: '/ads/juun/06.webp', concept: 'UGC / Testimonial' },
  { brand: 'Juun', src: '/ads/juun/07.webp', concept: 'Myth Busting' },
  { brand: 'Juun', src: '/ads/juun/08.webp', concept: 'UGC / Testimonial' },
  { brand: 'Juun', src: '/ads/juun/09.webp', concept: 'Myth Busting' },
  { brand: 'Juun', src: '/ads/juun/10.webp', concept: 'Myth Busting' },
  { brand: 'Juun', src: '/ads/juun/11.webp', concept: 'Myth Busting' },
  { brand: 'Juun', src: '/ads/juun/12.webp', concept: 'Myth Busting' },
  { brand: 'Juun', src: '/ads/juun/13.webp', concept: 'UGC / Testimonial' },
  { brand: 'Juun', src: '/ads/juun/14.webp', concept: 'Benefits / Features' },
  { brand: 'Juun', src: '/ads/juun/15.webp', concept: 'UGC / Testimonial' },
  { brand: 'Juun', src: '/ads/juun/16.webp', concept: 'UGC / Testimonial' },
  { brand: 'Juun', src: '/ads/juun/17.webp', concept: 'Benefits / Features' },
  { brand: 'Juun', src: '/ads/juun/18.webp', concept: 'Benefits / Features' },
]
