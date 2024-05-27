// src/composables/useProduct.ts
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import type { Tables, TablesInsert } from '@/lib/database.types'
import type { PostgrestError } from '@supabase/supabase-js'
import { useProductsStore } from '@/stores/products'
import { storeToRefs } from 'pinia'

export interface Product {
  productid?: number
  productname: string | null
  price: number | null
  stock: number | null
  categoryid: number | null
  picture: string | null
  category: Category
}

export interface Category {
  categoryname: string
}

export const useProduct = () => {
  const products = ref<Product[]>([])
  const isLoading = ref(false)
  const error = ref<PostgrestError | string | undefined>('')

  type Patch = {
    productname: string | null
    price: number | null
    stock: number
    categoryid: number | null
    picture: string | null
    category: { categoryname: string }
  }[]


  const fetchProducts = async (): Promise<Product[]> => {
    isLoading.value = true
    const { data, error: fetchError } = await supabase
      .from('product')
      .select(
        `
        productname,
        price,
        stock,
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
      throw new Error(fetchError.message)
    } else {
      const store = useProductsStore()
      const { products: storedproducts } = storeToRefs(store)
      products.value = data
      storedproducts.value = data
      return data
    }
  }

  const addProduct = async (product: TablesInsert<'product'>) => {
    isLoading.value = true
    const { error: insertError } = await supabase.from('product').insert(product)
    isLoading.value = false
    if (insertError) {
      error.value = insertError
      throw insertError
    }
  }

  const categories = ref<Tables<'category'>[]>()

  const fetchCategories = async () => {
    const { data, error: fetchError } = await supabase.from('category').select('*')
    if (fetchError) error.value = fetchError.message
    else categories.value = data
  }

  return {
    products,
    error,
    fetchProducts,
    addProduct,
    categories,
    isLoading,
    fetchCategories
  }
}
