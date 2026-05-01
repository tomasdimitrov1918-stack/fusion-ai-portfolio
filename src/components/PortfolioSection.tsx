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
  '5-col': 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3',
  '4-col': 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3',
  '3-col': 'grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3',
  '2-col': 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3',
}

export function PortfolioSection({ section, onVideoClick }: PortfolioSectionProps) {
  const { ref, x } = useParallax()

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

        <p className="text-[11px] tracking-[2px] mb-12" style={{ color: 'rgba(255,255,255,0.25)' }}>
          {section.description}
        </p>

        <motion.div
          className={GRID_CLASSES[section.gridLayout]}
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {section.items.map((item) => (
            <motion.div key={item.id} variants={cardItemVariants}>
              <VideoCard item={item} onClick={onVideoClick} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
