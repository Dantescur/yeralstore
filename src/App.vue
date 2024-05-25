<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { supabase } from './lib/supabaseClient'
import { useUserStore } from './stores/user'
import { SpeedInsights } from '@vercel/speed-insights/vue';

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
  <SpeedInsights />
  <Suspense>
    <RouterView />
    <template #fallback>
      <slot name="fallback"></slot>
    </template>
  </Suspense>
</template>

<style>


</style>
