import { useState } from 'react'
import { motion } from 'motion/react'
import type React from 'react'
import type { Section, VideoItem } from '../data/portfolio'
import { VideoCard } from './VideoCard'
import { cardContainerVariants, cardItemVariants } from '../lib/animations'
import { useParallax } from '../hooks/useParallax'
import { useLanguage } from '../context/LanguageContext'

interface PortfolioSectionProps {
  section: Section
  onVideoClick: (item: VideoItem) => void
}

const GRID_CLASSES: Record<Section['gridLayout'], string> = {
  '5-col': 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3',
  '4-col': 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3',
  '3-col': 'grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3',
  '2-col': 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3',
}

const FILTER_STYLES = `
  .video-filter-chip {
    display: flex; align-items: center; gap: 10px; min-height: 52px;
    padding: 6px 14px 6px 6px; border-radius: 999px; text-align: left; cursor: pointer;
    border: 1.5px solid rgba(255,255,255,0.22); background: rgba(255,255,255,0.05);
    color: rgba(255,255,255,0.85); font-size: 12px; font-weight: 700;
    letter-spacing: 1.5px; text-transform: uppercase;
    transition: transform .18s, border-color .18s, background .18s, box-shadow .18s;
  }
  .video-filter-chip:hover { border-color: #E01020; background: rgba(176,16,32,0.14); transform: translateY(-2px); }
  .video-filter-chip:focus-visible { outline: 2px solid #E01020; outline-offset: 3px; }
  .video-filter-chip.is-active {
    background: #B01020; border-color: #E01020; color: #fff;
    box-shadow: 0 0 0 4px rgba(224,16,32,0.18), 0 10px 30px rgba(176,16,32,0.45);
  }
  .video-filter-thumb {
    width: 40px; height: 40px; border-radius: 50%; object-fit: cover; flex-shrink: 0;
    border: 1.5px solid rgba(255,255,255,0.25); background: #191B26;
  }
  .video-filter-label { flex: 1; line-height: 1.2; }
  .video-filter-count {
    font-size: 11px; padding: 3px 8px; border-radius: 999px; letter-spacing: 0;
    background: rgba(255,255,255,0.1);
  }
  .video-filter-chip.is-active .video-filter-count { background: rgba(255,255,255,0.22); }
  .video-filter-pointer {
    display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;
    width: 28px; height: 28px; border-radius: 50%; background: #B01020; color: #fff; font-size: 15px;
    animation: vf-bounce 1.4s ease-in-out infinite;
  }
  @keyframes vf-bounce { 0%,100% { transform: translateY(0) } 50% { transform: translateY(4px) } }
  @media (max-width: 639px) {
    .video-filter-chip { font-size: 10.5px; letter-spacing: 0.4px; min-height: 48px; gap: 8px; padding-right: 10px; }
    .video-filter-thumb { width: 34px; height: 34px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .video-filter-pointer { animation: none; }
    .video-filter-chip:hover { transform: none; }
  }
`

export function PortfolioSection({ section, onVideoClick }: PortfolioSectionProps) {
  const { ref, x } = useParallax()
  const { tr } = useLanguage()
  const [activeSub, setActiveSub] = useState<string | null>(null)
  const description = tr.sections[section.id as keyof typeof tr.sections] ?? section.description

  const subs = section.subcategories
  const visibleItems = activeSub ? section.items.filter((v) => v.sub === activeSub) : section.items
  const chips = subs
    ? [
        { key: null, label: tr.videoFilter.all, count: section.items.length, poster: section.items[0]?.poster },
        ...subs.map((sub) => {
          const items = section.items.filter((v) => v.sub === sub)
          return { key: sub, label: sub, count: items.length, poster: items[0]?.poster }
        }),
      ].filter((chip) => chip.count > 0)
    : []

  return (
    <section
      id={section.id}
      ref={ref as React.RefObject<HTMLElement>}
      className="relative px-4 sm:px-12 py-16 sm:py-24 overflow-hidden border-t"
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
          <span className="text-[11px] font-bold tracking-[3px]" style={{ color: 'rgba(176,16,32,0.6)' }}>
            {section.number}
          </span>
          <div className="w-10 h-px" style={{ background: 'rgba(176,16,32,0.2)' }} />
        </div>

        <h2
          className="text-[clamp(28px,4vw,48px)] font-black uppercase leading-none tracking-tight mb-3"
          style={{ color: '#fff' }}
        >
          {section.title}
        </h2>

        <p className={`text-[11px] tracking-[2px] ${chips.length ? 'mb-8' : 'mb-12'}`} style={{ color: 'rgba(255,255,255,0.25)' }}>
          {description}
        </p>

        {/* Style filter */}
        {chips.length > 0 && (
          <div className="mb-10">
            <style>{FILTER_STYLES}</style>
            <div className="flex items-center gap-3 mb-4">
              <span className="video-filter-pointer" aria-hidden>↓</span>
              <p className="text-[12px] sm:text-[13px] font-bold tracking-[3px] uppercase" style={{ color: '#fff' }}>
                {tr.videoFilter.prompt}
              </p>
            </div>

            <div role="group" aria-label={tr.videoFilter.prompt} className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
              {chips.map((chip) => {
                const active = activeSub === chip.key
                return (
                  <button
                    key={chip.label}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveSub(chip.key)}
                    className={`video-filter-chip${active ? ' is-active' : ''}`}
                  >
                    {chip.poster && <img src={chip.poster} alt="" loading="lazy" className="video-filter-thumb" />}
                    <span className="video-filter-label">{chip.label}</span>
                    <span className="video-filter-count">{chip.count}</span>
                  </button>
                )
              })}
            </div>

            <div className="flex items-center gap-3 mt-5">
              <div className="h-px w-5 shrink-0" style={{ background: '#B01020' }} />
              <p className="text-[10px] tracking-[3px] uppercase m-0" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {tr.videoFilter.showing}: <span style={{ color: '#fff' }}>{activeSub ?? tr.videoFilter.all}</span>
                {' · '}{visibleItems.length} {tr.videoFilter.videos}
              </p>
            </div>
          </div>
        )}

        <motion.div
          key={activeSub ?? 'all'}
          className={GRID_CLASSES[section.gridLayout]}
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {visibleItems.map((item) => (
            <motion.div key={item.id} variants={cardItemVariants}>
              <VideoCard item={item} onClick={onVideoClick} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
