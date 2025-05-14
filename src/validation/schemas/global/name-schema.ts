import { stringSchema } from './string-schema'

export const nameSchema = stringSchema.min(3, {
  message: 'Nome deve ter pelo menos 3 caracteres',
})
