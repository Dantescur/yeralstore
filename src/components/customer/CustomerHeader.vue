<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<template>
  <el-page-header @back="goBack">
    <template #content>
      <span> {{ router.currentRoute.value.meta.title }} </span>
    </template>
  </el-page-header>
</template>
