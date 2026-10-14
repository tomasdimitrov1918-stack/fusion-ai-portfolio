// Meta Pixel helpers. The base pixel is loaded in index.html; these are safe no-ops
// when it is blocked (ad blockers, privacy settings) or not loaded yet.
import { heroVariant } from './variant'

type FbqParams = Record<string, string | number | boolean>

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

// Standard events Meta already understands (usable for optimisation and reports).
export function track(event: 'Lead' | 'ViewContent', params?: FbqParams) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  window.fbq('track', event, { ...params, hero_variant: heroVariant })
}

// Custom events show up under "Custom conversions" / custom events in Events Manager.
export function trackCustom(event: 'ReachedContact' | 'FilterStyle', params?: FbqParams) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  window.fbq('trackCustom', event, { ...params, hero_variant: heroVariant })
}
