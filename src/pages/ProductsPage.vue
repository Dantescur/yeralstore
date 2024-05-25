<script setup lang="ts">
// import { useProduct } from '@/components/Products/composables/useProduct'
import MainLayout from '@/components/Layouts/MainLayout.vue'
import ProductDetail from '@/components/Products/ProductDetail.vue'
import { createAvatar } from '@dicebear/core'
import { avataaars } from '@dicebear/collection'
import { useProduct } from '@/composables'
import { useBreakpoints } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import ProductHeader from '@/components/Products/ProductHeader.vue'
import CategorySelector from '@/components/Products/CategorySelector.vue'
import { useQuery } from '@tanstack/vue-query'

const userStore = useUserStore()

const breakpoints = useBreakpoints({
  mobile: 0,
  tablet: 640,
  laptop: 1024,
  desktop: 1280
})

const mobile = breakpoints.between('mobile', 'tablet')

const { fetchProducts, products } = useProduct()

// const { data: products, isError, isLoading, error, isPending } = useQuery({
//   queryKey: ['products'],
//   queryFn: fetchProducts,
// })

await fetchProducts()

// Generate a random avatar for each user
const randomAvatar = () => {
  return createAvatar(avataaars, {
    seed: userStore.user?.id,
    size: 50,
    style: ['circle']
  }).toDataUriSync()
}

const avatar = randomAvatar()

userStore.setAvatar(avatar)

const selectedCategories = ref<string[]>([])

const filteredProducts = computed(() => {
  if (selectedCategories.value.length === 0) {
    return products.value
  } else {
    return products.value.filter((product) =>
      selectedCategories.value.includes(product.category.categoryname)
    )
  }
})
</script>

<template>
  <MainLayout>
    <template #header>
      <ProductHeader :avatar="avatar" />
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
