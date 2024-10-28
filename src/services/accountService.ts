import type { UserAccount } from '@/types/User'
import { apiClient } from './apiClient'
import type { AxiosResponse } from 'axios'

class AccountService {
  async getAccount(): Promise<UserAccount[]> {
    try {
      const { data }: AxiosResponse<UserAccount[]> =
        await apiClient.get('/accounts')
      return data ?? null
    } catch (error) {
      console.error('Login failed', error)
      return [] as UserAccount[]
    }
  }

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout', {})
  }
}

export const accountService = new AccountService()
