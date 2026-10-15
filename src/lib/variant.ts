// Hero A/B version, picked from the URL: ?v=2 shows HeroV2, anything else the original.
// Read once at load; the language toggle keeps other query params, so ?v=2 survives it.
export type HeroVariant = 1 | 2

export const heroVariant: HeroVariant =
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('v') === '2' ? 2 : 1

// V2 sends its main CTAs to the on-page LeadForm (#lead-form) instead of the external contact page.
// Lazy images/reveals below can shift the form while the smooth scroll runs (seen on the
// first click from the hero), so re-aim a few times until it actually lands.
const FORM_SCROLL_RETRY_MS = 900
const FORM_SCROLL_MAX_TRIES = 4
const FORM_SCROLL_TOLERANCE_PX = 40

export function scrollToLeadForm(attempt = 0) {
  const el = document.getElementById('lead-form')
  if (!el) return
  if (attempt > 0 && Math.abs(el.getBoundingClientRect().top) <= FORM_SCROLL_TOLERANCE_PX) return
  el.scrollIntoView({ behavior: 'smooth' })
  if (attempt < FORM_SCROLL_MAX_TRIES) {
    window.setTimeout(() => scrollToLeadForm(attempt + 1), FORM_SCROLL_RETRY_MS)
  }
}
