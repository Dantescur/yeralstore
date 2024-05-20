<script setup lang="ts">
import { useProduct } from '@/components/products/composables/useProduct'
import MainLayout from '../components/layouts/MainLayout.vue'
import { useAuth } from '@/composables/useAuth'
import ProductDetail from '../components/products/ProductDetail.vue'
import { createAvatar } from '@dicebear/core'
import { avataaars } from '@dicebear/collection'

const { signOut, getSession } = useAuth()

const session = await getSession()

const { fetchProducts, error, products } = useProduct()

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

await fetchProducts()
</script>

<template>
    <MainLayout>
        <template #header>
            <el-menu-item index="0"> </el-menu-item>
            <el-menu-item index="1">

                <el-sub-menu index="2">
                    <template #title>
                        <el-avatar shape="circle" :size="50" :src="avatar" />
                    </template>
                    <el-menu-item index="2-1">{{ session?.user.email }}</el-menu-item>
                    <el-menu-item index="2-2">{{ session?.user.id }}</el-menu-item>
                    <el-menu-item index="2-3">{{ session?.user.role }}</el-menu-item>
                    <el-menu-item index="2-4">
                        <el-button @click="{ signOut(); $router.push('/') }
                            ">Logout</el-button>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu-item>
        </template>
        <template #main>
            <h1>Products</h1>
            <div class="flex-grow" />
            <div v-if="error">{{ error }}</div>
            <div v-else>
                <el-row :gutter="16">
                    <el-col :span="6" v-for="product in products" :key="product.productid">
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
