import { createClient } from '@supabase/supabase-js'
import { Product } from './productStore'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project-id')
)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null

export interface SupabaseProductRow {
  id: string
  name: string
  category: string
  code: string
  badge: string
  spec: string
  image: string
  material: string
  standards: string[]
  description: string
  points: string[]
  in_stock: boolean
  featured: boolean
  created_at?: string
  updated_at?: string
}

export interface SupabaseQuoteRow {
  id: string
  customer_name: string
  phone: string
  email: string
  product_name: string
  quantity: string
  message: string
  status: 'Pending' | 'Contacted' | 'Closed'
  created_at?: string
}

// Convert DB row to UI Product object
export function mapRowToProduct(row: SupabaseProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    code: row.code,
    badge: row.badge,
    spec: row.spec,
    image: row.image,
    material: row.material,
    standards: Array.isArray(row.standards) ? row.standards : [],
    description: row.description,
    points: Array.isArray(row.points) ? row.points : [],
    inStock: row.in_stock,
    featured: row.featured,
    updatedAt: row.updated_at
  }
}

// Convert UI Product to DB row payload
export function mapProductToRow(product: Product): Omit<SupabaseProductRow, 'created_at'> {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    code: product.code,
    badge: product.badge,
    spec: product.spec,
    image: product.image,
    material: product.material,
    standards: product.standards,
    description: product.description,
    points: product.points,
    in_stock: product.inStock ?? true,
    featured: Boolean(product.featured),
    updated_at: new Date().toISOString()
  }
}

// Async API functions with fallback grace
export async function fetchProductsFromSupabase(): Promise<Product[] | null> {
  if (!supabase) return null
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase fetch products error:', error)
      return null
    }

    return (data as SupabaseProductRow[]).map(mapRowToProduct)
  } catch (err) {
    console.error('Failed to fetch from Supabase:', err)
    return null
  }
}

export async function saveProductToSupabase(product: Product): Promise<boolean> {
  if (!supabase) return false
  try {
    const row = mapProductToRow(product)
    const { error } = await supabase
      .from('products')
      .upsert(row, { onConflict: 'id' })

    if (error) {
      console.error('Supabase upsert product error:', error)
      return false
    }
    return true
  } catch (err) {
    console.error('Failed to save to Supabase:', err)
    return false
  }
}

export async function deleteProductFromSupabase(id: string): Promise<boolean> {
  if (!supabase) return false
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase delete product error:', error)
      return false
    }
    return true
  } catch (err) {
    console.error('Failed to delete from Supabase:', err)
    return false
  }
}
