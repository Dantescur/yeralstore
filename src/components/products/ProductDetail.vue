<script setup lang="ts">
import { ref } from 'vue'
import CartPage from '@/pages/CartPage.vue'
import type { Product } from './composables/useProduct'
import { useCartStore } from '@/stores/cart'

const { addItem } = useCartStore()

const siComoNo = () => {
  addItem({ ...props.product })
}

const handleAddToCart = () => {
  siComoNo()
  openCartVisible.value = true
}

const openCartVisible = ref(false)

const props = defineProps<{
  product: Product
}>()
</script>

<template>
  <el-card shadow="hover" style="width: 100%; margin-bottom: 16px">
    <el-image :src="product.picture" fit="cover" style="width: 100px; height: 100px" />
    <h3 style="margin-top: 16px">{{ product.productname }}</h3>
    <div class="price-stock">
      <p style="margin-top: 8px">Price: ${{ product.price }}</p>
      <p style="margin-top: 8px">
        <span :class="{ 'text-danger': product.stock < 20 }">
          {{ product.stock < 20 ? 'Almost sold out:' : 'Stock:' }}
        </span>
        {{ ` ${product.stock}` }}
      </p>
    </div>

    <el-button
      type="primary"
      size="small"
      style="margin-top: 16px; width: 100%"
      @click="handleAddToCart"
      >Add to Cart</el-button
    >
  </el-card>

  <el-dialog v-model="openCartVisible" title="Cart">
    <CartPage />
  </el-dialog>
</template>

<style scoped>
h1 {
  margin-bottom: 1rem;
}

.text-danger {
  color: red;
}
</style>
