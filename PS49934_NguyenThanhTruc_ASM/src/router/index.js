import { createRouter, createWebHistory } from 'vue-router'
import { ROUTES, ROUTES_MAP } from '../utils/constant'
import { verifyToken } from '../utils/jwt'

const router = createRouter({
  history: createWebHistory(),
  routes: ROUTES
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const { valid } = await verifyToken()
    if (!valid) {
      next({ name: ROUTES_MAP.LOGIN.name })
      return
    }
  }
  next()
})

export default router
