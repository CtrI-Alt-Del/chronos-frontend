import { z } from 'zod'
import { stringSchema } from './string-schema'

export const passwordSchema = stringSchema.min(6, {
  message: 'Senha deve ter pelo menos 6 caracteres',
})
