import { useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { motionTokens, springs } from '../lib/motion-tokens'
import { useDialog } from '../lib/overlays'
import { IconChevronLeft, IconChevronRight, IconClose } from './Icons'

const slide = {
  open: { opacity: 0, x: 0, scale: motionTokens.scale.subtle },
  enter: (dir) => ({ opacity: 0, x: dir * motionTokens.distance.xl }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir) => ({ opacity: 0, x: dir * -motionTokens.distance.xl }),
}

// Animate only the dialog photo. Shared layout projection between a scrolled card
// and a fixed dialog can leave stale transforms on the card after closing.
export function Lightbox({ state, setState }) {
  const ref = useRef(null)
  const close = useCallback(() => setState(null), [setState])
  const go = useCallback((dir) => setState((s) => s && ({
    ...s, dir, navigated: true, index: (s.index + dir + s.list.length) % s.list.length,
  })), [setState])
  const onKey = useCallback((e) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }, [go])
  useDialog(ref, Boolean(state), close, onKey)

  return (
    <AnimatePresence>
      {state && (
        <motion.div
          key="lightbox"
          ref={ref}
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Galeria de fotos"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: motionTokens.duration.fast }}
        >
          <div className="lightbox__backdrop" onClick={close} />
          <button className="lightbox__btn lightbox__close" type="button" onClick={close} aria-label="Fechar foto"><IconClose /></button>
          {state.list.length > 1 && (
            <>
              <button className="lightbox__btn lightbox__prev" type="button" onClick={() => go(-1)} aria-label="Foto anterior"><IconChevronLeft /></button>
              <button className="lightbox__btn lightbox__next" type="button" onClick={() => go(1)} aria-label="Próxima foto"><IconChevronRight /></button>
            </>
          )}

          <div className="lightbox__stage">
            <AnimatePresence initial={false} custom={state.dir} mode="popLayout">
              <Slide key={state.index} state={state} go={go} />
            </AnimatePresence>
          </div>

          <motion.p
            className="lightbox__caption"
            key={`caption-${state.index}`}
            initial={{ opacity: 0, y: motionTokens.distance.sm / 2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            aria-live="polite"
          >
            {state.list[state.index].alt}
            <span>{state.index + 1} / {state.list.length}</span>
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Slide({ state, go }) {
  const photo = state.list[state.index]
  return (
    <motion.div
      className="lightbox__frame"
      style={{ '--ratio': photo.width / photo.height, borderRadius: 10 }}
      custom={state.dir}
      variants={slide}
      initial={state.navigated ? 'enter' : 'open'}
      animate="center"
      exit="exit"
      transition={springs.layout}
      drag={state.list.length > 1 ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.4}
      onDragEnd={(_, info) => {
        if (info.offset.x < -80) go(1)
        else if (info.offset.x > 80) go(-1)
      }}
    >
      <div className="lightbox__fill">
        <img src={photo.src} alt={photo.alt} draggable="false" />
      </div>
    </motion.div>
  )
}
