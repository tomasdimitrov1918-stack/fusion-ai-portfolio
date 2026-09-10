import { describe, it, expect } from 'vitest'
import { sections } from './portfolio'

const byId = (id: string) => sections.find((s) => s.id === id)!

function countBySub(id: string) {
  const counts: Record<string, number> = {}
  for (const v of byId(id).items) counts[v.sub ?? '∅'] = (counts[v.sub ?? '∅'] ?? 0) + 1
  return counts
}

describe('portfolio data', () => {
  it('has 3 sections', () => {
    expect(sections).toHaveLength(3)
  })

  it('animated-ads section has 71 items', () => {
    expect(byId('animated-ads').items).toHaveLength(71)
  })

  it('ugc-ads section has 30 items', () => {
    expect(byId('ugc-ads').items).toHaveLength(30)
  })

  it('product-ads section has 4 items', () => {
    expect(byId('product-ads').items).toHaveLength(4)
  })

  it('every item has a non-empty videoUrl', () => {
    sections.forEach((section) => {
      section.items.forEach((v) => {
        expect(v.videoUrl.length).toBeGreaterThan(0)
      })
    })
  })
})

describe('video subcategories', () => {
  it('every animated and ugc video belongs to one of its section subcategories', () => {
    for (const id of ['animated-ads', 'ugc-ads']) {
      const s = byId(id)
      expect(s.subcategories?.length).toBeGreaterThan(1)
      s.items.forEach((v) => expect(s.subcategories).toContain(v.sub))
    }
  })

  it('animated subcategory counts match the review', () => {
    expect(countBySub('animated-ads')).toEqual({
      'Talking Products': 20,
      'Ingredients & Body': 19,
      'Story-Driven': 18,
      'Clay & Stop-Motion': 6,
      '2D Videos': 3,
      'Cinematic Premium': 5,
    })
  })

  it('ugc subcategory counts match the review', () => {
    expect(countBySub('ugc-ads')).toEqual({
      Testimonials: 8,
      'Expert / Doctor': 5,
      'Skits & TV Formats': 9,
      'Lifestyle & Product': 8,
    })
  })

  it('spot-checks specific assignments', () => {
    const sub = (id: string, n: string) => byId(id).items.find((v) => v.id.endsWith(`-${n}`))!.sub
    expect(sub('animated-ads', '50')).toBe('Cinematic Premium')
    expect(sub('animated-ads', '30')).toBe('2D Videos')
    expect(sub('animated-ads', '63')).toBe('Ingredients & Body')
    expect(sub('ugc-ads', '25')).toBe('Skits & TV Formats')
  })

  it('product section has no subcategories', () => {
    expect(byId('product-ads').subcategories).toBeUndefined()
  })
})
