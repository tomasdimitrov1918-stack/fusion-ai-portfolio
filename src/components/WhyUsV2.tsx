import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { useLanguage } from '../context/LanguageContext'
import { trackCustom } from '../lib/track'
import { scrollToLeadForm } from '../lib/variant'
import './WhyUsV2.css'

// "Why brands switch" value props, shown only on ?v=2 (under the brands marquee).
// A port of section 4 on aiads.fusioncreative.net; styles in WhyUsV2.css.

const EASE_OUT = [0.22, 1, 0.36, 1] as const
const REVEAL_DURATION_S = 0.6
const CARD_STAGGER_S = 0.1

const ICONS: ReactNode[] = [
  <path key="bolt" d="M13 2 4.5 13.5H11L9.5 22 18 10.5H11.5L13 2Z" />,
  <g key="coin">
    <circle cx="12" cy="12" r="9" />
    <path d="M15 8.5a3.5 3.5 0 0 0-3-1.5c-1.8 0-3 1-3 2.5s1.4 2.1 3 2.5 3 1 3 2.5-1.2 2.5-3 2.5a3.5 3.5 0 0 1-3-1.5M12 5.5v2M12 16.5v2" />
  </g>,
  <g key="target">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" />
  </g>,
]

export function WhyUsV2() {
  const { tr } = useLanguage()
  const w = tr.whyV2

  return (
    <section className="wv2" aria-labelledby="why-heading">
      <div className="wv2__container">
        <motion.div
          className="wv2__head"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: REVEAL_DURATION_S, ease: EASE_OUT }}
        >
          <p className="wv2__eyebrow">{w.eyebrow}</p>
          {/* Title rises out of an invisible fold. Driven by the parent's variants:
              the span itself sits clipped, so its own whileInView would never fire. */}
          <h2 className="wv2__title" id="why-heading">
            <motion.span
              style={{ display: 'inline-block' }}
              variants={{ hidden: { y: '110%' }, visible: { y: 0 } }}
              transition={{ duration: 0.8, delay: 0.12, ease: EASE_OUT }}
            >
              {w.title}
            </motion.span>
          </h2>
        </motion.div>

        <div className="wv2__grid">
          {w.cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: REVEAL_DURATION_S, delay: i * CARD_STAGGER_S, ease: EASE_OUT }}
            >
              <article className="wv2__card" data-num={String(i + 1).padStart(2, '0')}>
                <span className="wv2__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {ICONS[i]}
                  </svg>
                </span>
                <h3 className="wv2__card-title">{card.title}</h3>
                <p className="wv2__card-text">{card.text}</p>
              </article>
            </motion.div>
          ))}
        </div>

        {/* Early path to the form: ad visitors shouldn't have to scroll the whole portfolio */}
        <motion.div
          className="wv2__cta"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: REVEAL_DURATION_S, ease: EASE_OUT }}
        >
          <p className="wv2__cta-line">{w.ctaLine}</p>
          <button
            type="button"
            className="wv2__cta-btn"
            onClick={() => {
              trackCustom('GoToForm', { placement: 'why_us' })
              scrollToLeadForm()
            }}
          >
            {w.cta}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
