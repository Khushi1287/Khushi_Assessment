import { Navigate } from 'react-router-dom'
import { HeroSection } from '../components/ui/hero-section-9'
import { Features } from '../components/ui/features-11'
import PersonaSection from '../components/ui/features'
import { WavePath } from '../components/ui/wave-path'
import { Footer } from '../components/ui/footer'
import { useAuth } from '../contexts/AuthContext'

export function HomePage() {
  const { user, loading } = useAuth()

  // Redirect signed-in users to dashboard
  if (!loading && user) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <>
      <HeroSection />
      <div id="features">
        <Features />
      </div>
      <div id="about">
        <PersonaSection />
      </div>
      <WavePath />
      <Footer />
    </>
  )
}

