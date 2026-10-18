import { useCallback, useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { ambient } from '../config/site'
import { motionTokens } from '../lib/motion-tokens'
import { materialGeometry } from '../lib/material-slider'
import { useLightbox } from '../lib/overlays'
import { IconExpand, IconPause, IconPlay } from './Icons'

function AmbientSlide({ photo, index, active, geometry, progress, select, open, dragged }) {
  const left = useTransform(geometry, (items) => `${items[index].left}%`)
  const width = useTransform(geometry, (items) => `${items[index].width}%`)
  const emphasis = useTransform(progress, (value) => Math.max(0, 1 - Math.abs(value - index) / 0.7))
  return (
    <motion.div className="ambient-slider__slide" style={{ left, width }} role="group" aria-roledescription="slide" aria-label={`${index + 1} de ${ambient.length}: ${photo.alt}`}>
      <button
        className={`ambient-slider__photo ${active ? 'is-active' : ''}`}
        type="button"
        tabIndex={active ? 0 : -1}
        aria-label={active ? `Ampliar foto: ${photo.alt}` : `Ver foto: ${photo.alt}`}
        onClick={() => { if (!dragged.current) { if (active) open(index); else select(index) } }}
      >
        <img src={photo.src} alt="" loading="lazy" decoding="async" draggable="false" />
        <motion.span className="ambient-slider__caption" style={{ opacity: emphasis }}>{photo.alt}</motion.span>
        <motion.span className="ambient-slider__expand" style={{ opacity: emphasis }} aria-hidden="true"><IconExpand /></motion.span>
      </button>
    </motion.div>
  )
}

export function AmbientSlider() {
  const viewport = useRef(null)
  const controls = useRef(null)
  const dragStart = useRef(0)
  const dragged = useRef(false)
  const direction = useRef(1)
  const [active, setActive] = useState(0)
  const [compact, setCompact] = useState(false)
  const [autoplay, setAutoplay] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [visible, setVisible] = useState(true)
  const progress = useMotionValue(0)
  const reduce = useReducedMotion()
  const inView = useInView(viewport, { amount: 0.3 })
  const playing = autoplay && !reduce
  const openLightbox = useLightbox()
  const geometry = useTransform(progress, (value) => materialGeometry(value, ambient.length, compact))
  const clamp = (value) => Math.max(0, Math.min(ambient.length - 1, value))
  const paginationStart = Math.max(0, Math.min(active - 2, ambient.length - 5))
  const paginationPhotos = ambient.slice(paginationStart, paginationStart + 5)

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setCompact(entry.contentRect.width < 640))
    observer.observe(viewport.current)
    return () => { observer.disconnect(); controls.current?.stop() }
  }, [])

  const select = useCallback((index, automatic = false) => {
    const next = Math.max(0, Math.min(ambient.length - 1, index))
    // Reverse at the edges to preserve the same one-photo Material transition.
    if (next === ambient.length - 1) direction.current = -1
    else if (next === 0) direction.current = 1
    controls.current?.stop()
    setActive(next)
    controls.current = animate(progress, next, {
      duration: reduce ? 0 : automatic ? motionTokens.duration.ambientTransition : motionTokens.duration.slow,
      ease: automatic ? motionTokens.easing.ambient : motionTokens.easing.smooth,
    })
  }, [progress, reduce])

  useEffect(() => {
    const update = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])

  useEffect(() => {
    if (!playing || !inView || !visible || hovered || focused || dragging) return
    const timer = setTimeout(() => select(active + direction.current, true), motionTokens.duration.ambientSlide * 1000)
    return () => clearTimeout(timer)
  }, [active, playing, inView, visible, hovered, focused, dragging, select])

  return (
    <div
      className="ambient-slider" role="region" aria-roledescription="carrossel" aria-label="Fotos do nosso ambiente"
      onPointerEnter={(event) => { if (event.pointerType === 'mouse') setHovered(true) }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}
    >
      <motion.div
        className="ambient-slider__viewport"
        ref={viewport}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault()
            select(active + (event.key === 'ArrowRight' ? 1 : -1))
          } else if (event.key === 'Home' || event.key === 'End') {
            event.preventDefault()
            select(event.key === 'Home' ? 0 : ambient.length - 1)
          }
        }}
        onPointerDownCapture={() => { dragged.current = false }}
        onPanStart={() => { setDragging(true); controls.current?.stop(); dragStart.current = progress.get() }}
        onPan={(_, info) => {
          if (Math.abs(info.offset.x) <= Math.abs(info.offset.y)) return
          dragged.current = true
          const step = viewport.current.clientWidth * (compact ? 0.82 : 0.56)
          progress.set(clamp(dragStart.current - info.offset.x / step))
        }}
        onPanEnd={(_, info) => {
          setDragging(false)
          if (!dragged.current) { select(active); return }
          const direction = Math.abs(info.velocity.x) > 350 ? -Math.sign(info.velocity.x) : 0
          select(direction ? Math.round(dragStart.current) + direction : Math.round(progress.get()))
        }}
      >
        {ambient.map((photo, index) => (
          <AmbientSlide key={photo.src} photo={photo} index={index} active={index === active} geometry={geometry} progress={progress} select={select} dragged={dragged}
            open={(i) => { setAutoplay(false); openLightbox({ list: ambient, index: i, group: 'ambient' }) }} />
        ))}
        {!reduce && (
          <button type="button" className="ambient-slider__playback"
            onClick={() => { if (!autoplay) setFocused(false); setAutoplay((value) => !value) }}
            aria-label={playing ? 'Pausar troca automática de fotos' : 'Ativar troca automática de fotos'}>
            {playing ? <IconPause /> : <IconPlay />}
          </button>
        )}
      </motion.div>
      <div className="ambient-slider__controls">
        <div className="ambient-slider__pagination" aria-label="Escolher foto">
          {paginationPhotos.map((photo, offset) => {
            const index = paginationStart + offset
            return <button key={photo.src} type="button" aria-label={`Ver foto ${index + 1}: ${photo.alt}`} aria-current={active === index ? 'true' : undefined} onClick={() => select(index)} />
          })}
        </div>
      </div>
    </div>
  )
}
