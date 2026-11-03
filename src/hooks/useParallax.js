import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../lib/motion'

export function useParallax(scope, selector = '[data-parallax]', deps = []) {
  useGSAP(() => {
    if (prefersReducedMotion()) return
    if (!window.matchMedia('(min-width: 768px)').matches) return

    const elements = gsap.utils.toArray(selector)
    elements.forEach((element) => {
      const speed = Number(element.dataset.parallax || 12)
      gsap.fromTo(
        element,
        { y: -speed },
        {
          y: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: element.closest('section') || element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        },
      )
    })
  }, { scope, dependencies: deps })
}
