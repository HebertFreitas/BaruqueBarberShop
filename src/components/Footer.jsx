import { motion, useScroll } from 'motion/react'
import { brand, contact, copy, hours, nav } from '../config/site'
import { IconChevronUp, IconClock, IconInstagram, IconPhone, IconPin, IconWhatsApp } from './Icons'
import { StoreButtons } from './ui'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__tagline">{brand.tagline}</p>
        <div className="footer__grid">
          <div>
            <h3>Redes sociais</h3>
            <a className="footer__social" href={contact.instagram} target="_blank" rel="noreferrer"><IconInstagram width={18} height={18} />Instagram</a>
            <a className="footer__social" href={contact.whatsapp} target="_blank" rel="noreferrer"><IconWhatsApp width={18} height={18} />WhatsApp</a>
          </div>
          <div>
            <h3>Navegação</h3>
            <ul>{nav.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ul>
          </div>
          <div>
            <h3>Horário</h3>
            <p className="footer__line"><IconClock width={16} height={16} /><span>{hours.map(([d, h]) => <span key={d}>{d}: {h}</span>)}</span></p>
          </div>
          <div>
            <h3>Endereço</h3>
            <p className="footer__line"><IconPin width={16} height={16} /><span>{contact.address.map((l) => <span key={l}>{l}</span>)}</span></p>
            <a className="footer__line" href={contact.phoneHref}><IconPhone width={16} height={16} />{contact.phoneLabel}</a>
          </div>
        </div>
        <div className="footer__apps">
          <p>{copy.app.footerText}</p>
          <StoreButtons tone="light" />
        </div>
        <div className="footer__bottom">
          <p className="footer__legal">© {new Date().getFullYear()} {brand.fullName}. Todos os direitos reservados.</p>
          <a className="footer__top" href="#inicio" aria-label="Voltar ao topo"><IconChevronUp /></a>
        </div>
      </div>
    </footer>
  )
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return <motion.div className="progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
}
