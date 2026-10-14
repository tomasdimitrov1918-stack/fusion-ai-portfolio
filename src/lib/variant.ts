// Hero A/B version, picked from the URL: ?v=2 shows HeroV2, anything else the original.
// Read once at load; the language toggle keeps other query params, so ?v=2 survives it.
export type HeroVariant = 1 | 2

export const heroVariant: HeroVariant =
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('v') === '2' ? 2 : 1
