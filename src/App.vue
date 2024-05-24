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

import { gsap } from 'gsap'; 

const beforeEnter = (el: HTMLElement) => {  
  el.style.transform = "translateX(20px)"; 
 el.style.opacity = "0"; 
}; 
 const enter = (el: HTMLElement, done: gsap.Callback) => {  gsap.to(el, {
   duration: 1,  
   x: 0,  
   opacity: 1, 
   onComplete: done,  
 }); 
}; 
 const afterEnter = (el: HTMLElement) => {  
   el.style.transform = ""; 
 el.style.opacity = ""; 
};

</script>

<template>
  <Suspense>
  <router-view v-slot="{ Component }" >
    <transition  
    @before-enter="beforeEnter"  
    @enter="enter"  
    @after-enter="afterEnter"  
    :css="false"> 
    <component :is="Component" />  
    </transition>
    <template #fallback>
      <slot name="fallback"></slot>
    </template>
    </router-view>
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
