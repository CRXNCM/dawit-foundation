import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { copy } from '../data/content'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const query = new URLSearchParams(window.location.search).get('lang')
    if (query === 'am' || query === 'en') return query
    return localStorage.getItem('dyf-lang') || 'en'
  })

  useEffect(() => {
    localStorage.setItem('dyf-lang', lang)
    document.documentElement.lang = lang === 'am' ? 'am' : 'en'
  }, [lang])

  const value = useMemo(() => ({
    lang,
    t: copy[lang],
    toggle: () => setLang((current) => (current === 'en' ? 'am' : 'en')),
  }), [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
