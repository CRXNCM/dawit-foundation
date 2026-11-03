import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/motion'

function canUseCustomCursor() {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(pointer: fine)').matches &&
    window.matchMedia('(min-width: 900px)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export default function CustomCursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const label = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const update = () => setActive(canUseCustomCursor())
    update()
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('resize', update)
      document.documentElement.classList.remove('has-custom-cursor', 'cursor-hover', 'cursor-labeled')
    }
  }, [])

  useLayoutEffect(() => {
    if (!active || !dot.current || !ring.current || !label.current) return undefined

    const targets = [dot.current, ring.current, label.current]
    gsap.set(targets, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 })

    const dotX = gsap.quickTo(dot.current, 'x', { duration: 0.16, ease: 'power3.out' })
    const dotY = gsap.quickTo(dot.current, 'y', { duration: 0.16, ease: 'power3.out' })
    const ringX = gsap.quickTo(ring.current, 'x', { duration: 0.35, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring.current, 'y', { duration: 0.35, ease: 'power3.out' })
    const labelX = gsap.quickTo(label.current, 'x', { duration: 0.26, ease: 'power3.out' })
    const labelY = gsap.quickTo(label.current, 'y', { duration: 0.26, ease: 'power3.out' })

    let armed = false
    const move = (event) => {
      if (!armed) {
        armed = true
        document.documentElement.classList.add('has-custom-cursor')
      }
      dotX(event.clientX)
      dotY(event.clientY)
      ringX(event.clientX)
      ringY(event.clientY)
      labelX(event.clientX)
      labelY(event.clientY)
    }

    const enter = (event) => {
      const target = event.target.closest('a, button, [data-cursor], input, textarea, summary')
      const text = event.target.closest('[data-cursor]')?.getAttribute('data-cursor') || ''
      document.documentElement.classList.toggle('cursor-hover', Boolean(target))
      document.documentElement.classList.toggle('cursor-labeled', Boolean(text))
      label.current.textContent = text
    }

    window.addEventListener('pointermove', move)
    document.addEventListener('pointerover', enter)

    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', enter)
      document.documentElement.classList.remove('has-custom-cursor', 'cursor-hover', 'cursor-labeled')
    }
  }, [active])

  if (!active) return null

  return (
    <div className="cursor-layer" aria-hidden="true">
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
      <div ref={label} className="cursor-label" />
    </div>
  )
}
