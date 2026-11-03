import { useRef } from 'react'
import { useMagneticButton } from '../../hooks/useMagneticButton'

export default function Magnetic({ as: Component = 'div', strength = 0.28, className, children, ...props }) {
  const ref = useRef(null)
  useMagneticButton(ref, { strength })
  return (
    <Component ref={ref} className={className} {...props}>
      {children}
    </Component>
  )
}
