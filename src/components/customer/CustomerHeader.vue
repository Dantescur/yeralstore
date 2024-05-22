<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <el-page-header
    v-if="router.currentRoute.value.meta.title"
    title="Products"
    @back="router.go(-1)"
  />
  <span v-else> {{ router.currentRoute.value.meta.title }} </span>
</template>
