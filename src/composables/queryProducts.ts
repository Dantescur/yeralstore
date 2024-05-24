import { useQuery } from "@tanstack/vue-query"
const { fetchProducts } = "@/composables"

const { products, isLoading, isError, error } = useQuery({
  'products'
  [fetchProduct]
})
