export interface FormValidationRule {
  type: FormValidationType
  message: string
  params?: number
}

// Actualizamos la configuración del campo del formulario
export interface FormFieldConfig {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number'
  placeholder?: string
  validations: FormValidationRule[]
}

export enum FormValidationType {
  REQUIRED = 'required',
  EMAIL = 'email',
  MIN = 'min',
  MAX = 'max',
}
