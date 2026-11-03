import SplitHeading from '../experience/SplitHeading'

export default function PageIntro({ eyebrow, title, lead, children }) {
  return (
    <section className="page-intro">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      {title ? <SplitHeading as="h1" text={title} /> : null}
      {lead ? <p className="lead">{lead}</p> : null}
      {children}
    </section>
  )
}
