import { createRouter, createWebHistory } from 'vue-router'
import { ROUTES, ROUTES_MAP, CURRENT_USER } from '../utils/constant'

const router = createRouter({
  history: createWebHistory(),
  routes: ROUTES
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem(CURRENT_USER)
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: ROUTES_MAP.LOGIN.name })
  } else {
    next()
  }
})

export default router
