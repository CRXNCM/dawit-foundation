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

    gsap.utils.toArray('[data-reveal], .program-card, .news-card, .value-card, .way-card, .quote-card, .timeline article, .faq details, .form, .contact-facts > div, .masonry > button, .map-placeholder').forEach((element, index) => {
      gsap.fromTo(element, { y: 40, autoAlpha: 0 }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.95,
        delay: (index % 8) * 0.05,
        ease: 'power3.out',
        overwrite: 'auto',
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          once: true,
        },
      })
    })

    gsap.utils.toArray('.split-figure img, .article-photo img, .split-figure, .article-photo').forEach((element) => {
      const image = element.tagName === 'IMG' ? element : element.querySelector('img')
      if (!image) return
      gsap.fromTo(image, { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.08 }, {
        clipPath: 'inset(0% 0% 0% 0%)',
        scale: 1,
        duration: 1.25,
        ease: 'power3.inOut',
        overwrite: 'auto',
        scrollTrigger: {
          trigger: image,
          start: 'top 84%',
          once: true,
        },
      })
    })

    gsap.utils.toArray('h2:not(.page-intro h2)').forEach((heading) => {
      gsap.fromTo(heading, { y: 24, autoAlpha: 0 }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: heading, start: 'top 88%', once: true },
      })
    })
  }, { scope, dependencies: [pathname] })
}
