<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import ProductForm from '@/components/Products/ProductForm.vue'

import { ref } from 'vue'
import { useBreakpoints } from '@vueuse/core'

const userStore = useUserStore()

const showProductDrawer = ref(false)
const showOrderDrawer = ref(false)

const breakpoints = useBreakpoints({
  mobile: 0,
  tablet: 640,
  laptop: 1024,
  desktop: 1280
})

const mobile = breakpoints.between('mobile', 'tablet')
</script>

<template>
  <div>
    <el-tabs tab-position="top" style="height: 800px" class="demo-tabs" stretch>
      <el-tab-pane label="Profile">
        Profile
      </el-tab-pane>
      <el-tab-pane label="My Products">
        Products
        <!-- <ProductsTable /> -->
      </el-tab-pane>
      <el-tab-pane label="Orders">
        Orders
      </el-tab-pane>
      <el-tab-pane label="Settings">
        Settings
      </el-tab-pane>
    </el-tabs>
    <!-- <el-card class="user-card">
      <el-row>
        <el-col :span="8">
          <el-avatar :src="userStore.userAvatar" :size="100"></el-avatar>
        </el-col>
        <el-col :span="16" class="user-info">
          <div class="user-name">{{ userStore.user?.email }}</div>
          <div class="username">{{ userStore.user?.user_metadata }}</div>
          <div class="actions">
            <el-button type="primary" @click="showProductDrawer = true">Add Product</el-button>
            <el-button type="primary" @click="showOrderDrawer = true">Add Order</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card> -->
  </div>

  <el-drawer size="40%" v-model="showProductDrawer" title="Add Product" :with-header="false" v-if="!mobile">
    <ProductForm />
  </el-drawer>
  <el-drawer size="90%" v-model="showProductDrawer" title="Add Product" :with-header="false" v-else direction="ttb">
    <ProductForm />
  </el-drawer>
  <el-drawer v-model="showOrderDrawer" title="Add Order" :with-header="false">
    <!-- <OrderForm /> -->
  </el-drawer>
</template>

<style scoped>
.user-card {
  margin: 16px;
}

.user-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.user-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}

.demo-tabs {
  margin-top: 16px;
}

.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}
</style>
