<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { supabase } from './lib/supabaseClient'
import { useUserStore } from './stores/user'

const userStore = useUserStore()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    userStore.userSession = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    userStore.userSession = _session
  })
})
</script>

<template>
  <Suspense>
    <RouterView />
    <template #fallback>
      <slot name="fallback"></slot>
    </template>
  </Suspense>
</template>

<style>

.fade-leave-active, 
.fade-enter-active {
  transition: opacity 1s
}

.fade-enter-from,
.fade-leave-to {
 opqcity: 0
}



</style>
