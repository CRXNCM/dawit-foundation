import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap, prefersReducedMotion, ScrollTrigger } from '../lib/motion'
import 'lenis/dist/lenis.css'

export function useSmoothScroll() {
  const location = useLocation()

  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.1,
      autoRaf: false,
    })

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    const ticker = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    window.__lenis = lenis
    document.documentElement.classList.add('has-smooth-scroll')

    return () => {
      gsap.ticker.remove(ticker)
      lenis.off('scroll', onScroll)
      lenis.destroy()
      window.__lenis = null
      document.documentElement.classList.remove('has-smooth-scroll')
    }
  }, [])

  useEffect(() => {
    const lenis = window.__lenis
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [location.pathname])
}
