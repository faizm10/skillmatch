import HeroSection from "@/components/hero-section-demo-1"
import Features from "@/components/features"
import HowItWorks from "@/components/how-it-works"
import Testimonials from "@/components/testimonials"
import FAQ from "@/components/faq"
import CTA from "@/components/cta"
import Footer from "@/components/footer"
import NavbarComponent from "@/components/navbar-component"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-neutral-950 dark:to-neutral-900">
      <NavbarComponent/>
      <HeroSection />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
