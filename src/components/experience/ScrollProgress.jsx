import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion, ScrollTrigger } from '../../lib/motion'

export default function ScrollProgress() {
  const bar = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion() || !bar.current) return undefined
    const tween = gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.2,
        },
      },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars?.trigger === document.documentElement) trigger.kill()
      })
    }
  }, [])

  return <div ref={bar} className="scroll-progress" aria-hidden="true" />
}
