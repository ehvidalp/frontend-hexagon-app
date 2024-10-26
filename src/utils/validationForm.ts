// src/utils/validation.ts
import * as yup from 'yup'
import { type FormFieldConfig, ValidationType } from '@/types/FormConfig'

// Objeto que mapea las validaciones a sus funciones correspondientes
const validationMethods: Record<
  ValidationType,
  (message: string, params?: number) => yup.AnySchema
> = {
  [ValidationType.REQUIRED]: message => yup.string().required(message),
  [ValidationType.EMAIL]: message => yup.string().email(message),
  [ValidationType.MIN]: (message, params) =>
    yup.string().min(params || 0, message),
  [ValidationType.MAX]: (message, params) =>
    yup.string().max(params || 0, message),
  // Agrega más validaciones si es necesario
}

// Función para generar el esquema de validación dinámicamente a partir del esquema del formulario
export const createValidationSchema = (formFields: FormFieldConfig[]) => {
  const shape = formFields.reduce<Record<string, yup.AnySchema>>(
    (acc, field) => {
      const validator = field.validations.reduce<yup.AnySchema>(
        (yupChain, validation) => {
          const validationMethod =
            validationMethods[validation.type as ValidationType]
          return validationMethod
            ? validationMethod(validation.message, validation.params)
            : yupChain
        },
        yup.string(),
      ) // Inicializamos con yup.string()

      acc[field.name] = validator
      return acc
    },
    {},
  )

  return yup.object().shape(shape)
}
