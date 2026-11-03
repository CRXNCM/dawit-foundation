import ProgramCard from '../components/ui/ProgramCard'
import { localizeProgram, programs } from '../data/content'
import { useLanguage } from '../context/LanguageContext'

export default function ProgramsPage() {
  const { lang, t } = useLanguage()

  return (
    <>
      <section className="page-intro container">
        <p className="eyebrow">{t.programsPage.eyebrow}</p>
        <h1>{t.programsPage.title}</h1>
        <p className="lead">{t.programsPage.lead}</p>
      </section>
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container program-grid">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={localizeProgram(program, lang)} />
          ))}
        </div>
      </section>
    </>
  )
}
