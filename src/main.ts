// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
const app = createApp(App)

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { useUserStore } from './stores/user'

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)

const userStore = useUserStore()
userStore.fetchUser()

app.mount('#app')
