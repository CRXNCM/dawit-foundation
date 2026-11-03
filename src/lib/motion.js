import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

let registered = false

export function registerMotion() {
  if (registered) return
  gsap.registerPlugin(ScrollTrigger, useGSAP)
  registered = true
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function isFinePointer() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: fine)').matches
}

export function isDesktopMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(min-width: 900px)').matches && isFinePointer() && !prefersReducedMotion()
}

registerMotion()

export { gsap, ScrollTrigger }
