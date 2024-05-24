<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <el-page-header size="500px" @back="router.go(-1)">
    <template #content>
      <span> {{ router.currentRoute.value.meta.title }} </span>
    </template>
  </el-page-header>
</template>
