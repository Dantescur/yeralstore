<script lang="ts" setup>
import { useAuth } from '@/composables'
import { useUserStore } from '@/stores/user'
import { reactive } from 'vue'
import { showError } from '@/helpers/authError'
import { useRouter } from 'vue-router'
import { ManualAuthError } from '@/composables'

const form = reactive({
  email: '',
  password: '',
  firstname: '',
  lastname: ''
})

const userStore = useUserStore()
const router = useRouter()

const { signUp, isLoading, Error } = useAuth()
const handleSignup = async () => {
  try {
    isLoading.value = true
    const session = await signUp(form.email, form.password, form.firstname, form.lastname)
    userStore.setSession(session)
    isLoading.value = false
    router.push('/products')
  } catch (error) {
    isLoading.value = false
    if (error instanceof ManualAuthError) {
      showError(error.message)
    } else {
      showError(Error.value?.message)
    }
  }
}
</script>

<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px" label-position="top">
    <h1>Sign Up</h1>
    <el-form-item label="Email">
      <el-input type="text" v-model="form.email" />
    </el-form-item>
    <el-form-item label="Password">
      <el-input v-model="form.password" type="password" placeholder="Please input password" show-password />
    </el-form-item>
    <el-form-item label="First Name">
      <el-input v-model="form.firstname" />
    </el-form-item>
    <el-form-item label="Last Name">
      <el-input v-model="form.lastname" />
    </el-form-item>
    <el-form-item>
      <el-button v-loading.fullscreen.lock="isLoading" type="primary" @click="handleSignup">Sign Up</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
h1 {
  margin-bottom: 1rem;
}
</style>
