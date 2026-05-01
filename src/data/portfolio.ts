export type Category = 'animated' | 'ugc' | 'product'
export type GridLayout = '5-col' | '4-col' | '3-col' | '2-col'

export interface VideoItem {
  id: string
  category: Category
  videoUrl: string
  poster?: string
  label: string
}

export interface Section {
  id: string
  number: string
  title: string
  description: string
  gridLayout: GridLayout
  items: VideoItem[]
}

// ── helpers ───────────────────────────────────────────────────────────────────
function makeVideos(category: Category, folder: string, count: number): VideoItem[] {
  return Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(2, '0')
    return {
      id: `${category}-${n}`,
      category,
      videoUrl: `/videos/${folder}/${n}.mp4`,
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
    description: 'Cinematic, motion-rich ads generated entirely with AI.',
    gridLayout: '5-col',
    items: makeVideos('animated', 'animated', 20).map((v) =>
      v.id === 'animated-13' ? { ...v, poster: '/videos/animated/13-poster.webp' } : v
    ),
  },
  {
    id: 'ugc-ads',
    number: '02',
    title: 'AI UGC Ads',
    description: 'Authentic-feel user-generated content — zero filming needed.',
    gridLayout: '4-col',
    items: makeVideos('ugc', 'ugc', 10),
  },
  {
    id: 'product-ads',
    number: '03',
    title: 'AI Product Ads',
    description: 'High-quality product showcases built from a single photo.',
    gridLayout: '2-col',
    items: makeVideos('product', 'product', 4),
  },
]
