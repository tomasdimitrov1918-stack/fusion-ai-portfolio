// Hero A/B version, picked from the URL: ?v=2 shows HeroV2, anything else the original.
// Read once at load; the language toggle keeps other query params, so ?v=2 survives it.
export type HeroVariant = 1 | 2

export const heroVariant: HeroVariant =
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('v') === '2' ? 2 : 1

// Smooth-scroll to a section by id. Lazy images/reveals can shift the target while the
// smooth scroll runs (seen on the first click from the hero), so re-aim a few times until it lands.
const SCROLL_RETRY_MS = 900
const SCROLL_MAX_TRIES = 4
const SCROLL_TOLERANCE_PX = 40

export function scrollToSection(id: string, attempt = 0) {
  const el = document.getElementById(id)
  if (!el) return
  // Targets may set scroll-margin-top (to clear the fixed nav); "landed" means top ≈ that margin
  const offset = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
  if (attempt > 0 && Math.abs(el.getBoundingClientRect().top - offset) <= SCROLL_TOLERANCE_PX) return
  el.scrollIntoView({ behavior: 'smooth' })
  if (attempt < SCROLL_MAX_TRIES) {
    window.setTimeout(() => scrollToSection(id, attempt + 1), SCROLL_RETRY_MS)
  }
}

// V2 sends its main CTAs to the on-page LeadForm (#lead-form) instead of the external contact page.
export function scrollToLeadForm() {
  scrollToSection('lead-form')
}
