import { StoreProvider } from '@/lib/store-context'
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { GallerySection } from '@/components/gallery-section'
import { AboutSection } from '@/components/about-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <GallerySection />
          <AboutSection />
        </main>
        <Footer />
      </div>
    </StoreProvider>
  )
}
