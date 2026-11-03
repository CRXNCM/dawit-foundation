import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import MediaFrame from './MediaFrame'

export default function NewsCard({ item }) {
  const { lang, t } = useLanguage()
  const date = new Date(item.date).toLocaleDateString(lang === 'am' ? 'am-ET' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="news-card">
      <div className="card-image">
        <MediaFrame src={item.image} forthcoming={t.home.galleryEmpty} />
      </div>
      <div className="card-body">
        <span className="card-date">{date}</span>
        <h3>{item.title}</h3>
        <p>{item.summary}</p>
        <Link className="text-link" to={`/news/${item.id}`}>
          {t.readMore} <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
