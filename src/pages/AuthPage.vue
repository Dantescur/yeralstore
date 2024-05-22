<script setup>
import { ref } from 'vue'
import SignUp from '../components/auth/SignUp.vue'
import SignIn from '../components/auth/SignIn.vue'
import MagicLink from '../components/auth/MagicLink.vue'

const isSignUp = ref(true)
const useMagicLink = ref(false)

function toggleMagicLink() {
  useMagicLink.value = !useMagicLink.value
}
</script>

<template>
  <div class="container">
    <!-- v-if logic to determine which auth component to show -->
    <sign-up v-if="isSignUp && !useMagicLink" />
    <sign-in v-else-if="!isSignUp && !useMagicLink" />
    <magic-link v-else />
    <div class="buttons-container">
      <el-button type="primary" v-if="!useMagicLink" @click="isSignUp = !isSignUp">
        {{ isSignUp ? 'Already have an account? Sign In' : "Don't have an account yet? Sign Up" }}
      </el-button>
      <p class="centered">Or</p>
      <el-button type="primary" @click="toggleMagicLink">
        {{ useMagicLink ? 'Sign in with email and password' : 'Sign in with magic link' }}
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.container > * {
  margin-bottom: 1rem;
}

.container > button {
  margin-top: 1rem;
}

.container > p {
  margin-top: 1rem;
}

h1 {
  margin-bottom: 1rem;
}

.buttons-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.centered {
  text-align: center;
}
</style>
