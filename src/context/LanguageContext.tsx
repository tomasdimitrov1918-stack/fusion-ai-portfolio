import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { t } from '../lib/i18n'
import type { Lang } from '../lib/i18n'

type Translation = typeof t[Lang]

interface LanguageContextValue {
  lang: Lang
  toggle: () => void
  tr: Translation
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getInitialLang(): Lang {
  return new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'bg'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang)

  const toggle = () => {
    setLang(l => {
      const next: Lang = l === 'bg' ? 'en' : 'bg'
      const params = new URLSearchParams(window.location.search)
      if (next === 'en') {
        params.set('lang', 'en')
      } else {
        params.delete('lang')
      }
      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname
      window.history.replaceState(null, '', newUrl)
      return next
    })
  }

  return (
    <LanguageContext.Provider value={{ lang, toggle, tr: t[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
