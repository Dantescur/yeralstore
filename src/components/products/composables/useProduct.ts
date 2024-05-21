// src/composables/useProduct.ts
import { ref } from 'vue'
import { supabase } from '../../../lib/supabaseClient'
import type { Tables, TablesInsert, TablesUpdate } from '../../../lib/database.types'

export interface Product {
  productid: number
  productname: string | null
  price: number | null
  categoryid: number | null
  picture: string | null
  category: Category
}

export interface Category {
  categoryname: string | null
}

export function useProduct() {
  const products = ref<Product[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  type Patch = {
    productid: number
    productname: string | null
    price: number | null
    categoryid: number | null
    picture: string | null
    category: { categoryname: string | null }
  }[]

  const fetchProducts = async (): Promise<Product[] | string> => {
    isLoading.value = true
    const { data, error: fetchError } = await supabase
      .from('product')
      .select(
        `
        productid,
        productname,
        price,
        categoryid,
        picture,
        category:categoryid (
          categoryname
        )
        `
      )
      .returns<Patch>()
    isLoading.value = false
    if (fetchError) {
      error.value = fetchError.message
      return fetchError.message
    } else {
      products.value = data
      return data
    }
  }

  const addProduct = async (product: TablesInsert<'product'>) => {
    isLoading.value = true

    const { error: insertError } = await supabase.from('product').insert(product)
    isLoading.value = false
    if (insertError) error.value = insertError.message
    else await fetchProducts() // Refresh list
  }

  const updateProduct = async (productId: number, product: TablesUpdate<'product'>) => {
    isLoading.value = true
    const { error: updateError } = await supabase
      .from('product')
      .update(product)
      .eq('productid', productId)
    isLoading.value = false
    if (updateError) error.value = updateError.message
    else await fetchProducts() // Refresh list
  }

  const deleteProduct = async (productId: number) => {
    isLoading.value = true
    const { error: deleteError } = await supabase
      .from('product')
      .delete()
      .eq('productid', productId)
    isLoading.value = false
    if (deleteError) error.value = deleteError.message
    else await fetchProducts() // Refresh list
  }

  const categories = ref<Tables<'category'>[]>()

  return {
    products,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    // fetchCategories,
    categories,
    isLoading
  }
}
