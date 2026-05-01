# Fusion AI Creative — Portfolio Landing Page Design

**Date:** 2026-05-01  
**Project:** fusion-ai-portfolio  
**Creators:** Monika & Tomas  
**Brand:** Fusion

---

## Overview

A single-page portfolio landing page for Fusion — an AI creative agency specialising in AI video ads. The page showcases 12 works from their Canva portfolio across 4 categories, with scroll-driven animations, 3D tilt interactions, and a lightbox modal for video previews. Content is currently placeholder (Canva thumbnails); real video links will be swapped in later.

---

## Brand Tokens

| Token | Value |
|-------|-------|
| Background | `#0D0E14` |
| Secondary surface | `#191B26` |
| Primary red | `#B01020` |
| Accent red (hover/CTA) | `#E01020` |
| White text | `#FFFFFF` |
| Muted text | `rgba(255,255,255,0.4)` |
| Border subtle | `rgba(255,255,255,0.06)` |
| Border red | `rgba(176,16,32,0.2)` |

**Typography:** Bold condensed sans-serif (Inter or system-ui), uppercase headlines, tight tracking on display sizes. White primary, red for emphasis.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React + Vite (TypeScript) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion (`motion/react` v11+) |
| Smooth scroll | Lenis |
| Build | Vite |

---

## Page Structure

### 1. Navigation (fixed, `position: fixed`)

- Left: `FUSION` wordmark, bold, 8px letter-spacing
- Centre: section links — AI Animated Ads / AI UGC Ads / Clothing / From Photos
- Right: `Разкажи ни →` CTA button (`#B01020`, hover → `#E01020`)
- Background: `rgba(6,6,8,0.85)` with `backdrop-filter: blur(12px)`
- Border-bottom: `rgba(255,255,255,0.05)`
- Active section highlighted via `IntersectionObserver` as user scrolls

### 2. Hero Section

- Full viewport height (`100vh`)
- Eyebrow: `Portfolio 2026 — Monika & Tomas` (red, 10px, 5px letter-spacing)
- Headline: `AI / Creative / Specialists` — three lines, each word/line slides up from a clip mask on load with 150ms stagger between lines (Framer Motion `variants` + `staggerChildren`)
- Subtext: `Реален растеж. Стратегия, AI и лично отношение.` — fades in after headline
- Two CTAs: `Виж работата ни ↓` (red filled) + `За нас` (ghost border)
- Background: red radial glow at top-right, breathing pulse animation
- Scroll hint: thin red line + `Scroll to explore` label, bottom-left

### 3. Tools Marquee Strip

- `#191B26` background, red top/bottom borders
- Continuous left-scroll marquee: Kling 3.0 · VEO 3.1 · Sora Pro · Nano Banana Pro · ElevenLabs · CapCut
- Infinite loop, slows on hover, pauses for `prefers-reduced-motion`
- Separator dots `rgba(176,16,32,0.4)` between items

### 4. Portfolio Sections (× 4)

Each section follows the same structure:

```
[Section number] [red line]
[Giant ghost text drifting behind — FUSION at 5% opacity, animated left]
[Section title — bold uppercase]
[Tools used — tiny red-highlighted labels]
[Video grid]
```

**Section 01 — AI Animated Ads**
- 5 video cards
- Grid: 3-column on desktop, 2-column on tablet, 1-column mobile
- Source: Canva pages 2–6

**Section 02 — AI UGC Ads**
- 4 video cards
- Grid: 2-column on desktop, 1-column mobile
- Source: Canva pages 7–10

**Section 03 — AI Videos for Clothing**
- 1 video card, wide cinematic format (21:9 aspect ratio)
- Source: Canva page 11

**Section 04 — AI Videos Only from Photos**
- Split layout: text/description left, video card right
- Source: Canva page 12
- Body copy: "Send us a photo. We turn it into a high-quality video ad."

### 5. CTA Section

- `#191B26` background
- Radial red glow, breathing scale animation (0.95→1.05, 2s loop)
- Noise texture overlay (SVG feTurbulence, 3% opacity) for premium texture
- Eyebrow: `Работим само с избрани клиенти`
- Headline: `Реален / растеж` (two lines, red on second)
- Subtext: `Мислим преди да действаме. Без компромис с качеството.`
- CTA button: `Разкажи ни за бизнеса ти →` with ring-expand pulse animation

### 6. Footer

- `#060608` background, top border `rgba(255,255,255,0.04)`
- Left: `FUSION` muted wordmark
- Right: `© 2026 Monika & Tomas — Fusion AI Creative`

---

## Motion Effects

All animations respect `prefers-reduced-motion` via `<MotionConfig reducedMotion="user">` wrapping the app root.

### Named Animation Constants (required)

```ts
const HERO_STAGGER_S = 0.15
const HERO_SLIDE_DURATION_S = 0.7
const CARD_STAGGER_S = 0.08
const CARD_REVEAL_DURATION_S = 0.5
const TILT_MAX_DEG = 12
const TILT_SPRING = { stiffness: 300, damping: 30 }
const MARQUEE_DURATION_S = 18
const GLOW_PULSE_DURATION_S = 2
const CTA_RING_DURATION_S = 1.5
```

### Effect 1 — Hero Word Reveal

Each headline line wrapped in an overflow-hidden container. Inner `motion.span` animates from `translateY(100%) opacity(0)` → `translateY(0) opacity(1)`. Parent uses `staggerChildren: HERO_STAGGER_S`. Eyebrow fades up 200ms before headline.

### Effect 2 — Parallax Ghost Text

`useScroll` + `useTransform` on each section ref. Giant brand name (`FUSION`) at `4%` opacity drifts horizontally at `0.3×` scroll speed relative to section. Implemented with `useParallax` custom hook wrapping `useScroll({ target: ref, offset: ["start end", "end start"] })`.

### Effect 3 — 3D Tilt + Shine on Video Cards

`useMotionValue` for `x` and `y` cursor position. `useSpring` with `TILT_SPRING` applied to `rotateX`/`rotateY` (max `±TILT_MAX_DEG`). Shine overlay: `motion.div` with `radial-gradient` whose centre tracks cursor position via `useTransform`. Resets spring to 0 on `onMouseLeave`.

### Effect 4 — Staggered Scroll Reveal

Each video grid wrapped in a `motion.div` with `whileInView` variants. Cards use `itemVariants` with `hidden: { opacity: 0, y: 20, scale: 0.97 }` → `visible: { opacity: 1, y: 0, scale: 1 }`. Container uses `staggerChildren: CARD_STAGGER_S`. `viewport={{ once: true, margin: "-80px" }}`.

### Effect 5 — Infinite Marquee

Two identical spans concatenated inside a flex container. CSS animation `translateX(-50%)` with `MARQUEE_DURATION_S` duration, linear, infinite. Pauses on hover via `animation-play-state: paused`. JS fallback via Framer Motion `useAnimationControls` for reduced-motion.

### Effect 6 — Breathing Glow + CTA Pulse

Glow: `motion.div` with `animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.6, 1, 0.6] }}` looping. CTA button: box-shadow ring expand via `animate={{ boxShadow: ["0 0 0 0px rgba(176,16,32,0.4)", "0 0 0 14px rgba(176,16,32,0)"] }}` repeating every `CTA_RING_DURATION_S`.

---

## Lightbox Modal

Triggered by clicking any video card. Implemented with `AnimatePresence` + `motion.div`.

**Behaviour:**
- Backdrop: `rgba(0,0,0,0.85)` fades in, click to dismiss
- Modal: scales from `0.95` → `1`, fades in. Reverse on exit.
- Content: 16:9 thumbnail image (full-width), category label, tools used, `×` close button
- `key` prop: video card index (unique)
- Trap focus while open, `Escape` key closes

**AnimatePresence mode:** `mode="wait"`

---

## Data Model

```ts
interface VideoItem {
  id: number           // Canva page index (1–12)
  category: Category
  thumbnailUrl: string // Canva export thumbnail URL
  tools: string[]
  label: string        // e.g. "AI Animated Ad"
}

type Category =
  | "animated-ads"
  | "ugc-ads"
  | "clothing"
  | "from-photos"

interface Section {
  id: Category
  number: string        // "01" | "02" | "03" | "04"
  title: string
  tools: string[]
  gridLayout: "3-col" | "2-col" | "wide-single" | "split"
  items: VideoItem[]
}
```

---

## Responsive Breakpoints

| Breakpoint | Grid |
|------------|------|
| `< 640px` | 1 column, nav collapses to hamburger |
| `640–1024px` | 2 columns, split section stacks |
| `> 1024px` | Full desktop layout as designed |

---

## File Structure

```
src/
  components/
    Nav.tsx
    Hero.tsx
    ToolsMarquee.tsx
    PortfolioSection.tsx
    VideoCard.tsx
    VideoLightbox.tsx
    CtaSection.tsx
    Footer.tsx
  hooks/
    useParallax.ts
    useTilt.ts
  data/
    portfolio.ts        # VideoItem[] data, thumbnail URLs
  lib/
    animations.ts       # All named animation constants + variants
  App.tsx
  main.tsx
```

---

## Out of Scope

- Real video playback (thumbnails only for now)
- Contact form backend
- Analytics
- Multi-language (Bulgarian text is hardcoded as-is)
- CMS or headless backend

---

## Success Criteria

1. All 12 Canva thumbnails visible, organised across 4 sections
2. All 6 motion effects implemented and GPU-smooth (60fps)
3. Lightbox opens/closes with AnimatePresence transitions
4. Nav highlights active section on scroll
5. Fully responsive down to 375px mobile
6. `prefers-reduced-motion` respected throughout
