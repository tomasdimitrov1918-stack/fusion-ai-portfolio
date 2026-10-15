import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { useLanguage } from '../context/LanguageContext'
import { trackCustom } from '../lib/track'
import { scrollToLeadForm, scrollToSection } from '../lib/variant'
import './ProblemsSolved.css'

// "Problems solved" rows, both versions, between the video sections and the process.
// Design and mechanics adapted from the "Why Larven AI" section on larven.ai, in Fusion's
// branding: as each row scrolls past the trigger line, its problem gets struck through in
// red, its answer fades in, and the "00/06 решени" counter climbs. Scrolling back up undoes it.

// A row counts as solved once its top is above this fraction of the viewport height
const SOLVE_LINE = 0.6

export function ProblemsSolved() {
  const { tr } = useLanguage()
  const p = tr.problems
  const reduceMotion = useReducedMotion()
  const rowRefs = useRef<(HTMLLIElement | null)[]>([])
  const [solved, setSolved] = useState<boolean[]>(() => p.rows.map(() => false))

  useEffect(() => {
    if (reduceMotion) {
      setSolved(p.rows.map(() => true))
      return
    }
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * SOLVE_LINE
      const next = rowRefs.current.map((el) => !!el && el.getBoundingClientRect().top < line)
      setSolved((prev) => (prev.every((v, i) => v === next[i]) ? prev : next))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [reduceMotion, p.rows])

  const total = String(p.rows.length).padStart(2, '0')
  const count = String(solved.filter(Boolean).length).padStart(2, '0')

  return (
    <section className="ps" id="problems" aria-labelledby="problems-heading">
      <div className="ps__line" aria-hidden="true" />
      <div className="ps__haze" aria-hidden="true" />

      <div className="ps__container">
        <div className="ps__head">
          <div>
            <p className="ps__eyebrow">{p.eyebrow}</p>
            <h2 className="ps__title" id="problems-heading">
              {p.title} <span className="ps__title-muted">{p.titleMuted}</span>
            </h2>
          </div>
          <div className="ps__intros">
            <p className="ps__intro">{p.intro}</p>
            <p className="ps__intro">{p.intro2}</p>
          </div>
        </div>

        <div className="ps__table">
          <div className="ps__cols">
            <span>{p.colProblem}</span>
            <span className="ps__cols-right">
              <span className="ps__cols-solution">{p.colSolution}</span>
              <span className="ps__counter" aria-hidden="true">
                {count}/{total} {p.solved}
              </span>
            </span>
          </div>

          <ol className="ps__list">
            {p.rows.map((row, i) => (
              <li
                key={row.problem}
                ref={(el) => {
                  rowRefs.current[i] = el
                }}
                className={`ps__row${solved[i] ? ' is-solved' : ''}`}
              >
                <div className="ps__wash" aria-hidden="true" />
                <div className="ps__row-left">
                  <span className="ps__index">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="ps__problem-heading">
                    <span className="ps__problem">{row.problem}</span>
                  </h3>
                </div>
                <div className="ps__answer">
                  <div className="ps__solved-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 12.5 9.5 18 20 6.5" />
                    </svg>
                    {p.solvedLabel}
                  </div>
                  <p className="ps__solution">{row.solution}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="ps__ctas">
          <button
            type="button"
            className="ps__btn ps__btn--primary"
            onClick={() => {
              trackCustom('GoToForm', { placement: 'problems' })
              scrollToLeadForm()
            }}
          >
            {p.cta}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
          <button type="button" className="ps__btn ps__btn--ghost" onClick={() => scrollToSection('process')}>
            {p.ctaSecondary}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 5v14M6 13l6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
