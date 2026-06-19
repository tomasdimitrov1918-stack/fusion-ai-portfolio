import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

function StepRow({
  step,
  index,
  isLast,
}: {
  step: { num: string; title: string; tag: string; body: string }
  index: number
  isLast: boolean
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        paddingTop: 32,
        paddingBottom: 32,
        gap: '0 24px',
      }}
    >
      {/* Number + connector line */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 2 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: 3,
            color: '#E01020',
            textTransform: 'uppercase',
          }}
        >
          {step.num}
        </span>
        {!isLast && (
          <div
            style={{
              width: 1,
              flex: 1,
              minHeight: 32,
              marginTop: 12,
              background: 'rgba(176,16,32,0.25)',
            }}
          />
        )}
      </div>

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
          <h3
            style={{
              fontSize: 'clamp(15px, 2vw, 18px)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              color: '#fff',
              margin: 0,
            }}
          >
            {step.title}
          </h3>
          <span
            style={{
              fontSize: 9,
              letterSpacing: 2,
              textTransform: 'uppercase',
              padding: '4px 10px',
              background: 'rgba(176,16,32,0.12)',
              color: '#B01020',
              border: '1px solid rgba(176,16,32,0.28)',
            }}
          >
            {step.tag}
          </span>
        </div>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.5)',
            maxWidth: 520,
            margin: 0,
          }}
        >
          {step.body}
        </p>
      </div>
    </motion.div>
  )
}

export function ProcessSection() {
  const { tr } = useLanguage()
  const p = tr.process

  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true, margin: '-60px' })
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-40px' })

  const stats = [
    { label: p.statDeadlineLabel, value: p.statDeadlineValue },
    { label: p.statCapacityLabel, value: p.statCapacityValue },
    { label: p.statRevisionsLabel, value: p.statRevisionsValue },
  ]

  return (
    <section style={{ background: '#0D0E14', padding: '80px 48px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        {/* Heading */}
        <div ref={headRef}>
          <motion.p
            style={{
              fontSize: 10,
              letterSpacing: 5,
              textTransform: 'uppercase',
              color: '#B01020',
              marginBottom: 16,
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            {p.eyebrow}
          </motion.p>

          <motion.h2
            style={{
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              color: '#fff',
              margin: 0,
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {p.line1}
          </motion.h2>
          <motion.h2
            style={{
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              color: '#E01020',
              marginTop: 4,
              marginBottom: 48,
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {p.line2}
          </motion.h2>
        </div>

        {/* Steps */}
        <div>
          {p.steps.map((step, i) => (
            <StepRow
              key={step.num}
              step={step}
              index={i}
              isLast={i === p.steps.length - 1}
            />
          ))}
        </div>

        {/* Stat boxes */}
        <motion.div
          ref={statsRef}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: 48 }}
          initial={{ opacity: 0, y: 16 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                padding: '20px 28px',
                border: '1px solid rgba(176,16,32,0.22)',
                background: 'rgba(176,16,32,0.05)',
                flex: '1 1 160px',
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.32)',
                }}
              >
                {s.label}
              </span>
              <span
                style={{
                  fontSize: 'clamp(15px, 2vw, 18px)',
                  fontWeight: 900,
                  color: '#fff',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                }}
              >
                {s.value}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
