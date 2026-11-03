export default function Reveal({ as: Component = 'div', children, className, delay = 0, ...props }) {
  return (
    <Component className={className} data-reveal data-delay={delay || undefined} {...props}>
      {children}
    </Component>
  )
}
