import { motion } from 'motion/react'
import { useLanguage } from '../context/LanguageContext'
import { track } from '../lib/track'
import './OfferV2.css'

// Monthly plan offer card, shown only on ?v=2, right under AboutUs.
// A port of section 6 on aiads.fusioncreative.net; styles in OfferV2.css.

const EASE_OUT = [0.22, 1, 0.36, 1] as const
const REVEAL_DURATION_S = 0.6

const CHECK_ICON = (
  <svg className="of__check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 12.5 9.5 18 20 6.5" />
  </svg>
)

export function OfferV2() {
  const { tr } = useLanguage()
  const o = tr.offerV2

  return (
    <section className="of" id="offer" aria-labelledby="offer-heading">
      <div className="of__container">
        <motion.div
          className="of__card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: REVEAL_DURATION_S, ease: EASE_OUT }}
        >
          <div>
            <p className="of__eyebrow">{o.eyebrow}</p>
            {/* Title rises out of an invisible fold, driven by the card's variants */}
            <h2 className="of__title" id="offer-heading">
              <motion.span
                style={{ display: 'inline-block' }}
                variants={{ hidden: { y: '110%' }, visible: { y: 0 } }}
                transition={{ duration: 0.8, delay: 0.12, ease: EASE_OUT }}
              >
                {o.title}
              </motion.span>
            </h2>
            <p className="of__sub">{o.sub}</p>

            <ul className="of__checklist">
              {o.checklist.map((item) => (
                <li key={item} className="of__item">
                  {CHECK_ICON}
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="of__side">
            <h3 className="of__side-title">{o.sideTitle}</h3>
            <p className="of__side-text">{o.sideText}</p>
            <button
              className="of__btn"
              onClick={() => {
                track('Contact', { content_name: 'contact_page', placement: 'offer' })
                window.open(tr.cta.contactUrl, '_blank', 'noopener,noreferrer')
              }}
            >
              {o.cta}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
            <p className="of__hint">{o.hint}</p>
          </aside>
        </motion.div>
      </div>
    </section>
  )
}
