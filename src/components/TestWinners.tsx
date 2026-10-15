import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { useLanguage } from '../context/LanguageContext'
import { trackCustom } from '../lib/track'
import { heroVariant, scrollToLeadForm, scrollToSection } from '../lib/variant'
import { TEST_GRID_ADS } from '../data/testGrid'
import './TestWinners.css'

// "More tests find more winners" (both versions, after the static ads). A code rebuild of the
// looping motion graphic on larven.ai (theirs is a 10 s mp4), using our real static ads as tiles:
//   reset → zoomed in, ~8 ads flip in, 1 winner → zoom out, 18 ads, 4 winners →
//   full 8×5 grid, 40 ads, 9 winners → losers flip back to blank, winners stay lit → loop.
// No made-up ROAS scores: winners get a red frame and a check instead.

const COLS = 8
const ROWS = 5
const TOTAL = COLS * ROWS
// Ranks (in reveal order) that turn out to be winners: 1 within the first 8, 4 within 18, 9 within 40
const WINNER_RANKS = new Set([3, 8, 12, 15, 20, 24, 28, 32, 37])
// Camera zoom per tier (origin top-left); reveal order fills the visible corner first
const TIER_SCALE = [2.4, 1.6, 1]

type Step = { tested: number; cleared: boolean; delay: number }

function buildSteps(): Step[] {
  const steps: Step[] = [{ tested: 0, cleared: false, delay: 700 }]
  for (let n = 1; n <= 8; n++) steps.push({ tested: n, cleared: false, delay: n === 8 ? 700 : 380 })
  for (let n = 9; n <= 18; n++) steps.push({ tested: n, cleared: false, delay: n === 18 ? 700 : 170 })
  for (let n = 19; n <= TOTAL; n++) steps.push({ tested: n, cleared: false, delay: n === TOTAL ? 900 : 75 })
  steps.push({ tested: TOTAL, cleared: true, delay: 3000 })
  return steps
}

const STEPS = buildSteps()
// Reduced motion: a single still frame of the full grid
const STILL_STEP = STEPS.findIndex((s) => s.tested === TOTAL && !s.cleared)

// Grid cell index → reveal rank: square "rings" out from the top-left corner, row by row
const RANK_BY_CELL: number[] = (() => {
  const cells = Array.from({ length: TOTAL }, (_, i) => ({ i, col: i % COLS, row: Math.floor(i / COLS) }))
  cells.sort((a, b) => Math.max(a.col, a.row) - Math.max(b.col, b.row) || a.row - b.row || a.col - b.col)
  const ranks = new Array<number>(TOTAL)
  cells.forEach((c, rank) => (ranks[c.i] = rank))
  return ranks
})()

const tierOf = (tested: number) => (tested < 10 ? 0 : tested < 20 ? 1 : 2)

// Number that slides up when it changes (like the rolling digits in the original)
function Rolling({ value, className }: { value: number; className: string }) {
  return (
    <span className={`tw__roll ${className}`}>
      <motion.span
        key={value}
        className="tw__roll-inner"
        initial={{ y: '70%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {value}
      </motion.span>
    </span>
  )
}

export function TestWinners() {
  const { tr } = useLanguage()
  const t = tr.tests
  const reduceMotion = useReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)
  const inView = useInView(cardRef, { amount: 0.35 })
  const [step, setStep] = useState(0)

  // Advance the loop only while the card is on screen
  useEffect(() => {
    if (reduceMotion || !inView) return
    const timer = window.setTimeout(() => setStep((s) => (s + 1) % STEPS.length), STEPS[step].delay)
    return () => window.clearTimeout(timer)
  }, [step, inView, reduceMotion])

  const { tested, cleared } = STEPS[reduceMotion ? STILL_STEP : step]
  const tier = tierOf(tested)
  const winners = useMemo(() => [...WINNER_RANKS].filter((r) => r < tested).length, [tested])

  return (
    <section className="tw" id="more-tests" aria-labelledby="tests-heading">
      <div className="tw__container">
        {/* ── Animated grid ── */}
        <div className="tw__visual">
          <div className="tw__card" ref={cardRef} role="img" aria-label={t.ariaLabel}>
            <div className="tw__head" aria-hidden="true">
              <div className="tw__head-row">
                <span className="tw__tier">{t.tiers[tier]}</span>
                <span className={`tw__pill${tier === 2 ? ' is-hot' : ''}`}>{t.tierPills[tier]}</span>
              </div>
              <div className="tw__head-row tw__head-row--counts">
                <span className="tw__count">
                  <Rolling value={tested} className="tw__num" />
                  <span className="tw__count-label">{t.tested}</span>
                </span>
                <span className="tw__count">
                  <Rolling value={winners} className="tw__num tw__num--red" />
                  <span className="tw__count-label">{winners === 1 ? t.winner : t.winners}</span>
                </span>
              </div>
              <div className="tw__bar">
                <div className={`tw__bar-fill tier-${tier}`} style={{ width: `${(tested / TOTAL) * 100}%` }} />
                <span className="tw__bar-mark" style={{ left: '25%' }} />
                <span className="tw__bar-mark" style={{ left: '50%' }} />
              </div>
            </div>

            <div className="tw__viewport" aria-hidden="true">
              <motion.div
                className="tw__grid"
                animate={{ scale: TIER_SCALE[tier] }}
                transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
              >
                {TEST_GRID_ADS.slice(0, TOTAL).map((ad, cell) => {
                  const rank = RANK_BY_CELL[cell]
                  const revealed = rank < tested
                  const isWinner = revealed && WINNER_RANKS.has(rank)
                  const state = !revealed || (cleared && !isWinner) ? 'empty' : isWinner ? 'winner' : 'ad'
                  return (
                    <div key={ad.src} className="tw__cell">
                      <motion.div
                        key={state}
                        className={`tw__tile is-${state}`}
                        initial={{ rotateY: 90, opacity: 0, scale: 0.85 }}
                        animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {state === 'empty' ? (
                          <span className="tw__placeholder">{t.placeholder}</span>
                        ) : (
                          <>
                            <img src={ad.src} alt="" loading="lazy" decoding="async" className="tw__img" />
                            {state === 'winner' && (
                              <span className="tw__badge">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M4 12.5 9.5 18 20 6.5" />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </motion.div>
                    </div>
                  )
                })}
              </motion.div>
            </div>
          </div>
          <p className="tw__note">{t.note}</p>
        </div>

        {/* ── Copy ── */}
        <div className="tw__copy">
          <p className="tw__eyebrow">{t.eyebrow}</p>
          <h2 className="tw__title" id="tests-heading">
            {t.title} <span className="tw__title-muted">{t.titleMuted}</span>
          </h2>
          <p className="tw__body">{t.body1}</p>
          <p className="tw__body">{t.body2}</p>
          <div className="tw__ctas">
            <button
              type="button"
              className="tw__btn tw__btn--primary"
              onClick={() => {
                trackCustom('GoToForm', { placement: 'more_tests' })
                scrollToLeadForm()
              }}
            >
              {t.cta}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
            {/* The monthly plan card only exists on V2 */}
            {heroVariant === 2 && (
              <button type="button" className="tw__btn tw__btn--ghost" onClick={() => scrollToSection('offer')}>
                {t.ctaPlan}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
