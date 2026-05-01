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
