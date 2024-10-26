export interface UserLogin {
  email: string
  password: string
}

export interface UserLoginResponse {
  token: string
}

export interface User {
  id: number
  email: string
  name: string
  lastName: string
  address: string
  phone: string
}
