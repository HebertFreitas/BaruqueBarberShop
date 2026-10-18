import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { features } from '../config/site'
import { featureStackPosition } from '../lib/feature-stack'
import { motionTokens, springs } from '../lib/motion-tokens'
import { useLightbox } from '../lib/overlays'
import { IconChevronLeft, IconChevronRight, IconExpand, IconPause, IconPlay } from './Icons'

const photos = features.map((feature) => feature.photo)

export function FeatureStack() {
  const ref = useRef(null)
  const dragged = useRef(false)
  const firstAdvance = useRef(true)
  const [active, setActive] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [focused, setFocused] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [visible, setVisible] = useState(true)
  const inView = useInView(ref, { amount: 0.3 })
  const reduce = useReducedMotion()
  const openLightbox = useLightbox()
  const playing = autoplay && !reduce
  const go = (direction) => setActive((index) => (index + direction + features.length) % features.length)

  useEffect(() => {
    const update = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])

  useEffect(() => {
    if (!playing || !inView || !visible || focused || dragging) return
    const delay = firstAdvance.current ? motionTokens.duration.featureFirstSlide : motionTokens.duration.featureSlide
    const timer = setTimeout(() => {
      firstAdvance.current = false
      setActive((index) => (index + 1) % features.length)
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [active, playing, inView, visible, focused, dragging])

  return (
    <div
      className="feature-stack"
      ref={ref}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Diferenciais da Baruque"
      data-effect="flick-cards-stack"
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault()
          go(event.key === 'ArrowRight' ? 1 : -1)
        }
      }}
    >
      <div className="feature-stack__stage">
        {features.map((feature, index) => {
          const position = featureStackPosition(index, active, features.length)
          const selected = index === active
          const { zIndex, ...animation } = position
          return (
            <motion.div
              key={feature.title}
              className="feature-stack__position"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} de ${features.length}`}
              aria-hidden={position.opacity === 0}
              initial={false}
              animate={animation}
              style={{ zIndex, pointerEvents: position.opacity ? 'auto' : 'none' }}
              transition={reduce ? { duration: 0 } : springs.gentle}
            >
              <motion.div
                className="feature-stack__drag"
                drag={selected ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.45}
                onPointerDownCapture={() => { dragged.current = false }}
                onDragStart={() => { dragged.current = true; setDragging(true) }}
                onDragEnd={(_, info) => {
                  setDragging(false)
                  const threshold = Math.min(ref.current.clientWidth * 0.1, motionTokens.distance.xl)
                  if (Math.abs(info.offset.x) > threshold || Math.abs(info.velocity.x) > 350) go(info.offset.x < 0 ? 1 : -1)
                }}
              >
                <button
                  type="button"
                  className={`feature-stack__card ${selected ? 'is-active' : ''}`}
                  tabIndex={selected ? 0 : -1}
                  aria-label={selected ? `Ampliar foto: ${feature.title}` : `Ver diferencial: ${feature.title}`}
                  onClick={() => {
                    if (dragged.current) return
                    if (!selected) { setActive(index); return }
                    setAutoplay(false)
                    openLightbox({ list: photos, index, group: 'features' })
                  }}
                >
                  <img src={feature.photo.src} alt="" loading="lazy" decoding="async" draggable="false" />
                  <span className="feature-stack__label"><span>{feature.tag}</span><strong>{feature.title}</strong></span>
                  {selected && <span className="feature-stack__expand" aria-hidden="true"><IconExpand /></span>}
                </button>
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      <div className="feature-stack__description" aria-live={playing && !focused ? 'off' : 'polite'} aria-atomic="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : motionTokens.duration.fast }}>{features[active].text}</motion.p>
        </AnimatePresence>
      </div>
      <div className="feature-stack__pagination" aria-label="Escolher diferencial">
        {features.map((feature, index) => <button key={feature.title} type="button" aria-label={`Ver ${feature.title}`} aria-current={active === index ? 'true' : undefined} onClick={() => setActive(index)} />)}
      </div>
      <div className="feature-stack__controls">
        <button type="button" onClick={() => go(-1)} aria-label="Diferencial anterior"><IconChevronLeft /></button>
        <span className="feature-stack__count">{active + 1} <span>/ {features.length}</span></span>
        <button type="button" onClick={() => go(1)} aria-label="Próximo diferencial"><IconChevronRight /></button>
        {!reduce && <button type="button" onClick={() => { if (!autoplay) setFocused(false); setAutoplay((value) => !value) }} aria-label={playing ? 'Pausar carrossel automático' : 'Ativar carrossel automático'}>{playing ? <IconPause /> : <IconPlay />}</button>}
      </div>
    </div>
  )
}
