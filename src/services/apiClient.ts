// src/services/apiClient.ts
import { UserLoginResponse } from '@/mocks/userMock'
import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import MockAdapter from 'axios-mock-adapter'

class ApiClient {
  private client: AxiosInstance
  private mock: MockAdapter

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token')
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error: AxiosError) => {
        if (error.response)
          console.error(
            `Error: ${error.response.status} - ${error.response.data}`,
          )

        if (error.request)
          console.error('Error: No response received from server')

        console.error(`Error: ${error.message}`)
        return Promise.resolve({ data: null })
      },
    )

    // Data mock
    this.mock = new MockAdapter(this.client)

    this.mock.onPost('/auth/login').reply(200, UserLoginResponse)

    this.mock.onPost('/auth/logout').reply(400)
  }

  // Métodos genéricos
  public get<TResponse>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TResponse>> {
    return this.client.get<TResponse>(url, config)
  }

  public post<TResponse, TData = unknown>(
    url: string,
    data: TData,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TResponse>> {
    return this.client.post<TResponse>(url, data, config)
  }

  public put<TResponse, TData = unknown>(
    url: string,
    data: TData,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TResponse>> {
    return this.client.put<TResponse>(url, data, config)
  }

  public delete<TResponse>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TResponse>> {
    return this.client.delete<TResponse>(url, config)
  }
}

export const apiClient = new ApiClient('https://api.example.com')
