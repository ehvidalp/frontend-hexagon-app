import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
import { accountService } from '@/services/accountService'
import {
  TypeTransaction,
  type UserAccount,
  type UserTransaction,
} from '@/types/User'

export const useUserAccounts = defineStore('userAccounts', () => {
  const userAccounts = ref<UserAccount[] | null>(null)

  const state = reactive({
    isLoading: false,
    error: '',
  })

  const listAccounts = computed(() => userAccounts.value)
  const isLoading = computed(() => state.isLoading)
  const error = computed(() => state.error)

  const setError = (message: string) => {
    state.error = message
    console.error(message)
  }

  const resetState = () => {
    userAccounts.value = null
    state.error = ''
  }

  const getUserAccounts = async () => {
    if (userAccounts.value?.length) return
    state.isLoading = true

    try {
      const accounts = await accountService.getAccount()
      userAccounts.value = accounts
    } catch (err) {
      console.error('Error loading user accounts:', err)
      setError('Error al cargar las cuentas de usuario.')
    } finally {
      state.isLoading = false
    }
  }

  const getAccountById = (id: string): UserAccount | undefined =>
    userAccounts.value?.find(account => account.id === id)

  const createTransaction = (
    amount: number,
    type: UserTransaction['type'],
    description: string,
  ): UserTransaction => ({
    id: `tx-${Date.now()}`,
    type,
    amount,
    date: new Date(),
    description,
  })

  const updateAccountBalance = (account: UserAccount, amount: number) => {
    const newBalance = Number(account.currentBalance) + Number(amount)
    if (newBalance < 0) {
      throw new Error('Fondos insuficientes')
    }
    account.currentBalance = newBalance
  }

  const makeTransaction = (
    fromAccountId: string,
    amount: number,
    type: 'TRANSFER' | 'OTHER_BANK',
    toAccountId?: string,
    description = 'Transacción',
  ) => {
    const fromAccount = getAccountById(fromAccountId)
    if (!fromAccount) return setError('Cuenta de origen no encontrada.')

    try {
      if (type === 'TRANSFER' && toAccountId) {
        const toAccount = getAccountById(toAccountId)
        if (!toAccount) return setError('Cuenta de destino no encontrada.')

        updateAccountBalance(fromAccount, -Number(amount))
        updateAccountBalance(toAccount, Number(amount))

        fromAccount?.transactions?.unshift(
          createTransaction(
            -Number(amount),
            TypeTransaction.TRANSFER,
            `${description} enviada`,
          ),
        )
        toAccount?.transactions?.unshift(
          createTransaction(
            Number(amount),
            TypeTransaction.PAYMENT,
            `${description} recibida`,
          ),
        )
      }
      if (type === 'OTHER_BANK') {
        updateAccountBalance(fromAccount, -Number(amount))
        fromAccount?.transactions?.unshift(
          createTransaction(
            -Number(amount),
            TypeTransaction.OTHER_BANK,
            description,
          ),
        )
        return
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Error en la transacción',
      )
    }
  }

  return {
    userAccounts: listAccounts,
    isLoading,
    error,
    getUserAccounts,
    resetState,
    getAccountById,
    makeTransaction,
  }
})
