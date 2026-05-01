export type Category = 'animated-ads' | 'ugc-ads' | 'clothing' | 'from-photos'

export interface VideoItem {
  id: number
  category: Category
  thumbnailUrl: string
  tools: string[]
  label: string
}

export interface Section {
  id: Category
  number: string
  title: string
  tools: string[]
  gridLayout: '3-col' | '2-col' | 'wide-single' | 'split'
  items: VideoItem[]
}

// NOTE: Canva thumbnail URLs expire (~24h). Refresh via Canva MCP:
// get-design-pages({ design_id: "DAHG8aHFQDY" }) and replace URL params.
const CANVA_BASE = 'https://document-export.canva.com/HFQDY/DAHG8aHFQDY'

export const videoItems: VideoItem[] = [
  {
    id: 2,
    category: 'animated-ads',
    thumbnailUrl: `${CANVA_BASE}/4/thumbnail/0002.png`,
    tools: ['Nano Banana Pro', 'Kling 3.0'],
    label: 'AI Animated Ad',
  },
  {
    id: 3,
    category: 'animated-ads',
    thumbnailUrl: `${CANVA_BASE}/11/thumbnail/0003.png`,
    tools: ['Nano Banana Pro', 'Kling 3.0'],
    label: 'AI Animated Ad',
  },
  {
    id: 4,
    category: 'animated-ads',
    thumbnailUrl: `${CANVA_BASE}/4/thumbnail/0004.png`,
    tools: ['Nano Banana Pro', 'Kling 3.0'],
    label: 'AI Animated Ad',
  },
  {
    id: 5,
    category: 'animated-ads',
    thumbnailUrl: `${CANVA_BASE}/11/thumbnail/0005.png`,
    tools: ['Nano Banana Pro', 'Kling 3.0'],
    label: 'AI Animated Ad',
  },
  {
    id: 6,
    category: 'animated-ads',
    thumbnailUrl: `${CANVA_BASE}/11/thumbnail/0006.png`,
    tools: ['Nano Banana Pro', 'Kling 3.0'],
    label: 'AI Animated Ad',
  },
  {
    id: 7,
    category: 'ugc-ads',
    thumbnailUrl: `${CANVA_BASE}/13/thumbnail/0007.png`,
    tools: ['Nano Banana Pro', 'Kling 3.0'],
    label: 'AI UGC Ad',
  },
  {
    id: 8,
    category: 'ugc-ads',
    thumbnailUrl: `${CANVA_BASE}/13/thumbnail/0008.png`,
    tools: ['Nano Banana Pro', 'Kling 3.0'],
    label: 'AI UGC Ad',
  },
  {
    id: 9,
    category: 'ugc-ads',
    thumbnailUrl: `${CANVA_BASE}/4/thumbnail/0006.png`,
    tools: ['Nano Banana Pro', 'Kling 3.0', 'Sora Pro'],
    label: 'AI UGC Ad',
  },
  {
    id: 10,
    category: 'ugc-ads',
    thumbnailUrl: `${CANVA_BASE}/4/thumbnail/0007.png`,
    tools: ['Nano Banana Pro', 'VEO 3.1'],
    label: 'AI UGC Ad',
  },
  {
    id: 11,
    category: 'clothing',
    thumbnailUrl: `${CANVA_BASE}/3/thumbnail/0008.png`,
    tools: ['Nano Banana Pro', 'VEO 3.1'],
    label: 'AI Clothing Video',
  },
  {
    id: 12,
    category: 'from-photos',
    thumbnailUrl: `${CANVA_BASE}/3/thumbnail/0009.png`,
    tools: ['Nano Banana Pro', 'Kling 3.0'],
    label: 'AI Video from Photos',
  },
]

export const sections: Section[] = [
  {
    id: 'animated-ads',
    number: '01',
    title: 'AI Animated Ads',
    tools: ['Nano Banana Pro', 'Kling 3.0'],
    gridLayout: '3-col',
    items: videoItems.filter((v) => v.category === 'animated-ads'),
  },
  {
    id: 'ugc-ads',
    number: '02',
    title: 'AI UGC Ads',
    tools: ['Nano Banana Pro', 'Kling 3.0', 'Sora Pro', 'VEO 3.1'],
    gridLayout: '2-col',
    items: videoItems.filter((v) => v.category === 'ugc-ads'),
  },
  {
    id: 'clothing',
    number: '03',
    title: 'AI Videos for Clothing',
    tools: ['Nano Banana Pro', 'VEO 3.1'],
    gridLayout: 'wide-single',
    items: videoItems.filter((v) => v.category === 'clothing'),
  },
  {
    id: 'from-photos',
    number: '04',
    title: 'AI Videos Only from Photos',
    tools: ['Nano Banana Pro', 'Kling 3.0'],
    gridLayout: 'split',
    items: videoItems.filter((v) => v.category === 'from-photos'),
  },
]
