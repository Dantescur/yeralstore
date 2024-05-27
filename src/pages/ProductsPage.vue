<script setup lang="ts">
// import { useProduct } from '@/components/Products/composables/useProduct'
import MainLayout from '@/components/Layouts/MainLayout.vue'
import ProductDetail from '@/components/Products/ProductDetail.vue'
import { useProduct } from '@/composables'
import { useBreakpoints } from '@vueuse/core'
import { computed, ref } from 'vue'
import ProductHeader from '@/components/Products/ProductHeader.vue'
import CategorySelector from '@/components/Products/CategorySelector.vue'
import { useQuery } from '@tanstack/vue-query'
import type { Product } from '@/composables'
import { useUserStore } from '@/stores/user'

const breakpoints = useBreakpoints({
  mobile: 0,
  tablet: 640,
  laptop: 1024,
  desktop: 1280
})

const mobile = breakpoints.between('mobile', 'tablet')

const { fetchProducts } = useProduct()

const {
  data: products
  // isError,
  // isLoading,
  // error,
  // isPending
} = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts
})

const userStore = useUserStore()

userStore.setAvatar()

// await fetchProducts()

function isProductArray(value: any): value is Product[] {
  return Array.isArray(value) && value.length > 0 && typeof value[0].productname === 'string'
}

const filteredProducts = computed(() => {
  if (!products.value) {
    return []
  }

  if (typeof products.value === 'string') {
    // Handle the case where products.value is an error message
    return []
  }

  if (isProductArray(products.value)) {
    if (selectedCategories.value.length === 0) {
      return products.value
    } else {
      return products.value.filter((product) =>
        selectedCategories.value.includes(product.category.categoryname)
      )
    }
  }

  return []
})

const selectedCategories = ref<string[]>([])
</script>

<template>
  <MainLayout>
    <template #header>
      <ProductHeader />
    </template>
    <template #main>
      <div class="product-heading">
        <h1>Products</h1>
        <CategorySelector :product="products" v-model:selectedCategories="selectedCategories" />
      </div>
      <div>
        <el-row v-if="!mobile" :gutter="16">
          <el-col :span="6" v-for="product in filteredProducts" :key="product.productid">
            <ProductDetail :product="product" />
          </el-col>
        </el-row>
        <el-row v-else :gutter="10">
          <el-col :span="12" v-for="product in filteredProducts" :key="product.productid">
            <ProductDetail :product="product" />
          </el-col>
        </el-row>
      </div>
    </template>
  </MainLayout>
</template>

<style scoped>
.product-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  width: 100%;
}

h1 {
  margin: 0;
}
</style>
