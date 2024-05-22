import type { Product } from '@/components/products/composables/useProduct'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCartStore = defineStore(
  'cart',
  () => {
    const cartItems = ref<Product[]>([])

    const quantity = computed(() => cartItems.value.length)

    const checkout = async () => {
      cartItems.value.forEach((product) => {
        console.log(product)
      })
    }

    const addItem = (product: Product) => {
      cartItems.value.push(product)
    }

    const removeItem = (index: number, product: Product) => {
      cartItems.value = cartItems.value.filter((item) => item !== product)
    }

    return { cartItems, addItem, removeItem, quantity, checkout }
  },
  {
    persist: true
  }
)
