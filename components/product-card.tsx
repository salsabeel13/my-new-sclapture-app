'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Heart, ShoppingBag, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { type Sculpture, type Material } from '@/lib/types'
import { useCart, useFavorites } from '@/lib/store-context'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  sculpture: Sculpture
  className?: string
  onQuickView?: (sculpture: Sculpture, material: Material) => void
}

export function ProductCard({ sculpture, className, onQuickView }: ProductCardProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(sculpture.material)
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  
  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  
  const favorite = isFavorite(sculpture.id, selectedMaterial)

  const handleFavoriteToggle = () => {
    if (favorite) {
      removeFromFavorites(sculpture.id, selectedMaterial)
    } else {
      addToFavorites(sculpture, selectedMaterial)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <article
      className={cn(
        'group relative',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-card mb-4">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <Image
          src={sculpture.images[selectedMaterial]}
          alt={`${sculpture.name} in ${selectedMaterial}`}
          fill
          className={cn(
            'object-cover transition-all duration-700',
            isHovered && 'scale-105',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Overlay on hover */}
        <div
          className={cn(
            'absolute inset-0 bg-background/60 transition-opacity duration-300 flex items-center justify-center gap-3',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        >
          <Button
            size="icon"
            variant="secondary"
            className="h-12 w-12 rounded-full bg-background/80 hover:bg-primary hover:text-primary-foreground transition-all"
            onClick={handleFavoriteToggle}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={cn('h-5 w-5 stroke-1', favorite && 'fill-primary text-primary')} />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-12 w-12 rounded-full bg-background/80 hover:bg-primary hover:text-primary-foreground transition-all"
            onClick={() => addToCart(sculpture, selectedMaterial)}
            aria-label="Add to cart"
          >
            <ShoppingBag className="h-5 w-5 stroke-1" />
          </Button>
          {onQuickView && (
            <Button
              size="icon"
              variant="secondary"
              className="h-12 w-12 rounded-full bg-background/80 hover:bg-primary hover:text-primary-foreground transition-all"
              onClick={() => onQuickView(sculpture, selectedMaterial)}
              aria-label="Quick view"
            >
              <Eye className="h-5 w-5 stroke-1" />
            </Button>
          )}
        </div>

        {/* Material Badge */}
        <div className="absolute top-4 left-4">
          <span
            className={cn(
              'px-3 py-1 text-xs tracking-[0.15em] uppercase',
              selectedMaterial === 'Gold'
                ? 'bg-gold/20 text-gold-light border border-gold/30'
                : 'bg-silver/20 text-silver-light border border-silver/30'
            )}
          >
            {selectedMaterial}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        {/* Material Switcher */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedMaterial('Gold')}
            className={cn(
              'flex-1 py-2 text-xs tracking-[0.15em] uppercase border transition-all duration-300',
              selectedMaterial === 'Gold'
                ? 'bg-gold/10 border-gold text-gold-light'
                : 'border-border text-muted-foreground hover:border-gold/50 hover:text-gold'
            )}
            aria-pressed={selectedMaterial === 'Gold'}
          >
            Gold
          </button>
          <button
            onClick={() => setSelectedMaterial('Silver')}
            className={cn(
              'flex-1 py-2 text-xs tracking-[0.15em] uppercase border transition-all duration-300',
              selectedMaterial === 'Silver'
                ? 'bg-silver/10 border-silver text-silver-light'
                : 'border-border text-muted-foreground hover:border-silver/50 hover:text-silver'
            )}
            aria-pressed={selectedMaterial === 'Silver'}
          >
            Silver
          </button>
        </div>

        {/* Title & Price */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-light text-foreground tracking-wide">
            {sculpture.name}
          </h3>
          <span className="text-lg text-primary font-light whitespace-nowrap">
            {formatPrice(sculpture.price)}
          </span>
        </div>

        {/* Description preview */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {sculpture.description}
        </p>
      </div>
    </article>
  )
}
