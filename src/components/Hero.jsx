import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { copy, heroVideo } from '../config/site'
import { motionTokens, staggerContainer } from '../lib/motion-tokens'
import { useAppModal } from '../lib/overlays'
import { PillButton } from './ui'
import { IconChevronDown, IconPause, IconPlay } from './Icons'

const line = {
  hidden: { opacity: 0, y: '0.6em' },
  visible: { opacity: 1, y: 0, transition: { duration: motionTokens.duration.cinematic, ease: motionTokens.easing.smooth } },
}

export function Hero() {
  const ref = useRef(null)
  const videoRef = useRef(null)
  const openApp = useAppModal()
  const reduce = useReducedMotion()
  const inView = useInView(ref)
  const [paused, setPaused] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const showVideo = !reduce && !videoFailed
  const entrance = reduce ? false : 'hidden'
  const reveal = {
    hidden: { clipPath: 'inset(100% 0 0 0)', y: motionTokens.distance.md },
    visible: { clipPath: 'inset(0% 0 0 0)', y: 0, transitionEnd: { clipPath: 'none' } },
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video || !showVideo) return
    let cancelled = false
    function syncPlayback() {
      if (paused || !inView || document.hidden) {
        video.pause()
        return
      }
      video.play().catch(() => { if (!cancelled) setPaused(true) })
    }
    syncPlayback()
    document.addEventListener('visibilitychange', syncPlayback)
    return () => {
      cancelled = true
      video.pause()
      document.removeEventListener('visibilitychange', syncPlayback)
    }
  }, [paused, inView, showVideo])

  return (
    <section className={`hero${showVideo ? ' hero--video' : ''}`} id="inicio" ref={ref} data-video-visible={showVideo && inView ? 'true' : undefined}>
      <motion.div
        className="hero__atmosphere"
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: motionTokens.duration.slow }}
      />
      <div className="container hero__stage">
        <motion.div
          className="hero__visual"
          initial={entrance}
          animate="visible"
          variants={reveal}
          transition={{ duration: motionTokens.duration.cinematic, ease: motionTokens.easing.smooth, delay: motionTokens.stagger.loose }}
        >
          <div className="hero__video-frame">
            {showVideo ? (
              <video ref={videoRef} autoPlay muted loop playsInline preload="metadata" poster={heroVideo.poster} tabIndex={-1} aria-hidden="true" onError={() => setVideoFailed(true)}>
                <source src={heroVideo.src} type={heroVideo.type} onError={() => setVideoFailed(true)} />
              </video>
            ) : (
              <img src={heroVideo.poster} alt="" fetchPriority="high" />
            )}
            {showVideo && (
              <button type="button" className="hero__playback" aria-label={paused ? copy.hero.playVideo : copy.hero.pauseVideo} aria-pressed={paused} onClick={() => setPaused((value) => !value)}>
                {paused ? <IconPlay /> : <IconPause />}
                <span>{paused ? copy.hero.playVideo : copy.hero.pauseVideo}</span>
              </button>
            )}
          </div>
        </motion.div>
        <motion.div className="hero__content" variants={staggerContainer(motionTokens.stagger.loose, motionTokens.duration.normal)} initial={entrance} animate="visible">
          <motion.span className="hero__rule" aria-hidden="true" variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth } } }} />
          <motion.h1 variants={staggerContainer()}>
            <span className="hero__line"><motion.span variants={line}>{copy.hero.line1}</motion.span></span>
            <span className="hero__line hero__line--em">
              <motion.em variants={line}>{copy.hero.line2}</motion.em>
            </span>
          </motion.h1>
          <motion.p className="hero__text" variants={line}>
            {copy.hero.text}
          </motion.p>
          <motion.div className="hero__actions" variants={staggerContainer()}>
            <motion.div variants={line}><PillButton onClick={openApp} tone="light">{copy.cta}</PillButton></motion.div>
            <motion.a variants={line} className="hero__link" href="#experiencia">{copy.hero.link}</motion.a>
          </motion.div>
        </motion.div>
      </div>

      <a className="hero__scroll-cue" href="#experiencia">
        <span>{copy.hero.scrollHint}</span>
        <motion.span
          className="hero__scroll-arrow"
          aria-hidden="true"
          animate={{ y: reduce ? 0 : [0, motionTokens.distance.sm / 3, 0] }}
          transition={{ duration: motionTokens.duration.cinematic, ease: motionTokens.easing.inOut, repeat: reduce ? 0 : 2 }}
        ><IconChevronDown width={18} height={18} /></motion.span>
      </a>
    </section>
  )
}
