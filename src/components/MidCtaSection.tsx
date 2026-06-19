import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

export function MidCtaSection() {
  const { tr } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      style={{
        background: '#0D0E14',
        borderTop: '1px solid rgba(176,16,32,0.18)',
        borderBottom: '1px solid rgba(176,16,32,0.18)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Red glow blob */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 200,
          background: 'radial-gradient(ellipse at center, rgba(176,16,32,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="px-6 sm:px-12 py-12 flex flex-col sm:flex-row items-center justify-between gap-8 relative z-10"
        style={{ maxWidth: 1280, margin: '0 auto' }}
      >
        {/* Left — text */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-2"
        >
          <p
            className="text-[10px] tracking-[4px] uppercase"
            style={{ color: '#B01020' }}
          >
            {tr.midCta.eyebrow}
          </p>
          <p
            className="text-[clamp(22px,3vw,36px)] font-black uppercase leading-none tracking-tight"
            style={{ color: '#fff' }}
          >
            {tr.midCta.headline}
          </p>
        </motion.div>

        {/* Right — button */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0"
        >
          <button
            className="relative overflow-hidden text-[10px] font-bold tracking-[3px] uppercase px-10 py-4 text-white whitespace-nowrap"
            style={{ background: '#B01020' }}
            onClick={() => window.open(tr.cta.contactUrl, '_blank', 'noopener,noreferrer')}
          >
            <span className="relative z-10">{tr.midCta.button}</span>
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
              }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
            />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
