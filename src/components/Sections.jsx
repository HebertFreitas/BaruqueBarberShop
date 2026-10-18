import { useEffect, useMemo, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { appPerks, brand, contact, copy, hours, prices, process, reviews, stats, team } from '../config/site'
import { AmbientSlider } from './AmbientSlider'
import { FeatureStack } from './FeatureStack'
import { fadeUp, inViewOnce, motionTokens, staggerContainer } from '../lib/motion-tokens'
import { useAppModal } from '../lib/overlays'
import { IconCheck, IconClock, IconPause, IconPin, IconPlay, IconStar } from './Icons'
import { PillButton, SectionHeading, StoreButtons } from './ui'

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
    <section className="section section--base" id="experiencia">
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
            <SectionHeading first={copy.intro.first} second={copy.intro.second} />
            <motion.p className="lead" variants={fadeUp} initial="hidden" whileInView="visible" viewport={inViewOnce}>
              {copy.intro.text}
            </motion.p>
          </div>

          <div className="steps">
            <p className="steps__label">{copy.intro.stepsLabel}</p>
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

export function Features() {
  return (
    <section className="section section--surface section--tight section--features" id="diferenciais">
      <div className="container">
        <SectionHeading first={copy.features.first} second={copy.features.second} align="center" />
        <FeatureStack />
        <div className="center-action">
          <PillButton href="#servicos">{copy.features.action}</PillButton>
        </div>
      </div>
    </section>
  )
}

export function Team() {
  return (
    <section className="section section--base" id="equipe">
      <div className="container">
        <SectionHeading label={copy.team.label} first={copy.team.title} align="center" />
        <motion.div className="team" variants={staggerContainer()} initial="hidden" whileInView="visible" viewport={inViewOnce}>
          {team.map((p) => (
            <motion.article key={p.name} className="member" variants={fadeUp}>
              <div className="member__photo"><img src={p.photo} alt={`${p.name}, ${p.role.toLowerCase()} da Baruque`} loading="lazy" decoding="async" /></div>
              <p className="member__role">{p.role}</p>
              <h3>{p.name}</h3>
              {p.text && <p>{p.text}</p>}
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
    <section className="section section--surface section--tight" id="servicos">
      <div className="container container--narrow">
        <SectionHeading first={copy.pricing.title} align="center" rule={false} />
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
          <PillButton onClick={openApp}>{copy.ctaShort}</PillButton>
        </div>
      </div>
    </section>
  )
}

export function Ambient() {
  return (
    <section className="section section--base" id="ambiente">
      <div className="container">
        <SectionHeading first={copy.ambient.first} second={copy.ambient.second} />
        <AmbientSlider />
      </div>
    </section>
  )
}

export function Reviews() {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.3 })
  const [index, setIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [focused, setFocused] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [visible, setVisible] = useState(() => !document.hidden)
  const reduce = useReducedMotion()
  const playing = autoplay && !reduce
  const go = (d) => setIndex((i) => (i + d + reviews.length) % reviews.length)

  useEffect(() => {
    const update = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])

  useEffect(() => {
    if (!playing || !inView || !visible || focused || dragging) return
    const timer = setTimeout(() => setIndex((i) => (i + 1) % reviews.length), motionTokens.duration.slide * 1000)
    return () => clearTimeout(timer)
  }, [index, playing, inView, visible, focused, dragging])

  return (
    <section className="section section--surface" aria-roledescription="carrossel" aria-label="Depoimentos">
      <div className="container container--narrow reviews" ref={ref}
        onFocusCapture={(event) => setFocused(event.target.matches(':focus-visible'))}
        onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}
      >
        <SectionHeading label={copy.reviews.label} first={copy.reviews.title} align="center" />
        <div className="reviews__stars" aria-label="Nota 5 de 5">
          {Array.from({ length: 5 }, (_, i) => <IconStar key={i} width={18} height={18} />)}
        </div>
        {/* Shared grid cell reserves the tallest review at every viewport/font size. */}
        <motion.div className="reviews__stage" aria-live={playing && !focused ? 'off' : 'polite'} aria-atomic="true"
          onPanStart={() => setDragging(true)}
          onPointerCancel={() => setDragging(false)}
          onPanEnd={(_, { offset, velocity }) => {
            setDragging(false)
            if (Math.abs(offset.x) <= Math.abs(offset.y)) return
            if (Math.abs(offset.x) > motionTokens.distance.lg || (Math.abs(offset.x) > 8 && Math.abs(velocity.x) > 350)) {
              go(offset.x < 0 ? 1 : -1)
            }
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
              event.preventDefault()
              go(event.key === 'ArrowRight' ? 1 : -1)
            }
          }}
        >
          {reviews.map((review, i) => (
            <motion.figure
              key={review.name}
              className="reviews__slide"
              initial={false}
              animate={{ opacity: i === index ? 1 : 0 }}
              transition={{ duration: reduce ? 0 : motionTokens.duration.normal, ease: motionTokens.easing.smooth }}
              aria-hidden={i !== index}
              inert={i !== index}
              style={{ pointerEvents: i === index ? 'auto' : 'none', zIndex: i === index ? 1 : 0 }}
            >
              <blockquote>“{review.text}”</blockquote>
              <figcaption><strong>{review.name}</strong>{review.when}, {copy.reviews.source}</figcaption>
            </motion.figure>
          ))}
        </motion.div>
        <div className="reviews__pagination" aria-label="Escolher depoimento"
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
              event.preventDefault()
              go(event.key === 'ArrowRight' ? 1 : -1)
            }
          }}
        >
          {reviews.map((review, i) => (
            <button key={review.name} type="button" aria-label={`Ver depoimento de ${review.name}`} aria-current={i === index ? 'true' : undefined} onClick={() => setIndex(i)} />
          ))}
          {!reduce && (
            <button className="reviews__playback" type="button"
              onClick={() => { if (!autoplay) setFocused(false); setAutoplay((value) => !value) }}
              aria-label={playing ? 'Pausar troca automática de depoimentos' : 'Ativar troca automática de depoimentos'}>
              {playing ? <IconPause /> : <IconPlay />}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export function AppSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rearPhoneY = useTransform(scrollYProgress, [0, 1], [motionTokens.distance.lg, -motionTokens.distance.lg])
  const rearPhoneRotate = useTransform(scrollYProgress, [0, 1], [-7, -2])
  const frontPhoneY = useTransform(scrollYProgress, [0, 1], [motionTokens.distance.xl, -motionTokens.distance.xl])
  const frontPhoneRotate = useTransform(scrollYProgress, [0, 1], [4, -2])

  return (
    <section className="section section--dark app" id="app" ref={ref}>
      <div className="container app__grid">
        <motion.div variants={staggerContainer()} initial="hidden" whileInView="visible" viewport={inViewOnce}>
          <SectionHeading first={copy.app.first} second={copy.app.second} tone="dark" />
          <motion.p className="lead lead--dark" variants={fadeUp}>{copy.app.text}</motion.p>
          <motion.ul className="app__perks" variants={staggerContainer()}>
            {appPerks.map((perk) => (
              <motion.li key={perk} variants={fadeUp}><IconCheck width={18} height={18} />{perk}</motion.li>
            ))}
          </motion.ul>
          <motion.div variants={fadeUp}><StoreButtons tone="light" /></motion.div>
        </motion.div>

        <div className="phones" aria-hidden="true">
          <motion.div className="phone phone--rear" style={{ y: rearPhoneY, rotate: rearPhoneRotate }}>
            <div className="phone__screen">
              <img src={copy.app.screens[0]} alt="" />
            </div>
          </motion.div>
          <motion.div className="phone phone--front" style={{ y: frontPhoneY, rotate: frontPhoneRotate }}>
            <div className="phone__screen">
              <img src={copy.app.screens[1]} alt="" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function Visit() {
  const openApp = useAppModal()
  return (
    <section className="section section--base" id="contato">
      <div className="container visit">
        <div className="visit__info">
          <SectionHeading first={copy.visit.first} second={copy.visit.second} />
          <motion.div className="visit__details" variants={staggerContainer()} initial="hidden" whileInView="visible" viewport={inViewOnce}>
            <motion.div variants={fadeUp}>
              <span className="icon-box"><IconPin /></span>
              <div>
                <h3>Endereço</h3>
                <p>{contact.address.map((l) => <span key={l}>{l}</span>)}</p>
                <a className="text-link" href={contact.mapsLink} target="_blank" rel="noreferrer">{copy.visit.mapsAction}</a>
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
          <PillButton onClick={openApp}>{copy.ctaShort}</PillButton>
        </div>
        <motion.div className="visit__map" initial={{ opacity: 0, scale: motionTokens.scale.subtle }} whileInView={{ opacity: 1, scale: 1 }} viewport={inViewOnce} transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}>
          <iframe title={`Mapa com a localização da ${brand.fullName}`} src={contact.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </motion.div>
      </div>
    </section>
  )
}
