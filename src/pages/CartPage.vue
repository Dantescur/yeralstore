<script setup lang="ts">
import CustomerHeader from '@/components/Customer/CustomerHeader.vue'
import type { Product } from '@/composables/useProduct'
import { useCartStore } from '@/stores/cart'
import { computed, ref } from 'vue'
import type { TableInstance } from 'element-plus'

const props = defineProps<{
  parentComponent?: string
}>()

const isDialog = props.parentComponent === 'Drawer'

const cartStore = useCartStore()
const cartItems = computed(() => cartStore.cartItems)

const removeItem = (index: number, product: Product) => {
  cartStore.removeItem(index, product)
}

const handleCheckout = () => {
  cartStore.checkout()
}

const tableLayout = ref<TableInstance['tableLayout']>('fixed')
</script>

<template>
  <CustomerHeader v-if="!isDialog" />

  <el-card class="cart" style="max-width: 600px">
    <el-table
      :table-layout="tableLayout"
      :data="cartItems"
      height="250px"
      width="300px"
      border
      stripe
      size="large"
    >
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
  margin: 0 auto;
}
</style>
