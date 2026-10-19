'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Heart, ShoppingBag, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { type Sculpture, type Material } from '@/lib/types'
import { useCart, useFavorites } from '@/lib/store-context'
import { cn } from '@/lib/utils'

interface QuickViewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sculpture: Sculpture
  initialMaterial?: Material
}

export function QuickViewDialog({
  open,
  onOpenChange,
  sculpture,
  initialMaterial = 'Gold',
}: QuickViewDialogProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(initialMaterial)
  const [quantity, setQuantity] = useState(1)
  
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

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(sculpture, selectedMaterial)
    }
    onOpenChange(false)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 bg-card border-border overflow-hidden" showCloseButton={false}>
        <DialogTitle className="sr-only">{sculpture.name} - Quick View</DialogTitle>
        
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-10 p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5 stroke-1" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square bg-muted">
            <Image
              src={sculpture.images[selectedMaterial]}
              alt={`${sculpture.name} in ${selectedMaterial}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            
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

          {/* Details */}
          <div className="p-8 flex flex-col">
            <div className="flex-1">
              <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-2">
                sclapture
              </p>
              <h2 className="text-3xl font-light text-foreground tracking-wide mb-4">
                {sculpture.name}
              </h2>
              <p className="text-2xl text-primary font-light mb-6">
                {formatPrice(sculpture.price)}
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-8">
                {sculpture.description}
              </p>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                <div>
                  <span className="text-muted-foreground block mb-1">Dimensions</span>
                  <span className="text-foreground">{sculpture.dimensions}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Weight</span>
                  <span className="text-foreground">{sculpture.weight}</span>
                </div>
              </div>

              {/* Material Selector */}
              <div className="mb-6">
                <span className="text-sm text-muted-foreground block mb-3">Finish</span>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedMaterial('Gold')}
                    className={cn(
                      'flex-1 py-3 text-sm tracking-[0.15em] uppercase border transition-all duration-300',
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
                      'flex-1 py-3 text-sm tracking-[0.15em] uppercase border transition-all duration-300',
                      selectedMaterial === 'Silver'
                        ? 'bg-silver/10 border-silver text-silver-light'
                        : 'border-border text-muted-foreground hover:border-silver/50 hover:text-silver'
                    )}
                    aria-pressed={selectedMaterial === 'Silver'}
                  >
                    Silver
                  </button>
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <span className="text-sm text-muted-foreground block mb-3">Quantity</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 border border-border text-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="text-lg text-foreground w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 border border-border text-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                className="flex-1 h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-sm tracking-[0.15em] uppercase"
              >
                <ShoppingBag className="h-4 w-4 stroke-1 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-14 w-14 border-border hover:border-primary hover:text-primary"
                onClick={handleFavoriteToggle}
                aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={cn('h-5 w-5 stroke-1', favorite && 'fill-primary text-primary')} />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
