import NewsCard from '../components/ui/NewsCard'
import { localizeNews, news } from '../data/content'
import { useLanguage } from '../context/LanguageContext'

export default function NewsPage() {
  const { lang, t } = useLanguage()

  return (
    <>
      <section className="page-intro container">
        <p className="eyebrow">{t.newsPage.eyebrow}</p>
        <h1>{t.newsPage.title}</h1>
        <p className="lead">{t.newsPage.lead}</p>
      </section>
      <section className="section" style={{ paddingTop: 12 }}>
        <div className="container news-grid">
          {news.map((item) => (
            <NewsCard key={item.id} item={localizeNews(item, lang)} />
          ))}
        </div>
      </section>
    </>
  )
}
