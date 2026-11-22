export interface Coffee{
  id: string
  name: string
  date: string
  import: boolean
  category: string
  origin: string
  roast: string
  price: number
  weightGrams: number
  rating: number
  inStock: boolean
  tags: string[]
}

export type Role = "user" | "moderator" | "admin"