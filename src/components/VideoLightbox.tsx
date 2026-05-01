import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { VideoItem } from '../data/portfolio'
import {
  lightboxBackdropVariants,
  lightboxPanelVariants,
} from '../lib/animations'

interface VideoLightboxProps {
  item: VideoItem | null
  onClose: () => void
}

export function VideoLightbox({ item, onClose }: VideoLightboxProps) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  useEffect(() => {
    if (item) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [item])

  return (
    <AnimatePresence mode="wait">
      {item && (
        <motion.div
          key="lightbox-backdrop"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          style={{ background: 'rgba(0,0,0,0.88)' }}
          variants={lightboxBackdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            key={`lightbox-panel-${item.id}`}
            className="relative w-full max-w-[min(90vw,360px)] sm:max-w-sm"
            style={{ background: '#191B26', border: '1px solid rgba(176,16,32,0.2)' }}
            variants={lightboxPanelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute top-3 right-4 text-xl z-10 transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.4)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>

            {/* Thumbnail */}
            <img
              src={item.thumbnailUrl}
              alt={item.label}
              className="w-full block"
              style={{ aspectRatio: '9/16', objectFit: 'cover' }}
            />

            {/* Info */}
            <div className="px-6 py-4">
              <p
                className="text-[9px] tracking-[4px] uppercase mb-1"
                style={{ color: '#B01020' }}
              >
                {item.label}
              </p>
              <p
                className="text-[10px] tracking-[2px] uppercase"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                {item.tools.join(' + ')}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
