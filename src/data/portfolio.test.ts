import { describe, it, expect } from 'vitest'
import { videoItems, sections } from './portfolio'

describe('portfolio data', () => {
  it('has 11 video items (pages 2–12)', () => {
    expect(videoItems).toHaveLength(11)
  })

  it('has 4 sections', () => {
    expect(sections).toHaveLength(4)
  })

  it('animated-ads section has 5 items', () => {
    const s = sections.find((s) => s.id === 'animated-ads')!
    expect(s.items).toHaveLength(5)
  })

  it('ugc-ads section has 4 items', () => {
    const s = sections.find((s) => s.id === 'ugc-ads')!
    expect(s.items).toHaveLength(4)
  })

  it('every item has a non-empty thumbnailUrl', () => {
    videoItems.forEach((v) => {
      expect(v.thumbnailUrl.length).toBeGreaterThan(0)
    })
  })
})
