import type React from 'react'
import { useLanguage } from '../context/LanguageContext'

// Logos are normalised by display HEIGHT (px) so every mark carries equal optical
// weight; width is intrinsic (no distortion). `h` tunes per-logo to balance
// wordmarks (short) against icon/stacked marks (tall).
const BRANDS = [
  { src: '/logos/barkly.webp',     alt: 'Barkly',        h: 40 },
  { src: '/logos/coffeedoss.webp', alt: 'CoffeeDoss',    h: 40 },
  { src: '/logos/biolek.webp',     alt: 'BioLek',        h: 40 },
  { src: '/logos/vitaminita.webp', alt: 'Vitaminita',    h: 38 },
  { src: '/logos/zhivara.webp',    alt: 'Zhivara',       h: 30 },
  { src: '/logos/cubez.webp',      alt: 'Cubez',         h: 28 },
  { src: '/logos/elexira.webp',    alt: 'Elixira',       h: 40 },
  { src: '/logos/whiteme.webp',    alt: 'WhiteMe',       h: 34 },
  { src: '/logos/butikabg.webp',   alt: 'Butika.bg',     h: 42 },
  { src: '/logos/leya.webp',       alt: 'Leya',          h: 42 },
  { src: '/logos/ludi-glavi.webp', alt: 'Луди Глави',    h: 56 },
  { src: '/logos/nutrizima.webp',  alt: 'Nutrizima',     h: 54 },
  { src: '/logos/manicurezone.webp', alt: 'ManicureZone', h: 32 },
  { src: '/logos/mazzo.webp',      alt: 'Mazzo Kids & Lounge', h: 52 },
  { src: '/logos/juun.webp',       alt: 'Juun',          h: 60 },
  { src: '/logos/cirelle.webp',    alt: 'Cirelle',       h: 48 },
  { src: '/logos/oros.webp',       alt: 'Oros',          h: 44 },
  { src: '/logos/zehira.webp',     alt: 'Zehira',        h: 44 },
  { src: '/logos/pampersi.webp',   alt: 'Памперси.бг',   h: 42 },
]

export function BrandsMarquee() {
  const { tr } = useLanguage()
  const items = [...BRANDS, ...BRANDS, ...BRANDS]

  return (
    <section style={{ background: '#0D0E14', paddingTop: '64px', paddingBottom: '64px' }}>
      {/* Title — matches PortfolioSection heading style */}
      <div className="px-6 sm:px-12 mb-10">
        <h2
          className="text-[clamp(28px,4vw,48px)] font-black uppercase leading-none tracking-tight"
          style={{ color: '#fff' }}
        >
          {tr.brands.heading}
        </h2>
        <div
          style={{
            height: 1,
            width: 64,
            marginTop: 16,
            background: 'linear-gradient(90deg, #B01020, transparent)',
          }}
        />
      </div>

      {/* Marquee strip */}
      <div
        className="overflow-hidden border-y"
        style={{ borderColor: 'rgba(176,16,32,0.12)', background: '#191B26', padding: '28px 0' }}
      >
        <div
          className="flex items-center animate-marquee w-max"
          style={{ '--marquee-duration': '40s', gap: '72px' } as React.CSSProperties}
        >
          {items.map((brand, i) => {
            const h = brand.h ?? 40
            return (
              <div
                key={`${brand.alt}-${i}`}
                className="shrink-0 flex items-center justify-center"
                style={{ height: 64, maxWidth: 200, opacity: 0.82, filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.15))', transition: 'opacity 0.3s, filter 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.filter = 'drop-shadow(0 0 12px rgba(255,255,255,0.3))' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '0.82'; e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(255,255,255,0.15))' }}
              >
                <img
                  src={brand.src}
                  alt={brand.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ height: h, width: 'auto', maxWidth: 200, objectFit: 'contain' }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
