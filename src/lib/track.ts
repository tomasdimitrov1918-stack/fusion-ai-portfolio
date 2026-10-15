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
//   Lead        — ONLY a successful lead-form submit (real conversion; keep it truthful)
//   Contact     — clicks that start a conversation: contact-page buttons, Viber, Facebook
//   ViewContent — opening a video or static ad in the lightbox
// `eventId` pairs a browser event with the same event sent server-side (Conversions API,
// see api/lead.js) so Meta counts it once.
export function track(event: 'Lead' | 'Contact' | 'ViewContent', params?: FbqParams, eventId?: string) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  window.fbq('track', event, { ...params, hero_variant: heroVariant }, ...(eventId ? [{ eventID: eventId }] : []))
}

// Meta browser IDs for the Conversions API: _fbp cookie, and _fbc cookie or one built from ?fbclid
export function metaBrowserIds(): { fbp?: string; fbc?: string } {
  const cookie = (name: string) => document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))?.[1]
  const fbclid = new URLSearchParams(window.location.search).get('fbclid')
  return {
    fbp: cookie('_fbp'),
    fbc: cookie('_fbc') ?? (fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined),
  }
}

// Custom events show up under "Custom conversions" / custom events in Events Manager.
//   ReachedContact — contacts block scrolled into view (once per page view)
//   ReachedForm    — lead form scrolled into view (once per page view)
//   FormStart      — first time a visitor focuses any lead-form field
//   HeroClick      — hero scroll buttons (see work / animation / UGC), to compare V1 vs V2
//   GoToForm       — a V2 CTA that scrolls down to the lead form (param: placement)
//   SkipToUgc      — "Прескочи към UGC" button in the animated-ads filter chips
//   FilterStyle    — style filter chip clicked in a video section
export function trackCustom(
  event: 'ReachedContact' | 'ReachedForm' | 'FormStart' | 'HeroClick' | 'GoToForm' | 'SkipToUgc' | 'FilterStyle',
  params?: FbqParams,
) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  window.fbq('trackCustom', event, { ...params, hero_variant: heroVariant })
}
