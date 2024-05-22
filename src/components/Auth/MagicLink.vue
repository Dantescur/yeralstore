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

const { signInWithMagicLink, isLoading, Error } = useAuth()
const handleMagicLink = async () => {
  try {
    isLoading.value = true
    const user = await signInWithMagicLink(form.email)
    userStore.setUser(user)
    isLoading.value = false
    await router.push('/Products')
  } catch (error) {
    isLoading.value = false
    showError(Error.value?.message)
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
