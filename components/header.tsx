'use client'

import { useState } from 'react'
import { ShoppingBag, Heart, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart, useFavorites } from '@/lib/store-context'
import { CartSheet } from './cart-sheet'
import { FavoritesSheet } from './favorites-sheet'

export function Header() {
  const { cartCount } = useCart()
  const { favorites } = useFavorites()
  const [cartOpen, setCartOpen] = useState(false)
  const [favoritesOpen, setFavoritesOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="text-xl tracking-[0.3em] text-primary font-light uppercase">
              sclapture
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
              <a href="#gallery" className="text-sm tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors uppercase">
                Gallery
              </a>
              <a href="#about" className="text-sm tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors uppercase">
                About
              </a>
              <a href="#contact" className="text-sm tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors uppercase">
                Contact
              </a>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:text-primary"
                onClick={() => setFavoritesOpen(true)}
                aria-label="Open favorites"
              >
                <Heart className="h-5 w-5 stroke-1" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:text-primary"
                onClick={() => setCartOpen(true)}
                aria-label="Open cart"
              >
                <ShoppingBag className="h-5 w-5 stroke-1" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:text-primary"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 stroke-1" />
                ) : (
                  <Menu className="h-5 w-5 stroke-1" />
                )}
              </Button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md">
            <div className="px-6 py-8 flex flex-col gap-6">
              <a
                href="#gallery"
                className="text-lg tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors uppercase"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gallery
              </a>
              <a
                href="#about"
                className="text-lg tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors uppercase"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className="text-lg tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors uppercase"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </header>

      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      <FavoritesSheet open={favoritesOpen} onOpenChange={setFavoritesOpen} />
    </>
  )
}
