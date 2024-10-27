import { useUserStore } from '@/stores/userStore'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export function checkAuth(
  to: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  if (to.meta.requiresGuest && userStore.isAuthenticated) {
    next({ name: 'dashboard-home' })
    return
  }
  next()
}
