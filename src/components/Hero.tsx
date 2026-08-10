import { motion } from 'motion/react'
import type React from 'react'
import { useLanguage } from '../context/LanguageContext'

// ── Constants ────────────────────────────────────────────────────────────────
const HERO_LINES: { text: string; red?: boolean }[] = [
  { text: 'AI' },
  { text: 'Creative', red: true },
  { text: 'Specialists' },
]

const WORD_STAGGER_S = 0.28
const LETTER_STAGGER_S = 0.045
const LINE_DELAY_S = 1.6
const LINE_DURATION_S = 1.1
const SUBTEXT_DELAY_S = 1.85
const CTA_DELAY_S = 2.1
const STATS_DELAY_S = 2.4
const FOUNDERS_DELAY_S = 1.3

const ORB_CONFIGS = [
  { size: 600, left: '70%', top: '25%', delay: 0, duration: 4.2 },
  { size: 500, left: '10%', top: '60%', delay: 1.1, duration: 5.0 },
  { size: 420, left: '50%', top: '80%', delay: 2.0, duration: 3.8 },
]

// ── Glow orbs (hero-specific) ─────────────────────────────────────────────
function HeroOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {ORB_CONFIGS.map((orb, i) => (
        <div
          key={i}
          className="hero-orb"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.left,
            top: orb.top,
            '--orb-duration': `${orb.duration}s`,
            '--orb-delay': `${orb.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

// ── Letter reveal ─────────────────────────────────────────────────────────
interface LetterRevealProps {
  text: string
  wordIndex: number
  red?: boolean
}

function LetterReveal({ text, wordIndex, red }: LetterRevealProps) {
  return (
    <span className="overflow-hidden" style={{ display: 'block' }}>
      <span
        style={{
          display: 'block',
          fontSize: 'clamp(54px,9vw,112px)',
          fontWeight: 900,
          lineHeight: 0.92,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: red ? '#E01020' : '#fff',
          textShadow: red ? '0 0 90px rgba(224,16,32,0.4)' : 'none',
        }}
      >
        {text.split('').map((char, li) => (
          <motion.span
            key={li}
            style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : undefined }}
            initial={{ opacity: 0, y: 48, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 0.55,
              delay: wordIndex * WORD_STAGGER_S + li * LETTER_STAGGER_S + 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    </span>
  )
}


// ── Component ─────────────────────────────────────────────────────────────
export function Hero() {
  const { tr } = useLanguage()

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 pt-28 pb-28 overflow-hidden">
      <HeroOrbs />

      {/* Animated horizontal beam */}
      <motion.div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '50%',
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(176,16,32,0.35) 40%, rgba(176,16,32,0.35) 60%, transparent)',
          transformOrigin: 'left',
          zIndex: 0,
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: LINE_DELAY_S, duration: LINE_DURATION_S, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Eyebrow */}
        <motion.p
          className="text-[10px] tracking-[5px] uppercase mb-6"
          style={{ color: '#B01020' }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          Portfolio 2026 — Monika &amp; Tomas
        </motion.p>

        {/* Headline — letter-by-letter blur reveal.
            Single page <h1>; a spaced sr-only title carries the clean accessible
            name / SEO text, while the split-letter visual is aria-hidden. */}
        <h1 className="mb-8">
          <span className="sr-only">AI Creative Specialists</span>
          <span aria-hidden="true">
            {HERO_LINES.map((line, i) => (
              <LetterReveal key={line.text} text={line.text} wordIndex={i} red={line.red} />
            ))}
          </span>
        </h1>

        {/* Red rule */}
        <motion.div
          style={{
            height: 1,
            width: 120,
            background: 'linear-gradient(90deg, rgba(176,16,32,0.08), #B01020, rgba(176,16,32,0.08))',
            transformOrigin: 'center',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: LINE_DELAY_S + 0.1, duration: LINE_DURATION_S * 0.8, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Subtext */}
        <motion.p
          className="text-base mt-6 max-w-md leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.55)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: SUBTEXT_DELAY_S, duration: 0.6, ease: 'easeOut' }}
        >
          {tr.hero.subtext}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4 mt-9 items-center justify-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: CTA_DELAY_S, duration: 0.6, ease: 'easeOut' }}
        >
          {/* Primary — shimmer */}
          <button
            className="relative overflow-hidden text-[10px] font-bold tracking-[3px] uppercase px-8 py-3.5 text-white"
            style={{ background: '#B01020' }}
            onClick={() => window.open(tr.cta.contactUrl, '_blank', 'noopener,noreferrer')}
          >
            <span className="relative z-10">{tr.hero.ctaPrimary}</span>
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
              }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
            />
          </button>

          {/* Secondary */}
          <button
            className="text-[10px] tracking-[3px] uppercase px-8 py-3.5 border transition-colors duration-200"
            style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.45)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(176,16,32,0.5)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.45)'
            }}
            onClick={() => document.getElementById('animated-ads')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {tr.hero.ctaSecondary}
          </button>
        </motion.div>
      </div>

      {/* ── Founders image — full-height background ── */}
      <style>{`
        .founders-img { height: 127%; width: auto; max-width: 95vw; }
        @media (max-width: 767px) {
          .founders-img { width: 124vw !important; height: auto !important; max-width: none !important; }
        }
      `}</style>
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: FOUNDERS_DELAY_S, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          src="/founders.webp"
          alt="Monika & Tomas — Fusion AI Creative"
          className="founders-img"
          style={{
            objectFit: 'contain',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 82% at 50% 50%, black 25%, transparent 85%)',
            maskImage: 'radial-gradient(ellipse 70% 82% at 50% 50%, black 25%, transparent 85%)',
            filter: 'brightness(0.75) contrast(1.1)',
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: FOUNDERS_DELAY_S + 1.6 }}
        />
      </motion.div>

      {/* ── Stats bar ── */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          borderTop: '1px solid rgba(176,16,32,0.15)',
          background: 'rgba(13,14,20,0.75)',
          backdropFilter: 'blur(10px)',
        }}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: STATS_DELAY_S, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-center flex-wrap gap-x-8 gap-y-2 py-4 px-6">
          {tr.hero.stats.map((stat, i) => (
            <div key={stat} className="flex items-center gap-8">
              <motion.span
                className="text-[10px] tracking-[3px] uppercase whitespace-nowrap"
                style={{ color: 'rgba(255,255,255,0.48)' }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: STATS_DELAY_S + 0.1 + i * 0.08, duration: 0.5 }}
              >
                {stat}
              </motion.span>
              {i < tr.hero.stats.length - 1 && (
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#B01020', flexShrink: 0, display: 'inline-block' }} />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 64,
          right: 48,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          zIndex: 10,
        }}
      >
        <span className="text-[9px] tracking-[3px] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Scroll
        </span>
        <motion.div
          style={{
            width: 1,
            height: 36,
            background: 'linear-gradient(to bottom, rgba(176,16,32,0.7), transparent)',
          }}
          animate={{ scaleY: [1, 0.35, 1], opacity: [1, 0.35, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  )
}
