import { authService } from '@/services/authService'
import type { User, UserLoginForm } from '@/types/User'
import { defineStore } from 'pinia'
import { ref, computed, type Ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user: Ref<User | null> = ref(null)

  const isAuthenticated = computed(() => !!token.value)
  const isLoggedIn = computed(() => Boolean(user.value))
  const userInformation = computed(() => user.value)

  const login = async (userLoginForm: UserLoginForm) => {
    try {
      const { token, user } = await authService.login(userLoginForm)
      setUser(user)
      localStorage.setItem('token', token)
    } catch (error) {
      console.error('Error during login:', error)
      throw error
    }
  }

  const setUser = (userData: User) => (user.value = userData)

  const clearUser = () => (user.value = null)

  return {
    user,
    isLoggedIn,
    setUser,
    clearUser,
    login,
    isAuthenticated,
    userInformation,
  }
})
