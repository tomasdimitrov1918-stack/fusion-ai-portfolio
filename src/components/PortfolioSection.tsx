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
          <div className="w-10 h-px" style={{ background: 'rgba(176,16,32,0.2)' }} />
        </div>

        <h2
          className="text-[clamp(28px,4vw,48px)] font-black uppercase leading-none tracking-tight mb-3"
          style={{ color: '#fff' }}
        >
          {section.title}
        </h2>

        <p className="text-[9px] tracking-[3px] uppercase mb-12" style={{ color: 'rgba(255,255,255,0.25)' }}>
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
              <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Send us a photo. We turn it into a high-quality video ad.
                <br />
                No filming. No studio. Just results.
              </p>
            </div>
            <VideoCard item={section.items[0]} onClick={onVideoClick} />
          </div>
        ) : (
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
                  aspectRatio="9/16"
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
