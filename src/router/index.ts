import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from '../pages/Home.vue'
import Auth from '../pages/AuthPage.vue'
import { useUserStore } from '@/stores/user'

// Define routes for the application
const routes: RouteRecordRaw[] = [
  {
    // Route for the home page
    path: '/',
    component: Home,
    name: 'home',
    meta: { cantBeOnAuth: true },
    children: [
      {
        // Route for the authentication page
        path: '',
        component: Auth,
        name: 'auth',
        children: [
          {
            // Route for signing up
            path: '/',
            component: () => import('../components/auth/SignUp.vue'),
            name: 'sign-up'
          },
          {
            // Route for signing in
            path: 'sign-in',
            component: () => import('../components/auth/SignIn.vue'),
            name: 'sign-in'
          },
          {
            // Route for signing in with a magic link
            path: 'magic-link',
            component: () => import('../components/auth/MagicLink.vue'),
            name: 'magic-link'
          }
        ]
      }
    ]
  },
  {
    // Route for the products page
    path: '/products',
    name: 'products',
    component: () => import('../pages/ProductsPage.vue'),
    // Route requires authentication
    meta: { requiresAuth: true }
  }
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  await userStore.fetchUser()

  if (to.meta.requiresAuth && !userStore.user) {
    next({ name: 'home' })
  } else if (to.meta.cantBeOnAuth && userStore.user) {
    next({ name: 'products' })
  } else {
    next()
  }
})

export default router

