import { describe, it, expect } from 'vitest'
import {
  HERO_STAGGER_S,
  HERO_SLIDE_DURATION_S,
  CARD_STAGGER_S,
  CARD_REVEAL_DURATION_S,
  TILT_MAX_DEG,
  MARQUEE_DURATION_S,
  heroContainerVariants,
  heroItemVariants,
  cardContainerVariants,
  cardItemVariants,
} from './animations'

describe('animation constants', () => {
  it('exports positive numeric constants', () => {
    expect(HERO_STAGGER_S).toBeGreaterThan(0)
    expect(HERO_SLIDE_DURATION_S).toBeGreaterThan(0)
    expect(CARD_STAGGER_S).toBeGreaterThan(0)
    expect(CARD_REVEAL_DURATION_S).toBeGreaterThan(0)
    expect(TILT_MAX_DEG).toBeGreaterThan(0)
    expect(MARQUEE_DURATION_S).toBeGreaterThan(0)
  })

  it('heroContainerVariants has hidden and visible states', () => {
    expect(heroContainerVariants.hidden).toBeDefined()
    expect(heroContainerVariants.visible).toBeDefined()
  })

  it('cardItemVariants hidden state has opacity 0', () => {
    expect(cardItemVariants.hidden).toMatchObject({ opacity: 0 })
  })

  it('heroItemVariants hidden state has opacity 0', () => {
    expect(heroItemVariants.hidden).toMatchObject({ opacity: 0 })
  })

  it('cardContainerVariants has hidden and visible states', () => {
    expect(cardContainerVariants.hidden).toBeDefined()
    expect(cardContainerVariants.visible).toBeDefined()
  })
})
