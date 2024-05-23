import type { Product } from '@/composables/useProduct'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { ElNotification } from 'element-plus'
import { ShoppingCartFull } from '@element-plus/icons-vue'

export const useCartStore = defineStore(
  'cart',
  () => {
    const cartItems = ref<Product[]>([])

    const quantity = computed(() => cartItems.value.length)

    const checkout = async () => {
      const totalPrice = cartItems.value.reduce(
        (acc, product) => acc + (product.price ?? 0),
        0
      )
      const notification = ElNotification({
        title: 'Checkout',
        message: `Total: $${totalPrice.toFixed(2)}`,
        duration: 5000,
        icon: ShoppingCartFull
      })
      cartItems.value = []
      await notification
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
