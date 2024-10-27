import { authService } from '@/services/authService'
import type { UserStore } from '@/types/UserStore'
import { defineStore } from 'pinia'
import { ref, computed, type Ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user: Ref<UserStore | null> = ref(null)

  const isLoggedIn = computed(() => Boolean(user.value))

  const login = async (email: string, password: string) => {
    try {
      console.log('in login functions')
      const userData = await authService.login({ email, password })
      console.log('userData', userData)
      // user.value = userData;
      console.log(userData)
      localStorage.setItem('token', userData.token) // Guardar el token si es necesario
    } catch (error) {
      console.error('Error during login:', error)
      throw error // Maneja este error en el componente que llama al login
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
  }
})
