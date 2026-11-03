import { useEffect } from 'react'
import { gsap, isDesktopMotion } from '../lib/motion'

export function useMagneticButton(ref, { strength = 0.32 } = {}) {
  useEffect(() => {
    const element = ref.current
    if (!element || !isDesktopMotion()) return undefined

    const onMove = (event) => {
      const rect = element.getBoundingClientRect()
      const x = event.clientX - rect.left - rect.width / 2
      const y = event.clientY - rect.top - rect.height / 2
      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.45,
        ease: 'power3.out',
      })
    }

    const onLeave = () => {
      gsap.to(element, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.45)' })
    }

    element.addEventListener('mousemove', onMove)
    element.addEventListener('mouseleave', onLeave)
    return () => {
      element.removeEventListener('mousemove', onMove)
      element.removeEventListener('mouseleave', onLeave)
      gsap.set(element, { x: 0, y: 0 })
    }
  }, [ref, strength])
}
