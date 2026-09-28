import { useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { motionTokens, springs } from '../lib/motion-tokens'
import { useDialog } from '../lib/overlays'
import { IconClose, IconDevice } from './Icons'
import { StoreButtons } from './ui'

export function AppModal({ open, onClose }) {
  const ref = useRef(null)
  useDialog(ref, open, onClose)

  return (
    <AnimatePresence>
      {open && (
        <motion.div key="app-modal" className="modal" ref={ref} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: motionTokens.duration.fast }}>
          <div className="modal__backdrop" onClick={onClose} />
          <motion.div
            className="modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="app-modal-title"
            initial={{ opacity: 0, scale: motionTokens.scale.press, y: motionTokens.distance.sm }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: motionTokens.scale.press, y: motionTokens.distance.sm }}
            transition={springs.gentle}
          >
            <button className="modal__close" type="button" onClick={onClose} aria-label="Fechar"><IconClose width={18} height={18} /></button>
            <span className="modal__icon"><IconDevice width={26} height={26} /></span>
            <h2 id="app-modal-title">Baixe o app Baruque</h2>
            <p>Agende seu horário com o profissional que preferir e receba lembretes direto no celular.</p>
            <StoreButtons tone="dark" className="stores--stacked" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
