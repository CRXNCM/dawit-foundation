import { Link, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { localizeProgram, programs } from '../data/content'
import { useLanguage } from '../context/LanguageContext'
import MediaFrame from '../components/ui/MediaFrame'
import NotFoundPage from './NotFoundPage'

export default function ProgramDetailPage() {
  const { id } = useParams()
  const { lang, t } = useLanguage()
  const program = programs.find((item) => item.id === id)
  if (!program) return <NotFoundPage />
  const data = localizeProgram(program, lang)

  return (
    <>
      <section className="page-intro container">
        <p className="eyebrow">{t.programsPage.eyebrow}</p>
        <h1>{data.title}</h1>
        <p className="lead">{data.summary}</p>
      </section>
      <section className="section section-white">
        <div className="container article-layout">
          <div className="prose">
            <p>{data.body}</p>
            <p>
              <Link className="text-link" to="/programs">
                {t.programsCta} <ArrowRight aria-hidden="true" />
              </Link>
            </p>
          </div>
          <figure className="article-photo">
            <MediaFrame src={data.image} forthcoming={t.home.galleryEmpty} />
            <figcaption>{data.title}</figcaption>
          </figure>
        </div>
      </section>
    </>
  )
}
