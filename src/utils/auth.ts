import { useUserStore } from '@/stores/userStore'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export function checkAuth(
  to: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next({ name: 'login' })
    return
  }

  if (to.meta.requiresGuest && userStore.isAuthenticated) {
    next({ name: 'dashboard-accounts' })
    return
  }
  next()
}
