import { motion, useInView } from 'motion/react'
import { useEffect, useState, useRef } from 'react'
import type React from 'react'

const TOOLS = [
  'Kling 3.0', 'VEO 3.1', 'Sora Pro', 'Nano Banana Pro',
  'ElevenLabs', 'CapCut', 'Seedance 2.0', 'ChatGPT Image 2.0', 'Higgsfield',
]

const BASE_STYLE: React.CSSProperties = {
  padding: '10px 20px',
  border: '1px solid rgba(176,16,32,0.35)',
  background: 'rgba(176,16,32,0.06)',
  color: 'rgba(255,255,255,0.75)',
  boxShadow: '0 0 12px rgba(176,16,32,0.15), inset 0 0 12px rgba(176,16,32,0.04)',
  cursor: 'default',
}

function TypewriterChip({ tool, delay }: { tool: string; delay: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [chars, setChars] = useState(0)

  useEffect(() => {
    if (!inView) return
    let interval: ReturnType<typeof setInterval>
    const timeout = setTimeout(() => {
      let i = 0
      interval = setInterval(() => {
        i++
        setChars(i)
        if (i >= tool.length) clearInterval(interval)
      }, 55)
    }, delay * 1000)
    return () => { clearTimeout(timeout); clearInterval(interval) }
  }, [inView, tool, delay])

  return (
    <div
      ref={ref}
      className="text-[11px] tracking-[3px] uppercase relative overflow-hidden"
      style={{ ...BASE_STYLE, transition: 'border-color 0.25s, box-shadow 0.25s, color 0.25s', minWidth: `${tool.length * 8 + 40}px` }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.borderColor = 'rgba(224,16,32,0.7)'
        el.style.color = '#fff'
        el.style.boxShadow = '0 0 20px rgba(224,16,32,0.3), inset 0 0 16px rgba(224,16,32,0.08)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.borderColor = 'rgba(176,16,32,0.35)'
        el.style.color = 'rgba(255,255,255,0.75)'
        el.style.boxShadow = '0 0 12px rgba(176,16,32,0.15), inset 0 0 12px rgba(176,16,32,0.04)'
      }}
    >
      {/* Border draw */}
      <motion.div
        style={{
          position: 'absolute', inset: 0,
          border: '1px solid #E01020',
          boxShadow: '0 0 12px rgba(224,16,32,0.4)',
        }}
        initial={{ clipPath: 'inset(0 100% 100% 0)' }}
        animate={inView ? { clipPath: 'inset(0 0% 0% 0)' } : {}}
        transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Typewriter text */}
      <span>
        {tool.slice(0, chars)}
        {chars < tool.length && inView && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            style={{ borderRight: '1px solid #E01020', marginLeft: 1 }}
          />
        )}
      </span>
    </div>
  )
}

export function ToolsMarquee() {
  return (
    <section style={{ background: '#0D0E14', padding: '56px 48px' }}>
      <p className="text-[10px] tracking-[5px] uppercase mb-8" style={{ color: 'rgba(255,255,255,0.28)' }}>
        Инструменти, с които работим
      </p>
      <div className="flex flex-wrap gap-3">
        {TOOLS.map((tool, i) => (
          <TypewriterChip key={tool} tool={tool} delay={i * 0.15} />
        ))}
      </div>
    </section>
  )
}
