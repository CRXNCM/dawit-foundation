import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

export default function Header() {
  const { lang, t, toggle } = useLanguage()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const overHero = location.pathname === '/'
  const close = () => setOpen(false)

  useEffect(() => {
    close()
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const classes = [
    'site-header',
    scrolled ? 'is-scrolled' : '',
    overHero ? 'is-over-hero' : 'is-solid',
  ].filter(Boolean).join(' ')

  return (
    <header className={classes}>
      <div className="container header-inner">
        <Link className="brand" to="/" onClick={close} aria-label={t.brand}>
          <img className="brand-logo" src="/logo/dawit-yemariamwerk-logo.png" alt="" width="280" height="64" />
        </Link>
        <nav className="header-nav" aria-label="Main">
          {t.nav.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="header-tools">
          <button className="lang-toggle" type="button" onClick={toggle} aria-label={t.langName}>
            <span className={lang === 'en' ? 'is-active' : ''}>EN</span>
            <span aria-hidden="true">/</span>
            <span className={lang === 'am' ? 'is-active' : ''}>አማ</span>
          </button>
          <Link className="btn btn-primary btn-small" to="/donate">
            {t.donate}
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-label={open ? t.close : 'Menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      <div className={`mobile-menu${open ? ' is-open' : ''}`}>
        {t.nav.map((item) => (
          <NavLink key={item.to} to={item.to} onClick={close}>
            {item.label}
          </NavLink>
        ))}
        <div className="mobile-menu-tools">
          <Link className="btn btn-light" to="/donate" onClick={close}>{t.donate}</Link>
          <button className="btn btn-outline-light" type="button" onClick={() => { toggle(); close() }}>
            {lang === 'en' ? 'አማርኛ' : 'English'}
          </button>
        </div>
      </div>
    </header>
  )
}
