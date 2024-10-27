export interface UserLoginForm {
  user: string
  password: string
}

export interface UserLoginResponse {
  token: string
  user: User
}

export interface User {
  user: number
  email: string
  image: string
  name: string
  lastName: string
  address: string
  phone: string
}
