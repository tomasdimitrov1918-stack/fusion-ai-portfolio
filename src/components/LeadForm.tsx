import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'motion/react'
import { useLanguage } from '../context/LanguageContext'
import { metaBrowserIds, track, trackCustom } from '../lib/track'
import { heroVariant } from '../lib/variant'
import './LeadForm.css'

// Lead form at the very bottom (both versions), above the footer. A port of
// section 7 on aiads.fusioncreative.net with a phone field, no budget / videos-per-month selects,
// and a Viber link for people who'd rather message.
// POSTs to /api/lead, which vercel.json proxies to the landing page's function
// (aiads.fusioncreative.net/api/lead → Resend emails; it already holds the key).

const EASE_OUT = [0.22, 1, 0.36, 1] as const
const REVEAL_DURATION_S = 0.6

// Same Viber chat as the Tomas button in Contacts.tsx
const VIBER_TOMAS = 'viber://chat?number=%2B359896718015'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// Accept bare domains too ("twoiamagazin.bg") — visitors won't type the protocol
const URL_RE = /^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/i
// …or a bare Instagram handle ("@brand")
const HANDLE_RE = /^@[\w.]{2,30}$/
// Digits plus common separators; at least 6 digits in total
const PHONE_RE = /^\+?[\d\s()./-]{6,}$/

type Field = 'store_url' | 'name' | 'email' | 'phone'
type Status = 'idle' | 'sending' | 'success' | 'error'

const FIELDS: Field[] = ['store_url', 'name', 'email', 'phone']
// Website / Instagram is optional: checked only when something was typed
const OPTIONAL: Field[] = ['store_url']

function isValid(field: Field, raw: string) {
  const value = raw.trim()
  if (!value) return OPTIONAL.includes(field)
  if (field === 'email') return EMAIL_RE.test(value)
  if (field === 'store_url') return URL_RE.test(value) || HANDLE_RE.test(value)
  if (field === 'phone') return PHONE_RE.test(value) && value.replace(/\D/g, '').length >= 6
  return true
}

export function LeadForm() {
  const { tr } = useLanguage()
  const f = tr.leadForm

  const [values, setValues] = useState<Record<Field, string>>({ store_url: '', name: '', email: '', phone: '' })
  const [invalid, setInvalid] = useState<Partial<Record<Field, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const sectionRef = useRef<HTMLElement>(null)
  const started = useRef(false)

  // Pixel: form seen (once per page view)
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        trackCustom('ReachedForm')
        observer.disconnect()
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Pixel: first interaction with any field (once per page view)
  const onFormFocus = () => {
    if (started.current) return
    started.current = true
    trackCustom('FormStart')
  }

  const errors: Record<Field, string> = {
    store_url: f.storeError,
    name: f.nameError,
    email: f.emailError,
    phone: f.phoneError,
  }

  const validate = (field: Field, value = values[field]) => {
    const ok = isValid(field, value)
    setInvalid((prev) => ({ ...prev, [field]: !ok }))
    return ok
  }

  // Validate on blur (not on keystroke) — calmer UX; re-check live once flagged
  const inputProps = (field: Field) => ({
    id: `lf-${field}`,
    name: field,
    value: values[field],
    className: `lf__input${invalid[field] ? ' is-invalid' : ''}`,
    'aria-invalid': invalid[field] ? true : false,
    'aria-describedby': invalid[field] ? `lf-${field}-error` : undefined,
    onChange: (e: { target: { value: string } }) => {
      const value = e.target.value
      setValues((prev) => ({ ...prev, [field]: value }))
      if (invalid[field]) validate(field, value)
    },
    onBlur: () => {
      if (values[field].trim() !== '' || invalid[field]) validate(field)
    },
  })

  const errorText = (field: Field) =>
    invalid[field] ? (
      <p className="lf__error" id={`lf-${field}-error`} role="alert">
        {errors[field]}
      </p>
    ) : null

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending' || status === 'success') return

    const firstInvalid = FIELDS.filter((field) => !validate(field))[0]
    if (firstInvalid) {
      document.getElementById(`lf-${firstInvalid}`)?.focus()
      return
    }

    setStatus('sending')
    // Shared by the browser pixel Lead and the server-side Conversions API Lead → deduped by Meta
    const eventId = `lead-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...Object.fromEntries(FIELDS.map((field) => [field, values[field].trim()])),
          hero_variant: String(heroVariant),
          source: 'portfolio',
          event_id: eventId,
          ...metaBrowserIds(),
          page_url: window.location.href,
          // ?meta_test=TEST12345 routes the server event to Events Manager → Test Events (not counted)
          test_event_code: new URLSearchParams(window.location.search).get('meta_test') ?? undefined,
        }),
      })
      if (!response.ok) throw new Error(`Request failed: ${response.status}`)
      // Meta Pixel: only on a real successful submit, so ad optimisation data stays truthful
      track('Lead', { content_name: 'lead_form', placement: 'form' }, eventId)
      setStatus('success')
    } catch (err) {
      console.error('Lead submit failed:', err)
      setStatus('error')
    }
  }

  const submitLabel = status === 'sending' ? f.sending : f.submit

  return (
    <section ref={sectionRef} className="lf" id="lead-form" aria-labelledby="lead-form-heading">
      <div className="lf__container">
        <motion.div
          className="lf__head"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: REVEAL_DURATION_S, ease: EASE_OUT }}
        >
          <p className="lf__eyebrow">{f.eyebrow}</p>
          {/* Title rises out of an invisible fold, driven by the parent's variants */}
          <h2 className="lf__title" id="lead-form-heading">
            <motion.span
              style={{ display: 'inline-block' }}
              variants={{ hidden: { y: '110%' }, visible: { y: 0 } }}
              transition={{ duration: 0.8, delay: 0.12, ease: EASE_OUT }}
            >
              {f.title}
            </motion.span>
          </h2>
          <p className="lf__sub">{f.sub}</p>
        </motion.div>

        {status === 'success' ? (
          // After-submit screen: confirm the promise and offer the fastest next step
          <motion.div
            className="lf__form lf__done"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: REVEAL_DURATION_S, ease: EASE_OUT }}
          >
            <span className="lf__done-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12.5 9.5 18 20 6.5" />
              </svg>
            </span>
            <h3 className="lf__done-title">{f.doneTitle.replace('{name}', values.name.trim())}</h3>
            <p className="lf__done-text">{f.doneCall.replace('{phone}', values.phone.trim().replace(/ /g, '\u00a0'))}</p>
            <p className="lf__done-text">{f.successStatus}</p>
            <a
              className="lf__done-viber"
              href={VIBER_TOMAS}
              onClick={() => track('Contact', { content_name: 'viber_tomas', placement: 'form_success', channel: 'viber' })}
            >
              {f.doneViber}
            </a>
          </motion.div>
        ) : (
          <motion.form
            className="lf__form"
            noValidate
            onSubmit={onSubmit}
            onFocus={onFormFocus}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: REVEAL_DURATION_S, ease: EASE_OUT }}
          >
            <div className="lf__field">
              <label className="lf__label" htmlFor="lf-store_url">
                {f.storeLabel} <span className="lf__optional">{f.optional}</span>
              </label>
              <input {...inputProps('store_url')} type="text" inputMode="url" autoComplete="url" placeholder={f.storePlaceholder} />
              <p className="lf__hint">{f.storeHint}</p>
              {errorText('store_url')}
            </div>

            <div className="lf__row">
              <div className="lf__field">
                <label className="lf__label" htmlFor="lf-name">
                  {f.nameLabel} <span className="lf__required" aria-hidden="true">*</span>
                </label>
                <input {...inputProps('name')} type="text" autoComplete="name" placeholder={f.namePlaceholder} required />
                {errorText('name')}
              </div>
              <div className="lf__field">
                <label className="lf__label" htmlFor="lf-email">
                  {f.emailLabel} <span className="lf__required" aria-hidden="true">*</span>
                </label>
                <input {...inputProps('email')} type="email" inputMode="email" autoComplete="email" placeholder={f.emailPlaceholder} required />
                {errorText('email')}
              </div>
            </div>

            <div className="lf__field">
              <label className="lf__label" htmlFor="lf-phone">
                {f.phoneLabel} <span className="lf__required" aria-hidden="true">*</span>
              </label>
              <input {...inputProps('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder={f.phonePlaceholder} required />
              <p className="lf__hint">{f.phoneHint}</p>
              {errorText('phone')}
            </div>

            {/* What happens next: removes the fear of a hard sales call */}
            <ol className="lf__steps">
              {f.steps.map((step, i) => (
                <li key={step} className="lf__step">
                  <span className="lf__step-num" aria-hidden="true">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>

            <button
              className="lf__submit"
              type="submit"
              disabled={status === 'sending'}
            >
              {submitLabel}
            </button>

            <p className="lf__footnote">{f.footnote}</p>

            {/* For people who'd rather message than fill in a form */}
            <p className="lf__viber">
              {f.viberPrompt}{' '}
              <a
                href={VIBER_TOMAS}
                onClick={() => track('Contact', { content_name: 'viber_tomas', placement: 'form', channel: 'viber' })}
              >
                {f.viberLink}
              </a>
            </p>

            <p className="lf__status is-error" role="status" aria-live="polite">
              {status === 'error' ? f.errorStatus : ''}
            </p>
          </motion.form>
        )}
      </div>
    </section>
  )
}
