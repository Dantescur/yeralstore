<script lang="ts" setup>
import { useAuth } from '@/composables/useAuth'
import { useUserStore } from '@/stores/user'
import { reactive } from 'vue'
import { showError } from '../../helpers/authError'
import { useRouter } from 'vue-router';

const form = reactive({
    email: '',
    password: ''
})

const userStore = useUserStore()
const router = useRouter()

const { signIn, isLoading, Error } = useAuth()
const handleSignin = async () => {
    try {
        isLoading.value = true
        const user = await signIn(form.email, form.password)
        userStore.setUser(user)
        isLoading.value = false
        router.push('/products')
    } catch (error) {
        isLoading.value = false
        showError(Error.value?.message)
    }
}
</script>

<template>
    <el-form :model="form" label-width="auto" style="max-width: 600px" label-position="top">
        <h1>Sign In</h1>
        <el-form-item label="Email">
            <el-input type="email" v-model="form.email" />
        </el-form-item>
        <el-form-item label="Password">
            <el-input v-model="form.password" type="password" placeholder="Please input password" show-password />
        </el-form-item>
        <el-button v-loading.fullscreen.lock="isLoading" type="primary" @click="handleSignin">Sign In</el-button>
    </el-form>
</template>

<style scoped>
h1 {
    margin-bottom: 1rem;
}
</style>
