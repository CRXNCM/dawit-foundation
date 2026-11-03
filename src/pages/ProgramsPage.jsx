import ProgramCard from '../components/ui/ProgramCard'
import PageIntro from '../components/ui/PageIntro'
import { localizeProgram, programs } from '../data/content'
import { useLanguage } from '../context/LanguageContext'

export default function ProgramsPage() {
  const { lang, t } = useLanguage()

  return (
    <>
      <PageIntro eyebrow={t.programsPage.eyebrow} title={t.programsPage.title} lead={t.programsPage.lead} />
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
