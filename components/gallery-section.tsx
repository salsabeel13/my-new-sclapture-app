'use client'

import { useState } from 'react'
import { ProductCard } from './product-card'
import { QuickViewDialog } from './quick-view-dialog'
import { sculptures } from '@/lib/data'
import { type Sculpture, type Material } from '@/lib/types'

export function GallerySection() {
  const [quickViewOpen, setQuickViewOpen] = useState(false)
  const [selectedSculpture, setSelectedSculpture] = useState<Sculpture | null>(null)
  const [selectedMaterial, setSelectedMaterial] = useState<Material>('Gold')

  const handleQuickView = (sculpture: Sculpture, material: Material) => {
    setSelectedSculpture(sculpture)
    setSelectedMaterial(material)
    setQuickViewOpen(true)
  }

  return (
    <section id="gallery" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-sm tracking-[0.4em] text-muted-foreground uppercase mb-4">
            The Collection
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-6 text-balance">
            Curated <span className="text-primary">Masterpieces</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed text-pretty">
            Each sculpture in our collection has been meticulously crafted by master artisans, 
            combining traditional techniques with contemporary vision.
          </p>
        </div>

        {/* Asymmetrical Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* First row - 2 items with offset */}
          <div className="lg:col-span-1">
            <ProductCard
              sculpture={sculptures[0]}
              onQuickView={handleQuickView}
            />
          </div>
          <div className="lg:col-span-1 lg:mt-16">
            <ProductCard
              sculpture={sculptures[1]}
              onQuickView={handleQuickView}
            />
          </div>
          <div className="lg:col-span-1 lg:mt-8">
            <ProductCard
              sculpture={sculptures[2]}
              onQuickView={handleQuickView}
            />
          </div>

          {/* Second row - offset pattern reversed */}
          <div className="lg:col-span-1 lg:-mt-8">
            <ProductCard
              sculpture={sculptures[3]}
              onQuickView={handleQuickView}
            />
          </div>
          <div className="lg:col-span-1">
            <ProductCard
              sculpture={sculptures[4]}
              onQuickView={handleQuickView}
            />
          </div>
          <div className="lg:col-span-1 lg:mt-12">
            <ProductCard
              sculpture={sculptures[5]}
              onQuickView={handleQuickView}
            />
          </div>

          {/* Third row */}
          <div className="lg:col-span-1 lg:mt-4">
            <ProductCard
              sculpture={sculptures[6]}
              onQuickView={handleQuickView}
            />
          </div>
          <div className="lg:col-span-1 lg:-mt-4">
            <ProductCard
              sculpture={sculptures[7]}
              onQuickView={handleQuickView}
            />
          </div>
        </div>

        {/* View All CTA */}
        <div className="text-center mt-16 md:mt-24">
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-4 text-sm tracking-[0.2em] uppercase border border-border text-foreground hover:border-primary hover:text-primary transition-all duration-300"
          >
            View Full Collection
          </a>
        </div>
      </div>

      {/* Quick View Dialog */}
      {selectedSculpture && (
        <QuickViewDialog
          open={quickViewOpen}
          onOpenChange={setQuickViewOpen}
          sculpture={selectedSculpture}
          initialMaterial={selectedMaterial}
        />
      )}
    </section>
  )
}
