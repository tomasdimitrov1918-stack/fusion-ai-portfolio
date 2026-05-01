import { useMotionValue, useSpring, useTransform } from 'motion/react'
import type { MouseEvent } from 'react'
import { TILT_MAX_DEG, TILT_SPRING } from '../lib/animations'

export function useTilt() {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const rotateY = useSpring(
    useTransform(rawX, [-0.5, 0.5], [-TILT_MAX_DEG, TILT_MAX_DEG]),
    TILT_SPRING,
  )
  const rotateX = useSpring(
    useTransform(rawY, [-0.5, 0.5], [TILT_MAX_DEG, -TILT_MAX_DEG]),
    TILT_SPRING,
  )

  const shineX = useTransform(rawX, [-0.5, 0.5], ['0%', '100%'])
  const shineY = useTransform(rawY, [-0.5, 0.5], ['0%', '100%'])

  function onMouseMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function onMouseLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return { rotateX, rotateY, shineX, shineY, onMouseMove, onMouseLeave }
}
