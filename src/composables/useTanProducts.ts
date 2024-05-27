// src/composables/useProduct.ts
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import type { Tables, TablesInsert } from '@/lib/database.types'
import type { PostgrestError } from '@supabase/supabase-js'
import { useQuery } from '@tanstack/vue-query'

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


const getProducts = async (): Promise<Product[] | null> => {

  const { data } = await supabase.from('product').select(`
         productname,
         price,
        stock,
        categoryid,
         picture,
        category:categoryid (
           categoryname
       )
    `)

  if (!data) {
    throw new Error('No data returned from the query');
  }

  const products = data.map((item: any) => {
    if (!item.category || !item.category.categoryname) {
      throw new Error('Category data is missing or incorrect');
    }

    return {
      productname: item.productname,
      price: item.price,
      stock: item.stock,
      categoryid: item.categoryid,
      picture: item.picture,
      category: {
        categoryname: item.category.categoryname,
      },
    } as Product;
  });

  return products

}


const useProducts = () => {

  const { isLoading, data } = useQuery(
    ['products', 1],
    () => getProducts()
  );




  return {

  }
}

export default useProducts