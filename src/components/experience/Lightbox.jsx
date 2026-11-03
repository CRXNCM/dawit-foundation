import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Lightbox({ item, lang, closeLabel, onClose }) {
  useEffect(() => {
    if (!item) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div className="lightbox" role="dialog" aria-modal="true" onClick={onClose}>
      <button className="lightbox-close" type="button" aria-label={closeLabel} onClick={onClose}>
        <X />
      </button>
      <div onClick={(event) => event.stopPropagation()}>
        {item.src ? (
          <img src={item.src} alt={item[lang]} />
        ) : (
          <div className="gallery-empty lightbox-empty">
            <span>{item[lang]}</span>
          </div>
        )}
        <p>{item[lang]}</p>
      </div>
    </div>
  )
}
