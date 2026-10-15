import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useLanguage } from '../context/LanguageContext'
import { trackCustom } from '../lib/track'
import { scrollToLeadForm } from '../lib/variant'
import './HeroV2.css'

// Hero version 2, shown on ?v=2 (see lib/variant.ts). A port of the hero on
// aiads.fusioncreative.net; styles live in HeroV2.css, scoped under .hv2.

const COUNT_DURATION_MS = 1400

// ── Stat count-up: 0 → value on first view (instant under reduced motion) ──
function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduceMotion = useReducedMotion()
  const [shown, setShown] = useState(reduceMotion ? value : 0)

  useEffect(() => {
    const el = ref.current
    if (!el || reduceMotion) {
      setShown(value)
      return
    }
    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        let start: number | null = null
        const step = (ts: number) => {
          if (start === null) start = ts
          const p = Math.min(1, (ts - start) / COUNT_DURATION_MS)
          setShown(Math.round(value * (1 - Math.pow(1 - p, 3)))) // easeOutCubic
          if (p < 1) frame = requestAnimationFrame(step)
        }
        frame = requestAnimationFrame(step)
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value, reduceMotion])

  return <span ref={ref}>{shown}</span>
}

// ── Component ─────────────────────────────────────────────────────────────
export function HeroV2() {
  const { tr } = useLanguage()
  const h = tr.heroV2
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  // Scroll-out: content sinks, shrinks and fades; glow drifts up slower
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const p = useTransform(scrollYProgress, [0, 0.85], [0, 1], { clamp: true })
  const innerY = useTransform(p, [0, 1], [0, 44])
  const innerScale = useTransform(p, [0, 1], [1, 0.94])
  const innerOpacity = useTransform(p, [0, 1], [1, 0.4])
  const glowY = useTransform(p, [0, 1], [0, -140])

  return (
    <section ref={sectionRef} className="hv2" aria-labelledby="hero-heading">
      <motion.div
        className="hv2__glow"
        aria-hidden="true"
        style={reduceMotion ? { x: '-50%' } : { x: '-50%', y: glowY }}
      />
      <div className="hv2__container">
        <motion.div
          className="hv2__inner"
          style={reduceMotion ? undefined : { y: innerY, scale: innerScale, opacity: innerOpacity }}
        >
          <p className="hv2__pill hv2__anim hv2__anim-1">{h.eyebrow}</p>

          <h1 className="hv2__title hv2__anim hv2__anim-2" id="hero-heading">
            {h.title}
            <br className="hv2__br" />{' '}
            <span className="hv2__accent">
              {h.titleAccent.replace(/ /g, ' ')}
              <svg className="hv2__underline" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
                <path d="M3 9 C 80 2, 220 2, 297 7" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="hv2__sub hv2__anim hv2__anim-3">{h.sub}</p>

          <div className="hv2__ctas hv2__anim hv2__anim-4">
            <button
              className="hv2__btn hv2__btn--primary"
              onClick={() => {
                trackCustom('GoToForm', { placement: 'hero' })
                scrollToLeadForm()
              }}
            >
              {h.ctaPrimary}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
            <a
              className="hv2__btn hv2__btn--ghost"
              href="#animated-ads"
              onClick={(e) => {
                e.preventDefault()
                trackCustom('HeroClick', { button: 'see_work' })
                document.getElementById('animated-ads')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {h.ctaSecondary}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </a>
          </div>

          {/* Free-sample hook: the strongest conversion reason, visible in the first 3 seconds */}
          <p className="hv2__hook hv2__anim hv2__anim-4">
            <svg className="hv2__hook-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12.5 9.5 18 20 6.5" />
            </svg>
            {h.hook}
          </p>

          <dl className="hv2__stats hv2__anim hv2__anim-5">
            {h.stats.map((stat) => (
              <div key={stat.label} className="hv2__stat">
                <dt className="hv2__stat-label">{stat.label}</dt>
                <dd className="hv2__stat-value">
                  <CountUp value={stat.value} />
                  <span className="hv2__stat-suffix">{stat.suffix}</span>
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  )
}
