<script setup lang="ts">
// import { useProduct } from '@/components/products/composables/useProduct'
import MainLayout from '../components/layouts/MainLayout.vue'
import { useAuth } from '@/composables/useAuth'
import ProductDetail from '../components/products/ProductDetail.vue'
import { createAvatar } from '@dicebear/core'
import { avataaars } from '@dicebear/collection'
import { useProduct } from '@/components/products/composables/useProduct'
import { useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints({
  mobile: 0,
  tablet: 640,
  laptop: 1024,
  desktop: 1280
})

const mobile = breakpoints.between('mobile', 'tablet')

const { getSession } = useAuth()

const session = await getSession()

const { fetchProducts, products } = useProduct()

// await fetchProducts()
await fetchProducts()

// Generate a random avatar for each user
const randomAvatar = () => {
  const avatar = createAvatar(avataaars, {
    seed: session?.user.id,
    size: 50,
    style: ['circle']
  }).toDataUriSync()

  return avatar
}

const avatar = randomAvatar()
</script>

<template>
  <MainLayout>
    <template #header>
      <ProductHeader :avatar="avatar" :session="session" />
    </template>
    <template #main>
      <h1>Products</h1>
      <div class="flex-grow" />
      <!-- here a select for the categorys -->
      <div>
        <el-row v-if="!mobile" :gutter="16">
          <el-col :span="6" v-for="product in products" :key="product.productid">
            <ProductDetail :product="product" />
          </el-col>
        </el-row>
        <el-row v-else :gutter="10">
          <el-col :span="12" v-for="product in products" :key="product.productid">
            <ProductDetail :product="product" />
          </el-col>
        </el-row>
      </div>
    </template>
  </MainLayout>
</template>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
