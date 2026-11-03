import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import SplitHeading from '../components/experience/SplitHeading'
import Magnetic from '../components/experience/Magnetic'
import Lightbox from '../components/experience/Lightbox'
import Statistic from '../components/ui/Statistic'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useParallax } from '../hooks/useParallax'
import { useTextReveal } from '../hooks/useTextReveal'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { gallery } from '../data/content'
import { useLanguage } from '../context/LanguageContext'

export default function HomePage() {
  const { lang, t } = useLanguage()
  const root = useRef(null)
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(null)
  const home = t.home
  const items = gallery.filter((item) => filter === 'all' || item.category === filter)

  useScrollReveal(root, '[data-reveal]', [lang])
  useParallax(root, '[data-parallax]', [lang])
  useTextReveal(root, '[data-split]', [lang])

  useGSAP(() => {
    if (prefersReducedMotion()) return undefined

    const hero = root.current?.querySelector('.exp-hero')
    if (hero) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', overwrite: 'auto' } })
      tl.fromTo('.exp-hero-media img', { scale: 1.12 }, { scale: 1, duration: 2.2 }, 0)
        .fromTo('.exp-hero-media', { clipPath: 'inset(18% 12% 18% 12%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6 }, 0)
        .fromTo('.exp-hero .eyebrow', { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, 0.35)
        .fromTo('.exp-hero h1 .split-unit', { yPercent: 110 }, { yPercent: 0, stagger: 0.05, duration: 1.05 }, 0.45)
        .fromTo('.exp-hero .lead', { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, 0.9)
        .fromTo('.exp-hero-actions > *', { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.7 }, 1.05)
        .fromTo('.exp-hero-orb', { autoAlpha: 0, scale: 0.7 }, { autoAlpha: 1, scale: 1, stagger: 0.12, duration: 1.2 }, 0.6)
        .fromTo('.exp-scroll', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 1.3)
    }

    gsap.from('.legacy-visual img', {
      clipPath: 'inset(100% 0% 0% 0%)',
      duration: 1.4,
      ease: 'power3.inOut',
      scrollTrigger: { trigger: '.legacy-visual', start: 'top 78%', once: true },
    })

    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const track = root.current?.querySelector('.programs-track')
      const pin = root.current?.querySelector('.programs-pin')
      if (track && pin) {
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 80)
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      }

      gsap.utils.toArray('.purpose-item').forEach((item) => {
        gsap.from(item, {
          autoAlpha: 0.25,
          y: 40,
          duration: 0.9,
          scrollTrigger: {
            trigger: item,
            start: 'top 75%',
            end: 'top 30%',
            scrub: true,
          },
        })
      })
    })

    return () => mm.revert()
  }, { scope: root, dependencies: [lang] })

  return (
    <div ref={root} className="experience">
      <section className="exp-hero">
        <div className="exp-hero-media" data-parallax="-18">
          <img src="/images/hospital.jpg" alt={home.photoCredit} />
        </div>
        <span className="exp-hero-orb exp-hero-orb-a" data-parallax="20" />
        <span className="exp-hero-orb exp-hero-orb-b" data-parallax="-12" />
        <div className="exp-hero-copy">
          <p className="eyebrow">{home.eyebrow}</p>
          <SplitHeading as="h1" text={home.title} reveal={false} />
          <p className="lead">{home.lead}</p>
          <div className="exp-hero-actions">
            <Magnetic>
              <Link className="btn btn-light" to="/programs" data-cursor={home.explore}>
                {t.programsCta} <ArrowRight className="arrow" aria-hidden="true" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link className="btn btn-outline-light" to="/donate" data-cursor={home.discover}>
                {t.donate} <ArrowRight className="arrow" aria-hidden="true" />
              </Link>
            </Magnetic>
          </div>
          <div className="exp-scroll">
            <span>{home.scroll}</span>
            <span className="exp-scroll-line"><span /></span>
            <ArrowDown size={14} aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="exp-legacy">
        <span className="exp-legacy-word" data-parallax="30">{home.legacyWord}</span>
        <div className="container legacy-grid">
          <div className="legacy-copy" data-reveal>
            <p className="eyebrow">{home.legacyEyebrow}</p>
            <SplitHeading text={home.legacyTitle} />
            <p>{home.legacyBody}</p>
            <Magnetic className="inline-block">
              <Link className="text-link" to="/about" data-cursor={home.viewStory}>
                {home.legacyMore} <ArrowRight className="arrow" aria-hidden="true" />
              </Link>
            </Magnetic>
          </div>
          <div className="legacy-visual">
            <span className="legacy-frame" data-parallax="-16" />
            <img src="/images/founder.webp" alt={home.caption} />
            <div className="legacy-chip">{home.legacyChip}</div>
          </div>
        </div>
      </section>

      <section className="exp-purpose">
        <div className="container purpose-pin">
          <div className="purpose-sticky">
            <p className="eyebrow">{home.purposeEyebrow}</p>
            <h2>{home.purposeTitle}</h2>
            <p className="lead">{home.purposeLead}</p>
          </div>
          <div className="purpose-list">
            {home.purposes.map((item, index) => (
              <article className="purpose-item" key={item.title}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="exp-programs">
        <div className="programs-head" data-reveal>
          <p className="eyebrow">{home.programsEyebrow}</p>
          <h2>{home.programsTitle}</h2>
        </div>
        <div className="programs-pin">
        <div className="programs-track">
          {home.programs.map((program) => (
            <article className="program-slide" key={program.number} data-cursor={home.explore}>
              <div className="program-slide-media">
                {program.image ? (
                  <img src={program.image} alt="" loading="lazy" />
                ) : (
                  <div className="program-placeholder" />
                )}
              </div>
              <div className="program-slide-copy">
                <span>{program.number}</span>
                <h3>{program.title}</h3>
                <p>{program.text}</p>
                <Link className="text-link" to={program.to}>
                  {t.learnMore} <ArrowRight className="arrow" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        </div>
      </section>

      <section className="exp-impact">
        <div className="container">
          <div className="impact-layout">
            <div data-reveal>
              <p className="eyebrow">{home.impactEyebrow}</p>
              <h2>{home.impactTitle}</h2>
              <p className="lead">{home.impactNote}</p>
            </div>
            <div className="impact-cats">
              {home.impactCategories.map((item, index) => (
                <article className="impact-cat" key={item.title} data-reveal data-delay={index * 0.08}>
                  <strong>0{index + 1}</strong>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="impact-facts">
            {t.stats.map((stat) => (
              <Statistic key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      <section className="exp-family">
        <div className="container family-grid">
          <div data-reveal>
            <p className="eyebrow">{home.familyEyebrow}</p>
            <SplitHeading text={home.familyTitle} />
            <p>{home.familyBody}</p>
            <ul className="family-names">
              {home.familyMembers.map((person) => (
                <li key={person.name}>
                  <strong>{person.name}</strong>
                  <span>{person.role}</span>
                </li>
              ))}
            </ul>
          </div>
          <figure className="family-portrait">
            <span className="family-mark" data-parallax="18" />
            <img src="/images/founder.webp" alt={home.caption} />
            <figcaption>{home.caption}</figcaption>
          </figure>
        </div>
      </section>

      <section className="exp-gallery">
        <div className="container">
          <div className="gallery-head" data-reveal>
            <div>
              <p className="eyebrow">{home.galleryEyebrow}</p>
              <h2>{home.galleryTitle}</h2>
              <p className="lead">{home.galleryNote}</p>
            </div>
            <div className="gallery-filters" role="tablist">
              {home.galleryFilters.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={filter === item.id ? 'is-active' : ''}
                  onClick={() => setFilter(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="masonry">
            {items.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setActive(item)}
                data-cursor={item.src ? home.discover : undefined}
                aria-label={item[lang]}
              >
                {item.src ? (
                  <img src={item.src} alt={item[lang]} loading="lazy" />
                ) : (
                  <span className="gallery-empty">{home.galleryEmpty}</span>
                )}
                <span className="cap">{item[lang]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="exp-involve">
        <div className="container" data-reveal>
          <p className="eyebrow">{home.involvedEyebrow}</p>
          <h2>{home.involvedTitle}</h2>
          <p className="lead">{home.involvedBody}</p>
          <div className="involve-actions">
            <Magnetic as={Link} className="involve-btn" to="/volunteer" data-cursor={home.explore}>
              {home.volunteer} <ArrowRight className="arrow" aria-hidden="true" />
            </Magnetic>
            <Magnetic as={Link} className="involve-btn" to="/contact" data-cursor={home.explore}>
              {home.partnerCta} <ArrowRight className="arrow" aria-hidden="true" />
            </Magnetic>
            <Magnetic as={Link} className="involve-btn" to="/donate" data-cursor={home.discover}>
              {home.supportCta} <ArrowRight className="arrow" aria-hidden="true" />
            </Magnetic>
          </div>
        </div>
      </section>

      <Lightbox item={active} lang={lang} closeLabel={t.close} onClose={() => setActive(null)} />
    </div>
  )
}
