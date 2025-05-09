import { stringSchema } from './string-schema'

export const descriptionSchema = stringSchema.min(1, {
  message: 'Descrição é obrigatória',
})
