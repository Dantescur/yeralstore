<script setup lang="ts">
import CustomerHeader from '@/components/Customer/CustomerHeader.vue'
import CustomerHome from '@/components/Customer/CustomerHome.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

</script>

<template>
  <CustomerHeader />
  <CustomerHome :session="userStore.userSession" />
</template>

<style scoped></style>
