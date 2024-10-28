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

export const UserAccountsResponse = [
  {
    type: 'SAVINGS',
    currentBalance: 1000,
    openDate: '05/05/2021',
    name: 'Cuenta de ahorro',
    id: 'AA23SSJ58',
    transactions: [
      {
        type: 'DEPOSIT',
        amount: 100,
        date: new Date(),
        description: 'Depósito de ahorro',
        id: 'AA23SSJ58',
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
    openDate: '07/07/2024',
    name: 'Cuenta de cheques',
    id: 'AA23SSJ59',
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
    openDate: '15/11/2020',
    name: 'Tarjeta de crédito',
    paymentBalance: 200,
    id: 'AA23SSJ60',
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
