import { stringSchema } from './string-schema'

export const cpfSchema = stringSchema.min(11, {
  message: 'CPF deve ter 11 dígitos',
})
