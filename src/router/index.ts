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

// Middleware to check if user is authenticated before allowing access to certain routes
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  await userStore.fetchUser()

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Route requires authentication
    if (!userStore.user) {
      // User is not authenticated, redirect to sign-in page
      next({ name: 'sign-in' })
    } else {
      // User is authenticated, allow access to route
      next()
    }
  } else {
    if (userStore.user && (to.name === 'sign-in' || to.name === 'sign-up' || to.name === 'magic-link')) {
      // User is authenticated but trying to access sign-in or sign-up page, redirect to products page
      next({ name: 'products' });
    } else {
      // User is not authenticated and not trying to access sign-in or sign-up page, allow access to route
      next();
    }
  }
})

export default router

