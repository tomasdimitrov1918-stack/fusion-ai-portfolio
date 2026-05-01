import type { Variants } from 'motion/react'

// ── Timing constants ─────────────────────────────────────────────────────────
export const HERO_STAGGER_S = 0.15
export const HERO_SLIDE_DURATION_S = 0.7
export const HERO_EYEBROW_DURATION_S = 0.5
export const CARD_STAGGER_S = 0.08
export const CARD_REVEAL_DURATION_S = 0.5
export const TILT_MAX_DEG = 12
export const TILT_SPRING = { type: 'spring' as const, stiffness: 300, damping: 30 }
export const MARQUEE_DURATION_S = 28
export const GLOW_PULSE_DURATION_S = 2
export const CTA_RING_DURATION_S = 1.5
export const LIGHTBOX_DURATION_S = 0.25
export const LIGHTBOX_SCALE_HIDDEN = 0.95

// ── Hero variants ────────────────────────────────────────────────────────────
export const heroContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: HERO_STAGGER_S, delayChildren: 0.2 },
  },
}

export const heroItemVariants: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: HERO_SLIDE_DURATION_S,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export const heroEyebrowVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: HERO_EYEBROW_DURATION_S, ease: 'easeOut' },
  },
}

// ── Card grid variants ───────────────────────────────────────────────────────
export const cardContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: CARD_STAGGER_S },
  },
}

export const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: CARD_REVEAL_DURATION_S,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// ── Lightbox variants ────────────────────────────────────────────────────────
export const lightboxBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: LIGHTBOX_DURATION_S } },
  exit: { opacity: 0, transition: { duration: LIGHTBOX_DURATION_S } },
}

export const lightboxPanelVariants: Variants = {
  hidden: { opacity: 0, scale: LIGHTBOX_SCALE_HIDDEN },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: LIGHTBOX_DURATION_S, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: LIGHTBOX_SCALE_HIDDEN,
    transition: { duration: LIGHTBOX_DURATION_S, ease: 'easeIn' },
  },
}
