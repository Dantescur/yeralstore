<script setup lang="ts">
import type { Database } from '@/lib/database.types'
import { useSupplier } from './composables/useSupplier';

defineProps<{
    product: Database['public']['Tables']['product']['Row']
}>()

const { error, fetchSuppliers, suppliers } = useSupplier()

await fetchSuppliers()

</script>

<template>
    <el-card shadow="hover" style="width: 100%; margin-bottom: 16px">
        <el-image :src="product.picture" fit="cover" style="width: 100px; height: 100px" />
        <h3 style="margin-top: 16px">{{ product.productname }}</h3>
        <p style="margin-top: 8px">Price: ${{ product.price }}</p>
        <p style="margin-top: 8px">Supplier: {{ suppliers[product.productid] ? suppliers[product.productid].suppliername
            : '' }}</p>
        <el-button type="primary" size="small" style="margin-top: 16px; width: 100%"
            @click="$router.push({ name: 'Cart', query: { productId: product.productid } })">Add to
            Cart</el-button>
    </el-card>
</template>

<style scoped>
h1 {
    margin-bottom: 1rem;
}
</style>
