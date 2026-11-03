import NewsCard from '../components/ui/NewsCard'
import PageIntro from '../components/ui/PageIntro'
import { localizeNews, news } from '../data/content'
import { useLanguage } from '../context/LanguageContext'

export default function NewsPage() {
  const { lang, t } = useLanguage()

  return (
    <>
      <PageIntro eyebrow={t.newsPage.eyebrow} title={t.newsPage.title} lead={t.newsPage.lead} />
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
