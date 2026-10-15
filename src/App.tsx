import { useState, useEffect } from 'react'
import { MotionConfig } from 'motion/react'
import Lenis from 'lenis'
import { LanguageProvider } from './context/LanguageContext'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { HeroV2 } from './components/HeroV2'
import { WhyUsV2 } from './components/WhyUsV2'
import { AboutUs } from './components/AboutUs'
import { OfferV2 } from './components/OfferV2'
import { LeadForm } from './components/LeadForm'
import { ProblemsSolved } from './components/ProblemsSolved'
import { TestWinners } from './components/TestWinners'
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
import { track } from './lib/track'
import { heroVariant } from './lib/variant'

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
        {heroVariant === 2 ? <HeroV2 /> : <Hero />}
        <BrandsMarquee />
        {heroVariant === 2 && <WhyUsV2 />}
        <ToolsMarquee />
        {sections.map((section) => (
          <PortfolioSection
            key={section.id}
            section={section}
            onVideoClick={(item) => {
              track('ViewContent', {
                content_type: 'video',
                content_name: `${item.category} ${item.label}`,
                content_category: item.sub ?? item.category,
              })
              setActiveVideo(item)
            }}
          />
        ))}
        <ProblemsSolved />
        <ProcessSection />
        <MidCtaSection />
        <StaticAdsSection />
        <TestWinners />
        <AboutUs />
        {heroVariant === 2 && <OfferV2 />}
        {heroVariant === 2 ? (
          <>
            <LeadForm />
            <CtaSection contactsOnly />
            <Footer blend />
          </>
        ) : (
          <>
            <CtaSection />
            <LeadForm />
            <Footer />
          </>
        )}
        <MobileCta />
        <VideoLightbox item={activeVideo} onClose={() => setActiveVideo(null)} />
      </div>
    </MotionConfig>
    </LanguageProvider>
  )
}
