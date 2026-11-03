import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function NotFoundPage() {
  const { t } = useLanguage()
  return (
    <section className="page-intro container" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <p className="eyebrow">404</p>
      <h1>{t.notFoundTitle}</h1>
      <p className="lead">{t.notFoundBody}</p>
      <p style={{ marginTop: 24 }}>
        <Link className="btn btn-primary" to="/">{t.homeLink}</Link>
      </p>
    </section>
  )
}
