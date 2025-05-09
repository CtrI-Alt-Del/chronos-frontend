import { stringSchema } from './string-schema'

export const urlSchema = stringSchema.url({
  message: 'URL inválida',
})
