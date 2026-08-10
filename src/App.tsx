import { useState, useEffect } from 'react'
import { MotionConfig } from 'motion/react'
import Lenis from 'lenis'
import { LanguageProvider } from './context/LanguageContext'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { ToolsMarquee } from './components/ToolsMarquee'
import { PortfolioSection } from './components/PortfolioSection'
import { BrandsMarquee } from './components/BrandsMarquee'
import { StaticAdsSection } from './components/StaticAdsSection'
import { MidCtaSection } from './components/MidCtaSection'
import { ProcessSection } from './components/ProcessSection'
import { CtaSection } from './components/CtaSection'
import { Footer } from './components/Footer'
import { MobileCta } from './components/MobileCta'
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
    <LanguageProvider>
    <MotionConfig reducedMotion="user">
      <div style={{ background: '#0D0E14', minHeight: '100vh' }}>
        <NoiseOverlay />
        <FloatingDots />
        <Nav />
        <Hero />
        <ToolsMarquee />
        <BrandsMarquee />
        {sections.map((section) => (
          <PortfolioSection
            key={section.id}
            section={section}
            onVideoClick={setActiveVideo}
          />
        ))}
        <ProcessSection />
        <MidCtaSection />
        <StaticAdsSection />
        <CtaSection />
        <Footer />
        <MobileCta />
        <VideoLightbox item={activeVideo} onClose={() => setActiveVideo(null)} />
      </div>
    </MotionConfig>
    </LanguageProvider>
  )
}
