// src/services/authService.ts
import { apiClient } from './apiClient'
import type { AxiosResponse } from 'axios'

interface LoginData {
  email: string
  password: string
}

interface User {
  id: string
  name: string
  token: string
}

class AuthService {
  async login(loginData: LoginData): Promise<User> {
    try {
      const { data }: AxiosResponse<User> = await apiClient.post(
        '/auth/login',
        loginData,
      )
      return data ?? null
    } catch (error) {
      console.error('Login failed', error)
      return { id: '', name: '', token: '' }
    }
  }

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout', {})
  }

  async getCurrentUser(): Promise<User> {
    const response: AxiosResponse<User> = await apiClient.get('/auth/me')
    return response.data
  }
}

export const authService = new AuthService()
