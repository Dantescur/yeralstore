<script setup lang="ts">
import CustomerHeader from '@/components/Customer/CustomerHeader.vue'
import type { Product } from '@/composables/useProduct'
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'

const cartStore = useCartStore()
const cartItems = computed(() => cartStore.cartItems)

const removeItem = (index: number, product: Product) => {
  cartStore.removeItem(index, product)
}

const handleCheckout = () => {
  cartStore.checkout()
}
</script>

<template>
  <CustomerHeader />

  <el-card class="cart">
    <el-table :data="cartItems" height="250px" border stripe style="width: 100%">
      <el-table-column prop="productname" label="Product" />
      <el-table-column prop="price" label="Price" />
      <el-table-column align="right" label="Operations">
        <template #default="scope">
          <el-button size="small" type="danger" @click="removeItem(scope.$index, scope.row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 16px">
      <el-button type="primary" @click="handleCheckout" :disabled="cartItems.length === 0"
        >Checkout</el-button
      >
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.cart {
  max-width: 600px;
  margin: 0 auto;
}
</style>
