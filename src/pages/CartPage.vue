<script setup lang="ts">
import CustomerHeader from '@/components/customer/CustomerHeader.vue'
import type { Tables } from '@/lib/database.types'
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'

const cartStore = useCartStore()
const cartItems = computed(() => cartStore.cartItems)

const removeItem = (productId: Tables<['productid']>) => {
  cartStore.removeItem(productId)
}

const siComoNo = () => {
  alert('No')
}
</script>

<template>
  <CustomerHeader />

  <el-card class="cart">
    <el-table :data="cartItems" stripe style="width: 100%">
      <el-table-column prop="product.productname" label="Product" />
      <el-table-column prop="quantity" label="Quantity" />
      <el-table-column prop="product.price" label="Price" />
      <el-table-column label="Total">
        <template #default="scope">
          {{ scope.row.product.price * scope.row.quantity }}
        </template>
      </el-table-column>
      <el-table-column label="Action">
        <template #default="scope">
          <el-button icon="el-icon-delete" type="text" @click="removeItem(scope.row.productid)" />
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 16px">
      <el-button type="primary" @click="siComoNo" :disabled="cartItems.length === 0"
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
