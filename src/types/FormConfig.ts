export enum ValidationType {
  REQUIRED = 'required',
  EMAIL = 'email',
  MIN = 'min',
  MAX = 'max',
}

export interface ValidationRule {
  type: ValidationType
  message: string
  params?: number
}

export interface FormFieldConfig {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number'
  placeholder?: string
  validations: ValidationRule[]
}
