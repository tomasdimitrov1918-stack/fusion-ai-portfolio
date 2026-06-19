import { motion } from 'motion/react'
import { GLOW_PULSE_DURATION_S, CTA_RING_DURATION_S } from '../lib/animations'
import { useLanguage } from '../context/LanguageContext'

export function CtaSection() {
  const { tr } = useLanguage()

  return (
    <section
      className="relative px-12 py-24 text-center overflow-hidden border-t"
      style={{ background: '#191B26', borderColor: 'rgba(176,16,32,0.2)' }}
    >
      {/* Breathing glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(176,16,32,0.12) 0%, transparent 65%)',
        }}
        animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: GLOW_PULSE_DURATION_S, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10">
        <p className="text-[9px] tracking-[5px] uppercase mb-5" style={{ color: '#B01020' }}>
          {tr.cta.eyebrow}
        </p>

        <h2
          className="text-[clamp(32px,5vw,64px)] font-black uppercase leading-none tracking-tight mb-5"
          style={{ color: '#fff' }}
        >
          {tr.cta.line1}
          <br />
          <span style={{ color: '#E01020' }}>{tr.cta.line2}</span>
        </h2>

        <p className="text-sm max-w-sm mx-auto mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {tr.cta.bullet1}
          <br />
          {tr.cta.bullet2}
        </p>

        <motion.a
          href={tr.cta.contactUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-[11px] font-bold tracking-[3px] uppercase px-12 py-4 text-white"
          style={{ background: '#B01020' }}
          animate={{
            boxShadow: [
              '0 0 0 0px rgba(176,16,32,0.5)',
              '0 0 0 14px rgba(176,16,32,0)',
            ],
          }}
          transition={{
            duration: CTA_RING_DURATION_S,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          whileHover={{ background: '#E01020' }}
        >
          {tr.cta.button}
        </motion.a>
      </div>
    </section>
  )
}
