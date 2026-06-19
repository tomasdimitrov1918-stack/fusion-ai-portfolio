import { useState, useMemo, useEffect, useCallback } from 'react'
import { ADS, CONCEPTS, type AdConcept } from '../data/staticAds'
import { useLanguage } from '../context/LanguageContext'

export function StaticAdsSection() {
  const [activeConcept, setActiveConcept] = useState<AdConcept>(CONCEPTS[0])
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const { tr } = useLanguage()
  const s = tr.staticAds

  const brandGroups = useMemo(() => {
    const filtered = ADS.filter(ad => ad.concept === activeConcept)
    const map = new Map<string, string[]>()
    for (const ad of filtered) {
      if (!map.has(ad.brand)) map.set(ad.brand, [])
      map.get(ad.brand)!.push(ad.src)
    }
    return Array.from(map.entries())
  }, [activeConcept])

  const allImages = useMemo(
    () => brandGroups.flatMap(([brand, srcs]) => srcs.map(src => ({ brand, src }))),
    [brandGroups]
  )

  const conceptCounts = useMemo(() => {
    const counts: Partial<Record<AdConcept, number>> = {}
    for (const concept of CONCEPTS) {
      counts[concept] = ADS.filter(ad => ad.concept === concept).length
    }
    return counts
  }, [])

  useEffect(() => { setLightboxIndex(null) }, [activeConcept])

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prev = useCallback(() => setLightboxIndex(i => (i !== null && i > 0 ? i - 1 : i)), [])
  const next = useCallback(() => setLightboxIndex(i => (i !== null && i < allImages.length - 1 ? i + 1 : i)), [allImages.length])

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex, prev, next, closeLightbox])

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  let globalIdx = 0
  const brandGroupsWithIdx = brandGroups.map(([brand, srcs]) => ({
    brand,
    images: srcs.map(src => ({ src, idx: globalIdx++ })),
  }))

  const totalVisible = allImages.length

  return (
    <section id="static-ads" style={{ background: '#0D0E14', position: 'relative', zIndex: 2 }}>

      {/* ── Header ── */}
      <div style={{ padding: '64px 48px 32px' }}>
        <p style={{ fontSize: 10, letterSpacing: '5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: 12 }}>
          {s.portfolioLabel}
        </p>
        <h2
          className="text-[clamp(28px,4vw,48px)] font-black uppercase leading-none tracking-tight"
          style={{ color: '#fff' }}
        >
          {s.heading[0]} <span style={{ color: '#B01020' }}>{s.heading[1]}</span>
          <br />{s.heading[2]}
        </h2>
        <div style={{ height: 1, width: 64, marginTop: 16, background: 'linear-gradient(90deg, #B01020, transparent)' }} />
      </div>

      {/* ── Filter bar ── */}
      <div style={{ padding: '0 48px 32px' }}>
        <p style={{
          fontSize: 9,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.22)',
          marginBottom: 12,
        }}>
          {s.filterLabel}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {CONCEPTS.filter(concept => (conceptCounts[concept] ?? 0) > 0).map(concept => {
            const isActive = activeConcept === concept
            const count = conceptCounts[concept] ?? 0
            return (
              <button
                key={concept}
                onClick={() => setActiveConcept(concept)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '8px 14px',
                  borderRadius: 999,
                  fontSize: 10,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'background 0.18s, border-color 0.18s, color 0.18s',
                  border: isActive ? '1px solid #B01020' : '1px solid rgba(255,255,255,0.1)',
                  background: isActive ? '#B01020' : 'rgba(255,255,255,0.04)',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.42)',
                  fontWeight: isActive ? 700 : 400,
                }}
              >
                {concept}
                <span style={{
                  fontSize: 9,
                  lineHeight: 1,
                  padding: '2px 5px',
                  borderRadius: 20,
                  letterSpacing: 0,
                  fontWeight: 600,
                  background: isActive ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.07)',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.35)',
                }}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Results summary ── */}
      <div style={{ paddingLeft: 48, paddingRight: 48, paddingBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ height: 1, width: 20, background: '#B01020', flexShrink: 0 }} />
        <p style={{ fontSize: 9, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: 0 }}>
          {activeConcept} · {totalVisible} {totalVisible === 1 ? s.countSingular : s.countPlural}
        </p>
      </div>

      {/* ── Brand groups ── */}
      <div style={{ padding: '0 48px 64px' }}>
        {brandGroupsWithIdx.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12, letterSpacing: 3, textTransform: 'uppercase' }}>
            {s.empty}
          </p>
        ) : (
          brandGroupsWithIdx.map(({ brand, images }) => (
            <div key={brand} style={{ marginBottom: 52 }}>

              {/* Brand header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <span style={{
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  color: 'rgba(255,255,255,0.85)',
                  whiteSpace: 'nowrap',
                }}>
                  {brand}
                </span>
                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
                <span style={{
                  fontSize: 9,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.2)',
                  whiteSpace: 'nowrap',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 20,
                  padding: '3px 10px',
                }}>
                  {images.length} {images.length === 1 ? s.countSingular : s.countPlural}
                </span>
              </div>

              {/* Ad grid */}
              <div style={{
                display: 'grid',
                gap: 10,
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              }}>
                {images.map(({ src, idx }) => (
                  <div
                    key={src}
                    onClick={() => setLightboxIndex(idx)}
                    title={s.hoverHint}
                    style={{
                      borderRadius: 4,
                      overflow: 'hidden',
                      border: '1px solid rgba(255,255,255,0.06)',
                      transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
                      cursor: 'zoom-in',
                      position: 'relative',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget
                      el.style.transform = 'scale(1.03)'
                      el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.6)'
                      el.style.borderColor = 'rgba(176,16,32,0.35)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget
                      el.style.transform = 'scale(1)'
                      el.style.boxShadow = 'none'
                      el.style.borderColor = 'rgba(255,255,255,0.06)'
                    }}
                  >
                    <img
                      src={src}
                      alt={`${brand} ad`}
                      loading="lazy"
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(176,16,32,0)',
                      transition: 'background 0.22s ease',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.15)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(176,16,32,0)' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && allImages[lightboxIndex] && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(0,0,0,0.93)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            aria-label={s.close}
            style={{
              position: 'absolute',
              top: 20,
              right: 24,
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 4,
              color: 'rgba(255,255,255,0.7)',
              fontSize: 20,
              cursor: 'pointer',
              lineHeight: 1,
              padding: '8px 12px',
              zIndex: 1,
              transition: 'background 0.15s, color 0.15s',
              letterSpacing: 0,
            }}
            onMouseEnter={e => {
              const b = e.currentTarget
              b.style.background = 'rgba(255,255,255,0.14)'
              b.style.color = '#fff'
            }}
            onMouseLeave={e => {
              const b = e.currentTarget
              b.style.background = 'rgba(255,255,255,0.07)'
              b.style.color = 'rgba(255,255,255,0.7)'
            }}
          >
            ✕
          </button>

          {/* Counter top-left */}
          <div style={{
            position: 'absolute',
            top: 24,
            left: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
              {allImages[lightboxIndex].brand}
            </span>
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', letterSpacing: '1px' }}>
              {lightboxIndex + 1} / {allImages.length}
            </span>
          </div>

          {/* Keyboard hint */}
          <div style={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 9,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.18)',
            whiteSpace: 'nowrap',
          }}>
            {s.navHint}
          </div>

          {/* Prev */}
          {lightboxIndex > 0 && (
            <button
              onClick={e => { e.stopPropagation(); prev() }}
              aria-label={s.prev}
              style={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 4,
                color: '#fff',
                fontSize: 22,
                cursor: 'pointer',
                padding: '16px 18px',
                lineHeight: 1,
                transition: 'background 0.15s',
                zIndex: 1,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
            >
              ‹
            </button>
          )}

          {/* Next */}
          {lightboxIndex < allImages.length - 1 && (
            <button
              onClick={e => { e.stopPropagation(); next() }}
              aria-label={s.next}
              style={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 4,
                color: '#fff',
                fontSize: 22,
                cursor: 'pointer',
                padding: '16px 18px',
                lineHeight: 1,
                transition: 'background 0.15s',
                zIndex: 1,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
            >
              ›
            </button>
          )}

          {/* Image */}
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw' }}>
            <img
              src={allImages[lightboxIndex].src}
              alt={allImages[lightboxIndex].brand}
              style={{
                maxWidth: '90vw',
                maxHeight: '85vh',
                width: 'auto',
                height: 'auto',
                borderRadius: 4,
                display: 'block',
                boxShadow: '0 32px 80px rgba(0,0,0,0.8)',
              }}
            />
          </div>
        </div>
      )}
    </section>
  )
}
