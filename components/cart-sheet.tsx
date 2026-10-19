'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useCart } from '@/lib/store-context'
import { CheckoutDialog } from './checkout-dialog'
import { cn } from '@/lib/utils'

interface CartSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { cart, updateCartQuantity, removeFromCart, cartTotal, cartCount } = useCart()
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleCheckout = () => {
    onOpenChange(false)
    setCheckoutOpen(true)
  }

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-md bg-card border-border flex flex-col">
          <SheetHeader className="px-0">
            <SheetTitle className="text-xl font-light tracking-wide">
              Shopping Cart
            </SheetTitle>
            <SheetDescription className="text-muted-foreground">
              {cartCount === 0
                ? 'Your cart is empty'
                : `${cartCount} ${cartCount === 1 ? 'item' : 'items'} in your cart`}
            </SheetDescription>
          </SheetHeader>

          {cart.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground mb-6">
                  No items in your cart yet
                </p>
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="tracking-[0.1em] uppercase text-sm"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 -mx-4 px-4">
                <div className="space-y-4 py-4">
                  {cart.map((item) => (
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
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.sculpture.id,
                                  item.selectedMaterial,
                                  item.quantity - 1
                                )
                              }
                              className="h-7 w-7 border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3 stroke-1" />
                            </button>
                            <span className="text-sm text-foreground w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.sculpture.id,
                                  item.selectedMaterial,
                                  item.quantity + 1
                                )
                              }
                              className="h-7 w-7 border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3 stroke-1" />
                            </button>
                          </div>
                          <button
                            onClick={() =>
                              removeFromCart(item.sculpture.id, item.selectedMaterial)
                            }
                            className="text-muted-foreground hover:text-destructive transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4 stroke-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <SheetFooter className="flex-col gap-4 px-0 mt-auto">
                <Separator className="bg-border" />
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-muted-foreground">Calculated at checkout</span>
                  </div>
                  <Separator className="bg-border" />
                  <div className="flex justify-between">
                    <span className="text-foreground">Total</span>
                    <span className="text-xl text-primary font-light">
                      {formatPrice(cartTotal)}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-sm tracking-[0.15em] uppercase"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4 stroke-1 ml-2" />
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

      <CheckoutDialog open={checkoutOpen} onOpenChange={setCheckoutOpen} />
    </>
  )
}
