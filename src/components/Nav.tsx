import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { sections } from '../data/portfolio'

const NAV_BG = 'rgba(6,6,8,0.85)'

export function Nav() {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observers = sections.map((section) => {
      const el = document.getElementById(section.id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(section.id)
        },
        { threshold: 0.4 },
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

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

      <div className="hidden md:flex gap-8">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="text-[10px] tracking-[3px] uppercase transition-colors duration-200"
            style={{ color: activeId === s.id ? '#fff' : 'rgba(255,255,255,0.4)' }}
          >
            {s.title}
          </button>
        ))}
      </div>

      <a
        href="mailto:hello@fusion.ai"
        className="text-[9px] font-bold tracking-[2px] uppercase px-5 py-2.5 transition-colors duration-200"
        style={{ background: '#B01020' }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#E01020')}
        onMouseLeave={(e) => (e.currentTarget.style.background = '#B01020')}
      >
        Разкажи ни →
      </a>
    </motion.nav>
  )
}
