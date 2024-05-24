<script setup lang="ts">
import { useAuth } from '@/composables'
import { User, ShoppingCart, ShoppingBag, TurnOff } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const { signOut } = useAuth()

const logOut = async () => {
  await signOut()
  router.push({ name: 'sign-in' })
}

defineProps<{
  avatar: string
}>()

const links = [
  {
    index: '1-1',
    title: 'Cart',
    link: 'cart',
    icon: ShoppingCart
  },
  {
    index: '1-2',
    title: 'Profile',
    link: 'profile',
    icon: User
  },
  {
    index: '1-3',
    title: 'Orders',
    link: 'orders',
    icon: ShoppingBag
  },
  {
    index: '1-4',
    title: 'Logout',
    link: 'logout',
    icon: TurnOff
  }
]

const router = useRouter()
</script>

<template>
  <el-menu-item index="0">
    <el-sub-menu index="1">
      <template #title>
        <el-avatar shape="circle" :size="50" :src="avatar" />
      </template>
      <el-menu-item
        v-for="link in links"
        :key="link.index"
        :index="link.index"
        style="width: 100%"
        class="menu-item"
      >
        <el-link
          v-if="link.link !== 'logout'"
          :icon="link.icon"
          @click="router.push(`/${link.link}`)"
          style="width: 100%"
        >
          {{ link.title }}
        </el-link>
        <el-link v-else :icon="link.icon" @click="logOut()" style="width: 100%">
          {{ link.title }}
        </el-link>
      </el-menu-item>
    </el-sub-menu>
  </el-menu-item>
</template>

<style scoped>
.menu-item {
  width: 100%;
  justify-content: left;
}
</style>
