export default function MediaFrame({ src, alt = '', forthcoming = 'Photograph forthcoming' }) {
  if (!src) {
    return <span className="gallery-empty">{forthcoming}</span>
  }
  return <img src={src} alt={alt} loading="lazy" />
}
