import { checkAuth } from '@/utils/auth'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { requiredGuest: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/layouts/MainLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard-accounts',
          meta: {
            title: 'Cuentas',
          },
          component: () => import('@/views/DashboardAccountsView.vue'),
        },
        {
          path: 'account-detail/:id',
          name: 'dashboard-account-detail',
          meta: {
            title: 'Cuenta Asociada',
          },
          component: () => import('@/views/DashboardAccountDetailView.vue'),
        },
        {
          path: 'profile',
          name: 'dashboard-profile',
          meta: {
            title: 'Perfil',
          },
          component: () => import('@/views/DashboardProfileView.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'dashboard' },
    },
  ],
})

router.beforeEach((to, from, next) => {
  checkAuth(to, next)
})

export default router
