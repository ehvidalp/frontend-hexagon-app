export const UserLoginResponse = {
  token: 'fake-token',
  user: {
    user: 1,
    email: 'rcruz@gmail.com',
    name: 'Rodrigo ',
    image:
      'https://as1.ftcdn.net/v2/jpg/02/43/12/34/1000_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
    lastName: 'De la Cruz',
    address: 'Ciudad de Guatemala',
    phone: '4444-8744',
  },
}

export const UserAccounts = [
  {
    type: 'SAVINGS',
    currentBalance: 1000,
    openDate: new Date(),
    name: 'Cuenta de ahorro',
    transactions: [
      {
        type: 'DEPOSIT',
        amount: 100,
        date: new Date(),
        description: 'Depósito de ahorro',
      },
      {
        type: 'WITHDRAWAL',
        amount: 50,
        date: new Date(),
        description: 'Retiro de ahorro',
      },
    ],
  },
  {
    type: 'CHECKING',
    currentBalance: 500,
    openDate: new Date(),
    name: 'Cuenta de cheques',
    transactions: [
      {
        type: 'DEPOSIT',
        amount: 100,
        date: new Date(),
        description: 'Depósito de cheque',
      },
      {
        type: 'WITHDRAWAL',
        amount: 50,
        date: new Date(),
        description: 'Retiro de cheque',
      },
    ],
  },
  {
    type: 'CREDIT',
    currentBalance: 1000,
    openDate: new Date(),
    name: 'Tarjeta de crédito',
    paymentBalance: 200,
    transactions: [
      {
        type: 'PAYMENT',
        amount: 100,
        date: new Date(),
        description: 'Pago de tarjeta de crédito',
      },
    ],
  },
]
