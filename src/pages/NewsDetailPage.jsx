import { Link, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { localizeNews, news } from '../data/content'
import { useLanguage } from '../context/LanguageContext'
import MediaFrame from '../components/ui/MediaFrame'
import NotFoundPage from './NotFoundPage'

export default function NewsDetailPage() {
  const { id } = useParams()
  const { lang, t } = useLanguage()
  const item = news.find((entry) => entry.id === id)
  if (!item) return <NotFoundPage />
  const data = localizeNews(item, lang)
  const date = new Date(data.date).toLocaleDateString(lang === 'am' ? 'am-ET' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <section className="page-intro container">
        <p className="eyebrow">{date}</p>
        <h1>{data.title}</h1>
        <p className="lead">{data.summary}</p>
      </section>
      <section className="section section-white">
        <div className="container article-layout">
          <div className="prose">
            <p>{data.body}</p>
            <p>
              <Link className="text-link" to="/news">
                {t.newsPage.eyebrow} <ArrowRight aria-hidden="true" />
              </Link>
            </p>
          </div>
          <figure className="article-photo">
            <MediaFrame src={data.image} forthcoming={t.home.galleryEmpty} />
          </figure>
        </div>
      </section>
    </>
  )
}
