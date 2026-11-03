import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import MediaFrame from './MediaFrame'

export default function ProgramCard({ program }) {
  const { t } = useLanguage()
  return (
    <article className="program-card">
      <div className="card-image">
        <MediaFrame src={program.image} forthcoming={t.home.galleryEmpty} />
      </div>
      <div className="card-body">
        <h3>{program.title}</h3>
        <p>{program.summary}</p>
        <Link className="text-link" to={`/programs/${program.id}`}>
          {t.learnMore} <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
