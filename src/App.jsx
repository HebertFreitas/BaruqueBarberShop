import './App.css'
import { useCallback, useState } from 'react'
import { MotionConfig } from 'motion/react'
import { AppModalContext, LightboxContext } from './lib/overlays'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Ambient, AppSection, Features, Intro, Pricing, Reviews, Team, Visit } from './components/Sections'
import { ScrollProgress, Footer } from './components/Footer'
import { Lightbox } from './components/Lightbox'
import { AppModal } from './components/AppModal'

function App() {
  const [lightbox, setLightbox] = useState(null)
  const [appOpen, setAppOpen] = useState(false)
  const openLightbox = useCallback(({ list, index, group }) => setLightbox({ list, index, group, dir: 1, navigated: false }), [])
  const openApp = useCallback(() => setAppOpen(true), [])
  const closeApp = useCallback(() => setAppOpen(false), [])

  return (
    <MotionConfig reducedMotion="user">
      <AppModalContext.Provider value={openApp}>
        <LightboxContext.Provider value={openLightbox}>
          <Header />
          <main>
            <Hero />
            <Intro />
            <Features />
            <Team />
            <Pricing />
            <Ambient />
            <Reviews />
            <AppSection />
            <Visit />
          </main>
          <Footer />
          <ScrollProgress />
          <Lightbox state={lightbox} setState={setLightbox} />
          <AppModal open={appOpen} onClose={closeApp} />
        </LightboxContext.Provider>
      </AppModalContext.Provider>
    </MotionConfig>
  )
}

export default App
