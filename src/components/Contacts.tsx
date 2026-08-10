import type React from 'react'
import { useLanguage } from '../context/LanguageContext'

// ── contact data (not language-specific) ───────────────────────────────────────
const CONTACTS = {
  tomas: {
    viber: 'viber://chat?number=%2B359896718015',
    facebook: 'https://www.facebook.com/tomas.dimitrov.12/',
  },
  monika: {
    viber: 'viber://chat?number=%2B359888634506',
    facebook: 'https://www.facebook.com/profile.php?id=100000618333454',
  },
} as const

const VIBER_PURPLE = '#7360F2'
const FB_BLUE = '#1877F2'

function ViberIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.01 1.5c-2.13 0-5.5.27-7.6 2.19C2.86 5.24 2.5 7.5 2.46 10.3c-.03 2.8-.07 8.05 4.99 9.47v2.17c0 .48.58.72.92.38l1.94-1.98c.55.05 1.1.08 1.7.08 2.13 0 5.5-.27 7.6-2.19 1.55-1.55 1.91-3.81 1.95-6.6.03-2.8.08-8.05-4.98-9.48-1.5-.42-3.03-.67-4.56-.67zm.14 3.14c3.98 0 6.02 1.98 6.06 5.9.03 2.42-.24 3.9-1.1 4.77-1.44 1.32-4.07 1.53-5.9 1.53-.53 0-1.05-.03-1.55-.08l-.4-.04-1.36 1.38v-1.98l-.6-.15c-3.5-.98-3.47-4.6-3.44-6.9.03-2.42.3-3.86 1.16-4.72 1.44-1.32 4.06-1.6 5.9-1.6-.11 0-.22 0-.33.01zm.28 1.44a.36.36 0 00-.03.72c2.5.18 3.66 1.38 3.82 3.96a.36.36 0 00.72-.04c-.18-2.9-1.6-4.42-4.46-4.64h-.05zm-2.28.72a.98.98 0 00-.6.13l-.03.02c-.34.2-.64.46-.9.77-.2.24-.31.48-.34.72-.02.14 0 .28.04.42l.02.02c.13.37.36.78.72 1.32.46.72 1.05 1.45 1.77 2.16.72.72 1.45 1.31 2.17 1.77.54.36.95.6 1.32.72l.02.02c.14.04.28.06.42.04.24-.03.48-.14.72-.34.31-.26.57-.56.77-.9l.02-.03a.98.98 0 00-.28-1.25l-.9-.6c-.3-.2-.6-.16-.83.07l-.4.5c-.13.16-.26.15-.26.15s-.66-.18-1.6-1.12c-.94-.94-1.12-1.6-1.12-1.6s-.01-.13.15-.26l.5-.4c.23-.23.27-.53.07-.83l-.6-.9a.98.98 0 00-.63-.42zm2.16.62a.36.36 0 00-.05.72c1.15.13 1.66.66 1.8 1.85a.36.36 0 00.72-.08c-.17-1.5-.9-2.27-2.44-2.44-.01 0-.02 0-.03-.05zm.1 1.42a.36.36 0 00-.15.7c.4.1.52.23.6.62a.36.36 0 00.7-.14c-.13-.63-.44-.98-1.1-1.16a.36.36 0 00-.05-.02z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  )
}

interface ContactButtonProps {
  href: string
  label: string
  ariaLabel: string
  color: string
  external?: boolean
  children: React.ReactNode
}

function ContactButton({ href, label, ariaLabel, color, external, children }: ContactButtonProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-bold uppercase tracking-wide text-white"
      style={{
        background: color,
        boxShadow: `0 6px 18px ${color}55`,
        transition: 'filter 0.25s, transform 0.25s, box-shadow 0.25s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.filter = 'brightness(1.12)'
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = `0 10px 26px ${color}77`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = 'brightness(1)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = `0 6px 18px ${color}55`
      }}
    >
      {children}
      {label}
    </a>
  )
}

interface PersonProps {
  name: string
  viber: string
  facebook: string
  viberLabel: string
  facebookLabel: string
}

function Person({ name, viber, facebook, viberLabel, facebookLabel }: PersonProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <span
        className="text-[13px] font-black uppercase tracking-[0.22em]"
        style={{ color: 'rgba(255,255,255,0.7)' }}
      >
        {name}
      </span>
      <div className="flex gap-3">
        <ContactButton
          href={viber}
          label={viberLabel}
          ariaLabel={`${viberLabel} — ${name}`}
          color={VIBER_PURPLE}
        >
          <ViberIcon />
        </ContactButton>
        <ContactButton
          href={facebook}
          label={facebookLabel}
          ariaLabel={`${facebookLabel} — ${name}`}
          color={FB_BLUE}
          external
        >
          <FacebookIcon />
        </ContactButton>
      </div>
    </div>
  )
}

export function Contacts() {
  const { tr } = useLanguage()
  const c = tr.contacts

  return (
    <div className="mt-16 flex flex-col items-center">
      <p className="text-[clamp(18px,2.6vw,26px)] font-black uppercase tracking-[0.18em] mb-8" style={{ color: '#fff' }}>
        {c.heading}
      </p>
      <div className="flex flex-wrap items-start justify-center gap-x-16 gap-y-10">
        <Person
          name={c.names.tomas}
          viber={CONTACTS.tomas.viber}
          facebook={CONTACTS.tomas.facebook}
          viberLabel={c.viber}
          facebookLabel={c.facebook}
        />
        <Person
          name={c.names.monika}
          viber={CONTACTS.monika.viber}
          facebook={CONTACTS.monika.facebook}
          viberLabel={c.viber}
          facebookLabel={c.facebook}
        />
      </div>
    </div>
  )
}
