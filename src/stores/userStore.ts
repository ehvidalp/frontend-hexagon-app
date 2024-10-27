import { authService } from '@/services/authService'
import type { UserStore } from '@/types/UserStore'
import { defineStore } from 'pinia'
import { ref, computed, type Ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const isAuthenticated = computed(() => !!token.value)

  const user: Ref<UserStore | null> = ref(null)

  const isLoggedIn = computed(() => Boolean(user.value))

  const login = async (email: string, password: string) => {
    try {
      const userData = await authService.login({ email, password })
      localStorage.setItem('token', userData.token)
    } catch (error) {
      console.error('Error during login:', error)
      throw error
    }
  }

  const setUser = (userData: UserStore) => (user.value = userData)

  const clearUser = () => (user.value = null)

  return {
    user,
    isLoggedIn,
    setUser,
    clearUser,
    login,
    isAuthenticated,
  }
})
