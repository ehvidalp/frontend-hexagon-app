// src/schemas/formSchemas.ts
import * as yup from 'yup'

export const loginValidationSchema = yup.object({
  user: yup.string().required('El usuario es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria'),
})
