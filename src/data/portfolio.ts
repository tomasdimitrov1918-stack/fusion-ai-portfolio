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

const CDN = 'https://fusion-creative-assets.b-cdn.net'

// ── helpers ───────────────────────────────────────────────────────────────────
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
    items: makeVideos('animated', 'animated', 38).map((v) => {
      if (v.id === 'animated-13') return { ...v, poster: `${CDN}/animated/13-poster.webp` }
      if (v.id === 'animated-31') return { ...v, poster: `${CDN}/animated/31-poster.webp` }
      if (v.id === 'animated-32') return { ...v, poster: `${CDN}/animated/32-poster.webp` }
      if (v.id === 'animated-33') return { ...v, poster: `${CDN}/animated/33-poster.webp` }
      if (v.id === 'animated-34') return { ...v, poster: `${CDN}/animated/34-poster.webp` }
      if (v.id === 'animated-35') return { ...v, poster: `${CDN}/animated/35-poster.webp` }
      return v
    }),
  },
  {
    id: 'ugc-ads',
    number: '02',
    title: 'AI UGC Ads',
    description: 'Реклами с усещане за истинско съдържание от потребители — без заснемане.',
    gridLayout: '4-col',
    items: makeVideos('ugc', 'ugc', 13),
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
