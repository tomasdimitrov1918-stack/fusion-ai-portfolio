import { describe, it, expect } from 'vitest'
import { sections } from './portfolio'

describe('portfolio data', () => {
  it('has 3 sections', () => {
    expect(sections).toHaveLength(3)
  })

  it('animated-ads section has 20 items', () => {
    const s = sections.find((s) => s.id === 'animated-ads')!
    expect(s.items).toHaveLength(20)
  })

  it('ugc-ads section has 10 items', () => {
    const s = sections.find((s) => s.id === 'ugc-ads')!
    expect(s.items).toHaveLength(10)
  })

  it('product-ads section has 4 items', () => {
    const s = sections.find((s) => s.id === 'product-ads')!
    expect(s.items).toHaveLength(4)
  })

  it('every item has a non-empty videoUrl', () => {
    sections.forEach((section) => {
      section.items.forEach((v) => {
        expect(v.videoUrl.length).toBeGreaterThan(0)
      })
    })
  })
})
