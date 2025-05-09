import { stringSchema } from './string-schema'

export const idSchema = stringSchema.uuid({
  message: 'ID inválido: deve ser um UUID válido',
})
