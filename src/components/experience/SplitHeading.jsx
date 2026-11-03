export default function SplitHeading({ as: Component = 'h2', text, className, mode = 'words', reveal = true, ...props }) {
  const pieces = mode === 'lines'
    ? text.split(/(?<=[.!?።])\s+/).filter(Boolean)
    : text.split(/(\s+)/)

  return (
    <Component
      className={`split-heading ${className || ''}`.trim()}
      data-split={reveal ? mode : undefined}
      {...props}
    >
      {pieces.map((piece, index) => {
        if (mode !== 'lines' && !piece.trim()) return piece
        return (
          <span className="split-mask" key={`${piece}-${index}`}>
            <span className="split-unit">{piece}</span>
          </span>
        )
      })}
    </Component>
  )
}
