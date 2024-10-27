export interface UserLoginForm {
  user: string
  password: string
}

export interface UserLoginResponse {
  token: string
}

export interface User {
  user: number
  email: string
  name: string
  lastName: string
  address: string
  phone: string
}
