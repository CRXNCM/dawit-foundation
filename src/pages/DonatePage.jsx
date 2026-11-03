import { Link } from 'react-router-dom'
import PageIntro from '../components/ui/PageIntro'
import { useLanguage } from '../context/LanguageContext'

export default function DonatePage() {
  const { t } = useLanguage()
  const page = t.donatePage

  return (
    <>
      <PageIntro eyebrow={page.eyebrow} title={page.title} lead={page.lead} />
      <section className="section section-white">
        <div className="container article-layout">
          <div className="timeline">
            {page.points.map((point) => (
              <article key={point}>
                <h3>{point}</h3>
              </article>
            ))}
          </div>
          <figure className="article-photo">
            <img src="/images/hospital.jpg" alt="" />
            <figcaption>
              <Link className="btn btn-primary" to="/contact">{t.contactUs}</Link>
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  )
}
