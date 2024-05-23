<script setup>
// Importing necessary dependencies
import { ref } from 'vue'
import { Sunny, Moon } from '@element-plus/icons-vue'

// Importing custom composables
import { toggleDark, isDark } from '@/composables'

// Defining the activeIndex
const activeIndex = ref('1')

// Getting the router instance
</script>

<template>
  <!-- Main layout container -->
  <el-container>
    <!-- Header section -->
    <el-header>
      <!-- Navigation and Header content -->
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false">
        <el-menu-item index="0">
          <!-- Logo -->
          <h2>YeralStore</h2>
        </el-menu-item>
        <!-- Flexible grow -->
        <div class="flex-grow" />
        <!-- Slot for header content -->
        <slot name="header"></slot>
        <!-- Dark mode toggle -->
        <el-menu-item index="1">
          <!--suppress JSValidateTypes -->
          <el-switch v-model="isDark" :active-icon="Moon" :inactive-icon="Sunny" @change="toggleDark" size="small" />
        </el-menu-item>
      </el-menu>
    </el-header>
    <!-- Main content section -->
    <el-main>
      <slot name="main">
        <router-view></router-view>
      </slot>
    </el-main>
    <!-- Footer section -->
    <el-footer>
      <footer class="footer">
        <div class="container">
          <!-- Copyright information -->
          <p class="has-text-centered">
            Copyright © 2024 YeralStore. All rights reserved.
          </p>
        </div>
      </footer>
    </el-footer>
  </el-container>
</template>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
