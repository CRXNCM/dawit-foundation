import { useState } from 'react'
import PageIntro from '../components/ui/PageIntro'
import { useLanguage } from '../context/LanguageContext'

export default function VolunteerPage() {
  const { t } = useLanguage()
  const page = t.volunteerPage
  const [sent, setSent] = useState(false)

  return (
    <>
      <PageIntro eyebrow={page.eyebrow} title={page.title} lead={page.lead} />
      <section className="section section-white">
        <div className="container">
          <p className="eyebrow">01</p>
          <h2>{page.waysTitle}</h2>
          <div className="ways-grid" style={{ marginTop: 28 }}>
            {page.ways.map((way, index) => (
              <article className="way-card" key={way.title}>
                <span>0{index + 1}</span>
                <h3>{way.title}</h3>
                <p>{way.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container contact-grid">
          <div>
            <p className="eyebrow">02</p>
            <h2>{page.formTitle}</h2>
            <p className="lead">{page.formBody}</p>
          </div>
          {sent ? (
            <p className="form-success">{t.submitted}</p>
          ) : (
            <form
              className="form"
              onSubmit={(event) => {
                event.preventDefault()
                setSent(true)
              }}
            >
              <label>{t.formName}<input name="name" required autoComplete="name" /></label>
              <label>{t.formEmail}<input type="email" name="email" required autoComplete="email" /></label>
              <label>{t.formPhone}<input type="tel" name="phone" autoComplete="tel" /></label>
              <label>{t.formMessage}<textarea name="message" required /></label>
              <button className="btn btn-primary" type="submit">{t.formSend}</button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
