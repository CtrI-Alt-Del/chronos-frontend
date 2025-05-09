import { stringSchema } from './string-schema'

export const sectorSchema = stringSchema.min(1, {
  message: 'Setor é obrigatório',
})
