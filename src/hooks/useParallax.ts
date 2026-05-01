import { useRef } from 'react'
import { useScroll, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'
import type { RefObject } from 'react'

const PARALLAX_RANGE_PX = 80

export function useParallax(): {
  ref: RefObject<HTMLElement | null>
  x: MotionValue<number>
} {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const x = useTransform(scrollYProgress, [0, 1], [0, -PARALLAX_RANGE_PX])
  return { ref, x }
}
