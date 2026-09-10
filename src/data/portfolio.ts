export type Category = 'animated' | 'ugc' | 'product'
export type GridLayout = '5-col' | '4-col' | '3-col' | '2-col'

export interface VideoItem {
  id: string
  category: Category
  videoUrl: string
  poster?: string
  label: string
  sub?: string
}

export interface Section {
  id: string
  number: string
  title: string
  description: string
  gridLayout: GridLayout
  items: VideoItem[]
  subcategories?: string[]
}

const CDN = 'https://fusion-creative-assets.b-cdn.net'

// ── subcategories (video number → style) ─────────────────────────────────────
// Order of keys = order of the filter chips.
const ANIMATED_SUBS: Record<string, number[]> = {
  'Talking Products': [4, 6, 8, 9, 10, 12, 13, 14, 16, 17, 18, 22, 27, 28, 29, 35, 46, 48, 49, 64],
  'Ingredients & Body': [2, 3, 5, 19, 20, 24, 25, 26, 31, 32, 36, 37, 38, 47, 56, 57, 59, 63, 65],
  'Story-Driven': [1, 7, 15, 21, 23, 33, 34, 39, 40, 41, 42, 43, 44, 45, 55, 58, 69, 70],
  'Clay & Stop-Motion': [60, 61, 62, 66, 67, 68],
  '2D Videos': [11, 30, 71],
  'Cinematic Premium': [50, 51, 52, 53, 54],
}

const UGC_SUBS: Record<string, number[]> = {
  Testimonials: [3, 8, 10, 12, 15, 28, 29, 30],
  'Expert / Doctor': [16, 17, 18, 21, 23],
  'Skits & TV Formats': [2, 7, 19, 20, 22, 24, 25, 26, 27],
  'Lifestyle & Product': [1, 4, 5, 6, 9, 11, 13, 14],
}

// ── helpers ───────────────────────────────────────────────────────────────────
function assignSubs(items: VideoItem[], groups: Record<string, number[]>): VideoItem[] {
  const subByNumber = new Map<number, string>()
  for (const [sub, numbers] of Object.entries(groups)) numbers.forEach((n) => subByNumber.set(n, sub))
  return items.map((v, i) => ({ ...v, sub: subByNumber.get(i + 1) }))
}

function makeVideos(category: Category, folder: string, count: number): VideoItem[] {
  return Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(2, '0')
    return {
      id: `${category}-${n}`,
      category,
      videoUrl: `${CDN}/${folder}/${n}.mp4`,
      poster: `${CDN}/${folder}/${n}-poster.webp`,
      label: `${n}`,
    }
  })
}

// ── sections ──────────────────────────────────────────────────────────────────
export const sections: Section[] = [
  {
    id: 'animated-ads',
    number: '01',
    title: 'AI Animated Ads',
    description: 'Кинематографични, динамични реклами — създадени изцяло с AI.',
    gridLayout: '5-col',
    items: assignSubs(makeVideos('animated', 'animated', 71).map((v) => {
      if (v.id === 'animated-13') return { ...v, poster: `${CDN}/animated/13-poster.webp` }
      if (v.id === 'animated-31') return { ...v, poster: `${CDN}/animated/31-poster.webp` }
      if (v.id === 'animated-32') return { ...v, poster: `${CDN}/animated/32-poster.webp` }
      if (v.id === 'animated-33') return { ...v, poster: `${CDN}/animated/33-poster.webp` }
      if (v.id === 'animated-34') return { ...v, poster: `${CDN}/animated/34-poster.webp` }
      if (v.id === 'animated-35') return { ...v, poster: `${CDN}/animated/35-poster.webp` }
      return v
    }), ANIMATED_SUBS),
    subcategories: Object.keys(ANIMATED_SUBS),
  },
  {
    id: 'ugc-ads',
    number: '02',
    title: 'AI UGC Ads',
    description: 'Реклами с усещане за истинско съдържание от потребители — без заснемане.',
    gridLayout: '4-col',
    items: assignSubs(makeVideos('ugc', 'ugc', 30), UGC_SUBS),
    subcategories: Object.keys(UGC_SUBS),
  },
  {
    id: 'product-ads',
    number: '03',
    title: 'AI Product Ads',
    description: 'Висококачествени продуктови реклами, създадени от една-единствена снимка.',
    gridLayout: '2-col',
    items: makeVideos('product', 'product', 4),
  },
]
