import { motion } from 'motion/react'

// Pre-seeded stable dot positions (avoids re-randomizing on render)
const DOTS = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  x: (i * 37.3 + 13.7) % 100,
  y: (i * 53.1 + 7.3) % 100,
  delay: (i * 0.23) % 2,
  duration: 3 + (i * 0.17) % 2,
}))

export function NoiseOverlay() {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.13,
      }}
    >
      <filter id="site-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#site-noise)" />
    </svg>
  )
}

export function FloatingDots() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      {DOTS.map((dot) => (
        <motion.div
          key={dot.id}
          style={{
            position: 'absolute',
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: '#B01020',
          }}
          animate={{ y: [0, -18, 0], opacity: [0.22, 0.45, 0.22] }}
          transition={{ duration: dot.duration, repeat: Infinity, delay: dot.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
