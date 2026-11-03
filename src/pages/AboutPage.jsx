import Reveal from '../components/ui/Reveal'
import { faqs } from '../data/content'
import { useLanguage } from '../context/LanguageContext'

export default function AboutPage() {
  const { lang, t } = useLanguage()
  const page = t.about

  return (
    <>
      <section className="page-intro container">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p className="lead">{page.lead}</p>
      </section>

      <Reveal as="section" className="section section-white">
        <div className="container split">
          <div className="split-copy">
            <p className="eyebrow">{page.storyEyebrow}</p>
            <h2>{page.storyTitle}</h2>
            {page.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <figure className="split-figure">
            <img src="/images/founder.webp" alt={t.home.caption} />
            <figcaption>{t.home.caption}</figcaption>
          </figure>
        </div>
      </Reveal>

      <Reveal as="section" className="section">
        <div className="container article-layout">
          <div>
            <p className="eyebrow">{page.directorEyebrow}</p>
            <h2>{page.directorTitle}</h2>
            <div className="prose">
              <p>{page.directorBody}</p>
              <p><strong>{page.directorName}</strong></p>
            </div>
          </div>
          <figure className="article-photo">
            <img src="/images/hospital.jpg" alt="DELT Yemariamwerk Hospital" />
            <figcaption>{t.partner}</figcaption>
          </figure>
        </div>
      </Reveal>

      <Reveal as="section" className="section section-soft">
        <div className="container">
          <p className="eyebrow">{page.mvEyebrow}</p>
          <div className="mission-grid" style={{ marginTop: 28 }}>
            <article className="value-card">
              <span>01</span>
              <h3>{page.missionTitle}</h3>
              <p>{page.mission}</p>
            </article>
            <article className="value-card">
              <span>02</span>
              <h3>{page.visionTitle}</h3>
              <p>{page.vision}</p>
            </article>
          </div>
          <h2 style={{ marginTop: 56 }}>{page.valuesTitle}</h2>
          <div className="value-grid" style={{ marginTop: 8 }}>
            {page.values.map((value, index) => (
              <article className="value-card" key={value.title}>
                <span>0{index + 1}</span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="section section-white">
        <div className="container">
          <p className="eyebrow">FAQ</p>
          <h2>{lang === 'am' ? 'ጥያቄዎች' : 'Questions we are asked.'}</h2>
          <div className="faq" style={{ marginTop: 12 }}>
            {faqs.map((item) => (
              <details key={item[lang].q}>
                <summary>{item[lang].q}</summary>
                <p>{item[lang].a}</p>
              </details>
            ))}
          </div>
        </div>
      </Reveal>
    </>
  )
}
