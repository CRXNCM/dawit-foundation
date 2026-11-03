import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import CustomCursor from '../experience/CustomCursor'
import ScrollProgress from '../experience/ScrollProgress'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'
import { usePageMotion } from '../../hooks/usePageMotion'
import { useLanguage } from '../../context/LanguageContext'
import { ScrollTrigger } from '../../lib/motion'

const titles = {
  '/': { en: 'Dawit Yemariamwerk Foundation', am: 'ዳዊት የማርያምወርቅ ፋውንዴሽን' },
  '/about': { en: 'About · Dawit Yemariamwerk Foundation', am: 'ስለ እኛ · ዳዊት የማርያምወርቅ ፋውንዴሽን' },
  '/programs': { en: 'Programs · Dawit Yemariamwerk Foundation', am: 'ፕሮግራሞች · ዳዊት የማርያምወርቅ ፋውንዴሽን' },
  '/gallery': { en: 'Gallery · Dawit Yemariamwerk Foundation', am: 'ማእከለ-ስዕላት · ዳዊት የማርያምወርቅ ፋውንዴሽን' },
  '/news': { en: 'News · Dawit Yemariamwerk Foundation', am: 'ዜና · ዳዊት የማርያምወርቅ ፋውንዴሽን' },
  '/volunteer': { en: 'Volunteer · Dawit Yemariamwerk Foundation', am: 'በጎ ፈቃድ · ዳዊት የማርያምወርቅ ፋውንዴሽን' },
  '/contact': { en: 'Contact · Dawit Yemariamwerk Foundation', am: 'ያግኙን · ዳዊት የማርያምወርቅ ፋውንዴሽን' },
  '/donate': { en: 'Donate · Dawit Yemariamwerk Foundation', am: 'ይለግሱ · ዳዊት የማርያምወርቅ ፋውንዴሽን' },
}

export default function Layout() {
  const { lang, t } = useLanguage()
  const location = useLocation()
  const reduce = useReducedMotion()
  const mainRef = useRef(null)
  useSmoothScroll()
  usePageMotion(mainRef, location.pathname)

  useEffect(() => {
    const match = Object.entries(titles).find(([path]) => location.pathname === path || (path !== '/' && location.pathname.startsWith(`${path}/`)))
    document.title = match ? match[1][lang] : titles['/'][lang]
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [location.pathname, lang])

  return (
    <>
      <a className="skip-link" href="#main">{t.skip}</a>
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <CustomCursor />
      <Header />
      <main
        ref={mainRef}
        id="main"
        className={location.pathname === '/' ? 'is-home' : 'page-shell'}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
