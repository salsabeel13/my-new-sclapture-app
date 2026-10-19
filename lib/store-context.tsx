'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { type CartItem, type FavoriteItem, type Sculpture, type Material } from './types'

interface StoreContextType {
  cart: CartItem[]
  favorites: FavoriteItem[]
  addToCart: (sculpture: Sculpture, material: Material) => void
  removeFromCart: (sculptureId: string, material: Material) => void
  updateCartQuantity: (sculptureId: string, material: Material, quantity: number) => void
  clearCart: () => void
  addToFavorites: (sculpture: Sculpture, material: Material) => void
  removeFromFavorites: (sculptureId: string, material: Material) => void
  isFavorite: (sculptureId: string, material: Material) => boolean
  cartTotal: number
  cartCount: number
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])

  const addToCart = useCallback((sculpture: Sculpture, material: Material) => {
    setCart(prev => {
      const existing = prev.find(
        item => item.sculpture.id === sculpture.id && item.selectedMaterial === material
      )
      if (existing) {
        return prev.map(item =>
          item.sculpture.id === sculpture.id && item.selectedMaterial === material
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { sculpture, quantity: 1, selectedMaterial: material }]
    })
  }, [])

  const removeFromCart = useCallback((sculptureId: string, material: Material) => {
    setCart(prev => prev.filter(
      item => !(item.sculpture.id === sculptureId && item.selectedMaterial === material)
    ))
  }, [])

  const updateCartQuantity = useCallback((sculptureId: string, material: Material, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(sculptureId, material)
      return
    }
    setCart(prev => prev.map(item =>
      item.sculpture.id === sculptureId && item.selectedMaterial === material
        ? { ...item, quantity }
        : item
    ))
  }, [removeFromCart])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const addToFavorites = useCallback((sculpture: Sculpture, material: Material) => {
    setFavorites(prev => {
      const existing = prev.find(
        item => item.sculpture.id === sculpture.id && item.selectedMaterial === material
      )
      if (existing) return prev
      return [...prev, { sculpture, selectedMaterial: material }]
    })
  }, [])

  const removeFromFavorites = useCallback((sculptureId: string, material: Material) => {
    setFavorites(prev => prev.filter(
      item => !(item.sculpture.id === sculptureId && item.selectedMaterial === material)
    ))
  }, [])

  const isFavorite = useCallback((sculptureId: string, material: Material) => {
    return favorites.some(
      item => item.sculpture.id === sculptureId && item.selectedMaterial === material
    )
  }, [favorites])

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.sculpture.price * item.quantity,
    0
  )

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <StoreContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useCart() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useCart must be used within a StoreProvider')
  }
  return {
    cart: context.cart,
    addToCart: context.addToCart,
    removeFromCart: context.removeFromCart,
    updateCartQuantity: context.updateCartQuantity,
    clearCart: context.clearCart,
    cartTotal: context.cartTotal,
    cartCount: context.cartCount,
  }
}

export function useFavorites() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useFavorites must be used within a StoreProvider')
  }
  return {
    favorites: context.favorites,
    addToFavorites: context.addToFavorites,
    removeFromFavorites: context.removeFromFavorites,
    isFavorite: context.isFavorite,
  }
}
