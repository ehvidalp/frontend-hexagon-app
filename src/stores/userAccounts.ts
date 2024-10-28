import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
import { accountService } from '@/services/accountService'
import type { UserAccount } from '@/types/User'

export const useUserAccounts = defineStore('userAccounts', () => {
  const userAccounts = ref<UserAccount[] | null>(null)

  const state = reactive({
    isLoading: false,
    error: '',
  })

  const listAccounts = computed(() => userAccounts.value)

  const getUserAccounts = async () => {
    if (userAccounts.value && userAccounts.value.length > 0) return
    state.isLoading = true
    state.error = ''

    try {
      const accounts = await accountService.getAccount()
      setUserAccounts(accounts)
    } catch (err) {
      console.error('Error getting accounts:', err)
      state.error = 'Error al cargar las cuentas de usuario.'
    } finally {
      state.isLoading = false
    }
  }

  const setUserAccounts = (userData: UserAccount[]) => {
    userAccounts.value = userData
  }

  const clearUserAccounts = () => {
    userAccounts.value = null
    state.error = ''
  }

  const getAccountById = (id: string): UserAccount | undefined =>
    userAccounts.value?.find(account => account.id === id)

  return {
    userAccounts: listAccounts,
    isLoading: computed(() => state.isLoading),
    error: computed(() => state.error),
    getUserAccounts,
    setUserAccounts,
    clearUserAccounts,
    getAccountById,
  }
})
