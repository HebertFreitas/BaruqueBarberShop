import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ambient, appPerks, contact, features, hours, prices, process, reviews, stats, team } from '../data/content'
import { fadeUp, inViewOnce, motionTokens, springs, staggerContainer } from '../lib/motion-tokens'
import { useAppModal } from '../lib/overlays'
import { IconCheck, IconChevronLeft, IconChevronRight, IconClock, IconPin, IconStar } from './Icons'
import { PhotoTile, PillButton, SectionHeading, StoreButtons } from './ui'

const numberFormat = (decimals) => new Intl.NumberFormat('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

function CountUp({ value, decimals = 0, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const format = useMemo(() => numberFormat(decimals), [decimals])
  const [display, setDisplay] = useState(format.format(0))

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: reduce ? 0 : motionTokens.duration.cinematic * 1.4,
      ease: motionTokens.easing.smooth,
      onUpdate: (v) => setDisplay(format.format(v)),
    })
    return () => controls.stop()
  }, [inView, reduce, value, format])

  return <span ref={ref}>{display}{suffix}</span>
}

export function Intro() {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 55%'] })
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="section section--paper" id="experiencia">
      <div className="container">
        <motion.dl className="stats" variants={staggerContainer()} initial="hidden" whileInView="visible" viewport={inViewOnce}>
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp}>
              <dt>{s.label}</dt>
              <dd><CountUp {...s} /></dd>
            </motion.div>
          ))}
        </motion.dl>

        <div className="intro">
          <div>
            <SectionHeading first="Mais que um corte." second="Um momento seu." />
            <motion.p className="lead" variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce}>
              Na Baruque, cada detalhe importa. Um espaço acolhedor em Contagem para cuidar do visual, desacelerar e sair sentindo que o corte ficou do jeito certo.
            </motion.p>
          </div>

          <div className="steps">
            <p className="steps__label">Como funciona</p>
            <ol ref={listRef}>
              <span className="steps__track" aria-hidden="true"><motion.span style={{ scaleY: progress }} /></span>
              {process.map(([title, text], i) => (
                <motion.li key={title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce} transition={{ delay: i * motionTokens.stagger.base }}>
                  <span className="steps__num">{i + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

const featurePhotos = features.map((f) => f.photo)

export function Features() {
  return (
    <section className="section section--plaster section--tight">
      <div className="container">
        <SectionHeading first="O que nos torna" second="diferentes" />
        <motion.div className="bento" variants={staggerContainer()} initial="hidden" whileInView="visible" viewport={inViewOnce}>
          {features.map((f, i) => (
            <PhotoTile key={f.title} list={featurePhotos} index={i} group="features" className={`bento__item ${f.size ? `bento__item--${f.size}` : ''}`}>
              <span className="bento__copy">
                <span className="bento__tag">{f.tag}</span>
                <span className="bento__title">{f.title}</span>
                <span className="bento__text">{f.text}</span>
              </span>
            </PhotoTile>
          ))}
        </motion.div>
        <div className="center-action">
          <PillButton href="#servicos">Ver todos os serviços</PillButton>
        </div>
      </div>
    </section>
  )
}

export function Team() {
  return (
    <section className="section section--paper" id="equipe">
      <div className="container">
        <SectionHeading label="Nossa equipe" first="Quem cuida de você" align="center" />
        <motion.div className="team" variants={staggerContainer()} initial="hidden" whileInView="visible" viewport={inViewOnce}>
          {team.map((p) => (
            <motion.article key={p.name} className="member" variants={fadeUp}>
              <div className="member__photo"><img src={p.photo} alt={`Barbeiro trabalhando: ${p.role.toLowerCase()}`} loading="lazy" /></div>
              <p className="member__role">{p.role}</p>
              <h3>{p.name}</h3>
              <p>{p.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export function Pricing() {
  const openApp = useAppModal()
  return (
    <section className="section section--plaster section--tight" id="servicos">
      <div className="container container--narrow">
        <SectionHeading first="Valores" align="center" rule={false} />
        <motion.ul className="prices" variants={staggerContainer(motionTokens.stagger.tight)} initial="hidden" whileInView="visible" viewport={inViewOnce}>
          {prices.map((p) => (
            <motion.li key={p.name} className={p.featured ? 'is-featured' : ''} variants={fadeUp}>
              <div>
                <span className="prices__name">{p.name}</span>
                <span className="prices__time">{p.time}</span>
              </div>
              <span className="prices__value">{p.price}</span>
            </motion.li>
          ))}
        </motion.ul>
        <div className="center-action">
          <PillButton onClick={openApp}>Agendar agora</PillButton>
        </div>
      </div>
    </section>
  )
}

export function Ambient() {
  return (
    <section className="section section--paper" id="ambiente">
      <div className="container">
        <SectionHeading first="Nosso" second="ambiente" />
        <motion.div className="mosaic" variants={staggerContainer(motionTokens.stagger.tight)} initial="hidden" whileInView="visible" viewport={inViewOnce}>
          {ambient.map((photo, i) => (
            <PhotoTile key={photo.src} list={ambient} index={i} group="ambient" className={`mosaic__item mosaic__item--${i + 1}`}>
              <span className="mosaic__caption">{photo.alt}</span>
            </PhotoTile>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export function Reviews() {
  const [[index, dir], setState] = useState([0, 1])
  const go = (d) => setState(([i]) => [(i + d + reviews.length) % reviews.length, d])
  const review = reviews[index]

  return (
    <section className="section section--plaster" aria-roledescription="carrossel" aria-label="Depoimentos">
      <div className="container container--narrow reviews">
        <SectionHeading label="Depoimentos" first="O que dizem sobre nós" align="center" />
        <div className="reviews__stars" aria-label="Nota 5 de 5">
          {Array.from({ length: 5 }, (_, i) => <IconStar key={i} width={18} height={18} />)}
        </div>
        <div className="reviews__stage">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.figure
              key={index}
              custom={dir}
              variants={{
                enter: (d) => ({ opacity: 0, x: d * motionTokens.distance.lg }),
                center: { opacity: 1, x: 0 },
                exit: (d) => ({ opacity: 0, x: d * -motionTokens.distance.lg }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
              aria-live="polite"
            >
              <blockquote>“{review.text}”</blockquote>
              <figcaption><strong>{review.name}</strong>{review.when}, no Google</figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="reviews__controls">
          <motion.button type="button" onClick={() => go(-1)} aria-label="Depoimento anterior" whileTap={{ scale: motionTokens.scale.press }}><IconChevronLeft width={18} height={18} /></motion.button>
          <div className="reviews__dots">
            {reviews.map((r, i) => (
              <button key={r.name} type="button" className={i === index ? 'is-active' : ''} aria-label={`Depoimento ${i + 1} de ${reviews.length}`} aria-current={i === index} onClick={() => setState([i, i > index ? 1 : -1])}>
                {i === index && <motion.span layoutId="review-dot" transition={springs.snappy} />}
              </button>
            ))}
          </div>
          <motion.button type="button" onClick={() => go(1)} aria-label="Próximo depoimento" whileTap={{ scale: motionTokens.scale.press }}><IconChevronRight width={18} height={18} /></motion.button>
        </div>
      </div>
    </section>
  )
}

export function AppSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const phoneY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const phoneRotate = useTransform(scrollYProgress, [0, 1], [-6, 4])

  return (
    <section className="section section--ink app" id="app" ref={ref}>
      <div className="container app__grid">
        <motion.div variants={staggerContainer()} initial="hidden" whileInView="visible" viewport={inViewOnce}>
          <SectionHeading first="Agende pelo" second="app Baruque" tone="dark" />
          <motion.p className="lead lead--dark" variants={fadeUp}>Seu próximo horário a poucos toques. O app é gratuito para Android e iPhone.</motion.p>
          <motion.ul className="app__perks" variants={staggerContainer()}>
            {appPerks.map((perk) => (
              <motion.li key={perk} variants={fadeUp}><IconCheck width={18} height={18} />{perk}</motion.li>
            ))}
          </motion.ul>
          <motion.div variants={fadeUp}><StoreButtons tone="light" /></motion.div>
        </motion.div>

        <motion.div className="phone" style={{ y: phoneY, rotate: phoneRotate }} aria-hidden="true">
          <div className="phone__screen">
            <div className="phone__top">
              <img src="/baruque-logo-official.png" alt="" width="34" height="34" />
              <span>Olá! Qual serviço hoje?</span>
            </div>
            {prices.slice(0, 4).map((p, i) => (
              <div key={p.name} className={`phone__row ${i === 2 ? 'is-picked' : ''}`}>
                <span>{p.name}<small>{p.time}</small></span>
                <b>{p.price}</b>
              </div>
            ))}
            <div className="phone__cta">Escolher horário</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function Visit() {
  const openApp = useAppModal()
  return (
    <section className="section section--paper" id="contato">
      <div className="container visit">
        <div className="visit__info">
          <SectionHeading first="Venha nos" second="visitar" />
          <motion.div className="visit__details" variants={staggerContainer()} initial="hidden" whileInView="visible" viewport={inViewOnce}>
            <motion.div variants={fadeUp}>
              <span className="icon-box"><IconPin /></span>
              <div>
                <h3>Endereço</h3>
                <p>{contact.address.map((l) => <span key={l}>{l}</span>)}</p>
                <a className="text-link" href={contact.mapsLink} target="_blank" rel="noreferrer">Abrir no Google Maps</a>
              </div>
            </motion.div>
            <motion.div variants={fadeUp}>
              <span className="icon-box"><IconClock /></span>
              <div>
                <h3>Horário</h3>
                <p>{hours.map(([d, h]) => <span key={d}>{d}: {h}</span>)}</p>
              </div>
            </motion.div>
          </motion.div>
          <PillButton onClick={openApp}>Agendar agora</PillButton>
        </div>
        <motion.div className="visit__map" initial={{ opacity: 0, scale: motionTokens.scale.subtle }} whileInView={{ opacity: 1, scale: 1 }} viewport={inViewOnce} transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}>
          <iframe title="Mapa com a localização da Barbearia Baruque" src={contact.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </motion.div>
      </div>
    </section>
  )
}
