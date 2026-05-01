# Fusion Portfolio Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dark, animated single-page portfolio landing page for Fusion (Monika & Tomas) showcasing 12 AI video works across 4 categories, with Framer Motion scroll animations, 3D tilt video cards, and a lightbox modal.

**Architecture:** Vite + React + TypeScript SPA. All animation constants centralised in `src/lib/animations.ts`. Data in `src/data/portfolio.ts`. Two custom hooks (`useTilt`, `useParallax`) encapsulate Framer Motion motion values. Components are single-responsibility; `App.tsx` composes them in order.

**Tech Stack:** React 18, Vite 5, TypeScript 5, Tailwind CSS v4, Framer Motion (`motion/react` v11), Lenis (smooth scroll), Vitest + Testing Library

---

## File Map

| File | Responsibility |
|------|---------------|
| `src/lib/animations.ts` | All named animation constants, variants, transition presets |
| `src/data/portfolio.ts` | `VideoItem[]` and `Section[]` data, Canva thumbnail URLs |
| `src/hooks/useTilt.ts` | 3D tilt motion values from cursor position |
| `src/hooks/useParallax.ts` | Scroll-linked parallax offset for a ref |
| `src/components/Nav.tsx` | Fixed nav, active section highlighting |
| `src/components/Hero.tsx` | Full-screen hero, word-by-word reveal |
| `src/components/ToolsMarquee.tsx` | Infinite scrolling tools strip |
| `src/components/VideoCard.tsx` | Thumbnail card with tilt + shine, click handler |
| `src/components/VideoLightbox.tsx` | AnimatePresence modal, backdrop, close |
| `src/components/PortfolioSection.tsx` | Section header + grid + parallax ghost text |
| `src/components/CtaSection.tsx` | Breathing glow, pulse CTA button |
| `src/components/Footer.tsx` | Minimal footer |
| `src/App.tsx` | Lenis init, MotionConfig, section assembly |
| `src/index.css` | Tailwind base, CSS custom properties, marquee keyframe |
| `src/main.tsx` | React root mount |

---

## Task 1: Scaffold project

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `index.html`, `src/main.tsx`, `src/index.css`

- [ ] **Step 1: Initialise Vite project**

```bash
cd /Users/tomasdimitrov/fusion-ai-portfolio
npm create vite@latest . -- --template react-ts
```

- [ ] **Step 2: Install dependencies**

```bash
npm install motion lenis
npm install -D tailwindcss @tailwindcss/vite vitest @testing-library/react @testing-library/jest-dom @vitejs/plugin-react jsdom
```

- [ ] **Step 3: Configure Vite**

Replace `vite.config.ts`:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    globals: true,
  },
})
```

- [ ] **Step 4: Create test setup file**

`src/test-setup.ts`:
```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 5: Set up Tailwind CSS**

Replace `src/index.css`:
```css
@import "tailwindcss";

@layer base {
  :root {
    --color-bg: #0D0E14;
    --color-surface: #191B26;
    --color-red: #B01020;
    --color-red-accent: #E01020;
  }

  html { scroll-behavior: auto; } /* Lenis handles smooth scroll */
  body { background: var(--color-bg); color: #fff; font-family: system-ui, sans-serif; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.animate-marquee {
  animation: marquee var(--marquee-duration, 18s) linear infinite;
}
.animate-marquee:hover { animation-play-state: paused; }

@media (prefers-reduced-motion: reduce) {
  .animate-marquee { animation: none; }
}
```

- [ ] **Step 6: Verify dev server starts**

```bash
npm run dev
```
Expected: Vite server running at `http://localhost:5173`

- [ ] **Step 7: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Vite + React + Tailwind + Framer Motion project"
```

---

## Task 2: Animation constants + portfolio data

**Files:**
- Create: `src/lib/animations.ts`
- Create: `src/data/portfolio.ts`
- Create: `src/lib/animations.test.ts`

- [ ] **Step 1: Write failing test**

`src/lib/animations.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import {
  HERO_STAGGER_S,
  HERO_SLIDE_DURATION_S,
  CARD_STAGGER_S,
  CARD_REVEAL_DURATION_S,
  TILT_MAX_DEG,
  MARQUEE_DURATION_S,
  heroContainerVariants,
  heroItemVariants,
  cardContainerVariants,
  cardItemVariants,
} from './animations'

describe('animation constants', () => {
  it('exports positive numeric constants', () => {
    expect(HERO_STAGGER_S).toBeGreaterThan(0)
    expect(HERO_SLIDE_DURATION_S).toBeGreaterThan(0)
    expect(CARD_STAGGER_S).toBeGreaterThan(0)
    expect(CARD_REVEAL_DURATION_S).toBeGreaterThan(0)
    expect(TILT_MAX_DEG).toBeGreaterThan(0)
    expect(MARQUEE_DURATION_S).toBeGreaterThan(0)
  })

  it('heroContainerVariants has hidden and visible states', () => {
    expect(heroContainerVariants.hidden).toBeDefined()
    expect(heroContainerVariants.visible).toBeDefined()
  })

  it('cardItemVariants hidden state has opacity 0', () => {
    expect(cardItemVariants.hidden).toMatchObject({ opacity: 0 })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/lib/animations.test.ts
```
Expected: FAIL — `animations` not found

- [ ] **Step 3: Create `src/lib/animations.ts`**

```ts
import type { Variants } from 'motion/react'

// ── Timing constants ─────────────────────────────────────────────────────────
export const HERO_STAGGER_S = 0.15
export const HERO_SLIDE_DURATION_S = 0.7
export const HERO_EYEBROW_DURATION_S = 0.5
export const CARD_STAGGER_S = 0.08
export const CARD_REVEAL_DURATION_S = 0.5
export const TILT_MAX_DEG = 12
export const TILT_SPRING = { type: 'spring' as const, stiffness: 300, damping: 30 }
export const MARQUEE_DURATION_S = 18
export const GLOW_PULSE_DURATION_S = 2
export const CTA_RING_DURATION_S = 1.5
export const LIGHTBOX_DURATION_S = 0.25
export const LIGHTBOX_SCALE_HIDDEN = 0.95

// ── Hero variants ────────────────────────────────────────────────────────────
export const heroContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: HERO_STAGGER_S, delayChildren: 0.2 },
  },
}

export const heroItemVariants: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: HERO_SLIDE_DURATION_S,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export const heroEyebrowVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: HERO_EYEBROW_DURATION_S, ease: 'easeOut' },
  },
}

// ── Card grid variants ───────────────────────────────────────────────────────
export const cardContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: CARD_STAGGER_S },
  },
}

export const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: CARD_REVEAL_DURATION_S,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// ── Lightbox variants ────────────────────────────────────────────────────────
export const lightboxBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: LIGHTBOX_DURATION_S } },
  exit: { opacity: 0, transition: { duration: LIGHTBOX_DURATION_S } },
}

export const lightboxPanelVariants: Variants = {
  hidden: { opacity: 0, scale: LIGHTBOX_SCALE_HIDDEN },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: LIGHTBOX_DURATION_S, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: LIGHTBOX_SCALE_HIDDEN,
    transition: { duration: LIGHTBOX_DURATION_S, ease: 'easeIn' },
  },
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/lib/animations.test.ts
```
Expected: PASS (3 tests)

- [ ] **Step 5: Create `src/data/portfolio.ts`**

```ts
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
// mcp__claude_ai_Canva__get-design-pages({ design_id: "DAHG8aHFQDY" })
// and replace the URLs below.
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
```

- [ ] **Step 6: Write data test**

`src/data/portfolio.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { videoItems, sections } from './portfolio'

describe('portfolio data', () => {
  it('has 11 video items (pages 2–12)', () => {
    expect(videoItems).toHaveLength(11)
  })

  it('has 4 sections', () => {
    expect(sections).toHaveLength(4)
  })

  it('animated-ads section has 5 items', () => {
    const s = sections.find((s) => s.id === 'animated-ads')!
    expect(s.items).toHaveLength(5)
  })

  it('ugc-ads section has 4 items', () => {
    const s = sections.find((s) => s.id === 'ugc-ads')!
    expect(s.items).toHaveLength(4)
  })

  it('every item has a non-empty thumbnailUrl', () => {
    videoItems.forEach((v) => {
      expect(v.thumbnailUrl.length).toBeGreaterThan(0)
    })
  })
})
```

- [ ] **Step 7: Run all tests**

```bash
npx vitest run
```
Expected: PASS (8 tests)

- [ ] **Step 8: Commit**

```bash
git add src/lib/animations.ts src/lib/animations.test.ts src/data/portfolio.ts src/data/portfolio.test.ts
git commit -m "feat: add animation constants and portfolio data"
```

---

## Task 3: Custom hooks

**Files:**
- Create: `src/hooks/useTilt.ts`
- Create: `src/hooks/useParallax.ts`

- [ ] **Step 1: Create `src/hooks/useTilt.ts`**

```ts
import { useMotionValue, useSpring, useTransform } from 'motion/react'
import type { MouseEvent } from 'react'
import { TILT_MAX_DEG, TILT_SPRING } from '../lib/animations'

export function useTilt() {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const rotateY = useSpring(
    useTransform(rawX, [-0.5, 0.5], [-TILT_MAX_DEG, TILT_MAX_DEG]),
    TILT_SPRING,
  )
  const rotateX = useSpring(
    useTransform(rawY, [-0.5, 0.5], [TILT_MAX_DEG, -TILT_MAX_DEG]),
    TILT_SPRING,
  )

  // Shine position (0%–100%) tracks cursor
  const shineX = useTransform(rawX, [-0.5, 0.5], ['0%', '100%'])
  const shineY = useTransform(rawY, [-0.5, 0.5], ['0%', '100%'])

  function onMouseMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function onMouseLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return { rotateX, rotateY, shineX, shineY, onMouseMove, onMouseLeave }
}
```

- [ ] **Step 2: Create `src/hooks/useParallax.ts`**

```ts
import { useRef } from 'react'
import { useScroll, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'

const PARALLAX_RANGE_PX = 80

export function useParallax(): {
  ref: React.RefObject<HTMLElement | null>
  x: MotionValue<number>
} {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -PARALLAX_RANGE_PX],
  )
  return { ref, x }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useTilt.ts src/hooks/useParallax.ts
git commit -m "feat: add useTilt and useParallax hooks"
```

---

## Task 4: Nav component

**Files:**
- Create: `src/components/Nav.tsx`

- [ ] **Step 1: Create `src/components/Nav.tsx`**

```tsx
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { sections } from '../data/portfolio'

const NAV_BG = 'rgba(6,6,8,0.85)'

export function Nav() {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observers = sections.map((section) => {
      const el = document.getElementById(section.id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(section.id)
        },
        { threshold: 0.4 },
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-5 border-b border-white/5"
      style={{ background: NAV_BG, backdropFilter: 'blur(12px)' }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="text-xl font-black tracking-[0.5em] uppercase">FUSION</div>

      <div className="hidden md:flex gap-8">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="text-[10px] tracking-[3px] uppercase transition-colors duration-200"
            style={{ color: activeId === s.id ? '#fff' : 'rgba(255,255,255,0.4)' }}
          >
            {s.title}
          </button>
        ))}
      </div>

      <a
        href="mailto:hello@fusion.ai"
        className="text-[9px] font-bold tracking-[2px] uppercase px-5 py-2.5 transition-colors duration-200"
        style={{ background: '#B01020' }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#E01020')}
        onMouseLeave={(e) => (e.currentTarget.style.background = '#B01020')}
      >
        Разкажи ни →
      </a>
    </motion.nav>
  )
}
```

- [ ] **Step 2: Verify visually**

Add `<Nav />` to `src/App.tsx` temporarily and run `npm run dev`. Expected: Fixed nav bar at top, links visible.

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "feat: add Nav component with active section highlighting"
```

---

## Task 5: Hero component

**Files:**
- Create: `src/components/Hero.tsx`

- [ ] **Step 1: Create `src/components/Hero.tsx`**

```tsx
import { motion } from 'motion/react'
import { heroContainerVariants, heroItemVariants, heroEyebrowVariants } from '../lib/animations'

const HERO_LINES = ['AI', 'Creative', 'Specialists']

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-12 pt-28 pb-20 overflow-hidden">
      {/* Red radial glow */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(176,16,32,0.14) 0%, transparent 65%)',
        }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Eyebrow */}
      <motion.p
        className="text-[10px] tracking-[5px] uppercase mb-5"
        style={{ color: '#B01020' }}
        variants={heroEyebrowVariants}
        initial="hidden"
        animate="visible"
      >
        Portfolio 2026 — Monika &amp; Tomas
      </motion.p>

      {/* Headline — word-by-word slide up */}
      <motion.div
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {HERO_LINES.map((line, i) => (
          <div key={line} className="overflow-hidden">
            <motion.h1
              className="block text-[clamp(52px,8vw,96px)] font-black uppercase leading-none tracking-tight"
              style={{ color: i === 1 ? '#E01020' : '#fff' }}
              variants={heroItemVariants}
            >
              {line}
            </motion.h1>
          </div>
        ))}
      </motion.div>

      {/* Subtext */}
      <motion.p
        className="text-sm mt-7 max-w-md leading-relaxed"
        style={{ color: 'rgba(255,255,255,0.4)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        Реален растеж. Стратегия, AI и лично отношение.
        <br />
        We make AI video ads that actually perform.
      </motion.p>

      {/* CTAs */}
      <motion.div
        className="flex gap-4 mt-10 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        <button
          className="text-[10px] font-bold tracking-[3px] uppercase px-8 py-3.5 text-white transition-colors duration-200"
          style={{ background: '#B01020' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#E01020')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#B01020')}
          onClick={() => document.getElementById('animated-ads')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Виж работата ни ↓
        </button>
        <button
          className="text-[10px] tracking-[3px] uppercase px-8 py-3.5 border transition-colors duration-200"
          style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)' }}
        >
          За нас
        </button>
      </motion.div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-12 flex items-center gap-3">
        <div className="w-10 h-px" style={{ background: 'rgba(176,16,32,0.5)' }} />
        <span className="text-[9px] tracking-[3px] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
          Scroll to explore
        </span>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify visually**

```bash
npm run dev
```
Expected: Hero fills viewport, words slide up on load, red glow pulses.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: add Hero with word-by-word slide-up reveal"
```

---

## Task 6: ToolsMarquee component

**Files:**
- Create: `src/components/ToolsMarquee.tsx`

- [ ] **Step 1: Create `src/components/ToolsMarquee.tsx`**

```tsx
import { MARQUEE_DURATION_S } from '../lib/animations'

const TOOLS = ['Kling 3.0', 'VEO 3.1', 'Sora Pro', 'Nano Banana Pro', 'ElevenLabs', 'CapCut']

export function ToolsMarquee() {
  // Doubled for seamless infinite loop
  const items = [...TOOLS, ...TOOLS]

  return (
    <div
      className="overflow-hidden border-y py-4"
      style={{
        background: '#191B26',
        borderColor: 'rgba(176,16,32,0.15)',
      }}
    >
      <div
        className="flex gap-8 items-center animate-marquee w-max"
        style={{ '--marquee-duration': `${MARQUEE_DURATION_S}s` } as React.CSSProperties}
      >
        {items.map((tool, i) => (
          <span key={`${tool}-${i}`} className="flex items-center gap-8 shrink-0">
            <span
              className="text-[11px] tracking-wide"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              {tool}
            </span>
            <span
              className="w-1 h-1 rounded-full shrink-0"
              style={{ background: 'rgba(176,16,32,0.4)' }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ToolsMarquee.tsx
git commit -m "feat: add infinite ToolsMarquee strip"
```

---

## Task 7: VideoCard component

**Files:**
- Create: `src/components/VideoCard.tsx`

- [ ] **Step 1: Create `src/components/VideoCard.tsx`**

```tsx
import { motion, useMotionTemplate } from 'motion/react'
import type { VideoItem } from '../data/portfolio'
import { useTilt } from '../hooks/useTilt'

interface VideoCardProps {
  item: VideoItem
  aspectRatio?: string
  onClick: (item: VideoItem) => void
}

export function VideoCard({ item, aspectRatio = '16/9', onClick }: VideoCardProps) {
  const { rotateX, rotateY, shineX, shineY, onMouseMove, onMouseLeave } = useTilt()

  const shineBackground = useMotionTemplate`radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.1) 0%, transparent 50%)`

  return (
    <motion.div
      className="relative overflow-hidden cursor-pointer group"
      style={{
        background: '#191B26',
        border: '1px solid rgba(176,16,32,0.15)',
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: '800px',
      }}
      whileHover={{ borderColor: 'rgba(176,16,32,0.55)' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={() => onClick(item)}
    >
      {/* Thumbnail */}
      <div style={{ aspectRatio }} className="relative overflow-hidden">
        <img
          src={item.thumbnailUrl}
          alt={item.label}
          className="w-full h-full object-cover transition-[filter] duration-300 brightness-85 group-hover:brightness-100"
          loading="lazy"
        />

        {/* Shine overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: shineBackground, opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{ border: '2px solid rgba(224,16,32,0.6)' }}
            whileHover={{ background: '#B01020', borderColor: '#B01020' }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="ml-0.5"
              style={{
                width: 0,
                height: 0,
                borderStyle: 'solid',
                borderWidth: '7px 0 7px 12px',
                borderColor: 'transparent transparent transparent rgba(224,16,32,0.9)',
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Label row */}
      <div className="flex justify-between items-center px-4 py-3">
        <span
          className="text-[9px] tracking-[3px] uppercase"
          style={{ color: 'rgba(176,16,32,0.7)' }}
        >
          {item.label}
        </span>
        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 14 }}>↗</span>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/VideoCard.tsx
git commit -m "feat: add VideoCard with 3D tilt and shine effect"
```

---

## Task 8: VideoLightbox component

**Files:**
- Create: `src/components/VideoLightbox.tsx`

- [ ] **Step 1: Create `src/components/VideoLightbox.tsx`**

```tsx
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { VideoItem } from '../data/portfolio'
import {
  lightboxBackdropVariants,
  lightboxPanelVariants,
} from '../lib/animations'

interface VideoLightboxProps {
  item: VideoItem | null
  onClose: () => void
}

export function VideoLightbox({ item, onClose }: VideoLightboxProps) {
  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  // Lock body scroll while open
  useEffect(() => {
    if (item) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [item])

  return (
    <AnimatePresence mode="wait">
      {item && (
        <motion.div
          key="lightbox-backdrop"
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.88)' }}
          variants={lightboxBackdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            key={`lightbox-panel-${item.id}`}
            className="relative w-full max-w-3xl"
            style={{ background: '#191B26', border: '1px solid rgba(176,16,32,0.2)' }}
            variants={lightboxPanelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute top-3 right-4 text-xl z-10 transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.4)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>

            {/* Thumbnail */}
            <img
              src={item.thumbnailUrl}
              alt={item.label}
              className="w-full block"
              style={{ aspectRatio: '16/9', objectFit: 'cover' }}
            />

            {/* Info */}
            <div className="px-6 py-4">
              <p
                className="text-[9px] tracking-[4px] uppercase mb-1"
                style={{ color: '#B01020' }}
              >
                {item.label}
              </p>
              <p
                className="text-[10px] tracking-[2px] uppercase"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                {item.tools.join(' + ')}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/VideoLightbox.tsx
git commit -m "feat: add VideoLightbox with AnimatePresence enter/exit"
```

---

## Task 9: PortfolioSection component

**Files:**
- Create: `src/components/PortfolioSection.tsx`

- [ ] **Step 1: Create `src/components/PortfolioSection.tsx`**

```tsx
import { motion } from 'motion/react'
import type { Section, VideoItem } from '../data/portfolio'
import { VideoCard } from './VideoCard'
import { cardContainerVariants, cardItemVariants } from '../lib/animations'
import { useParallax } from '../hooks/useParallax'

interface PortfolioSectionProps {
  section: Section
  onVideoClick: (item: VideoItem) => void
}

const GRID_CLASSES: Record<Section['gridLayout'], string> = {
  '3-col': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3',
  '2-col': 'grid grid-cols-1 sm:grid-cols-2 gap-3',
  'wide-single': 'max-w-3xl',
  split: 'grid grid-cols-1 lg:grid-cols-2 gap-16 items-center',
}

export function PortfolioSection({ section, onVideoClick }: PortfolioSectionProps) {
  const { ref, x } = useParallax()

  const isSplit = section.gridLayout === 'split'
  const isWideSingle = section.gridLayout === 'wide-single'

  return (
    <section
      id={section.id}
      ref={ref as React.RefObject<HTMLElement>}
      className="relative px-12 py-24 overflow-hidden border-t"
      style={{ borderColor: 'rgba(255,255,255,0.04)' }}
    >
      {/* Parallax ghost text */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 pointer-events-none select-none whitespace-nowrap"
        style={{
          x,
          fontSize: 'clamp(80px,14vw,160px)',
          fontWeight: 900,
          textTransform: 'uppercase',
          color: 'rgba(176,16,32,0.04)',
          letterSpacing: '-4px',
          left: '-5%',
          zIndex: 0,
        }}
      >
        {['FUSION', 'FUSION', 'FUSION'].join('  ')}
      </motion.div>

      <div className="relative z-10">
        {/* Section meta */}
        <div className="flex items-center gap-4 mb-4">
          <span
            className="text-[11px] font-bold tracking-[3px]"
            style={{ color: 'rgba(176,16,32,0.6)' }}
          >
            {section.number}
          </span>
          <div
            className="w-10 h-px"
            style={{ background: 'rgba(176,16,32,0.2)' }}
          />
        </div>

        <h2
          className="text-[clamp(28px,4vw,48px)] font-black uppercase leading-none tracking-tight mb-3"
          style={{ color: '#fff' }}
        >
          {section.title}
        </h2>

        <p
          className="text-[9px] tracking-[3px] uppercase mb-12"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          {section.tools.map((t, i) => (
            <span key={t}>
              <span style={{ color: 'rgba(176,16,32,0.7)' }}>{t}</span>
              {i < section.tools.length - 1 && ' + '}
            </span>
          ))}
        </p>

        {/* Split layout (section 04) */}
        {isSplit ? (
          <div className={GRID_CLASSES.split}>
            <div>
              <p
                className="text-sm leading-relaxed max-w-sm"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                Send us a photo. We turn it into a high-quality video ad.
                <br />
                No filming. No studio. Just results.
              </p>
            </div>
            <VideoCard item={section.items[0]} onClick={onVideoClick} />
          </div>
        ) : (
          /* Standard grid */
          <motion.div
            className={GRID_CLASSES[section.gridLayout]}
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {section.items.map((item) => (
              <motion.div key={item.id} variants={cardItemVariants}>
                <VideoCard
                  item={item}
                  aspectRatio={isWideSingle ? '21/9' : '16/9'}
                  onClick={onVideoClick}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/PortfolioSection.tsx
git commit -m "feat: add PortfolioSection with parallax ghost text and stagger reveal"
```

---

## Task 10: CtaSection + Footer

**Files:**
- Create: `src/components/CtaSection.tsx`
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Create `src/components/CtaSection.tsx`**

```tsx
import { motion } from 'motion/react'
import { GLOW_PULSE_DURATION_S, CTA_RING_DURATION_S } from '../lib/animations'

export function CtaSection() {
  return (
    <section
      className="relative px-12 py-24 text-center overflow-hidden border-t"
      style={{ background: '#191B26', borderColor: 'rgba(176,16,32,0.2)' }}
    >
      {/* Breathing glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(176,16,32,0.12) 0%, transparent 65%)',
        }}
        animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: GLOW_PULSE_DURATION_S, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10">
        <p
          className="text-[9px] tracking-[5px] uppercase mb-5"
          style={{ color: '#B01020' }}
        >
          Работим само с избрани клиенти
        </p>

        <h2
          className="text-[clamp(32px,5vw,64px)] font-black uppercase leading-none tracking-tight mb-5"
          style={{ color: '#fff' }}
        >
          Реален
          <br />
          <span style={{ color: '#E01020' }}>растеж</span>
        </h2>

        <p
          className="text-sm max-w-sm mx-auto mb-10 leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          Мислим преди да действаме.
          <br />
          Без компромис с качеството.
        </p>

        <motion.a
          href="mailto:hello@fusion.ai"
          className="inline-block text-[11px] font-bold tracking-[3px] uppercase px-12 py-4 text-white"
          style={{ background: '#B01020' }}
          animate={{
            boxShadow: [
              '0 0 0 0px rgba(176,16,32,0.5)',
              '0 0 0 14px rgba(176,16,32,0)',
            ],
          }}
          transition={{
            duration: CTA_RING_DURATION_S,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          whileHover={{ background: '#E01020' }}
        >
          Разкажи ни за бизнеса ти →
        </motion.a>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/components/Footer.tsx`**

```tsx
export function Footer() {
  return (
    <footer
      className="flex justify-between items-center px-12 py-8 border-t"
      style={{ background: '#060608', borderColor: 'rgba(255,255,255,0.04)' }}
    >
      <span
        className="text-sm font-black tracking-[6px] uppercase"
        style={{ color: 'rgba(255,255,255,0.3)' }}
      >
        FUSION
      </span>
      <span
        className="text-[10px] tracking-wide"
        style={{ color: 'rgba(255,255,255,0.15)' }}
      >
        © 2026 Monika &amp; Tomas — Fusion AI Creative
      </span>
    </footer>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/CtaSection.tsx src/components/Footer.tsx
git commit -m "feat: add CtaSection with breathing glow and Footer"
```

---

## Task 11: Assemble App + Lenis smooth scroll

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/main.tsx`

- [ ] **Step 1: Write `src/App.tsx`**

```tsx
import { useState, useEffect } from 'react'
import { MotionConfig } from 'motion/react'
import Lenis from 'lenis'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { ToolsMarquee } from './components/ToolsMarquee'
import { PortfolioSection } from './components/PortfolioSection'
import { CtaSection } from './components/CtaSection'
import { Footer } from './components/Footer'
import { VideoLightbox } from './components/VideoLightbox'
import { sections } from './data/portfolio'
import type { VideoItem } from './data/portfolio'

export default function App() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null)

  // Initialise Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div style={{ background: '#0D0E14', minHeight: '100vh' }}>
        <Nav />
        <Hero />
        <ToolsMarquee />
        {sections.map((section) => (
          <PortfolioSection
            key={section.id}
            section={section}
            onVideoClick={setActiveVideo}
          />
        ))}
        <CtaSection />
        <Footer />
        <VideoLightbox item={activeVideo} onClose={() => setActiveVideo(null)} />
      </div>
    </MotionConfig>
  )
}
```

- [ ] **Step 2: Write `src/main.tsx`**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 3: Run full test suite**

```bash
npx vitest run
```
Expected: PASS (all tests green)

- [ ] **Step 4: Run dev server and verify full page**

```bash
npm run dev
```

Verify checklist:
- [ ] Nav fixed at top, links scroll to correct sections
- [ ] Hero words slide up on load
- [ ] Tools marquee scrolls continuously
- [ ] All 4 portfolio sections render with thumbnails
- [ ] Video cards tilt on hover with red shine
- [ ] Cards stagger in on scroll
- [ ] Ghost "FUSION" text drifts behind section headers
- [ ] Clicking a video card opens lightbox
- [ ] Lightbox closes on backdrop click, × button, and Escape key
- [ ] CTA section glow breathes, button pulses
- [ ] Responsive at 375px, 768px, 1280px

- [ ] **Step 5: Build for production**

```bash
npm run build
npm run preview
```
Expected: Production build serves at `http://localhost:4173` with no console errors.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat: assemble full Fusion portfolio landing page"
```

---

## Out of Scope

- Real video playback (thumbnails only — swap URLs when hosting real videos)
- Contact form backend
- Analytics / tracking
- CMS or headless backend
- Mobile hamburger nav (nav links hidden on `< md`, CTA visible)

---

## Known Limitations

- Canva thumbnail URLs expire after ~24h. To refresh: run `mcp__claude_ai_Canva__get-design-pages({ design_id: "DAHG8aHFQDY" })` and update URL params in `src/data/portfolio.ts`
- `mailto:` link on CTA and Nav is a placeholder — replace with real contact URL or form
