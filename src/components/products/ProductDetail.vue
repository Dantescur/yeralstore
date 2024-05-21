<script setup lang="ts">
import type { Product } from './composables/useProduct'

defineProps<{
  product: Product
}>()
</script>

<template>
  <el-card shadow="hover" style="width: 100%; margin-bottom: 16px">
    <el-image :src="product.picture" fit="cover" style="width: 100px; height: 100px" />
    <h3 style="margin-top: 16px">{{ product.productname }}</h3>
    <p style="margin-top: 8px">Price: ${{ product.price }}</p>
    <el-button
      type="primary"
      size="small"
      style="margin-top: 16px; width: 100%"
      @click="$router.push({ name: 'Cart' })"
      >Add to Cart</el-button
    >
    <div>
      {{ product.category.categoryname }}
    </div>
  </el-card>
</template>

<style scoped>
h1 {
  margin-bottom: 1rem;
}
</style>
