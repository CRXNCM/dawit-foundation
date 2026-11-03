import { useEffect, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

export default function Statistic({ value, suffix, label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const numeric = Number(value)
  const [shown, setShown] = useState(reduce ? numeric : 0)

  useEffect(() => {
    if (!inView || reduce || Number.isNaN(numeric)) {
      setShown(value)
      return
    }
    const duration = 900
    const start = performance.now()
    let frame
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setShown(Math.round(numeric * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, numeric, reduce, value])

  return (
    <motion.article ref={ref} className="stat">
      <span className="stat-value">
        {shown}
        {suffix ? <span className="stat-suffix">{suffix}</span> : null}
      </span>
      <span className="stat-label">{label}</span>
    </motion.article>
  )
}
