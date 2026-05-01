import { motion, useMotionTemplate } from 'motion/react'
import type { VideoItem } from '../data/portfolio'
import { useTilt } from '../hooks/useTilt'

interface VideoCardProps {
  item: VideoItem
  aspectRatio?: string
  onClick: (item: VideoItem) => void
}

export function VideoCard({ item, aspectRatio = '16/9', onClick }: VideoCardProps) {
  const { rotateX, rotateY, shineX, shineY, onMouseMove, onMouseLeave } = useTilt()

  const shineBackground = useMotionTemplate`radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.1) 0%, transparent 50%)`

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
      onMouseLeave={onMouseLeave}
      onClick={() => onClick(item)}
    >
      {/* Thumbnail */}
      <div style={{ aspectRatio }} className="relative overflow-hidden">
        <img
          src={item.thumbnailUrl}
          alt={item.label}
          className="w-full h-full object-cover transition-[filter] duration-300 brightness-85 group-hover:brightness-100"
          loading="lazy"
        />

        {/* Shine overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: shineBackground, opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{ border: '2px solid rgba(224,16,32,0.6)' }}
            whileHover={{ background: '#B01020', borderColor: '#B01020' }}
            transition={{ duration: 0.2 }}
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
          </motion.div>
        </div>
      </div>

      {/* Label row */}
      <div className="flex justify-between items-center px-4 py-3">
        <span
          className="text-[9px] tracking-[3px] uppercase"
          style={{ color: 'rgba(176,16,32,0.7)' }}
        >
          {item.label}
        </span>
        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 14 }}>↗</span>
      </div>
    </motion.div>
  )
}
