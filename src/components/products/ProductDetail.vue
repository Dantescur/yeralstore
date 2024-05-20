<script setup lang="ts">
import type { Database } from '@/lib/database.types'

defineProps<{
    product: Database['public']['Tables']['product']['Row']
}>()



</script>

<template>
    <el-card shadow="hover" style="width: 100%; margin-bottom: 16px">
        <el-image :src="product.picture" fit="cover" style="width: 100px; height: 100px" />
        <h3 style="margin-top: 16px">{{ product.productname }}</h3>
        <p style="margin-top: 8px">Price: ${{ product.price }}</p>
        <el-button type="primary" size="small" style="margin-top: 16px; width: 100%"
            @click="$router.push({ name: 'Cart', query: { productId: product.productid } })">Add to
            Cart</el-button>
    </el-card>
    <div>
        {{ }}
    </div>
</template>

<style scoped>
h1 {
    margin-bottom: 1rem;
}
</style>
