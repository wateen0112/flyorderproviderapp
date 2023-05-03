import { useAuth } from '@/composables'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...setupLayouts(routes),
  ],
})

router.beforeEach((to, from, next) => {
  const { IsLoggedIn } = useAuth()

  if (!IsLoggedIn() && to.name !== 'login') {
    next('/login')

    return
  }

  if (to.name === 'login' && IsLoggedIn())
    return next(from)

  next()
})

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards

export default router
