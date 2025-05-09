import { stringSchema } from './string-schema'

export const roleSchema = stringSchema.min(1, {
  message: 'Cargo é obrigatório',
})
