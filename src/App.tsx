import { useState, useEffect } from 'react'
import { MotionConfig } from 'motion/react'
import Lenis from 'lenis'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { ToolsMarquee } from './components/ToolsMarquee'
import { PortfolioSection } from './components/PortfolioSection'
import { CtaSection } from './components/CtaSection'
import { Footer } from './components/Footer'
import { VideoLightbox } from './components/VideoLightbox'
import { NoiseOverlay, FloatingDots } from './components/Background'
import { sections } from './data/portfolio'
import type { VideoItem } from './data/portfolio'

export default function App() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div style={{ background: '#0D0E14', minHeight: '100vh' }}>
        <NoiseOverlay />
        <FloatingDots />
        <Nav />
        <Hero />
        <ToolsMarquee />
        {sections.map((section) => (
          <PortfolioSection
            key={section.id}
            section={section}
            onVideoClick={setActiveVideo}
          />
        ))}
        <CtaSection />
        <Footer />
        <VideoLightbox item={activeVideo} onClose={() => setActiveVideo(null)} />
      </div>
    </MotionConfig>
  )
}
