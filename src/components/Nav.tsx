import { useEffect, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { sections } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'

const NAV_BG = 'rgba(6,6,8,0.85)'

export function Nav() {
  const [activeId, setActiveId] = useState<string>('')
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, toggle, tr } = useLanguage()

  const navLinks = [
    ...sections.map(s => ({ id: s.id, title: s.title })),
    { id: 'static-ads', title: tr.nav.staticAds },
  ]

  useEffect(() => {
    const observers = navLinks.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { threshold: 0.4 },
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach((o) => o?.disconnect())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function scrollTo(e: MouseEvent, id: string) {
    e.preventDefault()
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-12 py-5 border-b border-white/5"
      style={{ background: NAV_BG, backdropFilter: 'blur(12px)' }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <img src="/logo.webp" alt="Fusion Creative" className="h-16 w-auto" />

      {/* Desktop links */}
      <div className="hidden md:flex gap-8 items-center">
        {navLinks.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={(e) => scrollTo(e, s.id)}
            aria-current={activeId === s.id ? 'true' : undefined}
            className="text-[10px] tracking-[3px] uppercase transition-colors duration-200 cursor-pointer"
            style={{ color: activeId === s.id ? '#fff' : 'rgba(255,255,255,0.4)' }}
          >
            {s.title}
          </a>
        ))}

        {/* Language toggle */}
        <button
          onClick={toggle}
          className="text-[10px] tracking-[3px] uppercase transition-colors duration-200 border rounded-full px-3 py-1"
          style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.55)' }}
        >
          {lang === 'bg' ? 'EN' : 'BG'}
        </button>
      </div>

      {/* Mobile: language toggle + hamburger */}
      <div className="flex md:hidden items-center gap-3">
        <button
          onClick={toggle}
          className="text-[10px] tracking-[3px] uppercase border rounded-full px-3 py-1"
          style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.55)' }}
        >
          {lang === 'bg' ? 'EN' : 'BG'}
        </button>
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? tr.nav.close : tr.nav.menu}
          aria-expanded={menuOpen}
          className="flex items-center justify-center w-9 h-9"
          style={{ color: '#fff' }}
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <div className="flex flex-col gap-[5px]">
              <span style={{ display: 'block', width: 22, height: 2, background: '#fff', borderRadius: 2 }} />
              <span style={{ display: 'block', width: 22, height: 2, background: '#fff', borderRadius: 2 }} />
              <span style={{ display: 'block', width: 22, height: 2, background: '#fff', borderRadius: 2 }} />
            </div>
          )}
        </button>
      </div>
    </motion.nav>

    {/* Mobile dropdown menu — compact panel under the nav, page stays visible.
        Sibling of nav so `fixed` maps to the viewport, not the transformed nav. */}
    <AnimatePresence>
      {menuOpen && (
        <>
          {/* Invisible catcher: tap outside the panel to close (doesn't dim the page) */}
          <div className="fixed inset-0 z-[55] md:hidden" onClick={() => setMenuOpen(false)} />

          <motion.div
            className="fixed left-0 right-0 z-[60] md:hidden flex flex-col items-center gap-5 px-8 pt-6 pb-8 border-b"
            style={{ top: 88, background: 'rgba(8,9,12,0.97)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.08)', boxShadow: '0 18px 40px rgba(0,0,0,0.5)' }}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {navLinks.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => scrollTo(e, s.id)}
                aria-current={activeId === s.id ? 'true' : undefined}
                className="text-[14px] font-bold uppercase tracking-[2px] cursor-pointer"
                style={{ color: activeId === s.id ? '#E01020' : '#fff' }}
              >
                {s.title}
              </a>
            ))}

            <a
              href="#contact"
              onClick={(e) => scrollTo(e, 'contact')}
              className="mt-2 text-[11px] font-bold tracking-[3px] uppercase px-8 py-3 text-white cursor-pointer"
              style={{ background: '#B01020' }}
            >
              {tr.nav.quote} →
            </a>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  )
}
