# Fusion AI Portfolio — Project Context

## What this project is
A portfolio landing page for **Fusion** — Monika & Tomas, AI Creative Specialists.
Dark cinematic aesthetic. Built with React 18 + Vite 5 + TypeScript + Tailwind CSS v4 + Framer Motion (`motion/react` v11).

## Dev server
```bash
npx vite --port 5174
```
Access at http://localhost:5174

## Tech stack
- **React 18 + Vite 5 + TypeScript 5**
- **Tailwind CSS v4** — `@import "tailwindcss"` syntax, no config file
- **Framer Motion v11** — import from `motion/react` (NOT `framer-motion`)
- **Lenis** — smooth scroll (duration 1.2)
- **Vitest + @testing-library/react** — run tests with `npx vitest run`
- **sharp** (devDependency) — used for image conversion scripts

## Brand
- Background: `#0D0E14`
- Surface: `#191B26`
- Primary red: `#B01020`
- Accent red: `#E01020`
- Font: system-ui
- All text uppercase, tight tracking

## Project structure
```
src/
  App.tsx                  — Lenis init, MotionConfig, global layout
  components/
    Background.tsx         — NoiseOverlay (SVG feTurbulence) + FloatingDots (fixed, site-wide)
    Hero.tsx               — Full-screen cinematic hero, letter-by-letter blur reveal
    Nav.tsx                — Fixed nav with logo + section links + CTA
    ToolsMarquee.tsx       — Infinite marquee of AI tools
    PortfolioSection.tsx   — Section wrapper with parallax ghost text + video grid
    VideoCard.tsx          — 9:16 video card, autoplay muted on hover, tilt+shine effect
    VideoLightbox.tsx      — Modal with video player (sound + controls)
    CtaSection.tsx         — Breathing glow CTA section
    Footer.tsx             — Logo + copyright
  data/
    portfolio.ts           — 3 sections, 34 videos, VideoItem/Section types
  hooks/
    useTilt.ts             — 3D tilt + shine for VideoCard
    useParallax.ts         — Scroll parallax for section ghost text
  lib/
    animations.ts          — All named constants + Framer Motion variants
public/
  logo.webp                — Fusion Creative logo (transparent bg, 500x200)
  founders.webp            — Monika & Tomas photo (570x760, used in hero bg)
  videos/
    animated/01-20.mp4     — 20 AI Animated Ads
    animated/13-poster.webp — Custom poster for video 13 (first frame was black)
    ugc/01-10.mp4          — 10 AI UGC Ads
    product/01-04.mp4      — 4 AI Product Ads
```

## Portfolio sections
| # | ID | Title | Videos | Grid |
|---|-----|-------|---------|------|
| 01 | animated-ads | AI Animated Ads | 20 | 5-col |
| 02 | ugc-ads | AI UGC Ads | 10 | 4-col |
| 03 | product-ads | AI Product Ads | 4 | 2-col |

## Hero section features
- Letter-by-letter blur reveal: AI / Creative (red) / Specialists
- Founders image (`/founders.webp`) — full-height, behind text (z-index 2), radial mask to fade edges, slow float animation
- 3 breathing red glow orbs
- SVG noise + 50 floating red dots (site-wide, fixed)
- Animated horizontal beam
- Stats bar at bottom: 50+ клиента · 200+ видеа · 6 AI инструмента · Реален растеж
- Shimmer CTA button

## Tools marquee
Tools: Kling 3.0, VEO 3.1, Sora Pro, Nano Banana Pro, ElevenLabs, CapCut, Seedance 2.0, ChatGPT Image 2.0

## Key conventions
- Named exports only (no default exports except App)
- All animation timing values as named constants in `lib/animations.ts`
- Import from `motion/react` — never `framer-motion`
- `import type` for type-only imports
- Images → `public/` folder, convert to WebP with sharp
- Videos → `public/videos/{category}/NN.mp4` (zero-padded)
- To add a custom video poster: generate with `qlmanage -t -s 600`, convert with sharp, add `poster` field to VideoItem in portfolio.ts

## If videos show black thumbnails
Run: `qlmanage -t -s 600 -o /tmp/ "public/videos/{category}/NN.mp4"` then convert `/tmp/NN.mp4.png` to webp with sharp and set `poster` on the VideoItem.

## Installed plugins / MCP
- Magic MCP (`@21st-dev/magic`) — API_KEY configured in user scope
- Vercel plugin — installed, may need Claude restart to activate
- Canva MCP — design ID `DAHG8aHFQDY` (thumbnails expire ~24h)

## What's left / ideas
- Deploy to Vercel (plugin installed, ready to use)
- CTA section copy/design review
- Contact form or mailto link
- Mobile nav (hamburger menu)
- SEO / meta tags
