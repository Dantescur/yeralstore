<script lang="ts" setup>
import { useAuth } from '@/composables'
import { useUserStore } from '@/stores/user'
import { reactive } from 'vue'
import { showError } from '@/helpers/authError'
import { useRouter } from 'vue-router'

const form = reactive({
  email: '',
  password: ''
})

const router = useRouter()

const userStore = useUserStore()

const { signInWithMagicLink, isLoading, authError } = useAuth()

const handleMagicLink = async () => {
  try {
    const session = await signInWithMagicLink(form.email)
    userStore.setSession(session)
    router.push('/products')
  } catch (error) {
    isLoading.value = false
    showError(authError.value?.message)
  }
}
</script>

<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px" label-position="top">
    <h1>Sign with Magic Link</h1>
    <el-form-item label="Email">
      <el-input type="text" v-model="form.email" />
    </el-form-item>
    <el-button v-loading.fullscreen.lock="isLoading" type="primary" @click="handleMagicLink"
      >Sign with Magic Link</el-button
    >
  </el-form>
</template>

<style scoped>
h1 {
  margin-bottom: 1rem;
}
</style>
