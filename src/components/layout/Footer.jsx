import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import { programs } from '../../data/content'
import { useLanguage } from '../../context/LanguageContext'

export default function Footer() {
  const { lang, t, toggle } = useLanguage()
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 640)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <footer className="site-footer">
        <div className="container footer-nav-grid">
          <div>
            <img className="footer-logo" src="/logo/dawit-yemariamwerk-logo.png" alt={t.brand} />
            <p>{t.footerAbout}</p>
            <p>{t.partner}</p>
          </div>
          <div>
            <h2>{lang === 'am' ? 'አሰሳ' : 'Navigate'}</h2>
            <ul>
              {t.nav.map((item) => (
                <li key={item.to}><Link to={item.to}>{item.label}</Link></li>
              ))}
              <li><Link to="/gallery">{t.galleryLink}</Link></li>
            </ul>
          </div>
          <div>
            <h2>{t.footerPrograms}</h2>
            <ul>
              {programs.slice(0, 6).map((program) => (
                <li key={program.id}>
                  <Link to={`/programs/${program.id}`}>{program[lang].title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>{t.footerVisit}</h2>
            <ul>
              <li>{t.location}</li>
              <li><a href={`mailto:${t.email}`}>{t.email}</a></li>
              <li><a href="tel:+251906777666">{t.phone}</a></li>
              <li><Link to="/contact">{t.contactUs}</Link></li>
              <li><Link to="/volunteer">{t.involved}</Link></li>
              <li><Link to="/donate">{t.donate}</Link></li>
            </ul>
            <button className="lang-toggle footer-lang" type="button" onClick={toggle} aria-label={t.langName}>
              <span className={lang === 'en' ? 'is-active' : ''}>EN</span>
              <span aria-hidden="true">/</span>
              <span className={lang === 'am' ? 'is-active' : ''}>አማ</span>
            </button>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} {t.copyright}</span>
          <span>Sabiyan Area, Dire Dawa</span>
        </div>
      </footer>
      <button
        className={`to-top${showTop ? ' is-visible' : ''}`}
        type="button"
        aria-label={t.backToTop}
        onClick={() => window.__lenis?.scrollTo(0) ?? window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp size={18} />
      </button>
    </>
  )
}
