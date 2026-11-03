import { useState } from 'react'
import { gallery } from '../data/content'
import Lightbox from '../components/experience/Lightbox'
import PageIntro from '../components/ui/PageIntro'
import { useLanguage } from '../context/LanguageContext'

export default function GalleryPage() {
  const { lang, t } = useLanguage()
  const [active, setActive] = useState(null)

  return (
    <>
      <PageIntro eyebrow={t.galleryPage.eyebrow} title={t.galleryPage.title} lead={t.home.galleryNote} />
      <section className="section" style={{ paddingTop: 12 }}>
        <div className="container masonry">
          {gallery.map((item) => (
            <button type="button" key={item.id} onClick={() => setActive(item)} aria-label={item[lang]}>
              {item.src ? (
                <img src={item.src} alt={item[lang]} loading="lazy" />
              ) : (
                <span className="gallery-empty">{t.home.galleryEmpty}</span>
              )}
              <span className="cap">{item[lang]}</span>
            </button>
          ))}
        </div>
      </section>
      <Lightbox item={active} lang={lang} closeLabel={t.close} onClose={() => setActive(null)} />
    </>
  )
}
