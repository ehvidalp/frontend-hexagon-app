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

export interface UserAccount {
  type: TypeAccount
  currentBalance: number
  openDate: Date
  name: string
  paymentBalance?: number
  transactions?: UserTransaction[]
  id: string
}

export interface UserTransaction {
  id: string
  type: TypeTransaction
  amount: number
  date: Date
  description: string
}

export enum TypeTransaction {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  TRANSFER = 'TRANSFER',
  PAYMENT = 'PAYMENT',
  OTHER_BANK = 'OTHER_BANK',
}

export enum TypeAccount {
  SAVINGS = 'SAVINGS',
  CHECKING = 'CHECKING',
  CREDIT = 'CREDIT',
  INVESTMENT = 'INVESTMENT',
  LOAN = 'LOAN',
}
