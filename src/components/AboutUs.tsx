import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { useLanguage } from '../context/LanguageContext'
import './AboutUs.css'

// "Who we are" section, shown on both versions right after the static ads.
// A port of section 5b on aiads.fusioncreative.net; styles in AboutUs.css.

const EASE_OUT = [0.22, 1, 0.36, 1] as const
const REVEAL_DURATION_S = 0.6

const reveal = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }

function Reveal({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={reveal}
      transition={{ duration: REVEAL_DURATION_S, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}

export function AboutUs() {
  const { tr } = useLanguage()
  const a = tr.about

  return (
    <section className="ab" id="about" aria-labelledby="about-heading">
      <div className="ab__container">
        <div className="ab__grid">
          <div>
            <Reveal className="ab__head">
              <p className="ab__eyebrow">{a.eyebrow}</p>
              {/* Title rises out of an invisible fold, driven by the parent's variants */}
              <h2 className="ab__title" id="about-heading">
                <motion.span
                  style={{ display: 'inline-block' }}
                  variants={{ hidden: { y: '110%' }, visible: { y: 0 } }}
                  transition={{ duration: 0.8, delay: 0.12, ease: EASE_OUT }}
                >
                  {a.title}
                </motion.span>
              </h2>
            </Reveal>

            <Reveal className="ab__copy">
              {a.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </Reveal>

            <Reveal>
              <ul className="ab__chips">
                {a.founders.map((f) => (
                  <li key={f.name} className="ab__chip">
                    <span className="ab__avatar" aria-hidden="true">{f.initial}</span>
                    <span className="ab__chip-meta">
                      <span className="ab__chip-name">{f.name}</span>
                      <span className="ab__chip-role">{f.role}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <dl className="ab__stats">
                {a.stats.map((s) => (
                  <div key={s.label} className="ab__stat">
                    <dt className="ab__stat-label">{s.label}</dt>
                    <dd className="ab__stat-value">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal className="ab__media">
            <figure className="ab__portrait">
              <img src="/founders.webp" alt={a.imageAlt} width={570} height={760} loading="lazy" decoding="async" />
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
