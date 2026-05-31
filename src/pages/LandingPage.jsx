import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/sections/HeroSection'
import FeaturesSection from '../components/sections/FeaturesSection'
import DemoSection from '../components/sections/DemoSection'
import StatsSection from '../components/sections/StatsSection'
import FaqSection from '../components/sections/FaqSection'
import WaitlistForm from '../components/sections/WaitlistForm'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <DemoSection />
        <StatsSection />
        <FaqSection />
        <WaitlistForm />
      </main>
      <Footer />
    </div>
  )
}
