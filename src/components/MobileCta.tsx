import { useEffect, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useLanguage } from '../context/LanguageContext'

// Sticky "Get a quote" button, mobile only. Smooth-scrolls to the contacts
// section and hides itself once that section is on screen (so it never
// covers the contact buttons).
export function MobileCta() {
  const { tr } = useLanguage()
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const el = document.getElementById('contact')
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  function scrollToContact(e: MouseEvent) {
    e.preventDefault()
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
          <a
            href="#contact"
            onClick={scrollToContact}
            className="pointer-events-auto block text-center w-full text-[13px] font-bold tracking-[3px] uppercase py-4 text-white rounded-full"
            style={{ background: '#B01020', boxShadow: '0 8px 24px rgba(176,16,32,0.45)' }}
          >
            {tr.nav.quote} →
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
