# Fusion — AI Creative Portfolio

Portfolio landing page for **Fusion** (Monika & Tomas, AI Creative Specialists).
Live at **https://portfolio.fusioncreative.net** (Bulgarian default, English via `?lang=en`).

## Stack
React 18 · Vite · TypeScript · Tailwind CSS v4 · Motion (`motion/react`) · Lenis · Vitest

## Develop
```bash
npm install
npx vite --port 5174      # http://localhost:5174
npx vitest run            # tests
npx tsc -b                # type check (run before deploying)
```

## Deploy
```bash
vercel --prod
```

## Content
- **Videos** — 71 animated, 30 UGC, 4 product ads, hosted on Bunny CDN (not in git). Listed in `src/data/portfolio.ts`,
  where animated and UGC videos are also assigned to the style filter chips (`ANIMATED_SUBS`, `UGC_SUBS`).
- **Static ads** — images in `public/ads/`, listed in `src/data/staticAds.ts`.
- **Copy** — all BG/EN strings in `src/lib/i18n.ts`.
- **Local video archive** — `node scripts/organize-videos.mjs` sorts `public/videos/` into one folder per style.

See `CLAUDE.md` for the full project guide (adding videos, CDN uploads, conventions).
