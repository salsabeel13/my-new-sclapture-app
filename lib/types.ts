export type Material = 'Gold' | 'Silver'

export interface Sculpture {
  id: string
  name: string
  price: number
  material: Material
  images: {
    Gold: string
    Silver: string
  }
  description: string
  dimensions: string
  weight: string
}

export interface CartItem {
  sculpture: Sculpture
  quantity: number
  selectedMaterial: Material
}

export interface FavoriteItem {
  sculpture: Sculpture
  selectedMaterial: Material
}
