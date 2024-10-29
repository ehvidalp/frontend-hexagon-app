import { authService } from '@/services/userService'
import type { User, UserLoginForm } from '@/types/User'
import { defineStore } from 'pinia'
import { ref, computed, type Ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user: Ref<User | null> = ref(null)

  const isLoggedIn = computed(() => Boolean(user.value))
  const userInformation = computed(() => user.value)

  const login = async (userLoginForm: UserLoginForm) => {
    try {
      const { token, user } = await authService.login(userLoginForm)
      setUser(user)
      setToken(token)
    } catch (error) {
      console.error('Error during login:', error)
      throw error
    }
  }

  const setUser = (userData: User) => (user.value = userData)
  const setToken = (tokenValue: string) => {
    token.value = tokenValue
    localStorage.setItem('token', tokenValue)
  }
  const clearUser = () => {
    user.value = null
    localStorage.removeItem('token')
  }

  return {
    user,
    isLoggedIn,
    setUser,
    clearUser,
    login,
    isAuthenticated: computed(() => !!token.value),
    userInformation,
  }
})
