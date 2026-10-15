# ⏰ PENDING — remind the owner at the START of every session until done

**Match the page to each Meta ad set (`?niche=`).** Agreed 2026-10-15, postponed. At the start of every session on this
project, before anything else, tell the owner in one line that this is still open and ask if today is the day. Delete this
whole block only once it has shipped.

- Each ad set links to its niche, e.g. `?v=2&niche=kozmetika`. The param changes the V2 hero headline/sub (e.g. „Видео
  реклами за козметични брандове…") and puts that niche's videos first in the best-picks view; everything else stays.
- Needs from the owner: the niche list (slugs + headline per niche) and which videos belong to each niche.
- Implementation sketch: `lib/variant.ts` reads `niche` like `v`; a `NICHES` map (slug → copy + featured video numbers);
  HeroV2 / PortfolioSection read it; pixel events get a `niche` param; unknown slug → default page. Keep `v` and `lang`
  params intact on the language toggle.

# Where we left off (last session: 2026-10-15)
- Live: portfolio.fusioncreative.net (V1 `/`, V2 `?v=2` = the Meta-ads funnel). Everything is deployed and pushed.
- The aiads landing (aiads.fusioncreative.net / repo `fusion-creative-landing`) was **deleted** at the owner's request;
  its lead backend now lives here in `api/lead.js`. Owner still has to remove the GoDaddy DNS record `aiads → 76.76.21.21`.
- Next up: the `?niche=` reminder above, then the "Still open" list near the end of this file.

# Fusion AI Portfolio — Project Context

## What this project is
A portfolio landing page for **Fusion** — Monika & Tomas, AI Creative Specialists.
Dark cinematic aesthetic. Built with React 18 + Vite 5 + TypeScript + Tailwind CSS v4 + Framer Motion (`motion/react` v11).

## Dev server
```bash
npx vite --port 5174
```
Access at http://localhost:5174

## Deploy
```bash
/opt/homebrew/bin/vercel --prod
```
If deploys get stuck in "Queued", cancel them all with `vercel remove <url> --yes` then trigger a fresh one.
Production URL: https://portfolio.fusioncreative.net
Vercel project: `tomasdimitrov1918-3311s-projects/fusion-ai-portfolio`
GitHub repo: https://github.com/tomasdimitrov1918-stack/fusion-ai-portfolio

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
  App.tsx                  — Lenis init, MotionConfig, LanguageProvider, global layout
  context/
    LanguageContext.tsx    — LanguageProvider, useLanguage hook, Lang type ('bg' | 'en')
  components/
    Background.tsx         — NoiseOverlay (SVG feTurbulence) + FloatingDots (fixed, zIndex:1, site-wide)
    Hero.tsx               — Full-screen cinematic hero, letter-by-letter blur reveal
    Nav.tsx                — Fixed nav: logo + section links (anchors, href="#id") + BG/EN toggle; below md a hamburger opens a compact dropdown menu (rendered as a sibling of the nav so `fixed` maps to the viewport, not the transformed nav)
    MobileCta.tsx          — Sticky mobile-only CTA. V1: "Заяви оферта" pill → #contact. V2: hero-style button → #lead-form (see V2 section)
    HeroV2.tsx/.css        — ?v=2 hero, port of the aiads landing hero (scoped .hv2)
    WhyUsV2.tsx/.css       — ?v=2 "Защо брандовете…" 3 value cards + CTA to the form (scoped .wv2)
    AboutUs.tsx/.css       — "Кои сме ние" founders section, both versions (scoped .ab)
    OfferV2.tsx/.css       — ?v=2 "Месечен план" card with price hint (scoped .of)
    LeadForm.tsx/.css      — Lead form + thank-you screen, both versions (scoped .lf), posts to /api/lead (api/lead.js)
    ProblemsSolved.tsx/.css — "Най-големите ти проблеми… решени." 6 problem rows struck through on scroll + 00/06 counter,
                             both versions (scoped .ps); design/mechanics adapted from larven.ai's "Why Larven AI" section
    TestWinners.tsx/.css   — "Повече тестове намират повече печеливши" looping 8×5 ad grid (zoom, flip-in, winners lit),
                             both versions after static ads (scoped .tw); code rebuild of larven.ai's 10 s test-volume video
    ToolsMarquee.tsx       — Scroll-triggered typewriter + border-draw chip animation per tool
    BrandsMarquee.tsx      — Infinite marquee of brand logos (clients)
    PortfolioSection.tsx   — Section wrapper with parallax ghost text + style filter chips + video grid
    VideoCard.tsx          — 9:16 video card, lazy-loads src on hover, tilt+shine effect
    VideoLightbox.tsx      — Modal with video player (controls, no autoplay)
    StaticAdsSection.tsx   — Static image ads section with concept filters + lightbox
    MidCtaSection.tsx      — Compact horizontal CTA bar between portfolio and static ads
    ProcessSection.tsx     — 6-step numbered process with connector line + stat boxes (Variant A)
    CtaSection.tsx         — Breathing glow CTA section (renders <Contacts /> under the CTA button)
    Contacts.tsx           — Centered Viber + Facebook buttons for Tomas & Monika (viber:// deep link + FB profile)
    Footer.tsx             — Logo + copyright
  data/
    portfolio.ts           — 3 sections (83 animated shown of CDN 1-91, 40 ugc, 6 product), featured picks, VideoItem/Section types
    staticAds.ts           — 152 static ads across 11 brands, AdConcept type, CONCEPTS array, ADS array
  hooks/
    useTilt.ts             — 3D tilt + shine for VideoCard
    useParallax.ts         — Scroll parallax for section ghost text
  lib/
    animations.ts          — All named constants + Framer Motion variants
    i18n.ts                — All UI strings in BG and EN (see Internationalisation below)
    variant.ts             — ?v=2 detection (heroVariant) + scrollToSection / scrollToLeadForm
    track.ts               — Meta Pixel helpers (track / trackCustom / metaBrowserIds), see Meta Pixel events
public/
  favicon.jpg              — Fusion F logo (red on black)
  logo.webp                — Fusion Creative logo (transparent bg, 500x200)
  founders.webp            — Monika & Tomas photo (570x760, used in hero bg)
  og-image.jpg             — 1200×630 OG/social sharing thumbnail (hero screenshot)
  logos/                   — Brand logos (WebP, transparent bg), shown in BrandsMarquee
    barkly, coffeedoss, biolek, vitaminita, zhivara, cubez, elexira, whiteme,
    butikabg, leya, ludi-glavi, nutrizima, manicurezone, mazzo, juun,
    cirelle, oros, zehira, pampersi, gifto, brainchai   (so-simple.webp + biolek.webp present but unused)
    NOTE: all marquee logos are now normalised to WHITE/monochrome (transparent bg) for the dark strip.
    The previously-colored ones (barkly, butikabg, coffeedoss, cubez, elexira, leya, manicurezone, mazzo,
    pampersi, whiteme, zhivara) were recolored to white via Higgsfield (nano_banana_pro: recolor to white on
    black → key luminance→alpha). ludi-glavi is a white comic burst badge with near-black (#0D0E14) text.
    Sources/backups kept in ~/Desktop/non-white-logos/ as edit-white-*.webp.
    NOTE: marquee normalises by display HEIGHT — each BRANDS entry has an `h` (px),
    width is intrinsic (no distortion). Optimize new logos: WebP q80, cap height ~160px.
  ads/                     — Static ad images (WebP), served from Vercel
    barkly/                — 01-NN.webp
    bioherba/
    coffee-doss/
    dr-fit/
    juun/                  — 01-18.webp
    leya/
    manicurezone/
    nordics/
    ptg-engineering/
    so-simple/
    div-balkan/
  videos/                  — LOCAL ONLY, not in git, not on Vercel (see CDN below)
                             animated/ + ugc/ are sorted into STYLE SUBFOLDERS (e.g. animated/Talking Products/04.mp4,
                             ugc/Expert - Doctor/16.mp4) by `node scripts/organize-videos.mjs` — Bunny stays flat.
                             product/ stays flat. The NN numbering below is unchanged.
    animated/01-91.mp4     — (list below is the original 71; the CDN now has 1-91, 8 re-filed elsewhere, see MOVED_ELSEWHERE) (36=Cirelle, 37=Oros, 38=Zehira, 39=Pampersi s1, 40=Pampersi bg, 41=TestoFuel, 42-44=Gifto, 45=Leya Sleep, 46-49=BrainChai, 50-54=Bioline, 55=Cat Paws, 56-59=Flora, 60-62=Leya, 63-70=Nutrizma, 71=Yummy; H.264 web-optimized)
    animated/13-poster.webp — Custom posters (first frame was black)
    animated/31-poster.webp
    animated/32-poster.webp
    animated/33-poster.webp
    animated/34-poster.webp
    animated/35-poster.webp
    ugc/01-40.mp4          — (original 30 listed; now 1-40 on the CDN) (14=Gifto unboxing, 15=Leya Sleep, 16-18=SS skincare, 19-30=Biolek)
    ugc/13-poster.webp     — Custom poster for ugc/13
    product/01-04.mp4      — 4 AI Product Ads
api/lead.js                — Vercel serverless function behind the lead form (Resend emails + Meta Conversions API)
scripts/
  make-test-grid-thumbs.mjs — picks 40 static ads round-robin by brand → public/test-grid/NN.webp (240px) + src/data/testGrid.ts
  organize-videos.mjs      — sorts local public/videos/{animated,ugc} into style subfolders (see Video subcategories)
```

## Page layout order (App.tsx)
| # | V1 (`/`) | V2 (`?v=2`) |
|---|----------|-------------|
| 1 | `<Hero />` | `<HeroV2 />` |
| 2 | `<BrandsMarquee />` | `<BrandsMarquee />` |
| 3 | | `<WhyUsV2 />` (cards + CTA → form) |
| 4 | `<ToolsMarquee />` | `<ToolsMarquee />` |
| 5 | 3× `<PortfolioSection />` (animated, ugc, product) | same |
| 5b | `<ProblemsSolved />` (`#problems`) | same |
| 6 | `<ProcessSection />` (`#process`), `<MidCtaSection />` | same (MidCta button → form) |
| 7 | `<StaticAdsSection />` | same |
| 7b | `<TestWinners />` (`#more-tests`) | same (+ "Виж месечния план" → `#offer`) |
| 8 | `<AboutUs />` | `<AboutUs />`, then `<OfferV2 />` |
| 9 | `<CtaSection />` ("Реален растеж" + contacts) | `<LeadForm />` |
| 10 | `<LeadForm />` | `<CtaSection contactsOnly />` (Viber/FB only) |
| 11 | `<Footer />` | `<Footer blend />` (page background) |

## Hero A/B versions (?v=2)
- `portfolio.fusioncreative.net` → original `Hero.tsx`; `?v=2` → `HeroV2.tsx` (port of the aiads landing hero, styles in `HeroV2.css` scoped under `.hv2`, Montserrat loaded in index.html).
- `src/lib/variant.ts` reads `?v`; `App.tsx` picks the hero; the lang toggle keeps `v=2`. Copy lives in `tr.heroV2`.
- Also v2-only: `WhyUsV2.tsx` (+ `.css`, scoped `.wv2`, copy in `tr.whyV2`), the landing's "why brands switch" 3 value cards, rendered right under `<BrandsMarquee />`.
- Also v2-only: `OfferV2.tsx` (+ `.css`, scoped `.of`, copy in `tr.offerV2`), the landing's monthly-plan offer card (no scroll-pin), right under `<AboutUs />`. Its CTA scrolls to the form (`GoToForm`).
- Both versions: `AboutUs.tsx` (+ `.css`, scoped `.ab`, copy in `tr.about`), the landing's "Кои сме ние" founders section, after `<StaticAdsSection />`. Its middle stat is 50+ brands (the landing has a `[ X ]+` placeholder there).
- `src/lib/track.ts` adds `hero_variant` (1|2) to every Meta Pixel event, so leads can be compared per version.

## Portfolio sections
| # | ID | Title | Videos | Grid |
|---|-----|-------|---------|------|
| 01 | animated-ads | AI Animated Ads | 83 (12 best picks shown first) | 5-col |
| 02 | ugc-ads | AI UGC Ads | 40 (12 best picks shown first) | 4-col |
| 03 | product-ads | AI Product Ads | 6 | 2-col |

## Video subcategories (style filter chips)
Animated and UGC sections have filter chips ("All" + one per style); Product has none (too few videos).
- **Mapping:** `ANIMATED_SUBS` / `UGC_SUBS` in `src/data/portfolio.ts` — `Record<subName, videoNumber[]>`; key order = chip order.
  `assignSubs()` sets `VideoItem.sub`; `Section.subcategories` = the keys. A section without `subcategories` shows no chips.
- **Animated:** Talking Products, Ingredients & Body, Story-Driven, Clay & Stop-Motion, 2D Videos, Cinematic Premium.
- **UGC:** Testimonials, Expert / Doctor, Skits & TV Formats, Lifestyle & Product.
- **Local folders:** `node scripts/organize-videos.mjs` moves `public/videos/{animated,ugc}/**/NN.mp4` (+ poster) into a folder
  per style, read straight from the maps. Re-run after any re-assignment — it finds files wherever they are and removes emptied folders.
- **Adding a video:** after bumping the count, add its number to one sub list — `src/data/portfolio.test.ts` fails if any
  animated/ugc video has no sub, and asserts per-sub counts (update those too).
- **Best picks (default view):** `Section.featured` (video numbers, in display order) — animated 12, ugc 12, picked by the owner
  (2026-10-15). The first chip "Най-добрите" is active by default; "Всички" and a "Виж всички N видеа" button under the grid show
  the full library. `portfolio.test.ts` checks the picks exist. Static ads show 8 per concept + "Покажи всички" (`PREVIEW_COUNT`).
- **Skip to UGC:** the animated-ads chip grid ends with a red "Прескочи към UGC" chip (`tr.videoFilter.skipToUgc`, both versions)
  → `scrollToSection('ugc-ads')` + custom pixel `SkipToUgc`. Portfolio sections have `scroll-mt-12` to clear the fixed nav.
- **UI:** chips are deliberately loud (bouncing red ↓ prompt, 52px pills with poster thumb + count, solid red glowing active
  state, 2-col grid on mobile). Chip names stay English; prompt/"All"/"Showing" come from `tr.videoFilter`.
- Playwright clicks on chips can miss because Lenis moves the page mid-click — click via `el.click()` in `evaluate` when testing,
  and use `fullPage` + `clip` screenshots (normal viewport screenshots time out on this page).

## Meta Pixel events (`src/lib/track.ts`, pixel 3894913167483268)
Every event carries `hero_variant` (1|2). Standard: `Lead` = successful form submit ONLY; `Contact` = contact-page buttons
(hero/mid_cta/cta_section/offer) + Viber/Facebook clicks; `ViewContent` = video/static-ad lightbox opens.
Custom: `ReachedForm`, `FormStart`, `ReachedContact`, `HeroClick` (button), `FilterStyle`. Never fire `Lead` on clicks.

## V2 CTAs → on-page form
On `?v=2` the hero CTA, MidCta button and OfferV2 button call `scrollToLeadForm()` (`lib/variant.ts`, self-correcting smooth
scroll — lazy content shifts the form mid-scroll) and fire custom `GoToForm` {placement}. V1 keeps the external contact page.
`MobileCta` on V2 shows the hero's button (same look/text) → form (`GoToForm` placement `mobile_sticky`) and hides while the
hero buttons, the form or the contacts are on screen; V1 keeps the old "Заяви оферта" pill → #contact.

## V2 bottom of page
On `?v=2` the "Реален растеж" CTA is dropped: `LeadForm` → `<CtaSection contactsOnly />` (just the Viber/FB block, keeps `id="contact"`) → `<Footer blend />`, all on the page background.

## Lead form + `/api/lead`
- `LeadForm.tsx` (+ `.css`, scoped `.lf`, copy in `tr.leadForm`): required name / email / **phone**, optional website or
  Instagram (URL or `@handle`), three next-steps above the submit, a Viber link, and a thank-you screen after submit.
- Posts JSON to `/api/lead` → **`api/lead.js` in this repo** (moved here 2026-10-15 when the aiads landing was deleted):
  1. notification email to `LEAD_INBOX` (name, phone, email, site, V1/V2), critical: failure → 502;
  2. Meta Conversions API `Lead` with the same `event_id` as the browser pixel → deduped (verified in Test Events);
  3. visitor confirmation email ("безплатна примерна реклама от 10 до 15 секунди… до 48 часа").
  Steps 2-3 never fail the lead. No `RESEND_API_KEY` → 503 (form shows its error state, never a fake success).
- Vercel env (Production) on **fusion-ai-portfolio**: `RESEND_API_KEY` (sensitive), `SENDER_EMAIL`
  (`Fusion Creative <office@fusioncreative.net>`, domain verified in Resend), `LEAD_INBOX` (office@fusioncreative.net),
  `META_CAPI_TOKEN`. Changing env vars needs a redeploy.
- One promise, same words everywhere: **"Безплатна примерна реклама от 10 до 15 секунди, до 48 часа"**.
- `OfferV2` price hint **350 до 400 € / месец за 10 видеа до 35 секунди** (offer PDF 2026: 4-15 tier, ≤35 s,
  Animated 35 €, UGC 40 €). Update it if the PDF prices change.
- `npx vite` does not run `/api` — use `vercel dev`, or `vercel deploy --prod --skip-domain` + `vercel curl /api/lead
  --deployment <url>` (staged builds sit behind Vercel auth) to test before publishing.
- Test the Conversions API with `?meta_test=TEST12345` (code from Events Manager → Test Events).
- Pixel `Lead` (placement `form`) fires only after a successful submit.

## Video CDN — Bunny.net
Videos are hosted on Bunny CDN (NOT Vercel — too large).

- **Storage zone:** `fusion-video-assets` (Frankfurt region)
- **CDN hostname:** `https://fusion-creative-assets.b-cdn.net`
- **Storage API endpoint:** `https://storage.bunnycdn.com/fusion-video-assets`
- **API key:** `a1c5397c-07f0-41db-9f5256cea9fe-95a1-4759`
- **URL pattern:** `https://fusion-creative-assets.b-cdn.net/{category}/{nn}.mp4`
  - e.g. `https://fusion-creative-assets.b-cdn.net/animated/01.mp4`
- **CDN constant:** defined as `CDN` in `src/data/portfolio.ts`
- `public/videos/` is in `.gitignore` and `.vercelignore` — never committed or deployed

To upload a file to Bunny:
```bash
curl -X PUT "https://storage.bunnycdn.com/fusion-video-assets/{path}" \
  -H "AccessKey: a1c5397c-07f0-41db-9f5256cea9fe-95a1-4759" \
  -H "Content-Type: video/mp4" --data-binary @localfile.mp4
```

To add new videos: rename to zero-padded format (e.g. `14.mp4`), generate poster with `qlmanage`, convert with sharp, upload video + poster to Bunny, update count in `portfolio.ts`.

## Video lazy loading
`VideoCard` does NOT set `src` on mount. The `src` is injected only on first `mouseEnter`, then `onCanPlay` triggers `play()`. This keeps page load fast (zero video bytes on initial load).

- Do NOT add `preload="auto"` to VideoCard — it defeats lazy loading
- Do NOT set `src={item.videoUrl}` statically — use the `src` state pattern
- `VideoLightbox` has `controls` but no `autoPlay` (Chrome blocks autoplay with sound)

## Hero section features
- Letter-by-letter blur reveal: AI / Creative (red) / Specialists
- Founders image (`/founders.webp`) — full-height, behind text (z-index 2), radial mask to fade edges, slow float animation
- Mobile: `124vw` width via `@media (max-width: 767px)` in inline `<style>` tag (JS window.innerWidth unreliable in DevTools)
- 3 breathing red glow orbs
- SVG noise + 50 floating red dots (site-wide, fixed)
- Animated horizontal beam
- Stats bar at bottom (translated via i18n)
- Shimmer CTA button — links to contact URL from `tr.cta.contactUrl`

## Tools marquee
Tools: Kling 3.0, Kling Motion Control, Gemini Omni Flash 1.1, Nano Banana Pro, ElevenLabs, CapCut, Seedance 2.5, ChatGPT Image 2.0, GPT Image 2.5, Higgsfield, Higgsfield Genjutsu
Animation: Border Draw (clipPath) + Typewriter (setInterval) — triggers on scroll into view via `useInView`

## Internationalisation (BG / EN)
All UI strings live in `src/lib/i18n.ts`. Components access them via `useLanguage()` from `src/context/LanguageContext.tsx`.

```ts
const { lang, toggle, tr } = useLanguage()
// tr.hero.subtext, tr.cta.button, tr.staticAds.filterLabel, tr.process.steps, etc.
```

- **Toggle button** is in `Nav.tsx` — shows "EN" when BG active, "BG" when EN active
- **URL sync:** language is reflected in the URL as `?lang=en`. Opening `https://portfolio.fusioncreative.net?lang=en` loads English directly. BG is the default (no param). Toggling updates the URL via `window.history.replaceState`.
- **Shareable EN link:** `https://portfolio.fusioncreative.net?lang=en`
- **Contact URLs** are language-specific in `tr.cta.contactUrl`:
  - BG → `https://fusioncreative.net/kontakti`
  - EN → `https://fusioncreative.net/en/contacts`
- Section titles (AI Animated Ads etc.) and concept filter names stay in English in both modes
- `LanguageContext` `tr` type is `typeof t[Lang]` (union) — do NOT type it as `typeof t['bg']` (causes build error)

## i18n keys in use
- `tr.nav` — staticAds
- `tr.hero` — portfolioLabel, subtext, stats[], ctaPrimary, ctaSecondary
- `tr.brands` — heading
- `tr.sections` — keyed by section id
- `tr.videoFilter` — prompt, all, showing, videos (style filter chips in PortfolioSection)
- `tr.staticAds` — portfolioLabel, heading[], filterLabel, countSingular, countPlural, empty, hoverHint, navHint, prev, next, close
- `tr.cta` — eyebrow, line1, line2, bullet1, bullet2, button, contactUrl
- `tr.midCta` — eyebrow, headline, button
- `tr.contacts` — heading, subtext, names.{tomas,monika}, viber, facebook (rendered by Contacts.tsx inside CtaSection; phone numbers/FB URLs are hardcoded in Contacts.tsx, not i18n)
- `tr.process` — eyebrow, line1, line2, steps[], statDeadlineLabel/Value, statCapacityLabel/Value, statRevisionsLabel/Value

## Key conventions
- **No dashes in visitor copy** (owner rule, 2026-10-15): no em dash (—), en dash (–) or `--` anywhere a visitor can read,
  incl. `<title>`, meta tags, alt and aria-labels. Use a comma, colon, period, `·` or `|`. Within-word hyphens are fine.
- Named exports only (no default exports except App)
- All animation timing values as named constants in `lib/animations.ts`
- Import from `motion/react` — never `framer-motion`
- `import type` for type-only imports
- Images → `public/` folder, convert to WebP with sharp
- Videos → Bunny CDN (see above), never committed to git
- Always run `npx tsc -b` before deploying — catches unused variable errors that `tsc --noEmit` misses

## If videos show black thumbnails
Upload a poster image to Bunny at `{category}/NN-poster.webp` and add `poster` field to the VideoItem in `portfolio.ts`. Run: `qlmanage -t -s 600 -o /tmp/ "public/videos/{category}/NN.mp4"` then convert `/tmp/NN.mp4.png` to webp with sharp.

## Static Ads Section
`StaticAdsSection` sits after `ProcessSection` and `MidCtaSection` in App.tsx, before `CtaSection`.

- **Data:** `src/data/staticAds.ts` — `AdConcept` union type, `CONCEPTS` array, `ADS` array (152 entries)
- **Brands:** Barkly, Bioherba, Coffee Doss, Dr. Fit, Juun, Leya, ManicureZone, Nordics, PTG Engineering, So Simple, Див Балкан
- **Concepts (15):** Day-by-Day Diary, Before / After, UGC / Testimonial, Price Offer, Bundle Offer, Ingredient Spotlight, Benefits / Features, Social Proof, Myth Busting, Problem Hook, Problem / Solution, Problem / Pain Hook, Big Number / Hero Stat, Infographic, Lifestyle
- **Filter chips:** wrap layout (no horizontal scroll), concepts with 0 ads are hidden
- **Lightbox:** clicking any ad opens a full-screen lightbox; navigate with ← → arrow keys or on-screen buttons; close with Escape or clicking the backdrop; body scroll is locked while open; navigation is cross-brand within the active concept tab
- **z-index:** section has `position: relative; zIndex: 2` to sit above the fixed FloatingDots (zIndex:1)

### Adding ads
Add entries to `ADS` array in `staticAds.ts`. Put images in `public/ads/{brand}/NN.webp`. If a concept has 0 ads it auto-hides from filters. If you add a new concept string, also add it to the `AdConcept` union type AND the `CONCEPTS` array.

## SEO / Social sharing
- OG image: `public/og-image.jpg` (1200×630 hero screenshot)
- Meta tags in `index.html`: og:title, og:description, og:image, og:url, twitter:card
- To regenerate OG image: screenshot the hero at 1200×630 with Playwright, convert with sharp

## Domain & hosting
- **Production:** https://portfolio.fusioncreative.net
- **Domain registrar:** GoDaddy (fusioncreative.net)
- **DNS:** A record `portfolio → 76.76.21.21` on GoDaddy
- **SSL:** Auto-managed by Vercel
- **Vercel CLI:** `/opt/homebrew/bin/vercel` (installed via Homebrew)

## Installed plugins / MCP
- Magic MCP (`@21st-dev/magic`) — API_KEY configured in user scope
- Vercel plugin — installed
- Canva MCP — design ID `DAHG8aHFQDY` (thumbnails expire ~24h)
- **Higgsfield** — used to whiten/recolor brand logos (see recipe below).
  - CLI (`higgsfield`) network was flaky this session → use the **Higgsfield MCP tools** instead.
  - Workspace id: `c3a0e802-1dc6-4b77-a4db-c8fcf3102ccd` (private). `select_workspace` before generating.
  - Model that worked well for logos/text: `nano_banana_pro` (routes to `nano_banana_2`).

## Whitening / recoloring a logo via Higgsfield (recipe)
Used to normalise all colored brand logos to white for the dark marquee. Backups live in
`~/Desktop/non-white-logos/` as `edit-white-*.webp` (folder is transient — `/tmp` + Desktop get cleared
between sessions, so re-flatten from `public/logos` if needed).

1. Flatten the colored source onto neutral gray (both light & dark parts visible) → `/tmp/x.png`:
   `sharp(src).resize({width:1200,height:1200,fit:'contain',background:'#808080'}).flatten({background:'#808080'}).png()`
2. Upload via MCP `media_upload` → PUT bytes to the presigned URL (curl, absolute paths, `</dev/null`) → `media_confirm`.
   (Presigned URLs expire in 24h; regenerate if stale.)
3. `generate_image` with `nano_banana_pro`, the uploaded image as `medias[{role:'image'}]`, prompt =
   "recreate this exact logo as a flat PURE WHITE (#FFFFFF) silhouette, identical letterforms/layout, on a solid
   pure black (#000000) background, no color/shadows/gradients." Name the brand + describe its marks so text stays faithful.
4. Download `rawUrl`, then **key black→transparent** (luminance = alpha): build white RGB, joinChannel the grayscale
   as alpha, `.trim().resize({height:160}).webp({quality:88,alpha:true})`.
5. Verify on `#191B26`, copy into `public/logos/<name>.webp`, `tsc -b`, deploy.
- **Colored/duotone outputs** (e.g. ludi-glavi red badge) can't use luminance-keying → use MCP `remove_background`
  (generate on a distinct bg like solid green, then remove). ludi-glavi final = white comic badge + near-black
  (#0D0E14) filled text, generated from the original as reference.
- Generative editing garbles tiny/hand-lettered logos — always eyeball each result; fall back to a deterministic
  sharp recolor when text must stay exact.

## Reusable Background dots pattern
`src/components/Background.tsx` (`FloatingDots` + `NoiseOverlay`) is self-contained and reusable in other projects. Standalone React version:

```tsx
const DOTS = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  x: (i * 37.3 + 13.7) % 100,
  y: (i * 53.1 + 7.3) % 100,
  delay: (i * 0.23) % 2,
  duration: 3 + (i * 0.17) % 2,
}))

export function FloatingDots({ color = '#B01020', count = 50 }) {
  return (
    <>
      <style>{`
        .floating-dot { position: absolute; width: 4px; height: 4px; border-radius: 50%; background: ${color};
          animation: float-dot var(--dot-duration, 4s) ease-in-out infinite; animation-delay: var(--dot-delay, 0s); }
        @keyframes float-dot { 0%,100%{transform:translateY(0);opacity:.22} 50%{transform:translateY(-18px);opacity:.45} }
        @media (prefers-reduced-motion:reduce){ .floating-dot{animation:none;opacity:.22} }
      `}</style>
      <div aria-hidden style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
        {DOTS.slice(0, count).map(d => (
          <div key={d.id} className="floating-dot"
            style={{ left: `${d.x}%`, top: `${d.y}%`,
              '--dot-duration': `${d.duration}s`, '--dot-delay': `${d.delay}s` } as React.CSSProperties} />
        ))}
      </div>
    </>
  )
}
```

Tunables: `color`, `count`, `translateY(-18px)` (float distance), `opacity 0.22→0.45` (visibility). Positions use a deterministic formula so they don't re-randomize on re-render.

## Adding new videos — quick recipe
> IMPORTANT: source clips are often **HEVC/h265** (esp. iPhone/screen recordings) which
> Chrome & Firefox CANNOT decode — ALWAYS transcode to H.264. Also re-encode to shrink
> (raw renders are 60-90 MB; optimized are ~15-20 MB). Check codec first:
> `ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,width,height -of csv=p=0 src.mp4`
```bash
# 0. Optimize/transcode -> public/videos/{category}/NN.mp4 (H.264, faststart, cap 1080p, no upscale)
ffmpeg -y -i src.mp4 -vf "scale='min(1080,iw)':'-2'" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 24 -preset medium -r 30 \
  -movflags +faststart -c:a aac -b:a 128k "public/videos/{category}/NN.mp4"
# (sandbox can't read ~/Desktop or ~/Downloads — cp source to /tmp first, or use dangerouslyDisableSandbox)

# 2. Generate poster (extract a real frame ~1.5s in, not black; sharp -> webp ~540px)
ffmpeg -y -ss 1.5 -i "public/videos/{category}/NN.mp4" -frames:v 1 /tmp/NN.png
node -e "require('sharp')('/tmp/NN.png').resize({width:540}).webp({quality:72}).toFile('public/videos/{category}/NN-poster.webp')"

# 3. Upload both to Bunny
curl -X PUT "https://storage.bunnycdn.com/fusion-video-assets/{category}/NN.mp4" \
  -H "AccessKey: a1c5397c-07f0-41db-9f5256cea9fe-95a1-4759" \
  -H "Content-Type: video/mp4" --data-binary @"public/videos/{category}/NN.mp4"
curl -X PUT "https://storage.bunnycdn.com/fusion-video-assets/{category}/NN-poster.webp" \
  -H "AccessKey: a1c5397c-07f0-41db-9f5256cea9fe-95a1-4759" \
  -H "Content-Type: image/webp" --data-binary @"public/videos/{category}/NN-poster.webp"

# 4. Bump count in src/data/portfolio.ts (makeVideos call) — DON'T need poster override unless first frame is bad
# 4b. Add the number to its style in ANIMATED_SUBS / UGC_SUBS, then file it into its local style folder:
node scripts/organize-videos.mjs
# 5. tsc -b && vercel --prod
```

## Optimization audit (ref)
Full CRO / UX / code audit generated at `~/Downloads/fusion-portfolio-audit.html` (self-contained, brand-styled).
Overall verdict: strong creative, weak conversion funnel. Biggest lever: the CTA still dead-ends in an external
redirect (`fusioncreative.net/kontakti`) — on-page Viber/Facebook contacts were added but no inline form yet.

### Done (Aug 2026 session)
- Contacts block (Viber + Facebook per person) inside CtaSection (`#contact`) — `Contacts.tsx`.
- Mobile hamburger dropdown nav + sticky "Get a quote" CTA — `Nav.tsx`, `MobileCta.tsx`.
- Single hero `<h1>` + clean heading order; nav jumps converted to `<a href="#id">` anchors.
- Compressed oversized Juun static-ad images (2048px → 1080px, ~3.5 MB → ~0.9 MB).
- All marquee logos normalised to white/monochrome (see Higgsfield recipe).

### Done (Oct 2026 session)
On-page lead form (+ phone, optional site/Instagram, 3 next-steps, Viber link, thank-you screen), own `api/lead.js`
backend, Conversions API with dedup (verified in Test Events), V2 funnel (CTAs → form, mobile sticky CTA), best-picks
video view (12 + 12), static-ads preview, price hint, one sample-ad promise everywhere, no dashes, "за бизнеса ти" instead
of DTC, larven.ai-inspired `ProblemsSolved` + `TestWinners` sections, aiads landing retired.

### Still open (highest impact first)
- **`?niche=` per-ad-set page matching** — see the PENDING block at the top of this file (owner wants a reminder each session).
- **Real proof**: 2-3 client quotes / results near the form (owner to supply; never invent).
- **Sample video next to the form** ("Ето как изглежда безплатната примерна реклама").
- **Two-step form** (name + phone first, then site/email) and a lighter offer for not-ready visitors ("5 идеи за реклами").
- **FAQ** near the form ("Позволява ли Meta AI реклами?", timing, revisions, "имам само лого", price).
- **UTM links** in Meta ads (`?v=2&utm_source=meta&utm_campaign=…`); retarget ReachedForm/FormStart non-submitters.
- **Instant lead alerts**: owner declined Telegram and Pushover; Viber bots cost €100/month. Current plan: Gmail push
  notifications on office@fusioncreative.net (nothing to build).
- **SEO meta gaps in `index.html`**: `lang="en"` hardcoded (site defaults BG), no canonical, no hreflang for `?lang=en`,
  no robots.txt/sitemap, no Organization JSON-LD.
- **`prefers-reduced-motion`** only covers CSS marquee/dots — not Framer Motion reveals, card tilt, or Lenis.
- **ESLint errors** (non-blocking; builds are clean): setState-in-effect in StaticAdsSection, unused `_e` in VideoCard,
  react-refresh in LanguageContext.

## Accessibility / SEO notes
- Hero headline is the single page `<h1>` ("AI Creative Specialists"); split-letter visual is `aria-hidden` with an `sr-only` spaced title carrying the accessible name/SEO text. Heading order: h1 → h2 (sections) → h3 (process steps), no skipped levels.
- Nav section jumps are `<a href="#id">` anchors (real link semantics + smooth scroll via preventDefault). Only the BG/EN toggle and hamburger remain `<button>`s.
- Mobile nav (hamburger dropdown) + sticky "Get a quote" CTA are done.

## Contacts (hardcoded in Contacts.tsx)
- Tomas — Viber `+359896718015`, FB `facebook.com/tomas.dimitrov.12/`
- Monika — Viber `+359888634506`, FB `facebook.com/profile.php?id=100000618333454`
- Viber links use `viber://chat?number=%2B<digits>`; FB opens in a new tab.
