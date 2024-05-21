<template>
  <div class="not-found">
    <div class="not-found__image">
      <el-image src="https://media.giphy.com/media/TgVu5ZYnfJK3a/giphy.gif" fit="cover" />
    </div>
    <h1 class="not-found__title">Whoops!</h1>
    <p class="not-found__text">
      It looks like you're lost. <br />
      Let's get you back on track.
    </p>
    <el-button type="primary" @click="goBack">Take me home</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'

const router = useRouter()

const goBack = () => {
  router.push({ path: '/' })
  ElNotification({
    title: 'Success',
    message: 'You are now back to the homepage',
    type: 'success'
  })
}
</script>

<style scoped lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 3rem;

  &__image {
    margin-bottom: 2rem;
    width: 400px;
    height: 200px;
  }

  &__title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  &__text {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    text-align: center;
  }
}
</style>
