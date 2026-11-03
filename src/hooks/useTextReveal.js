import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../lib/motion'

export function useTextReveal(scope, selector = '[data-split]', deps = []) {
  useGSAP(() => {
    if (prefersReducedMotion()) return
    const headings = gsap.utils.toArray(selector).filter((heading) => !heading.closest('.exp-hero'))
    headings.forEach((heading) => {
      const units = heading.querySelectorAll('.split-unit')
      if (!units.length) return
      gsap.from(units, {
        yPercent: 110,
        duration: 1.1,
        stagger: heading.dataset.split === 'chars' ? 0.018 : 0.055,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 86%',
          once: true,
        },
      })
    })
  }, { scope, dependencies: deps })
}
