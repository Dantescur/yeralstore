import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore(
  'cart',
  () => {
    const cartItems = ref<number[]>([])

    const addItem = (productid: number) => {
      cartItems.value.push(productid)
    }

    const removeItem = (productid: number) => {
      cartItems.value = cartItems.value.filter((item) => item !== productid)
    }

    return { cartItems, addItem, removeItem }
  },
  {
    persist: true
  }
)
