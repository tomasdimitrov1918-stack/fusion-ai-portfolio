import { useRef, useState, useCallback } from 'react'
import { motion, useMotionTemplate } from 'motion/react'
import type { VideoItem } from '../data/portfolio'
import { useTilt } from '../hooks/useTilt'

interface VideoCardProps {
  item: VideoItem
  onClick: (item: VideoItem) => void
}

export function VideoCard({ item, onClick }: VideoCardProps) {
  const { rotateX, rotateY, shineX, shineY, onMouseMove, onMouseLeave: tiltLeave } = useTilt()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [src, setSrc] = useState<string | undefined>(undefined)

  const shineBackground = useMotionTemplate`radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.1) 0%, transparent 50%)`

  const handleCanPlay = useCallback(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  function handleMouseEnter() {
    if (!src) {
      setSrc(item.videoUrl) // triggers load → onCanPlay → play
    } else {
      videoRef.current?.play().catch(() => {})
    }
  }

  function handleMouseLeave(_e: React.MouseEvent<HTMLDivElement>) {
    tiltLeave()
    const v = videoRef.current
    if (v) { v.pause(); v.currentTime = 0 }
  }

  return (
    <motion.div
      className="relative overflow-hidden cursor-pointer group"
      style={{
        background: '#191B26',
        border: '1px solid rgba(176,16,32,0.15)',
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: '800px',
      }}
      whileHover={{ borderColor: 'rgba(176,16,32,0.55)' }}
      onMouseMove={onMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(item)}
    >
      {/* Video */}
      <div style={{ aspectRatio: '9/16' }} className="relative overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          poster={item.poster}
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={handleCanPlay}
          className="w-full h-full object-cover transition-[filter] duration-300 brightness-75 group-hover:brightness-100"
        />

        {/* Shine overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: shineBackground, opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />

        {/* Play icon — hidden on hover since video plays */}
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 group-hover:opacity-0">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{ border: '2px solid rgba(224,16,32,0.7)', background: 'rgba(0,0,0,0.3)' }}
          >
            <div
              className="ml-0.5"
              style={{
                width: 0,
                height: 0,
                borderStyle: 'solid',
                borderWidth: '7px 0 7px 12px',
                borderColor: 'transparent transparent transparent rgba(224,16,32,0.9)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Label row */}
      <div className="flex justify-between items-center px-4 py-3">
        <span className="text-[9px] tracking-[3px] uppercase" style={{ color: 'rgba(176,16,32,0.7)' }}>
          {item.category} · {item.label}
        </span>
        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 14 }}>↗</span>
      </div>
    </motion.div>
  )
}
