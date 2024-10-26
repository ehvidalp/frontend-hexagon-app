// src/forms/loginFormConfig.ts

import { ValidationType, type FormFieldConfig } from '@/types/FormConfig'

// Configuración para un formulario de ejemplo: Login Form
export const loginFormConfig: FormFieldConfig[] = [
  {
    name: 'email',
    label: 'Correo Electrónico',
    type: 'email',
    placeholder: 'Ingresa tu correo',
    validations: [
      { type: ValidationType.REQUIRED, message: 'El correo es requerido' },
      {
        type: ValidationType.EMAIL,
        message: 'Debe ser un correo electrónico válido',
      },
    ],
  },
  {
    name: 'password',
    label: 'Contraseña',
    type: 'password',
    placeholder: 'Ingresa tu contraseña',
    validations: [
      { type: ValidationType.REQUIRED, message: 'La contraseña es requerida' },
      {
        type: ValidationType.MIN,
        message: 'La contraseña debe tener al menos 6 caracteres',
        params: 6,
      },
    ],
  },
]
