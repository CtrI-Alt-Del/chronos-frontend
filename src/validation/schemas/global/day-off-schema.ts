import { stringSchema } from './string-schema'

export const dayOffSchema = stringSchema.min(1, {
  message: 'Data obrigatória',
})
