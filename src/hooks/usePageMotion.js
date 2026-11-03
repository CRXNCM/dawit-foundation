import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../lib/motion'

export function usePageMotion(scope, pathname) {
  useGSAP(() => {
    if (prefersReducedMotion() || pathname === '/') return undefined

    const intro = scope.current?.querySelector('.page-intro')
    if (intro) {
      const units = intro.querySelectorAll('.eyebrow, h1 .split-unit, h1:not(.split-heading), .lead, .btn')
      gsap.fromTo(units, { y: 32, autoAlpha: 0 }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        stagger: 0.07,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    const items = gsap.utils.toArray('[data-reveal], .program-card, .news-card, .value-card, .way-card, .quote-card, .timeline article, .faq details, .form, .contact-facts > div, .masonry > button, .map-placeholder')
      .filter((element, index, list) => list.indexOf(element) === index)
      .filter((element) => !element.parentElement?.closest('[data-reveal]'))

    items.forEach((element, index) => {
      gsap.fromTo(element, { y: 40, autoAlpha: 0 }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.95,
        delay: (index % 8) * 0.04,
        ease: 'power3.out',
        overwrite: 'auto',
        immediateRender: false,
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          once: true,
        },
      })
    })

    gsap.utils.toArray('.split-figure img, .article-photo img').forEach((image) => {
      gsap.fromTo(image, { clipPath: 'inset(18% 18% 18% 18%)', scale: 1.06 }, {
        clipPath: 'inset(0% 0% 0% 0%)',
        scale: 1,
        duration: 1.2,
        ease: 'power3.inOut',
        overwrite: 'auto',
        immediateRender: false,
        scrollTrigger: {
          trigger: image,
          start: 'top 84%',
          once: true,
        },
      })
    })
  }, { scope, dependencies: [pathname] })
}
