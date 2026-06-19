import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { sections } from '../data/portfolio'
import { useLanguage } from '../context/LanguageContext'

const NAV_BG = 'rgba(6,6,8,0.85)'

export function Nav() {
  const [activeId, setActiveId] = useState<string>('')
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

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-5 border-b border-white/5"
      style={{ background: NAV_BG, backdropFilter: 'blur(12px)' }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <img src="/logo.webp" alt="Fusion Creative" className="h-16 w-auto" />

      <div className="hidden md:flex gap-8 items-center">
        {navLinks.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="text-[10px] tracking-[3px] uppercase transition-colors duration-200"
            style={{ color: activeId === s.id ? '#fff' : 'rgba(255,255,255,0.4)' }}
          >
            {s.title}
          </button>
        ))}

        {/* Language toggle */}
        <button
          onClick={toggle}
          className="text-[10px] tracking-[3px] uppercase transition-colors duration-200 border rounded-full px-3 py-1"
          style={{
            borderColor: 'rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.55)',
          }}
        >
          {lang === 'bg' ? 'EN' : 'BG'}
        </button>
      </div>
    </motion.nav>
  )
}
