'use client'

import Image from 'next/image'
import { Trash2, ShoppingBag } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useCart, useFavorites } from '@/lib/store-context'
import { cn } from '@/lib/utils'

interface FavoritesSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FavoritesSheet({ open, onOpenChange }: FavoritesSheetProps) {
  const { favorites, removeFromFavorites } = useFavorites()
  const { addToCart } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleAddToCart = (item: typeof favorites[0]) => {
    addToCart(item.sculpture, item.selectedMaterial)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md bg-card border-border flex flex-col">
        <SheetHeader className="px-0">
          <SheetTitle className="text-xl font-light tracking-wide">
            Favorites
          </SheetTitle>
          <SheetDescription className="text-muted-foreground">
            {favorites.length === 0
              ? 'No favorites yet'
              : `${favorites.length} ${favorites.length === 1 ? 'item' : 'items'} saved`}
          </SheetDescription>
        </SheetHeader>

        {favorites.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground mb-6">
                Save your favorite pieces here
              </p>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="tracking-[0.1em] uppercase text-sm"
              >
                Explore Gallery
              </Button>
            </div>
          </div>
        ) : (
          <ScrollArea className="flex-1 -mx-4 px-4">
            <div className="space-y-4 py-4">
              {favorites.map((item) => (
                <div
                  key={`${item.sculpture.id}-${item.selectedMaterial}`}
                  className="flex gap-4 p-4 bg-secondary/30 border border-border"
                >
                  <div className="relative w-20 h-24 flex-shrink-0 bg-muted">
                    <Image
                      src={item.sculpture.images[item.selectedMaterial]}
                      alt={item.sculpture.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-light text-foreground truncate">
                      {item.sculpture.name}
                    </h4>
                    <p
                      className={cn(
                        'text-xs tracking-[0.1em] uppercase mt-1',
                        item.selectedMaterial === 'Gold'
                          ? 'text-gold'
                          : 'text-silver'
                      )}
                    >
                      {item.selectedMaterial}
                    </p>
                    <p className="text-sm text-primary mt-2">
                      {formatPrice(item.sculpture.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 h-8 text-xs tracking-[0.1em] uppercase border-border hover:border-primary hover:text-primary"
                        onClick={() => handleAddToCart(item)}
                      >
                        <ShoppingBag className="h-3 w-3 stroke-1 mr-1" />
                        Add to Cart
                      </Button>
                      <button
                        onClick={() =>
                          removeFromFavorites(item.sculpture.id, item.selectedMaterial)
                        }
                        className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors border border-border"
                        aria-label="Remove from favorites"
                      >
                        <Trash2 className="h-3 w-3 stroke-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  )
}
