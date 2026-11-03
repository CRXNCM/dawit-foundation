import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../lib/motion'

export function useScrollReveal(scope, selector = '[data-reveal]', deps = []) {
  useGSAP(() => {
    if (prefersReducedMotion()) return
    const elements = gsap.utils.toArray(selector)
    elements.forEach((element) => {
      const delay = Number(element.dataset.delay || 0)
      const y = Number(element.dataset.revealY || 36)
      gsap.from(element, {
        y,
        autoAlpha: 0,
        duration: 1.05,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 92%',
          toggleActions: 'play none none none',
          once: true,
        },
      })
    })
  }, { scope, dependencies: deps })
}
