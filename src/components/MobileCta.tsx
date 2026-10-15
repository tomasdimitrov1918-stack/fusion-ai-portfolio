import { useEffect, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useLanguage } from '../context/LanguageContext'
import { trackCustom } from '../lib/track'
import { heroVariant, scrollToLeadForm } from '../lib/variant'

// Sticky CTA, mobile only.
// V1: "Get a quote" → smooth-scrolls to the contacts; hides while the contacts are on screen.
// V2: the hero's button ("Вземи оферта за твоя бизнес", same look) → scrolls to the lead form.
//     Hides while the hero buttons, the form or the contacts are on screen, so it never
//     doubles up with another CTA (on a phone the hero showed three at once).
const HIDE_WHEN_VISIBLE = heroVariant === 2 ? ['.hv2__ctas', '#lead-form', '#contact'] : ['#contact']

export function MobileCta() {
  const { tr } = useLanguage()
  const [hidden, setHidden] = useState(heroVariant === 2) // V2 starts hidden: hero buttons are on screen

  useEffect(() => {
    const els = HIDE_WHEN_VISIBLE.map((sel) => document.querySelector(sel)).filter((el): el is Element => !!el)
    if (!els.length) return
    const onScreen = new Set<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => (entry.isIntersecting ? onScreen.add(entry.target) : onScreen.delete(entry.target)))
        setHidden(onScreen.size > 0)
      },
      { threshold: 0.15 },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  function onClick(e: MouseEvent) {
    e.preventDefault()
    if (heroVariant === 2) {
      trackCustom('GoToForm', { placement: 'mobile_sticky' })
      scrollToLeadForm()
      return
    }
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden px-4 pb-4 pt-6 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(6,6,8,0.9), transparent)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {heroVariant === 2 ? (
            <a
              href="#lead-form"
              onClick={onClick}
              className="pointer-events-auto flex items-center justify-center gap-[10px] w-full text-white"
              style={{
                minHeight: 56,
                padding: '16px 24px',
                borderRadius: 12,
                background: '#E01020',
                boxShadow: '0 8px 28px rgba(224, 16, 32, 0.35)',
                fontFamily: '"Montserrat", "Segoe UI", system-ui, sans-serif',
                fontSize: '1rem',
                fontWeight: 800,
                lineHeight: 1.2,
              }}
            >
              {tr.heroV2.ctaPrimary}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          ) : (
            <a
              href="#contact"
              onClick={onClick}
              className="pointer-events-auto block text-center w-full text-[13px] font-bold tracking-[3px] uppercase py-4 text-white rounded-full"
              style={{ background: '#B01020', boxShadow: '0 8px 24px rgba(176,16,32,0.45)' }}
            >
              {tr.nav.quote} →
            </a>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
