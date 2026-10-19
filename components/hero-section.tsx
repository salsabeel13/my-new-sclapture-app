'use client'

import { ArrowDown } from 'lucide-react'
import { HeroBackground } from '@/components/hero-background'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Pre-title */}
        <p className="text-sm tracking-[0.4em] text-muted-foreground uppercase mb-8 opacity-0 animate-fade-up stagger-1">
          Curated Collection
        </p>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-foreground mb-6 opacity-0 animate-fade-up stagger-2">
          <span className="block text-balance">Timeless</span>
          <span className="block text-foreground text-balance">Masterpieces</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light leading-relaxed opacity-0 animate-fade-up stagger-3 text-pretty">
          Discover extraordinary sculptures crafted with precision in gold and silver. 
          Each piece tells a story of artistry and timeless elegance.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up stagger-4">
          <a
            href="#gallery"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-sm tracking-[0.2em] uppercase bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
          >
            Explore Collection
          </a>
          <a
            href="#about"
            className="inline-flex items-center justify-center px-8 py-4 text-sm tracking-[0.2em] uppercase border border-border text-foreground hover:border-primary hover:text-primary transition-all duration-300"
          >
            Our Story
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in stagger-5">
          <a
            href="#gallery"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Scroll to gallery"
          >
            <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
            <ArrowDown className="h-4 w-4 stroke-1 animate-bounce" />
          </a>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-8 w-px h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden lg:block" />
      <div className="absolute top-20 right-8 w-px h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden lg:block" />
    </section>
  )
}
