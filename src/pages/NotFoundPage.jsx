import { Link } from 'react-router-dom'
import PageIntro from '../components/ui/PageIntro'
import { useLanguage } from '../context/LanguageContext'

export default function NotFoundPage() {
  const { t } = useLanguage()
  return (
    <PageIntro eyebrow="404" title={t.notFoundTitle} lead={t.notFoundBody}>
      <p style={{ marginTop: 24 }}>
        <Link className="btn btn-primary" to="/">{t.homeLink}</Link>
      </p>
    </PageIntro>
  )
}
