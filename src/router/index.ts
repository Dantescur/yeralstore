import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import NotFound from '../pages/NotFound.vue'
import { useUserStore } from '@/stores/user'

// Define routes for the application
const routes: RouteRecordRaw[] = [
  {
    // Route for the home page
    path: '',
    name: 'home',
    redirect: { name: 'products' },
    children: [
      {
        // Route for the Products page
        path: '/products',
        name: 'products',
        component: () => import('../pages/ProductsPage.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('../pages/CustomerProfile.vue'),
        meta: { requiresAuth: true, title: 'Profile' }
      },
      {
        path: '/cart',
        name: 'cart',
        component: () => import('../pages/CartPage.vue'),
        meta: { requiresAuth: true, title: 'Cart' }
      }
    ]
  },
  {
    // Route for the authentication page
    path: '/auth',
    component: () => import('../pages/AuthPage.vue'),
    name: 'auth',
    // children: [
    //   {
    //     // Route for signing up
    //     path: '/sign-up',
    //     component: () => import('@/components/Auth/SignUp.vue'),
    //     name: 'sign-up',
    //     meta: { title: 'Sign Up' }
    //   },
    //   {
    //     // Route for signing in
    //     path: 'sign-in',
    //     component: () => import('@/components/Auth/SignIn.vue'),
    //     name: 'sign-in',
    //     meta: { title: 'Sign In' }
    //   },
    //   {
    //     // Route for signing in with a magic link
    //     path: 'magic-link',
    //     component: () => import('@/components/Auth/MagicLink.vue'),
    //     name: 'magic-link',
    //     meta: { title: 'Magic Link' }
    //   }
    // ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  }
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
  strict: true
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.userSession) {
    next({ name: 'sign-in' })
  } else if (to.meta.cantBeOnAuth && userStore.userSession) {
    next({ name: 'products' })
  } else {
    next()
  }
})

export default router
