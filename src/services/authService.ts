// src/services/authService.ts
import type { UserLoginForm, UserLoginResponse } from '@/types/User'
import { apiClient } from './apiClient'
import type { AxiosResponse } from 'axios'

class AuthService {
  async login(userLoginForm: UserLoginForm): Promise<UserLoginResponse> {
    try {
      const { data }: AxiosResponse<UserLoginResponse> = await apiClient.post(
        '/auth/login',
        userLoginForm,
      )
      return data ?? null
    } catch (error) {
      console.error('Login failed', error)
      return {} as UserLoginResponse
    }
  }

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout', {})
  }
}

export const authService = new AuthService()
