import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function ContactPage() {
  const { t } = useLanguage()
  const page = t.contactPage
  const [sent, setSent] = useState(false)
  const [note, setNote] = useState(false)

  return (
    <>
      <section className="page-intro container">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p className="lead">{page.lead}</p>
      </section>
      <section className="section section-white">
        <div className="container contact-grid">
          <div>
            <dl className="contact-facts">
              <div>
                <dt>{t.footerVisit}</dt>
                <dd>Sabiyan Area, {t.location}</dd>
              </div>
              <div>
                <dt>{t.formEmail}</dt>
                <dd><a href={`mailto:${t.email}`}>{t.email}</a></dd>
              </div>
              <div>
                <dt>{t.formPhone}</dt>
                <dd><a href="tel:+251906777666">{t.phone}</a></dd>
              </div>
              <div>
                <dt>{t.hoursLabel}</dt>
                <dd>{t.hours}</dd>
              </div>
            </dl>
            <div className="map-placeholder" style={{ marginTop: 28 }}>{t.mapLabel}</div>
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
      <section className="section">
        <div className="container contact-grid">
          <div>
            <p className="eyebrow">{t.newsletterTitle}</p>
            <h2>{t.newsletterTitle}</h2>
            <p className="lead">{t.newsletterBody}</p>
          </div>
          {note ? (
            <p className="form-success">{t.newsletterOk}</p>
          ) : (
            <form
              className="form"
              onSubmit={(event) => {
                event.preventDefault()
                setNote(true)
              }}
            >
              <label>{t.formEmail}<input type="email" name="newsletter" required /></label>
              <button className="btn btn-ghost" type="submit">{t.newsletterCta}</button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
